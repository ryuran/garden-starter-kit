// Définition du LazyPipe pour utiliser compass
'use strict';

// MODULES
// ----------------------------------------------------------------------------
var lazypipe  = require('lazypipe');
var concat    = require('gulp-concat');
var sourcemap = require('gulp-sourcemaps');
var uglify    = require('gulp-uglify');
var ENV       = require('../../tools/env');


module.exports = function () {
  var lazystream = lazypipe();

  if (ENV.all.optimize) {
    return lazystream
      .pipe(concat, 'scripts.js')
      .pipe(uglify)();
  }

  return lazystream
    .pipe(sourcemap.init)
    .pipe(concat, 'scripts.js')
    .pipe(sourcemap.write, '.')();
};
