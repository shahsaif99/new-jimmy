<template>
    <div>
        <b-modal
            cancel-variant="outline-secondary"
            centered
            :hide-footer="true"
            size="lg"
            class="modal-manage-categories"
            id="manage-categories-modal"
            v-model="categoryDialog.show"
            :hide-header="true"
        >
            <div style="position: relative">
                <div class="d-flex align-items-center justify-content-between">
                    <h3>{{ $t('Manage Categories') }}</h3>

                    <i
                        class="bi bi-x ml-2 cursor-pointer"
                        style="font-size: xx-large"
                        @click="categoryDialog.show = false"
                    ></i>
                </div>
                <div class="d-flex align-items-center justify-content-between">
                    <b-form-input
                        v-model="categories.model"
                        class="mr-1 py-2"
                        :placeholder="$t('Add Category')"
                        trim
                    />

                    <b-button
                        @click="addCategory"
                        variant="primary"
                        size="md"
                        class="d-flex align-items-center"
                        :disabled="apiHelpers.loading"
                    >
                        <feather-icon icon="PlusIcon" size="16" />
                        {{ $t('Add') }}
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
                            {{ $t('Currently you don\'t have any categories') }}
                        </p>
                    </div>
                    <template v-else>
                        <div
                            v-for="(category, index) in categories.data"
                            :key="category.id"
                            class="category-item"
                        >
                            <span v-if="categories.edit.id !== category.id">{{
                                category.name
                            }}</span>
                            <div class="flex-grow-1" v-else>
                                <b-form-input
                                    v-model="categories.edit.model"
                                    class="mr-1 py-2 w-100"
                                    :placeholder="$t('Edit Category')"
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
                                    @click="categories.edit.id = category.id; categories.edit.model = category.name"
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
                                        confirmationModal.openModal(category.id)
                                    "
                                />
                            </div>
                            <div class="d-flex align-items-center" v-else>
                                <b-button
                                    variant="primary"
                                    size="sm"
                                    class="mr-1 cursor-pointer"
                                    :disabled="apiHelpers.loading"
                                    @click="editCategory"
                                >
                                    <feather-icon icon="EditIcon" size="16" />
                                    {{ $t('Edit') }}
                                </b-button>
                                <b-button
                                    class="cursor-pointer"
                                    variant="outline-primary"
                                    size="sm"
                                    :disabled="apiHelpers.loading"
                                    @click="categories.clear()"
                                >
                                    <feather-icon icon="XIcon" size="16" />
                                    {{ $t('Close') }}
                                </b-button>
                            </div>
                        </div>
                    </template>
                    <div v-if="apiHelpers.loading" class="loading-overlay">
                        <div class="spinner-border text-primary" role="status">
                            <span class="sr-only">{{ $t('Loading...') }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </b-modal>
        <b-modal
            id="modal-category-confirm"
            hide-backdrop
            content-class="shadow"
            :title="$t('Confirmation')"
            :visible="confirmationModal.modal"
            :ok-title="$t('Confirm')"
            @ok="confirmationModal.confirm()"
            @hide="confirmationModal.closeModal()"
        >
            <p class="my-2">
                {{ $t('Are you sure you want to delete this category?') }}
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

import useCompetenceCategories from "@/composables/competenceCategories";
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
            categories,
            categoryDialog,
            apiHelpers,
            addCategory,
            editCategory,
            deleteCategory,
            getCategories,
        } = useCompetenceCategories();

        const confirmationModal = reactive({
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
                deleteCategory(this.categoryId);
                this.reset();
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
            categories,
            categoryDialog,
            apiHelpers,
            addCategory,
            editCategory,
            deleteCategory,
            getCategories,
            confirmationModal,
        };
    },
};
</script>
<style lang="scss" scoped>
.category-item {
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

.empty-message {
    height: 100%;
}
</style>
