import axios from "@axios";
import { computed, ref, reactive, watch } from "@vue/composition-api";
import moment from "moment";
import useCategories from "@/composables/categories";
import taskSchema from "../schemas/taskSchema";
import toaster from "./toaster";
import router from "@/router";
import { utils, writeFile } from "xlsx";
import { jsPDF } from "jspdf";
import useJwt from "@/auth/jwt/useJwt";
import useUsers from "@/composables/users";

const userData = JSON.parse(useJwt.getUserData());

const { notifications } = useUsers();

const columns = ref([
    { label: "ID", field: "id", visible: true },
    { label: "Start Date", field: "start_date", visible: true },
    { label: "Title", field: "title", visible: true },
    { label: "Description", field: "description", visible: true },
    { label: "Category", field: "category", visible: true },
    { label: "Location", field: "location", visible: true },
    { label: "Assigned to", field: "users", visible: true },
    { label: "Status", field: "status", visible: true },
    { label: "Priority", field: "priority", visible: false },
    { label: "actions", field: "actions", visible: true },
]);

const assign = ref({
    name: "",
    assign_to: [],
    priority: "",
    work_order: {
        name: "",
        id: null,
    },
    due_date: "",
    description: "",
    file: "",
    checklist: {
        temp: "",
        data: null,
        id: null,
        reset() {
            assign.value.checklist.data = null;
            assign.value.checklist.id = null;
            assign.value.checklist.temp = "";
        },
    },
    project: {
        temp: "",
        data: null,
        id: null,
        reset() {
            assign.value.project.data = null;
            assign.value.project.id = null;
            assign.value.project.temp = "";
        },
    },
    work_location: {
        room: "",
        floor: "",
        area: "",
    },
    reset() {
        this.name = "";
        this.assign_to = [];
        this.priority = "";
        this.work_order = {
            name: "",
            id: null,
        };
        this.due_date = "";
        this.description = "";
        this.file = "";
        this.checklist.data = null;
        this.checklist.id = null;
        this.checklist.temp = "";
        this.project.data = null;
        this.project.id = null;
        this.project.temp = "";
        this.work_location = {
            room: "",
            floor: "",
            area: "",
        };
    },
    get() {
        return {
            title: this.name,
            assign_to: this.assign_to,
            description: this.description,
            priority: this.priority,
            due_date: this.due_date,
            user_ids: this.assign_to,
            checklist_id: this.checklist.id,
            project_id: this.project.id,
            category_id: JSON.stringify(this.work_order.id),
            img: this.file === "" ? null : this.file,
            floor: this.work_location.floor,
            area: this.work_location.area,
            room: this.work_location.room,
        };
    },
    getFormData(method) {
        const formData = new FormData();
        if (method === "PUT") {
            formData.append("_method", "PUT");
        }
        formData.append("title", this.name);
        formData.append("assign_to", this.assign_to);
        formData.append("description", this.description);
        formData.append("priority", this.priority);
        formData.append("due_date", this.due_date);
        this.assign_to.forEach((user_id, index) => {
            formData.append(`user_ids[${index}]`, user_id);
        });

        formData.append("checklist_id", this.checklist.id);
        if (this.project.id == null) {
            formData.append("project_id", "");
        } else {
            formData.append("project_id", this.project.id);
        }

        formData.append("category_id", JSON.stringify(this.work_order.id));

        if (this.file) {
            formData.append("img", this.file);
        }

        formData.append("floor", this.work_location.floor);
        formData.append("area", this.work_location.area);
        formData.append("room", this.work_location.room);
        return formData;
    },
});

const editTask = reactive({
    id: null,
});

