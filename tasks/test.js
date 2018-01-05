'use strict';

// MODULES
// ----------------------------------------------------------------------------
var path = require('path');
var gulp = require('gulp');
var gif = require('gulp-if');
var plumber = require('gulp-plumber');
var err = require('../tools/errcb');
var ENV = require('../tools/env');

// LINTING SOURCE
// ----------------------------------------------------------------------------
var SRC = {
  css: [
    path.join(ENV.css['src-dir'],       '**', '*'),
    path.join('!' + ENV.css['src-dir'], '**', '_*'),
    path.join('!' + ENV.css['src-dir'], '**', '*.md')
  ],
  js: [
    path.join(ENV.js['src-dir'], '**', '*'),
    path.join('!' + ENV.js['src-dir'], 'lib', '**', '*')
  ],
  html: [
    path.join(ENV.html['dest-dir'], 'pages', '**', '*.html')
  ]
};

// LINTER
// ----------------------------------------------------------------------------
var css = require('@cleverage/gsk-' + ENV.css.engine + '/linter.js');
var js = require('../engine/js/simple.linter.js');
var a11y = require('../engine/html/a11y.linter.js');

// TASK DEFINITION
// ----------------------------------------------------------------------------

// $ gulp test:js
// ----------------------------------------------------------------------------
// Lint les fichiers source pour les CSS
gulp.task('test:js', function () {
  return gulp.src(SRC.js)
    .pipe(plumber({ errorHandler: err }))

    // En mode relax, on ignore les tests (c'est mal)
    .pipe(gif(!ENV.all.relax, js()));
});
gulp.task('test:js').description = 'Lint JS files.';

// $ gulp test:css
// ----------------------------------------------------------------------------
// Lint les fichiers source pour les CSS
gulp.task('test:css', function () {
  return gulp.src(SRC.css)
    .pipe(plumber({ errorHandler: err }))

    // En mode relax, on ignore les tests (c'est mal)
    .pipe(gif(!ENV.all.relax, css()));
});
gulp.task('test:css').description = 'Lint CSS files.'

// $ gulp test:a11y
// ----------------------------------------------------------------------------
// Lint les fichiers html pour l'accessibilité
gulp.task('test:a11y', function () {
  return gulp.src(SRC.html)
    .pipe(plumber({ errorHandler: err }))

    // En mode relax, on ignore les tests (c'est mal)
    .pipe(gif(!ENV.all.relax, a11y()));
});
gulp.task('test:a11y').description = 'Lint HTML files for accessibility.';

// $ gulp test
// ----------------------------------------------------------------------------
// Lint tous les fichiers sources du projet
gulp.task('test', function (cb) {
  // En mode relax, on ignore les tests (c'est mal)
  if (ENV.all.relax) { cb(null); }

  gulp.series('test:js', 'test:css', 'test:a11y', cb);
});
gulp.task('test').description = 'Run every test.';
