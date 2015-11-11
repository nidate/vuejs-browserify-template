var expect = chai.expect;

describe('HelloVue', function() {
  before(function(done) {
    $('#test').empty();
    done();
  });
  after(function(done) {
    $('#test').empty();
    done();
  });

  it('should render message', function(done) {
    var Vue = require('vue');
    var app = require('vuejs-browserify-template');
    var router = app("#test");
    Vue.nextTick(function() {
      expect($('#content').text()).to.eq('Hello Vue.js');
      done();
    });
  });
});