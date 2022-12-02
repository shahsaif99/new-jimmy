const routes = [
  {
    path: 'equipmentoverview',
    name: 'equipmentoverview',
    component: () => import('@/views/equipment/Index.vue'),
    meta: {
      pageTitle: 'Overview',
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
  {
    path: 'personalequipment',
    name: 'personalequipment',
    component: () => import('@/views/equipment/personal/Index.vue'),
    meta: {
      pageTitle: 'Personal Equipment',
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

export default routes
