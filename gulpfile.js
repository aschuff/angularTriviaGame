var gulp = require('gulp'); // npm install gulp
var sass = require('gulp-sass'); // npm install gulp-sass
var browserify = require('gulp-browserify') // npm install gulp-browserify

// SPECIFYING DEPENDENCIES
// gulp.task('default',['html', 'css', 'js'])
gulp.task('default', ['html', 'css', 'js'])

// SASS TO CSS
gulp.task('css', function (){
  gulp.src('./styles.css')
  .pipe(sass())
  .pipe(gulp.dest('./public'))
});

// MINIFY
gulp.task('html', function(){
  gulp.src('./index.html')
    .pipe(gulp.dest('./public'))
});

//JS
gulp.task('js', function(){
  gulp.src('./js/*.js')
    .pipe(browserify())
    .pipe(gulp.dest('./public'))
});

// WATCH CHANGES
gulp.task('watch', function(){ //npm install gulp-watch
  gulp.watch('./styles.css', ['css']);
  gulp.watch('./index.html', ['html']);
  gulp.watch('./js/*.js', ['js']);
});
