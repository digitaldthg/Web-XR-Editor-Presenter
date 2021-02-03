import Vue from 'vue'
import App from './App.vue'
import { store } from './store'
import router from './router'



Vue.config.productionTip = false


import VueMarkdown from 'vue-markdown';
Vue.component('vue-markdown', VueMarkdown);

const app = new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
}).$mount('#app')