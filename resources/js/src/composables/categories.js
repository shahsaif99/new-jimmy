import axios from "@axios";
import {computed, reactive } from "@vue/composition-api";
import toaster from "./toaster";

const categoryStyles = [
    { text: "text-white", bg: "bg-primary" },
    { text: "text-white", bg: "bg-success" },
    { text: "text-white", bg: "bg-info" },
    { text: "text-white", bg: "bg-warning" },
    { text: "text-white", bg: "bg-danger" },
    { text: "text-white", bg: "bg-dark" },
];

const manageCateDialog = reactive({
    show: false,
    toggleDialog() {
        manageCateDialog.show = !manageCateDialog.show;
    },
});

// Apis

const categories = reactive({
    data: [],
    filteredData: computed(() => {
        if (categories.data.length === 0) return [];
        return categories.data.filter((cate) =>
            cate.name
                .toLowerCase()
                .includes(categories.searchCateModel.toLowerCase())
        );
    }),
    model: "",
    searchCateModel: "",
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
    } else if (error.response.status === 422) {
        apiHelpers.errors.value = error.response.data.errors;
    }
    apiHelpers.toast.error(error.response.data.message);
};

const addCategories = async () => {
    try {
        if (categories.model === "")
            throw { name: "custom", message: "Please category name" };
        apiHelpers.loading = true;
        await axios.post(route("api-categories.store", { name: categories.model }));
        getCategories();
    } catch (error) {
        if (error.name === "custom") {
            return apiHelpers.toast.error(error.message);
        }
        errorHandler(error);
    } finally {
        apiHelpers.loading = false;
        categories.clear();
    }
};

const editCategories = async () => {
    try {
        if (categories.edit.model === "")
            throw { name: "custom", message: "Please category name" };
        apiHelpers.loading = true;
        await axios.put(
            route("api-categories.update", categories.edit.id) +
                "?name=" +
                categories.edit.model
        );
        getCategories();
    } catch (error) {
        if (error.name === "custom") {
            return apiHelpers.toast.error(error.message);
        }
        console.log(error);
        errorHandler(error);
    } finally {
        apiHelpers.loading = false;
        categories.clear();
    }
};

const deleteCategories = async (id) => {
    try {
        if (id === "") throw { name: "custom", message: "Category id missing" };
        apiHelpers.loading = true;
        await axios.delete(route("api-categories.destroy", id));
        getCategories();
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

const getCategories = async () => {
    try {
        apiHelpers.loading = true;
        const response = await axios.get(route("api-categories.index"));
        categories.data = response.data.data;
    } catch (error) {
        errorHandler(error);
    } finally {
        apiHelpers.loading = false;
    }
};

export default function useTasks() {
    return {
        categoryStyles,
        manageCateDialog,
        categories,
        apiHelpers,
        getCategories,
        addCategories,
        deleteCategories,
        editCategories,
    };
}
