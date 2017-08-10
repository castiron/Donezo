'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mixins = function () {
  function Mixins(name) {
    _classCallCheck(this, Mixins);

    this.fontName = name;
  }

  _createClass(Mixins, [{
    key: 'iconMixin',
    value: function iconMixin() {
      var output = '';
      output += '@mixin fontIcon {\n';
      output += '  font-family: \'' + this.fontName + '\', sans-serif;\n';
      output += '}\n';

      return output;
    }
  }, {
    key: 'usageMixins',
    value: function usageMixins() {
      return '@mixin protoIcon {\n' + '  @include fontIcon;\n' + '  display: inline-block;\n' + '  font-style: normal;\n' + '  font-weight: normal;\n' + '  font-variant: normal;\n' + '  line-height: 1;\n' + '  text-transform: none;\n' + '  vertical-align: baseline;\n' + '  speak: none;\n' + '}\n\n' + '@mixin iconPre($icon) {\n' + '  speak: none;\n\n' + '  &::before {\n' + '    @include protoIcon;\n' + '    content: $icon;\n' + '  }\n' + '}\n\n' + '@mixin iconPost($icon) {\n' + '  speak: none;\n\n' + '  &::after {\n' + '    @include protoIcon;\n' + '    content: $icon;\n' + '  }\n' + '}\n';
    }
  }]);

  return Mixins;
}();

exports.default = Mixins;