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
    var lib = require('vuejs-browserify-template');
    var vue = new lib.HelloVue({el: '#test'});
    expect($('#test').text()).to.eq('Hello Vue.js');
    done();
  });
});