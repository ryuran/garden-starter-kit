var fs = require('fs-extra');
var gulp = require('gulp');
var path = require('path');
var twig = require('gulp-twig');
var rename = require('gulp-rename');

module.exports = function (config) {
  // write config file
  fs.writeFile('./gsk.json', JSON.stringify(config, null, 2) , 'utf-8', function (err) {
    if (err) throw err;
    console.log('Congratalation! You have successfully initialized your project');
  });

  // copy files relativly to choosen config
  // conditional install for other packages

  var base = path.resolve(__dirname, '../starter');
  // files wildcard relative to directory
  var files = [
    base + '/.editorconfig',
    base + '/.eslintrc.json',
    base + '/kss.json',
    base + '/webpack-config.js',
    base + '/docs/**/*',
    base + '/src/assets/**/*',
    base + '/src/css/**/*.md',
    base + '/src/data/**/*',
    base + '/src/js/**/*',
    base + '/src/html/**/*.json', // data sample for kss
  ];

  if (config.html.engine === 'twig') {
    files.push(base + '/src/html/**/*.twig');
  } else if (config.html.engine === 'handlebars') {
    files.push(base + '/src/html/**/*.hbs');
  }

  if (config.css.engine === 'compass' || config.css.engine === 'sass') {
    files.push(base + '/src/css/**/*.scss');

    if (config.css.engine === 'compass') {
      files.push(base + '/.scss-lint.yml');
    } else if (config.css.engine === 'sass') {
      files.push(base + '/.sass-lint.yml');
    }
  } else if (config.css.engine === 'stylus') {
    files.push(base + '/src/css/**/*.styl');
    files.push(base + '/.stylintrc');
  } else if (config.css.engine === 'less') {
    files.push(base + '/src/css/**/*.less');
    files.push(base + '/.lesslintrc');
  }

  console.log('files', files);
  console.log('base', base);
  console.log('dest', process.cwd());

  gulp.src(files, {base: base, dot: true})
  .pipe(gulp.dest(process.cwd()));

  gulp.src(base + '/.gitignore.dist', {base: base, dot: true})
  .pipe(rename('.gitignore'))
  .pipe(gulp.dest(process.cwd()));


  gulp.src(base + '/readme.dist.md', {base: base, dot: true})
  .pipe(twig({data: require(path.join(process.cwd(), 'package.json'))}))
  .pipe(rename('readme.md'))
  .pipe(gulp.dest(process.cwd()));
}
