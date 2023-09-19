#!/usr/bin/env node
import hasbin from "hasbin";
import { join } from "path";
import createPackage from "./lib/package-zip.mjs";
import artifactoryUpload, {getAuthHeader, getPackageUrl} from "./lib/artifactory-upload.mjs";
import atlasBuildImage from "./lib/atlas-build-image.mjs";
import { $, newLogger, projectDir } from "./lib/_utils.mjs";

/*
 * This script runs a full build and deploy of storybook
 */
const log = newLogger("atlas-deploy-storybook");

// verify that we are logged into atlas
try {
	await $("ac", ["whoami"]);
}

catch(e) {
	log('Please login to atlas before running');
	process.exit(1)
}

try {
	getAuthHeader();
}
catch(e) {
	log('Please add artifactory credentials to .env file (ARTIFACTORY_USER, ARTIFACTORY_PASS)');
	process.exit(1)
}

const version = process.argv[2];

log(`deploying updating storybook to version: ${version}`)

log(`building storybook sources`);

// build all sources
await $("npm", ["run", "build-storybook"]);

const filename = `tsinsp-web-storybook-${version}.zip`;
const outFile = join(projectDir, "out", filename);

const packageUrl = getPackageUrl("webcontent-snapshots-local", "tsinsp-web-storybook", filename);

log(`zipping sources`);

// zip sources
await createPackage("build-storybook", outFile);

// upload zipped package to artifactory
await artifactoryUpload(outFile, packageUrl);

// build atlas image
await atlasBuildImage("tsinsp-web-storybook", version, packageUrl, "httpd24");

const ac = hasbin.sync("ac") ? "ac" : "ac.exe";

const result = await $(ac, [
	"perform",
	"rolling",
	"deploy",
	"tsinsp-web-storybook",
	"-i",
	"tsinsp",
	"-e",
	"stm-1",
	"-v",
	version
]);

log(result);
