import Vue from 'vue'
import Router from 'vue-router'
// eslint-disable-next-line import/no-cycle
import { isUserLoggedIn } from '@/auth/utils'
import { canNavigate } from '@/libs/acl/routeProtection'

// customer routes
import AccountRoutes from './account'
import generalRoutes from './general'
import usersRoutes from './users'

// routes

Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
    }
  },
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/Main.vue'),
      meta: {
        requiresAuth: false,
      },
      children: [
        ...usersRoutes,
        ...AccountRoutes,
        ...generalRoutes,
      ],
    },
  ],
})
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

router.beforeEach((to, _, next) => {
  const isLoggedIn = isUserLoggedIn()
  // Redirect to dashboard if user is logged in
  if (isLoggedIn && to.meta.redirectIfLoggedIn) {
    next({ name: 'dashboard' })
  } else if (!isLoggedIn && to.meta.auth) {
    return next({ name: 'login' })
  } else if (!canNavigate(to) && to.meta.auth) {
    return next({ name: 'not-authorized' })
  }

  return next()
})
export default router
