const routes = [
    {
        path: "tasks",
        name: "tasks",
        component: () => import("@/views/tasks/index.vue"),
        meta: {
            pageTitle: "Tasks",
            layout: "vertical",
            resource: "all",
            action: "tasks",
            breadcrumb: [
                {
                    text: "Tasks",
                    active: true,
                },
            ],
        },
    },
    {
        path: "tasks/:id/overview",
        name: "overview",
        component: () => import("@/views/tasks/attempt/overview.vue"),
        meta: {
            pageTitle: "Tasks Overview",
            layout: "main",
            resource: "all",
            action: "overview",
            breadcrumb: [
                {
                    text: "Tasks Overview",
                    active: true,
                },
            ],
        },
    },
    {
        path: "tasks/:id/perform-task",
        name: "overview",
        component: () => import("@/views/tasks/attempt/inspection.vue"),
        meta: {
            pageTitle: "Tasks Inspection",
            layout: "main",
            resource: "all",
            action: "overview",
            breadcrumb: [
                {
                    text: "Tasks Inspection",
                    active: true,
                },
            ],
        },
    },
];
export default routes;
