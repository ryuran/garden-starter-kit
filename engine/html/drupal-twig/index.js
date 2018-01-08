// Définition du LazyPipe pour utiliser Twig
'use strict';

const path = require('path');
const fs = require('fs');
const plumber  = require('gulp-plumber');
const gulpTwig = require('gulp-twig-pipe');
const Twig = gulpTwig.twig;
const twigDrupalRenderArray = require('@cleverage/twig-drupal-render-array');

require('twig-drupal-filters')(Twig);

module.exports = function (gulp, ENV, err) {
  // UTILS
  // ----------------------------------------------------------------------------

  // TWIG CONFIGURATION
  // ----------------------------------------------------------------------------

  // We compile only files with the good format (extention)
  const ext = ENV.html.ext !== undefined ? ENV.html.ext : '*.*';

  const DEST = ENV.html['dest-dir'];

  const folderPath = path.resolve(__dirname, './extends');

  fs.readdirSync(folderPath).forEach(function (file) {
    require(path.join(folderPath, file))(Twig);
  });

  const dataParser = twigDrupalRenderArray(Twig, {
    pathResolver: function(key) {
      return path.join(ENV.html['src-dir'], key + ext);
    },
  });

  return gulp.src(path.join(ENV.html['data-dir'], '**', '*.json'))
    .pipe(plumber({
      errorHandler: err,
    }))
    .pipe(
      gulpTwig(gulp.src(path.join(ENV.html['src-dir'], '**', '*' + ext)), {
        dataParser: dataParser,
      })
    )
    .pipe(gulp.dest(DEST));
};
