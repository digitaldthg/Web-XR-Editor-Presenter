import Vue from 'vue';
import App from './App.vue';
import { store } from './store';
import router from './router';
import aframe from 'aframe';

window.AFRAME = aframe;

require('aframe-extras'); // don't use import, use require()!


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
]


const app = new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
}).$mount('#app')