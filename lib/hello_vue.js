var Vue = require('vue');

module.exports = Vue.extend({
  template: require('./hello_vue.html'),
  data: {
    message: "Hello Vue.js"
  },
  ready: function() {
  }
});
