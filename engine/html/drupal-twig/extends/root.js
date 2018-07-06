// {% root %}
// --------------------------------------------------------------------------
// Provide the relative URL path to the directory of the current file

const path = require('path');

module.exports = function (instance) {
  'use strict';
  const twigExtend = (instance.extend) ? instance.extend : instance.exports.extend;

  twigExtend(function (Twig) {
    Twig.exports.extendTag({
      type : 'root',
      regex: /^root$/,
      next : [ ],
      open : true,

      compile: function (token) {
        delete token.match;
        return token;
      },

      parse: function (token, context/*, chain*/) {
        const dir   = path.parse(context._target.relative).dir;
        let depth = (dir === '' ? [] : dir.split(path.sep)).length;

        return {
          chain : false,
          output: (function () {
            const up = ['.'];
            while (depth--) { up.push('..'); }
            return up.join('/');
          })()
        };
      }
    });
  });
};
