export default class Mixins {
  constructor(name) {
    this.fontName = name;
  }

  iconMixin() {
    let output = '';
    output += '@mixin fontIcon {\n';
    output += `  font-family: \'${this.fontName}\', sans-serif;\n`;
    output += '}\n';

    return output;
  }

  usageMixins() {
    return '@mixin protoIcon {\n' +
        '  @include fontIcon;\n' +
        '  display: inline-block;\n' +
        '  font-style: normal;\n' +
        '  font-weight: normal;\n' +
        '  font-variant: normal;\n' +
        '  line-height: 1;\n' +
        '  text-transform: none;\n' +
        '  vertical-align: baseline;\n' +
        '  speak: none;\n' +
        '}\n\n' +
        '@mixin iconPre($icon) {\n' +
        '  speak: none;\n\n' +
        '  &::before {\n' +
        '    @include protoIcon;\n' +
        '    content: $icon;\n' +
        '  }\n' +
        '}\n\n' +
        '@mixin iconPost($icon) {\n' +
        '  speak: none;\n\n' +
        '  &::after {\n' +
        '    @include protoIcon;\n' +
        '    content: $icon;\n' +
        '  }\n' +
        '}\n';
  }
}
