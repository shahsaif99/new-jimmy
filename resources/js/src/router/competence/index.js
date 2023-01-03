const routes = [
  {
    path: 'competence',
    name: 'competence',
    component: () => import('@/views/competence/Index.vue'),
    meta: {
      pageTitle: 'Competence',
      layout: 'vertical',
      resource: 'all',
      action: 'competence-listings',
      breadcrumb: [
        {
          text: 'Competence',
          active: true,
        },
      ],
    },
  },
]

export default routes
