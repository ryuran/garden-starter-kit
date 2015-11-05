// Définition du LazyPipe pour utiliser Twig
'use strict';

var path     = require('path');
var _        = require('underscore');
var lazypipe = require('lazypipe');
var twig     = require('gulp-twig');
var data     = require('gulp-data');
var ENV      = require('../../tools/env').html;

var genericDataFile  = path.resolve(path.join(ENV['data-dir'], 'data.json'));

function processData(file) {
  var specificDataFile = path.resolve(path.join(ENV['data-dir'], path.basename(file.path, '.twig') + '.json'));
  var gData = {};
  var sData = {};

  try {
    gData = require(genericDataFile);
  } catch (e) {}

  try {
    sData = require(specificDataFile);
  } catch (e) {}

  return _.extend({}, gData, sData);
}

module.exports = function () {
  var lazystream = lazypipe()
    .pipe(data, processData)
    .pipe(twig);

  return lazystream();
};
