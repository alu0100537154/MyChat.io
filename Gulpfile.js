var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  watch = require('gulp-watch'),
  livereload = require('gulp-livereload');


gulp.task('nodemon', function () {
  nodemon({ script: './bin/www', env: { 'NODE_ENV': 'development' }})
    .on('restart');
});

gulp.task('watch', function() {
    var server = livereload();
    gulp.src(['*.js','routes/*.js', 'public/*.js'], { read: true })
        .pipe(watch({ emit: 'all' }))

    gulp.watch(['*.js','routes/*.js', 'views/**/*.*', 'public/**/*.*']).on('change', function(file) {
      server.changed(file.path);
  });
});

gulp.task('default', ['nodemon', 'watch']);