expect = chai.expect

describe 'HelloVue.coffee', ->
  before (done)->
    $('#test').empty()
    do done

  after (done)->
    $('#test').empty()
    do done

  it 'should render message', (done)->
    Vue = require 'vue'
    app = require 'vuejs-browserify-template'
    router = app '#test'
    Vue.nextTick ->
      expect($('#content').text()).to.eq('Hello Vue.js')
      do done
