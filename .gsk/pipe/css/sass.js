// Définition du LazyPipe pour utiliser compass
'use strict';

// MODULES
// ----------------------------------------------------------------------------
var lazypipe = require('lazypipe');
var compass  = require('gulp-compass');
var scsslint = require('gulp-scss-lint');
var ENV      = require('../../tools/env');

// SASS CONFIGURATION
// ----------------------------------------------------------------------------
var SASS = {
  bundle_exec: true,
  config_file: './config.rb',
  environment: ENV.all.optimize ? 'production' : 'development',
  sass       : ENV.css['src-dir'],
  css        : ENV.css['dest-dir']
};

// LINTER CONFIGURATION
// ----------------------------------------------------------------------------
var LINT = {
  bundleExec: true,
  config: './.scss-lint.yml'
};

module.exports = function () {
  var lazystream = lazypipe()
    .pipe(scsslint, LINT)
    .pipe(scsslint.failReporter)
    .pipe(compass, SASS);

  return lazystream();
};
