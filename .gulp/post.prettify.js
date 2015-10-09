// Définition du LazyPipe pour utiliser Prettify
'use strict';

var lazypipe = require('lazypipe');
var prettify = require('gulp-prettify');

module.exports = function () {
  var CONF = {
    indent_size          : 2,
    preserve_newlines    : true,
    max_preserve_newlines: 2,
    unformatted          : [
      'pre', 'code', 'a', 'sub', 'sup', 'b', 'i', 'u', 'strong', 'em'
    ]
  };

  var lazystream = lazypipe()
    .pipe(prettify, CONF);

  return lazystream();
};
