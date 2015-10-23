// Required singleton modules
// ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
var cli      = require('./.gulp/tool.cli.js');
var gulp     = require('gulp');
var gutil    = require('gulp-util');
var plumber  = require('gulp-plumber');
var bs       = require('browser-sync');


// Set up environnement
// ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
var CONF = {};

try {
  CONF = require('./gulp.json');
} catch (e) {
  gutil.log(gutil.colors.red('ERROR:'), e.message);
}

var CLI_ENV = cli.parse({
  // Pour dire qu'on veut optimiser pour la prod
  '--optimize'  : 'boolean',
  '-o'          : 'boolean',
  '--production': 'boolean'
});

var ENV = {
  // Pour dire si on veut optimiser pour la prod
  optimize: CLI_ENV['--optimize']   ||
            CLI_ENV['-o']           ||
            CLI_ENV['--production'] ||
            !!CONF.optimize         ||
            false
};


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
// TODO: Use configuration to make all of this customizable

// LINTERS
// ----------------------------------------------------------------------------
var jslint  = require('./.gulp/linter.jshint.js');
var csslint = require('./.gulp/linter.scss.js');

// COMPILER
// ----------------------------------------------------------------------------
var css  = require('./.gulp/compiler.compass.js');
var html = require('./.gulp/compiler.twig.js');

// POST PROCESSOR
// ----------------------------------------------------------------------------
var postcss  = require('./.gulp/post.postcss.js');
var posthtml = require('./.gulp/post.prettify.js');


// TASKS
// ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••

// $ gulp css
// ----------------------------------------------------------------------------
// Gère la compilation des fichiers CSS
gulp.task('css', function () {
  var SRC  = './src/css/**/*.scss';
  var DEST = './build/css';

  gulp.src(SRC)
    .pipe(plumber({ errorHandler: err }))
    .pipe(csslint())
    .pipe(css(ENV))
    .pipe(postcss())
    .pipe(gulp.dest(DEST))
    .pipe(bs.stream());
});

// $ gulp html
// ----------------------------------------------------------------------------
// Gère la compilation des fichiers HTML
gulp.task('html', function () {
  var SRC  = ['./src/html/*.twig','!./src/html/_*.twig'];
  var DEST = './build';

  gulp.src(SRC)
    .pipe(plumber({ errorHandler: err }))
    .pipe(html())
    .pipe(posthtml())
    .pipe(gulp.dest(DEST))
    .pipe(bs.stream());
});

// $ gulp js
// ----------------------------------------------------------------------------
// Gère toutes les actions d'assemblage JavaScript
gulp.task('js', function () {
  var SRC    = './src/js/**/*.js';
  var DEST   = './build/js';

  var stream = gulp.src(SRC)
    .pipe(plumber({ errorHandler: err }));

  if (jslint) {
    stream = stream.pipe(jslint(ENV));
  }

  stream.pipe(gulp.dest(DEST));
});

// $ gulp test
// ----------------------------------------------------------------------------
// Lance tous les tests existants sur le code source


// $ gulp connect
// ----------------------------------------------------------------------------
// Lance un serveur pour voir le site statique produit
// Le site peut être vu en même temps sur plusieurs navigateur (y compris
// mobiles) la navigation sera automatiquement synchronisée grâce à BrowserSync.
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
      scroll: true
    },
    reloadDebounce: 500
  });
});

// $ gulp watch
// ----------------------------------------------------------------------------
// Configuration de tous les watcher du projet
gulp.task('watch', function () {
  // Watch SCSS files
  gulp.watch('./src/css/**/*.scss', ['css']);

  // Watch Twig files and associated JSON files
  gulp.watch(['./src/html/**/*.twig', '.src/data/**/*.json'], ['html']);
});

// $ grunt build
// ----------------------------------------------------------------------------
// Régénère le contenu du dossier `/build`. Il est recommandé de lancer cette
// tache à chaque fois que l'on réalise un `git pull` du projet.
gulp.task('build', ['css', 'js', 'html']);

// $ gulp live
// ----------------------------------------------------------------------------
// Definie un watcher pour tous les fichier qu'un serveur statique pour voir le
// contenu du repertoir `/build`. Ce serveur utilise BrowserSync pour
// rafraichir automatiquement le navigateur dès qu'un  fichier est mis à jour.
gulp.task('live', ['build', 'connect', 'watch']);
