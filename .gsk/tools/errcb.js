'use strict';

var gutil = require('gulp-util');

module.exports = function err(error) {
  gutil.log(gutil.colors.red('ERROR:'), error.message);
  this.emit('end');
};
