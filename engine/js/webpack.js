// Définition de gulp js version "webpack"
'use strict';

// MODULES
// ----------------------------------------------------------------------------
const path = require('path');
const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const plumber = require('gulp-plumber');
const bs = require('browser-sync');
const err = require('../../tools/errcb');
const ENV = require('../../tools/env');

const SRC = path.join(ENV.js['src-dir'], '**', '*.js');
const DEST = ENV.js['dest-dir'];

const webpackConfig = require(path.relative(__dirname, path.join(process.cwd(), ENV.js.config)));

// TASK DEFINITION
// ----------------------------------------------------------------------------
// $ gulp js
// ----------------------------------------------------------------------------
// Gère toutes les actions d’assemblage JavaScript
gulp.task('js', function () {
  return gulp.src(SRC)
    .pipe(plumber({ errorHandler: err }))
    .pipe(webpackStream(webpackConfig(ENV), webpack))
    .pipe(gulp.dest(DEST))
    .on('end', bs.reload);
});
gulp.task('js').description = 'Compile JS files into build folder using webpack.';
gulp.task('js').flags = {
  '--optimize': 'Optimize for production.',
  '--relax': 'Skip tests. ☠ ☠ ☠'
};
