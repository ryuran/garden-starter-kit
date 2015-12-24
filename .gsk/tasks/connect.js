'use strict';

// MODULES
// ----------------------------------------------------------------------------
var gulp = require('gulp');
var bs   = require('browser-sync');
var ENV  = require('../tools/env').connect;


// TASK DEFINITION
// ----------------------------------------------------------------------------
// $ gulp connect
// ----------------------------------------------------------------------------
// Lance un serveur pour voir le site statique produit
// Le site peut être vu en même temps sur plusieurs navigateur (y compris
// mobiles) la navigation sera automatiquement synchronisée grâce à BrowserSync.
gulp.task('connect', function () {
  bs.init({
    port: ENV.port,
    open: ENV.open,
    server: {
      directory: ENV.directory,
      baseDir  : ENV.baseDir
    },
    ghostMode: {
      clicks: true,
      forms : true,
      scroll: true
    },
    reloadDebounce: 200
  });
});
