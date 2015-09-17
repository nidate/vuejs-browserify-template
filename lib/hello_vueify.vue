<style lang="stylus">
.red
  color #f00
</style>

<template lang="jade">
h1(class="red") {{msg}}
</template>

<script lang="coffee">
Vue = require 'vue'
module.exports = Vue.extend
  data: ->
    msg: 'Hello vueify!'
</script>
