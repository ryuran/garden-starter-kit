// Définition du LazyPipe pour utiliser Twig
'use strict';

const path = require('path');
const fs = require('fs');
const lazypipe = require('lazypipe');
const gutil = require('gulp-util');
const plumber = require('gulp-plumber');
const twig = require('gulp-twig');
const data = require('gulp-data');

module.exports = function (gulp, ENV, err) {
  const genericDataFile = path.resolve(path.join(ENV.html['data-dir'], 'data.json'));

  // UTILS
  // ----------------------------------------------------------------------------
  function processData(file) {
    const base = file.path.replace(ENV.html['src-dir'], ENV.html['data-dir']);
    const specificDataFile = base.replace('.twig', '.json');
    let gData = {};
    let sData = {};

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

  const twigExtends = [];
  const folderPath = path.resolve(__dirname, './extends');
  fs.readdirSync(folderPath).forEach(function (file) {
    twigExtends.push(require(path.join(folderPath, file)));
  });

  // TWIG CONFIGURATION
  // ----------------------------------------------------------------------------
  const CONF = {
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

  const pipeline = lazypipe()
    .pipe(data, processData)
    .pipe(twig, CONF);

  // We don't compile files with a name starting by _
  // And only files whit the good format (extention)
  const ext = ENV.html.pattern !== undefined ? ENV.html.pattern : '*.twig';

  const SRC  = [
    path.join(ENV.html['src-dir'], '**', ext),
    path.join('!' + ENV.html['src-dir'], '**', '_*')
  ];

  const DEST = ENV.html['dest-dir'];

  return gulp.src(SRC)
    .pipe(plumber({ errorHandler: err }))
    .pipe(pipeline())
    .pipe(gulp.dest(DEST))
};
