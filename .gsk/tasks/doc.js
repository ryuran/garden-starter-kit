'use strict';

// MODULES
// ----------------------------------------------------------------------------
var fs       = require('fs');
var gulp     = require('gulp');
var gutil    = require('gulp-util');
var newer    = require('gulp-newer');
var marked   = require('gulp-marked');
var wrapper  = require('gulp-wrapper');
var prettify = require('gulp-prettify');

var SRC  = './docs/**/*.md';
var DEST = './build/doc';


// MARKED CONFIGURATION
// ----------------------------------------------------------------------------
var MD_CONF = {
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
};


// PRETTIFY CONFIGURATION
// ----------------------------------------------------------------------------
var PRT_CONF;

try {
  // gulp-prettify est trop con pour gérer lui même les fichiers .jsbeautifyrc
  PRT_CONF = JSON.parse(fs.readFileSync('./.jsbeautifyrc'));
} catch (e) {
  gutil.log(gutil.colors.yellow('WARN:'), '[.jsbeautifyrc]', e.message);

  PRT_CONF = {
    brace_style          : 'collapse',
    end_with_newline     : true,
    indent_size          : 2,
    indent_char          : ' ',
    indent_inner_html    : false,
    indent_scripts       : 'normal',
    max_preserve_newlines: 2,
    preserve_newlines    : true,
    unformatted          : [
      'pre', 'code', 'a', 'sub', 'sup', 'b', 'i', 'u', 'strong', 'em'
    ]
  };
}


// WRAPPER CONFIGURATION
// ----------------------------------------------------------------------------
var WRP_CONF = {
  header: [
    '<!DOCTYPE html>',
    '<html>',
    '<head>',
      '<title>${filename} - Documentation</title>',
      '<link rel="stylesheet" href="../css/doc.css">',
      '<link rel="stylesheet" href="https://highlightjs.org/static/demo/styles/github-gist.css">',
    '</head>',
    '<body class="ca__">',
      '<div class="ca__page">',
        '<main class="ca__main">',
          '<article class="ca__home">'
  ].join('\n'),
  footer: [
          '</article>',
        '</main>',
      '</div>',
    '</body>',
    '</html>'
  ].join('\n')
};


// TASK DEFINITION
// ----------------------------------------------------------------------------
// $ gulp doc
// ----------------------------------------------------------------------------
// Génère toutes la doc du projet
gulp.task('doc', function () {
  return gulp.src(SRC)
    .pipe(newer(DEST))
    .pipe(marked(MD_CONF))
    .pipe(wrapper(WRP_CONF))
    .pipe(prettify(PRT_CONF))
    .pipe(gulp.dest(DEST));
});
