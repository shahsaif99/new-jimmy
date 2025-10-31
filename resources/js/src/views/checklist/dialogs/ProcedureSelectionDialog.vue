<template>
    <b-modal cancel-variant="outline-secondary" centered :hide-footer="true" size="lg" class="modal-procedure-selection"
        :visible="show" :hide-header="true" @hide="onModalHide">
        <div style="position: relative">
            <div class="d-flex align-items-center justify-content-between mb-2">
                <h3>Select Procedure</h3>
                <i class="bi bi-x ml-2" style="font-size: xx-large; cursor: pointer" @click="closeDialog"></i>
            </div>

            <!-- Search Box -->
            <b-form-input v-model="searchQuery" class="mb-2" placeholder="Search procedures..." trim />

            <!-- Procedures Table -->
            <div class="procedure-container" style="height: 500px; overflow-y: auto">
                <div v-if="loading" class="d-flex justify-content-center align-items-center" style="height: 100%">
                    <div class="spinner-border text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>

                <div v-else-if="!filteredProcedures.length"
                    class="empty-message d-flex justify-content-center align-items-center" style="height: 100%">
                    <p style="font-size: 18px">
                        No procedures found
                    </p>
                </div>

                <b-table v-else :items="filteredProcedures" :fields="tableFields" responsive hover striped class="mb-0"
                    @row-clicked="selectProcedure">
                    <template #cell(select)="data">
                        <b-form-radio v-model="selectedProcedureId" :value="data.item.id" name="procedure-selection" />
                    </template>

                    <template #cell(document_name)="data">
                        {{ data.item.title || 'N/A' }}
                    </template>

                    <template #cell(rev_no)="data">
                        {{ data.item.revision_number || 'N/A' }}
                    </template>

                    <template #cell(approved_date)="data">
                        {{ data.item.revised_date ? formatDate(data.item.revised_date) : 'N/A' }}
                    </template>

                    <template #cell(approved_by)="data">
                        {{ data.item.approved_by || 'N/A' }}
                    </template>
                </b-table>
            </div>

            <!-- Footer Actions -->
            <div class="d-flex justify-content-end mt-3">
                <b-button variant="outline-secondary" class="mr-2" @click="closeDialog">
                    Cancel
                </b-button>
                <b-button variant="primary" :disabled="!selectedProcedureId" @click="confirmSelection">
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
import toaster from "@/composables/toaster";
import useDocuments from "@/composables/documents";

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
        const { getDocuments, documentsData } = useDocuments();
        const procedures = ref([]);
        const loading = ref(false);
        const searchQuery = ref("");
        const selectedProcedureId = ref(props.selectedId);

        const tableFields = [
            { key: "select", label: "" },
            { key: "document_name", label: "Document Name", sortable: true },
            { key: "rev_no", label: "Rev No", sortable: true },
            { key: "approved_date", label: "Approved Date", sortable: true },
            { key: "approved_by", label: "Approved By", sortable: true },
        ];

        const formatDate = (dateString) => {
            if (!dateString) return 'N/A';
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        };

        const filteredProcedures = computed(() => {
            const list = procedures.value ?? [];
            const q = searchQuery.value?.trim().toLowerCase();

            const filtered = q
                ? list.filter((p) => {
                    const title = p.title ?? '';
                    const revNo = p.revision_number ?? '';
                    const approvedBy = p.approved_by ?? '';
                    return (
                        title.toLowerCase().includes(q) ||
                        revNo.toString().toLowerCase().includes(q) ||
                        approvedBy.toLowerCase().includes(q)
                    );
                })
                : [...list];

            return filtered.sort((a, b) =>
                (a.document_number ?? '').localeCompare((b.document_number ?? ''), undefined, {
                    sensitivity: 'base',
                    numeric: true,
                })
            );
        });

        const fetchProcedures = async () => {
            try {
                loading.value = true;
                await getDocuments();

                // Flatten the nested structure to get all documents
                const allProcedures = [];
                if (documentsData.value && Array.isArray(documentsData.value)) {
                    documentsData.value.forEach((category) => {
                        if (category.documents && Array.isArray(category.documents)) {
                            category.documents.forEach((subcategory) => {
                                if (subcategory.documents && Array.isArray(subcategory.documents)) {
                                    allProcedures.push(...subcategory.documents);
                                }
                            });
                        }
                    });
                }
                console.log('fetched procedures ', allProcedures);
                procedures.value = allProcedures;
            } catch (error) {
                toast.error("Failed to load procedures");
                console.error(error);
            } finally {
                loading.value = false;
            }
        };

        const selectProcedure = (procedure) => {
            selectedProcedureId.value = procedure.id;
        };

        const confirmSelection = () => {
            const selected = procedures.value.find(
                (p) => p.id === selectedProcedureId.value
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
                    fetchProcedures();
                    selectedProcedureId.value = props.selectedId;
                }
            }
        );

        watch(
            () => props.selectedId,
            (newVal) => {
                selectedProcedureId.value = newVal;
            }
        );

        onMounted(() => {
            if (props.show) {
                fetchProcedures();
            }
        });

        return {
            procedures,
            loading,
            searchQuery,
            selectedProcedureId,
            tableFields,
            filteredProcedures,
            selectProcedure,
            confirmSelection,
            closeDialog,
            onModalHide,
            formatDate,
        };
    },
};
</script>

<style lang="scss" scoped>
.procedure-container {
    ::v-deep .table {
        tbody tr {
            cursor: pointer;
        }
    }
}
</style>
