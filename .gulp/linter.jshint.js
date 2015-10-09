// Définition du LazyPipe pour utiliser jshint
'use strict';

var lazypipe = require('lazypipe');
var jshint   = require('gulp-jshint');
var stylish  = require('jshint-stylish');

module.exports = function () {
  var lazystream = lazypipe()
    .pipe(jshint)
    .pipe(jshint.reporter, stylish)
    .pipe(jshint.reporter, 'fail');

  return lazystream();
};
