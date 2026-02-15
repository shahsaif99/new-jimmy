const routes = [
  {
    path: 'company-information',
    name: 'company-information',
    component: () => import('@/views/company/information/Index.vue'),
    meta: {
      pageTitle: 'Company Information',
      layout: 'vertical',
      resource: 'all',
      action: 'company-view',
      auth: true,
      breadcrumb: [
        {
          text: 'Company Information',
          active: true,
        },
      ],
    },
  },
  {
    path: 'company-locations',
    name: 'company-locations',
    component: () => import('@/views/company/locations/Index.vue'),
    meta: {
      pageTitle: 'Company Locations',
      layout: 'vertical',
      resource: 'all',
      action: 'company-view',
      auth: true,
      breadcrumb: [
        {
          text: 'Company Locations',
          active: true,
        },
      ],
    },
  },
  {
    path: 'information-board',
    name: 'information-board',
    component: () => import('@/views/company/information-board/Index.vue'),
    meta: {
      pageTitle: 'Information Board',
      layout: 'vertical',
      resource: 'all',
      action: 'company-view',
      auth: true,
      breadcrumb: [
        {
          text: 'Information Board',
          active: true,
        },
      ],
    },
  },
]

export default routes
