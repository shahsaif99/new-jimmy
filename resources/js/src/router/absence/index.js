const routes = [
  {
    path: 'absences',
    name: 'absences',
    component: () => import('@/views/absences/Index.vue'),
    meta: {
      pageTitle: 'My Absense',
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
  {
    path: 'absences/overview',
    name: 'absences-overview',
    component: () => import('@/views/absences/Overview.vue'),
    meta: {
      pageTitle: 'Absences Overview',
      layout: 'vertical',
      resource: 'all',
      action: 'absence-overview',
      breadcrumb: [
        {
          text: 'Absences Overview',
          active: true,
        },
      ],
    },
  },
]

export default routes
