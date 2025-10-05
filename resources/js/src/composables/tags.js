import axios from "@axios";
import { reactive,computed } from "@vue/composition-api";
import toaster from "./toaster";

const tagDialog = reactive({
    show: false,
    toggleDialog() {
        tagDialog.show = !tagDialog.show;
    },
});

// Apis

const tags = reactive({
    data: [],
    options: computed(() => {
        if (tags.data.length === 0) return [];

        return tags.data.map((item) => {
            return {
                label: item.name,
                value: item.id
            };
        });
    }),
    modal: "",
    edit: {
        id: null,
        model: "",
    },
    clear() {
        this.modal = "";
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

const addTags = async () => {
    try {
        if (tags.model === "")
            throw { name: "custom", message: "Please tag name" };
        apiHelpers.loading = true;
        await axios.post(route("tags.store", { name: tags.model }));
        tags.modal = ''
        getTags();
    } catch (error) {
        if (error.name === "custom") {
            return apiHelpers.toast.error(error.message);
        }
        errorHandler(error);
    } finally {
        apiHelpers.loading = false;
        tags.clear();
    }
};

const editTags = async () => {
    try {
        if (tags.edit.model === "")
            throw { name: "custom", message: "Please tags name" };
        apiHelpers.loading = true;
        await axios.put(
            route("tags.update", tags.edit.id) + "?name=" + tags.edit.model
        );
        getTags();
    } catch (error) {
        if (error.name === "custom") {
            return apiHelpers.toast.error(error.message);
        }
        errorHandler(error);
    } finally {
        apiHelpers.loading = false;
        tags.clear();
    }
};

const deleteTags = async (id) => {
    try {
        if (id === "") throw { name: "custom", message: "tag id missing" };
        apiHelpers.loading = true;
        await axios.delete(route("tags.destroy", id));
        getTags();
    } catch (error) {
        if (error.name === "custom") {
            return apiHelpers.toast.error(error.message);
        }
        errorHandler(error);
    } finally {
        apiHelpers.loading = false;
        tags.clear();
    }
};

const getTags = async () => {
    try {
        apiHelpers.loading = true;
        const response = await axios.get(route("tags.index"));
        tags.data = response.data;
    } catch (error) {
        errorHandler(error);
    } finally {
        apiHelpers.loading = false;
    }
};

export default function useTags() {
    return {
        tags,
        tagDialog,
        apiHelpers,
        addTags,
        editTags,
        deleteTags,
        getTags,
    };
}
