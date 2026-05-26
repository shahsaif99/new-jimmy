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
                            v-if="can('checklist-perform')"
                            variant="outline-primary"
                            size="sm"
                            @click="onEdit"
                        >
                            <i class="bi bi-pencil mr-1"></i>
                            {{ editButtonLabel }}
                        </b-button>
                        <b-button
                            v-if="data.status === 'submitted'"
                            variant="primary"
                            size="sm"
                            @click="downloadPdf"
                        >
                            <i class="bi bi-file-earmark-arrow-down mr-1"></i>
                            View Report
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
                        class="task-row"
                    >
                        <div class="d-flex justify-content-between align-items-start">
                            <div class="d-flex align-items-start" style="gap: 8px; min-width: 0; flex: 1">
                                <i
                                    class="task-icon"
                                    :class="iconClass(task.answer)"
                                    :style="{ color: iconColor(task.answer) }"
                                ></i>
                                <div style="min-width: 0; flex: 1">
                                    <div class="task-name">{{ task.name }}</div>
                                </div>
                            </div>
                            <div class="d-flex flex-column align-items-end" style="gap: 4px">
                                <span class="status-pill" :class="pillClass(task.answer)">
                                    {{ pillLabel(task.answer) }}
                                </span>
                                <small v-if="task.answer && task.answer.answered_at" class="text-muted answered-at">
                                    {{ task.answer.answered_at }}
                                </small>
                            </div>
                        </div>

                        <div
                            v-if="task.answer && task.answer.notes"
                            class="answer-comment"
                            :class="{ 'comment-fail': task.answer.value === 'FAIL' }"
                        >
                            {{ task.answer.notes }}
                        </div>

                        <div v-if="task.answer && task.answer.img" class="attachment-card">
                            <div class="attachment-header">
                                <i class="bi bi-record-circle"></i>
                                Attachments (1)
                            </div>
                            <div class="attachment-body">
                                <div class="attachment-thumb">
                                    <img :src="resolveAsset(task.answer.img)" alt="Attached photo" />
                                </div>
                                <div class="attachment-actions">
                                    <a
                                        class="attachment-btn"
                                        :href="resolveAsset(task.answer.img)"
                                        :download="imageDownloadName(task)"
                                        target="_blank"
                                        @click.stop
                                    >
                                        <i class="bi bi-download"></i>
                                        Download
                                    </a>
                                    <a
                                        class="attachment-btn"
                                        :href="resolveAsset(task.answer.img)"
                                        target="_blank"
                                        @click.stop
                                    >
                                        <i class="bi bi-eye"></i>
                                        View full size
                                    </a>
                                </div>
                            </div>
                            <div class="attachment-pager">
                                <i class="bi bi-chevron-left text-muted"></i>
                                <span class="mx-1">1 of 1</span>
                                <i class="bi bi-chevron-right text-muted"></i>
                            </div>
                        </div>

                        <div
                            v-if="task.answer && task.answer.deviation"
                            class="deviation-card mt-1"
                            :class="deviationClosed(task.answer.deviation) ? 'deviation-closed' : 'deviation-open'"
                        >
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <span class="deviation-id">
                                    <i :class="deviationClosed(task.answer.deviation) ? 'bi bi-check-circle-fill' : 'bi bi-exclamation-triangle-fill'"></i>
                                    DEVIATION {{ task.answer.deviation.code }}
                                </span>
                                <span class="deviation-pill">
                                    {{ deviationClosed(task.answer.deviation) ? 'CLOSED' : 'OPEN' }}
                                </span>
                            </div>
                            <div class="deviation-row">
                                <span class="deviation-label">Status:</span>
                                <span>{{ deviationClosed(task.answer.deviation) ? 'Closed' : 'Open' }}</span>
                            </div>
                            <div class="deviation-row" v-if="task.answer.deviation.created_at">
                                <span class="deviation-label">Created:</span>
                                <span>{{ task.answer.deviation.created_at }}</span>
                            </div>
                            <div class="deviation-row" v-if="!deviationClosed(task.answer.deviation) && task.answer.deviation.closing_deadline">
                                <span class="deviation-label">Due date:</span>
                                <span>{{ task.answer.deviation.closing_deadline }}</span>
                            </div>
                            <div class="deviation-row" v-if="deviationClosed(task.answer.deviation) && task.answer.deviation.close_date">
                                <span class="deviation-label">Closed:</span>
                                <span>{{ task.answer.deviation.close_date }}</span>
                            </div>
                            <div class="deviation-row mt-1" v-if="task.answer.deviation.description">
                                <span class="deviation-label">Corrective actions:</span>
                            </div>
                            <div v-if="task.answer.deviation.description" class="deviation-body">
                                {{ task.answer.deviation.description }}
                            </div>
                            <div class="deviation-row mt-1" v-if="task.answer.deviation.corrective_actions">
                                <span class="deviation-label">Corrective Action:</span>
                            </div>
                            <div v-if="task.answer.deviation.corrective_actions" class="deviation-body">
                                {{ task.answer.deviation.corrective_actions }}
                            </div>
                            <div class="deviation-row mt-1" v-if="deviationClosed(task.answer.deviation) && task.answer.deviation.closed_by">
                                <span class="deviation-label">Closed by:</span>
                                <span>{{ task.answer.deviation.closed_by }}</span>
                            </div>
                            <div class="deviation-row" v-else-if="task.answer.deviation.responsible_person">
                                <span class="deviation-label">Assigned to:</span>
                                <span>{{ task.answer.deviation.responsible_person }}</span>
                            </div>
                            <a
                                class="d-inline-block mt-1 deviation-link-action"
                                href="#"
                                @click.prevent="openDeviation(task.answer.deviation)"
                            >
                                <i class="bi bi-box-arrow-up-right"></i>
                                Open deviation
                            </a>
                        </div>
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
import useAbilities from "@/composables/abilities";

