// Define the LazyPipe to use eyeglass
'use strict';

// MODULES
// ----------------------------------------------------------------------------
var lazypipe = require('lazypipe');
var sass = require('gulp-sass');
var importer = require('node-sass-import');

module.exports = function (ENV) {
  var lazystream = lazypipe()
    .pipe(sass, {
      sass: ENV.css['src-dir'],
      css: ENV.css['dest-dir'],
      importer: importer,
      precision: 8
    });
  return lazystream();
};
