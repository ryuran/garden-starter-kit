// Définition du LazyPipe pour utiliser compass
'use strict';

var lazypipe = require('lazypipe');
var compass  = require('gulp-compass');

module.exports = function (ENV) {
  var CONF = {
    bundle_exec: true,
    config_file: './config.rb',
    environment: ENV.optimize ? 'production' : 'development',
    sass       : './src/css',
    css        : './build/css'
  };

  var lazystream = lazypipe()
    .pipe(compass, CONF);

  return lazystream();
};
