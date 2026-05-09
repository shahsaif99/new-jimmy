<template>
    <div>
        <b-card no-body class="p-2">
            <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap" style="gap: 12px">
                <b-card-title class="mb-0">Checklists</b-card-title>
                <b-button variant="primary" size="sm" @click="openAssign">
                    Assign checklist
                </b-button>
            </div>

            <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap" style="gap: 12px">
                <b-dropdown class="filter-pill" variant="light" no-caret>
                    <template #button-content>
                        <span class="text-muted mr-1">Template:</span>
                        <span>{{ templateLabel }}</span>
                        <i class="bi bi-chevron-down ml-1 small"></i>
                    </template>
                    <b-dropdown-item v-for="opt in templateOptions" :key="opt.value === null ? 'all' : opt.value" @click="filters.checklist_id = opt.value">
                        {{ opt.label }}
                    </b-dropdown-item>
                </b-dropdown>

                <div class="d-flex align-items-center flex-wrap" style="gap: 12px">
                    <b-dropdown class="filter-pill" variant="light" no-caret menu-class="p-0">
                        <template #button-content>
                            <span class="text-muted mr-1">Date Range:</span>
                            <span>{{ dateRangeLabel }}</span>
                            <i class="bi bi-chevron-down ml-1 small"></i>
                        </template>
                        <div class="p-2" style="min-width: 260px">
                            <flat-pickr
                                v-model="dateRange"
                                class="form-control"
                                :config="datePickerConfig"
                                placeholder="Date range"
                            />
                        </div>
                    </b-dropdown>

                    <b-dropdown class="filter-pill" variant="light" no-caret>
                        <template #button-content>
                            <span class="text-muted mr-1">Status:</span>
                            <span>{{ statusLabel }}</span>
                            <i class="bi bi-chevron-down ml-1 small"></i>
                        </template>
                        <b-dropdown-item v-for="opt in statusOptions" :key="opt.value === null ? 'all' : opt.value" @click="filters.status = opt.value">
                            {{ opt.label }}
                        </b-dropdown-item>
                    </b-dropdown>

                    <b-dropdown class="filter-pill" variant="light" no-caret>
                        <template #button-content>
                            <span class="text-muted mr-1">Employee:</span>
                            <span>{{ employeeLabel }}</span>
                            <i class="bi bi-chevron-down ml-1 small"></i>
                        </template>
                        <b-dropdown-item v-for="opt in employeeOptions" :key="opt.value === null ? 'all' : opt.value" @click="filters.employee_id = opt.value">
                            {{ opt.label }}
                        </b-dropdown-item>
                    </b-dropdown>

                    <b-button variant="warning" size="sm" @click="resetFilters">Reset</b-button>
                </div>
            </div>

            <b-overlay :show="loading" rounded="sm" variant="transparent">
                <b-table
                    :items="rows"
                    :fields="fields"
                    responsive
                    show-empty
                    empty-text="No submitted checklists for this project yet"
                    primary-key="id"
                    tbody-tr-class="cursor-pointer align-middle"
                    @row-clicked="onRowClicked"
                >
                    <template #cell(code)="data">
                        <span class="text-muted">{{ data.item.code }}</span>
                    </template>
                    <template #cell(template)="data">
                        <div class="d-flex align-items-center" style="gap: 10px">
                            <i
                                v-if="data.item.template"
                                :class="data.item.template.icon"
                                :style="{ background: data.item.template.color }"
                                class="title-icon"
                            ></i>
                            <span>{{ data.item.template ? data.item.template.name : data.item.title }}</span>
                        </div>
                    </template>
                    <template #cell(submitted_assigned)="data">
                        <span>{{ data.item.submitted_assigned_label || '—' }}</span>
                    </template>
                    <template #cell(status)="data">
                        <span class="status-dot" :style="{ background: statusColor(data.item.status) }"></span>
                        {{ data.item.status_label }}
                    </template>
                    <template #cell(progress)="data">
                        <div class="d-flex align-items-center" style="gap: 10px; min-width: 140px">
                            <div class="progress flex-grow-1" style="height: 6px; min-width: 60px">
                                <div class="progress-bar" :style="{ width: data.item.progress.percent + '%', background: '#1a90ff' }"></div>
                            </div>
                            <small class="text-nowrap">{{ data.item.progress.completed }} of {{ data.item.progress.total }}</small>
                        </div>
                    </template>
                    <template #cell(deviation_count)="data">
                        <b-badge v-if="data.item.deviation_count > 0" variant="danger" pill>{{ data.item.deviation_count }}</b-badge>
                        <span v-else class="text-muted">—</span>
                    </template>
                    <template #cell(actions)="data">
                        <b-dropdown variant="link" no-caret toggle-class="p-0" right @click.native.stop>
                            <template #button-content>
                                <i class="bi bi-three-dots-vertical text-body"></i>
                            </template>
                            <b-dropdown-item @click="onRowClicked(data.item)">
                                <feather-icon icon="EyeIcon" />
                                <span class="align-middle ml-50">View</span>
                            </b-dropdown-item>
                        </b-dropdown>
                    </template>
                </b-table>
            </b-overlay>

            <div class="mx-2 my-1 d-flex justify-content-between align-items-center flex-wrap" style="gap: 12px">
                <small class="text-muted">
                    Showing {{ meta.from || 0 }} to {{ meta.to || 0 }} of {{ meta.total || 0 }} entries
                </small>
                <b-pagination
                    v-model="page"
                    :total-rows="meta.total"
                    :per-page="meta.per_page"
                    first-number
                    last-number
                />
            </div>
        </b-card>

        <ChecklistAssignDialog
            v-if="dialog.show"
            :id="assignChecklistId"
            :showing="dialog.show"
            target="user-checklist"
            :project-locked="true"
            @closeDialog="onAssignClose"
        />

        <SubmittedChecklistDrawer
            :visible="drawerVisible"
            :user-checklist-id="drawerId"
            @close="closeDrawer"
            @perform="openPerformFromDrawer"
        />

        <Perform
            :visible="performVisible"
            :user-checklist-id="performId"
            @close="closePerform"
            @submitted="closePerform"
        />
    </div>
