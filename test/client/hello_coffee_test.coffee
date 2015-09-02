expect = chai.expect

describe 'HellowVue', () ->
  before (done)->
    $('#test').empty()
    do done

  after (done)->
    $('#test').empty();
    do done

  it 'should render message', (done)->
    lib = require 'vuejs-browserify-template'
    vue = new lib.HelloVue el: '#test'
    expect($('#test div').text()).to.eq('Hello Vue.js')
    do done
