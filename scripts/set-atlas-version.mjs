#!/usr/bin/env node
import { setAtlasVersion } from "./lib/build-info.mjs";

const version = process.argv[2];
await setAtlasVersion(version);
