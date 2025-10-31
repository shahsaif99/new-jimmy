<template>
    <div>
    <b-modal cancel-variant="outline-secondary" centered :hide-footer="true" :title="t('Assign Checklist')" size="lg"
        class="modal-is-add-document-active" id="is-add-document-active" :visible="showing" :hide-header="true"
        @hide="onModalHide">
        <div class="d-flex justify-content-between">
            <div v-if="id" class="d-flex align-items-center" style="gap: 10px">
                <div style="height: 50px; width: 50px; position: relative" class="mt-1">
                    <i :class="checklist.icon" :style="{ background: checklist.color }"
                        class="bi bi-list-check svg-icon title-icon" style="
                            height: 100% !important;
                            width: 100% !important;
                            max-width: 100%;
                        "></i>
                </div>
                <div style="font-weight: bolder; font-size: large">
                    {{ checklist.name }}
                </div>
            </div>
            <div class="d-flex align-items-center" :class="!id ? 'justify-content-end w-100' : ''">
                <button v-if="id" @click="
                    $router.push({
                        name: 'add-checklist',
                        params: { param: checklist.id },
                    })
                    " class="btn btn-light d-flex align-items-center ml-2">
                    <i class="bi bi-pencil mr-1" style="font-size: medium"></i>
                    Edit
                </button>
                <i class="bi bi-x ml-2" style="font-size: xx-large" @click="$emit('closeDialog')"></i>
            </div>
        </div>
        <div v-if="id" class="d-flex mt-3">
            <button class="btn d-flex align-items-center section-btn" :class="preview ? 'btn-primary' : 'btn-light'"
                @click="preview = true">
                Preview
            </button>
            <button class="btn d-flex align-items-center ml-2" :class="!preview ? 'btn-primary' : 'btn-light'"
                @click="preview = false">
                Assign
            </button>
        </div>
        <template v-if="preview">
            <div v-for="(section, index) in checklist.sections" :key="index" class="mt-2">
                <h3>{{ section.name }}</h3>
                <div v-for="(task, index) in section.tasks" :key="index" class="d-flex flex-column task-div" :class="{
                    'border-bottom-zero':
                        index !== section.tasks.length - 1,
                }">
                    <b>task : {{ task.name }}</b>
                    <b>Task Type : <span>{{ task.type }}</span></b>

                    <b>Image Required? :
                        <span>{{
                            task.is_img_required ? "Yes" : "No"
                        }}</span></b>
                    <b v-if="task.param">Parameter type : <span>{{ task.param }}</span></b>
                    <img v-if="task.img" style="width: 90%" :src="task.img" />
                </div>
            </div>
        </template>
        <template v-else>
            <div class="position-relative">
                <input class="w-100 sub-heading my-1 check-input" type="text" v-model="assign.name"
                    placeholder="Name your task or work order" required />
            </div>
            <div style="gap: 10px" class="d-flex align-items-center mt-1">
                <h5>Assigned to</h5>

                <b-dropdown id="assignedTo" toggle-class="text-decoration-none" no-caret variant="outline-white"
                    size="sm" class="assign-dropdown">
                    <template #button-content>
                        <div style="gap: 10px" class="d-flex">
                            <i class="bi bi-person-plus" style="
                                    border: 3px dotted gray !important;
                                    width: 44px;
                                    height: 44px;
                                    border-radius: 6px;
                                    font-size: x-large;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                "></i>

                            <b-media v-if="assign.assign_to.length > 0" ertical-align="center">
                                <template #aside>
                                    <b-avatar size="32" :src="filteredEmployees.find(
                                        (item) =>
                                            item.id ===
                                            assign.assign_to[0]
                                    ).avatar
                                        " :text="avatarText(
                                            filteredEmployees.find(
                                                (item) =>
                                                    item.id ===
                                                    assign.assign_to[0]
                                            ).name
                                        )
                                            " :variant="`light-${resolveUserRoleVariant(
                                                filteredEmployees.find(
                                                    (item) =>
                                                        item.id ===
                                                        assign.assign_to[0]
                                                ).name
                                            )}`" :to="{
                                            name: 'users-edit',
                                            params: {
                                                id: filteredEmployees.find(
                                                    (item) =>
                                                        item.id ===
                                                        assign.assign_to[0]
                                                ).id,
                                            },
                                        }" />
                                </template>
                                <b-link :to="{
                                    name: 'users-edit',
                                    params: {
                                        id: filteredEmployees.find(
                                            (item) =>
                                                item.id ===
                                                assign.assign_to[0]
                                        ).id,
                                    },
                                }">
                                    {{
                                        filteredEmployees.find(
                                            (item) =>
                                                item.id === assign.assign_to[0]
                                        ).name
                                    }}
                                </b-link>
                            </b-media>
                        </div>
                    </template>
                    <div class="p-2" style="min-width: 250px">
                        <b-form-input placeholder="Search employee" id="search-employee" v-model="searchQuery" />

                        <span class="d-block my-1">Select Employes</span>
                        <template v-if="users">
                            <b-dropdown-text class="user-name d-flex w-100 justify-content-between align-items-center"
                                v-for="(user, index) in filteredEmployees" :key="index" @click="selectEmploye(user.id)"
                                :style="{
                                    backgroundColor: assign.assign_to.some(
                                        (val) => val === user.id
                                    )
                                        ? '#f7f7f7'
                                        : 'white',
                                }" style="
                                    display: flex;
                                    justify-content: space-between;
                                    min-width: 100%;
                                ">
                                <span>{{ user.first_name }}</span>
                                <span v-if="
                                    assign.assign_to.some(
                                        (val) => val === user.id
                                    )
                                ">
                                    <i class="bi bi-check2" style="color: green; font-weight: 700"></i>
                                </span>
                            </b-dropdown-text>
                        </template>
                    </div>
                </b-dropdown>

                <p v-if="!isAssigned" class="text-danger ml-1">
                    Please select atleast 1 employee before assigning checklist
                </p>
            </div>
            <div style="gap: 10px" class="mt-1 d-flex flex-wrap">
                <b-dropdown id="priority" toggle-class="text-decoration-none" no-caret variant="outline-white" size="sm"
                    class="assign-dropdown">
                    <template #button-content>
                        <i v-if="Object.keys(assign.priority).length === 0" class="bi bi-flag" style="
                                border: 3px dotted gray !important;
                                width: 44px;
                                height: 44px;
                                border-radius: 6px;
                                font-size: x-large;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                            "></i>
                        <p v-else style="
                                margin-bottom: 0 !important;
                                margin-top: 3px !important;
                            ">
                            {{ tempPriority.name }}
                            <i :class="tempPriority.icon" :style="{ color: tempPriority.color }" style="
                                    border: 3px dotted gray !important;
                                    padding: 5px 10px;
                                    border-radius: 6px;
                                    font-size: x-large;
                                "></i>
                        </p>
                    </template>
                    <div class="p-2" style="min-width: 250px">
                        <div class="user-name d-flex justify-content-between align-items-center"
                            v-for="(work, index) in workPriority" :key="index" @click="addPriority(work)">
                            <p>{{ work.name }}</p>

                            <i :class="work.icon" :style="{ color: work.color }" style="font-weight: 700"></i>
                        </div>
                    </div>
                </b-dropdown>

                <b-dropdown id="workOrder" toggle-class="text-decoration-none" no-caret variant="outline-white"
                    size="sm" class="assign-dropdown">
                    <template #button-content>
                        <i v-if="assign.work_order.name === ''" class="bi bi-grid" style="
                                border: 3px dotted gray !important;
                                width: 44px;
                                height: 44px;
                                border-radius: 6px;
                                font-size: x-large;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                            "></i>
                        <p v-else :style="{
                            border:
                                assign.work_order.name === ''
                                    ? '3px dotted gray !important'
                                    : '2px solid blue !important',
                            background:
                                assign.work_order.name === ''
                                    ? ''
                                    : '#C0C5E6',
                            color:
                                assign.work_order.name === '' ? '' : 'blue',
                        }" class="mb-0" style="
                                font-size: 12px;
                                height: 44px;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                padding: 0px 5px;
                                border-radius: 6px;
                            ">
                            {{ assign.work_order.name }}
                        </p>
                    </template>
                    <div class="p-2" style="min-width: 320px" v-if="users">
                        <b-form-input placeholder="Search work order category" id="search-cate"
                            v-model="categories.searchCateModel" />

                        <div v-if="categories.filteredData.length === 0">
                            <span class="d-block mt-2">Please add category first</span>
                        </div>

                        <template v-else>
                            <div class="user-name d-flex justify-content-between align-items-center mt-1" v-for="(
                                    category, index
                                ) in categories.filteredData" :key="index" @click="selectWork(category)">
                                {{ category.name }}
                                <span v-if="assign.work_order.id === category.id">
                                    <i class="bi bi-check2" style="color: green; font-weight: 700"></i>
                                </span>
                            </div>
                        </template>
                    </div>
                </b-dropdown>

                <b-dropdown id="location" toggle-class="text-decoration-none" no-caret variant="outline-white" size="sm"
                    class="assign-dropdown">
                    <template #button-content>
                        <i class="bi bi-geo-alt" style="
                                border: 3px dotted gray !important;
                                width: 44px;
                                height: 44px;
                                border-radius: 6px;
                                font-size: x-large;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                            "></i>
                    </template>
                    <div class="p-2" style="min-width: 250px" v-if="users">
                        <p>Select work Location</p>
                        <div>
                            <div class="user-name d-flex justify-content-between align-items-center">
                                <div>
                                    <b-form-input placeholder="Room" id="room" v-model="assign.work_location.room"
                                        trim />
                                </div>
                            </div>
                            <div class="user-name d-flex justify-content-between align-items-center">
                                <div>
                                    <b-form-input placeholder="Floor" id="floor" v-model="assign.work_location.floor"
                                        trim />
                                </div>
                            </div>
                            <div class="user-name d-flex justify-content-between align-items-center">
                                <div>
                                    <b-form-input placeholder="Area" id="area" v-model="assign.work_location.area" />
                                </div>
                            </div>
                        </div>
                    </div>
                </b-dropdown>

                <b-dropdown id="location" toggle-class="text-decoration-none" no-caret variant="outline-white" size="sm"
                    class="assign-dropdown">
                    <template #button-content>
                        <i v-if="!assign.due_date" class="bi bi-calendar-check" style="
                                border: 3px dotted gray !important;
                                width: 44px;
                                height: 44px;
                                border-radius: 6px;
                                font-size: x-large;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                            "></i>
                        <p v-else class="mb-0" style="
                                font-size: 12px;
                                height: 44px;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                padding: 0px 5px;
                                border-radius: 6px;
                                border: 2px solid gray !important;
                            ">
                            Due date {{ assign.due_date }}
                        </p>
                    </template>
                    <div class="p-2" style="min-width: 250px" v-if="users">
                        <div>
                            <div class="user-name d-flex justify-content-between align-items-center">
                                <div>
                                    <b-calendar v-model="assign.due_date" :min="minDate" locale="en"></b-calendar>
                                </div>
                            </div>
                        </div>
                    </div>
                </b-dropdown>
            </div>

            <div v-if="!id" class="text-center d-flex justify-content-center w-100">
                <button v-if="!assign.checklist.data"
                    class="btn btn-primary d-flex justify-content-center align-items-center mt-1 w-100" @click="openChecklistDialog">
                    <i class="bi bi-check mr-1" style="font-size: x-large"></i>
                    Add checklist
                </button>

                <div class="d-flex justify-content-between align-items-center p-1 w-100 mt-4 card-custom" v-else>
                    <div class="d-flex">
                        <div class="rounded" :style="{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '50px',
                            height: '50px',
                            background: assign.checklist.data.color,
                        }">
                            <i :style="{
                                color: '#fff',
                                fontSize: '20px',
                            }" :class="assign.checklist.data.icon"></i>
                        </div>
                        <div style="
                                display: flex;
                                flex-direction: column;
                                align-items: start;
                            ">
                            <span style="font-size: 16px; font-weight: 600" class="ml-2 text-capitalize">
                                {{ assign.checklist.data.name }}
                            </span>
                            <span class="ml-2 text-caspanitalize">
                                <strong>{{
                                    assign.checklist.data.sections.length
                                }}</strong>
                                Items
                            </span>
                        </div>
                    </div>

                    <i @click="assign.checklist.reset" :style="{
                        fontSize: '20px',
                        cursor: 'pointer',
                    }" class="bi bi-dash-circle-fill"></i>
                </div>
            </div>
            <div v-if="!id" class="text-center d-flex justify-content-center  w-100">
                <button v-if="!assign.project.data"
                    class="btn btn-primary d-flex justify-content-center align-items-center mt-1 w-100" @click="openProjectDialog">
                    <i class="bi bi-check mr-1" style="font-size: x-large"></i>
                    Add Project
                </button>

                <div class="d-flex justify-content-between align-items-center p-1 mt-2 w-100 card-custom" v-else>
                    <div>
                        <h4>Project</h4>
                        <p class="m-0">
                            {{ assign.project.data.name }}
                        </p>
                    </div>

                    <i @click="assign.project.reset" :style="{
                        fontSize: '20px',
                        cursor: 'pointer',
                    }" class="bi bi-dash-circle-fill"></i>
                </div>
            </div>


            <!-- assignment discription -->
            <h5 class="mt-1 assign-sub-titles">Description</h5>
            <textarea style="border: 1px solid #d7d7d7 !important; border-radius: 6px" v-model="assign.description" />
            <!-- discription ends -->
            <label for="assign-file"
                class="position-relative add-item d-flex align-items-center justify-content-center mt-1" style="
                    border: 3px dotted skyblue !important;
                    padding-left: 5px;
                    padding-right: 5px;
                    padding-top: 10px;
                    padding-bottom: 10px;
                    background: #edeffe;
                ">
                <i class="bi bi-cloud-arrow-up" style="font-size: x-large; color: #5453ad"></i>
                <h3 class="mb-0 mx-1" style="font-size: large; color: #5453ad">
                    Click here to Upload Images
                </h3>
            </label>
            <input type="file" id="assign-file" accept="image/*" class="d-none" @change="handleFile($event)" />
            <div v-if="assign.file !== ''" class="row">
                <div class="col-sm-3 mt-1 position-relative img-div">
                    <img :src="isFile(assign.file)
                        ? urlImageConverter.createObjectURL(assign.file)
                        : assign.file
                        " class="w-100 h-100 assign-img" />
                    <i class="bi bi-x-lg position-absolute dlt-img" @click="assign.file = ''"></i>
                </div>
            </div>

            <button v-if="!isAddTask" class="btn btn-primary d-flex align-items-center ml-auto mt-1" @click="addTask"
                :disabled="apiHelpers.loading">
                <div v-if="apiHelpers.loading" class="spinner-border text-light" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
                <div class="d-flex align-items-center">
                    <i class="bi bi-check2-circle mr-1" style="font-size: x-large"></i>
                    Create
                </div>
            </button>
            <button v-else-if="editTask.id" class="btn btn-primary d-flex align-items-center ml-auto mt-1"
                @click="updateTask" :disabled="apiHelpers.loading">
                <div v-if="apiHelpers.loading" class="spinner-border text-light" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
                <div class="d-flex align-items-center">
                    <i class="bi bi-check2-circle mr-1" style="font-size: x-large"></i>
                    Update Task
                </div>
            </button>
            <button v-else class="btn btn-primary d-flex align-items-center ml-auto mt-1" @click="addTask"
                :disabled="apiHelpers.loading">
                <div v-if="apiHelpers.loading" class="spinner-border text-light" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
                <div class="d-flex align-items-center">
                    <i class="bi bi-check2-circle mr-1" style="font-size: x-large"></i>
                    Create
                </div>
            </button>
        </template>
    </b-modal>

    <!-- Checklist Selection Dialog -->
    <ChecklistSelectionDialog
        :show="showChecklistDialog"
        :selected-id="assign.checklist.id"
        @select="handleChecklistSelection"
        @close="closeChecklistDialog"
    />

    <!-- Project Selection Dialog -->
    <ProjectSelectionDialog
        :show="showProjectDialog"
        :selected-id="assign.project.id"
        @select="handleProjectSelection"
        @close="closeProjectDialog"
    />
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
    BFormCheckbox,
    BFormGroup,
    BDropdownText,
    BFormCheckboxGroup,
    BFormInput,
    BAvatar,
    BLink,
    BMedia,
} from "bootstrap-vue";

