// Définition du LazyPipe pour utiliser scss_lint
'use strict';

var lazypipe = require('lazypipe');
var scsslint = require('gulp-scss-lint');

module.exports = function () {
  var CONF = {
    bundleExec: true,
    config: './.scss-lint.yml'
  };

  var lazystream = lazypipe()
    .pipe(scsslint, CONF)
    .pipe(scsslint.failReporter);

  return lazystream();
};
