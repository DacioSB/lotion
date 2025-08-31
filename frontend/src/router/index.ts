import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@clerk/vue'
import LandingView from '../views/LandingView.vue'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const { isSignedIn } = useAuth()

  if (to.meta.requiresAuth && !isSignedIn.value) {
    next({ name: 'landing' })
  } else if (to.name === 'landing' && isSignedIn.value) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router