import "material-design-icons-iconfont/dist/material-design-icons.css";
import 'vuetify/dist/vuetify.min.css';

import Vue from 'vue';
import App from './App.vue';
import VueLodash from 'vue-lodash';
import Vuetify from 'vuetify';
import store from './store.js';

Vue.config.productionTip = false;

const options = { name: 'lodash' }; // customize the way you want to call it
Vue.use(VueLodash, options);

const vuetifyOptions = {
  iconfont: 'md',
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: '#42b983',
        secondary: '#b0bec5',
        accent: '#8c9eff',
        error: '#b71c1c'
      },
      light: {
        primary: '#42b983',
        secondary: '#b0bec5',
        accent: '#8c9eff',
        error: '#b71c1c'
      }
    }
  }
};

Vue.use(Vuetify);

new Vue({
  render: h => h(App),
  store,
  vuetify: new Vuetify(vuetifyOptions)
}).$mount('#app');
