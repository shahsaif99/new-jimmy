<template>
    <b-modal cancel-variant="outline-secondary" centered :hide-footer="true" size="lg" class="modal-project-selection"
        :visible="show" :hide-header="true" @hide="onModalHide">
        <div style="position: relative">
            <div class="d-flex align-items-center justify-content-between mb-2">
                <h3>Select Project</h3>
                <i class="bi bi-x ml-2" style="font-size: xx-large; cursor: pointer" @click="closeDialog"></i>
            </div>

            <!-- Search Box -->
            <b-form-input v-model="searchQuery" class="mb-2" placeholder="Search projects..." trim />

            <!-- Projects Table -->
            <div class="project-container" style="height: 500px; overflow-y: auto">
                <div v-if="loading" class="d-flex justify-content-center align-items-center" style="height: 100%">
                    <div class="spinner-border text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>

                <div v-else-if="!filteredProjects.length"
                    class="empty-message d-flex justify-content-center align-items-center" style="height: 100%">
                    <p style="font-size: 18px">
                        No in-progress projects found
                    </p>
                </div>

                <b-table v-else :items="filteredProjects" :fields="tableFields" responsive hover striped class="mb-0"
                    @row-clicked="selectProject">
                    <template #cell(select)="data">
                        <b-form-radio v-model="selectedProjectId" :value="data.item.id" name="project-selection" />
                    </template>

                    <template #cell(project_no)="data">
                        {{ data.item.project_no || 'N/A' }}
                    </template>

                    <template #cell(customer)="data">
                        {{ data.item.customer_name ? data.item.customer_name : 'N/A' }}
                    </template>

                    <template #cell(name)="data">
                        {{ data.item.name }}
                    </template>

                    <template #cell(project_manager)="data">
                        {{ data.item.project_manager_name ? data.item.project_manager_name : 'N/A' }}
                    </template>
                </b-table>
            </div>

            <!-- Footer Actions -->
            <div class="d-flex justify-content-end mt-3">
                <b-button variant="outline-secondary" class="mr-2" @click="closeDialog">
                    Cancel
                </b-button>
                <b-button variant="primary" :disabled="!selectedProjectId" @click="confirmSelection">
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
    BTable,
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
        BTable,
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
        const projects = ref([]);
        const loading = ref(false);
        const searchQuery = ref("");
        const selectedProjectId = ref(props.selectedId);

        const tableFields = [
            { key: "select", label: "" },
            { key: "project_no", label: "PO", sortable: true },
            { key: "customer", label: "Customer", sortable: true },
            { key: "name", label: "Project Name", sortable: true },
            { key: "project_manager", label: "Project Manager", sortable: true },
        ];

        const filteredProjects = computed(() => {
            const list = projects.value ?? [];
            const q = searchQuery.value?.trim().toLowerCase();

            const filtered = q
                ? list.filter((p) => {
                    const name = p.name ?? '';
                    const projectNo = p.project_no ?? '';
                    const customer = p.customer?.name ?? '';
                    const manager = p.project_manager?.name ?? '';
                    return (
                        name.toLowerCase().includes(q) ||
                        projectNo.toLowerCase().includes(q) ||
                        customer.toLowerCase().includes(q) ||
                        manager.toLowerCase().includes(q)
                    );
                })
                : [...list]; // copy so we don't sort in place

            return filtered.sort((a, b) =>
                (a.name ?? '').localeCompare((b.name ?? ''), undefined, {
                    sensitivity: 'base', // case-insensitive
                    numeric: true,       // "Project 2" < "Project 10"
                })
            );
        });


        const fetchProjects = async () => {
            try {
                loading.value = true;
                const response = await axios.get(route("projects.index"), {
                    params: {
                        status: "in_progress",
                    },
                });
                projects.value = response.data.data || response.data;
                console.log('project dialog ', projects.value);
            } catch (error) {
                toast.error("Failed to load projects");
                console.error(error);
            } finally {
                loading.value = false;
            }
        };

        const selectProject = (project) => {
            selectedProjectId.value = project.id;
        };

        const confirmSelection = () => {
            const selected = projects.value.find(
                (p) => p.id === selectedProjectId.value
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
                    fetchProjects();
                    selectedProjectId.value = props.selectedId;
                }
            }
        );

        watch(
            () => props.selectedId,
            (newVal) => {
                selectedProjectId.value = newVal;
            }
        );

        onMounted(() => {
            if (props.show) {
                fetchProjects();
            }
        });

        return {
            projects,
            loading,
            searchQuery,
            selectedProjectId,
            tableFields,
            filteredProjects,
            selectProject,
            confirmSelection,
            closeDialog,
            onModalHide,
        };
    },
};
</script>

<style lang="scss" scoped>
.project-container {
    ::v-deep .table {
        tbody tr {
            cursor: pointer;
        }
    }
}
</style>
