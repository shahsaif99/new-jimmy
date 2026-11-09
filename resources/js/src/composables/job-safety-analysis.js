import { computed, reactive, ref } from "@vue/composition-api";
import axios from "@axios";
import moment from "moment";
import route from "ziggy-js";
import toaster from "./toaster";

export const statusOptions = [
    { value: "draft", text: "Draft" },
    { value: "active", text: "Active" },
    { value: "completed", text: "Completed" },
];

export const statusFilterOptions = [
    { value: "", text: "All Statuses" },
    ...statusOptions,
];

export const statusVariant = (status) =>
    ({
        draft: "light-secondary",
        active: "light-primary",
        completed: "light-success",
    }[status] || "light-secondary");

export const statusLabel = (status) =>
    (statusOptions.find((o) => o.value === status) || {}).text || "";

// The three signature states the spec calls for. "Signed on paper" is a real
// signature, not a lesser one — it just was not collected in the app.
export const signatureLabel = (status) =>
    ({
        signed_in_app: "Signed in app",
        signed_on_paper: "Paper signature",
        not_signed: "Not signed",
    }[status] || "Not signed");

export const signatureVariant = (status) =>
    ({
        signed_in_app: "success",
        signed_on_paper: "success",
        not_signed: "secondary",
    }[status] || "secondary");

export const formatDate = (date) => (date ? moment(date).format("DD.MM.YYYY") : "");
export const formatDateTime = (date) =>
    date ? moment(date).format("DD.MM.YYYY [at] HH:mm") : "";

const initialState = {
    title: "",
    project_id: null,
    jsa_date: moment().format("YYYY-MM-DD"),
    work_location: "",
    jsa_leader_id: null,
    status: "draft",
    description: "",
    hazards: [],
    participants: [],
};

const form = reactive({
    ...initialState,

    getData() {
        return {
            title: this.title,
            project_id: this.project_id,
            jsa_date: this.jsa_date,
            work_location: this.work_location,
            jsa_leader_id: this.jsa_leader_id,
            status: this.status,
            description: this.description,
            // Sent in display order; the server stores the index as sort_order
            // so the report numbers the rows the way the form showed them.
            hazards: this.hazards.map((h) => ({
                work_type: h.work_type,
                hazard: h.hazard,
                control: h.control,
            })),
            participants: this.participants.map((p) => ({
                user_id: p.user_id,
                name: p.name,
            })),
        };
    },

    set(data) {
        this.title = data.title || "";
        this.project_id = data.project_id || null;
        this.jsa_date = data.jsa_date || moment().format("YYYY-MM-DD");
        this.work_location = data.work_location || "";
        this.jsa_leader_id = data.jsa_leader_id || null;
        this.status = data.status || "draft";
        this.description = data.description || "";
        // _uid keys the editable table across drag reorders; the server rows
        // have ids, but a row added in the browser does not yet.
        this.hazards = (data.hazards || []).map((h, i) => ({
            ...h,
            _uid: h.id ? `s${h.id}` : `h${i}`,
        }));
        this.participants = (data.participants || []).map((p) => ({ ...p }));
    },

    reset() {
        this.title = "";
        this.project_id = null;
        this.jsa_date = moment().format("YYYY-MM-DD");
        this.work_location = "";
        this.jsa_leader_id = null;
        this.status = "draft";
        this.description = "";
        this.hazards = [];
        this.participants = [];
    },
});

const filters = reactive({
    // "my" for everyone, "all" for the admin-only tab.
    scope: "my",
    search: "",
    status: "",
    project_id: "",
    jsa_leader_id: "",
    date_from: "",
    date_to: "",
    sortBy: "jsa_date",
    sortDesc: true,

    get(pagination) {
        const data = { scope: this.scope };

        if (this.search) data.search = this.search;
        if (this.status) data.status = this.status;
        if (this.project_id) data.project_id = this.project_id;
        if (this.jsa_leader_id) data.jsa_leader_id = this.jsa_leader_id;
        if (this.date_from) data.date_from = this.date_from;
        if (this.date_to) data.date_to = this.date_to;

        data.sortBy = this.sortBy;
        data.sortDesc = this.sortDesc ? "true" : "false";

        if (pagination) {
            data.page = pagination.current_page || 1;
            data.perPage = pagination.per_page || 10;
        }

        return data;
    },

    activeCount() {
        return [this.status, this.project_id, this.jsa_leader_id, this.date_from, this.date_to]
            .filter(Boolean).length;
    },

    reset() {
        this.status = "";
        this.project_id = "";
        this.jsa_leader_id = "";
        this.date_from = "";
        this.date_to = "";
    },
});

const jsas = ref([]);
const current = ref(null);
const projectOptions = ref([]);
const userOptions = ref([]);
const awaitingMySignature = ref(0);

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

const apiHelpers = reactive({
    loading: false,
    saving: false,
    toast: toaster(),
    errors: {},
    reset() {
        this.loading = false;
        this.saving = false;
        this.errors = {};
    },
});

const dialog = reactive({
    show: {
        hazard: { add: false, edit: false },
        participant: { add: false },
        detail: false,
    },
    temp: {
        hazard: { data: null, index: null },
    },
    reset() {
        this.show.hazard.add = false;
        this.show.hazard.edit = false;
        this.show.participant.add = false;
        this.show.detail = false;
        this.temp.hazard.data = null;
        this.temp.hazard.index = null;
    },
});

