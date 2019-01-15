import Vue from 'vue'
import App from './App.vue'
import ink_scroll from './packages/index.js'

Vue.use(ink_scroll);

new Vue({
  el: '#app',
  render: h => h(App)
})
