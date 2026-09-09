import { computed, reactive, ref } from "@vue/composition-api";
import axios from "@axios";
import moment from "moment";
import route from "ziggy-js";
import toaster from "./toaster";

export const typeOptions = [
    { value: "customer", text: "Customer" },
    { value: "supplier", text: "Supplier" },
    { value: "both", text: "Customer & Supplier" },
];

export const typeFilterOptions = [
    { value: "", text: "All (Customers & Suppliers)" },
    { value: "customer", text: "Customers" },
    { value: "supplier", text: "Suppliers" },
];

// Suppliers only — a customer is always "Not applicable".
export const evaluationStatusOptions = [
    { value: "", text: "All Statuses" },
    { value: "approved", text: "Approved" },
    { value: "under_evaluation", text: "Under Evaluation" },
    { value: "not_acceptable", text: "Not Acceptable" },
    { value: "not_applicable", text: "Not applicable" },
];

export const activeStatusOptions = [
    { value: true, text: "Active" },
    { value: false, text: "Deactivated" },
];

export const evaluationIntervalOptions = [
    { value: 6, text: "Every 6 months" },
    { value: 12, text: "Every 12 months" },
    { value: 24, text: "Every 24 months" },
    { value: 36, text: "Every 36 months" },
];

export const managementSystems = [
    { value: "ISO 9001", text: "ISO 9001" },
    { value: "ISO 14001", text: "ISO 14001" },
    { value: "ISO 45001", text: "ISO 45001" },
    { value: "Miljofyrtan", text: "Miljøfyrtårn" },
    { value: "EMAS", text: "EMAS" },
];

export const supplierOfOptions = [
    { value: "comprehensive_service", text: "Comprehensive service" },
    { value: "hiring_of_personnel", text: "Hiring of personnel" },
    { value: "subcontractors", text: "Subcontractors" },
    { value: "delivery_of_non_critical_goods", text: "Delivery of non-critical goods" },
    { value: "delivery_of_critical_goods_components", text: "Delivery of critical goods/components" },
];

export const evaluationResultOptions = [
    { value: "meets_requirements", text: "Meets Requirements" },
    { value: "not_meet_requirements", text: "Does Not Meet Requirements" },
];

// Badge colours for the derived status, shared by the overview and the
// detail banner so a status never reads differently in two places.
export const statusVariant = (status) =>
    ({
        approved: "light-success",
        not_acceptable: "light-danger",
        under_evaluation: "light-warning",
        not_applicable: "light-secondary",
    }[status] || "light-secondary");

export const statusIcon = (status) =>
    ({
        approved: "CheckCircleIcon",
        not_acceptable: "XCircleIcon",
        under_evaluation: "ClockIcon",
        not_applicable: "MinusCircleIcon",
    }[status] || "MinusCircleIcon");

export const labelFor = (options, value) =>
    (options.find((o) => o.value === value) || {}).text || value || "";

const initialState = {
    type: "supplier",
    name: "",
    is_active: true,
    address: "",
    postal_code: "",
    place: "",
    contact_person: "",
    email: "",
    telephone_number: "",
    website: "",
    customer_manager_id: null,
    organization_number: "",
    should_be_evaluated: false,
    evaluation_interval_months: null,
    management_systems: [],
    supplier_of: null,
};

const form = reactive({
    ...initialState,

    getData() {
        const isSupplier = this.type === "supplier" || this.type === "both";

        return {
            type: this.type,
            name: this.name,
            is_active: this.is_active,
            address: this.address,
            postal_code: this.postal_code,
            place: this.place,
            contact_person: this.contact_person,
            email: this.email,
            telephone_number: this.telephone_number,
            website: this.website,
            customer_manager_id: this.customer_manager_id,
            organization_number: this.organization_number,
            // Evaluation settings are meaningless on a customer, and sending
            // them anyway would have the server clear them right back.
            should_be_evaluated: isSupplier ? this.should_be_evaluated : false,
            evaluation_interval_months:
                isSupplier && this.should_be_evaluated
                    ? this.evaluation_interval_months
                    : null,
            management_systems: this.management_systems || [],
            supplier_of: this.supplier_of ? [this.supplier_of] : [],
        };
    },

    getFormData(files = []) {
        const formData = new FormData();
        const data = this.getData();

        Object.keys(data).forEach((key) => {
            const value = data[key];
            if (value === null || value === undefined) return;

            if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    formData.append(`${key}[${index}]`, item);
                });
            } else if (typeof value === "boolean") {
                formData.append(key, value ? "1" : "0");
            } else {
                formData.append(key, value);
            }
        });

        files.forEach((file) => formData.append("documents[]", file));

        return formData;
    },

    set(data) {
        Object.keys(initialState).forEach((key) => {
            if (key in data && data[key] !== undefined) {
                this[key] = data[key];
            }
        });
        // Stored as an array, edited as a single choice.
        this.supplier_of = Array.isArray(data.supplier_of)
            ? data.supplier_of[0] || null
            : data.supplier_of || null;
        this.management_systems = data.management_systems || [];
    },

    reset() {
        Object.keys(initialState).forEach((key) => {
            this[key] = Array.isArray(initialState[key])
                ? [...initialState[key]]
                : initialState[key];
        });
    },
});

