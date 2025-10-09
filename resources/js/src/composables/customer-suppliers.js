import { computed, ref, reactive } from "@vue/composition-api";
import axios from "@axios";
import moment from "moment";
import toaster from "./toaster";
import router from "@/router";
import customerSupplierSechema from "../schemas/customerSupplierSechema";
import route from "ziggy-js";

const type = [
    { value: "customer", text: "Customer" },
    { value: "supplier", text: "Supplier" },
    { value: "both", text: "Customer/Supplier" },
];

const statusOptions = [
    { value: "approved", text: "Approved" },
    { value: "not_approved", text: "Not Approved" },
];

const customerManagers = [
    { value: null, text: "Select a manager" },
    { value: 1, text: "Manager 1" },
    { value: 2, text: "Manager 2" },
];

const managementSystems = [
    { value: "ISO 9001", text: "ISO 9001" },
    { value: "ISO 14001", text: "ISO 14001" },
    { value: "ISO 45001", text: "ISO 45001" },
    { value: "Miljofyrtan", text: "Miljöfyrtån" },
    { value: "EMAS", text: "EMAS" },
];

const supplierOptions = [
    { value: "comprehensive_service", text: "Comprehensive service" },
    { value: "hiring_of_personnel", text: "Hiring of personnel" },
    { value: "subcontractors", text: "Subcontractors" },
    {
        value: "delivery_of_non_critical_goods",
        text: "Delivery of non-critical goods",
    },
    {
        value: "delivery_of_critical_goods_components",
        text: "Delivery of critical goods/components",
    },
];

const evaluationOptions = [
    { value: "under_evaluation", text: "Under evaluation" },
    { value: "preferred", text: "Preferred" },
    { value: "acceptable", text: "Acceptable" },
    { value: "not_acceptable", text: "Not acceptable" },
];

const columns = ref([
    { label: "id", field: "id", visible: true },
    { label: "No.", field: "id", visible: true },
    { label: "name", field: "name", visible: true },
    { label: "supplier_of", field: "supplier_of", visible: true },
    { label: "latest_evaluation", field: "latest_evaluation", visible: true },
    { label: "total_evaluation", field: "total_evaluation", visible: true },
    { label: "Action", field: "action", visible: true },
]);

const columnsSupplierEval = ref([
    { label: "Date", field: "date", visible: true },
    { label: "PerformedBy", field: "performed_by_name", visible: true },
    { label: "Total score", field: "total_score", visible: true },
    { label: "Status", field: "status", visible: true },
    { label: "Action", field: "action", visible: true },
]);

