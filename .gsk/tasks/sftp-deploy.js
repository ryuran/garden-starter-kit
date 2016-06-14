'use strict';

// MODULES
// ----------------------------------------------------------------------------
var path   = require('path');
var gulp   = require('gulp');
var sftp   = require('gulp-sftp');
var prompt = require('gulp-prompt');
var pkg    = require('../../package.json');
var ENV    = require('../tools/env');
var gutil  = require('gulp-util');

// TASK DEFINITION
// ----------------------------------------------------------------------------
// $ gulp sftp-deploy
// ----------------------------------------------------------------------------
// Déploi le dossier du build sur un serveur de démo via le protocol SFTP
// Les identifiants sont dans le fichier `.ftpass` (à créer au même niveau que
// le fichier `gulpfile.js`):
// ```
// {
//   "key1": {
//     "username": "<username>",
//     "password": "<password>"
//   }
// }
// ```
gulp.task('sftp-deploy', function () {

  var SRC = path.join(ENV['sftp-deploy']['src-dir'], '**', '*');

  var options = ENV['sftp-deploy'];

  // set `options.remotePath` from `options['dest-dir']`
  // and replace elements like `%pkg.name%` with the corresponding value from `package.json`
  options.remotePath = options['dest-dir']
    .replace(/%pkg\.\w+%/g, function(placeholder) {
      return placeholder.replace(/%pkg\.(\w+)%/, function(ph, pkgKey) {
        return pkg[pkgKey];
      });
    });

  gutil.log('package.json: ' + pkg.name + ' ' + pkg.version);

  return gulp.src(SRC)
    // remind user to build first
    .pipe(prompt.confirm('Are you on the correct branch, and have built before deployment?'))
    // confirm destination URL
    .pipe(prompt.confirm({
      message : 'Destination: sftp://' + options.host + ':' + options.port + options.remotePath,
      default : true})
    )
    .pipe(sftp(options));

});