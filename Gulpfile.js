var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  git = require('gulp-git');

// Development Tasks

gulp.task('nodemon', function () {
  nodemon({ script: './app.js', env: { 'NODE_ENV': 'development' }})
    .on('restart');
});

gulp.task('default', ['nodemon']);

//Git Tasks

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
