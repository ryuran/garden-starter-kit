// Définition du LazyPipe pour utiliser Stylus
'use strict';

// MODULES
// ----------------------------------------------------------------------------
var lazypipe = require('lazypipe');
var stylus   = require('gulp-stylus');
var stylint  = require('gulp-stylint');
var ENV      = require('../../tools/env');

// STYLUS CONFIGURATION
// ----------------------------------------------------------------------------
var CONF = {
  compress:  ENV.all.optimize || false,
  linenos : !ENV.all.optimize,
  'include-css': true
};

// LINTER CONFIGURATION
// ----------------------------------------------------------------------------
var LINT = {
  config: './.stylintrc'
};

module.exports = function () {
  var lazystream = lazypipe()
    .pipe(stylint, LINT)
    .pipe(stylint.reporter)
    .pipe(stylint.reporter, 'fail')
    .pipe(stylus, CONF);

  return lazystream();
};
