<style lang="stylus">
.red
  color #f00
</style>

<template lang="jade">
div
  h1.red {{msg}}
</template>

<script lang="coffee">
Vue = require 'vue'
module.exports = Vue.extend
  data: ->
    msg: 'Hello vueify!'
</script>
