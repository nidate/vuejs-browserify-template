Vue = require 'vue'
VueRouter = require 'vue-router'

module.exports = (elem)->
  Vue.use(VueRouter)
  App = Vue.extend
    template: """
    <div>
      <ul>
        <li> <a v-link="{path: '/'}">JavaScript</a>
        <li> <a v-link="{path: '/hellocoffee'}">Coffee script</a>
        <li> <a v-link="{path: '/hellovueify'}">Vueify</a>
        <li> <a v-link="{path: '/items'}">Event handling</a>
        <li> <a v-link="{path: '/textlist'}">Components</a>
      </ul>
      <router-view id="content"></router-view>
    </div>
    """
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
  router
