// Définition du LazyPipe pour utiliser LESS
'use strict';

// MODULES
// ----------------------------------------------------------------------------
var lazypipe = require('lazypipe');
var less     = require('gulp-less');
var lesshint = require('gulp-lesshint');
var ENV      = require('../../tools/env');

// LESS CONFIGURATION
// ----------------------------------------------------------------------------
var CONF = {
  compress: ENV.all.optimize
};

// LINTER CONFIGURATION
// ----------------------------------------------------------------------------
var LINT = {
  configPath: './.lesshintrc'
};

module.exports = function () {
  var lazystream = lazypipe()
    .pipe(lesshint, LINT)
    .pipe(lesshint.reporter)
    .pipe(lesshint.reporter, 'fail')
    .pipe(less, CONF);

  return lazystream();
};