const evaluationInitialState = {
    id: null,
    supplier_id: null,
    evaluation_date: moment().format("YYYY-MM-DD"),
    performed_by: null,
    scores: {},
    status: null,
};

const evaluationForm = reactive({
    ...evaluationInitialState,

    getData() {
        return {
            supplier_id: this.supplier_id,
            evaluation_date: this.evaluation_date,
            performed_by: this.performed_by,
            scores: this.scores,
            status: this.status,
        };
    },

    set(data) {
        this.id = data.id;
        this.supplier_id = data.supplier_id;
        this.evaluation_date = data.evaluation_date;
        this.performed_by = data.performed_by;
        this.scores = { ...(data.evaluation_criteria || {}) };
        this.status = data.status;
    },

    reset() {
        this.id = null;
        this.supplier_id = null;
        this.evaluation_date = moment().format("YYYY-MM-DD");
        this.performed_by = null;
        this.scores = {};
        this.status = null;
    },
});

const filters = reactive({
    search: "",
    type: "",
    evaluation_status: "",
    is_active: "",
    system: "",
    supplier_of: "",
    sortBy: "name",
    sortDesc: false,

    get(pagination) {
        const data = {};

        if (this.search) data.search = this.search;
        if (this.type) data.type = this.type;
        if (this.evaluation_status) data.evaluation_status = this.evaluation_status;
        if (this.is_active !== "") data.is_active = this.is_active;
        if (this.system) data.system = this.system;
        if (this.supplier_of) data.supplier_of = this.supplier_of;

        data.sortBy = this.sortBy;
        data.sortDesc = this.sortDesc ? "true" : "false";

        if (pagination) {
            data.page = pagination.current_page || 1;
            data.perPage = pagination.per_page || 10;
        }

        return data;
    },

    activeCount() {
        return [this.type, this.evaluation_status, this.system, this.supplier_of]
            .filter(Boolean).length + (this.is_active === "" ? 0 : 1);
    },

    reset() {
        this.search = "";
        this.type = "";
        this.evaluation_status = "";
        this.is_active = "";
        this.system = "";
        this.supplier_of = "";
    },
});

const customerSuppliers = ref([]);
const current = ref(null);
const evaluations = ref([]);
const criteriaGroups = ref({});
const passMark = ref(60);

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
        customerSupplier: { add: false, edit: false },
        supplierEvaluation: { add: false, edit: false },
    },
    temp: {
        customerSupplier: { data: null, id: null },
        supplierEvaluation: { data: null, id: null },
    },
    toggleDialog(section, action) {
        if (dialog.show[section] && action in dialog.show[section]) {
            dialog.show[section][action] = !dialog.show[section][action];
        }
    },
    closeDialog(section, action) {
        if (dialog.show[section] && action in dialog.show[section]) {
            dialog.show[section][action] = false;
        }
    },
    reset() {
        Object.keys(dialog.show).forEach((section) => {
            Object.keys(dialog.show[section]).forEach((action) => {
                dialog.show[section][action] = false;
            });
            dialog.temp[section].data = null;
            dialog.temp[section].id = null;
        });
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

    apiHelpers.toast.error("An unexpected error occurred.");
};

