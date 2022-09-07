
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
import htmlMin from 'gulp-htmlmin';

/**
 * Native dependencies
 */
import path from 'path';

//Set SASS compiler
const sass = gulpSass(dartSass);

const paths = {
    src: 'src',
    dist: 'docs',
    vendor: 'vendor'
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

/**
 * Compile custom JavaScript files
 */
const compileJs = () => {
    return gulp.src(path.join(paths.src, 'scripts', '**', '*.js'))
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(gulp.dest(path.join(paths.src, 'js')))
}

/**
 * Minify custom JavaScript files
 */
const minifyJs = () => {
    return gulp.src(path.join(paths.src, 'js', '*.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.join(paths.dist, 'js')))
}

/**
 * Minify HTML files
 */
const minifyHtml = () => {
    return gulp.src(path.join(paths.src, '*.html'))
        .pipe(htmlMin({ removeComments: true, collapseWhitespace: true }))
        .pipe(gulp.dest(path.join(paths.dist)))
}

/**
 * Vendor files
 */
const buildVendorFiles = () => {
    return gulp.src(path.join(paths.src, paths.vendor, '**', '*'))
        .pipe(gulp.dest(path.join(paths.dist, 'vendor')))
}

/**
 * media files
 */
const minifyMediaFiles = () => {
    return gulp.src(path.join(paths.src, 'public', 'img', '*'))
        .pipe(gulp.dest(path.join(paths.dist, 'public', 'img')))
}

//=====Gulp main tasks=====

/**
 * Build assets for deployment
 */
export const build = gulp.series(
  gulp.parallel(compileSass, compileJs),
  gulp.parallel(minifyCss, minifyJs, buildVendorFiles, minifyHtml, minifyMediaFiles)
);
