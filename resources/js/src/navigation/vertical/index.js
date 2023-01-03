export default [
  {
    title: 'Dashboard',
    route: 'dashboard',
    icon: 'HomeIcon',
    action: 'dashboard',
    resource: 'all',
  },
  {
    header: 'Pages',
  },
  {
    title: 'Employee',
    resource: 'all',
    icon: 'UsersIcon',
    children: [
      {
        title: 'Employees',
        route: 'employees',
        icon: 'UserIcon',
        action: 'employees-listings',
        resource: 'all',
      },
      {
        title: 'Competence',
        route: 'competence',
        icon: 'UserIcon',
        action: 'competence-listings',
        resource: 'all',
      },
    ],
  },

  {
    title: 'Document center',
    icon: 'FolderIcon',
    resource: 'all',
    action: 'document-center',
    children: [
      // {
      //   title: 'Document center',
      //   route: 'documentcenter',
      //   icon: 'FolderIcon',
      //   action: 'document-center',
      //   resource: 'all',
      // },
      {
        title: 'Handbooks',
        route: 'handbooks',
        icon: 'FolderIcon',
        action: 'document-center',
        resource: 'all',
      },
    ],
  },
  {
    title: 'Equipments',
    icon: 'BriefcaseIcon',
    action: 'equipments-listings',
    resource: 'all',
    route: 'equipments',
  },
  {
    title: 'Lending History',
    icon: 'InboxIcon',
    action: 'lending-history',
    resource: 'all',
    route: 'lending',
  },
  {
    title: 'Projects',
    icon: 'InboxIcon',
    action: 'projects-listings',
    resource: 'all',
    route: 'projects',
  },
  {
    title: 'Authentication',
    icon: 'SettingsIcon',
    action: 'authentication',
    resource: 'all',
    children: [
      {
        title: 'Users',
        route: 'users',
        action: 'manage-users',
        resource: 'all',
      },
      {
        title: 'Roles',
        route: 'roles',
        action: 'manage-roles',
        resource: 'all',
      },
      {
        title: 'Permissions',
        route: 'permissions',
        action: 'manage-permissions',
        resource: 'all',
      },
    ],
  },

]
