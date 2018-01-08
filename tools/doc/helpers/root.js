// {% root %}
// --------------------------------------------------------------------------
// Provide the relative URL path to the directory of the current file

var path = require('path');

module.exports = function (Twig) {
  Twig.extendTag({
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
};
