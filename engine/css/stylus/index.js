// Définition du LazyPipe pour utiliser Stylus
'use strict';

// MODULES
// ----------------------------------------------------------------------------
var lazypipe = require('lazypipe');
var stylus = require('gulp-stylus');

module.exports = function (ENV) {
  var lazystream = lazypipe()
    .pipe(stylus, {
      compress:  ENV.all.optimize || false,
      linenos : !ENV.all.optimize,
      'include-css': true
    });

  return lazystream();
};
