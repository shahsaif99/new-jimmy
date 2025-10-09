import axios from "@axios";
import { computed, ref, watch, reactive } from "@vue/composition-api";
import route from "ziggy-js";
import toaster from "./toaster";
import projectSchema from "@/schemas/projectSchema";
import moment from "moment";

const statusOptions = [
    { value: "in_progress", text: "In progress" },
    { value: "completed", text: "Completed " },
];

const initialState = {
    project_name: "",
    status: "",
    customer: null,
    project_no: null,
    project_manager: null,
    project_hse_manager: null,
    start_date: "",
    end_date: "",
    description: "",
    cost: "",
    hours: "",
};

const filters = reactive({
    date: "",
    search: "",
    dateShortcuts: [
        {
            text: "Today",
            onClick() {
                const today = new Date();
                return [today, today];
            },
        },
        {
            text: "Yesterday",
            onClick() {
                const today = new Date();
                const yesterday = new Date(today);
                yesterday.setDate(today.getDate() - 1);
                return [yesterday, yesterday];
            },
        },
        {
            text: "This Week",
            onClick() {
                const today = new Date();
                const firstDayOfWeek = new Date(today);
                firstDayOfWeek.setDate(today.getDate() - today.getDay());
                const lastDayOfWeek = new Date(firstDayOfWeek);
                lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
                return [firstDayOfWeek, lastDayOfWeek];
            },
        },
        {
            text: "Last 7 Days",
            onClick() {
                const today = new Date();
                const lastWeek = new Date();
                lastWeek.setDate(today.getDate() - 7);
                return [lastWeek, today];
            },
        },
        {
            text: "Last 2 Weeks",
            onClick() {
                const today = new Date();
                const lastTwoWeeks = new Date();
                lastTwoWeeks.setDate(today.getDate() - 14);
                return [lastTwoWeeks, today];
            },
        },
        {
            text: "This Month",
            onClick() {
                const today = new Date();
                const firstDayOfMonth = new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    1
                );
                const lastDayOfMonth = new Date(
                    today.getFullYear(),
                    today.getMonth() + 1,
                    0
                );
                return [firstDayOfMonth, lastDayOfMonth];
            },
        },
        {
            text: "Last 30 Days",
            onClick() {
                const today = new Date();
                const last30Days = new Date();
                last30Days.setDate(today.getDate() - 30);
                return [last30Days, today];
            },
        },
        {
            text: "Last 2 Months",
            onClick() {
                const today = new Date();
                const firstDayLastTwoMonths = new Date(
                    today.getFullYear(),
                    today.getMonth() - 1,
                    1
                );
                const lastDayOfLastMonth = new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    0
                );
                return [firstDayLastTwoMonths, lastDayOfLastMonth];
            },
        },
    ],
    showOpen: false,
    expandAll: false,
    customer_id: "",
    sortBy:'project_no',
    sortDesc: false,
    accordion: [
        {
            id: 1,
            key: "status",
            label: "Project Status",
            options: ["in_progress", "completed"],
            model: "",
            isExpand: false,
            computedHeight: 0,
        },
    ],
    toggleExpand() {
        filters.accordion.forEach((item) => {
            item.isExpand = !filters.expandAll;
        });
        filters.expandAll = !filters.expandAll;
    },
    get(pagination) {
        const data = {};

        filters.accordion.forEach(({ key, model }) => {
            if (model !== "" && model !== false) {
                data[key] = model;
            }
        });

        if (Array.isArray(filters.date) && filters.date.length === 2) {
            const [startDate, endDate] = filters.date;
            if (startDate)
                data["date[0]"] = moment(startDate).format("YYYY-MM-DD");
            if (endDate) data["date[1]"] = moment(endDate).format("YYYY-MM-DD");
        }

        if (filters.search) {
            data.search = filters.search;
        }
        if (filters.customer_id) {
            data.customer_id = filters.customer_id;
        }

        if (pagination) {
            data.page = pagination.current_page || 1;
            data.perPage = pagination.per_page || 10;
        }

        if (filters.sortBy) {
            data.sortBy = filters.sortBy;
            data.sortDesc = filters.sortDesc ? "true" : "false";
        }

        return data;
    },
});