import vSelect from "vue-select";

import { useUtils as useI18nUtils } from "@core/libs/i18n";
import axios from "@axios";
import { onMounted, ref, computed, watch } from "@vue/composition-api";
import useUsers from "@/composables/users";
import route from "ziggy-js";
import toaster from "@/composables/toaster";
import useTasks from "@/composables/tasks";
import useCategories from "@/composables/categories";

import { avatarText } from "@core/utils/filter";
import ChecklistSelectionDialog from "./ChecklistSelectionDialog.vue";
import ProjectSelectionDialog from "./ProjectSelectionDialog.vue";

export default {
    components: {
        ChecklistSelectionDialog,
        ProjectSelectionDialog,
        BDropdown,
        BDropdownItem,
        BIcon,
        BCalendar,
        BButton,
        BCollapse,
        BFormCheckbox,
        BFormCheckboxGroup,
        BDropdownText,
        BFormGroup,
        BFormInput,
        vSelect,
        BAvatar,
        BLink,
        BMedia,
    },
    props: {
        id: {
            type: Number,
            required: false,
        },
        showing: {
            type: Boolean,
        },
        isAddTask: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const { assign, addTask, editTask, updateTask, apiHelpers } =
            useTasks();
        const { getCategories, categories } = useCategories();
        const urlImageConverter = URL;

        const menuType = ref("");
        const isAssigned = ref(true);
        const { fetchUsers, users, resolveUserRoleVariant } = useUsers();
        const { t } = useI18nUtils();
        const checklist = ref({});
        const preview = ref(true);
        const searchQuery = ref("");
        const toast = toaster();
        const workPriority = ref([
            {
                icon: "bi bi-thermometer-high",
                name: "Critical",
                color: "red",
            },
            {
                icon: "bi bi-reception-4",
                name: "High",
                color: "yellow",
            },
            {
                icon: "bi bi-reception-3",
                name: "Medium",
                color: "green",
            },
            {
                icon: "bi bi-reception-2",
                name: "Low",
                color: "blue",
            },
            {
                icon: "bi bi-reception-0",
                name: "None",
                color: "black",
            },
        ]);
        const tempPriority = ref({});

        const searchCat = ref("");

        const showChecklistDialog = ref(false);
        const showProjectDialog = ref(false);

        const openChecklistDialog = () => {
            showChecklistDialog.value = true;
        };

        const closeChecklistDialog = () => {
            showChecklistDialog.value = false;
        };

        const handleChecklistSelection = (checklist) => {
            assign.value.checklist.data = checklist;
            assign.value.checklist.id = checklist.id;
            assign.value.checklist.temp = checklist.name;
            closeChecklistDialog();
        };

        const openProjectDialog = () => {
            showProjectDialog.value = true;
        };

        const closeProjectDialog = () => {
            showProjectDialog.value = false;
        };

        const handleProjectSelection = (project) => {
            assign.value.project.data = project;
            assign.value.project.id = project.id;
            assign.value.project.temp = project.name;
            closeProjectDialog();
        };

        onMounted(async () => {
            await fetchUsers();
            getCategories();

            const work = workPriority.value.find(
                (item) => item.name === assign.value.priority
            );

            if (work) {
                addPriority(work);
            }

            if (!props.id) {
                preview.value = false;
            } else {
                getChecklist();
            }
        });
        const employees = computed(() => {
            return users.value;
        });
        const filteredEmployees = computed(() => {
            return employees.value.filter((user) =>
                user.first_name
                    .toLowerCase()
                    .includes(searchQuery.value.toLowerCase())
            );
        });

        const getChecklist = () => {
            axios.get(route("checklist.show", props.id)).then((res) => {
                if (res.status === 200) {
                    checklist.value = res.data;
                    assign.value.checklist = checklist.value.id;
                }
            });
        };
        const onModalHide = (event) => {
            event.preventDefault();
        };
        const selectEmploye = (id) => {
            if (!assign.value.assign_to.includes(id)) {
                assign.value.assign_to = [];
                assign.value.assign_to.push(id);
            } else {
                const index = assign.value.assign_to.indexOf(id);
                if (index !== -1) {
                    assign.value.assign_to.splice(index, 1);
                }
            }
        };
        const addPriority = (param) => {
            tempPriority.value = param;
            assign.value.priority = param.name;
            menuType.value = "";
        };
        const selectWork = (param) => {
            assign.value.work_order.id = param.id;
            assign.value.work_order.name = param.name;
            menuType.value = "";
        };
        const now = new Date();
        const today = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
        );
        // 15th two months prior
        const minDate = new Date(today);
        minDate.setMonth(minDate.getMonth());
        minDate.setDate(now.getDate());
        watch(
            () => assign.value.due_date,
            () => {
                menuType.value = "";
            }
        );
        const handleFile = (event) => {
            assign.value.file = event.target.files[0];
            event.target.value = null;
        };
        const assignChecklist = () => {
            if (assign.value.assign_to.length) {
                isAssigned.value = true;
                axios
                    .post(route("user-checklist.store"), assign.value)
                    .then((res) => {
                        if (res.status === 201) {
                            toast.success(res.data.message);
                        } else {
                            toast.error(res.error);
                        }
                    });
            } else {
                isAssigned.value = false;
            }
        };

        const isFile = (data) => {
            return data instanceof File;
        };

        return {
            t,
            checklist,
            preview,
            onModalHide,
            users,
            employees,
            searchQuery,
            filteredEmployees,
            selectEmploye,
            assign,
            menuType,
            workPriority,
            addPriority,
            searchCat,
            selectWork,
            minDate,
            handleFile,
            assignChecklist,
            editTask,
            updateTask,
            isAssigned,
            tempPriority,
            addTask,
            categories,
            avatarText,
            resolveUserRoleVariant,
            urlImageConverter,
            isFile,
            apiHelpers,
            showChecklistDialog,
            showProjectDialog,
            openChecklistDialog,
            closeChecklistDialog,
            handleChecklistSelection,
            openProjectDialog,
            closeProjectDialog,
            handleProjectSelection,
        };
    },
};
</script>
<style scoped>
p {
    margin: 0px;
}

