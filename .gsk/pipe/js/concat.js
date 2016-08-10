// Définition de gulp js version "simple"
'use strict';

// MODULES
// ----------------------------------------------------------------------------
var path      = require('path');
var gulp      = require('gulp');
var gif       = require('gulp-if');
var plumber   = require('gulp-plumber');
var concat    = require('gulp-concat');
var sourcemap = require('gulp-sourcemaps');
var uglify    = require('gulp-uglify');
var bs        = require('browser-sync');
var err       = require('../../tools/errcb');
var ENV       = require('../../tools/env');
var merge     = require('merge-stream');

// TASK DEFINITION
// ----------------------------------------------------------------------------
// $ gulp js
// ----------------------------------------------------------------------------
// Gère toutes les actions d'assemblage JavaScript
gulp.task('js', 'Concatenate JS files into build folder.', ['test:js'], function () {

  // You may want to specify the files order in _config.json_, via the following
  // attribute: `ENV.js.files`
  // ```
  // "files"    : [{
  //     "src"  : "toto.js",
  //     "dest" : "toto.js"
  //   },{
  //     "src" : [
  //       "lib/**/*",
  //       "tutu.js"
  //     ],
  //     "dest" : "tutu.js"
  //   }]
  // ```
  // Otherwise files will be concatenated in alphabetical order, starting with
  // _lib_ folder
  var FILES = ENV.js.files;
  if(!FILES) {
    FILES = [{
      src: [
        path.join(ENV.js['src-dir'], 'lib', '**', '*'),
        path.join(ENV.js['src-dir'], '**', '*')
      ],
      dest: ENV.js.filename
    }];

  // set source paths as absolute
  } else {
    FILES.map(function(file) {
      if(!Array.isArray(file.src)) {
        file.src = [file.src];
      }
      file.src = file.src.map(function(src) {
        return path.join(ENV.js['src-dir'], src);
      });
      return file;
    });
  }

  var DEST = ENV.js['dest-dir'];

  return merge.apply(this, FILES.map(function(file) {
    return gulp.src(file.src)
      .pipe(plumber({ errorHandler: err }))
      .pipe(sourcemap.init())
      .pipe(concat(file.dest))
      .pipe(gif(ENV.all.optimize, uglify()))
      .pipe(sourcemap.write('.'))
      .pipe(gulp.dest(DEST))
      .pipe(bs.stream());
  }));

}, {
  options: {
    optimize : 'Optimize for production.',
    relax    : 'Skip tests. ☠ ☠ ☠'
  }
});
