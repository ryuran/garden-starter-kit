// Définition du LazyPipe pour utiliser Twig
'use strict';

var path     = require('path');
var lazypipe = require('lazypipe');
var twig     = require('gulp-twig');
var data     = require('gulp-data');

function processData(file) {
  return require('./../src/data/' + path.basename(file.path, '.twig') + '.json');
}

module.exports = function () {
  var lazystream = lazypipe()
    .pipe(data, processData)
    .pipe(twig);

  return lazystream();
};
