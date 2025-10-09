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
      {
        title: 'Employee Overview',
        route: 'users',
        action: 'manage-users',
        resource: 'all',
      },
    ],
  },
  {
    title: 'Checklist',
    icon: 'CheckCircleIcon',
    action: 'checklist',
    resource: 'all',
    route: 'checklist',
  },
  {
    title: 'Tasks',
    icon: 'BookIcon',
    action: 'tasks',
    resource: 'all',
    route: 'tasks',
  },
  {
    title: 'Attendance',
    icon: 'CalendarIcon',
    resource: 'all',
    children: [
    //   {
    //     title: 'Time Registrations',
    //     route: 'handbooks',
    //     icon: 'FolderIcon',
    //     action: 'document-center',
    //     resource: 'all',
    //   },
      {
        title: 'My Absense',
        route: 'absences',
        icon: 'FolderIcon',
        action: 'my-absence',
        resource: 'all',
      },
      {
        title: 'My Vacations',
        route: 'vacations',
        icon: 'FolderIcon',
        action: 'my-vacations',
        resource: 'all',
      },
      {
        title: 'Absence Overview',
        route: 'absences-overview',
        icon: 'FolderIcon',
        action: 'absence-overview',
        resource: 'all',
      },
      {
        title: 'Holiday Overview',
        route: 'vacations-overview',
        icon: 'FolderIcon',
        action: 'vacations-overview',
        resource: 'all',
      },

    ],
  },

  {
    title: 'Document Center',
    icon: 'FolderIcon',
    resource: 'all',
    action: 'document-center',
    children: [
      {
        title: 'Procedures',
        route: 'procedures',
        icon: 'FolderIcon',
        action: 'document-center',
        resource: 'all',
      },
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
    title: 'Risk Center',
    icon: 'FolderIcon',
    resource: 'all',
    action: 'document-center',
    children: [
      {
        title: 'Protection Rounds',
        route: '#',
        icon: 'FolderIcon',
        action: 'document-center',
        resource: 'all',
      },
      {
        title: 'Safe job analysis',
        route: '#',
        icon: 'FolderIcon',
        action: 'document-center',
        resource: 'all',
      },
      {
        title: 'Avvik / RUH',
        route: 'avvik-listings',
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
    action: 'lendings-history',
    resource: 'all',
    route: 'lending-history',
  },
  {
    title: 'Projects',
    icon: 'InboxIcon',
    resource: 'all',
    children: [
      {
        title: 'Project Overview',
        route: 'projects-overview',
        action: 'projects-listings',
        resource: 'all',
      },
      {
        title: 'Customer/Supplier',
        route: 'customer-supplier',
        action: 'projects-listings',
        resource: 'all',
      },
    ],
  },
  {
    title: 'Authentication',
    icon: 'LockIcon',
    action: 'authentication',
    resource: 'all',
    children: [
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
  {
    title: 'Settings',
    icon: 'SettingsIcon',
    action: 'manage-settings',
    resource: 'all',
    children: [
    //   {
    //     title: 'Chapters',
    //     route: 'settings-chapters',
    //     action: 'manage-chapters',
    //     resource: 'all',
    //   },
    {
      title: 'Procedures',
      route: 'settings-procedures',
      action: 'manage-settings',
      resource: 'all',
    },
    {
      title: 'Equipment Categories',
      route: 'settings-equipment-categories',
      action: 'manage-settings',
      resource: 'all',
    },
    {
      title: 'Storage Locations',
      route: 'settings-storage-locations',
      action: 'manage-settings',
      resource: 'all',
    },
      {
        title: 'Avvik/RUH',
        route: 'settings-ruh-types',
        action: 'manage-settings',
        resource: 'all',
      },
      {
        title: 'Absence Types',
        route: 'settings-absence-types',
        action: 'manage-settings',
        resource: 'all',
      },
      {
        title: 'Competence',
        route: 'settings-competence',
        action: 'manage-settings',
        resource: 'all',
      },
      {
        title: 'Holiday',
        route: 'settings-holiday',
        action: 'manage-settings',
        resource: 'all',
      },
    ],
  },

]
