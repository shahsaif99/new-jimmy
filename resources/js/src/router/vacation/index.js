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
]

export default routes
