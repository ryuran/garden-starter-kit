'use strict';

// MODULES
// ----------------------------------------------------------------------------
var path = require('path');
var gulp = require('gulp');
var newer = require('gulp-newer');
var ENV = require('../tools/env');

var subTasks = [];

// factory: to not declare the function in the loop
function createImportTask(SRC, DEST) {
  return function () {
    return gulp.src(SRC)
      .pipe(newer(DEST))
      .pipe(gulp.dest(DEST));
  };
}

// Should check if ENV.import is an object
ENV.import = (ENV.import !== undefined) ? ENV.import : false;

if (ENV.import !== false) {
  for(var key in ENV.import) {
    if (ENV.import.hasOwnProperty(key)) {
      var conf = ENV.import[key];
      var subTaskName = 'import:' + key;

      // SUB-TASK DEFINITION
      // ----------------------------------------------------------------------------
      // $ gulp import:name
      // ----------------------------------------------------------------------------
      // Copy sources files in defined destination
      gulp.task(subTaskName, createImportTask(conf['src'], conf['dest-dir']));
      gulp.task(subTaskName).description = 'Copy imported files "' + key + '" into build folder.',

      subTasks.push(subTaskName);
    }
  }
}

// TASK DEFINITION
// ----------------------------------------------------------------------------
// $ gulp import
// ----------------------------------------------------------------------------
// Copy sources files in defined destinations
gulp.task('import', function (cb) {
  if (subTasks.length <= 0) {
    cb(null);
    return;
  }
  subTasks.push(cb);
  gulp.parallel.apply(gulp, subTasks);
});
gulp.task('import').description = 'Copy all imported files into build folder.';
