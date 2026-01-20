const routes = [
  {
    path: 'reports',
    name: 'reports',
    component: () => import('@/views/reports/Index.vue'),
    meta: {
      pageTitle: 'Reports',
      layout: 'vertical',
      resource: 'all',
      action: 'dashboard',
      breadcrumb: [
        {
          text: 'Reports',
          active: true,
        },
      ],
    },
  },
]

export default routes
