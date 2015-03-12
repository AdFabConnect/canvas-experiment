var gulp = require('gulp');
var gutil = require('gulp-util');
var watchify = require('watchify');
var browserify = require('browserify');
var compass = require('gulp-compass');
var webserver = require('gulp-webserver');

var source = require('vinyl-source-stream'),
    sourceFile = './app/scripts/app.js',
    destFolder = './dist/scripts',
    destFileName = 'app.js';

// Scripts
gulp.task('scripts', function () {
    var bundler = watchify(browserify({
        entries: [sourceFile],
    }));

    bundler.on('update', rebundle);

    function rebundle() {
        return bundler.bundle()
            // log errors if they happen
            .on('error', gutil.log.bind(gutil, 'Browserify Error'))
            .pipe(source(destFileName))
            .pipe(gulp.dest(destFolder));
    }

    return rebundle();

});

// Styles
gulp.task('styles', function () {
    return gulp.src('app/styles/main.scss')
        .pipe(compass({
            sass : './app/styles',
            css : './dist/styles'
        }))
        .pipe(gulp.dest('dist/styles'));
});

// HTML
gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe(gulp.dest('dist'))
});


// Clean
gulp.task('clean', function (cb) {
    cb(del.sync(['dist/styles', 'dist/scripts', 'dist/images']));
});


// Bower helper
gulp.task('bower', function() {
    gulp.src('app/bower_components/**/*.js', {base: 'app/bower_components'})
        .pipe(gulp.dest('dist/bower_components/'));

});

// Webserver
gulp.task('serve', function () {
    gulp.src('dist')
        .pipe(webserver({
            livereload: true,
            host : '0.0.0.0'
        }));
});

// Bundle
gulp.task('bundle', ['styles', 'scripts', 'bower'], function(){
    return gulp.src('./app/*.html')
            .pipe(gulp.dest('dist'));
});

// Watch
gulp.task('watch', ['html', 'serve', 'bundle'], function () {

    // Watch .scss files
    gulp.watch('app/styles/**/*.scss', ['styles']);

    // Watch .html files
    gulp.watch('app/*.html', ['html']);

    // Watch image files
    gulp.watch('app/images/**/*', ['images']);
});

// Build
gulp.task('build', ['html', 'bundle']);

// Default task
gulp.task('default', ['clean', 'build']);