import axios from "@axios";
import { ref, reactive } from "@vue/composition-api";
import route from "ziggy-js";
import toaster from "./toaster";

// ── Option lists ──
export const weldingProcessOptions = [
    { value: "111 – MMA", text: "111 – MMA" },
    { value: "131 - MIG", text: "131 - MIG" },
    { value: "135 – MAG", text: "135 – MAG" },
    { value: "136 / 138 – Flux/Metal cored", text: "136 / 138 – Flux/Metal cored" },
    { value: "141 – TIG", text: "141 – TIG" },
];

export const materialGroupOptions = [
    { value: "2.1", text: "2.1" },
    { value: "8.1", text: "8.1" },
    { value: "10.1", text: "10.1" },
];

export const weldingPositionOptions = [
    "All, except PG and J-L045",
    "PA",
    "PB",
    "PC",
    "PF",
    "PG",
    "PH",
    "PJ",
];

export const jointTypeOptions = [
    "BW",
    "FW",
];

export const layerOptions = [
    { value: "Multi layer", text: "Multi layer" },
    { value: "Single layer", text: "Single layer" },
];

export const sidesOptions = [
    { value: "bs", text: "bs – Welding from both sides" },
    { value: "ss", text: "ss – Single side welding" },
];

export const standardOptions = [
    "EN ISO 15614-1",
    "EN ISO 15609-1",
    "EN ISO 15612",
    "EN ISO 15613",
    "EN 10025-2",
];

export const refSpecOptions = [
    "Norsok M601",
    "EN-13480-4",
    "EN 13445-4",
    "TR ISO 15608",
];

// ── Initial state ──
const initialState = {
    name: "",
    wpqr: "",
    welding_process: null,
    material_group: null,
    welding_position: [],
    joint_type: [],
    thickness_min: "",
    thickness_max: "",
    diameter_min: "",
    diameter_max: "",
    layer: null,
    sides: null,
    standard: [],
    ref_spec: [],
    prepared_date: "",
    prepared_by: null,
    project_id: null,
};

const form = reactive({
    ...initialState,

    getData() {
        return {
            name: this.name,
            wpqr: this.wpqr,
            welding_process: this.welding_process,
            material_group: this.material_group,
            welding_position: this.welding_position,
            joint_type: this.joint_type,
            thickness_min: this.thickness_min,
            thickness_max: this.thickness_max,
            diameter_min: this.diameter_min,
            diameter_max: this.diameter_max,
            layer: this.layer,
            sides: this.sides,
            standard: this.standard,
            ref_spec: this.ref_spec,
            prepared_date: this.prepared_date,
            prepared_by: this.prepared_by,
            project_id: this.project_id,
        };
    },

    set(data) {
        Object.assign(this, { ...initialState, ...data });
    },

    reset() {
        Object.assign(this, { ...initialState, welding_position: [], joint_type: [], standard: [], ref_spec: [] });
    },
});

const dialog = reactive({
    show: {
        wps: {
            add: false,
            edit: false,
            delete: false,
            detail: false,
            addToProject: false,
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
        wps: {
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

const wpsList = ref([]);
const currentWps = ref(null);

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
    welding_process: "",
    material_group: "",
    project_id: "",
    get(pagination) {
        const data = {};
        if (this.search) data.search = this.search;
        if (this.welding_process) data.welding_process = this.welding_process;
        if (this.material_group) data.material_group = this.material_group;
        if (this.project_id) data.project_id = this.project_id;
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

export default function useWps() {
    const toast = toaster();

    const fetchWps = async (projectId = null) => {
        try {
            apiHelpers.loading = true;
            const params = filters.get(pagination);
            if (projectId) params.project_id = projectId;

            const response = await axios.get(route("wps.index"), { params });
            wpsList.value = response.data.data;

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

    const getWps = async (id) => {
        try {
            apiHelpers.loading = true;
            const response = await axios.get(route("wps.show", { id }));
            currentWps.value = response.data.data;
        } catch (error) {
            errorHandler(error);
        } finally {
            apiHelpers.loading = false;
        }
    };

    const storeWps = async (attachment = null) => {
        try {
            apiHelpers.loading = true;

            const formData = new FormData();
            const data = form.getData();
            Object.keys(data).forEach((key) => {
                const val = data[key];
                if (val === null || val === undefined || val === "") return;
                if (Array.isArray(val)) {
                    val.forEach((item, i) => formData.append(`${key}[${i}]`, item));
                } else {
                    formData.append(key, val);
                }
            });

            if (attachment) {
                formData.append("attachment", attachment);
            }

            await axios.post(route("wps.store"), formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            dialog.closeDialog("wps", "add");
            form.reset();
            toast.success("WPS successfully created.");
            return true;
        } catch (error) {
            errorHandler(error);
            return false;
        } finally {
            apiHelpers.loading = false;
        }
    };

    const updateWps = async (attachment = null, removeMediaIds = []) => {
        try {
            apiHelpers.loading = true;

            const hasFile = !!attachment;
            const hasRemovals = removeMediaIds.length > 0;

            // Use FormData (POST with _method=PUT) when sending a file
            if (hasFile) {
                const formData = new FormData();
                formData.append("_method", "PUT");
                const data = form.getData();
                Object.keys(data).forEach((key) => {
                    const val = data[key];
                    if (val === null || val === undefined || val === "") return;
                    if (Array.isArray(val)) {
                        val.forEach((item, i) => formData.append(`${key}[${i}]`, item));
                    } else {
                        formData.append(key, val);
                    }
                });
                formData.append("attachment", attachment);
                if (hasRemovals) {
                    removeMediaIds.forEach((id, i) => formData.append(`remove_media[${i}]`, id));
                }

                await axios.post(
                    route("wps.update", dialog.temp.wps.id),
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
            } else {
                const payload = form.getData();
                if (hasRemovals) {
                    payload.remove_media = removeMediaIds;
                }
                await axios.put(
                    route("wps.update", dialog.temp.wps.id),
                    payload
                );
            }

            dialog.closeDialog("wps", "edit");
            form.reset();
            toast.success("WPS successfully updated.");
            return true;
        } catch (error) {
            errorHandler(error);
            return false;
        } finally {
            apiHelpers.loading = false;
        }
    };

    const deleteWps = async (id) => {
        try {
            apiHelpers.loading = true;
            await axios.delete(route("wps.destroy", id));
            toast.success("WPS successfully deleted.");
            return true;
        } catch (error) {
            errorHandler(error);
            return false;
        } finally {
            apiHelpers.loading = false;
        }
    };

    const addToProject = async (wpsId, projectId) => {
        try {
            apiHelpers.loading = true;
            await axios.post(route("wps.add-to-project", { wp: wpsId }), {
                project_id: projectId,
            });
            toast.success("WPS successfully added to project.");
            return true;
        } catch (error) {
            errorHandler(error);
            return false;
        } finally {
            apiHelpers.loading = false;
        }
    };

    return {
        wpsList,
        currentWps,
        form,
        dialog,
        apiHelpers,
        filters,
        pagination,
        fetchWps,
        getWps,
        storeWps,
        updateWps,
        deleteWps,
        addToProject,
    };
}
