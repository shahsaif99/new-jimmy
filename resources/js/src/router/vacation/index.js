const routes = [
  {
    path: 'vacations',
    name: 'vacations',
    component: () => import('@/views/vacations/Index.vue'),
    meta: {
      pageTitle: 'Vacations',
      layout: 'vertical',
      resource: 'all',
      action: 'vacations-listings',
      breadcrumb: [
        {
          text: 'Vacations',
          active: true,
        },
      ],
    },
  },
  {
    path: 'vacations/overview',
    name: 'vacations-overview',
    component: () => import('@/views/vacations/Overview.vue'),
    meta: {
      pageTitle: 'Vacations Overview',
      layout: 'vertical',
      resource: 'all',
      action: 'vacations-overview',
      breadcrumb: [
        {
          text: 'Vacations Overview',
          active: true,
        },
      ],
    },
  },
]

export default routes
