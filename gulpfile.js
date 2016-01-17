var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var src = 'tim.js';

gulp.task('uglify', function(){
  gulp.src(src)
  .pipe(uglify())
  .pipe(rename({ extname: '.min.js' }))
  .pipe(gulp.dest('./'));
});

gulp.task('default', ['uglify'], function(){
  gulp.watch(src, ['uglify']);
});
