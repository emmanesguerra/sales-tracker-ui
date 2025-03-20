import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/modules/auth/pages/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
  ],
})

export default router
