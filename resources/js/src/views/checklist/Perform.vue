<template>
    <b-modal
        :visible="visible"
        size="xl"
        scrollable
        hide-footer
        no-close-on-backdrop
        @hide="onHide"
        modal-class="perform-checklist-modal"
        :title="null"
    >
        <template #modal-header="{ close }">
            <div class="w-100 d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center" style="gap: 10px">
                    <i
                        v-if="data && data.template"
                        :class="data.template.icon || 'bi bi-list-check'"
                        :style="{ background: data.template.color || '#0096fd' }"
                        class="title-icon"
                    ></i>
                    <h4 class="mb-0">{{ data ? (data.title || data.template?.name) : 'Checklist' }}</h4>
                </div>
                <a class="cursor-pointer" @click="close">
                    <i class="bi bi-x-lg" style="font-size: 1.4rem"></i>
                </a>
            </div>
        </template>

        <div v-if="loading" class="text-center py-4">Loading...</div>

        <div v-else-if="data">
            <div class="d-flex flex-wrap align-items-center mb-2" style="gap: 16px">
                <span class="text-muted">
                    <i class="bi bi-paperclip"></i>
                    Attachments ({{ attachmentsCount }})
                </span>
                <span class="text-muted">
                    Performed/assigned: <strong>{{ data.submitted_assigned_label || '—' }}</strong>
                </span>
            </div>

            <div class="d-flex align-items-center mb-2 flex-wrap" style="gap: 12px">
                <div class="quick-icon" :title="data.project?.name || 'No project'">
                    <i class="bi bi-folder"></i>
                </div>
                <div class="quick-icon" :title="data.equipment?.name || 'No equipment'">
                    <i class="bi bi-geo-alt"></i>
                </div>
                <div class="quick-icon" :title="data.template?.name">
                    <i class="bi bi-tools"></i>
                </div>
                <div class="flex-grow-1 ml-1">
                    <label class="text-muted small mb-0">Description</label>
                    <b-form-input v-model="description" placeholder="Description text" disabled />
                </div>
            </div>

            <div class="d-flex flex-wrap mb-2" style="gap: 12px">
                <div class="stats-card flex-grow-1">
                    <div class="d-flex justify-content-between align-items-center">
                        <strong>{{ stats.completed }} of {{ stats.total }} items</strong>
                        <span class="text-primary"><strong>{{ stats.percent }}% Complete</strong></span>
                    </div>
                </div>
                <div class="stats-card flex-grow-1">
                    <div class="d-flex justify-content-between align-items-center">
                        <strong>Score</strong>
                        <strong>{{ stats.score }}%</strong>
                    </div>
                </div>
            </div>

            <div class="d-flex align-items-center mb-2 flex-wrap" style="gap: 8px">
                <small class="text-muted mr-1">Filter:</small>
                <button
                    v-for="opt in filterOptions"
                    :key="opt.value"
                    type="button"
                    class="btn btn-sm rounded-pill px-3"
                    :class="filter === opt.value ? 'btn-primary' : 'btn-outline-secondary'"
                    @click="filter = opt.value"
                >
                    {{ opt.label }}
                </button>
            </div>

            <div v-for="section in sections" :key="section.id" class="mb-3">
                <h5 class="section-name mb-1">{{ section.name }}</h5>

                <div
                    v-for="task in visibleTasks(section)"
                    :key="task.id"
                    class="task-card mb-2"
                >
                    <div class="task-header">{{ task.name }}</div>

                    <div class="answer-buttons">
                        <button
                            type="button"
                            class="ans-btn pass"
                            :class="{ active: task.answer?.value === 'PASS' }"
                            :disabled="readonly"
                            @click="setAnswer(task, 'PASS')"
                        >
                            Pass
                        </button>
                        <button
                            type="button"
                            class="ans-btn fail"
                            :class="{ active: task.answer?.value === 'FAIL' }"
                            :disabled="readonly"
                            @click="setAnswer(task, 'FAIL')"
                        >
                            Fail
                        </button>
                        <button
                            type="button"
                            class="ans-btn na"
                            :class="{ active: task.answer?.value === 'NA' }"
                            :disabled="readonly"
                            @click="setAnswer(task, 'NA')"
                        >
                            N/A
                        </button>
                    </div>

                    <div v-if="task.answer?.value === 'FAIL' && !task.answer?.deviation" class="fail-fields">
                        <div class="row no-gutters" style="gap: 8px">
                            <div class="col">
                                <label class="text-muted small mb-0">Type</label>
                                <b-form-input v-model="failDrafts[task.id].type" placeholder="Type" />
                            </div>
                            <div class="col">
                                <label class="text-muted small mb-0">Title</label>
                                <b-form-input v-model="failDrafts[task.id].title" placeholder="Title" />
                            </div>
                            <div class="col">
                                <label class="text-muted small mb-0">Responsible</label>
                                <b-form-input v-model="failDrafts[task.id].responsible" placeholder="Responsible" />
                            </div>
                        </div>
                    </div>

                    <div v-if="task.answer?.deviation" class="deviation-pill">
                        <i class="bi bi-exclamation-triangle"></i>
                        Deviation linked: {{ task.answer.deviation.title }}
                        <small class="text-muted ml-1">({{ task.answer.deviation.type }})</small>
                    </div>

                    <div class="notes-row">
                        <label class="notes-label">Notes</label>
                        <div class="d-flex align-items-center" style="gap: 8px">
                            <b-form-input
                                v-model="task._noteDraft"
                                placeholder="Add notes"
                                :disabled="readonly"
                                class="flex-grow-1"
                            />
                            <label class="cursor-pointer mb-0" :class="readonly ? 'text-muted' : 'text-primary'">
                                <i class="bi bi-camera"></i>
                                <input
                                    type="file"
                                    accept="image/*"
                                    class="d-none"
                                    :disabled="readonly"
                                    @change="onPhoto($event, task)"
                                />
                            </label>
                            <button
                                v-if="task.answer?.value === 'FAIL' && !task.answer?.deviation"
                                type="button"
                                class="btn btn-primary btn-sm"
                                :disabled="!canCreateDeviation(task) || readonly"
                                @click="createDeviation(task)"
                            >
                                Create
                            </button>
                            <a v-else class="cursor-pointer" :class="readonly ? 'text-muted' : 'text-primary'" @click="saveNote(task)">
                                <i class="bi bi-send"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="d-flex justify-content-end mt-3" style="gap: 8px" v-if="!readonly">
                <b-button variant="outline-secondary" @click="onHide">Save & close</b-button>
                <b-button
                    variant="primary"
                    :disabled="submitting || stats.completed === 0"
                    @click="submitChecklist"
                >
                    {{ submitting ? 'Submitting...' : 'Submit' }}
                </b-button>
            </div>
            <div v-else class="d-flex justify-content-end mt-3">
                <b-badge variant="success">Submitted on {{ data.date }}</b-badge>
            </div>
        </div>
    </b-modal>
