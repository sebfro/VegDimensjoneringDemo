import { $, newLogger, projectDir, readJSON, writeJSON } from "./_utils.mjs";
import { join } from "path";
import git from "git-rev-sync";
import semverUtils from "semver-utils";
import chalk from "chalk";

const log = newLogger("build-info");

/**
 *
 *
 * @param buildInfo {import("src/api").DeploymentDTO}
 * @return {Promise<void>}
 */
export async function setBuildInfo(buildInfo) {
	const outFile = join(projectDir, ".", ".environment.json");
	const outFileEnvironment = join(projectDir, "public", "environment.json");
	const version = buildInfo.version;

	// we need to keep both of these files because public/environment.json needs to be accessible from a simple http client
	// while .environment.json needs to be under /src in order to be compiled into the JavaScript bundle by webpack

	writeJSON(outFile, buildInfo);
	log(`wrote version ${chalk.green(version)} to ${outFile}`);

	writeJSON(outFileEnvironment, buildInfo);
	log(`wrote version ${chalk.green(version)} to ${outFileEnvironment}`);
}

export async function setAtlasVersion(version) {
	// update version numbers in atlas deployment config
	updateAtlasImageTag("vegbilder-opplasting-web.json", version);
}


function updateAtlasImageTag(file, version) {
	const filePath = join(projectDir, "atlas", file);
	const config = readJSON(filePath);

	const currentTag = config.spec.image.spec.tag;
	config.spec.image.spec.tag = version;

	writeJSON(filePath, config);

	log(`updated image tag: ${chalk.blue(currentTag)} -> ${chalk.green(version)} in file ${file}`);
}


/**
 * @return {Promise<import("src/lib/api").DeploymentDTO>}
 */
export async function getBuildInfo() {
	const semver = await getVersion();
	const gitBranch = getBranch();
	const gitSha = git.short(projectDir);

	return {
		buildTime: new Date().toISOString(),
		deploymentName: 'vegbilder-opplasting-web',
		version: semver.semver,
		gitBranch,
		gitSha,
	};
}

function getBranch() {
	let branch = git.branch(projectDir);

	// jenkins checks out branches detached, meaning it just uses the SHA
	// this script depends on knowing the branch name, so in those cases
	// we can use GIT_BRANCH instead.
	if (branch.includes("Detached") && process.env.GIT_BRANCH) {
		return process.env.GIT_BRANCH;
	}
	return branch;
}


/**
 * returns the version parsed into the semver named properties
 *
 * Example:
 * SemVer {
 *    semver: 'v1.51.0-1-g0f0f6253',
 *    version: '1.51.0',
 *    major: '1',
 *    minor: '51',
 *    patch: '0',
 *    release: '1-g0f0f6253'
 *
 * @return {import("semver-utils").SemVer}
 * */
export async function getVersion() {

	// the latest tagged version:
	// for example: 1.51.0-1-g0f0f6253
	const describe = await $("git", ["describe"]);

	/**
	 */
	return semverUtils.parse(describe);
}
