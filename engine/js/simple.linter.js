// Définition du LazyPipe pour linter JS
'use strict';

// MODULES
// ----------------------------------------------------------------------------
const lazypipe = require('lazypipe');
const eslint = require('gulp-eslint');

module.exports = function () {
  const lazystream = lazypipe()
    .pipe(eslint)
    .pipe(eslint.format)
    .pipe(eslint.failAfterError);

  return lazystream();
};
