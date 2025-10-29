import axios from "@axios";
import { reactive, computed } from "@vue/composition-api";
import toaster from "./toaster";

const categoryDialog = reactive({
    show: false,
    toggleDialog() {
        categoryDialog.show = !categoryDialog.show;
    },
});

// Apis

const categories = reactive({
    data: [],
    options: computed(() => {
        if (categories.data.length === 0) return [];

        return categories.data.map((item) => {
            return {
                label: item.name,
                value: item.id
            };
        });
    }),
    model: "",
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

const addCategory = async () => {
    try {
        if (categories.model === "")
            throw { name: "custom", message: "Please enter category name" };
        apiHelpers.loading = true;
        await axios.post(route("competence-categories.store"), { name: categories.model });
        categories.model = '';
        apiHelpers.toast.success("Category added successfully");
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

const editCategory = async () => {
    try {
        if (categories.edit.model === "")
            throw { name: "custom", message: "Please enter category name" };
        apiHelpers.loading = true;
        await axios.put(
            route("competence-categories.update", categories.edit.id),
            { name: categories.edit.model }
        );
        apiHelpers.toast.success("Category updated successfully");
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

const deleteCategory = async (id) => {
    try {
        if (id === "") throw { name: "custom", message: "Category id missing" };
        apiHelpers.loading = true;
        await axios.delete(route("competence-categories.destroy", id));
        apiHelpers.toast.success("Category deleted successfully");
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

const getCategories = async () => {
    try {
        apiHelpers.loading = true;
        const response = await axios.get(route("competence-categories.index"));
        categories.data = response.data.data || response.data;
    } catch (error) {
        errorHandler(error);
    } finally {
        apiHelpers.loading = false;
    }
};

export default function useCompetenceCategories() {
    return {
        categories,
        categoryDialog,
        apiHelpers,
        addCategory,
        editCategory,
        deleteCategory,
        getCategories,
    };
}
