const routes = [
  {
    path: 'login',
    name: 'login',
    component: () => import('@/views/auth/Login.vue'),
    meta: {
      layout: 'full',
      redirectIfLoggedIn: true,
      auth: false,
    },
  },
  {
    path: 'dashboard',
    name: 'dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: {
      pageTitle: 'Dashboard',
      layout: 'vertical',
      auth: true,
      resource: 'all',
      action: 'dashboard-view',
      breadcrumb: [
        {
          text: 'Dashboard',
          active: true,
        },
      ],
    },
  },
  {
    path: 'addinformation',
    name: 'addinformation',
    component: () => import('@/views/AddDashboardInformation.vue'),
    meta: {
      pageTitle: 'Add Information',
      layout: 'vertical',
      auth: true,
      resource: 'all',
      action: 'dashboard-view',
      breadcrumb: [
        {
          text: 'Dashboard',
          active: true,
        },
      ],
    },
  },
  {
    path: 'employeeoverview',
    name: 'employeeoverview',
    component: () => import('@/views/employeeoverview/Employeeoverview.vue'),
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
    path: 'addemployee',
    name: 'addemployee',
    component: () => import('@/views/employeeoverview/addEmployee.vue'),
    meta: {
      pageTitle: 'Add Employee',
      layout: 'vertical',
      resource: 'all',
      action: 'employee-overview',
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
    component: () => import('@/views/employeeoverview/competenceOverview.vue'),
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
  {
    path: 'documentcenter',
    name: 'documentcenter',
    component: () => import('@/views/documentcenter/DocumentCenter.vue'),
    meta: {
      pageTitle: 'Document Center',
      layout: 'vertical',
      resource: 'all',
      action: 'documentcenter',
      breadcrumb: [
        {
          text: 'Document Center',
          active: true,
        },
      ],
    },
  },
  {
    path: 'handbooks',
    name: 'handbooks',
    component: () => import('@/views/documentcenter/Handbooks.vue'),
    meta: {
      pageTitle: 'Handbooks',
      layout: 'vertical',
      resource: 'all',
      action: 'documentcenter',
      breadcrumb: [
        {
          text: 'Document Center',
          active: true,
        },
      ],
    },
  },
  {
    path: 'equipmentoverview',
    name: 'equipmentoverview',
    component: () => import('@/views/equipment/index.vue'),
    meta: {
      pageTitle: 'Overview',
      layout: 'vertical',
      resource: 'all',
      action: 'equipment-view',
      breadcrumb: [
        {
          text: 'Equipment Control',
          active: true,
        },
      ],
    },
  },
  {
    path: 'lendinghistory',
    name: 'lendinghistory',
    component: () => import('@/views/equipment/lendinghistory.vue'),
    meta: {
      pageTitle: 'Lending History',
      layout: 'vertical',
      resource: 'all',
      action: 'equipment-view',
      breadcrumb: [
        {
          text: 'Equipment Control',
          active: true,
        },
      ],
    },
  },
  // {
  //   path: 'addloan',
  //   name: 'addloan',
  //   component: () => import('@/views/equipment/Addloan.vue'),
  //   meta: {
  //     pageTitle: 'Add New Loan',
  //     layout: 'vertical',
  //     resource: 'all',
  //     action: 'equipment-view',
  //     breadcrumb: [
  //       {
  //         text: 'Equipment Control',
  //         active: true,
  //       },
  //     ],
  //   },
  // },
  {
    path: 'personalequipment',
    name: 'personalequipment',
    component: () => import('@/views/equipment/Personalequipment.vue'),
    meta: {
      pageTitle: 'Personal Equipment',
      layout: 'vertical',
      resource: 'all',
      action: 'equipment-view',
      breadcrumb: [
        {
          text: 'Equipment Control',
          active: true,
        },
      ],
    },
  },
  {
    path: 'projectoverview',
    name: 'projectoverview',
    component: () => import('@/views/overview/Overview.vue'),
    meta: {
      pageTitle: 'Overview',
      layout: 'vertical',
      resource: 'all',
      action: 'overview-view',
      breadcrumb: [
        {
          text: 'Projects',
          active: true,
        },
      ],
    },
  },
  // {
  //   path: 'addequipment',
  //   name: 'addequipment',
  //   component: () => import('@/views/equipment/AddEquipment.vue'),
  //   meta: {
  //     pageTitle: 'Add Equipment',
  //     layout: 'vertical',
  //     resource: 'all',
  //     action: 'equipment-view',
  //     breadcrumb: [
  //       {
  //         text: 'Equipment Control',
  //         active: true,
  //       },
  //     ],
  //   },

  // },
  {
    path: 'password-reset/:token/:email',
    name: 'password-reset',
    props: true,
    component: () => import('@/views/auth/ResetPassword.vue'),
    meta: {
      layout: 'full',
      redirectIfLoggedIn: true,
      auth: false,
    },
  },
  {
    path: 'forgot-password',
    name: 'forgot-password',
    component: () => import('@/views/auth/ForgotPassword.vue'),
    meta: {
      layout: 'full',
      redirectIfLoggedIn: true,
      auth: false,
    },
  },

  {
    path: 'not-authorized',
    name: 'not-authorized',
    component: () => import('@/views/pages/NotAuthorized.vue'),
    meta: {
      layout: 'full',
      resource: 'all',
      action: 'not-authorized',
    },
  },
  {
    path: 'error-404',
    name: 'error-404',
    component: () => import('@/views/pages/Error404.vue'),
    meta: {
      layout: 'full',
    },
  },
  {
    path: '*',
    redirect: 'error-404',
  },
]

export default routes
