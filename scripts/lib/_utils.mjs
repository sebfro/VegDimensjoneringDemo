import path, { dirname } from "path";
import { fileURLToPath } from "url";
import {execa} from "execa";
import hasbin from "hasbin";
import chalk from "chalk";
import fs from "fs";

const libDir = dirname(fileURLToPath(import.meta.url));

/**
 * Reads and parses the given JSON file
 * @param file {string}
 * @return {object}
 */
export function readJSON(file) {
	return JSON.parse(fs.readFileSync(file, { encoding: "UTF-8" }));
}

/**
 * writes the given object as prettified JSON to the given file
 * @param file {string}
 * @param object {object}
 */
export function writeJSON(file, object) {
	const jsonStr = JSON.stringify(object, null, "  ");
	fs.writeFileSync(file, jsonStr);
}

/**
 * absolute path to the project directory
 * @type {string}
 */
export const projectDir = path.normalize(`${libDir}/../../`);

/**
 * throws an error if we are not logged in to atlas (halting any build jobs)
 * This can be run at the start to ensure that we are logged in, avoiding time wasted
 *
 * @return {Promise<void>}
 */
export async function testLogin() {
	const ac = hasbin.sync("ac") ? "ac" : "ac.exe";
	if (!hasbin.sync(ac)) {
		throw new Error(`${ac} is missing from system path`);
	}

	// throws if user is not logged in
	await $(ac, ["whoami"]);
}

/**
 * $: function for running a CLI program (wrapper for execa)
 *
 * Example usage: $('ac', ['status']);
 *
 * @param file {string} name of CLI program
 * @param args {string[]} array of arguments to pass to the CLI program
 * @param options {execa.Options?} execa options
 * @return {Promise<string>}
 */
export async function $(file, args, options) {
	const opts = { cwd: projectDir, ...options };
	const { stdout } = await execa(file, args, opts);
	return stdout;
}

/**
 * creates a simple log wrapper with the name as a colored prefix
 */
export const newLogger = (name) => ((...args) => console["log"](`${chalk.magentaBright(name)}:`, ...args));
