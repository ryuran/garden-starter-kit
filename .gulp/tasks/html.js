'use strict';

// MODULES
// ----------------------------------------------------------------------------
var path     = require('path');
var gulp     = require('gulp');
var plumber  = require('gulp-plumber');
var prettify = require('gulp-prettify');
var bs       = require('browser-sync');
var err      = require('../tools/errcb');
var ENV      = require('../tools/env').html;

// On ne va compiler que les fichiers dont le nom ne commence pas par un _
var SRC  = [
  path.join(ENV['src-dir'], '**', '*'),
  path.join('!' + ENV['src-dir'], '**', '_*')
];
var DEST = ENV['dest-dir'];

// CONDITIONAL PIPELINE
// ----------------------------------------------------------------------------
var pipeline = require('../pipe/html/' + ENV.engine + '.js');

// PRETTIFY CONFIGURATION
// ----------------------------------------------------------------------------
var PRT_CONF = {
  indent_size          : 2,
  preserve_newlines    : true,
  max_preserve_newlines: 2,
  unformatted          : [
    'pre', 'code', 'a', 'sub', 'sup', 'b', 'i', 'u', 'strong', 'em'
  ]
};

// TASK DEFINITION
// ----------------------------------------------------------------------------
// $ gulp html
// ----------------------------------------------------------------------------
// Gère la compilation des fichiers HTML
gulp.task('html', function () {
  return gulp.src(SRC)
    .pipe(plumber({ errorHandler: err }))
    .pipe(pipeline())
    .pipe(prettify(PRT_CONF))
    .pipe(gulp.dest(DEST))
    .pipe(bs.stream());
});
