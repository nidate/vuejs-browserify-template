Vue = require 'vue'
VueRouter = require 'vue-router'

module.exports = (elem)->
  Vue.use(VueRouter)
  App = Vue.extend {}
  router = new VueRouter
  router.map
    '/':
      component: require('./lib/hello_vue')
    '/hellocoffee':
      component: require('./lib/hello_coffee.coffee')
    '/hellovueify':
      component: require('./lib/hello_vueify.vue')
    '/items':
      component: require('./lib/items.coffee')
    '/textlist':
      component: require('./lib/text_list.vue')
  router.start App, elem
