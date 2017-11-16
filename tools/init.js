const fs = require('fs-extra');
const gulp = require('gulp');
const path = require('path');
const twig = require('gulp-twig');
const rename = require('gulp-rename');

module.exports = function (config) {
  // write config file
  fs.writeFile('./gsk.json', JSON.stringify(config, null, 2) , 'utf-8', function (err) {
    if (err) throw err;
    console.log('Congratalation! You have successfully initialized your project');
  });

  // copy files relativly to choosen config
  // conditional install for other packages

  const base = path.resolve(__dirname, '../starter');
  // files wildcard relative to directory
  const files = [
    base + '/.editorconfig',
    base + '/.eslintrc.json',
    base + '/kss.js',
    base + '/webpack-config.js',
    base + '/docs/**/*',
    base + '/src/assets/**/*',
    base + '/src/css/**/*.md',
    base + '/src/data/**/*',
    base + '/src/js/**/*',
    base + '/src/html/**/*.json', // data sample for kss
  ];

  const dependencies = [
    'jquery@3.2.1',
    'slick-carousel@1.7.1',
  ];

  // Install html engine
  if (config.html.engine === 'twig') {
    files.push(base + '/src/html/**/*.twig');

    dependencies.push('@cleverage/gsk-twig');
  }

  // Install CSS engine
  if (config.css.engine === 'sass') {
    files.push(base + '/src/css/**/*.s+(a|c)ss');
    files.push(base + '/.sass-lint.yml');

    dependencies.push('@cleverage/gsk-sass');
  } else if (config.css.engine === 'compass') {
    files.push(base + '/src/css/**/*.s+(a|c)ss');
    files.push(base + '/.scss-lint.yml');
    files.push(base + '/config.rb');
    files.push(base + '/Gemfile');

    dependencies.push('@cleverage/gsk-compass');
  } else if (config.css.engine === 'stylus') {
    files.push(base + '/src/css/**/*.styl');
    files.push(base + '/.stylintrc');

    dependencies.push('@cleverage/gsk-stylus');
  } else if (config.css.engine === 'less') {
    files.push(base + '/src/css/**/*.less');
    files.push(base + '/.lesshintrc');

    dependencies.push('@cleverage/gsk-less');
  }

  gulp.src(files, {base: base, dot: true})
  .pipe(gulp.dest(process.cwd()));

  gulp.src(base + '/.gitignore.dist', {base: base, dot: true})
  .pipe(rename('.gitignore'))
  .pipe(gulp.dest(process.cwd()));


  gulp.src(base + '/readme.dist.md', {base: base, dot: true})
  .pipe(twig({data: require(path.join(process.cwd(), 'package.json'))}))
  .pipe(rename('readme.md'))
  .pipe(gulp.dest(process.cwd()));

  require('child_process').execSync('npm install ' + dependencies.join(' ') + ' --save-dev', {stdio: [0, 1, 2]});
}
