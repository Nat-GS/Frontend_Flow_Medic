// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Importa tus vistas o componentes
import Home from '@/views/Home.vue'
import Hospitales from '@/views/Hospitales.vue'
import Urgencias from '@/views/Urgencias.vue'
import Login from '@/views/Login.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
