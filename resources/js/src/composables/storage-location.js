import axios from "@axios";
import { computed, reactive } from "@vue/composition-api";
import toaster from "./toaster";

const storageLocations = reactive({
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
        return storageLocations.currentPage < storageLocations.lastPage;
    }),
    formatedData: computed(() => {
        return storageLocations.allData.map((item) => {
            return {
                label: item.name,
                value: item.id,
            };
        });
    }),
    filteredData: computed(() => {
        if (storageLocations.data.length === 0) return [];
        return storageLocations.data.filter((location) =>
            location.name
                .toLowerCase()
                .includes(storageLocations.searchLocationModel.toLowerCase())
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
    searchLocationModel: "",
    search(value) {
        storageLocations.searchLocationModel = value;
        getStorageLocations();
    },
    edit: {
        id: null,
        model: "",
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
        this.searchLocationModel = "";
        this.clear();
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

const addStorageLocations = async () => {
    try {
        if (storageLocations.model === "")
            throw {
                name: "custom",
                message: "Please provide location name",
            };
        apiHelpers.loading = true;
        await axios.post(
            route("storage-locations.store", {
                name: storageLocations.model,
            })
        );
        apiHelpers.toast.success("Location created successfully");
        getStorageLocations();
    } catch (error) {
        if (error.name === "custom") {
            return apiHelpers.toast.error(error.message);
        }
        errorHandler(error);
    } finally {
        apiHelpers.loading = false;
        storageLocations.clear();
    }
};

const editStorageLocations = async () => {
    try {
        if (storageLocations.edit.model === "")
            throw {
                name: "custom",
                message: "Please provide location name",
            };
        apiHelpers.loading = true;
        await axios.put(
            route("storage-locations.update", storageLocations.edit.id) +
                "?name=" +
                storageLocations.edit.model
        );
        getStorageLocations();
    } catch (error) {
        if (error.name === "custom") {
            return apiHelpers.toast.error(error.message);
        }
        errorHandler(error);
    } finally {
        apiHelpers.loading = false;
        storageLocations.clear();
    }
};

const deleteStorageLocations = async (id) => {
    try {
        if (id === "") throw { name: "custom", message: "Location id missing" };
        apiHelpers.loading = true;
        await axios.delete(route("storage-locations.destroy", id));
        apiHelpers.toast.success("Location deleted successfully");
        getStorageLocations();
    } catch (error) {
        if (error.name === "custom") {
            return apiHelpers.toast.error(error.message);
        }
        errorHandler(error);
    } finally {
        apiHelpers.loading = false;
        storageLocations.clear();
    }
};

const getStorageLocations = async () => {
    apiHelpers.loading = true;

    try {
        // Reset state if a search is performed
        if (
            storageLocations.searchLocationModel !== storageLocations.previousSearch
        ) {
            storageLocations.allData = [];
            storageLocations.currentPage = 1;
            storageLocations.previousSearch = storageLocations.searchLocationModel;
        }

        // Fetch paginated data from the server
        const response = await axios.get(route("storage-locations.index"), {
            params: {
                page: storageLocations.currentPage,
                per_page: storageLocations.perPage,
                search: storageLocations.searchLocationModel,
            },
        });

        const newData = response.data.data;

        // Use a Set to track existing IDs for efficient deduplication
        const existingIds = new Set(
            storageLocations.allData.map((item) => item.id)
        );

        // Merge new data, avoiding duplicates
        storageLocations.allData = [
            ...storageLocations.allData,
            ...newData.filter((item) => !existingIds.has(item.id)),
        ];

        // Update other reactive properties
        storageLocations.data = newData; // Current page data
        storageLocations.totalRecords = response.data.meta.total;
        storageLocations.lastPage = response.data.meta.last_page;
        storageLocations.currentPage = response.data.meta.current_page;
        storageLocations.perPage = response.data.meta.per_page;
        storageLocations.dataMeta = {
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

// Apis

export default function useStorageLocations() {
    return {
        storageLocations,
        apiHelpers,
        getStorageLocations,
        addStorageLocations,
        deleteStorageLocations,
        editStorageLocations,
    };
}
