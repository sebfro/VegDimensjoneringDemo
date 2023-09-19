import hasbin from "hasbin";
import { $, newLogger } from "./_utils.mjs";

const log = newLogger("atlas-build-image");
const username = process.env.ATLAS_RESPONSIBLE_USER;
/**
 * builds an atlas app image with the following properties
 *
 * Uses the ac CLI command
 *
 * @param name {string} image name (typically tsinsp-web)
 * @param version {string} image version
 * @param packageUrl {string} URL to zipped package in Artifactory
 * @param baseImageName "node16"/"node18" for Next.js (node) and use "httpd24" for static web files (Storybook)
 * @return {Promise<void>}
 */
export default async function atlasBuildImage(name, version, packageUrl, baseImageName = "httpd24") {
	const ac = hasbin.sync("ac") ? "ac" : "ac.exe";
	if (!hasbin.sync(ac)) {
		throw new Error(`${ac} is missing from system path`);
	}
	const args = [
		"build",
		"-i",
		"vegfoto",
		name,
		"-v",
		version,
		"-b",
		baseImageName,
		"-U",
		packageUrl,
		"--allow-update",
		"--block-until-finished",
		"--non-interactive",
		"--timeout",
		"5m0s",
	]
	if(username){
		args.push("--responsible-user")
		args.push(username)
	}
	const result = await $(ac, args);

	log(result);

	log(`completed build of ${name} v${version}`);
}
