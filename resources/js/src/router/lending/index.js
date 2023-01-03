const routes = [
  {
    path: 'lendinghistory',
    name: 'lendinghistory',
    component: () => import('@/views/lending/Index.vue'),
    meta: {
      pageTitle: 'Lending History',
      layout: 'vertical',
      resource: 'all',
      action: 'lendings-history',
      breadcrumb: [
        {
          text: 'Lending History',
          active: true,
        },
      ],
    },
  },
]
export default routes
