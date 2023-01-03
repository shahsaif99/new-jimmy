const routes = [
  {
    path: 'employees',
    name: 'employees',
    component: () => import('@/views/employees/Index.vue'),
    meta: {
      pageTitle: 'Employees',
      layout: 'vertical',
      resource: 'all',
      action: 'employee',
      breadcrumb: [
        {
          text: 'Employee',
          active: true,
        },
      ],
    },
  },
  {
    path: 'employee/add',
    name: 'employee-add',
    component: () => import('@/views/employees/add/Add.vue'),
    meta: {
      pageTitle: 'Add Employee',
      resource: 'all',
      action: 'employee-add',
      auth: true,
      breadcrumb: [
        {
          text: 'Employees',
          active: false,
          to: { name: 'employees' },
        },
        {
          text: 'Add Employee',
          active: true,
        },
      ],
    },
  },
  {
    path: 'employee/edit/:id',
    name: 'employee-edit',
    resource: 'all',
    action: 'employee-edit',
    component: () => import('@/views/employees/edit/Edit.vue'),
    props: route => ({ id: Number(route.params.id) }),
    meta: {
      pageTitle: 'Edit Employee',
      resource: 'all',
      action: 'employee-edit',
      auth: true,
      breadcrumb: [
        {
          text: 'Employees',
          active: false,
          to: { name: 'employees' },
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
