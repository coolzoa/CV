
const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');



sass.compiler = require('node-sass');

//html
gulp.task('minify-html', () => {
  return gulp.src('./src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./'));
});

// Stylesheets
gulp.task('sass', function () {
    return gulp.src('./src/scss/**/*.scss')
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(gulp.dest('./css'));
  });

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

// Add vendor prefix
gulp.task('prefix', function(){
  return gulp.src('./css/*.css')
  .pipe(autoprefixer({
    overrideBrowsersList: ['last 80 version'],
    cascade: false
  }))
  .pipe(gulp.dest('./css'));
  
});



gulp.task('minify-css', () => {
  return gulp.src('./css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./css'));
});



gulp.task('build', gulp.series('sass', 'prefix', 'minify-css', 'minify-html'));


