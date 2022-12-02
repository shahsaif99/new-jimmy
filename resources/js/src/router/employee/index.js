const routes = [
  {
    path: 'employeeoverview',
    name: 'employeeoverview',
    component: () => import('@/views/employeeoverview/employee/Index.vue'),
    meta: {
      pageTitle: 'Employee Overview',
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
    path: 'competenceoverview',
    name: 'competenceoverview',
    component: () => import('@/views/employeeoverview/competence/Index.vue'),
    meta: {
      pageTitle: 'Competence Overview',
      layout: 'vertical',
      resource: 'all',
      action: 'competence-overview',
      breadcrumb: [
        {
          text: 'Employee',
          active: true,
        },
      ],
    },
  },
]

export default routes
