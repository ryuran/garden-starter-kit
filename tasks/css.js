'use strict';

// MODULES
// ----------------------------------------------------------------------------
const path         = require('path');
const gulp         = require('gulp');
const plumber      = require('gulp-plumber');
const postcss      = require('gulp-postcss');
const bs           = require('browser-sync');
const err          = require('../tools/errcb');
const ENV          = require('../tools/env');

// On ne va compiler que les fichiers dont le nom ne commence pas par un _
const SRC  = [
  path.join(ENV.css['src-dir'],       '**', '*'),
  path.join('!' + ENV.css['src-dir'], '**', '_*'),
  path.join('!' + ENV.css['src-dir'], '**', '*.md')
];
const DEST = ENV.css['dest-dir'];

// CONDITIONAL PIPELINE
// ----------------------------------------------------------------------------
const pipeline = require('@cleverage/gsk-' + ENV.css.engine);

// TASK DEFINITION
// ----------------------------------------------------------------------------
// $ gulp css
// ----------------------------------------------------------------------------
// Gère la compilation des fichiers CSS
gulp.task('css', function () {
  const processors = Object.keys(ENV.css.postcss).map(function (key) {
    return require(key)(ENV.css.postcss[key]);
  });
  return gulp.src(SRC, { nodir: true })
    .pipe(plumber({ errorHandler: err }))
    .pipe(pipeline(ENV))
    .pipe(postcss(processors))
    .pipe(gulp.dest(DEST))
    .on('end', bs.reload);
});
gulp.task('css').description = 'Compile CSS files into build folder.';
gulp.task('css').flags = {
  '--optimize' : 'Optimize for production.',
  '--relax' : 'Skip tests. ☠ ☠ ☠'
}
