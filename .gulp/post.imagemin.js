// Définition du LazyPipe pour utiliser Imagemin
'use strict';

var lazypipe = require('lazypipe');
var imagemin = require('gulp-imagemin');

module.exports = function () {
  var CONF = {
    // Plugins
    // use: [],

    // PNG
    optimizationLevel: 5,

    // JPEG
    progressive: false,

    // GIF
    interlaced: false,

    // SVG
    multipass: false,
    svgoPlugins: [
      {removeHiddenElems  : false},
      {convertStyleToAttrs: false}
    ]
  };

  var lazystream = lazypipe()
    .pipe(imagemin, CONF);

  return lazystream();
};
