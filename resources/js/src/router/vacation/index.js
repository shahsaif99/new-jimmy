const routes = [
  {
    path: 'vacations',
    name: 'vacations',
    component: () => import('@/views/vacations/Index.vue'),
    meta: {
      pageTitle: 'Holiday Overview',
      layout: 'vertical',
      resource: 'all',
      action: 'vacations-listings',
      breadcrumb: [
        {
          text: 'Holiday Overview',
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
      pageTitle: 'Holiday Overview',
      layout: 'vertical',
      resource: 'all',
      action: 'vacations-overview',
      breadcrumb: [
        {
          text: 'Holiday Overview',
          active: true,
        },
      ],
    },
  },
]

export default routes
