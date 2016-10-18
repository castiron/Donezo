'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _mixins = require('./mixins');

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Elephant = function () {
  function Elephant(filename) {
    _classCallCheck(this, Elephant);

    this.filename = filename;
    this.getFontFace = this.getFontFace.bind(this);
    this.getMixins = this.getMixins.bind(this);
  }

  _createClass(Elephant, [{
    key: 'getGlyphsList',
    value: function getGlyphsList(listBack) {
      _fs2.default.readFile(this.filename, 'utf8', function (err, data) {
        if (err) throw err;

        // SVG file has been loaded
        var c = _cheerio2.default.load(data);
        var glyphs = [];

        // Throw a basic error if the SVG (or erratically provided file) has no glyphs
        if (c('glyph').length <= 0) throw 'The font file is either not an SVG, or it has no glyphs.';

        c('glyph').each(function (glyph) {
          var unicode = c(this).attr('unicode');
          var hex = unicode.charCodeAt(0).toString(16);
          // Push any glyph that is named
          if (c(this).attr('glyph-name')) {
            glyphs.push({
              name: c(this).attr('glyph-name'),
              hex: hex
            });
          }
        });

        if (glyphs.length <= 0) throw 'No named glyphs found in SVG file.';

        // Run a callback as long as there are glyphs
        listBack(glyphs);
      });
    }
  }, {
    key: 'getFontFace',
    value: function getFontFace(name, path, rails) {
      var getFontPath = function getFontPath(name, path, rails, type) {
        var output = '';
        if (!rails) {
          output = '\'' + path + name + '.' + type + '\'';
        } else {
          output = 'font-path(\'' + name + '.' + type + '\')';
        }

        return output;
      };

      if (!name) throw 'The font name is not configured';
      if (!path && !rails) throw 'Font path error: Please configure fontPath, or set useRailsFontPath to true for a rails setup.';
      var output = '';
      output += '// Icon Font\n';
      output += '// --------------------------------------------------------\n';
      output = '@font-face {\n';
      output += '  font-family: \'' + name + '\';\n';
      output += '  src: url(' + getFontPath(name, path, rails, 'eot?#iefix') + ') format(\'embedded-opentype\'),\n';
      output += '  url(' + getFontPath(name, path, rails, 'woff') + ') format(\'woff\'),\n';
      output += '  url(' + getFontPath(name, path, rails, 'ttf') + ') format(\'truetype\'),\n';
      output += '  url(' + getFontPath(name, path, rails, 'svg') + ') format(\'svg\');\n';
      output += '  font-weight: normal;\n  font-style: normal;\n';
      output += '}\n';

      return output;
    }
  }, {
    key: 'getMixins',
    value: function getMixins(name) {
      if (!name) throw 'The font name is not configured';
      var mixins = new _mixins2.default(name);
      var output = '';
      output += mixins.iconMixin();
      output += '\n';
      output += mixins.usageMixins();

      return output;
    }
  }, {
    key: 'writeScssFile',
    value: function writeScssFile(glyphs, config) {
      // Start output and record glyph variables
      var output = '';
      output += '// Donezo Generated Icon File:\n// File will be overwritten if regenerated\n\n';
      output += '// Icon Variables\n';
      output += '// --------------------------------------------------------\n';
      glyphs.forEach(function (glyph) {
        output += '$' + config.variablePrefix + glyph.name + ': \'\\' + glyph.hex + '\';\n';
      });

      // Output font-face if configured
      if (config.outputFontFace) {
        output += '\n\n';
        output += this.getFontFace(config.fontName, config.fontPath, config.useRailsFontPath);
      }

      if (config.outputMixins) {
        output += '\n\n';
        output += this.getMixins(config.fontName);
      }

      _fs2.default.writeFile(process.cwd() + config.stylesFile, output, function (err) {
        if (err) throw err;
        console.log('Donezo!');
      });
    }
  }]);

  return Elephant;
}();

exports.default = Elephant;