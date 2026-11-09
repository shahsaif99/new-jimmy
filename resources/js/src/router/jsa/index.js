const routes = [
  {
    path: 'jsa',
    name: 'jsa-overview',
    component: () => import('@/views/jsa/JsaOverview.vue'),
    meta: {
      pageTitle: 'Job Safety Analyses',
      layout: 'vertical',
      resource: 'all',
      action: 'jsa-overview',
      breadcrumb: [
        {
          text: 'JSA',
          active: true,
        },
      ],
    },
  },
  {
    path: 'jsa/create',
    name: 'jsa-create',
    component: () => import('@/views/jsa/JsaForm.vue'),
    meta: {
      pageTitle: 'New Job Safety Analysis',
      layout: 'vertical',
      resource: 'all',
      action: 'jsa-overview',
      breadcrumb: [
        {
          text: 'JSA',
          to: { name: 'jsa-overview' },
          active: false,
        },
        {
          text: 'New JSA',
          active: true,
        },
      ],
    },
  },
  {
    path: 'jsa/:id/edit',
    name: 'jsa-edit',
    component: () => import('@/views/jsa/JsaForm.vue'),
    meta: {
      pageTitle: 'Job Safety Analysis',
      layout: 'vertical',
      resource: 'all',
      action: 'jsa-overview',
      breadcrumb: [
        {
          text: 'JSA',
          to: { name: 'jsa-overview' },
          active: false,
        },
        {
          text: 'Edit JSA',
          active: true,
        },
      ],
    },
  },
];

export default routes;
