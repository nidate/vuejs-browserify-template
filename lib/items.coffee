Vue = require 'vue'

module.exports = Vue.extend
  template: require './items.html'
  data: ()->
    items: [
      message: 'one'
    ,
      message: 'two'
    ,
      message: 'three'
    ]
    message: ''
  ready: ()->
    null
  methods:
    addItem: ()->
      @items.push message: @message
      @message = ''
      false
