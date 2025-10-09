
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

  {
    path: 'settings/procedures',
    name: 'settings-procedures',
    component: () => import('@/views/category/Index.vue'),
    meta: {
      pageTitle: 'Settings Procedures',
      resource: 'all',
      action: 'manage-settings',
      auth: true,
      breadcrumb: [
        {
          text: 'Settings',
          active: true,
        },
        {
          text: 'Procedures',
          active: false,
        },
      ],
    },
  },
  {
    path: 'settings/equipment-categories',
    name: 'settings-equipment-categories',
    component: () => import('@/views/settings/equipment-categories/index.vue'),
    meta: {
      pageTitle: 'Settings Equipment Categories',
      resource: 'all',
      action: 'manage-settings',
      auth: true,
      breadcrumb: [
        {
          text: 'Settings',
          active: true,
        },
        {
          text: 'Equipment Categories',
          active: false,
        },
      ],
    },
  },
  {
    path: 'settings/storage-locations',
    name: 'settings-storage-locations',
    component: () => import('@/views/settings/storage-locations/index.vue'),
    meta: {
      pageTitle: 'Settings Storage Locations',
      resource: 'all',
      action: 'manage-settings',
      auth: true,
      breadcrumb: [
        {
          text: 'Settings',
          active: true,
        },
        {
          text: 'Storage Locations',
          active: false,
        },
      ],
    },
  },
]

export default routes
