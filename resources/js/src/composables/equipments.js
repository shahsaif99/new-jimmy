import axios from "@axios";
import { computed, ref, watch, reactive } from "@vue/composition-api";
import route from "ziggy-js";
import toaster from "./toaster";
import { utils, writeFile } from "xlsx";
import { jsPDF } from "jspdf";
const equipments = ref([]);

export default function useEquipments() {
    const busy = ref(false);
    const respResult = ref(null);
    const equipment = ref(null);
    const errors = ref({});
    const toast = toaster();
    const perPage = ref(10);
    const totalRecords = ref(0);
    const currentPage = ref(1);
    const perPageOptions = [10, 25, 50, 100];
    const searchQuery = ref("");
    const sortBy = ref("id");
    const isSortDirDesc = ref(true);
    const refListTable = ref(null);
    const filters = reactive({
        showOpen: false,
        expandAll: false,
        selects: [
            {
                id: 1,
                key: "category",
                label: "Category",
                options: ["Category 1", "Category 2"],
                icons: [],
                model: "",
                isExpand: false,
                computedHeight: 0,
            },
            {
                id: 2,
                key: "storage",
                label: "Storage",
                options: ["Storage location 1", "Storage location 2"],
                icons: [],
                model: "",
                isExpand: false,
                computedHeight: 0,
            },
        ],
        accordion: [
            {
                id: 1,
                key: "status",
                label: "Status",
                options: ["valid", "expires", "expired"],
                icons: [],
                model: "",
                isExpand: false,
                computedHeight: 0,
            },
            {
                id: 2,
                key: "lending_status",
                label: "Lending Status",
                options: ["storage", "lending"],
                icons: [],
                model: "",
                isExpand: false,
                computedHeight: 0,
            },
            {
                id: 3,
                key: "level_of_training",
                label: "Level of Training",
                options: [
                    "instruction",
                    "instruction and practice",
                    "certified training",
                ],
                icons: [],
                model: "",
                isExpand: false,
                computedHeight: 0,
            },
        ],
        toggleExpand() {
            const shouldExpand = !this.expandAll;
            [...this.accordion, ...this.selects].forEach((item) => {
                item.isExpand = shouldExpand;
            });
            this.expandAll = shouldExpand;
        },
        get() {
            const data = {};

            [...this.accordion, ...this.selects].forEach(({ key, model }) => {
                // Exclude keys with "none", false, or empty string values
                if (model && model !== "none" && model !== false) {
                    data[key] = model;
                }
            });

            if (this.showOpen) {
                data.show_open = this.showOpen;
            }

            return data;
        },
    });

    const tableColumns = [
        { key: "id", sortable: false },
        { key: "name", sortable: true },
        { key: "supplier", sortable: false },
        { key: "category", sortable: false },
        { key: "serial_number", sortable: false },
        { key: "certificate_number", sortable: false },
        { key: "valid_until", sortable: false },
        { label: "storage", key: "status", sortable: false },
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

    const fetchEquipments = async () => {
        try {
            busy.value = true;
            const response = await axios.get(route("equipments.index"), {
                params: {
                    q: searchQuery.value,
                    perPage: perPage.value,
                    page: currentPage.value,
                    sortBy: sortBy.value,
                    sortDesc: isSortDirDesc.value,
                    ...filters.get(),
                },
            });
            equipments.value = response.data.data;
            if (response.data.meta) {
                const { total } = response.data.meta;
                totalRecords.value = total;
            }
        } catch (error) {
            console.log(error);
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

    const getEquipment = async (id) => {
        try {
            const response = await axios.get(route("equipments.show", { id }));
            equipment.value = response.data.data;
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
        }
    };

    const storeEquipment = async (data) => {
        errors.value = "";
        try {
            busy.value = true;
            const response = await axios.post(route("equipments.store"), data);
            respResult.value = response;
            toast.success(response.data.message);
            return response;
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

    const updateEquipment = async (data, id) => {
        errors.value = "";
        try {
            console.log(data);
            busy.value = true;
            const response = await axios.post(
                route("equipments.update", id),
                data
            );
            respResult.value = response;
            toast.success(response.data.message);
        } catch (error) {
            console.log(error);
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

    const deleteEquipment = async (id) => {
        try {
            busy.value = true;
            const response = await axios.delete(
                route("equipments.destroy", id)
            );
            toast.success(response.data.message);
            respResult.value = response;
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
    const resolveEquipmentstatus = (status) => {
        if (status === "Pending") {
            return "warning";
        }
        if (status === "Complete Information") {
            return "danger";
        }
        return "primary";
    };

    const fetchEquipmentsList = async (searchString = "") => {
        busy.value = true;
        try {
            const response = await axios.get(route("equipments.index"), {
                params: {
                    q: searchString,
                },
            });
            equipments.value = response.data.data;
        } catch (e) {
            toast.error(e.response.data.message);
        } finally {
            busy.value = false;
        }
    };

    const exportToExcel = () => {
        const processedData = equipments.value.map((item) => ({
            ID: item.id,
            Name: item.name,
            Supplier: item.supplier,
            Category: item.category ? item.category.name : '-',
            "Valid Until": item.valid_until,
            "Storage Location": item.storage_location ?  item.storage_location.name : '-',
            "Procedure Title": item.procedure ? item.procedure.title : '-',
            "Procedure Document Number":  item.procedure ? item.procedure.document_number : '-',
            "Procedure Approved Date": item.procedure ?  item.procedure.approved_date : '-',
            Status: item.status,
            "Created At": item.created_at,
            "Updated At": item.updated_at,
        }));

        const worksheet = utils.json_to_sheet(processedData);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, "Equipment Data");
        writeFile(workbook, "EquipmentData.xlsx");
    };

    const exportToPDF = () => {
        console.log('com')
        const processedData = equipments.value.map((item) => ({
            ID: item.id,
            Name: item.name,
            Supplier: item.supplier,
            Category: item.category ? item.category.name : '-',
            "Valid Until": item.valid_until,
            "Storage Location": item.storage_location ?  item.storage_location.name : '-',
            "Procedure Title": item.procedure ? item.procedure.title : '-',
            "Procedure Document Number":  item.procedure ? item.procedure.document_number : '-',
            "Procedure Approved Date": item.procedure ?  item.procedure.approved_date : '-',
            Status: item.status,
            "Created At": item.created_at,
            "Updated At": item.updated_at,
        }));

        const doc = new jsPDF();
        let startY = 10;

        processedData.forEach((item, index) => {
            Object.keys(item).forEach((key, i) => {
                doc.text(`${key}: ${item[key]}`, 10, startY + i * 10);
            });

            startY += Object.keys(item).length * 10 + 10;

            if (index < processedData.length - 1) {
                doc.addPage();
                startY = 10;
            }
        });

       
        doc.save("EquipmentData.pdf");
    };

    watch(
        [filters, currentPage, searchQuery, perPage],
        () => {
            fetchEquipments();
        },
        { deep: true }
    );

    return {
        busy,
        sortBy,
        errors,
        filters,
        perPage,
        equipment,
        dataMeta,
        equipments,
        storeEquipment,
        getEquipment,
        respResult,
        updateEquipment,
        fetchEquipments,
        currentPage,
        searchQuery,
        totalRecords,
        tableColumns,
        deleteEquipment,
        isSortDirDesc,
        perPageOptions,
        fetchEquipmentsList,
        resolveEquipmentstatus,
        exportToExcel,
        exportToPDF
    };
}
