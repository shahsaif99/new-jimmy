
const routes = [

  {
    path: 'settings/absence-types',
    name: 'settings-absence-types',
    component: () => import('@/views/settings/absence-types/Index.vue'),
    meta: {
      pageTitle: 'Settings: Absence Types',
      resource: 'all',
      action: 'manage-settings',
      auth: true,
      breadcrumb: [
        {
          text: 'Absence Types',
          active: true,
        },
      ],
    },
  },
  {
    path: 'settings/chapters',
    name: 'settings-chapters',
    component: () => import('@/views/settings/chapters/Index.vue'),
    meta: {
      pageTitle: 'Settings: Absence Types',
      resource: 'all',
      action: 'manage-settings',
      auth: true,
      breadcrumb: [
        {
          text: 'Absence Types',
          active: true,
        },
      ],
    },
  },
  {
    path: 'settings/competence',
    name: 'settings-competence',
    component: () => import('@/views/settings/competence/Index.vue'),
    meta: {
      pageTitle: 'Settings: Competence',
      resource: 'all',
      action: 'manage-settings',
      auth: true,
      breadcrumb: [
        {
          text: 'Competence',
          active: true,
        },
      ],
    },
  },
  {
    path: 'settings/holiday',
    name: 'settings-holiday',
    component: () => import('@/views/settings/Holiday.vue'),
    meta: {
      pageTitle: 'Settings: Holiday',
      resource: 'all',
      action: 'manage-settings',
      auth: true,
      breadcrumb: [
        {
          text: 'Holiday',
          active: true,
        },
      ],
    },
  },

  {
    path: 'settings/ruh-types',
    name: 'settings-ruh-types',
    component: () => import('@/views/settings/ruh-types/Index.vue'),
    meta: {
      pageTitle: 'Settings: Avvik/RUH',
      resource: 'all',
      action: 'manage-settings',
      auth: true,
      breadcrumb: [
        {
          text: 'Settings: Avvik/RUH',
          active: true,
        },
      ],
    },
  },
]

export default routes
