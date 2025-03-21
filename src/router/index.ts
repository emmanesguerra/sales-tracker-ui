import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/modules/auth/store/authStore';
import Login from '@/modules/auth/pages/Login.vue';
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import DashboardPage from '@/modules/dashboard/pages/DashboardPage.vue';
import ItemPage from '@/modules/item-management/pages/Index.vue';

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
      {
        path: '/item-management',
        name: 'ItemPage',
        component: ItemPage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.path === '/dashboard' && !authStore.token) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
