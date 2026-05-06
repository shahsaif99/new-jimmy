<template>
    <div class="container-fluid">
        <Assign
            v-if="dialog.show"
            :id="checklistId"
            :showing="dialog.show"
            target="user-checklist"
            @closeDialog="onAssignClose"
        />
        <div class="card mt-1">
            <b-table
                :items="checklist"
                :fields="fields"
                responsive
                show-empty
                empty-text="No templates"
                tbody-tr-class="align-middle"
            >
                <template #cell(no)="data">
                    <span class="text-muted">{{ data.item.code }}</span>
                </template>
                <template #cell(name)="data">
                    <div class="d-flex align-items-center" style="gap: 12px">
                        <i
                            :class="data.item.icon"
                            :style="{ background: data.item.color }"
                            class="title-icon"
                        ></i>
                        <span>{{ data.item.name }}</span>
                    </div>
                </template>
                <template #cell(category)="data">
                    <span v-if="data.item.category">{{ data.item.category.name }}</span>
                    <span v-else class="text-muted">—</span>
                </template>
                <template #cell(actions)="data">
                    <div class="d-flex justify-content-end" style="gap: 8px">
                        <button
                            class="btn btn-primary btn-sm"
                            :disabled="startingId === data.item.id"
                            @click="startTemplate(data.item.id)"
                        >
                            {{ startingId === data.item.id ? 'Starting...' : 'Start' }}
                        </button>
                        <button
                            class="btn btn-outline-primary btn-sm"
                            @click="openAssign(data.item.id)"
                        >
                            Assign
                        </button>
                        <b-dropdown variant="link" no-caret toggle-class="p-0" right>
                            <template #button-content>
                                <i class="bi bi-three-dots-vertical text-body"></i>
                            </template>
                            <b-dropdown-item
                                @click="$router.push({ name: 'add-checklist', params: { param: data.item.id } })"
                            >
                                Edit
                            </b-dropdown-item>
                            <b-dropdown-item @click="dltChecklist(data.item.id)">
                                Delete
                            </b-dropdown-item>
                        </b-dropdown>
                    </div>
                </template>
            </b-table>
        </div>
    </div>
</template>
<script>
import { defineComponent, ref } from "@vue/composition-api";
import { BTable, BDropdown, BDropdownItem } from "bootstrap-vue";
import Assign from "./dialogs/Assign.vue";
import axios from "@axios";
import route from "ziggy-js";
import toaster from "@/composables/toaster";
import useTasks from "@/composables/tasks";

export default defineComponent({
    components: { BTable, BDropdown, BDropdownItem, Assign },
    props: {
        checklist: { type: Array, required: false, default: () => [] },
    },
    setup(props, { emit }) {
        const { assign, dialog } = useTasks();
        const checklistId = ref(null);
        const startingId = ref(null);
        const toast = toaster();

        const fields = [
            { key: "no", label: "No.", thStyle: { width: "90px" } },
            { key: "name", label: "Checklist name" },
            { key: "category", label: "Category" },
            { key: "actions", label: "Action", class: "text-right", thStyle: { width: "260px" } },
        ];

        const openAssign = (id) => {
            const selected = props.checklist.find((c) => c.id === id);
            assign.value.checklist.temp = selected;
            assign.value.checklist.data = selected;
            assign.value.checklist.id = selected.id;
            dialog.show = true;
        };

        const dltChecklist = async (id) => {
            try {
                const res = await axios.delete(route("checklist.destroy", id));
                if (res.status === 200) {
                    toast.success(res.data.message);
                    emit("refetch");
                }
            } catch (e) {
                toast.error(e);
            }
        };

        const startTemplate = async (id) => {
            try {
                startingId.value = id;
                const res = await axios.post(route("checklist.start", id));
                if (res.status === 201) {
                    toast.success(res.data.message);
                    emit("refetch");
                }
            } catch (e) {
                toast.error(e);
            } finally {
                startingId.value = null;
            }
        };

        const onAssignClose = () => {
            dialog.show = false;
            emit("refetch");
        };

        return {
            fields,
            checklistId,
            dialog,
            openAssign,
            dltChecklist,
            startTemplate,
            startingId,
            onAssignClose,
        };
    },
});
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
}
</style>
