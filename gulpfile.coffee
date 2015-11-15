gulp = require 'gulp'
browserify = require 'browserify'
stringify = require 'stringify'
coffee = require 'gulp-coffee'
coffeeify = require 'coffeeify'
vueify = require 'vueify'
source = require 'vinyl-source-stream'
mocha = require 'gulp-mocha'
gutil = require 'gulp-util'
clean = require 'gulp-clean'
plumber = require 'gulp-plumber'
uglify = require 'gulp-uglifyjs'
concat = require 'gulp-concat'
open = require 'gulp-open'
path = require 'path'
webserver = require 'gulp-webserver'
mochaPhantomJS = require 'gulp-mocha-phantomjs'
exposify = require 'exposify'
config = require './package.json'

project_name = config.name;
target_file = project_name + '.js';
dest = './public/js/';

host = '0.0.0.0'
port = 8888

gulp.task 'default', ['watch']

gulp.task 'webserver', ['build'], ()->
  gulp.src 'public'
  .pipe webserver
    host: host
    livereload: true,
    port: port,
    filter: (filename)->
      filename.match(/public/)

gulp.task 'watch', ['webserver'], ()->
  gulp.src ['./index.coffee']
  .pipe open
    uri: "http://#{host}:#{port}/"
  gulp.watch ['index.*', 'lib/**/*', "!**/.#*", "!**/#*", "!**/*~"], ['build']

exposify.config =
  jquery: '$'

gulp.task 'build', ()->
  browserify(['./index.coffee'])
  .exclude('./node_modules/jquery/dist/jquery.js')
  .transform(coffeeify)
  .transform(exposify)
  .transform(stringify(['.html']))
  .transform(vueify)
  .require('./index.coffee', {expose: project_name})
  .require('vue')
  .bundle()
  .on 'error', (err)->
    console.error err.message
    @emit 'end'
  .pipe(plumber())
  .pipe(source(target_file))
  .pipe(gulp.dest(dest))

gulp.task 'uglify', ['build'], ()->
  gulp.src path.join(dest, target_file)
  .pipe uglify()
  .pipe gulp.dest(dest)

gulp.task 'unit-test', ()->
  gulp.src ['./test/**/**_test.js', '!./test/client/**'], { read: false }
  .pipe(mocha({ reporter: 'list' }))
  .on('error', gutil.log);


gulp.task 'compile-client-test', ['build', 'clean-work'], ()->
  gulp.src ['./test/client/**_test.coffee']
  .pipe coffee({bare: true}).on('error', gutil.log)
  .pipe gulp.dest('./work/')

gulp.task 'copy-client-test', ['compile-client-test'], ()->
  gulp.src ['./test/client/**_test.js', './test/client/runner.html']
  .pipe gulp.dest('./work/')


gulp.task 'build-client-test', ['copy-client-test'], ()->
  gulp.src ['./work/**_test.js', '!./work/client_test_all.js']
  .pipe concat('client_test_all.js')
  .pipe gulp.dest('./work/')


gulp.task 'client-test', ['build-client-test'], ()->
  gulp.src('./work/runner.html').pipe(mochaPhantomJS());

gulp.task 'test', ['unit-test', 'client-test']

gulp.task 'clean-work', ()->
  gulp.src('./work/').pipe(clean());

gulp.task 'clean', ['clean-work'], ()->
  gulp.src path.join(dest, target_file)
  .pipe clean()
