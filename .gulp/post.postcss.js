// Définition du LazyPipe pour utiliser PostCSS
'use strict';

var lazypipe     = require('lazypipe');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

module.exports = function () {
  var lazystream = lazypipe()
    .pipe(postcss, [
      autoprefixer({browsers: ['> 4%', 'ie >= 8']})
    ]);

  return lazystream();
};
