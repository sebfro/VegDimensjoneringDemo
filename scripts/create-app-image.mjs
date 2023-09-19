#!/usr/bin/env node
import { join } from "path";
import createPackage from "./lib/package-zip.mjs";
import artifactoryUpload, { getPackageUrl } from "./lib/artifactory-upload.mjs";
import atlasBuildImage from "./lib/atlas-build-image.mjs";
import { newLogger, projectDir } from "./lib/_utils.mjs";

const log = newLogger("create-app-image");

const repoId = process.argv[2];
const version = process.argv[3];

if (!["snapshots", "release"].includes(repoId)) {
	console.error(`Invalid repository: ${repoId}. (snapshots/release) required`);
	process.exit(1);
}

const repository = `webcontent-${repoId}-local`;

log(`creating appImage of tsinsp-web ${version} (artRepo:${repoId})`);

// cpSync("public", ".next/standalone/public",  {recursive: true})
// cpSync(".next/static", ".next/standalone/.next/static", {recursive: true})

const filename = `vegbilder-opplasting-web-${version}.zip`;
const packageUrl = getPackageUrl(repository, "vegbilder-opplasting-web", filename);

log(`zipping sources`);

// zip sources
const outFile = join(projectDir, "out", filename);
console.log("outFile: ", outFile);

await createPackage("build", outFile);

// upload zipped package to artifactory
await artifactoryUpload(outFile, packageUrl);

// build atlas image
await atlasBuildImage("vegbilder-opplasting-web", version, packageUrl);
