import Vue from "vue";
import App from "./App.vue";
import Vuetify from "vuetify";
import VueVirtualScroller from 'vue-virtual-scroller'
import store from "./store.js";

import "vuetify/dist/vuetify.min.css";

Vue.config.productionTip = false;
Vue.use(VueVirtualScroller);
Vue.use(Vuetify, {
  iconfont: "md",
  theme: {
    primary: "#42b983",
    secondary: "#b0bec5",
    accent: "#8c9eff",
    error: "#b71c1c"
  }
});

new Vue({
  render: h => h(App),
  store
}).$mount("#app");
