const routes = [
  {
    path: 'avvik-listings',
    name: 'avvik-listings',
    component: () => import('@/views/avvik-listings/Index.vue'),
    meta: {
      pageTitle: 'Avvik / RUH',
      layout: 'vertical',
      resource: 'all',
      action: 'avvik-view',
      breadcrumb: [
        {
          text: 'Avvik / RUH',
          active: true,
        },
      ],
    },
  },

  {
    path: 'avvik-listings/create',
    name: 'avvik-listings-create',
    component: () => import('@/views/avvik-listings/Create.vue'),
    meta: {
      pageTitle: 'Avvik / RUH Add New',
      layout: 'vertical',
      resource: 'all',
      action: 'avvik-view',
      breadcrumb: [
        {
          text: 'Avvik / RUH Add New',
          active: true,
        },
      ],
    },
  },

  {
    path: 'avvik-listings/edit/:id',
    name: 'avvik-listings-edit',
    component: () => import('@/views/avvik-listings/Edit.vue'),
    meta: {
      pageTitle: 'Avvik / RUH Edit',
      layout: 'vertical',
      resource: 'all',
      action: 'avvik-view',
      breadcrumb: [
        {
          text: 'Avvik / RUH Edit',
          active: true,
        },
      ],
    },
  },


]

export default routes
