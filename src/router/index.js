import employeeTable from '@/components/employeeTable.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import departmentTable from '@/components/departmentTable.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/employee',
    name: 'employeeTable',
    component: employeeTable
  },
  {
    path: '/department',
    name: 'departmentTable',
    component: departmentTable
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
