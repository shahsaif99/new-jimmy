<template>
    <b-sidebar
        :visible="visible"
        @hidden="onHidden"
        width="540px"
        no-header
        backdrop
        right
        shadow
    >
        <template #default>
            <div v-if="loading" class="p-3 text-center text-muted">Loading...</div>

            <div v-else-if="data" class="p-2">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <div class="d-flex align-items-center" style="gap: 10px; min-width: 0">
                        <i
                            v-if="data.template"
                            :class="data.template.icon || 'bi bi-list-check'"
                            :style="{ background: data.template.color || '#0096fd' }"
                            class="title-icon"
                        ></i>
                        <h4 class="mb-0 text-truncate">
                            {{ data.title || (data.template && data.template.name) }}
                        </h4>
                    </div>
                    <div class="d-flex align-items-center" style="gap: 6px">
                        <b-button
                            v-if="data.status === 'submitted'"
                            variant="primary"
                            size="sm"
                            @click="downloadPdf"
                        >
                            <i class="bi bi-file-earmark-arrow-down mr-1"></i>
                            View Report
                        </b-button>
                        <b-button
                            v-else
                            variant="outline-primary"
                            size="sm"
                            @click="openPerform"
                        >
                            <i class="bi bi-pencil mr-1"></i>
                            Continue
                        </b-button>
                        <a class="cursor-pointer ml-1" @click="onHidden">
                            <i class="bi bi-x-lg" style="font-size: 1.2rem"></i>
                        </a>
                    </div>
                </div>

                <div class="mb-1">
                    <span
                        class="status-dot"
                        :style="{ background: statusColor(data.status) }"
                    ></span>
                    <strong>{{ data.status_label }}</strong>
                    <span class="text-muted ml-2">
                        ({{ data.progress.completed }} of {{ data.progress.total }} items)
                    </span>
                </div>

                <p class="text-muted mb-2">{{ data.date }}</p>

                <div class="meta-block mb-2">
                    <div class="meta-row" v-if="data.submitted_assigned_label">
                        <span class="meta-label">Submitter:</span>
                        <span>{{ data.submitted_assigned_label }}</span>
                    </div>
                    <div class="meta-row" v-if="data.project">
                        <span class="meta-label">Project:</span>
                        <span>
                            {{ data.project.project_no ? data.project.project_no + ' - ' : '' }}{{ data.project.name }}
                        </span>
                    </div>
                    <div class="meta-row" v-if="data.equipment">
                        <span class="meta-label">Equipment:</span>
                        <span>{{ data.equipment.name }}</span>
                    </div>
                    <div class="meta-row" v-if="description">
                        <span class="meta-label">Description:</span>
                        <span>{{ description }}</span>
                    </div>
                </div>

                <hr />

                <div v-if="!sections.length" class="text-muted text-center py-2">
                    No tasks defined for this checklist.
                </div>

                <div v-for="section in sections" :key="section.id" class="mb-2">
                    <h6 class="section-name mb-1">{{ section.name }}</h6>
                    <div
                        v-for="task in section.tasks"
                        :key="task.id"
                        class="task-row d-flex justify-content-between align-items-start"
                    >
                        <div class="d-flex align-items-start" style="gap: 8px; min-width: 0">
                            <i
                                class="task-icon"
                                :class="iconClass(task.answer)"
                                :style="{ color: iconColor(task.answer) }"
                            ></i>
                            <div style="min-width: 0">
                                <div class="task-name">{{ task.name }}</div>
                                <small v-if="task.answer && task.answer.notes" class="text-muted d-block">
                                    {{ task.answer.notes }}
                                </small>
                                <small v-if="task.answer && task.answer.deviation" class="d-block deviation-link">
                                    <i class="bi bi-exclamation-triangle"></i>
                                    {{ task.answer.deviation.title }}
                                </small>
                            </div>
                        </div>
                        <span class="status-pill" :class="pillClass(task.answer)">
                            {{ pillLabel(task.answer) }}
                        </span>
                    </div>
                </div>
            </div>
        </template>
    </b-sidebar>
</template>

<script>
import { ref, computed, watch } from "@vue/composition-api";
import { BSidebar, BButton } from "bootstrap-vue";
import axios from "@axios";
import route from "ziggy-js";
import toaster from "@/composables/toaster";

