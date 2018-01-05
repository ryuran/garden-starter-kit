'use strict';

require('./images');

// MODULES
// ----------------------------------------------------------------------------
const path  = require('path');
const gulp  = require('gulp');
const newer = require('gulp-newer');
const ENV   = require('../tools/env');

// On va déplacer tous les fichiers sauf les images
const SRC  = [
  path.join(ENV.assets['src-dir'], '**', '*'),
  '!' + ENV.images['src-dir'],
  path.join('!' + ENV.images['src-dir'], '**', '*')
];
const DEST = ENV.assets['dest-dir'];

// TASK DEFINITION
// ----------------------------------------------------------------------------
// $ gulp assets
// ----------------------------------------------------------------------------
// Copy tout les assets static du projet
gulp.task('assets:copy', function () {
  return gulp.src(SRC)
    .pipe(newer(DEST))
    .pipe(gulp.dest(DEST));
});
gulp.task('assets:copy').description = 'Copy all static assets into build folder.'

gulp.task('assets', gulp.series(['images', 'assets:copy']));
gulp.task('assets').description = 'Process and copy assets.'
