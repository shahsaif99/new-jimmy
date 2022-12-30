const routes = [
  {
    path: 'equipments',
    name: 'equipments',
    component: () => import('@/views/equipments/Index.vue'),
    meta: {
      pageTitle: 'Equipments',
      layout: 'vertical',
      resource: 'all',
      action: 'equipments-view',
      breadcrumb: [
        {
          text: 'Equipments',
          active: true,
        },
      ],
    },
  },

]

export default routes