export default {
    components: { BSidebar, BButton },
    props: {
        visible: { type: Boolean, default: false },
        userChecklistId: { type: [Number, String], default: null },
    },
    setup(props, { emit }) {
        const toast = toaster();
        const data = ref(null);
        const loading = ref(false);

        const sections = computed(() => (data.value && data.value.template_full && data.value.template_full.sections) || []);
        const description = computed(() => (data.value && data.value.description) || "");

        function statusColor(status) {
            return {
                draft: "#9aa0a6",
                assigned: "#9aa0a6",
                in_progress: "#f0c000",
                submitted: "#3cba54",
                overdue: "#ea5455",
            }[status] || "#9aa0a6";
        }

        function iconClass(answer) {
            if (!answer || !answer.value) return "bi bi-circle";
            if (answer.value === "PASS") return "bi bi-check-circle-fill";
            if (answer.value === "FAIL") return "bi bi-x-circle-fill";
            return "bi bi-dash-circle-fill";
        }

        function iconColor(answer) {
            if (!answer || !answer.value) return "#bbb";
            if (answer.value === "PASS") return "#28c76f";
            if (answer.value === "FAIL") return "#ea5455";
            return "#00cfe8";
        }

        function pillLabel(answer) {
            if (!answer || !answer.value) return "Unanswered";
            if (answer.value === "PASS") return "Completed";
            if (answer.value === "FAIL") return "Failed";
            return "N/A";
        }

        function pillClass(answer) {
            if (!answer || !answer.value) return "pill-empty";
            if (answer.value === "PASS") return "pill-pass";
            if (answer.value === "FAIL") return "pill-fail";
            return "pill-na";
        }

        async function fetchData() {
            if (!props.userChecklistId) return;
            try {
                loading.value = true;
                const res = await axios.get(route("submitted-checklists.show", props.userChecklistId));
                if (res.status === 200) data.value = res.data;
            } catch (e) {
                toast.error((e && e.response && e.response.data && e.response.data.message) || "Failed to load");
            } finally {
                loading.value = false;
            }
        }

        async function downloadPdf() {
            if (!data.value || !data.value.id) return;
            try {
                const res = await axios.get(
                    route("submitted-checklists.export-pdf", data.value.id),
                    { responseType: "blob" }
                );
                const blob = new Blob([res.data], { type: "application/pdf" });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = `${data.value.code}.pdf`;
                document.body.appendChild(link);
                link.click();
                link.remove();
                window.URL.revokeObjectURL(url);
            } catch (e) {
                toast.error("Report download lands on the pdf-rapport branch.");
            }
        }

        function openPerform() {
            emit("perform", data.value && data.value.id);
            emit("close");
        }

        function onHidden() {
            emit("close");
        }

        watch(() => props.visible, (v) => {
            if (v) fetchData();
            else data.value = null;
        });

        return {
            data, loading, sections, description,
            statusColor, iconClass, iconColor, pillLabel, pillClass,
            downloadPdf, openPerform, onHidden,
        };
    },
};
</script>

<style scoped>
.title-icon {
    height: 36px;
    width: 36px;
    border-radius: 50%;
    color: white;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
}
.status-dot {
    display: inline-block;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    margin-right: 6px;
    vertical-align: middle;
}
.meta-block {
    background: #fafafa;
    border: 1px solid #eee;
    border-radius: 6px;
    padding: 10px 12px;
}
.meta-row {
    display: flex;
    gap: 6px;
    font-size: 0.85rem;
    line-height: 1.6;
}
.meta-label {
    color: #888;
    min-width: 92px;
}
.section-name {
    font-weight: 600;
    color: #333;
}
.task-row {
    background: #fff;
    border: 1px solid #eee;
    border-radius: 6px;
    padding: 8px 10px;
    margin-bottom: 6px;
    gap: 8px;
}
.task-icon {
    font-size: 1.1rem;
    flex-shrink: 0;
}
.task-name {
    font-size: 0.9rem;
}
.deviation-link {
    color: #ff9f43;
}
.status-pill {
    font-size: 0.7rem;
    padding: 2px 8px;
    border-radius: 999px;
    white-space: nowrap;
    flex-shrink: 0;
}
.pill-pass { background: #d4edda; color: #155724; }
.pill-fail { background: #f8d7da; color: #721c24; }
.pill-na { background: #d1ecf1; color: #0c5460; }
.pill-empty { background: #f1f1f1; color: #888; }
</style>
