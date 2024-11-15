import { createRouter, createWebHistory } from 'vue-router'
import LandingPageView from '@/views/LandingPageView.vue'
import AppDashboardView from '@/views/AppDashboardView.vue'
import AuthView from '@/views/AuthView.vue'
import NotImplementedView from '@/views/NotImplementedView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPageView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: AppDashboardView
    },
    {
      path: '/auth/:type',
      name: 'auth',
      component: AuthView
    },
    {
      path: '/not_implemented',
      name: 'notImplemented',
      component: NotImplementedView
    }
  ]
})

export default router
