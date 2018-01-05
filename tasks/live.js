'use strict';

require('./connect');
require('./watch');

// MODULES
// ----------------------------------------------------------------------------
var gulp = require('gulp');

// TASK DEFINITION
// ----------------------------------------------------------------------------
// $ gulp live
// ----------------------------------------------------------------------------
// Définie un watcher pour tous les fichiers et lance un serveur statique pour
// voir le contenu du répertoire `/build`. Ce serveur utilise BrowserSync pour
// rafraîchir automatiquement le navigateur dès qu'un fichier est mis à jour.
gulp.task('live', gulp.series(
  'build',
  gulp.parallel(
    'connect',
    'watch'
  )
));
gulp.task('live').description = 'Build project (gulp build), starts a server (gulp connect) and starts the watchers (gulp watch).';
