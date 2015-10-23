// Required singleton modules
// ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
var cli      = require('./.gulp/tool.cli.js');
var gulp     = require('gulp');
var gutil    = require('gulp-util');
var plumber  = require('gulp-plumber');
var bs       = require('browser-sync');
var del      = require('del');
var runner   = require('run-sequence');


// Set up environnement
// ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
var CONF = {};

try {
  CONF = require('./gulp.json');
} catch (e) {
  gutil.log(gutil.colors.red('ERROR:'), e.message);
}

var CLI_ENV = cli.parse([
  // Pour dire qu'on veut optimiser pour la prod
  {id: 'optimize', cli: ['o', 'optimize', 'p', 'production'], value: 'boolean'}
]);

var ENV = {
  // Pour dire si on veut optimiser pour la prod
  optimize: CLI_ENV.optimize ||
            cli.sanitize.BOOLEAN(CONF.optimize)
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
var imagemin = require('./.gulp/post.imagemin.js');


// TASKS
// ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••

// $ gulp assets
// ----------------------------------------------------------------------------
// Copy tout les assets static du projet
gulp.task('assets', ['image'], function () {
  return gulp.src([
    'src/assets/**/*',
    '!src/assets/@(img|sprites)',
    '!src/assets/@(img|sprites)/**/*'
  ]).pipe(gulp.dest('build'));
});

// $ gulp image
// ----------------------------------------------------------------------------
// Gère toutes les optimisations d'image:
// * imagemin: Optimisation non destructive
gulp.task('image', function () {
  var SRC  = './src/assets/img/*';
  var DEST = './build/img';

  var stream = gulp.src(SRC)
    .pipe(plumber({ errorHandler: err }));

  if (imagemin) {
    stream = stream.pipe(imagemin());
  }

  return stream.pipe(gulp.dest(DEST));
});

// $ gulp css
// ----------------------------------------------------------------------------
// Gère la compilation des fichiers CSS
gulp.task('css', function () {
  var SRC  = './src/css/**/*.scss';
  var DEST = './build/css';

  var stream = gulp.src(SRC)
    .pipe(plumber({ errorHandler: err }))
    .pipe(csslint())
    .pipe(css(ENV))
    .pipe(postcss())
    .pipe(gulp.dest(DEST))
    .pipe(bs.stream());

  return stream;
});

// $ gulp html
// ----------------------------------------------------------------------------
// Gère la compilation des fichiers HTML
gulp.task('html', function () {
  var SRC  = ['./src/html/*.twig','!./src/html/_*.twig'];
  var DEST = './build';

  var stream = gulp.src(SRC)
    .pipe(plumber({ errorHandler: err }))
    .pipe(html())
    .pipe(posthtml())
    .pipe(gulp.dest(DEST))
    .pipe(bs.stream());

  return stream;
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

  return stream.pipe(gulp.dest(DEST));
});

// $ gulp test
// ----------------------------------------------------------------------------
// Lance tous les tests existants sur le code source
// gulp.task('test', function () {
//
// });


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
  // Watch images
  gulp.watch('./src/img/*', ['image']);

  // Watch SCSS files
  gulp.watch('./src/css/**/*.scss', ['css']);

  // Watch Twig files and associated JSON files
  gulp.watch(['./src/html/**/*.twig', '.src/data/**/*.json'], ['html']);
});

// $ gulp clean
// ----------------------------------------------------------------------------
// Supprime le contenu du build
gulp.task('clean', function () {
  return del(['build/**/*']);
});

// $ grunt build
// ----------------------------------------------------------------------------
// Régénère le contenu du dossier `/build`. Il est recommandé de lancer cette
// tache à chaque fois que l'on réalise un `git pull` du projet.
gulp.task('build', function (cb) {
  runner('clean', ['assets', 'css', 'js', 'html'], cb);
});

// $ gulp live
// ----------------------------------------------------------------------------
// Définie un watcher pour tous les fichier qu'un serveur statique pour voir le
// contenu du répertoire `/build`. Ce serveur utilise BrowserSync pour
// rafraîchir automatiquement le navigateur dès qu'un  fichier est mis à jour.
gulp.task('live', function (cb) {
  runner('build', ['connect', 'watch'], cb);
});
