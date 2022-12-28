const routes = [
  {
    path: 'projectoverview',
    name: 'projectoverview',
    component: () => import('@/views/projects/Index.vue'),
    meta: {
      pageTitle: 'Overview',
      layout: 'vertical',
      resource: 'all',
      action: 'manage-projects',
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
