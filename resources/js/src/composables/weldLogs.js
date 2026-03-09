import axios from "@axios";
import { ref, reactive } from "@vue/composition-api";
import route from "ziggy-js";
import toaster from "./toaster";

const weldLogInitialState = {
    drawing_no: "",
    project_id: null,
    status: "in_progress",
    ndt_required: false,
    ndt_rt: 0,
    ndt_mt: 0,
    ndt_pt: 0,
    ndt_vt: 0,
};

const weldInitialState = {
    weld_log_id: null,
    weld_no: "",
    wps_id: null,
    welder_id: "",
    weld_date: "",
    visual_inspection: "ok",
    ndt_rt: false,
    ndt_mt: false,
    ndt_pt: false,
    ndt_vt: false,
    ndt_accepted: null,
};

const weldLogForm = reactive({
    ...weldLogInitialState,

    getData() {
        return {
            drawing_no: this.drawing_no,
            project_id: this.project_id,
            status: this.status,
            ndt_required: this.ndt_required,
            ndt_rt: this.ndt_rt,
            ndt_mt: this.ndt_mt,
            ndt_pt: this.ndt_pt,
            ndt_vt: this.ndt_vt,
        };
    },

    set(data) {
        Object.assign(this, { ...weldLogInitialState, ...data });
    },

    reset() {
        Object.assign(this, weldLogInitialState);
    },
});

const weldForm = reactive({
    ...weldInitialState,

    getData() {
        return {
            weld_log_id: this.weld_log_id,
            weld_no: this.weld_no,
            wps_id: this.wps_id,
            welder_id: this.welder_id,
            weld_date: this.weld_date,
            visual_inspection: this.visual_inspection,
            ndt_rt: this.ndt_rt,
            ndt_mt: this.ndt_mt,
            ndt_pt: this.ndt_pt,
            ndt_vt: this.ndt_vt,
            ndt_accepted: this.ndt_accepted,
        };
    },

    set(data) {
        Object.assign(this, { ...weldInitialState, ...data });
    },

    reset() {
        Object.assign(this, weldInitialState);
    },
});

