import CustomerTable from '@/components/CustomerTable.vue'
import HotelTable from '@/components/HotelTable.vue'
import HomeView from '@/views/HomeView.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/hotel',
    name: 'hotel',
    component: HotelTable
  },
  {
    path: '/customer',
    name: 'customer',
    component: CustomerTable
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
