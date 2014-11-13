var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');

var deployDir = '/Users/mars/ghost/content/themes/sandbox';


gulp.task('scripts', function () {
    return gulp.src('assets/js/**/*.js')
        //.pipe(jshint('.jshintrc'))
        //.pipe(jshint.reporter('default'))
        .pipe(concat('sandbox.js'))
        .pipe(gulp.dest('build/assets/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('build/assets/js'))
        .pipe(notify({message: 'Scripts task complete'}));
});

gulp.task('styles', function () {
    return gulp.src('assets/css/*.css')
        .pipe(concat('sandbox.css'))
        .pipe(gulp.dest('build/assets/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('build/assets/css'))
        .pipe(notify({message: 'Styles task complete'}));
});

gulp.task('default', function () {
    console.log('Not very interesting');
    console.log(cwd);
});

gulp.task('clean', function (cb) {
    del('./build', cb);
});

gulp.task('deploy', function (cb) {
    del('/Users/mars/ghost/content/themes/sandbox/*', {force: true}, function () {
        gulp.src('./build/**', {base: 'build'}).pipe(gulp.dest(deployDir));
        gulp.src('./partials/**',{base:'.'}).pipe(gulp.dest(deployDir));
        gulp.src('./assets/fonts/**', {base:'fonts'}).pipe(gulp.dest(deployDir + '/assets'));
        gulp.src('package.json').pipe(gulp.dest(deployDir));
        gulp.src('*.hbs').pipe(gulp.dest(deployDir));
    });
});

gulp.task('build', ['scripts', 'styles']);
