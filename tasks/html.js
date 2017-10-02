'use strict';

// MODULES
// ----------------------------------------------------------------------------
var path     = require('path');
var gulp     = require('gulp');
var plumber  = require('gulp-plumber');
var bs       = require('browser-sync');
var err      = require('../tools/errcb');
var ENV      = require('../tools/env');

// CONDITIONAL PIPELINE
// ----------------------------------------------------------------------------
var pipeline = require('@cleverage/gsk-' + ENV.html.engine);

// We don't compile files with a name starting by _
// And only files whit the good format (extention)
var ext = {
  handlebars: '*.hbs',
  twig: '*.twig'
};

function getExt(engine) {
  return (ext[engine] !== undefined) ? ext[engine] : '*.*';
}

var SRC  = [
  path.join(ENV.html['src-dir'], '**', getExt(ENV.html.engine)),
  path.join('!' + ENV.html['src-dir'], '**', '_*')
];
var DEST = ENV.html['dest-dir'];


// TASK DEFINITION
// ----------------------------------------------------------------------------
// $ gulp html
// ----------------------------------------------------------------------------
// Gère la compilation des fichiers HTML
gulp.task('html', 'Compile HTML files.', function () {
  return gulp.src(SRC)
    .pipe(plumber({ errorHandler: err }))
    .pipe(pipeline(ENV))
    .pipe(gulp.dest(DEST))
    .on('end', bs.reload);
});
