// Définition du LazyPipe pour utiliser Twig
'use strict';

var path = require('path');
var fs = require('fs');
var lazypipe = require('lazypipe');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var twig = require('gulp-twig');
var data = require('gulp-data');

module.exports = function (gulp, ENV, err) {
  var genericDataFile = path.resolve(path.join(ENV.html['data-dir'], 'data.json'));

  // UTILS
  // ----------------------------------------------------------------------------
  function processData(file) {
    var base = file.path.replace(ENV.html['src-dir'], ENV.html['data-dir']);
    var specificDataFile = base.replace('.twig', '.json');
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

    return Object.assign({}, gData, sData);
  }

  var twigExtends = [];
  var folderPath = path.resolve(__dirname, './extends');
  fs.readdirSync(folderPath).forEach(function (file) {
    twigExtends.push(require(path.join(folderPath, file)));
  });

  // TWIG CONFIGURATION
  // ----------------------------------------------------------------------------
  var CONF = {
    errorLogToConsole: true,
    onError: function (error) {
      gutil.log(gutil.colors.red('ERROR:'), error.plugin);

      if (error.stack) {
        error.stack.split('\n').forEach(function (line) {
          gutil.log(gutil.colors.red('STACK:'), line);
        });
      } else {
        gutil.log(gutil.colors.red('ERROR:'), error.message);
      }

      this.emit('end');
    },
    extend: function (Twig) {
      twigExtends.forEach(function(twigExtend) {
        twigExtend(Twig);
      });
    }
  }

  var pipeline = lazypipe()
    .pipe(data, processData)
    .pipe(twig, CONF);

  // We don't compile files with a name starting by _
  // And only files whit the good format (extention)
  var ext = ENV.html.pattern !== undefined ? ENV.html.pattern : '*.twig';

  var SRC  = [
    path.join(ENV.html['src-dir'], '**', ext),
    path.join('!' + ENV.html['src-dir'], '**', '_*')
  ];

  var DEST = ENV.html['dest-dir'];

  return gulp.src(SRC)
    .pipe(plumber({ errorHandler: err }))
    .pipe(pipeline())
    .pipe(gulp.dest(DEST))
};
