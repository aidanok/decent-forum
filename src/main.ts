import Vue from 'vue';
import App from './App.vue';
import router from './router';
//import './registerServiceWorker';

import Filters from '@/filters/'

// import 'bulma/css/bulma.css';
import VTooltip from 'v-tooltip'

Vue.use(VTooltip);
Vue.use(require('vue-moment'));

// Load every component from _common
const req = require.context('./components/', true, /\.(js|svg|vue)$/i)
for (const key of req.keys()) {
  const name = key.match(/\w+/)![0]
  console.log(`name: ${name}`);
  Vue.component(name, req(key).default)
}

const svgRequire = require.context('./svg/', true, /\.svg$/i)
for (const key of svgRequire.keys()) {
  const name = key.match(/\w+/)![0]
  console.log(`name: ${name}`);
  Vue.component(`${name}${name.endsWith('Svg') ? '' : 'Svg'}`, svgRequire(key).default)
}


Vue.config.productionTip = false;

Filters.forEach(filter => {
  Vue.filter(filter[0], filter[1])
})



new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
