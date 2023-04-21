import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/userData';

const requireAuth = async (to, from, next) => {
  const userStore = useUserStore();

  try {
    userStore.loading = true;
    await userStore.currentUser();
    next();
  } catch (error) {
    console.log(error);
  } finally {
    userStore.loading = false;
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/RegisterLoginView.vue')
    },
    {
      path: '/',
      beforeEnter: requireAuth,
      name: 'home',
      component: () => import('../views/HomeView.vue')
    }
  ]
})

export default router