.svg-icon {
    background: #0096fd;
    padding: 10px;
    fill: white;
    border-radius: 5px;
    max-width: 60px;
    min-width: 50px;
}

.title-icon {
    height: 100% !important;
    width: 100% !important;
    max-width: 100%;
    position: absolute;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: white;
}

.task-div {
    padding: 10px;
    border: 2px solid darkgrey;
}

.border-bottom-zero {
    border-bottom: 0 !important;
}

.menu {
    /* position: absolute; */
    background-color: white;
    /* border: 1px solid #ccc; */
    padding: 10px;
    /* z-index: 999; */
    /* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; */
    /* border-radius: 5px; */
    width: 300px;
}

.menu ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.menu li {
    padding: 5px 0;
    cursor: pointer;
}

.menu li:hover {
    background-color: #f0f0f0;
}

.alphabet-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.alphabet-grid .item {
    width: calc(16.666% - 20px);
    margin-bottom: 20px;
    text-align: center;
    padding: 2px;
    border-radius: 5px;
}

.alphabet-grid .item:hover {
    color: brown;
}

.search-box {
    display: flex;
    align-items: center;
    width: 100%;
    padding-left: 10px;
    border-radius: 10px;
    border: 1px solid darkgray;
}

.user-name {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 400;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    border: 1px solid #f4f4f4;
    margin-bottom: 5px;
}

