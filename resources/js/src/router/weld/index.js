const routes = [
  {
    path: 'wps-overview',
    name: 'wps-overview',
    component: () => import('@/views/weld/WpsOverview.vue'),
    meta: {
      pageTitle: 'WPS Overview',
      layout: 'vertical',
      resource: 'all',
      action: 'wps-overview',
      breadcrumb: [
        {
          text: 'Weld',
          active: false,
        },
        {
          text: 'WPS Overview',
          active: true,
        },
      ],
    },
  },
  {
    path: 'weld-log-overview',
    name: 'weld-log-overview',
    component: () => import('@/views/weld/WeldLogOverview.vue'),
    meta: {
      pageTitle: 'Weld Log Overview',
      layout: 'vertical',
      resource: 'all',
      action: 'weld-log-overview',
      breadcrumb: [
        {
          text: 'Weld',
          active: false,
        },
        {
          text: 'Welding Log',
          active: true,
        },
      ],
    },
  },
];

export default routes;
