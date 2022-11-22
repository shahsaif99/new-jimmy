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
    action: 'overview-view',
    resource: 'all',
    children: [
      {
        title: 'Overview',
        route: 'projectoverview',
        action: 'overview-view',
        icon: 'InboxIcon',
        resource: 'all',
      },
    ],
  },

]
