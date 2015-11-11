var gulp = require('gulp');
var gulpif = require('gulp-if');
var browserify = require('browserify');
var stringify = require('stringify');
var coffee = require('gulp-coffee');
var coffeeify = require('coffeeify');
var vueify = require('vueify');
var source = require('vinyl-source-stream')
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglifyjs');
var concat = require('gulp-concat');
var path = require('path');
var webserver = require('gulp-webserver');
var mochaPhantomJS = require('gulp-mocha-phantomjs');
var exposify = require('exposify');
var config = require('./package.json');

var project_name = config.name;
var target_file = project_name + '.js';
var dest = './public/js/';

gulp.task('default', ['watch']);

gulp.task('webserver', ['build'], function() {
  return gulp.src('public')
    .pipe(webserver({
      host: '0.0.0.0',
      livereload: true,
      port: 8888,
      filter: function(filename) {
        return filename.match(/public/)
      }
    }));
});

gulp.task('watch', ['webserver'], function() {
  gulp.watch(['index.*', 'lib/**/*', "!**/.#*", "!**/#*", "!**/*~"], ['build']);
});

/**
 * build index.coffee and copy to dest.
 */
exposify.config = {
  jquery: '$'
};

gulp.task('build', function() {
  return browserify(['./index.coffee'])
    .exclude('./node_modules/jquery/dist/jquery.js')
    .transform(coffeeify)
    .transform(exposify)
    .transform(stringify(['.html']))
    .transform(vueify)
    .require('./index.coffee', {expose: project_name})
    .require('vue')
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

gulp.task('unit-test', function() {
  return gulp.src(['./test/**/**_test.js', '!./test/client/**'], { read: false })
    .pipe(mocha({ reporter: 'list' }))
    .on('error', gutil.log);
});

gulp.task('build-client-test', ['build'], function() {
  return gulp.src(['./test/client/**_test.js'])
    .pipe(concat('client_test_all.js'))
    .pipe(gulp.dest('./work/'));
});
//gulp.src(['./test/client/**_test.coffee']).pipe(coffee({bare: true}).on('error', gutil.log))

gulp.task('client-test', ['build-client-test'], function() {
  return gulp.src('./work/runner.html').pipe(mochaPhantomJS());
});

gulp.task('test', ['unit-test', 'client-test']);

gulp.task('clean', function() {
  return gulp.src(path.join(dest, target_file)).pipe(clean());
});
