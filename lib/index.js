#!/usr/bin/env node
'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _elephant = require('./elephant');

var _elephant2 = _interopRequireDefault(_elephant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = JSON.parse(_fs2.default.readFileSync('.donezo-config.json', 'utf8'));

var donezo = new _elephant2.default(process.cwd() + config.fontFile);
donezo.getGlyphsList(function (list) {
  // Write SCSS file based on config
  donezo.writeScssFile(list, config);
});