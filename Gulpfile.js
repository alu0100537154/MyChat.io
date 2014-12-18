var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  watch = require('gulp-watch'),
  livereload = require('gulp-livereload'),
  git = require('gulp-git');

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

gulp.task('add', function(){
  return gulp.src('.')
    .pipe(git.add());
});

gulp.task('push-dev', function(){
  git.push('origin', 'desarrollo', function(err){
    if(err) throw err;
  });
});

gulp.task('push-test', function(){
  git.push('origin', 'test', function(err){
    if(err) throw err;
  });
});

gulp.task('push-master', function(){
  git.push('origin', 'master', function(err){
    if(err) throw err;
  });
});

gulp.task('default', ['nodemon', 'watch']);