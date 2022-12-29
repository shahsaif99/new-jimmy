const routes = [
  {
    path: 'projects',
    name: 'projects',
    component: () => import('@/views/projects/Index.vue'),
    meta: {
      pageTitle: 'Projects',
      layout: 'vertical',
      resource: 'all',
      action: 'projects-listings',
      breadcrumb: [
        {
          text: 'Projects',
          active: true,
        },
      ],
    },
  },
]

export default routes
