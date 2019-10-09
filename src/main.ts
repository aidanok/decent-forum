import Vue from 'vue';
import App from './views/App.vue';
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
  Vue.component(name, req(key).default)
}

const svgRequire = require.context('./svg/', true, /\.svg$/i)

for (const key of svgRequire.keys()) {
  const name = key.match(/\w+/)![0]
  Vue.component(`${name}${name.endsWith('Svg') ? '' : 'Svg'}`, svgRequire(key).default)
}

router.beforeEach((to, from, next) => {
  /*console.log('ROUTER FROM', from);
  console.log('ROUTER TO', to);
  console.log(`ROUTER BEFORE`);
  
  const encodedToPath = encodeURIComponent(to.path.substr(1));
  if (encodedToPath !== to.path.substr(1)) {
    console.log('ROUTER NOT MATCH', encodedToPath, to.path);
  }*/
  next();
})

Vue.config.productionTip = false;

Filters.forEach(filter => {
  Vue.filter(filter[0], filter[1])
})

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
