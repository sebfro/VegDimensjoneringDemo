#!/usr/bin/env node
import zip from "bestzip";
import { promises as fs } from "fs";
import { dirname } from "path";
import { newLogger } from "./_utils.mjs";

const log = newLogger("package-zip");

/**
 * create a zipped package of the given directory
 *
 * @param buildDir directory of built sources
 * @param outFile full path to resulting package
 * @return {Promise<void>}
 */
export default async function createPackage(buildDir, outFile) {
	// create outDir if not exists
	await fs.mkdir(dirname(outFile), { recursive: true });

	log(`packaging ${outFile}`);

	// zip the file to out/<buildFile>
	await zip({
		cwd: buildDir,
		source: [`*`,`.*`], // Include dotfiles
		destination: outFile
	});
	log(`completed packaging of ${outFile}`);
}
