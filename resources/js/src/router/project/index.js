const routes = [

  {
    path: 'projects-overview',
    name: 'projects-overview',
    component: () => import('@/views/projects/Index.vue'),
    meta: {
      pageTitle: 'Project Overview',
      layout: 'vertical',
      resource: 'all',
      action: 'projects-listings',
      breadcrumb: [
        {
          text: 'Projects',
          active: false,
          to: { name: 'projects' },
        },
        {
          text: 'Project Overview',
          active: true,
        },
      ],
    },
  },
  {
    path: 'customer-supplier',
    name: 'customer-supplier',
    component: () => import('@/views/projects/customer-suppliers/index.vue'),
    meta: {
      pageTitle: 'Customer/Supplier',
      layout: 'vertical',
      resource: 'all',
      action: 'projects-listings',
      breadcrumb: [
        {
          text: 'Projects',
          active: false,
          to: { name: 'projects' },
        },
        {
          text: 'Customer/Supplier',
          active: true,
        },
      ],
    },
  },
  {
    path: 'project/:id',
    name: 'project',
    component: () => import('@/views/projects/project.vue'),
    meta: {
      pageTitle: 'Project',
      layout: 'vertical',
      resource: 'all',
      action: 'projects-listings',
      breadcrumb: [
        {
          text: 'Projects',
          active: false,
          to: { name: 'projects-overview' },
        },
        {
          text: 'Project',
          active: true,
        },
      ],
    },
  },
];

export default routes;
