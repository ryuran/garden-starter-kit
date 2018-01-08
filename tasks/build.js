'use strict';

require('./svg');
require('./assets');
require('./css');
require('./js');
require('./html');
require('./import');
require('./doc');
require('./test');

// MODULES
// ----------------------------------------------------------------------------
const gulp = require('gulp');
const del = require('del');

// TASK DEFINITION
// ----------------------------------------------------------------------------
// $ gulp build:clean
// ----------------------------------------------------------------------------
// Supprime le contenu du build
gulp.task('build:clean', function buildClean() {
  return del(['build/**/*']);
});
gulp.task('build:clean').description = 'Delete the content of the build folder.'

// $ grunt build
// ----------------------------------------------------------------------------
// Régénère le contenu du dossier `/build`. Il est recommandé de lancer cette
// tache à chaque fois que l'on réalise un `git pull` du projet.
gulp.task('build', gulp.series(
  'build:clean',
  'svg:symbols',
  gulp.parallel(
    'assets',
    'css',
    'js',
    'html'
  ),
  gulp.parallel(
    'import',
    'doc'
  ),
  'test'
));
gulp.task('build').description = 'Compile the whole project into build folder.';
gulp.task('build').flags = {
  '--optimize' : 'Optimize for production.',
  '--relax'    : 'Skip tests. ☠ ☠ ☠'
};