</template>

<script>
import { ref, reactive, computed, watch } from "@vue/composition-api";
import { BModal, BFormInput, BButton, BBadge } from "bootstrap-vue";
import axios from "@axios";
import route from "ziggy-js";
import toaster from "@/composables/toaster";

export default {
    components: { BModal, BFormInput, BButton, BBadge },
    props: {
        visible: { type: Boolean, default: false },
        userChecklistId: { type: [Number, String], default: null },
    },
    setup(props, { emit }) {
        const toast = toaster();
        const data = ref(null);
        const loading = ref(false);
        const submitting = ref(false);
        const filter = ref("all");
        const failDrafts = reactive({});

        const filterOptions = [
            { value: "all", label: "All" },
            { value: "passed", label: "Passed" },
            { value: "failed", label: "Failed" },
            { value: "completed", label: "Completed" },
            { value: "remaining", label: "Remaining" },
        ];

        const readonly = computed(() => data.value?.status === "submitted");
        const description = computed({
            get: () => data.value?.description || "",
            set: () => {},
        });

        const sections = computed(() => data.value?.template_full?.sections || []);

        const stats = computed(() => {
            const total = data.value?.progress?.total || 0;
            const completed = data.value?.progress?.completed || 0;
            const percent = data.value?.progress?.percent || 0;
            const score = data.value?.score_percent || 0;
            return { total, completed, percent, score };
        });

        const attachmentsCount = computed(() => {
            let n = 0;
            sections.value.forEach((s) => s.tasks.forEach((t) => {
                if (t.answer?.img) n++;
            }));
            return n;
        });

        function visibleTasks(section) {
            return section.tasks.filter((task) => {
                const v = task.answer?.value;
                if (filter.value === "all") return true;
                if (filter.value === "passed") return v === "PASS";
                if (filter.value === "failed") return v === "FAIL";
                if (filter.value === "completed") return !!v;
                if (filter.value === "remaining") return !v;
                return true;
            });
        }

        async function fetchData() {
            if (!props.userChecklistId) return;
            try {
                loading.value = true;
                const res = await axios.get(route("submitted-checklists.show", props.userChecklistId));
                if (res.status === 200) {
                    data.value = res.data;
                    seedDrafts();
                }
            } catch (e) {
                toast.error(e?.response?.data?.message || "Failed to load");
            } finally {
                loading.value = false;
            }
        }

        function seedDrafts() {
            sections.value.forEach((s) => s.tasks.forEach((task) => {
                task._noteDraft = task.answer?.notes || "";
                if (!failDrafts[task.id]) {
                    failDrafts[task.id] = { type: "", title: task.name, responsible: "" };
                }
            }));
        }

        async function setAnswer(task, value) {
            try {
                const res = await axios.post(route("task-answer.store"), {
                    checklist_task_id: task.id,
                    user_checklist_id: data.value.id,
                    answer: value,
                    notes: task._noteDraft || null,
                });
                if (res.status === 200) {
                    if (!task.answer) task.answer = {};
                    task.answer.id = res.data.answer.id;
                    task.answer.value = value;
                    task.answer.notes = res.data.answer.notes;
                    refreshStats();
                }
            } catch (e) {
                toast.error(e?.response?.data?.message || "Failed to save answer");
            }
        }

        async function saveNote(task) {
            if (!task.answer?.value) {
                toast.warning("Pick Pass/Fail/N/A first");
                return;
            }
            try {
                const res = await axios.post(route("task-answer.store"), {
                    checklist_task_id: task.id,
                    user_checklist_id: data.value.id,
                    answer: task.answer.value,
                    notes: task._noteDraft || null,
                });
                if (res.status === 200) {
                    task.answer.notes = res.data.answer.notes;
                    toast.success("Note saved");
                }
            } catch (e) {
                toast.error("Failed to save note");
            }
        }

        async function onPhoto(event, task) {
            const file = event.target.files?.[0];
            if (!file) return;
            const form = new FormData();
            form.append("checklist_task_id", task.id);
            form.append("user_checklist_id", data.value.id);
            if (task.answer?.value) form.append("answer", task.answer.value);
            if (task._noteDraft) form.append("notes", task._noteDraft);
            form.append("img", file);
            try {
                const res = await axios.post(route("task-answer.store"), form);
                if (res.status === 200) {
                    if (!task.answer) task.answer = {};
                    task.answer.id = res.data.answer.id;
                    task.answer.img = res.data.answer.img;
                    toast.success("Photo attached");
                }
            } catch (e) {
                toast.error("Failed to upload photo");
            } finally {
                event.target.value = null;
            }
        }

        function canCreateDeviation(task) {
            const draft = failDrafts[task.id];
            return draft && draft.type?.trim() && draft.title?.trim();
        }

        async function createDeviation(task) {
            const draft = failDrafts[task.id];
            if (!task.answer?.id) {
                toast.warning("Save the Fail status first");
                return;
            }
            try {
                const res = await axios.post(
                    route("submitted-checklists.create-deviation", { userChecklist: data.value.id, answer: task.answer.id }),
                    {
                        type: draft.type,
                        title: draft.title,
                        responsible_person: draft.responsible,
                        description: task._noteDraft || null,
                    }
                );
                if (res.status === 201) {
                    task.answer.deviation = res.data.deviation;
                    task.answer.avvik_listing_id = res.data.deviation.id;
                    toast.success("Deviation created");
                    refreshStats();
                }
            } catch (e) {
                toast.error(e?.response?.data?.message || "Failed to create deviation");
            }
        }

        async function submitChecklist() {
            try {
                submitting.value = true;
                const res = await axios.post(route("submitted-checklists.submit", data.value.id));
                if (res.status === 200) {
                    data.value.status = res.data.status;
                    data.value.date = res.data.submitted_at;
                    toast.success("Checklist submitted");
                    emit("submitted", data.value.id);
                    onHide();
                }
            } catch (e) {
                toast.error("Failed to submit");
            } finally {
                submitting.value = false;
            }
        }

        async function refreshStats() {
            try {
                const res = await axios.get(route("submitted-checklists.show", data.value.id));
                if (res.status === 200) {
                    data.value.progress = res.data.progress;
                    data.value.score_percent = res.data.score_percent;
                    data.value.deviation_count = res.data.deviation_count;
                }
            } catch (e) { /* swallow */ }
        }

        function onHide() {
            emit("close");
        }

        watch(() => props.visible, (v) => {
            if (v) fetchData();
            else data.value = null;
        });

        return {
            data, loading, submitting, filter, filterOptions, readonly,
            description, sections, stats, attachmentsCount, failDrafts,
            visibleTasks, setAnswer, saveNote, onPhoto, canCreateDeviation, createDeviation,
            submitChecklist, onHide,
        };
    },
};
</script>

