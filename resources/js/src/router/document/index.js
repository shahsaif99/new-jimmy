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
  {
    path: 'handbooks/view/:id',
    name: 'handbooks-view',
    component: () => import('@/views/handbooks/ViewHandbook.vue'),
    meta: {
      pageTitle: 'Handbooks',
      layout: 'vertical',
      resource: 'all',
      action: 'documentcenter',
      breadcrumb: [
        {
          text: 'Handbooks',
          active: false,
        },
        {
          text: 'View Handbook',
          active: true,
        },
      ],
    },
  },
]

export default routes
