
const routes = [

  {
    path: 'permissions',
    name: 'permissions',
    component: () => import('@/views/permissions/Index.vue'),
    meta: {
      pageTitle: 'Permissions',
      resource: 'all',
      action: 'manage-permissions',
      auth: true,
      breadcrumb: [
        {
          text: 'General',
          active: false,
        },
        {
          text: 'Permissions',
          active: true,
        },
      ],
    },
  },
]

export default routes
