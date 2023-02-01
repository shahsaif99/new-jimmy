const routes = [
  {
    path: 'procedures',
    name: 'procedures',
    component: () => import('@/views/procedures/Index.vue'),
    meta: {
      pageTitle: 'Procedures',
      layout: 'vertical',
      resource: 'all',
      action: 'procedures',
      breadcrumb: [
        {
          text: 'Document Center',
          active: false,
        },
        {
          text: 'Procedures',
          active: true,
        },
      ],
    },
  },
  {
    path: 'handbooks',
    name: 'handbooks',
    component: () => import('@/views/handbooks/Index.vue'),
    meta: {
      pageTitle: 'Handbooks',
      layout: 'vertical',
      resource: 'all',
      action: 'documentcenter',
      breadcrumb: [
        {
          text: 'Document Center',
          active: false,
        },
        {
          text: 'Handbooks',
          active: true,
        },
      ],
    },
  },
]

export default routes
