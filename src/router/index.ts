import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/modules/auth/store/authStore';
import authService from '@/modules/auth/services/authService';
import Login from '@/modules/auth/pages/Login.vue';
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import DashboardPage from '@/modules/dashboard/pages/DashboardPage.vue';
import ItemPage from '@/modules/item-management/pages/Index.vue';

import itemRoutes from '@/modules/item-management/router/route';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '',
        name: 'DashboardPage',
        component: DashboardPage,
      },
      ...itemRoutes,
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Navigation guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  if (to.path === '/' && authStore.token) {
    return next({ path: '/dashboard' }); // Redirect authenticated users away from login
  }

  // Allow access to the login page without token verification
  if (to.path === '/') {
    return next()
  }

  // If token exists, proceed
  if (authStore.token) {
    return next()
  }

  try {
    // Attempt to fetch a new token
    const response = await authService.retriveToken()
    if (response.token) {
      authStore.setToken(response.token) // Store new token in Pinia
      authStore.setSubdomain(response.subdomain)
      return next()
    }
  } catch (error) {
    console.error('Token retrieval failed:', error)
  }

  // If token is missing and cannot be retrieved, redirect to login
  return next({ path: '/' })
})

export default router;
