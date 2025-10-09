
const routes = [
  {
    path: 'account',
    name: 'account',
    component: () => import('@/views/account/AccountSetting.vue'),
    meta: {
      pageTitle: 'Account',
      auth: true,
      tab: 'account',
      resource: 'all',
      action: 'my-profile-view',
      breadcrumb: [
        {
          text: 'Account',
          active: true,
        },
      ],
    },
  },
  {
    path: 'account/password',
    name: 'account-password',
    component: () => import('@/views/account/AccountSetting.vue'),
    meta: {
      pageTitle: 'Account',
      auth: true,
      tab: 'password',
      resource: 'all',
      action: 'password-view',
      breadcrumb: [
        {
          text: 'Account',
          active: true,
        },
      ],
    },
  },
]

export default routes
