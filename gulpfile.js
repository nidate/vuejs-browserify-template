var gulp = require('gulp');
var browserify = require('browserify');
var stringify = require('stringify');
var source = require('vinyl-source-stream')
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglifyjs');
var path = require('path');
var connect = require('gulp-connect');
var exposify = require('exposify');
var config = require('./package.json');

var project_name = config.name;
var target_file = project_name + '.js';
var dest = './public/js/';

gulp.task('connect', ['build'], function() {
  connect.server({
    root: ['public'],
    livereload: true,
    port: 8080
  });
});

gulp.task('watch', ['connect'], function() {
  gulp.watch([
    path.join(dest, target_file),
    "./public/**/*.html",
    "!**/.#*", "!**/#*", "!**/*~"
  ]).on('change', function(changed) {
    gulp.src(changed.path).pipe(connect.reload());
  });
  gulp.watch(['index.js', 'lib/**/*', "!**/.#*", "!**/#*", "!**/*~"], ['build']);
});

/**
 * build index.js and copy to dest.
 */
exposify.config = {
  jquery: '$'
};

gulp.task('build', function() {
  return browserify(['./index.js'])
    .exclude('./node_modules/jquery/dist/jquery.js')
    .transform(exposify)
    .transform(stringify(['.html']))
    .require('./index', {expose: project_name})
    .bundle()
    .pipe(source(target_file))
    .pipe(plumber())
    .pipe(gulp.dest(dest));
});

gulp.task('uglify', ['build'], function() {
  return gulp.src(path.join(dest, target_file))
    .pipe(uglify())
    .pipe(gulp.dest(dest))
});

gulp.task('test', function() {
    return gulp.src(['./test/**/**_test.js', '!./test/client'], { read: false })
        .pipe(mocha({ reporter: 'list' }))
        .on('error', gutil.log);
});

gulp.task('clean', function() {
  return gulp.src(path.join(dest, target_file)).pipe(clean());
});
