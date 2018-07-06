'use strict';

// MODULES
// ----------------------------------------------------------------------------
const path = require('path');
const gulp = require('gulp');
const gif = require('gulp-if');
const plumber = require('gulp-plumber');
const a11y = require('../engine/tests/a11y');
const err = require('../tools/errcb');
const ENV = require('../tools/env');

// LINTING SOURCE
// ----------------------------------------------------------------------------
const SRC = {
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
const css = require('@cleverage/gsk-' + ENV.css.engine + '/linter.js');
const js = require('../engine/js/simple.linter.js');

// TASK DEFINITION
// ----------------------------------------------------------------------------

// $ gulp test:js
// ----------------------------------------------------------------------------
// Lint js
gulp.task('test:js', function (cb) {
  return gulp.src(SRC.js)
    .pipe(plumber({ errorHandler: err }))

    // En mode relax, on ignore les tests
    .pipe(gif(!ENV.all.relax, js()))
    .on('end', cb);
});
gulp.task('test:js').description = 'Lint JS files.';

// $ gulp test:css
// ----------------------------------------------------------------------------
// Lint sources files for css
gulp.task('test:css', function (cb) {
  return gulp.src(SRC.css)
    .pipe(plumber({ errorHandler: err }))

    // En mode relax, on ignore les tests
    .pipe(gif(!ENV.all.relax, css()))
    .on('end', cb);
});
gulp.task('test:css').description = 'Lint CSS files.'

// $ gulp test:a11y
// ----------------------------------------------------------------------------
// Test html accessibility
gulp.task('test:a11y', function (cb) {
  if (ENV.all.relax) {
    return cb;
  }

  return gulp.src(SRC.html)
    .pipe(a11y());
});
gulp.task('test:a11y').description = 'Automatized accessibility tests for HTML files.';

// $ gulp test
// ----------------------------------------------------------------------------
// Run every test of this project
gulp.task('test', function (cb) {
  // En mode relax, on ignore les tests
  if (ENV.all.relax) {
    return cb();
  }

  return gulp.series('test:js', 'test:css', 'test:a11y')(cb);
});
gulp.task('test').description = 'Run every test.';
