'use strict';

// MODULES
// ----------------------------------------------------------------------------
var gulp     = require('gulp');
var svgstore = require('gulp-svgstore');
var inject   = require('gulp-inject');
var ENV      = require('../tools/env').svg;
var path     = require('path');

var SRC  = path.join(ENV['src-dir'],  '/**', '*.svg');
var DEST = path.join(ENV['html-dir'], '/**', '*.html');

// TASK DEFINITION
// ----------------------------------------------------------------------------

// $ gulp svg:symbols
// ----------------------------------------------------------------------------
// Inclus des svg du dossier symbols dans le html
gulp.task('svg:symbols', ['html'], function () {

  var svgs = gulp
      .src(SRC)
      .pipe(svgstore({ inlineSvg: true }));

  function fileContents (filePath, file) {
    return file.contents.toString();
  }

  return gulp
      .src(DEST)
      .pipe(inject(svgs, { transform: fileContents }))
      .pipe(gulp.dest(ENV['html-dir']));
});

// $ gulp svg
// ----------------------------------------------------------------------------
// Gère toutes les tâches svg
gulp.task('svg', ['svg:symbols']);