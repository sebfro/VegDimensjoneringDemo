#!/usr/bin/env node
import fetch from 'node-fetch';
import { $, newLogger, projectDir } from './lib/_utils.mjs';
import { rmSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const log = newLogger(`generate-enums`);

const url = 'http://localhost:8080/api/environment/enums';

log(`fetching enums from ${url}`)

const response = await fetch(url);
if (!response.ok || !(response.status >= 200 && response.status < 300)) {
	throw new Error(`fetch failed. ${response.status} ${response.statusText}`);
}

const enumMap = await response.json();

const enumDir = join(projectDir, 'src', 'api', 'enums');

rmSync(enumDir, { recursive: true });

const header = `/* generated with generate-enums.mjs */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
`;

let indexContent = header;

const enumKeys = Object.keys(enumMap);

log(`writing ${enumKeys.length} enums`);

enumKeys.forEach(enumName => {
	const title = `${enumName}Enum`;
	const content =`export const ${title} = ${JSON.stringify(enumMap[enumName], null, '\t')} as const;`;

	mkdirSync(enumDir, { recursive: true });
	writeFileSync(join(enumDir, `${title}.ts`), content);

	indexContent += `\nexport { ${title} } from './${title}';`;
});


mkdirSync(enumDir, { recursive: true });
writeFileSync(join(enumDir, 'index.ts'), indexContent);