</template>

<script>
import { onMounted, ref, reactive, computed, watch } from "@vue/composition-api";
import { BCard, BCardTitle, BButton, BTable, BFormSelect, BPagination, BOverlay, BBadge, BDropdown, BDropdownItem } from "bootstrap-vue";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import axios from "@axios";
import route from "ziggy-js";
import toaster from "@/composables/toaster";
import useTasks from "@/composables/tasks";
import ChecklistAssignDialog from "@/views/checklist/dialogs/Assign.vue";
import Perform from "@/views/checklist/Perform.vue";
import SubmittedChecklistDrawer from "@/views/checklist/SubmittedChecklistDrawer.vue";

export default {
    components: {
        BCard, BCardTitle, BButton, BTable, BFormSelect, BPagination, BOverlay, BBadge, BDropdown, BDropdownItem,
        flatPickr, ChecklistAssignDialog, Perform, SubmittedChecklistDrawer,
    },
    props: {
        projectId: { type: [Number, String], required: true },
        projectName: { type: String, default: "" },
        projectNo: { type: [String, Number], default: "" },
    },
    setup(props) {
        const toast = toaster();
        const { assign, dialog } = useTasks();
        const rows = ref([]);
        const meta = ref({ total: 0, per_page: 15, from: 0, to: 0 });
        const loading = ref(false);
        const page = ref(1);
        const assignChecklistId = ref(null);

        const filters = reactive({
            checklist_id: null,
            status: null,
            employee_id: null,
        });

        const dateRange = ref(defaultDateRange());

        const datePickerConfig = { mode: "range", dateFormat: "Y-m-d" };

        const fields = [
            { key: "code", label: "ID", thStyle: { width: "90px" } },
            { key: "template", label: "Template name" },
            { key: "submitted_assigned", label: "Submitted/assigned" },
            { key: "status", label: "Status" },
            { key: "progress", label: "Progress" },
            { key: "deviation_count", label: "Deviation", thStyle: { width: "100px" } },
            { key: "actions", label: "Action", class: "text-right", thStyle: { width: "80px" } },
        ];

        const statusOptions = [
            { value: null, label: "All" },
            { value: "draft", label: "Draft" },
            { value: "assigned", label: "Assigned" },
            { value: "in_progress", label: "Started" },
            { value: "submitted", label: "Submitted" },
            { value: "overdue", label: "Overdue" },
        ];

        const templates = ref([]);
        const employees = ref([]);

        const templateOptions = computed(() => [
            { value: null, label: "All" },
            ...templates.value.map((t) => ({ value: t.id, label: t.name })),
        ]);
        const employeeOptions = computed(() => [
            { value: null, label: "All" },
            ...employees.value.map((e) => ({ value: e.id, label: e.name })),
        ]);

        const statusLabel = computed(() => statusOptions.find(o => o.value === filters.status)?.label || "All");
        const templateLabel = computed(() => templateOptions.value.find(o => o.value === filters.checklist_id)?.label || "All");
        const employeeLabel = computed(() => employeeOptions.value.find(o => o.value === filters.employee_id)?.label || "All");

        const dateRangeLabel = computed(() => {
            if (!dateRange.value) return "All time";
            if (dateRange.value === defaultDateRange()) return "Last 30 Days";
            const parts = dateRange.value.split(" to ");
            if (parts.length !== 2) return dateRange.value;
            return `${parts[0]} → ${parts[1]}`;
        });

        function defaultDateRange() {
            const today = new Date();
            const past = new Date();
            past.setDate(past.getDate() - 30);
            return `${formatYmd(past)} to ${formatYmd(today)}`;
        }

        function formatYmd(d) {
            const m = String(d.getMonth() + 1).padStart(2, "0");
            const day = String(d.getDate()).padStart(2, "0");
            return `${d.getFullYear()}-${m}-${day}`;
        }

        function statusColor(status) {
            return {
                draft: "#9aa0a6", assigned: "#9aa0a6", in_progress: "#f0c000",
                submitted: "#3cba54", overdue: "#ea5455",
            }[status] || "#9aa0a6";
        }

        async function fetchTemplates() {
            try {
                const res = await axios.get(route("checklist.index"));
                if (res.status === 200) templates.value = res.data.map((c) => ({ id: c.id, name: c.name }));
            } catch (e) { templates.value = []; }
        }

        async function fetchEmployees() {
            try {
                const res = await axios.get(route("users.index"));
                if (res.status === 200) {
                    const list = Array.isArray(res.data) ? res.data : res.data?.data || [];
                    employees.value = list.map((u) => ({
                        id: u.id,
                        name: u.name || `${u.first_name || ""} ${u.last_name || ""}`.trim(),
                    }));
                }
            } catch (e) { employees.value = []; }
        }

        async function fetchRows() {
            try {
                loading.value = true;
                const params = {
                    scope: "all",
                    page: page.value,
                    project_id: props.projectId,
                };
                if (filters.checklist_id) params.checklist_id = filters.checklist_id;
                if (filters.status) params.status = filters.status;
                if (filters.employee_id) params.employee_id = filters.employee_id;
                if (dateRange.value && dateRange.value.includes(" to ")) {
                    const [from, to] = dateRange.value.split(" to ");
                    params["date[0]"] = from;
                    params["date[1]"] = to;
                }
                const res = await axios.get(route("submitted-checklists.index"), { params });
                if (res.status === 200) {
                    rows.value = res.data.data || [];
                    meta.value = res.data.meta || meta.value;
                }
            } catch (e) {
                toast.error(e?.response?.data?.message || "Failed to load");
            } finally {
                loading.value = false;
            }
        }

        function resetFilters() {
            filters.checklist_id = null;
            filters.status = null;
            filters.employee_id = null;
            dateRange.value = defaultDateRange();
            page.value = 1;
            fetchRows();
        }

        const performId = ref(null);
        const performVisible = ref(false);
        const drawerId = ref(null);
        const drawerVisible = ref(false);

        function onRowClicked(item) {
            drawerId.value = item.id;
            drawerVisible.value = true;
        }
        function closeDrawer() {
            drawerVisible.value = false;
            drawerId.value = null;
            fetchRows();
        }
        function openPerformFromDrawer(id) {
            performId.value = id;
            performVisible.value = true;
        }
        function closePerform() {
            performVisible.value = false;
            performId.value = null;
            fetchRows();
        }

        function openAssign() {
            assign.value.reset();
            const id = Number(props.projectId);
            const display = props.projectNo
                ? `${props.projectNo} - ${props.projectName}`
                : props.projectName;
            assign.value.project.id = id;
            assign.value.project.data = { id, name: display };
            assign.value.project.temp = display;
            assignChecklistId.value = null;
            dialog.show = true;
        }

        function onAssignClose() {
            dialog.toggleDialog();
            fetchRows();
        }

        watch(() => [filters.checklist_id, filters.status, filters.employee_id, dateRange.value], () => {
            page.value = 1;
            fetchRows();
        });

        watch(page, fetchRows);

        onMounted(() => {
            fetchTemplates();
            fetchEmployees();
            fetchRows();
        });

        return {
            rows, meta, loading, page, filters, dateRange,
            datePickerConfig, fields, statusOptions, templateOptions, employeeOptions,
            statusColor, resetFilters, onRowClicked, openAssign, onAssignClose,
            dialog, assignChecklistId,
            statusLabel, templateLabel, employeeLabel, dateRangeLabel,
            performId, performVisible, closePerform,
            drawerId, drawerVisible, closeDrawer, openPerformFromDrawer,
        };
    },
};
</script>

<style scoped>
.title-icon {
    height: 32px;
    width: 32px;
    border-radius: 50%;
    color: white;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
}
.status-dot {
    display: inline-block;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    margin-right: 6px;
    vertical-align: middle;
}
</style>
<style lang="scss">
.b-card .filter-pill .btn,
.card .filter-pill .btn {
    background: #f5f5f7 !important;
    border: 1px solid #ececef !important;
    color: #444 !important;
    border-radius: 999px !important;
    padding: 0.4rem 0.95rem !important;
    font-size: 0.85rem !important;
    box-shadow: none !important;
    display: inline-flex;
    align-items: center;
}
.b-card .filter-pill .btn:hover,
.b-card .filter-pill .btn:focus,
.b-card .filter-pill .btn.dropdown-toggle,
.card .filter-pill .btn:hover,
.card .filter-pill .btn:focus,
.card .filter-pill .btn.dropdown-toggle {
    background: #ececef !important;
    color: #222 !important;
}
.filter-pill .btn .text-muted {
    color: #888 !important;
}
</style>