const categories = {
    company: {
        financialStrength: {
            name: "Financial strength",
            weight: 10,
            description:
                "Evaluation of the supplier's financial capacity and stability, incl. capacity and resources to carry out the mission.",
        },
        sustainability: {
            name: "Sustainability and ethics",
            weight: 5,
            description:
                "Evaluation of the supplier's sustainability and ethical work, incl. environment, social responsibility.",
        },
        strategicPartner: {
            name: "Strategic partner",
            weight: 5,
            description:
                "Evaluation of the supplier as a strategic partner and the possibility of replacing them if necessary.",
        },
        certification: {
            name: "Certification and external review",
            weight: 10,
            description: "Evaluation of any external certifications, eg ISO.",
        },
        compliance: {
            name: "Compliance with delivery conditions",
            weight: 10,
            description:
                "Evaluation of the supplier's ability to fulfill the agreed delivery conditions",
        },
    },
    service: {
        deliveryTime: {
            name: "Delivery time",
            weight: 10,
            description:
                "Evaluation of the supplier's ability to deliver products or services according to the set time.",
        },
        customerService: {
            name: "Customer service",
            weight: 5,
            description:
                "Evaluation of the supplier's customer service and communication skills.",
        },
        complaintHandling: {
            name: "Complaint handling",
            weight: 5,
            description:
                "Evaluation of the supplier's ability to handle complaints.",
        },
    },
    products: {
        productRange: {
            name: "Product range",
            weight: 5,
            description:
                "Evaluation of the supplier's breadth and depth in their offering of products and services.",
        },
        environmental: {
            name: "Environmental & sustainability commitment",
            weight: 10,
            description:
                "Evaluation of the supplier's environmental work and commitment to sustainability issues, e.g. use of environmental labels",
        },
        priceOverTime: {
            name: "Price change over time",
            weight: 10,
            description:
                "Evaluation of the supplier's price development over time. ",
        },
        priceCompetitiveness: {
            name: "Price competitiveness",
            weight: 10,
            description:
                "Evaluation of the supplier's prices in relation to competitors' prices in the market",
        },
        complaintFrequency: {
            name: "Complaint frequency",
            weight: 5,
            description:
                "Evaluation of the number of advertised products in relation to the total number of delivered products from the supplier",
        },
    },
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
    sortBy:'updated_at',
    sortDesc: false,
    accordion: [
        {
            id: 1,
            key: "type",
            label: "Type",
            options: ["customer", "supplier", "both"],
            model: "",
            isExpand: false,
            computedHeight: 0,
        },
        {
            id: 2,
            key: "system",
            label: "Management system",
            options: [
                "ISO 9001",
                "ISO 14001",
                "ISO 45001",
                "Miljofyrtan",
                "EMAS",
            ],
            model: "",
            isExpand: false,
            computedHeight: 0,
        },
        {
            id: 3,
            key: "evaluation",
            label: "Evaluation",
            options: [
                "none",
                "under_evaluation",
                "acceptable",
                "not_acceptable",
                "preferred",
            ],
            model: "",
            isExpand: false,
            computedHeight: 0,
        },
        {
            id: 5,
            key: "supplier_of",
            label: "Supplier of",
            options: [
                "comprehensive_service",
                "hiring_of_personnel",
                "subcontractors",
                "delivery_of_non_critical_goods",
                "delivery_of_critical_goods_components",
            ],
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

        if (filters.showOpen) {
            data.show_open = filters.showOpen;
        }
        if (filters.search) {
            data.search = filters.search;
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
    reset() {
        filters.date = "";
        filters.search = "";
        filters.showOpen = false;
        filters.accordion.forEach((item) => {
            item.model = "";
        });
    },
});

const initialState = {
    type: "",
    name: "",
    address: "",
    postal_code: "",
    place: "",
    contact_person: "",
    email: "",
    telephone_number: "",
    website: "",
    customer_manager_id: null,
    organization_number: "",
    status: "",
    management_systems: [],
    supplier_of: "",
    total_evaluation: "",
    supplier_evaluation: [],
};

const form = reactive({
    ...initialState,

    getData() {
        return {
            type: this.type,
            name: this.name,
            address: this.address,
            postal_code: this.postal_code,
            place: this.place,
            contact_person: this.contact_person,
            email: this.email,
            telephone_number: this.telephone_number,
            website: this.website,
            customer_manager_id: this.customer_manager_id,
            organization_number: this.organization_number,
            status: this.status === "" ? null : this.status,
            management_systems:
                this.management_systems && this.management_systems.length > 0
                    ? this.management_systems
                    : null,
            supplier_of: this.supplier_of === "" ? null : [this.supplier_of],

            total_evaluation: this.total_evaluation,
            supplier_evaluation:
                this.supplier_evaluation.length > 0
                    ? this.supplier_evaluation.map((evaluation) => ({
                          ...evaluation,
                          evaluation_criteria: evaluation.evaluation_criteria
                              ? JSON.stringify(evaluation.evaluation_criteria) // Convert to JSON string
                              : null,
                      }))
                    : null,
        };
    },

    set(data) {
        Object.keys(data).forEach((key) => {
            if (key in this) {
                this[key] = data[key];
            }
        });
    },

    reset() {
        Object.keys(initialState).forEach((key) => {
            this[key] = Array.isArray(initialState[key])
                ? [...initialState[key]]
                : initialState[key];
        });
    },
});

const customerSuppliers = reactive({
    data: [],
    params: {
        perPage: 1,
        sortBy: "id",
        sortDesc: false,
        filter: computed(() => filters.get(pagination)),
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
    reset() {
        this.data = [];
        this.params.perPage = 1;
        this.params.sortBy = "id";
        this.params.sortDesc = false;
        this.params.q = "";
        this.params.totalRecords = 0;
    },
});

const availableData = computed(() => {
    const visibleColumns = columns.value.filter(({ visible }) => visible);

    const filteredRows = customerSuppliers.data.map((task) => {
        const filteredTask = {};
        visibleColumns.forEach((column) => {
            filteredTask[column.label] = task[column.field];
        });
        return filteredTask;
    });

    return { columns: visibleColumns, rows: filteredRows };
});

const apiHelpers = reactive({
    loading: false,
    toast: toaster(),
    errors: {},
    respResult: null,
    refresh: false,
    reset() {
        this.loading = false;
        this.errors = {};
        this.respResult = null;
        this.refresh = false;
    },
});

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

    pagination.current_page = query.page || 1;
    pagination.per_page = query.perPage || 1;
};

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

const dialog = reactive({
    show: {
        customerSupplier: {
            add: false,
            edit: false,
            delete: false,
        },
        supplierEvaluation: {
            add: false,
            edit: false,
            delete: false,
        },
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
    temp: {
        customerSupplier: {
            data: null,
            id: null,
        },
        supplierEvaluation: {
            data: null,
            id: null,
        },
    },
    reset() {
        dialog.show.customerSupplier.add = false;
        dialog.show.customerSupplier.edit = false;
        dialog.show.customerSupplier.delete = false;
        dialog.show.supplierEvaluation.add = false;
        dialog.show.supplierEvaluation.edit = false;
        dialog.show.supplierEvaluation.delete = false;
        this.temp.customerSupplier.data = null;
        this.temp.customerSupplier.id = null;
        this.temp.supplierEvaluation.data = null;
        this.temp.supplierEvaluation.id = null;
    },
});

const isNextPageAvailable = computed(() => {
    const totalPages = Math.ceil(pagination.total / pagination.per_page);
    return pagination.current_page < totalPages;
});

export default function useCustomerSupplier() {
    const reset = () => {
        form.reset();
        pagination.reset();
        dialog.reset();
        apiHelpers.reset();
        customerSuppliers.reset();
        filters.reset();
    };

    const fetchCustomerSuppliers = async (refresh = false) => {
        try {
            apiHelpers.loading = true;
            apiHelpers.refresh = refresh;

            const queryParams = filters.get(pagination);

            const response = await axios.get(
                route("customers-suppliers.index"),
                {
                    params: queryParams,
                }
            );

            customerSuppliers.data = response.data.customerSuppliers;
            pagination.current_page = response.data.pagination.current_page;
            pagination.total = response.data.pagination.total;
            pagination.per_page = response.data.pagination.per_page;

            // router.replace(
            //     {
            //         query: Object.assign({
            //             ...customerSuppliers.params.filter,
            //         }),
            //     },
            //     () => {}
            // );

            if (response.data.meta) {
                const { total } = response.data.meta;
                customerSuppliers.params.totalRecords = total;
            }
        } catch (error) {
            errorHandler(error);
        } finally {
            apiHelpers.loading = false;
        }
    };

    const addCustomerSupplier = async () => {
        try {
            apiHelpers.loading = true;

            await customerSupplierSechema.validate(form.getData(), {
                abortEarly: false,
            });

            await axios.post(
                route("customers-suppliers.store"),
                form.getData()
            );

            form.reset();

            toaster().success("Customer/Supplier successfully created.");

            dialog.toggleDialog("customerSupplier", "add");

            fetchCustomerSuppliers();
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

    const updateCustomerSupplier = async () => {
        try {
            apiHelpers.loading = true;

            await customerSupplierSechema.validate(form.getData(), {
                abortEarly: false,
            });

            await axios.put(
                route("customers-suppliers.update", {
                    id: dialog.temp.customerSupplier.id,
                }),
                form.getData()
            );

            fetchCustomerSuppliers();

            form.reset();

            dialog.toggleDialog("customerSupplier", "edit");

            toaster().success("Customer/Supplier successfully updated.");
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

    const deleteCustomerSupplier = async (id) => {
        try {
            apiHelpers.loading = true;

            await axios.delete(route("customers-suppliers.destroy", id));

            fetchCustomerSuppliers();

            toaster().success("Customer/Supplier successfully deleted.");
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

    return {
        columnsSupplierEval,
        isNextPageAvailable,
        customerSuppliers,
        evaluationOptions,
        managementSystems,
        customerManagers,
        supplierOptions,
        availableData,
        statusOptions,
        apiHelpers,
        categories,
        pagination,
        filters,
        columns,
        dialog,
        form,
        type,
        reset,
        fetchCustomerSuppliers,
        updateCustomerSupplier,
        deleteCustomerSupplier,
        addCustomerSupplier,
        setFilterFromQuery,
    };
}
