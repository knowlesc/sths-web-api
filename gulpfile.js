const gulp = require('gulp');
const gls = require('gulp-live-server');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const mocha = require('gulp-mocha');
const path = require('path');
const tslint = require('gulp-tslint');

var server = gls.new(['build/app.js']);

gulp.task('default', ['watch', 'server', 'tslint']);

gulp.task('watch', () => {
  gulp.watch(['src/**/*.ts'], ['tslint', 'server']);
});

gulp.task('server', ['build', 'test'], () => {
  server.start();
});

gulp.task('build', () => {
  var tsResult = gulp.src(['src/**/*.ts'])
    .pipe(sourcemaps.init())
    .pipe(ts({
      target: 'es6',
      module: 'commonjs'
    }));

  return tsResult.js
    .pipe(sourcemaps.write({
      includeContent: false,
      sourceRoot: (file) => path.join(__dirname, 'src')
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('tslint', () => {
  return gulp.src('src/**/*.ts')
    .pipe(tslint({
      formatter: 'stylish'
    }))
    .pipe(tslint.report({
      emitError: false
    }))
});

gulp.task('test', ['build'], () => {
  gulp.src('build/**/*.tests.js', {read: false})
    .pipe(mocha());
});
