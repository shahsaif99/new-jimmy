const routes = [
  {
    path: 'login',
    name: 'login',
    component: () => import('@/views/auth/Login.vue'),
    meta: {
      layout: 'full',
      redirectIfLoggedIn: true,
      auth: false,
    },
  },
  {
    path: 'dashboard',
    name: 'dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: {
      pageTitle: 'Dashboard',
      layout: 'vertical',
      auth: true,
      resource: 'all',
      action: 'dashboard-view',
      breadcrumb: [
        {
          text: 'Dashboard',
          active: true,
        },
      ],
    },
  },
  {
    path: 'password-reset/:token/:email',
    name: 'password-reset',
    props: true,
    component: () => import('@/views/auth/ResetPassword.vue'),
    meta: {
      layout: 'full',
      redirectIfLoggedIn: true,
      auth: false,
    },
  },
  {
    path: 'forgot-password',
    name: 'forgot-password',
    component: () => import('@/views/auth/ForgotPassword.vue'),
    meta: {
      layout: 'full',
      redirectIfLoggedIn: true,
      auth: false,
    },
  },

  {
    path: 'not-authorized',
    name: 'not-authorized',
    component: () => import('@/views/pages/NotAuthorized.vue'),
    meta: {
      layout: 'full',
      resource: 'all',
      action: 'not-authorized',
    },
  },
  {
    path: 'error-404',
    name: 'error-404',
    component: () => import('@/views/pages/Error404.vue'),
    meta: {
      layout: 'full',
    },
  },
  {
    path: '*',
    redirect: 'error-404',
  },
]

export default routes
