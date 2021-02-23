import Vue from 'vue';
import App from './App.vue';
import { store } from './store';
import router from './router';



Vue.config.productionTip = false;

// Markdown
import VueMarkdown from 'vue-markdown';
Vue.component('vue-markdown', VueMarkdown);


Vue.config.ignoredElements = [
  'a-scene',
  'a-entity',
  'a-camera',
  'a-box',
  'a-assets',
  'a-marker',
  'a-light',
  'a-marker-camera',
  'a-group'
]


const app = new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
}).$mount('#app')