const filters = reactive({
    date: "",
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
                const yesterday = new Date(
                    today.getTime() - 24 * 60 * 60 * 1000
                );
                return [yesterday, yesterday];
            },
        },
        {
            text: "This Week",
            onClick() {
                const today = new Date();
                const firstDayOfWeek = new Date(
                    today.setDate(today.getDate() - today.getDay())
                );
                const lastDayOfWeek = new Date(
                    today.setDate(today.getDate() + (6 - today.getDay()))
                );
                return [firstDayOfWeek, lastDayOfWeek];
            },
        },
        {
            text: "Last 7 Days",
            onClick() {
                const today = new Date();
                const lastWeek = new Date(
                    today.getTime() - 7 * 24 * 3600 * 1000
                );
                return [lastWeek, new Date()];
            },
        },
        {
            text: "Last 2 Weeks",
            onClick() {
                const today = new Date();
                const lastTwoWeeks = new Date(
                    today.getTime() - 14 * 24 * 3600 * 1000
                );
                return [lastTwoWeeks, new Date()];
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
                const last30Days = new Date(
                    today.getTime() - 30 * 24 * 3600 * 1000
                );
                return [last30Days, new Date()];
            },
        },
        {
            text: "Last 2 Months",
            onClick() {
                const today = new Date();
                const lastTwoMonths = new Date(
                    today.getFullYear(),
                    today.getMonth() - 1,
                    1
                );
                const lastDayOfLastMonth = new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    0
                );
                return [lastTwoMonths, lastDayOfLastMonth];
            },
        },
    ],
    showOpen: false,
    expandAll: false,
    accordion: [
        {
            id: 1,
            key: "status",
            label: "status",
            options: ["open", "completed", "in progress", "on hold"],
            icons: [
                "bi-circle text-primary",
                "bi-circle text-warning",
                "bi-circle text-dark",
                "bi-circle text-success",
            ],
            model: "",
            isExpand: false,
            computedHeight: 0,
        },
        {
            id: 2,
            key: "priority",
            label: "priority",
            options: ["critical", "high", "medium", "low", "none"],
            icons: [
                "bi-thermometer-high text-danger",
                "bi-reception-4 text-warning",
                "bi-reception-3 text-secondary",
                "bi-reception-2 text-info",
                "bi-reception-0 text-primary",
            ],
            model: "",
            isExpand: false,
            computedHeight: 0,
        },
        {
            id: 4,
            key: "category_id",
            label: "category",
            options: [],
            icons: [],
            model: "",
            isExpand: false,
            computedHeight: 0,
        },
        {
            id: 5,
            key: "user_id",
            label: "assigned to",
            options: [],
            icons: [],
            model: "",
            isExpand: false,
            computedHeight: 0,
        },
        {
            id: 6,
            key: "due_date",
            label: "due date",
            options: [],
            icons: [],
            model: false,
            isExpand: false,
            computedHeight: 0,
        },
    ],
    toggleExpand() {
        if (!filters.expandAll) {
            filters.accordion.forEach((item) => {
                item.isExpand = true;
            });
        } else {
            filters.accordion.forEach((item) => {
                item.isExpand = false;
            });
        }
        filters.expandAll = !filters.expandAll;
    },
    get() {
        const data = {};

        filters.accordion.forEach(({ key, model }) => {
            if ((model !== "" && model !== false) || key === "due_date") {
                data[key] = model;
            }
        });

        if (this.date) {
            const [dueDateFrom, dueDateTo] = this.date;

            if (dueDateFrom || dueDateTo) {
                data["date[0]"] = moment(dueDateFrom).format("YYYY-MM-DD");
                data["date[1]"] = moment(dueDateTo).format("YYYY-MM-DD");
            }
        }

        if (this.showOpen) {
            data.show_open = this.showOpen;
        }

        data.page = pagination.current_page;
        data.perPage = pagination.per_page;
        data.total = pagination.total;

        return data;
    },
});

const dialog = reactive({
    show: false,
    toggleDialog() {
        dialog.show = !dialog.show;
    },
    closeDialog() {
        dialog.show = false;
    },
});

const { categories } = useCategories();

const statusOptions = [
    { status: "open", bgColor: "#f0f9ff", textColor: "#38bdf8" },
    { status: "completed", bgColor: "#ecfdf5", textColor: "#4ade80" },
    { status: "in progress", bgColor: "#fffbeb", textColor: "#fbbf24" },
    { status: "on hold", bgColor: "#fef2f2", textColor: "#f87171" },
];

const availableData = computed(() => {
    const visibleColumns = columns.value.filter(({ visible }) => visible);

    const filteredRows = tasks.data.map((task) => {
        const filteredTask = {};
        visibleColumns.forEach((column) => {
            filteredTask[column.field] = task[column.field];
        });
        return filteredTask;
    });

    return { columns: visibleColumns, rows: filteredRows };
});

const setAssignToEdit = (id) => {
    const data = tasks.data.find((task) => task.id === id);

    assign.value.checklist.reset();
    assign.value.project.reset();

    editTask.id = data.id;

    assign.value.name = data.title || "";
    assign.value.description = data.description || "";

    assign.value.priority = data.priority || "";

    assign.value.due_date = data.due_date || "";

    assign.value.assign_to = data.users
        ? data.users.map((user) => user.id)
        : [];

    assign.value.work_order = {
        name: data.category.name || "",
        id: data.category ? data.category.id : null,
    };

    assign.value.checklist.data = data.checklist;
    assign.value.checklist.id = data.checklist.id;
    assign.value.checklist.temp = data.checklist.id;

    if (data.project) {
        assign.value.project.data = data.project;
        assign.value.project.id = data.project.id;
        assign.value.project.temp = data.project.id;
    }

    assign.value.work_location = {
        room: data.location ? data.location.room : "",
        floor: data.location ? data.location.floor : "",
        area: data.location ? data.location.area : "",
    };

    assign.value.file = data.img || "";

    assign.value.status = data.status || "";

    dialog.toggleDialog();
};

