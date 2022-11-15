export default [

  {
    title: 'Dashboard',
    route: 'dashboard',
    icon: 'HomeIcon',
    action: 'dashboard-view',
    resource: 'all',
  },
  {
    header: 'Pages',
  },
  {
    title: 'Employee',
    resource: 'all',
    icon: 'UsersIcon',
    action: 'employee',
    children: [
      {
        title: 'Employee Overview',
        route: 'employeeoverview',
        icon: 'UserIcon',
        action: 'employee',
        resource: 'all',
      },
      {
        title: 'Competence overview',
        route: 'competenceoverview',
        icon: 'UserIcon',
        action: 'employee',
        resource: 'all',
      },
    ],
  },

  {
    title: 'Document center',
    icon: 'UsersIcon',
    resource: 'all',
    action: 'document-center',
    children: [
      {
        title: 'Document center',
        route: 'documentcenter',
        icon: 'UserIcon',
        action: 'document-center',
        resource: 'all',
      },
      {
        title: 'Handbooks',
        route: 'handbooks',
        icon: 'UserIcon',
        action: 'document-center',
        resource: 'all',
      },
    ],
  },

  {
    title: 'Equipment Control',
    icon: 'UsersIcon',
    action: 'equipment-view',
    resource: 'all',
    children: [
      {
        title: 'Overview',
        route: 'equipmentoverview',
        icon: 'UserIcon',
        action: 'equipment-view',
        resource: 'all',
      },
      {
        title: 'Personal equipment',
        route: 'personalequipment',
        icon: 'UserIcon',
        action: 'equipment-view',
        resource: 'all',
      },
    ],
  },

  {
    title: 'Projects',
    icon: 'UsersIcon',
    action: 'overview-view',
    resource: 'all',
    children: [
      {
        title: 'Overview',
        route: 'projectoverview',
        action: 'overview-view',
        icon: 'UserIcon',
        resource: 'all',
      },
    ],
  },

]
