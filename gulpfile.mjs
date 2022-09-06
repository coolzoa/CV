
/**
 * Third party dependencies
 */
import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass'
import gulpCleanCss from 'gulp-clean-css';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import babel from 'gulp-babel';
import sourceMap from 'gulp-sourcemaps';
import glob from 'glob';

/**
 * Native dependencies
 */
import path from 'path';

//Set SASS compiler
const sass = gulpSass(dartSass);

const paths = {
    src: 'src',
    dist: 'dist',
    js: 'js',
    css: 'css'
}

/**
 * Compile SASS styles
 */
const compileSass = () => {
    return gulp.src(path.join(paths.src, 'styles', '**', '*.scss'))
        .pipe(sourceMap.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourceMap.write())
        .pipe(gulp.dest(path.join(paths.src, 'css'), { sourcemaps: '.'}))
}

/**
 * Minify CSS files
 */
const minifyCss = () => {
    return gulp.src(path.join(paths.src, 'css', '*.css'))
        .pipe(gulpCleanCss({ compatibility: 'ie8' }))
        .pipe(gulp.dest(path.join(paths.dist, 'css')))
}

//=====Gulp main tasks=====

/**
 * Build assets for deployment
 */
export const build = gulp.series(
  gulp.parallel(compileSass),
  gulp.parallel(minifyCss)
);
