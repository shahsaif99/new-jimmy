
const routes = [

  {
    path: 'users',
    name: 'users',
    component: () => import('@/views/users/Index.vue'),
    meta: {
      pageTitle: 'Employee Overview',
      resource: 'all',
      action: 'manage-users',
      auth: true,
      breadcrumb: [
        {
          text: 'Users',
          active: true,
        },
      ],
    },
  },
  {
    path: 'users/add',
    name: 'users-add',
    component: () => import('@/views/users/add/AddUser.vue'),
    meta: {
      pageTitle: 'Add Employee',
      resource: 'all',
      action: 'manage-users',
      auth: true,
      breadcrumb: [
        {
          text: 'Employee Overview',
          active: false,
          to: { name: 'users' },
        },
        {
          text: 'Add Employee',
          active: true,
        },
      ],
    },
  },
  {
    path: 'users/edit/:id',
    name: 'users-edit',
    resource: 'all',
    action: 'users-edit',
    component: () => import('@/views/users/edit/Index.vue'),
    props: route => ({ id: Number(route.params.id) }),
    meta: {
      pageTitle: 'Edit Employee',
      resource: 'all',
      action: 'manage-users',
      auth: true,
      breadcrumb: [
        {
          text: 'Employee Overview',
          active: false,
          to: { name: 'users' },
        },
        {
          text: 'Edit Employee',
          active: true,
        },
      ],
    },
  },
]

export default routes
