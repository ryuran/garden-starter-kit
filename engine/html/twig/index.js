// Définition du LazyPipe pour utiliser Twig
'use strict';

const path = require('path');
const fs = require('fs');
const lazypipe = require('lazypipe');
const log = require('fancy-log');
const color = require('ansi-colors');
const plumber = require('gulp-plumber');
const twig = require('gulp-twig');
const data = require('gulp-data');

module.exports = function (gulp, ENV, err) {
  const genericDataFile = path.resolve(path.join(ENV.html['data-dir'], 'data.json'));

  // UTILS
  // ----------------------------------------------------------------------------
  function processData(file) {
    const dataDir = path.resolve(ENV.html['data-dir'])
    const htmlRelativePath = path.relative(path.resolve(ENV.html['src-dir']), file.path);
    const specificDataFile = path.resolve(dataDir, htmlRelativePath.replace('.twig', '.json'))
    let gData = {};
    let sData = {};

    try {
      gData = require(genericDataFile);
    } catch (e) {
      log(color.yellow('WARN:'),
        'Unable to find data from',
        path.relative(path.resolve('.'), genericDataFile)
      );
    }

    try {
      sData = require(specificDataFile);
    } catch (e) {
      log(color.yellow('WARN:'),
        'Unable to find data from',
        path.relative(path.resolve('.'), specificDataFile)
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
      log(color.red('ERROR:'), error.plugin);

      if (error.stack) {
        error.stack.split('\n').forEach(function (line) {
          log(color.red('STACK:'), line);
        });
      } else {
        log(color.red('ERROR:'), error.message);
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
