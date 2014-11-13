var gulp = require('gulp');
var del = require('del');
var argv = require('yargs').argv;

var buildDir = './build';
var cwd = process.cwd();


// TODO: copying recursively is not doing the right thing. genericize from concatJS below
gulp.copy = function(src, dest) {
  return gulp.src(src, {base: buildDir})
    .pipe(gulp.dest(dest));
};
//
//gulp.task('cleanBuild',function(cb){
//  del(['./assets_build/js/*'], cb);
//
//});
//
//gulp.task('concatJS', function(){
// // This just copies all files over for now
//  gulp.copy('./assets/js/**', './assets/js' );
//});
//
//gulp.task('minifyJS', ['concatJS'], function(){
//  //
//});


//
//gulp.task('cleanDeploy', function(cb) {
//  del([buildDir + '/*'], {force: true}, cb);
//});
//
//gulp.task('deploy', ['cleanDeploy'], function() {
//  ['./package.json',
//    './*.hbs',
//    './assets/**/*',
//    './partials/**/*']
//    .map(function(src) {
//      gulp.copy(src, buildDir)
//    });
//});

gulp.task('concatJS', function(){
  gulp.src('./assets/js/**').pipe(gulp.dest('./build/assets/js'));
});

gulp.task('minifyJS', ['concatJS'], function(){
  //
});

gulp.task('cleanBuild', function(cb){
  del(buildDir + '/*', cb);
});

gulp.task('default', function() {
  console.log('Not very interesting');
  console.log(cwd);
});

gulp.task('build', ['cleanBuild', 'minifyJS']);
