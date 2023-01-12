const routes = [
  {
    path: 'absences',
    name: 'absences',
    component: () => import('@/views/absences/Index.vue'),
    meta: {
      pageTitle: 'Absences',
      layout: 'vertical',
      resource: 'all',
      action: 'absences-listings',
      breadcrumb: [
        {
          text: 'Absences',
          active: true,
        },
      ],
    },
  },
]

export default routes
