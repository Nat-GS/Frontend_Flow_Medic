import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Hospitales from '@/views/Hospitales.vue'
import Urgencias from '@/views/Urgencias.vue'
import Login from '@/views/Login.vue'
import MenuUsuario from '@/components/MenuUsuario.vue'
import Index from '@/views/Index.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/hospitales',
    name: 'Hospitales',
    component: Hospitales
  },
  {
    path: '/urgencias',
    name: 'Urgencias',
    component: Urgencias
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/menu-usuario',
    name: 'MenuUsuario',
    component: MenuUsuario
  },
  {
    path: '/index',
    name: 'Index',
    component: Index
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