.user-name:hover {
    background: #f7f7f7;
}

.add-item {
    border-radius: 5px !important;
    cursor: pointer;
}

.assign-sub-titles {
    font-size: larger;
}

textarea {
    min-height: 100px;
    width: 100%;
    padding-left: 10px;
    font-size: large;
    font-weight: bolder;
}

.dlt-img {
    right: 20px;
    top: 5px;
    color: white;
    cursor: pointer;
    font-weight: 900;
}

.img-div:hover .assign-img {
    opacity: 0.3;
}

.img-div:hover .dlt-img {
    font-size: larger;

    color: red !important;
}

.sub-heading {
    border: none;
    border-bottom: 1px solid gray;
    background: transparent;
    height: 40px;
    font-size: x-large;
    margin-top: 5px;
}

.sub-heading:focus-visible {
    border: none;
    border-bottom: 1px solid #0096fd;
    outline: none;
}

@media (max-width: 617px) {
    .due-menu {
        right: 1px;
    }
}
</style>
<style lang="scss">
@import "~@core/scss/vue/libs/vue-select.scss";

.add-team {
    border: 3px dotted darkgrey !important;
}

.add-team {
    button {
        border: 0px !important;
    }
}
</style>
<style lang="scss" scoped>
@import "~@core/scss/base/bootstrap-extended/include";
@import "~@core/scss/base/components/variables-dark";

.dark-layout {
    .bi-grip-vertical {
        color: white;
    }

    .check-input {
        color: white;
    }

    .menu {
        color: #b4b7bd;
        background: #283046;
    }

    .user-name {
        background-color: #283046 !important;
    }

    .user-name:hover {
        background-color: rgba(115, 103, 240, 0.12) !important;
    }

    .bi-check2 {
        color: yellow !important;
    }

    input {
        background-color: #283046 !important;
        color: white;
    }

    textarea {
        background-color: #283046 !important;
        color: white;
    }

    .card-custom {
        background-color: #283046 !important;
    }
}

.card-custom {
    background-color: #f4f4f4 !important;
}
</style>

<style lang="scss">
.assign-dropdown {
    .dropdown-toggle {
        padding: 0;
    }

    .dropdown-item:hover,
    .dropdown-item:focus {
        background-color: inherit !important;
    }

    .b-dropdown-text {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
</style>
