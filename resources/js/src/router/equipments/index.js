const routes = [
  {
    path: 'equipments',
    name: 'equipments',
    component: () => import('@/views/equipments/Index.vue'),
    meta: {
      pageTitle: 'Equipments',
      layout: 'vertical',
      resource: 'all',
      action: 'equipment-view',
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