const dialog = reactive({
    show: {
        weldLog: {
            add: false,
            detail: false,
            delete: false,
        },
        weld: {
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
        weldLog: {
            data: null,
            id: null,
        },
        weld: {
            data: null,
            id: null,
        },
    },
});

const apiHelpers = reactive({
    loading: false,
    toast: toaster(),
    errors: {},
});

const weldLogs = ref([]);
const currentWeldLog = ref(null);

const pagination = reactive({
    current_page: 1,
    total: 0,
    per_page: 10,
    reset() {
        this.current_page = 1;
        this.total = 0;
        this.per_page = 10;
    },
});

const filters = reactive({
    search: "",
    project_id: "",
    status: "",
    get(pagination) {
        const data = {};
        if (this.search) data.search = this.search;
        if (this.project_id) data.project_id = this.project_id;
        if (this.status) data.status = this.status;
        if (pagination) {
            data.page = pagination.current_page || 1;
            data.perPage = pagination.per_page || 10;
        }
        return data;
    },
});

const errorHandler = (error) => {
    if (error.message === "Network Error") {
        return apiHelpers.toast.error(error.message);
    }

    if (error.response) {
        if (error.response.status === 422) {
            apiHelpers.errors = error.response.data.errors || {};
        }

        if (error.response.data && error.response.data.message) {
            return apiHelpers.toast.error(error.response.data.message);
        }
    }

    apiHelpers.toast.error("An unexpected error occurred.");
};

export default function useWeldLogs() {
    const toast = toaster();

    const fetchWeldLogs = async (projectId = null) => {
        try {
            apiHelpers.loading = true;
            const params = filters.get(pagination);
            if (projectId) params.project_id = projectId;

            const response = await axios.get(route("weld-logs.index"), { params });
            weldLogs.value = response.data.data;

            if (response.data.meta) {
                pagination.current_page = response.data.meta.current_page;
                pagination.total = response.data.meta.total;
                pagination.per_page = response.data.meta.per_page;
            }
        } catch (error) {
            errorHandler(error);
        } finally {
            apiHelpers.loading = false;
        }
    };

    const getWeldLog = async (id) => {
        try {
            apiHelpers.loading = true;
            const response = await axios.get(route("weld-logs.show", { id }));
            currentWeldLog.value = response.data.data;
        } catch (error) {
            errorHandler(error);
        } finally {
            apiHelpers.loading = false;
        }
    };

    const storeWeldLog = async (attachment = null) => {
        try {
            apiHelpers.loading = true;

            const formData = new FormData();
            const data = weldLogForm.getData();
            Object.keys(data).forEach((key) => {
                if (data[key] !== null && data[key] !== undefined) {
                    formData.append(key, data[key]);
                }
            });

            if (attachment) {
                formData.append("attachment", attachment);
            }

            await axios.post(route("weld-logs.store"), formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            dialog.toggleDialog("weldLog", "add");
            weldLogForm.reset();
            toast.success("Weld log successfully created.");
            return true;
        } catch (error) {
            errorHandler(error);
            return false;
        } finally {
            apiHelpers.loading = false;
        }
    };

    const updateWeldLog = async (id, file = null, removedFileIds = []) => {
        try {
            apiHelpers.loading = true;
            const formData = new FormData();
            const data = weldLogForm.getData();
            Object.keys(data).forEach((key) => {
                if (data[key] !== null && data[key] !== undefined) {
                    formData.append(key, data[key]);
                }
            });
            formData.append("_method", "PUT");
            if (file) {
                formData.append("attachment", file);
            }
            if (removedFileIds && removedFileIds.length) {
                removedFileIds.forEach((fid, i) => {
                    formData.append(`remove_media[${i}]`, fid);
                });
            }
            await axios.post(
                route("weld-logs.update", id),
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            toast.success("Weld log successfully updated.");
            return true;
        } catch (error) {
            errorHandler(error);
            return false;
        } finally {
            apiHelpers.loading = false;
        }
    };

    const deleteWeldLog = async (id) => {
        try {
            apiHelpers.loading = true;
            await axios.delete(route("weld-logs.destroy", id));
            toast.success("Weld log successfully deleted.");
            return true;
        } catch (error) {
            errorHandler(error);
            return false;
        } finally {
            apiHelpers.loading = false;
        }
    };

    // Weld CRUD
    const storeWeld = async () => {
        try {
            apiHelpers.loading = true;
            await axios.post(route("welds.store"), weldForm.getData());
            dialog.toggleDialog("weld", "add");
            weldForm.reset();
            toast.success("Weld successfully registered.");
            return true;
        } catch (error) {
            errorHandler(error);
            return false;
        } finally {
            apiHelpers.loading = false;
        }
    };

    const updateWeld = async () => {
        try {
            apiHelpers.loading = true;
            await axios.put(
                route("welds.update", dialog.temp.weld.id),
                weldForm.getData()
            );
            dialog.toggleDialog("weld", "edit");
            weldForm.reset();
            toast.success("Weld successfully updated.");
            return true;
        } catch (error) {
            errorHandler(error);
            return false;
        } finally {
            apiHelpers.loading = false;
        }
    };

    const deleteWeld = async (id) => {
        try {
            apiHelpers.loading = true;
            await axios.delete(route("welds.destroy", id));
            toast.success("Weld successfully deleted.");
            return true;
        } catch (error) {
            errorHandler(error);
            return false;
        } finally {
            apiHelpers.loading = false;
        }
    };

    // Export functions
    const exportPdf = async (weldLogId) => {
        try {
            const response = await axios.get(
                route("weld-logs.export-pdf", { weldLog: weldLogId }),
                { responseType: "blob" }
            );
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `weld-log-${weldLogId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            errorHandler(error);
        }
    };

    const exportXlsx = async (weldLogId) => {
        try {
            const response = await axios.get(
                route("weld-logs.export-xlsx", { weldLog: weldLogId })
            );
            // Data is returned for frontend XLSX generation
            return response.data.data;
        } catch (error) {
            errorHandler(error);
            return null;
        }
    };

    return {
        weldLogs,
        currentWeldLog,
        weldLogForm,
        weldForm,
        dialog,
        apiHelpers,
        filters,
        pagination,
        fetchWeldLogs,
        getWeldLog,
        storeWeldLog,
        updateWeldLog,
        deleteWeldLog,
        storeWeld,
        updateWeld,
        deleteWeld,
        exportPdf,
        exportXlsx,
    };
}
