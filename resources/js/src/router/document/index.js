const routes = [
  {
    path: 'documentcenter',
    name: 'documentcenter',
    component: () => import('@/views/documentcenter/Index.vue'),
    meta: {
      pageTitle: 'Document Center',
      layout: 'vertical',
      resource: 'all',
      action: 'documentcenter',
      breadcrumb: [
        {
          text: 'Document Center',
          active: true,
        },
      ],
    },
  },
  {
    path: 'handbooks',
    name: 'handbooks',
    component: () => import('@/views/documentcenter/handbooks/Index.vue'),
    meta: {
      pageTitle: 'Handbooks',
      layout: 'vertical',
      resource: 'all',
      action: 'documentcenter',
      breadcrumb: [
        {
          text: 'Document Center',
          active: true,
        },
      ],
    },
  },
]

export default routes