const errorHandler = (error) => {
    if (error.message === "Network Error") {
        return apiHelpers.toast.error(error.message);
    }

    if (error.response) {
        if (error.response.status === 422) {
            apiHelpers.errors = error.response.data.errors || {};
            const first = Object.values(apiHelpers.errors)[0];
            if (first) return apiHelpers.toast.error(first[0]);
        }
        if (error.response.data && error.response.data.message) {
            return apiHelpers.toast.error(error.response.data.message);
        }
    }

    return apiHelpers.toast.error("An unexpected error occurred.");
};

const isNextPageAvailable = computed(() => {
    const totalPages = Math.ceil(pagination.total / pagination.per_page);
    return pagination.current_page < totalPages;
});

export default function useJobSafetyAnalysis() {
    const reset = () => {
        form.reset();
        pagination.reset();
        dialog.reset();
        apiHelpers.reset();
        filters.reset();
        jsas.value = [];
    };

    const fetchJsas = async () => {
        try {
            apiHelpers.loading = true;
            const response = await axios.get(route("job-safety-analyses.index"), {
                params: filters.get(pagination),
            });

            jsas.value = response.data.jsas;
            awaitingMySignature.value = response.data.awaiting_my_signature || 0;
            pagination.current_page = response.data.pagination.current_page;
            pagination.total = response.data.pagination.total;
            pagination.per_page = response.data.pagination.per_page;
        } catch (error) {
            errorHandler(error);
        } finally {
            apiHelpers.loading = false;
        }
    };

    const fetchJsa = async (id) => {
        try {
            apiHelpers.loading = true;
            const response = await axios.get(route("job-safety-analyses.show", { job_safety_analysis: id }));
            current.value = response.data.data;
            return current.value;
        } catch (error) {
            errorHandler(error);
            return null;
        } finally {
            apiHelpers.loading = false;
        }
    };

    const addJsa = async () => {
        try {
            apiHelpers.saving = true;
            apiHelpers.errors = {};
            const response = await axios.post(
                route("job-safety-analyses.store"),
                form.getData()
            );
            apiHelpers.toast.success("Job safety analysis successfully created.");
            return response.data.data;
        } catch (error) {
            errorHandler(error);
            throw error;
        } finally {
            apiHelpers.saving = false;
        }
    };

    const updateJsa = async (id) => {
        try {
            apiHelpers.saving = true;
            apiHelpers.errors = {};
            const response = await axios.put(
                route("job-safety-analyses.update", { job_safety_analysis: id }),
                form.getData()
            );
            apiHelpers.toast.success("Job safety analysis successfully updated.");
            return response.data.data;
        } catch (error) {
            errorHandler(error);
            throw error;
        } finally {
            apiHelpers.saving = false;
        }
    };

    const deleteJsa = async (id) => {
        try {
            await axios.delete(route("job-safety-analyses.destroy", { job_safety_analysis: id }));
            apiHelpers.toast.success("Job safety analysis deleted.");
            return true;
        } catch (error) {
            errorHandler(error);
            return false;
        }
    };

    const changeStatus = async (id, status) => {
        try {
            const response = await axios.put(
                route("job-safety-analyses.status", { job_safety_analysis: id }),
                { status }
            );
            current.value = response.data.data;
            apiHelpers.toast.success("Status updated.");
            return current.value;
        } catch (error) {
            errorHandler(error);
            return null;
        }
    };

    const signJsa = async (id) => {
        try {
            apiHelpers.saving = true;
            const response = await axios.post(
                route("job-safety-analyses.sign", { job_safety_analysis: id })
            );
            current.value = response.data.data;
            apiHelpers.toast.success("JSA signed.");
            return current.value;
        } catch (error) {
            errorHandler(error);
            return null;
        } finally {
            apiHelpers.saving = false;
        }
    };

    const recordSignature = async (id, participantId, signatureStatus) => {
        try {
            const response = await axios.put(
                route("job-safety-analyses.record-signature", {
                    job_safety_analysis: id,
                    participant: participantId,
                }),
                { signature_status: signatureStatus }
            );
            current.value = response.data.data;
            return current.value;
        } catch (error) {
            errorHandler(error);
            return null;
        }
    };

    // Chrome blocks downloads from scripted clicks, so the PDF is fetched as a
    // blob and handed to an anchor the user's own click created.
    const downloadPdf = async (jsa) => {
        try {
            const response = await axios.get(
                route("job-safety-analyses.export-pdf", { job_safety_analysis: jsa.id }),
                { responseType: "blob" }
            );

            const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `${jsa.jsa_no || "JSA"}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            errorHandler(error);
        }
    };

    const fetchProjectOptions = async () => {
        try {
            const response = await axios.get(route("projects.index"));
            projectOptions.value = (response.data.data || []).map((p) => ({
                value: p.id,
                text: [p.project_no, p.name].filter(Boolean).join(" - "),
            }));
        } catch (error) {
            errorHandler(error);
        }
    };

    const fetchUserOptions = async () => {
        try {
            const response = await axios.get(route("users.index"));
            userOptions.value = (response.data.data || []).map((u) => ({
                value: u.id,
                text: u.name,
            }));
        } catch (error) {
            errorHandler(error);
        }
    };

    return {
        jsas,
        current,
        form,
        filters,
        pagination,
        apiHelpers,
        dialog,
        projectOptions,
        userOptions,
        awaitingMySignature,
        isNextPageAvailable,

        reset,
        fetchJsas,
        fetchJsa,
        addJsa,
        updateJsa,
        deleteJsa,
        changeStatus,
        signJsa,
        recordSignature,
        downloadPdf,
        fetchProjectOptions,
        fetchUserOptions,

        statusOptions,
        statusFilterOptions,
        statusVariant,
        statusLabel,
        signatureLabel,
        signatureVariant,
        formatDate,
        formatDateTime,
    };
}
