<template lang="jade">
.text
  {{text}}
</template>

<script lang="coffee">
Vue = require 'vue'
module.exports = Vue.extend
  props: [
    'text'
  ]
</script>