const form = reactive({
    ...initialState,

    getData() {
        return {
            name: this.project_name,
            status: this.status,
            customer_id: this.customer,
            project_no: this.project_no !== "" ? this.project_no : null,
            project_manager_id: this.project_manager,
            project_hse_manager_id: this.project_hse_manager,
            start_date: this.start_date,
            end_date: this.end_date,
            description: this.description,
            cost: this.cost,
            hour: this.hours,
        };
    },

    getDataUpdate() {
        return {
            name: this.project_name,
            status: this.status,
            customer_id: this.customer,
            project_no: this.project_no !== "" ? this.project_no : null,
            project_manager_id: this.project_manager,
            project_hse_manager_id: this.project_hse_manager,
            start_date: this.start_date,
            end_date: this.end_date,
            description: this.description,
            cost: this.cost,
            hour: this.hours,
        };
    },

    set(data) {
        Object.assign(this, { ...initialState, ...data });
    },

    reset() {
        Object.assign(this, initialState);
    },
});

const dialog = reactive({
    show: {
        project: {
            add: false,
            edit: false,
            delete: false,
        },
    },

    toggleDialog(section, action) {
        if (
            this.show.hasOwnProperty(section) &&
            this.show[section].hasOwnProperty(action)
        ) {
            this.show[section][action] = !this.show[section][action];
        }
    },

    closeDialog(section, action) {
        if (
            this.show.hasOwnProperty(section) &&
            this.show[section].hasOwnProperty(action)
        ) {
            this.show[section][action] = false;
        }
    },

    temp: {
        project: {
            data: null,
            id: null,
        },
    },
});

const apiHelpers = reactive({
    loading: false,
    toast: toaster(),
    errors: {},
    respResult: null,
    refresh: false,
});

const columns = ref([
    { label: "id", field: "id", visible: true },
    { label: "No.", field: "project_no", visible: true,  sortable: true },
    { label: "Project name", field: "name", visible: true },
    { label: "Customer", field: "customer_name", visible: true },
    { label: "start_date", field: "start_date", visible: true },
    { label: "end_date", field: "end_date", visible: true },
    { label: "status", field: "status", visible: true },
    { label: "Cost", field: "cost", visible: true },
    { label: "Action", field: "action", visible: true },
]);

const errorHandler = (error) => {
    if (error.message === "Network Error") {
        return apiHelpers.toast.error(error.message);
    }

    if (error.response) {
        if (error.response.status === 422) {
            apiHelpers.errors.value = error.response.data.errors;
        }

        if (error.response.data && error.response.data.message) {
            return apiHelpers.toast.error(error.response.data.message);
        }
    }

    // Fallback error message for unexpected cases
    apiHelpers.toast.error("An unexpected error occurred.");
};

const projects = ref([]);
const project = ref(null);

const availableData = computed(() => {
    const visibleColumns = columns.value.filter(({ visible }) => visible);

    const filteredRows = projects.value.map((task) => {
        const filteredTask = {};
        visibleColumns.forEach((column) => {
            filteredTask[column.label] = task[column.field];
        });
        return filteredTask;
    });

    console.log(visibleColumns);

    return { columns: visibleColumns, rows: filteredRows };
});

const pagination = reactive({
    current_page: 1,
    total: 0,
    per_page: 10,
    reset(){
        this.current_page = 1
        this.total = 0
        this.per_page = 10
    }
});

