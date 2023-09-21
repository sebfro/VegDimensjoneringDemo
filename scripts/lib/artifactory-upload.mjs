import fs from "fs";
import dotEnv from "dotenv";
import { newLogger } from "./_utils.mjs";
import fetch from "node-fetch";

const log = newLogger("artifactory-upload");

dotEnv.config();

/**
 * uploads the given (zip) file using PUT to the given url at Artifactory
 *
 * @param file {string} full path to file we want to upload
 * @param packageUrl {string} the full URL to the package in Artifactory (upload target)
 * @return {Promise<void>}
 */
export default async function artifactoryUpload(file, packageUrl) {

	if (!fs.existsSync(file)) {
		throw new Error(`build file ${file} does not exist`);
	}

	const authHeader = getAuthHeader();

	log(`uploading ${file} to ${packageUrl}`);

	const packageStream = fs.createReadStream(file);

	const response = await fetch(packageUrl, {
		method: "PUT",
		body: packageStream,
		headers: {
			"user-agent": "vegfoto",
			...authHeader,
		}
	});


	if (!response.ok) {
		log(await response.text());
		throw new Error(`upload failed ${response.status}`);
	}

	log(response.status, await response.text());
}

/**
 * Use username/password if provided (this is intended for the Jenkins release step
 * Otherwise use env.ARTREPO_API_KEY (provided by Jenkins to all projects)
 */
export function getAuthHeader() {
	// if credentials have been passed
	const username = process.env.ARTIFACTORY_USER;
	const password = process.env.ARTIFACTORY_PASS;

	// token provided by Atlas Jenkins (for snapshot artifacts)
	const token = process.env.ARTREPO_API_KEY;

	if (username && password) {
		return {
			'Authorization': 'Basic ' + Buffer.from(`${username}:${password}`, 'binary').toString('base64'),
		};
	}

	if (token) {
		return {
			'X-JFrog-Art-Api': token,
		};
	}

	throw new Error(`Missing credentials`);
}


/**
 * Returns an artifactory package URL based on the given arguments
 *
 * @param repository {'webcontent-release-local'|'webcontent-snapshots-local'}
 * @param artifactName {string}
 * @param filename {string}
 * @return {string}
 */
export function getPackageUrl(repository, artifactName, filename) {
	// TODO: Bytt tilbake til artrepo når vi har fått miljøer hos SVV
	const publicRepository = `https://registry.npmjs.org/artifactory/${repository}/no/vegvesen/vegfoto/${artifactName}/${filename}`;
	// const vegvesenRepository = `https://artrepo.vegvesen.no/artifactory/${repository}/no/vegvesen/vegfoto/${artifactName}/${filename}`
	return publicRepository;
	// return `https://artrepo.vegvesen.no/artifactory/${repository}/no/vegvesen/vegfoto/${artifactName}/${filename}`;
}
