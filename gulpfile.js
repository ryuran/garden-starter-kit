// Required singleton modules
// ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
var process  = require('process');
var path     = require('path');
var gulp     = require('gulp');
var gutil    = require('gulp-util');
var lazypipe = require('lazypipe');
var plumber  = require('gulp-plumber');
var bs       = require('browser-sync');

// Utils
// ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
// Simple error handler for plumber
function err(error) {
  gutil.log(gutil.colors.red('ERROR:'), error.message);
  this.emit('end');
}

// Lazypipe
// ----------------------------------------------------------------------------
// util functions to setup various pipe to be used in various tasks

// LINTERS
// ----------------------------------------------------------------------------

// SCSS Linter
function scsslint() {
  var scsslint = require('gulp-scss-lint');

  return lazypipe()
    .pipe(scsslint, {
      bundleExec: true,
      config: './.scss-lint.yml'
    })
    .pipe(scsslint.failReporter)();
}

// COMPILER
// ----------------------------------------------------------------------------

// CSS
// TODO: Allow multiple CSS pre-processor (that abstraction make that easy)
function css() {
  var compass = require('gulp-compass');

  return lazypipe()
    .pipe(compass, {
      bundle_exec: true,
      config_file: './config.rb',
      sass       : './src/css',
      css        : './build/css'
    })();
}

// HTML
function html() {
  var twig     = require('gulp-twig');
  var data     = require('gulp-data');

  function processData(file) {
    return require('./src/data/' + path.basename(file.path, '.twig') + '.json');
  }

  return lazypipe()
    .pipe(data, processData)
    .pipe(twig)();
}

// POST PROCESSOR
// ----------------------------------------------------------------------------

// CSS
function postcss() {
  var postcss      = require('gulp-postcss');
  var autoprefixer = require('autoprefixer');

  return lazypipe()
    .pipe(postcss, [
      autoprefixer({browsers: ['> 4%', 'ie >= 8']})
    ])();
}

// HTML
function prettify() {
  var prettify = require('gulp-prettify');

  return lazypipe()
    .pipe(prettify, {
      indent_size          : 2,
      preserve_newlines    : true,
      max_preserve_newlines: 2,
      unformatted          : [
        'pre', 'code', 'a', 'sub', 'sup', 'b', 'i', 'u', 'strong', 'em'
      ]
    })();
}


// TASKS
// ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••

// $ gulp css
// ----------------------------------------------------------------------------
// Gère la compilation des fichiers CSS

gulp.task('css', function() {
  var SRC  = './src/css/**/*.scss';
  var DEST = './build/css';

  gulp.src(SRC)
    .pipe(plumber({ errorHandler: err }))
    .pipe(scsslint())
    .pipe(css())
    .pipe(postcss())
    .pipe(gulp.dest(DEST))
    .pipe(bs.stream());
});

gulp.task('html', function () {
  var SRC  = ['./src/html/*.twig','!./src/html/_*.twig'];
  var DEST = './build';

  gulp.src(SRC)
    .pipe(plumber({ errorHandler: err }))
    .pipe(html())
    .pipe(prettify())
    .pipe(gulp.dest(DEST))
    .pipe(bs.stream());
});

gulp.task('connect', function () {
  bs.init({
    port: 8000,
    open: false,
    server: {
      baseDir: './build'
    },
    ghostMode: {
      clicks: true,
      forms : true,
      scroll: false
    },
    reloadDebounce: 500
  });
});

gulp.task('watch', function() {
  gulp.watch('./src/css/**/*.scss', ['css']);
  gulp.watch(['./src/html/**/*.twig', '.src/data/**/*.json'], ['html']);
});

gulp.task('build', ['css', 'html']);

// $ gulp live
// ----------------------------------------------------------------------------
// Definie un watcher pour tous les fichier qu'un serveur statique pour voir le
// contenu du repertoir `/build`. Ce serveur utilise BrowserSync pour
// rafraichir automatiquement le navigateur dès qu'un  fichier est mis à jour.

gulp.task('live', ['connect', 'watch']);
