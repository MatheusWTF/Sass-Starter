import { dest } from '../../../../AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/vinyl-fs';

//Dependencies / Plug-ins
  const gulp = require('gulp'),
        browserSync = require('browser-sync').create(),
        sass = require('gulp-sass'), 
        rename = require('gulp-rename'), 
        minify  = require('gulp-uglify');

/*
  Tasks
*/

//Compile Sass
gulp.task('sass', () => {
  gulp.src('src/style/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/style'))
});

//Minify Sass -> css
gulp.task('minify-style', () => {
  gulp.src('src/style/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(minify())
    .pipe(rename((path) =>{path.basename += min}))
    .pipe(gulp.dest('public/style'))
});

//Minify JS
gulp.task('minify-js', () => {
  gulp.src('src/script/*.js')
    .pipe(minify())
    .pipe(minify())
    .pipe(rename((path) =>{path.basename += min}))
    .pipe(gulp.dest('public/script'))
});

//Serve and Watch
gulp.task('serve', ['sass', 'minify-js'], () => {
  browserSync.init({
    server: './public'
  });
  gulp.watch(['src/style/sass/*.scss', 'src/script/*.js'], ['sass', 'minify-js']);
  gulp.watch(['public/*html']).on('change', browserSync.reload);
});

//Default Task
gulp.task('default', ['serve']);