// Définition du LazyPipe pour utiliser LESS
'use strict';

// MODULES
// ----------------------------------------------------------------------------
var lazypipe = require('lazypipe');
var less     = require('gulp-less');

module.exports = function (ENV) {
  var lazystream = lazypipe()
    .pipe(less, {
      compress: ENV.all.optimize
    });

  return lazystream();
};