export default function useProjects() {
    const busy = ref(false);
    const respResult = ref(null);

    const errors = ref({});
    const toast = toaster();
    const perPage = ref(10);
    const totalRecords = ref(0);
    const currentPage = ref(1);
    const perPageOptions = [10, 25, 50, 100];
    const searchQuery = ref("");
    const sortBy = ref("project_no");
    const isSortDirDesc = ref(true);
    const refListTable = ref(null);

    const tableColumns = [
        { key: "id", sortable: false },
        { key: "name", sortable: true },
        { key: "start_date", sortable: false },
        { key: "end_date", sortable: false },
        { key: "customer", sortable: false },
        { key: "actions" },
    ];

    const dataMeta = computed(() => {
        const localItemsCount = refListTable.value
            ? refListTable.value.localItems.length
            : 0;
        return {
            from:
                perPage.value * (currentPage.value - 1) +
                (localItemsCount ? 1 : 0),
            to: perPage.value * (currentPage.value - 1) + localItemsCount,
            of: totalRecords.value,
        };
    });

    const fetchProjects = async () => {
        try {
            apiHelpers.loading = true;

            const queryParams = filters.get(pagination);

            const response = await axios.get(route("projects.index"), {
                params: queryParams,
            });
            projects.value = response.data.data;
            pagination.current_page = response.data.meta.current_page;
            pagination.total = response.data.meta.total;
            pagination.per_page = response.data.meta.per_page;
        } catch (error) {
            if (error.name === "ValidationError") {
                apiHelpers.toast.error(JSON.stringify(error.errors));
            } else {
                errorHandler(error);
            }
        } finally {
            apiHelpers.loading = false;
        }
    };

    const getProject = async (id) => {
        try {
            apiHelpers.loading = true;
            const response = await axios.get(route("projects.show", { id }));
            project.value = response.data.data;
        } catch (error) {
            if (error.name === "ValidationError") {
                apiHelpers.toast.error(JSON.stringify(error.errors));
            } else {
                errorHandler(error);
            }
        }
        finally{
            apiHelpers.loading = false
        }
    };

    const storeProject = async () => {
        try {
            apiHelpers.loading = true;

            await projectSchema.validate(form.getData(), { abortEarly: false });

            await axios.post(route("projects.store"), form.getData());

            dialog.toggleDialog("project", "add");

            fetchProjects();

            form.reset();

            toast.success("Project successfully created.");
        } catch (error) {
            if (error.name === "ValidationError") {
                apiHelpers.toast.error(JSON.stringify(error.errors));
            } else {
                errorHandler(error);
            }
        } finally {
            apiHelpers.loading = false;
        }
    };

    const updateProject = async () => {
        try {
            apiHelpers.loading = true;

            await projectSchema.validate(form.getDataUpdate(), {
                abortEarly: false,
            });

            await axios.put(
                route("projects.update", dialog.temp.project.id),
                form.getDataUpdate()
            );

            fetchProjects();

            dialog.toggleDialog("project", "edit");

            form.reset();

            toast.success("Project successfully updated.");
        } catch (error) {
            console.log(form);
            console.log(form.getDataUpdate());
            if (error.name === "ValidationError") {
                apiHelpers.toast.error(JSON.stringify(error.errors));
            } else {
                errorHandler(error);
            }
        } finally {
            apiHelpers.loading = false;
        }
    };

    const uploadDocument = async (data, id) => {
        errors.value = "";
        try {
            busy.value = true;
            const response = await axios.post(
                route("projects.upload.documents", id),
                data
            );
            respResult.value = response;
            toast.success(response.data.message);
        } catch (error) {
            if (error.message === "Network Error") {
                toast.error(error.message);
            } else {
                if (error.response.status === 422) {
                    errors.value = error.response.data.errors;
                }
                respResult.value = error;
                toast.error(error.response.data.message);
            }
        } finally {
            busy.value = false;
        }
    };

    const deleteProject = async (id) => {
        try {
            busy.value = true;
            await axios.delete(route("projects.destroy", id));
            toast.success("Project successfully deleted.");
            fetchProjects();
        } catch (error) {
            if (error.message === "Network Error") {
                toast.error(error.message);
            } else {
                respResult.value = error;
                toast.error(error.response.data.message);
            }
        } finally {
            busy.value = false;
        }
    };

    const resolveProjectstatus = (status) => {
        if (status === "Pending") {
            return "warning";
        }
        if (status === "Complete Information") {
            return "danger";
        }
        return "primary";
    };

    const fetchProjectsList = async (searchString = "") => {
        busy.value = true;
        try {
            const response = await axios.get(route("projects.index"), {
                params: {
                    q: searchString,
                },
            });
            projects.value = response.data.data;
        } catch (e) {
            toast.error(e.response.data.message);
        } finally {
            busy.value = false;
        }
    };

    const attachmentFields = [{ key: "name" }, { key: "attachment" }];
    const attachmentData = [
        { name: "hello.png", attachment: "hello" },
        { name: "hello.png", attachment: "hello" },
    ];
    watch([currentPage, searchQuery], () => {
        pagination.current_page = currentPage.value
        fetchProjects();
    });

    return {
        busy,
        sortBy,
        errors,
        perPage,
        project,
        dataMeta,
        projects,
        getProject,
        respResult,
        currentPage,
        searchQuery,
        totalRecords,
        tableColumns,
        deleteProject,
        isSortDirDesc,
        updateProject,
        fetchProjects,
        storeProject,
        perPageOptions,
        attachmentData,
        uploadDocument,
        attachmentFields,
        fetchProjectsList,
        resolveProjectstatus,
        form,
        dialog,
        statusOptions,
        apiHelpers,
        filters,
        columns,
        availableData,
        pagination,
    };
}