// Apis

const task = reactive({
    data: null,
});

const comments = reactive({
    data: [],
    model: ''
});

const tasks = reactive({
    data: [],
    params: {
        perPage: 10,
        sortBy: "id",
        sortDesc: false,
        filter: computed(() => filters.get()),
        q: "",
        totalRecords: 0,
    },
    getParams() {
        return {
            perPage: this.params.perPage,
            sortBy: this.params.sortBy,
            sortDesc: this.params.sortDesc,
        };
    },
});

const apiHelpers = reactive({
    loading: false,
    toast: toaster(),
    errors: {},
    respResult: null,
    refresh: false,
});

const pagination = reactive({
    current_page: 1,
    total: 0,
    per_page: 10,
});

const setFilterFromQuery = (query) => {
    const accordionKeys = filters.accordion.map((item) => item.key);

    for (const [key, queryValue] of Object.entries(query)) {
        let parsedValue = queryValue;
        if (queryValue === "false") {
            parsedValue = false;
        } else if (!isNaN(queryValue) && queryValue.trim() !== "") {
            parsedValue = Number(queryValue);
        }

        if (accordionKeys.includes(key)) {
            const accordionItem = filters.accordion.find(
                (item) => item.key === key
            );
            accordionItem.model = parsedValue;
        } else {
            filters[key] = parsedValue;
        }
    }
};

const errorHandler = (error) => {
    if (error.message === "Network Error") {
        return apiHelpers.toast.error(error.message);
    } else if (error.response.status === 422) {
        apiHelpers.errors.value = error.response.data.errors;
    }
    apiHelpers.toast.error(error.response.data.message);
};

