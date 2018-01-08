// Définition du LazyPipe pour linter Stylus
'use strict';

// MODULES
// ----------------------------------------------------------------------------
const lazypipe = require('lazypipe');
const a11y = require('gulp-a11y');
const ENV = require('../../tools/env').html;

// LINTER CONFIGURATION
// ----------------------------------------------------------------------------
const CONFIG = {
  viewports: ['1024x768'],
  delay: Number(ENV.a11y && ENV.a11y.delay) || 1
};

if (ENV.a11y && ENV.a11y.viewports) {
  CONFIG.viewports = ENV.a11y.viewports;

  if (!Array.isArray(CONFIG.viewports)) {
    CONFIG.viewports = [CONFIG.viewports];
  }
}

module.exports = function () {
  let lazystream = lazypipe();

  CONFIG.viewports.forEach(function (vp) {
    lazystream = lazystream
      .pipe(a11y, {
        viewport: vp,
        delay: CONFIG.delay
      })
      .pipe(a11y.reporter);
  });

  return lazystream();
};
