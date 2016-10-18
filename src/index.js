#!/usr/bin/env node
import fs from 'fs';
import Elephant from './elephant';

const config = JSON.parse(fs.readFileSync('.donezo-config.json', 'utf8'));

const donezo = new Elephant(process.cwd() + config.fontFile);
donezo.getGlyphsList((list) => {
  // Write SCSS file based on config
  donezo.writeScssFile(list, config);
});
