<template>
    <div>
        <b-modal
            cancel-variant="outline-secondary"
            centered
            :hide-footer="true"
            size="lg"
            class="modal-is-add-document-active"
            id="is-add-document-active"
            :visible="tagDialog.show"
            :hide-header="true"
            @hide="onModalHide"
        >
            <div style="position: relative">
                <div class="d-flex align-items-center justify-content-between">
                    <h3>Manage Tags</h3>

                    <i
                        class="bi bi-x ml-2"
                        style="font-size: xx-large"
                        @click="$emit('closeDialog')"
                    ></i>
                </div>
                <div class="d-flex align-items-center justify-content-between">
                    <b-form-input
                        v-model="tags.model"
                        class="mr-1 py-2"
                        placeholder="Add Tags"
                        trim
                    />

                    <b-button
                        @click="addTags"
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
                    class="tag-container mt-1"
                    style="height: 360px; overflow-y: auto"
                >
                    <div
                        v-if="!tags.data.length"
                        class="empty-message d-flex justify-content-center align-items-center"
                    >
                        <p style="font-size: 18px">
                            Currently you don't have any tags
                        </p>
                    </div>
                    <template v-else>
                        <div
                            v-for="(tag, index) in tags.data"
                            :key="tag.id"
                            class="tag"
                        >
                            <span v-if="tags.edit.id !== tag.id">{{
                                tag.name
                            }}</span>
                            <div class="flex-grow-1" v-else>
                                <b-form-input
                                    v-model="tags.edit.model"
                                    class="mr-1 py-2 w-100"
                                    placeholder="Edit Tag"
                                    trim
                                />
                            </div>
                            <div
                                class="action d-flex align-items-center"
                                v-if="tags.edit.id !== tag.id"
                            >
                                <feather-icon
                                    class="cursor-pointer"
                                    icon="EditIcon"
                                    size="16"
                                    @click="tags.edit.id = tag.id"
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
                                        confimationModal.openModal(tag.id)
                                    "
                                />
                            </div>
                            <div class="d-flex align-items-center" v-else>
                                <b-button
                                    variant="primary"
                                    size="sm"
                                    class="mr-1 cursor-pointer"
                                    :disabled="apiHelpers.loading"
                                    @click="editTags"
                                >
                                    <feather-icon icon="EditIcon" size="16" />
                                    Edit
                                </b-button>
                                <b-button
                                    class="cursor-pointer"
                                    variant="outline-primary"
                                    size="sm"
                                    :disabled="apiHelpers.loading"
                                    @click="tags.clear()"
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
                Are you sure you want to tag
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

import useTags from "@/composables/tags";
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
            tags,
            tagDialog,
            apiHelpers,
            addTags,
            editTags,
            deleteTags,
            getTags,
        } = useTags();

        const onModalHide = (event) => {
            event.preventDefault();
        };

        const confimationModal = reactive({
            modal: false,
            tagId: null,
            openModal(id) {
                this.tagId = id;
                this.modal = true;
            },
            closeModal() {
                this.modal = false;
            },
            confirm() {
                deleteTags(this.tagId);
                this.reset();
            },
            reset() {
                this.tagId = null;
                this.modal = false;
            },
        });

        onMounted(async () => {
            await getTags();
        });

        return {
            tags,
            tagDialog,
            apiHelpers,
            addTags,
            editTags,
            deleteTags,
            getTags,
            confimationModal,
            onModalHide,
        };
    },
};
</script>
<style lang="scss" scoped>
.tag {
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
