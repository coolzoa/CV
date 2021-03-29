
const config = require("./src/config.json");

const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();



sass.compiler = require('node-sass');

//html TODO
gulp.task('minify-html', () => {
  return gulp.src('./src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(config.html.build));
});

// Sass processing
gulp.task('sass', function () {
    return gulp.src(config.sass.src)
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(autoprefixer({
        overrideBrowsersList: ['last 80 versions'],
      }))
      .pipe(gulp.dest(config.sass.dest))
      .pipe(browserSync.reload({
        stream: true
      }))
  });

// CSS minify
  gulp.task('minify-css', function() {
    return gulp.src(config.css.src)
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest(config.css.dest));
  });

//Watch for file changes and reload
gulp.task('watch', function() {
  gulp.watch(config.sass.src, gulp.series('sass'));
  gulp.watch(config.html.src, gulp.series(browserSync.reload));
});

//Browser reload
gulp.task('browserSync', function(callback) {
  browserSync.init({
      server: {
        baseDir: config.baseDir
      }
  }, callback)
});

//default task for dev
gulp.task('default', gulp.series('sass', 'browserSync', 'watch'));






gulp.task('build', gulp.series('sass', 'minify-css', 'minify-html'));


