import fs from 'fs';
import cheerio from 'cheerio';
import Mixins from './mixins';

export default class Elephant {
  constructor(filename) {
    this.filename = filename;
    this.getFontFace = this.getFontFace.bind(this);
    this.getMixins = this.getMixins.bind(this);
    this.convertDashToCamelCase = this.convertDashToCamelCase.bind(this);
  }

  getGlyphsList(listBack) {
    fs.readFile(this.filename, 'utf8', (err, data) => {
      if (err) throw err;

      // SVG file has been loaded
      const c = cheerio.load(data);
      let glyphs = [];

      // Throw a basic error if the SVG (or erratically provided file) has no glyphs
      if (c('glyph').length <= 0) throw 'The font file is either not an SVG, or it has no glyphs.';

      c('glyph').each(function(glyph) {
        const unicode = c(this).attr('unicode');
        const hex = unicode.charCodeAt(0).toString(16);
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

  convertDashToCamelCase(name) {
    const camelName = name.replace(/-([a-z])/g, function (match, substring) {
      return substring.toUpperCase();
    });

    return camelName;
  }

  getFontFace(name, path, rails) {
    const getFontPath = function(name, path, rails, type) {
      let output = '';
      if (!rails) {
        output = '\'' + path + name + '.' + type + '\'';
      } else {
        output = 'font-path(\'' + name + '.' + type + '\')';
      }

      return output;
    };

    if (!name) throw 'The font name is not configured';
    if (!path && !rails) throw 'Font path error: Please configure fontPath, or set useRailsFontPath to true for a rails setup.';
    let output = '';
    output += '// Icon Font\n';
    output += '// --------------------------------------------------------\n';
    output = '@font-face {\n';
    output += `  font-family: \'${name}\';\n`;
    output += `  src: url(${getFontPath(name, path, rails, 'eot?#iefix')}) format(\'embedded-opentype\'),\n`;
    output += `    url(${getFontPath(name, path, rails, 'woff')}) format(\'woff\'),\n`;
    output += `    url(${getFontPath(name, path, rails, 'ttf')}) format(\'truetype\'),\n`;
    output += `    url(${getFontPath(name, path, rails, 'svg')}) format(\'svg\');\n`;
    output += '  font-style: normal;\n  font-weight: normal;\n';
    output += '}\n';

    return output;
  }

  getMixins(name) {
    if (!name) throw 'The font name is not configured';
    const mixins = new Mixins(name);
    let output = '';
    output += mixins.iconMixin();
    output += '\n';
    output += mixins.usageMixins();

    return output;
  }

  writeScssFile(glyphs, config) {
    // Start output and record glyph variables
    let output = '';
    output += '// Donezo Generated Icon File:\n// File will be overwritten if regenerated\n\n';
    output += '// Icon Variables\n';
    output += '// --------------------------------------------------------\n';

    glyphs.forEach((glyph) => {
      let glyphName = glyph.name;

      if (config.dashToCamelCase) {
        glyphName = this.convertDashToCamelCase(glyph.name);
      }

      output += '$' + config.variablePrefix + glyphName +
        ': \'\\' + glyph.hex + '\';\n';
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

    fs.writeFile(process.cwd() + config.stylesFile, output, (err) => {
      if (err) throw err;
      console.log('Donezo!');
    });
  }
}
