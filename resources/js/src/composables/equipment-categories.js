import axios from "@axios";
import { computed, reactive } from "@vue/composition-api";
import toaster from "./toaster";

// Apis
const equipmentCategories = reactive({
    data: [],
    allData: [],
    totalRecords: 0,
    currentPage: 1,
    lastPage: 1,
    perPage: 10,
    perPageOption: [10, 25, 50, 100],
    dataMeta: {
        from: 0,
        to: 0,
        of: 0,
    },
    hasNextPage: computed(() => {
        return equipmentCategories.currentPage < equipmentCategories.lastPage;
    }),
    formatedData: computed(() => {
        return equipmentCategories.allData.map((item) => {
            return {
                label: item.name,
                value: item.id,
            };
        });
    }),
    filteredData: computed(() => {
        if (equipmentCategories.data.length === 0) return [];
        return equipmentCategories.data.filter((cate) =>
            cate.name
                .toLowerCase()
                .includes(equipmentCategories.searchCateModel.toLowerCase())
        );
    }),
    tableColumns: [
        {
            label: "ID",
            key: "id",
        },
        {
            label: "Name",
            key: "name",
        },
        {
            label: "Created at",
            key: "created_at",
        },
        {
            label: "Actions",
            key: "actions",
        },
    ],
    model: "",
    searchCateModel: "",
    previousSearch: "",
    edit: {
        id: null,
        model: "",
    },
    search(value) {
        equipmentCategories.searchCateModel = value;
        getEquipmentCategories();
    },
    clear() {
        this.model = "";
        this.edit = {
            id: null,
            model: "",
        };
    },
    reset() {
        this.data = [];
        this.allData = [];
        this.totalRecords = 0;
        this.currentPage = 1;
        this.lastPage = 1;
        this.perPage = 10;
        this.dataMeta = {
            from: 0,
            to: 0,
            of: 0,
        };
        this.model = "";
        this.searchCateModel = "";
        this.edit = {
            id: null,
            model: "",
        };
    },
});

const apiHelpers = reactive({
    loading: false,
    toast: toaster(),
    errors: {},
    respResult: null,
});

const errorHandler = (error) => {
    if (error.message === "Network Error") {
        return apiHelpers.toast.error(error.message);
    } else if (error.response && error.response.status === 422) {
        apiHelpers.errors.value = error.response.data.errors;
    }
    apiHelpers.toast.error(error.response.data.message);
};

const addEquipmentCategories = async () => {
    try {
        if (equipmentCategories.model === "")
            throw { name: "custom", message: "Please category name" };
        apiHelpers.loading = true;
        await axios.post(
            route("equipment-categories.store", {
                name: equipmentCategories.model,
            })
        );
        apiHelpers.toast.success("Category created successfully");
        getEquipmentCategories();
    } catch (error) {
        if (error.name === "custom") {
            return apiHelpers.toast.error(error.message);
        }
        errorHandler(error);
    } finally {
        apiHelpers.loading = false;
        equipmentCategories.clear();
    }
};

const editEquipmentCategories = async () => {
    try {
        if (equipmentCategories.edit.model === "")
            throw { name: "custom", message: "Please category name" };
        apiHelpers.loading = true;
        await axios.put(
            route("equipment-categories.update", equipmentCategories.edit.id) +
                "?name=" +
                equipmentCategories.edit.model
        );
        getEquipmentCategories();
    } catch (error) {
        if (error.name === "custom") {
            return apiHelpers.toast.error(error.message);
        }
        errorHandler(error);
    } finally {
        apiHelpers.loading = false;
        equipmentCategories.clear();
    }
};

const deleteEquipmentCategories = async (id) => {
    try {
        if (id === "") throw { name: "custom", message: "Category id missing" };
        apiHelpers.loading = true;
        await axios.delete(route("equipment-categories.destroy", id));
        apiHelpers.toast.success("Category deleted successfully");
        getEquipmentCategories();
    } catch (error) {
        if (error.name === "custom") {
            return apiHelpers.toast.error(error.message);
        }
        errorHandler(error);
    } finally {
        apiHelpers.loading = false;
        equipmentCategories.clear();
    }
};

const getEquipmentCategories = async () => {
    try {
        apiHelpers.loading = true;

        // Reset state if a search is performed
        if (equipmentCategories.searchCateModel !== equipmentCategories.previousSearch) {
            equipmentCategories.allData = [];
            equipmentCategories.currentPage = 1;
            equipmentCategories.previousSearch =
                equipmentCategories.searchCateModel;
        }

        // Fetch paginated data from the server
        const response = await axios.get(route("equipment-categories.index"), {
            params: {
                page: equipmentCategories.currentPage,
                per_page: equipmentCategories.perPage,
                search: equipmentCategories.searchCateModel,
            },
        });

        const newData = response.data.data;

        // If not searching, filter and append new data to avoid duplicates
        if (!equipmentCategories.searchCateModel) {
            const existingIds = new Set(
                equipmentCategories.allData.map((item) => item.id)
            );
            equipmentCategories.allData = [
                ...equipmentCategories.allData,
                ...newData.filter((item) => !existingIds.has(item.id)),
            ];
        } else {
            equipmentCategories.allData = newData; // Directly replace for searches
        }

        // Update other reactive properties
        equipmentCategories.data = newData;
        equipmentCategories.totalRecords = response.data.meta.total;
        equipmentCategories.lastPage = response.data.meta.last_page;
        equipmentCategories.currentPage = response.data.meta.current_page;
        equipmentCategories.perPage = response.data.meta.per_page;
        equipmentCategories.dataMeta = {
            from: response.data.meta.from,
            to: response.data.meta.to,
            of: response.data.meta.total,
        };
    } catch (error) {
        errorHandler(error);
    } finally {
        apiHelpers.loading = false;
    }
};

export default function useEquipmentCategories() {
    return {
        equipmentCategories,
        apiHelpers,
        getEquipmentCategories,
        addEquipmentCategories,
        deleteEquipmentCategories,
        editEquipmentCategories,
    };
}
