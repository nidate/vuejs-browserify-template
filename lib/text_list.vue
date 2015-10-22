<template lang="jade">
div(v-for='item in list')
  text-component(:text='item.text')
</template>

<script lang="coffee">
Vue = require 'vue'
textComponent = require './text_component.vue'
Vue.component 'text-component', textComponent
module.exports = Vue.extend
  data: ->
    list: [
      text: 'foo'
    ,
      text: 'bar'
    ,
      text: 'baz'
    ]
    
</script>
