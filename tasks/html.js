'use strict';

// MODULES
// ----------------------------------------------------------------------------
var gulp = require('gulp');
var bs = require('browser-sync');
var err = require('../tools/errcb');
var ENV = require('../tools/env');

// CONDITIONAL PIPELINE
// ----------------------------------------------------------------------------
var engine = require('@cleverage/gsk-' + ENV.html.engine);

// TASK DEFINITION
// ----------------------------------------------------------------------------
// $ gulp html
// ----------------------------------------------------------------------------
// Gère la compilation des fichiers HTML
gulp.task('html', function () {
  return engine(gulp, ENV, err).on('end', bs.reload);
});
gulp.task('html').description = 'Compile HTML files.';
