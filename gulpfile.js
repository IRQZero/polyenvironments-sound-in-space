var gulp = require('gulp');
var browserify = require('gulp-browserify');

gulp.task('scripts', function() {
  gulp.src('./src/index.js')
    .pipe(browserify({
      transform: ['hbsfy']
    }))
    .pipe(gulp.dest('./built/'));
});

gulp.task('default', ['scripts']);

