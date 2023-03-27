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


]

export default routes