const addTask = async () => {
    try {
        apiHelpers.loading = true;
        await taskSchema.validate(assign.value.get(), { abortEarly: false });

        await axios.post(route("task.store"), assign.value.getFormData("POST"));
        getTasks();
        apiHelpers.toast.success("New task added");
        assign.value.reset();
        dialog.toggleDialog();
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

const taskAnswer = async (data) => {
    try {
        apiHelpers.loading = true;
        await axios.post(route("task-answer.store"), data);
        apiHelpers.toast.success("Answer is added");
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

const deleteTask = async (id) => {
    try {
        if (id === "") throw { name: "custom", message: "Category id missing" };
        apiHelpers.loading = true;
        await axios.delete(route("task.destroy", id));
        apiHelpers.toast.success("Task deleted Successfully");
        getTasks();
    } catch (error) {
        if (error.name === "custom") {
            return apiHelpers.toast.error(error.message);
        }
        console.clear();
        console.log(error);
        errorHandler(error);
    } finally {
        apiHelpers.loading = false;
        categories.clear();
    }
};

const updateTask = async () => {
    try {
        await taskSchema.validate(assign.value.get(), { abortEarly: false });
        apiHelpers.loading = true;

        const response = await axios.post(
            route("task.update", editTask.id),
            assign.value.getFormData("PUT")
        );
        editTask.id = null;
        apiHelpers.respResult = response.data.data;
        apiHelpers.toast.success(response.data.message);
        getTasks();
        dialog.toggleDialog();
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

const updateTaskStatus = async (status, id) => {
    try {
        apiHelpers.loading = true;

        const response = await axios.put(route("task.update.status", id), {
            status: status,
        });

        apiHelpers.respResult = response.data.data;
        apiHelpers.toast.success(response.data.message);
        getTasks();

        if (userData.role !== "Admin") router.push(`/tasks/${id}/perform-task`);
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

const getTasks = async (refresh = false) => {
    try {
        apiHelpers.refresh = refresh;
        apiHelpers.loading = true;

        if (router.history.current.name === "project") {
            if (refresh) {
                refresh.project_id = router.history.current.params.id;
            }
            tasks.params.filter.project_id = router.history.current.params.id;
        }

        const response = await axios.get(route("task.index"), {
            params: refresh ? refresh : tasks.params.filter,
        });

        tasks.data = response.data.tasks;
        pagination.current_page = response.data.pagination.current_page;
        pagination.total = response.data.pagination.total;
        pagination.per_page = response.data.pagination.per_page;

        if (refresh) {
            setFilterFromQuery(refresh);
        }

        if (response.data.meta) {
            const { total } = response.data.meta;
            tasks.params.totalRecords = total;
        }
    } catch (error) {
        errorHandler(error);
    } finally {
        apiHelpers.loading = false;
    }
};

const getTaskById = async (id) => {
    try {
        apiHelpers.loading = true;

        const response = await axios.get(route("task.show", id));

        task.data = response.data;
    } catch (error) {
        console.log(error);
        errorHandler(error);
    } finally {
        apiHelpers.loading = false;
    }
};

const exportToExcel = () => {
    const processedData = tasks.data.map((item) => ({
        ID: item.id,
        "Start Date": item.start_date,
        Title: item.title,
        Description: item.description,
        Category: item.category.name,
        Location: `Room: ${item.location.room}, Floor: ${item.location.floor}, Area: ${item.location.area}`,
        "Assigned to": item.users.map((user) => user.name).join(", "),
        Status: item.status,
        Priority: item.priority,
    }));

    const worksheet = utils.json_to_sheet(processedData);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Sheet1");
    writeFile(workbook, "ExportedData.xlsx");
};

const exportToPDF = async () => {
    const processedData = tasks.data.map((item) => ({
        ID: item.id,
        "Start Date": item.start_date,
        Title: item.title,
        Description: item.description,
        Category: item.category.name,
        Location: `Room: ${item.location.room}, Floor: ${item.location.floor}, Area: ${item.location.area}`,
        "Assigned to": item.users.map((user) => user.name).join(", "),
        Status: item.status,
        Priority: item.priority,
    }));

    const doc = new jsPDF();

    let startY = 10;
    processedData.forEach((item, index) => {
        doc.text(`ID: ${item.ID}`, 10, startY);
        doc.text(`Start Date: ${item["Start Date"]}`, 10, startY + 10);
        doc.text(`Title: ${item.Title}`, 10, startY + 20);
        doc.text(`Description: ${item.Description}`, 10, startY + 30);
        doc.text(`Category: ${item.Category}`, 10, startY + 40);
        doc.text(`Location: ${item.Location}`, 10, startY + 50);
        doc.text(`Assigned to: ${item["Assigned to"]}`, 10, startY + 60);
        doc.text(`Status: ${item.Status}`, 10, startY + 70);
        doc.text(`Priority: ${item.Priority}`, 10, startY + 80);

        startY += 100;

        if (index < processedData.length - 1) {
            doc.addPage();
            startY = 10;
        }
    });

    doc.save("ExportedData.pdf");
};

const getUnreadNotifications = async () => {
    try {
        apiHelpers.loading = true;
        const response = await axios.get(route("unread.notifications"));
        notifications.updateCount(response.data.length);
    } catch (error) {
        errorHandler(error);
    } finally {
        apiHelpers.loading = false;
    }
};

const markAllAsReadNotifications = async () => {
    try {
        apiHelpers.loading = true;
        await axios.get(route("markAllAsRead.notifications"));
        notifications.updateCount(0);
    } catch (error) {
        errorHandler(error);
    } finally {
        apiHelpers.loading = false;
    }
};

const addComment = async () => {
    try {
        apiHelpers.loading = true;
        await axios.post(route("task-comments.store"), {
            task_id: task.data.id,
            comment: comments.model,
        });
        getComments()
    } catch (error) {
        errorHandler(error);
    } finally {
        apiHelpers.loading = false;
    }
};

const getComments = async () => {
    try {
        apiHelpers.loading = true;
        if (!task.data || !task.data.id) {
            throw new Error("Task ID is missing");
        }
        const response = await axios.get(route("task-comments.index", { taskId: task.data.id }));
        comments.data = response.data;
    } catch (error) {
        console.error("Error fetching comments:", error);
        errorHandler(error);
    } finally {
        apiHelpers.loading = false;
    }
};


const deleteComment = async (id) => {
    try {
        apiHelpers.loading = true;
        await axios.delete(route("task-comments.destroy", id));
        getTaskById(task.data.id);
    } catch (error) {
        errorHandler(error);
    } finally {
        apiHelpers.loading = false;
    }
};

watch(
    filters,
    () => {
        if (apiHelpers.refresh) {
            apiHelpers.refresh = false;
            return;
        }
        if (apiHelpers.loading) return;
        if (router.history.current.name !== "project") {
            router.replace(
                {
                    query: Object.assign({ ...tasks.params.filter }),
                },
                () => {}
            );
        }

        getTasks();
    },
    { deep: true }
);

export default function useTasks() {
    return {
        columns,
        tasks,
        task,
        statusOptions,
        availableData,
        filters,
        dialog,
        assign,
        apiHelpers,
        pagination,
        editTask,
        comments,
        addTask,
        updateTask,
        getTasks,
        getComments,
        addComment,
        deleteComment,
        getTaskById,
        deleteTask,
        setAssignToEdit,
        updateTaskStatus,
        taskAnswer,
        exportToExcel,
        exportToPDF,
        getUnreadNotifications,
        markAllAsReadNotifications,
    };
}
