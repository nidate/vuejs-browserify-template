<template lang="jade">
div(v-repeat='list')
  text-component(text='{{text}}')
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
