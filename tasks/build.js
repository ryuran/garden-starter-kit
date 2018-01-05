'use strict';

// MODULES
// ----------------------------------------------------------------------------
var gulp = require('gulp');
var del = require('del');
var runner = require('run-sequence');

// Task functions
function buildClean() {
  return del(['build/**/*']);
}

// TASK DEFINITION
// ----------------------------------------------------------------------------
// $ gulp build:clean
// ----------------------------------------------------------------------------
// Supprime le contenu du build
gulp.task('build:clean', buildClean);
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
  'test:a11y'
));
gulp.task('build').description = 'Compile the whole project into build folder.';
gulp.task('build').flags = {
  '--optimize' : 'Optimize for production.',
  '--relax'    : 'Skip tests. ☠ ☠ ☠'
};
