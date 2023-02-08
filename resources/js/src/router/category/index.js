
const routes = [

  {
    path: 'categories',
    name: 'categories',
    component: () => import('@/views/category/Index.vue'),
    meta: {
      pageTitle: 'Categories',
      resource: 'all',
      action: 'manage-categories',
      auth: true,
      breadcrumb: [
        {
          text: 'Settings',
          active: false,
        },
        {
          text: 'Categories',
          active: true,
        },
      ],
    },
  },

]

export default routes
