'use strict';

// MODULES
// ----------------------------------------------------------------------------
var path         = require('path');
var gulp         = require('gulp');
var plumber      = require('gulp-plumber');
var postcss      = require('gulp-postcss');
var bs           = require('browser-sync');
var err          = require('../tools/errcb');
var ENV          = require('../tools/env');

// On ne va compiler que les fichiers dont le nom ne commence pas par un _
var SRC  = [
  path.join(ENV.css['src-dir'],       '**', '*'),
  path.join('!' + ENV.css['src-dir'], '**', '_*'),
  path.join('!' + ENV.css['src-dir'], '**', '*.md')
];
var DEST = ENV.css['dest-dir'];


// CONDITIONAL PIPELINE
// ----------------------------------------------------------------------------
var pipeline = require('@cleverage/gsk-' + ENV.css.engine);


// TASK DEFINITION
// ----------------------------------------------------------------------------
// $ gulp css
// ----------------------------------------------------------------------------
// Gère la compilation des fichiers CSS
gulp.task('css', function () {
  var processors = Object.keys(ENV.css.postcss).map(function (key) {
    var processor = require(key);
    return processor(ENV.css.postcss[key]);
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
