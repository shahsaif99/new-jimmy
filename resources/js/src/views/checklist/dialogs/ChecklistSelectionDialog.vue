<template>
    <b-modal
        cancel-variant="outline-secondary"
        centered
        :hide-footer="true"
        size="lg"
        class="modal-checklist-selection"
        :visible="show"
        :hide-header="true"
        @hide="onModalHide"
    >
        <div style="position: relative">
            <div class="d-flex align-items-center justify-content-between mb-2">
                <h3>Select Checklist</h3>
                <i
                    class="bi bi-x ml-2"
                    style="font-size: xx-large; cursor: pointer"
                    @click="closeDialog"
                ></i>
            </div>

            <!-- Search Box -->
            <b-form-input
                v-model="searchQuery"
                class="mb-2"
                placeholder="Search checklist..."
                trim
            />

            <!-- Checklist List -->
            <div
                class="checklist-container"
                style="height: 400px; overflow-y: auto"
            >
                <div
                    v-if="loading"
                    class="d-flex justify-content-center align-items-center"
                    style="height: 100%"
                >
                    <div class="spinner-border text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>

                <div
                    v-else-if="!filteredChecklists.length"
                    class="empty-message d-flex justify-content-center align-items-center"
                    style="height: 100%"
                >
                    <p style="font-size: 18px">No checklists found</p>
                </div>

                <template v-else>
                    <div
                        v-for="checklist in filteredChecklists"
                        :key="checklist.id"
                        class="checklist-item"
                        :class="{ selected: selectedChecklistId === checklist.id }"
                        @click="selectChecklist(checklist)"
                    >
                        <b-form-radio
                            v-model="selectedChecklistId"
                            :value="checklist.id"
                            name="checklist-selection"
                        >
                            <div class="d-flex align-items-center">
                                <i
                                    :class="checklist.icon || 'bi bi-list-check'"
                                    :style="{ background: checklist.color || '#7367f0' }"
                                    class="checklist-icon mr-2"
                                ></i>
                                <span>{{ checklist.name }}</span>
                            </div>
                        </b-form-radio>
                    </div>
                </template>
            </div>

            <!-- Footer Actions -->
            <div class="d-flex justify-content-end mt-3">
                <b-button
                    variant="outline-secondary"
                    class="mr-2"
                    @click="closeDialog"
                >
                    Cancel
                </b-button>
                <b-button
                    variant="primary"
                    :disabled="!selectedChecklistId"
                    @click="confirmSelection"
                >
                    Select
                </b-button>
            </div>
        </div>
    </b-modal>
</template>

<script>
import {
    BModal,
    BButton,
    BFormInput,
    BFormRadio,
} from "bootstrap-vue";
import { ref, computed, watch, onMounted } from "@vue/composition-api";
import axios from "@axios";
import route from "ziggy-js";
import toaster from "@/composables/toaster";

export default {
    components: {
        BModal,
        BButton,
        BFormInput,
        BFormRadio,
    },
    props: {
        show: {
            type: Boolean,
            required: true,
        },
        selectedId: {
            type: Number,
            default: null,
        },
    },
    setup(props, { emit }) {
        const toast = toaster();
        const checklists = ref([]);
        const loading = ref(false);
        const searchQuery = ref("");
        const selectedChecklistId = ref(props.selectedId);

        const filteredChecklists = computed(() => {
            let filtered = checklists.value;

            if (searchQuery.value) {
                filtered = filtered.filter((checklist) =>
                    checklist.name
                        .toLowerCase()
                        .includes(searchQuery.value.toLowerCase())
                );
            }

            // Sort alphabetically by name (A-Z)
            return filtered.sort((a, b) =>
                a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
            );
        });

        const fetchChecklists = async () => {
            try {
                loading.value = true;
                const response = await axios.get(route("checklist.index"));
                checklists.value = response.data.data || response.data;
            } catch (error) {
                toast.error("Failed to load checklists");
                console.error(error);
            } finally {
                loading.value = false;
            }
        };

        const selectChecklist = (checklist) => {
            selectedChecklistId.value = checklist.id;
        };

        const confirmSelection = () => {
            const selected = checklists.value.find(
                (c) => c.id === selectedChecklistId.value
            );
            if (selected) {
                emit("select", selected);
            }
        };

        const closeDialog = () => {
            emit("close");
        };

        const onModalHide = () => {
            emit("close");
        };

        watch(
            () => props.show,
            (newVal) => {
                if (newVal) {
                    fetchChecklists();
                    selectedChecklistId.value = props.selectedId;
                }
            }
        );

        watch(
            () => props.selectedId,
            (newVal) => {
                selectedChecklistId.value = newVal;
            }
        );

        onMounted(() => {
            if (props.show) {
                fetchChecklists();
            }
        });

        return {
            checklists,
            loading,
            searchQuery,
            selectedChecklistId,
            filteredChecklists,
            selectChecklist,
            confirmSelection,
            closeDialog,
            onModalHide,
        };
    },
};
</script>

<style lang="scss" scoped>
.checklist-item {
    padding: 12px;
    margin: 8px 0;
    border: 1px solid #ddd;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background-color: #f8f8f8;
        border-color: #7367f0;
    }

    &.selected {
        background-color: #f0efff;
        border-color: #7367f0;
    }
}

.checklist-icon {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 18px;
}

.dark-layout {
    .checklist-item {
        border-color: #404656;

        &:hover {
            background-color: #283046;
            border-color: #7367f0;
        }

        &.selected {
            background-color: #2d3555;
            border-color: #7367f0;
        }
    }
}
</style>
