
const routes = [

  {
    path: 'users/all',
    name: 'users',
    component: () => import('@/views/users/Index.vue'),
    meta: {
      pageTitle: 'Users - All',
      resource: 'all',
      action: 'users-view',
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
    path: 'users/active',
    name: 'users-active',
    component: () => import('@/views/users/Index.vue'),
    meta: {
      pageTitle: 'Users - Active',
      resource: 'all',
      action: 'users-active-view',
      auth: true,
      status: 1,
      breadcrumb: [
        {
          text: 'Users',
          active: false,
        },
        {
          text: 'Users Active',
          active: true,
        },
      ],
    },
  },
  {
    path: 'users/deactive',
    name: 'users-deactive',
    component: () => import('@/views/users/Index.vue'),
    meta: {
      pageTitle: 'Users - Deactive',
      resource: 'all',
      action: 'users-deactive-view',
      auth: true,
      status: 0,
      breadcrumb: [
        {
          text: 'Users',
          active: false,
        },
        {
          text: 'Users Deactive',
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
      pageTitle: 'Add User',
      resource: 'all',
      action: 'users-add',
      auth: true,
      breadcrumb: [
        {
          text: 'Users',
          active: false,
          to: { name: 'users' },
        },
        {
          text: 'Add User',
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
    component: () => import('@/views/users/edit/EditUser.vue'),
    props: route => ({ id: Number(route.params.id) }),
    meta: {
      pageTitle: 'Edit User',
      resource: 'all',
      action: 'users-edit',
      auth: true,
      breadcrumb: [
        {
          text: 'Users',
          active: false,
          to: { name: 'users' },
        },
        {
          text: 'Edit User',
          active: true,
        },
      ],
    },
  },
]

export default routes
