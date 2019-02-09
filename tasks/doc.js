'use strict';

// MODULES
// ----------------------------------------------------------------------------
const path = require('path');
const glob = require('glob');
const gulp = require('gulp');
const data = require('gulp-data');
const newer = require('gulp-newer');
const dox = require('gulp-dox');
const twig = require('gulp-twig-pipe');
const ENV = require('../tools/env');

const SRC = path.join(ENV.doc['src-dir'], '**', '*.md');
const SRC_JS = path.join(ENV.js['src-dir'], '**', '*.js');

const DEST = path.resolve(ENV.doc['dest-dir']);
const DEST_URL = DEST.replace(path.resolve(ENV.connect.baseDir), '').replace(path.sep, '/');


// UTILS
// ----------------------------------------------------------------------------
function extractData(file) {
  const parsed = path.parse(file.path);

  // Basic configuration for MarkDown files
  let src = ENV.doc['src-dir'];
  let gPath = SRC;
  let rURL = DEST_URL;
  const out = {
    filename: parsed.name
  };

  // Extra configuration for JavaScript files
  if (parsed.ext === '.json') {
    out.data = JSON.parse(file.contents);
  }

  // Special case js/index.md which is the Javascript doc homepage
  const isJsHomePage = (parsed.name === 'index' && parsed.dir.slice(-3) === '/js');
  if (parsed.ext === '.json' || isJsHomePage) {
    src = ENV.js['src-dir'];
    gPath = SRC_JS;
    rURL += '/js';

    // Extra configuration for JavaScript files
    if (parsed.ext === '.json') {
      out.data = JSON.parse(file.contents);
    }
  }

  // Set up final URL for the document
  out.url = path.join(rURL, path.relative(src, file.path).replace(parsed.ext, '.html'));

  out.toc = [];

  // Index related content
  glob.sync(gPath)
    .reduce(function (a, f) {
      var u = rURL + '/' + path.relative(src, f.replace(path.parse(f).ext, '.html'));

      // Ignore JS API homepage (it has its own entry within templates)
      if (u === rURL + '/js/index.html') { return a; }

      a.push(u);

      return a;
    }, [])
    .sort(function (a, b) {
      return a.localeCompare(b);
    })
    .forEach(function (currentValue) {
      var p = path.parse(currentValue);

      var dir = p.dir.replace(rURL, '').replace(/^\//, '');

      var branch = out.toc;

      var folder = null;

      var name = p.name;

      if (dir !== '') {
        var dirs = dir.split('/')
        dirs.forEach(function (part){
          var found = branch.findIndex(function (e) {return e.name === part});
          if (found < 0) {
            folder = {
              name: part,
              children:[]
            };
            branch.push(folder);
          }
          else {
            folder = branch[found];
          }

          branch = folder.children;
        });

      }

      if (name !== 'index') {
        branch.push({
          name: name,
          url: currentValue
        });
      }
      else if (folder !== null) {
        folder.url = currentValue
      }
    });

  return out;
}

// TASK DEFINITION
// ----------------------------------------------------------------------------

// $ gulp doc:js
// ----------------------------------------------------------------------------
// Génère la documentation des fichiers javascripts
gulp.task('doc:js', function () {
  return gulp.src(SRC_JS)
    .pipe(newer(path.join(DEST, 'js')))
    .pipe(dox())
    .pipe(data(extractData))
    .pipe(twig(path.relative(process.cwd(), path.join(__dirname, '../tools/doc/jsdoc.html.twig')), { dataSource: 'data' }))
    .pipe(gulp.dest(path.join(DEST, 'js')));
});
gulp.task('doc:js').description = 'Compile Javascript documentation.';
