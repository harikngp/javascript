import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import SearchBar from './components/SearchBar.vue'

Vue.config.productionTip = false
Vue.component('SearchBar',SearchBar)

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
