<template>
    <div class="container-fluid">
        <Assign
            v-if="dialog.show"
            :id="checklistId"
            :showing="dialog.show"
            target="user-checklist"
            @closeDialog="onAssignClose"
        />
        <div class="row">
            <div
                v-for="(card, index) in checklist"
                :key="index"
                class="col-12 col-sm-6 col-md-4 col-xl-3"
            >
                <div class="card">
                    <div class="position-absolute dropdown-div">
                        <b-dropdown
                            id="dropdown-1"
                            text="Dropdown Button"
                            class="drop-down-btn1 drop-down-btn"
                        >
                            <template #button-content>
                                <i
                                    class="bi bi-three-dots-vertical"
                                    style="color: black"
                                ></i>
                            </template>
                            <b-dropdown-item
                                v-if="can('checklist-edit')"
                                @click="
                                    $router.push({
                                        name: 'add-checklist',
                                        params: { param: card.id },
                                    })
                                "
                                >Edit
                            </b-dropdown-item>
                            <b-dropdown-item
                                v-if="can('checklist-delete')"
                                @click="dltChecklist(card.id)"
                                >Delete</b-dropdown-item
                            >
                        </b-dropdown>
                    </div>

                    <div class="card-body py-2 px-2">
                        <div style="gap: 8px" class="d-flex align-items-center">
                            <i
                                :class="card.icon"
                                :style="{ background: card.color }"
                                class="svg-icon title-icon"
                                style="
                                    height: 40px !important;
                                    width: 40px !important;
                                "
                            ></i>
                        </div>
                        <div style="gap: 15px">
                            <h4 class="text-truncate mt-1 mb-1">
                                {{ card.name }}
                            </h4>
                            <span
                                style="
                                    border-radius: 3px;
                                    border: 2px solid #999;
                                    padding: 1px 10px;
                                "
                                >Sections {{ card.sections.length }}</span
                            >
                            <span
                                style="
                                    border-radius: 3px;
                                    border: 2px solid #999;
                                    padding: 1px 10px;
                                    margin: 0px 5px;
                                "
                                >tasks
                                {{
                                    card.sections.reduce(
                                        (total, section) =>
                                            total + section.tasks.length,
                                        0
                                    )
                                }}</span
                            >
                        </div>

                        <div
                            class="d-flex align-items-center justify-content-between mt-2"
                        >
                            <div class="d-flex align-items-center">
                                <img
                                    :src="`https://ui-avatars.com/api/?background=random&name=${card.user_name.charAt(
                                        0
                                    )}`"
                                    class="rounded-circle mr-1 profile-img"
                                    alt="Profile Image"
                                    style="width: 40px; height: 40px"
                                />
                                <div>
                                    <p class="mb-0">{{ card.user_name }}</p>
                                    <p class="text-muted mb-0">
                                        {{ card.created_at }}
                                    </p>
                                </div>
                            </div>

                            <div class="d-flex" style="gap: 6px">
                                <button
                                    v-if="can('checklist-perform')"
                                    class="btn btn-primary align-items-center section-btn"
                                    :disabled="startingId === card.id"
                                    @click="startTemplate(card.id)"
                                >
                                    {{ startingId === card.id ? '...' : 'Start' }}
                                </button>
                                <button
                                    v-if="can('checklist-assign')"
                                    class="btn btn-outline-primary align-items-center section-btn"
                                    @click="openDialog(card.id)"
                                >
                                    Assign
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="position-absolute button-div d-none">
                        <!-- <button
                            class="btn btn-primary align-items-center section-btn"
                            @click="openDialog(card.id)"
                        >
                            Assign
                        </button> -->
                        <!-- <button
        class="btn btn-light  align-items-center section-btn mt-1 w-auto   "
    >
        Start
    </button> -->
                        <!-- <b-dropdown
                            id="dropdown-1"
                            text="Dropdown Button"
                            class="m-md-2 drop-down-btn1 drop-down-btn"
                        >
                            <template #button-content>
                                <h1>Start</h1>
                            </template>
                            <b-dropdown-item
                                v-for="(assign, index) in card.user_checklists"
                                :key="index"
                                @click="startAssignment(assign.id)"
                                >{{ assign.name }}
                            </b-dropdown-item>
                        </b-dropdown> -->
                    </div>
                </div>
            </div>
        </div>

        <ProjectSelectionDialog
            :show="projectPickerVisible"
            :allow-skip="true"
            @select="onProjectPicked"
            @close="closeProjectPicker"
        />

        <Perform
            :visible="performVisible"
            :template-id="performTemplateId"
            :project-id="performProjectId"
            @close="closePerform"
            @submitted="closePerform"
        />
    </div>
</template>
<script>
import { defineComponent, ref } from "@vue/composition-api";
import { BDropdown, BIcon, BDropdownItem } from "bootstrap-vue";
import Assign from "./dialogs/Assign.vue";
import ProjectSelectionDialog from "./dialogs/ProjectSelectionDialog.vue";
import Perform from "./Perform.vue";
import axios from "@axios";
import route from "ziggy-js";
import toaster from "@/composables/toaster";
import useTasks from "@/composables/tasks";
import useAbilities from "@/composables/abilities";

export default defineComponent({
    components: {
        BDropdown,
        BDropdownItem,
        BIcon,
        Assign,
        ProjectSelectionDialog,
        Perform,
    },
    props: {
        checklist: {
            type: Array,
            required: false,
        },
    },
    setup(props, { emit, root }) {
        const { assign, dialog } = useTasks();
        const { can } = useAbilities();
        const checklistId = ref(null);
        const showing = ref(false);
        const toast = toaster();
        const loading = ref(false);
        const startingId = ref(null);
        const performId = ref(null);
        const performTemplateId = ref(null);
        const performProjectId = ref(null);
        const performVisible = ref(false);
        const projectPickerVisible = ref(false);
        const pendingTemplateId = ref(null);
        const openDialog = (id) => {
            const selectedChecklist = props.checklist.find(
                (checklist) => checklist.id === id
            );
            assign.value.checklist.temp = selectedChecklist;
            assign.value.checklist.data = selectedChecklist;
            assign.value.checklist.id = selectedChecklist.id;
            dialog.show = true;
        };

        const dltChecklist = async (id) => {
            const item = props.checklist.find((c) => c.id === id);
            const name = item?.name || "this checklist template";
            const ok = await root.$bvModal.msgBoxConfirm(
                `Are you sure you want to delete the checklist template "${name}"? This cannot be undone.`,
                {
                    title: "Delete checklist template",
                    okVariant: "danger",
                    okTitle: "Delete",
                    cancelTitle: "Cancel",
                    centered: true,
                }
            );
            if (!ok) return;
            try {
                loading.value = true;
                const res = await axios.delete(route("checklist.destroy", id));
                if (res.status === 200) {
                    toast.success(res.data.message);
                    emit("refetch");
                }
            } catch (error) {
                toast.error(error);
            } finally {
                loading.value = false;
            }
        };
        const startAssignment = async (id) => {
            try {
                loading.value = true;
                const res = await axios.get(route("user-checklist.start", id));
                if (res.status === 200) {
                    toast.success(res.data.message);
                    emit("refetch");
                }
            } catch (error) {
                toast.error(error);
            } finally {
                loading.value = false;
            }
        };
        const startTemplate = (id) => {
            pendingTemplateId.value = id;
            projectPickerVisible.value = true;
        };

        const onProjectPicked = (project) => {
            performProjectId.value = project ? project.id : null;
            performTemplateId.value = pendingTemplateId.value;
            projectPickerVisible.value = false;
            pendingTemplateId.value = null;
            performVisible.value = true;
        };

        const closeProjectPicker = () => {
            projectPickerVisible.value = false;
            pendingTemplateId.value = null;
        };
        const onAssignClose = () => {
            dialog.show = false;
            emit("refetch");
        };
        const closePerform = () => {
            performVisible.value = false;
            performTemplateId.value = null;
            performProjectId.value = null;
            performId.value = null;
            emit("refetch");
        };
        return {
            openDialog,
            checklistId,
            showing,
            dltChecklist,
            startAssignment,
            startTemplate,
            startingId,
            dialog,
            onAssignClose,
            performId,
            performTemplateId,
            performProjectId,
            performVisible,
            closePerform,
            projectPickerVisible,
            onProjectPicked,
            closeProjectPicker,
            can,
        };
    },
});
</script>

<style scoped>
.svg-icon {
    background: #0096fd;
    padding: 5px;
    fill: white;
    border-radius: 100%;
}
.title-icon {
    /* height: 100% !important;
    width: 100% !important;
    max-width: 100%;
    position: absolute;
    text-align: center; */
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: white;
}
.section-btn {
    width: fit-content;
}
.button-div {
    top: 40%;
    left: 40%;
}
.card:hover .button-div {
    display: flex !important;
    flex-direction: column;
}
/* .card:hover {
    background-color: rgba(0, 0, 0, 0.5);
} */
/* .card:hover .title-icon {
    opacity: 0.4;
}
.card:hover .profile-img {
    opacity: 0.4;
} */
.dropdown-div {
    right: 15px;
    top: 30px;
    /* display: none; */
}
/* .card:hover .dropdown-div {
    display: block;
} */
</style>
<style lang="scss">
.drop-down-btn .dropdown-toggle {
    background-color: white !important;
    padding: 5px !important;
}
.drop-down-btn .dropdown-toggle::after {
    display: none !important;
}
.drop-down-btn1 .dropdown-toggle {
    border: 0 !important;
}
</style>
