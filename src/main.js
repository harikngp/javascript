import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import SearchBar from './components/SearchBar.vue'
Vue.component('SearchBar',SearchBar)
Vue.config.productionTip = false
Vue.filter('nametrim',function(value){
  if(value.length>10)
    return value.slice(0,10)+'...'
  else
    return value
})
Vue.directive('comma', {
    componentUpdated(el,binding,vnode) {
      binding.value=binding.value
      .replace(/\D/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      vnode.context.employee.id = binding.value;
    }
  }
)
new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
