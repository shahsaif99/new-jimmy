
const routes = [

  {
    path: 'roles',
    name: 'roles',
    component: () => import('@/views/roles/Index.vue'),
    meta: {
      pageTitle: 'Roles',
      resource: 'all',
      action: 'manage-roles',
      auth: true,
      breadcrumb: [
        {
          text: 'General',
          active: false,
        },
        {
          text: 'Roles',
          active: true,
        },
      ],
    },
  },
]

export default routes
