var expect = chai.expect;

describe('HellowVue', function() {
  before(function(done) {
    $('#test').empty();
    done();
  });
  after(function(done) {
    $('#test').empty();
    done();
  });

  it('should render message', function(done) {
    var app = require('vuejs-browserify-template');
    app("#test")
    
    expect($('#content').text()).to.eq('Hello Vue.js');
    done();
  });
});