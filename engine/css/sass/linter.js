// Définition du LazyPipe pour linter sass
'use strict';

// MODULES
// ----------------------------------------------------------------------------
var lazypipe = require('lazypipe');
var sasslint = require('gulp-sass-lint');

module.exports = function () {
  var lazystream = lazypipe()
    .pipe(sasslint, {
      configFile: './.sass-lint.yml'
    })
    .pipe(sasslint.format)
    .pipe(sasslint.failOnError);

  return lazystream();
};
