<template>
    <div>
        <b-modal
            cancel-variant="outline-secondary"
            centered
            :hide-footer="true"
            size="lg"
            class="modal-is-add-document-active"
            id="is-add-document-active"
            :visible="manageCateDialog.show"
            :hide-header="true"
            @hide="onModalHide"
        >
            <div style="position: relative">
                <div class="d-flex align-items-center justify-content-between">
                    <h3>Manage Category</h3>

                    <i
                        class="bi bi-x ml-2"
                        style="font-size: xx-large"
                        @click="$emit('closeDialog')"
                    ></i>
                </div>
                <div class="d-flex align-items-center justify-content-between">
                    <b-form-input
                        v-model="categories.model"
                        class="mr-1 py-2"
                        placeholder="Add Category"
                        trim
                    />

                    <b-button
                        @click="addCategories"
                        variant="primary"
                        size="md"
                        class="d-flex align-items-center"
                        :disabled="apiHelpers.loading"
                    >
                        <feather-icon icon="PlusIcon" size="16" />
                        Add
                    </b-button>
                </div>

                <div
                    class="category-container mt-1"
                    style="height: 360px; overflow-y: auto"
                >
                    <div
                        v-if="!categories.data.length"
                        class="empty-message d-flex justify-content-center align-items-center"
                    >
                        <p style="font-size: 18px">
                            Currently you don't have any categories
                        </p>
                    </div>
                    <template v-else>
                        <div
                            v-for="(category, index) in categories.data"
                            :key="category.id"
                            class="category"
                        >
                            <span v-if="categories.edit.id !== category.id">{{
                                category.name
                            }}</span>
                            <div class="flex-grow-1" v-else>
                                <b-form-input
                                    v-model="categories.edit.model"
                                    class="mr-1 py-2 w-100"
                                    placeholder="Edit Category"
                                    trim
                                />
                            </div>
                            <div
                                class="action d-flex align-items-center"
                                v-if="categories.edit.id !== category.id"
                            >
                                <feather-icon
                                    class="cursor-pointer"
                                    icon="EditIcon"
                                    size="16"
                                    @click="categories.edit.id = category.id"
                                />
                                <feather-icon
                                    :class="{
                                        'pointer-event-none':
                                            apiHelpers.loading,
                                        'cursor-pointer': !apiHelpers.loading,
                                    }"
                                    icon="Trash2Icon"
                                    size="16"
                                    @click="
                                        confimationModal.openModal(category.id)
                                    "
                                />
                            </div>
                            <div class="d-flex align-items-center" v-else>
                                <b-button
                                    variant="primary"
                                    size="sm"
                                    class="mr-1 cursor-pointer"
                                    :disabled="apiHelpers.loading"
                                    @click="editCategories"
                                >
                                    <feather-icon icon="EditIcon" size="16" />
                                    Edit
                                </b-button>
                                <b-button
                                    class="cursor-pointer"
                                    variant="outline-primary"
                                    size="sm"
                                    :disabled="apiHelpers.loading"
                                    @click="categories.clear()"
                                >
                                    <feather-icon icon="XIcon" size="16" />
                                    Close
                                </b-button>
                            </div>
                        </div>
                    </template>
                    <div v-if="apiHelpers.loading" class="loading-overlay">
                        <div class="spinner-border text-primary" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        </b-modal>
        <b-modal
            id="modal-no-backdrop"
            hide-backdrop
            content-class="shadow"
            title="Confirmation"
            :visible="confimationModal.modal"
            ok-title="Confirm"
            @ok="confimationModal.confirm()"
            @hide="confimationModal.closeModal()"
        >
            <p class="my-2">
                Are you sure you want to proceed? Deleting this category will
                result in the removal of all tasks associated with it. Please
                confirm to continue.
            </p>
        </b-modal>
    </div>
</template>
<script>
import {
    BDropdown,
    BIcon,
    BDropdownItem,
    BCalendar,
    BButton,
    BCollapse,
    BFormInput,
} from "bootstrap-vue";

import useTasks from "@/composables/tasks";
import useCategories from "@/composables/categories";
import { onMounted, reactive } from "@vue/composition-api";

export default {
    components: {
        BDropdown,
        BDropdownItem,
        BIcon,
        BCalendar,
        BButton,
        BCollapse,
        BFormInput,
    },

    setup() {
        const {
            manageCateDialog,
            getCategories,
            categories,
            addCategories,
            deleteCategories,
            apiHelpers,
            editCategories,
        } = useCategories();

        const onModalHide = (event) => {
            event.preventDefault();
        };

        const confimationModal = reactive({
            modal: false,
            categoryId: null,
            openModal(id) {
                this.categoryId = id;
                this.modal = true;
            },
            closeModal() {
                this.modal = false;
            },
            confirm() {
                deleteCategories(this.categoryId);
                this.reset()
            },
            reset() {
                this.categoryId = null;
                this.modal = false;
            },
        });

        onMounted(async () => {
            await getCategories();
        });

        return {
            manageCateDialog,
            categories,
            addCategories,
            deleteCategories,
            apiHelpers,
            editCategories,
            confimationModal,
            onModalHide,
        };
    },
};
</script>
<style lang="scss" scoped>
.category {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    text-transform: capitalize;
    font-size: 16px;
    padding: 10px;
    margin: 5px 0px;
    border: 1px solid #ddd;
    border-radius: 6px;
    gap: 10px;
    .action {
        display: flex;
        align-items: center;
        gap: 10px;
    }
}

.loading-overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex; /* Center the spinner horizontally and vertically */
    justify-content: center;
    align-items: center;
}
</style>
