'use strict';

// MODULES
// ----------------------------------------------------------------------------
var path    = require('path');
var gulp    = require('gulp');
var plumber = require('gulp-plumber');
var jshint  = require('gulp-jshint');
var jscs    = require('gulp-jscs');
var stylish = require('jshint-stylish');
var bs      = require('browser-sync');
var err     = require('../tools/errcb');
var ENV     = require('../tools/env').js;

var SRC  = path.join(ENV['src-dir'], '**', '*');
var DEST = ENV['dest-dir'];


// CONDITIONAL PIPELINE
// ----------------------------------------------------------------------------
var pipeline = require('../pipe/js/' + ENV.engine + '.js');


// TASK DEFINITION
// ----------------------------------------------------------------------------
// $ gulp js
// ----------------------------------------------------------------------------
// Gère toutes les actions d'assemblage JavaScript
gulp.task('js', function () {
  return gulp.src(SRC)
    .pipe(plumber({ errorHandler: err }))
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'))
    .pipe(jscs())
    .pipe(jscs.reporter())
    .pipe(jscs.reporter('fail'))
    .pipe(pipeline())
    .pipe(gulp.dest(DEST))
    .pipe(bs.stream());
});
