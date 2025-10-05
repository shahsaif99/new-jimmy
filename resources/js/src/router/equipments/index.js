const routes = [
  {
    path: 'equipments',
    name: 'equipments',
    component: () => import('@/views/equipments/index.vue'),
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
  {
    path: "/equipment/:tool_id",
    name: 'equipment-details',
    component: () => import('@/views/equipments/EquipmentDetails.vue'), 
    meta: {
      layout: 'full',
      redirectIfLoggedIn: true,
      auth: false,
    },
  },

]

export default routes
