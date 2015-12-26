// Définition du LazyPipe pour utiliser Handlebars
'use strict';

var path     = require('path');
var _        = require('underscore');
var lazypipe = require('lazypipe');
var gulp     = require('gulp');
var gutil    = require('gulp-util');
var hbs      = require('gulp-hbs');
var data     = require('gulp-data');
var dir      = require('require-dir');
var ENV      = require('../../tools/env');

var DEST     = path.resolve(ENV.html['dest-dir']);
var DEST_URL = DEST.replace(path.resolve(ENV.connect.baseDir), '')
                   .replace(path.sep, '/');

var genericDataFile  = path.resolve(path.join(ENV.html['data-dir'], 'data.json'));

var layouts  = path.join(ENV.html['src-dir'], 'layout', '**', '*.hbs');

// HBS HELPERS
// ----------------------------------------------------------------------------
var helpers = dir('../../tools/handlebars/helpers');

hbs.registerHelper(helpers);

// UTILS
// ----------------------------------------------------------------------------
function processData(file) {
  var base = file.path.replace(ENV.html['src-dir'], ENV.html['data-dir']);
  var specificDataFile = base.replace('.hbs', '.json');
  var gData = {};
  var sData = {};

  try {
    gData = require(genericDataFile);
  } catch (e) {
    gutil.log(gutil.colors.yellow('WARN:'),
      'Unable to find data from',
      genericDataFile.replace(path.resolve('.'), '').slice(1)
    );
  }

  try {
    sData = require(specificDataFile);
  } catch (e) {
    gutil.log(gutil.colors.yellow('WARN:'),
      'Unable to find data from',
      specificDataFile.replace(path.resolve('.'), '').slice(1)
    );
  }

  var data  = _.extend({}, gData, sData);
  data.url  = file.path.replace(ENV.html['src-dir'], DEST_URL).replace('.hbs', '.html');

  hbs.registerPartial('body', file.contents.toString());

  return data;
}

module.exports = function () {
  var lazystream = lazypipe()
    .pipe(data, processData)
    .pipe(hbs, gulp.src(layouts), {
      dataSource: 'data',
      defaultTemplate: ENV.html.layout || '_default.hbs'
    });

  return lazystream();
};
