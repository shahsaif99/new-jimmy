const routes = [
{
    path: 'lendinghistory',
    name: 'lendinghistory',
    component: () => import('@/views/equipment/lending/Index.vue'),
    meta: {
      pageTitle: 'Lending History',
      layout: 'vertical',
      resource: 'all',
      action: 'equipment-view',
      breadcrumb: [
        {
          text: 'Equipment Control',
          active: true,
        },
      ],
    },
  },
]
