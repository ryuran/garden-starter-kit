'use strict';

require('./images');

// MODULES
// ----------------------------------------------------------------------------
var path  = require('path');
var gulp  = require('gulp');
var newer = require('gulp-newer');
var ENV   = require('../tools/env');

// On va déplacer tous les fichiers sauf les images
var SRC  = [
  path.join(ENV.assets['src-dir'], '**', '*'),
  '!' + ENV.images['src-dir'],
  path.join('!' + ENV.images['src-dir'], '**', '*')
];
var DEST = ENV.assets['dest-dir'];

// task function
function assetsCopy() {
  return gulp.src(SRC)
    .pipe(newer(DEST))
    .pipe(gulp.dest(DEST));
}

// TASK DEFINITION
// ----------------------------------------------------------------------------
// $ gulp assets
// ----------------------------------------------------------------------------
// Copy tout les assets static du projet
gulp.task('assets:copy', assetsCopy);
gulp.task('assets:copy').description = 'Copy all static assets into build folder.'

gulp.task('assets', gulp.series(['images', 'assets:copy']));
gulp.task('assets').description = 'Process and copy assets.'
