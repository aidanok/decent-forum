import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';

import Filters from '@/filters/'

// import 'bulma/css/bulma.css';
import 'remixicon/fonts/remixicon.css'


// Load every component from _common
const req = require.context('./components/', false, /\.(js|vue)$/i)
for (const key of req.keys()) {
  const name = key.match(/\w+/)![0]
  Vue.component(name, req(key).default)
}

Vue.config.productionTip = false;

Filters.forEach(filter => {
  Vue.filter(filter[0], filter[1])
})



new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