<style scoped>
.perform-checklist-modal .title-icon,
.title-icon {
    height: 36px;
    width: 36px;
    border-radius: 50%;
    color: white;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
}
.quick-icon {
    height: 40px;
    width: 40px;
    border: 1px dashed #ccc;
    border-radius: 6px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    color: #666;
}
.stats-card {
    background: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 8px;
    padding: 12px 16px;
    min-width: 240px;
}
.section-name {
    font-weight: 600;
    color: #333;
}
.task-card {
    background: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 10px;
    padding: 14px;
}
.task-header {
    font-weight: 500;
    margin-bottom: 10px;
}
.answer-buttons {
    display: flex;
    gap: 8px;
    margin-bottom: 10px;
}
.ans-btn {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    background: #fff;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
}
.ans-btn.pass:hover, .ans-btn.pass.active { border-color: #28c76f; color: #28c76f; }
.ans-btn.pass.active { background: rgba(40, 199, 111, 0.08); }
.ans-btn.fail:hover, .ans-btn.fail.active { border-color: #ea5455; color: #ea5455; }
.ans-btn.fail.active { background: rgba(234, 84, 85, 0.08); }
.ans-btn.na:hover, .ans-btn.na.active { border-color: #00cfe8; color: #00cfe8; }
.ans-btn.na.active { background: rgba(0, 207, 232, 0.08); }
.fail-fields {
    margin-bottom: 10px;
}
.deviation-pill {
    background: #fff7e6;
    border-left: 3px solid #ff9f43;
    padding: 6px 10px;
    border-radius: 4px;
    margin-bottom: 10px;
    font-size: 0.9rem;
}
.notes-row {
    background: #f8f9fa;
    border-radius: 6px;
    padding: 8px 10px;
}
.notes-label {
    display: block;
    font-size: 0.75rem;
    color: #888;
    margin-bottom: 2px;
}
</style>