export default {
    components: { BSidebar, BButton },
    props: {
        visible: { type: Boolean, default: false },
        userChecklistId: { type: [Number, String], default: null },
    },
    setup(props, { emit, root }) {
        const toast = toaster();
        const { can } = useAbilities();
        const data = ref(null);
        const loading = ref(false);

        const sections = computed(() => (data.value && data.value.template_full && data.value.template_full.sections) || []);
        const description = computed(() => (data.value && data.value.description) || "");
        const editButtonLabel = computed(() => (data.value && data.value.status === "submitted" ? "Edit" : "Continue"));

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

        function deviationClosed(deviation) {
            if (!deviation) return false;
            const status = (deviation.status || "").toString().toLowerCase();
            return status === "closed" || !!deviation.close_date;
        }

        function imageDownloadName(task) {
            const raw = task?.answer?.img || "";
            const baseName = raw.split("/").pop() || "attachment";
            const safeTask = (task?.name || "image").replace(/[^a-z0-9-_]+/gi, "_").slice(0, 40);
            const ext = (baseName.match(/\.[a-z0-9]+$/i) || [".png"])[0];
            return `${safeTask || "image"}_${baseName.replace(ext, "")}${ext}`;
        }

        function resolveAsset(path) {
            if (!path) return "";
            if (/^https?:/.test(path) || path.startsWith("data:")) return path;
            return `/${path.replace(/^\/+/, "")}`;
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
                toast.error("Failed to download report");
            }
        }

        function onHidden() {
            emit("close");
        }

        function onEdit() {
            if (!data.value || !data.value.id) return;
            emit("perform", data.value.id);
        }

        function openDeviation(deviation) {
            if (!deviation || !deviation.id) return;
            root.$router
                .push({ name: "avvik-listings", query: { detail: deviation.id } })
                .catch(() => {});
        }

        watch(() => props.visible, (v) => {
            if (v) fetchData();
            else data.value = null;
        });

        return {
            data, loading, sections, description, editButtonLabel, can,
            statusColor, iconClass, iconColor, pillLabel, pillClass, resolveAsset,
            deviationClosed, imageDownloadName,
            downloadPdf, onHidden, onEdit, openDeviation,
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
.deviation-card {
    padding: 8px 10px;
    border-radius: 6px;
    font-size: 0.8rem;
    margin-top: 6px;
}
.deviation-card.deviation-open {
    background: #fff7e1;
    border: 1px solid #f6c343;
    color: #856404;
}
.deviation-card.deviation-closed {
    background: #e8f6ec;
    border: 1px solid #6dbf85;
    color: #155724;
}
.deviation-id {
    font-weight: 600;
    font-size: 0.78rem;
    letter-spacing: 0.02em;
}
.deviation-pill {
    font-size: 0.65rem;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.08);
    letter-spacing: 0.04em;
}
.deviation-open .deviation-pill {
    background: #f6c343;
    color: #5a3a06;
}
.deviation-closed .deviation-pill {
    background: #6dbf85;
    color: #0c3915;
}
.deviation-row {
    display: flex;
    gap: 6px;
    line-height: 1.5;
}
.deviation-label {
    font-weight: 600;
    min-width: 110px;
}
.deviation-body {
    padding-left: 0;
    line-height: 1.4;
}
.deviation-link-action {
    font-weight: 600;
    font-size: 0.78rem;
    text-decoration: underline;
}
.deviation-open .deviation-link-action {
    color: #b27a00;
}
.deviation-closed .deviation-link-action {
    color: #155724;
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
.answered-at {
    font-size: 0.7rem;
    white-space: nowrap;
}
.answer-comment {
    font-size: 0.8rem;
    margin-top: 6px;
    padding: 4px 8px;
    background: #f8f9fa;
    border-left: 2px solid #ccc;
    border-radius: 2px;
}
.answer-comment.comment-fail {
    color: #c0392b;
    border-left-color: #c0392b;
    background: #fdecea;
}
.attachment-card {
    margin-top: 8px;
    padding: 10px 12px;
    border: 1px solid #ececef;
    border-radius: 8px;
    background: #fafafb;
}
.attachment-header {
    font-size: 0.85rem;
    font-weight: 600;
    color: #444;
    margin-bottom: 8px;
}
.attachment-header i {
    color: #7367f0;
    margin-right: 4px;
}
.attachment-body {
    display: flex;
    align-items: center;
    gap: 16px;
}
.attachment-thumb {
    flex: 0 0 auto;
    width: 110px;
    height: 110px;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #eee;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
}
.attachment-thumb img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
}
.attachment-actions {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.attachment-btn {
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    padding: 8px 18px;
    border: 1px solid #d8d6f1;
    border-radius: 8px;
    background: #fff;
    color: #7367f0;
    font-size: 0.85rem;
    font-weight: 600;
    text-decoration: none;
    min-width: 170px;
}
.attachment-btn:hover {
    background: #f0eefc;
    color: #5e50ee;
    border-color: #7367f0;
    text-decoration: none;
}
.attachment-btn i {
    font-size: 1rem;
}
.attachment-pager {
    margin-top: 8px;
    text-align: right;
    font-size: 0.8rem;
    color: #888;
}
.attachment-pager i {
    font-size: 0.9rem;
}
</style>
