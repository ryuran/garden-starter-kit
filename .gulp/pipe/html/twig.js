// Définition du LazyPipe pour utiliser Twig
'use strict';

var path     = require('path');
var lazypipe = require('lazypipe');
var twig     = require('gulp-twig');
var data     = require('gulp-data');
var ENV      = require('../../tools/env').html;

function processData(file) {
  return require(path.resolve(path.join(ENV['data-dir'], path.basename(file.path, '.twig') + '.json')));
}

module.exports = function () {
  var lazystream = lazypipe()
    .pipe(data, processData)
    .pipe(twig);

  return lazystream();
};
