const routes = [
    {
      path: 'checklist',
      name: 'checklist',
      component: () => import('@/views/checklist/Index.vue'),
      meta: {
        pageTitle: 'Checklist',
        layout: 'vertical',
        resource: 'all',
        action: 'checklist',
        breadcrumb: [
          {
            text: 'checklist',
            active: true,
          },
        ],
      },
    },
    
    {
      path: 'checklist/create/:param?',
      name: 'add-checklist',
      component: () => import('@/views/checklist/Add.vue'),
      meta: {
        pageTitle: 'Add checklist',
        layout: 'vertical',
        resource: 'all',
        action: 'checklist',
        breadcrumb: [
          {
            text: 'Add checklist',
            active: true,
          },
        ],
      },
    },

    {
      path: 'checklist/attach',
      name: 'attach-checklist',
      component: () => import('@/views/tasks/attach.vue'),
      meta: {
        pageTitle: 'Attach Checklist',
        layout: 'vertical',
        resource: 'all',
        action: 'checklist',
        breadcrumb: [
          {
            text: 'Attach checklist',
            active: true,
          },
        ],
      },
    },
    {
      path: 'projects/attach',
      name: 'attach-projects',
      component: () => import('@/views/tasks/attach-project.vue'),
      meta: {
        pageTitle: 'Attach Projects',
        layout: 'vertical',
        resource: 'all',
        action: 'projects',
        breadcrumb: [
          {
            text: 'Attach projects',
            active: true,
          },
        ],
      },
    },
  ]
  
  export default routes
  
  
  