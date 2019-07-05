import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(Vuetify)

new Vue({
  render: h => h(App),
}).$mount('#app')