export default function useCustomerSupplier() {
    const reset = () => {
        form.reset();
        evaluationForm.reset();
        pagination.reset();
        dialog.reset();
        apiHelpers.reset();
        filters.reset();
        customerSuppliers.value = [];
    };

    const fetchCustomerSuppliers = async () => {
        try {
            apiHelpers.loading = true;
            const response = await axios.get(route("customers-suppliers.index"), {
                params: filters.get(pagination),
            });

            customerSuppliers.value = response.data.customerSuppliers;
            pagination.current_page = response.data.pagination.current_page;
            pagination.total = response.data.pagination.total;
            pagination.per_page = response.data.pagination.per_page;
        } catch (error) {
            errorHandler(error);
        } finally {
            apiHelpers.loading = false;
        }
    };

    const fetchCustomerSupplier = async (id) => {
        try {
            apiHelpers.loading = true;
            const response = await axios.get(route("customers-suppliers.show", { id }));
            current.value = response.data.data;
            evaluations.value = current.value.evaluations || [];
            return current.value;
        } catch (error) {
            errorHandler(error);
            return null;
        } finally {
            apiHelpers.loading = false;
        }
    };

    const addCustomerSupplier = async (files = []) => {
        try {
            apiHelpers.saving = true;
            apiHelpers.errors = {};

            const hasFiles = files && files.length > 0;
            const response = await axios.post(
                route("customers-suppliers.store"),
                hasFiles ? form.getFormData(files) : form.getData(),
                hasFiles ? { headers: { "Content-Type": "multipart/form-data" } } : {}
            );

            apiHelpers.toast.success("Customer/Supplier successfully created.");
            return response.data.data;
        } catch (error) {
            errorHandler(error);
            throw error;
        } finally {
            apiHelpers.saving = false;
        }
    };

    const updateCustomerSupplier = async (id, files = []) => {
        try {
            apiHelpers.saving = true;
            apiHelpers.errors = {};

            const hasFiles = files && files.length > 0;
            let response;

            if (hasFiles) {
                const payload = form.getFormData(files);
                payload.append("_method", "PUT");
                response = await axios.post(
                    route("customers-suppliers.update", { id }),
                    payload,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
            } else {
                response = await axios.put(
                    route("customers-suppliers.update", { id }),
                    form.getData()
                );
            }

            apiHelpers.toast.success("Customer/Supplier successfully updated.");
            return response.data.data;
        } catch (error) {
            errorHandler(error);
            throw error;
        } finally {
            apiHelpers.saving = false;
        }
    };

    const deleteCustomerSupplier = async (id) => {
        try {
            apiHelpers.loading = true;
            await axios.delete(route("customers-suppliers.destroy", id));
            apiHelpers.toast.success("Customer/Supplier successfully deleted.");
            return true;
        } catch (error) {
            errorHandler(error);
            return false;
        } finally {
            apiHelpers.loading = false;
        }
    };

    const exportCustomerSuppliers = async () => {
        try {
            const params = filters.get(null);
            const response = await axios.get(route("customers-suppliers.export"), {
                params,
                responseType: "blob",
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute(
                "download",
                `customers-suppliers-${moment().format("YYYY-MM-DD")}.csv`
            );
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            errorHandler(error);
        }
    };

    const deleteDocument = async (id) => {
        try {
            await axios.delete(route("customer-supplier-documents.destroy", id));
            apiHelpers.toast.success("Document deleted successfully.");
            return true;
        } catch (error) {
            errorHandler(error);
            return false;
        }
    };

    // ---- supplier evaluations -------------------------------------------

    const fetchCriteria = async () => {
        if (Object.keys(criteriaGroups.value).length) return criteriaGroups.value;

        try {
            const response = await axios.get(route("supplier-evaluations.criteria"));
            criteriaGroups.value = response.data.data.groups;
            passMark.value = response.data.data.pass_mark;
            return criteriaGroups.value;
        } catch (error) {
            errorHandler(error);
            return {};
        }
    };

    const fetchEvaluations = async (supplierId) => {
        try {
            const response = await axios.get(route("supplier-evaluation.index"), {
                params: { supplier_id: supplierId },
            });
            evaluations.value = response.data.data;
            return evaluations.value;
        } catch (error) {
            errorHandler(error);
            return [];
        }
    };

    const saveEvaluation = async () => {
        try {
            apiHelpers.saving = true;
            apiHelpers.errors = {};

            const payload = evaluationForm.getData();
            const isEdit = !!evaluationForm.id;

            const response = isEdit
                ? await axios.put(
                      route("supplier-evaluation.update", { supplierEvaluation: evaluationForm.id }),
                      payload
                  )
                : await axios.post(route("supplier-evaluation.store"), payload);

            apiHelpers.toast.success(
                isEdit
                    ? "Supplier evaluation successfully updated."
                    : "Supplier evaluation successfully recorded."
            );
            return response.data.data;
        } catch (error) {
            errorHandler(error);
            throw error;
        } finally {
            apiHelpers.saving = false;
        }
    };

    const deleteEvaluation = async (id) => {
        try {
            await axios.delete(route("supplier-evaluation.destroy", { supplierEvaluation: id }));
            apiHelpers.toast.success("Supplier evaluation successfully deleted.");
            return true;
        } catch (error) {
            errorHandler(error);
            return false;
        }
    };

    /** Weighted total, mirroring the server so the form previews the real score. */
    const computeScore = (scores) => {
        let total = 0;
        Object.values(criteriaGroups.value).forEach((group) => {
            Object.entries(group.criteria || {}).forEach(([key, criterion]) => {
                const value = Number(scores[key]) || 0;
                total += (value * criterion.weight) / 100;
            });
        });
        return Math.round(total * 100) / 100;
    };

    return {
        // state
        customerSuppliers,
        current,
        evaluations,
        criteriaGroups,
        passMark,
        pagination,
        apiHelpers,
        filters,
        dialog,
        form,
        evaluationForm,

        // options
        typeOptions,
        typeFilterOptions,
        evaluationStatusOptions,
        activeStatusOptions,
        evaluationIntervalOptions,
        managementSystems,
        supplierOfOptions,
        evaluationResultOptions,
        statusVariant,
        statusIcon,
        labelFor,

        // actions
        reset,
        fetchCustomerSuppliers,
        fetchCustomerSupplier,
        addCustomerSupplier,
        updateCustomerSupplier,
        deleteCustomerSupplier,
        exportCustomerSuppliers,
        deleteDocument,
        fetchCriteria,
        fetchEvaluations,
        saveEvaluation,
        deleteEvaluation,
        computeScore,
    };
}
