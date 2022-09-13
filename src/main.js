//import { values } from 'core-js/core/array'
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'

Vue.config.productionTip = false
Vue.filter('nametrim',function(item){
  if (item.length>10)
    return `${item.slice(0,10)}...`
  else
    return item
})
new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
