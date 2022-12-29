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
        title: 'Employee Overview',
        route: 'employeeoverview',
        icon: 'UserIcon',
        action: 'employee-overview',
        resource: 'all',
      },
      {
        title: 'Competence',
        route: 'competenceoverview',
        icon: 'UserIcon',
        action: 'manage-competence',
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
    title: 'Equipment Control',
    icon: 'BriefcaseIcon',
    action: 'equipment-view',
    resource: 'all',
    children: [
      {
        title: 'Overview',
        route: 'equipmentoverview',
        icon: 'BriefcaseIcon',
        action: 'equipment-view',
        resource: 'all',
      },
      {
        title: 'Personal equipment',
        route: 'personalequipment',
        icon: 'BriefcaseIcon',
        action: 'equipment-view',
        resource: 'all',
      },
      {
        title: 'Lending History',
        route: 'lendinghistory',
        icon: 'BriefcaseIcon',
        action: 'equipment-view',
        resource: 'all',
      },
    ],
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
