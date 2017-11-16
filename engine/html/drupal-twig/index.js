// Définition du LazyPipe pour utiliser Twig
'use strict';

var path = require('path');
var fs = require('fs');
var plumber  = require('gulp-plumber');
var gulpTwig = require('./gulp-drupal-twig');
var Twig = gulpTwig.twig;
var twigDrupalRenderArray = require('@cleverage/twig-drupal-render-array');

require('twig-drupal-filters')(Twig);

module.exports = function (gulp, ENV, err) {
  // UTILS
  // ----------------------------------------------------------------------------

  // TWIG CONFIGURATION
  // ----------------------------------------------------------------------------
  var CONF = {};

  // We compile only files with the good format (extention)
  var ext = ENV.html.ext !== undefined ? ENV.html.ext : '*.*';

  var DEST = ENV.html['dest-dir'];

  var folderPath = path.resolve(__dirname, './extends');
  fs.readdirSync(folderPath).forEach(function (file) {
    require(path.join(folderPath, file))(Twig);
  });

  var dataParser = twigDrupalRenderArray(Twig, {
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
