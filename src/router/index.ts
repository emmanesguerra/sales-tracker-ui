import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/modules/auth/store/authStore'
import Login from '@/modules/auth/pages/Login.vue'
import Dashboard from '@/modules/dashboard/pages/Dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard ,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  if (to.path === '/dashboard' && !authStore.token) {
    next({ name: 'Login' });
  } else {
    next();
  }
})

export default router
