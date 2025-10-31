<template>
    <div>
        <b-card>
            <QuickOptions />

            <div class="d-flex mt-2 mb-3">
                <button
                    class="btn d-flex align-items-center"
                    :class="showMyTasks ? 'btn-primary' : 'btn-light'"
                    @click="toggleTaskView(true)">
                    My tasks
                </button>
                <button
                    class="btn d-flex align-items-center ml-2"
                    :class="!showMyTasks ? 'btn-primary' : 'btn-light'"
                    @click="toggleTaskView(false)">
                    All tasks
                </button>
            </div>

            <b-overlay id="overlay-background" variant="transparent" rounded="sm">
                <b-table ref="refTaskTable" id="taskTable" class="position-relative" :items="availableData.rows"
                    responsive :fields="availableData.columns" show-empty :key="availableData.rows.length"
                    style="min-height: 60vh">
                    <template #cell(start_date)="data">
                        <div class="d-flex align-items-center tb-date">
                            <div v-if="!!data.value">
                                <feather-icon class="text-primary" icon="CalendarIcon" size="20" />
                                <span class="mx-1"> {{ data.value }}</span>
                            </div>
                            <span class="text-center" v-else>
                                <feather-icon class="text-primary" icon="MinusIcon" size="20" /></span>
                        </div>
                    </template>
                    <template #cell(title)="data">
                        <div class="tb-title">
                            {{ data.value }}
                        </div>
                    </template>
                    <template #cell(description)="data">
                        <div class="tb-desc">
                            {{ data.value }}
                        </div>
                    </template>
                    <template #cell(location)="data">
                        <div class="tb-location">
                            {{
                                `${data.value.room} ${data.value.floor} ${data.value.area}`
                            }}
                        </div>
                    </template>
                    <template #cell(users)="data">
                        <div v-if="data.value[0]" class="tb-assign">
                            <b-media vertical-align="center">
                                <template #aside>
                                    <b-avatar size="32" :src="data.value[0].avatar"
                                        :text="avatarText(data.value[0].name)" :variant="`light-${resolveUserRoleVariant(
                                            data.value[0].name
                                        )}`" :to="{
                                            name: 'users-edit',
                                            params: { id: data.value[0].id },
                                        }" />
                                </template>
                                <b-link :to="{
                                    name: 'users-edit',
                                    params: { id: data.value[0].id },
                                }">
                                    {{ data.value[0].name }}
                                </b-link>
                            </b-media>
                        </div>
                    </template>
                    <template #cell(category)="data">
                        <div class="tb-cate">
                            <span style="
                                    border: 1px solid #d8d8d8;
                                    min-width: 150px;
                                    text-align: center;
                                " :class="`border d-inline-block justify-content-center cate-badge`">
                                {{ data.value.name }}
                            </span>
                        </div>
                    </template>
                    <template #cell(status)="data">
                        <div v-if="userData.role === 'Admin'" class="tb-status">
                            <b-dropdown :style="{
                                border:
                                    skin === 'dark'
                                        ? '1px solid #cbb9b961 !important'
                                        : '',
                                width: '130px',
                                backgroundColor:
                                    skin === 'light'
                                        ? statusOptions.find(
                                            (item) =>
                                                item.status === data.value
                                        ).bgColor
                                        : '',
                            }" variant="link" no-caret>
                                <template #button-content>
                                    <span :style="{
                                        fontWeight: '500',
                                        color:
                                            statusOptions.find(
                                                (item) =>
                                                    item.status ===
                                                    data.value
                                            ).textColor + '!important',
                                    }" class="text-capitalize">{{ data.value }}</span>
                                </template>
                                <b-dropdown-item class="text-capitalize" v-for="(item, index) in statusOptions"
                                    :key="index" @click="
                                        updateStatus(item.status, data.item.id)
                                        ">
                                    {{ item.status }}
                                </b-dropdown-item>
                            </b-dropdown>
                        </div>

                        <div v-else class="tb-location text-capitalize">
                            {{ data.value }}
                        </div>
                    </template>
                    <template #cell(actions)="data">
                        <div v-if="userData.role === 'Admin'" style="width: 180px; gap: 10px"
                            class="d-flex align-items-center">
                            <b-button @click="openSideBar(data.item.id)" variant="primary" size="sm">
                                View task
                            </b-button>
                            <feather-icon @click="setAssignToEdit(data.item.id)" icon="EditIcon" size="16"
                                class="mx-1 cursor-pointer" />

                            <feather-icon icon="TrashIcon" class="cursor-pointer" size="16"
                                @click="deleteTask(data.item.id)" />
                        </div>
                        <div style="width: 100px" v-else>
                            <b-button @click="openSideBar(data.item.id)"  variant="primary" size="sm">
                                <span>  View task </span>
                            </b-button>
                        </div>
                    </template>
                </b-table>
            </b-overlay>
            <div class="mx-2 mb-2">
                <b-row>
                    <b-col cols="12" sm="6"
                        class="d-flex align-items-center justify-content-center justify-content-sm-start">
                        <span class="text-muted">{{ t("Showing") }} {{ dataMeta.from }}
                            {{ t("to") }} {{ dataMeta.to }} {{ t("of") }}
                            {{ dataMeta.of }} {{ t("entries") }}</span>
                    </b-col>

                    <!-- Pagination -->
                    <b-col cols="12" sm="6"
                        class="d-flex align-items-center justify-content-center justify-content-sm-end">
                        <b-pagination v-model="pagination.current_page" :total-rows="pagination.total"
                            :per-page="pagination.per_page" first-number last-number class="mb-0 mt-1 mt-sm-0"
                            prev-class="prev-item" next-class="next-item" :key="pagination.current_page"
                            @change="onPagination">
                            <template #prev-text>
                                <feather-icon icon="ChevronLeftIcon" size="18" />
                            </template>
                            <template #next-text>
                                <feather-icon icon="ChevronRightIcon" size="18" />
                            </template>
                        </b-pagination>
                    </b-col>
                </b-row>
            </div>
        </b-card>

        <!-- <AddTaskDialog /> -->

        <Assign v-if="dialog.show" :isAddTask="true" :showing="dialog.show" @closeDialog="dialog.toggleDialog" />
        <ManageDialog v-if="manageCateDialog.show" :showing="manageCateDialog.show"
            @closeDialog="manageCateDialog.toggleDialog" />
        <VIewSideBar v-if="isTaskDetailsActive" :id="selectedTask"  @close="isTaskDetailsActive = false"
        :isOpen="isTaskDetailsActive" />
    </div>
</template>

<script>
import useAppConfig from "@core/app-config/useAppConfig";
import { VueGoodTable } from "vue-good-table";
import tableDragger from "table-dragger";
import { onMounted, ref, watch, computed } from "@vue/composition-api";
import QuickOptions from "./header/QuickOptions.vue";
import VIewSideBar from "@/views/tasks/sidebar/work-order.vue";
import {
    BButton,
    BCard,
    BOverlay,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BPagination,
    BCol,
    BRow,
    BDropdownItem,
    BDropdown,
} from "bootstrap-vue";
import "vue-good-table/dist/vue-good-table.css";
import vSelect from "vue-select";
import useTasks from "@/composables/tasks";
import useCategories from "@/composables/categories";
import AddTaskDialog from "./dialogs/AddTask.vue";
import Assign from "@/views/checklist/dialogs/Assign.vue";
import ManageDialog from "@/views/tasks/dialogs/ManageCategory.vue";
import useUsers from "@/composables/users";
import { avatarText } from "@core/utils/filter";
import { useUtils as useI18nUtils } from "@core/libs/i18n";
import router from "@/router";
import useJwt from "@/auth/jwt/useJwt";

export default {
    components: {
        BCard,
        BOverlay,
        BTable,
        QuickOptions,
        AddTaskDialog,
        Assign,
        VueGoodTable,
        vSelect,
        ManageDialog,
        BMedia,
        BAvatar,
        BLink,
        BCol,
        BPagination,
        BRow,
        BButton,
        BDropdownItem,
        BDropdown,
        VIewSideBar
    },
    setup() {
        const refTaskTable = ref(null);
        const { skin } = useAppConfig();
        const {
            statusOptions,
            availableData,
            showCompleted,
            dialog,
            getTasks,
            tasks,
            deleteTask,
            pagination,
            updateTaskStatus,
            setAssignToEdit,
            getUnreadNotifications,
            markAllAsReadNotifications,
            filters,
        } = useTasks();

        const selectedTask = ref(null);
        const isTaskDetailsActive = ref(false);
        const showMyTasks = ref(false);

        const userData = JSON.parse(useJwt.getUserData());
        const { t } = useI18nUtils();

        const { categoryStyles, manageCateDialog, getCategories } =
            useCategories();

        const { resolveUserRoleVariant } = useUsers();

        const getRandomNumber = () => {
            return Math.floor(Math.random() * categoryStyles.length);
        };

        const toggleTaskView = (isMyTasks) => {
            showMyTasks.value = isMyTasks;

            // Find the user_id filter in the accordion
            const userFilter = filters.accordion.find(item => item.key === 'user_id');

            if (isMyTasks) {
                // Set filter to current user's ID for "My tasks"
                if (userFilter) {
                    userFilter.model = userData.id;
                }
            } else {
                // Clear the filter for "All tasks"
                if (userFilter) {
                    userFilter.model = '';
                }
            }
        };

        const openSideBar = (id) => {
            selectedTask.value = id;
            isTaskDetailsActive.value = true;
        };

        onMounted(async () => {
            // Initialize with "All tasks" view
            toggleTaskView(false);
            getTasks(router.history.current.query);
            getCategories();
            markAllAsReadNotifications();
            watch(
                availableData,
                () => {
                    if (
                        !availableData.value.rows ||
                        availableData.value.rows.length === 0
                    )
                        return;

                    const el = document.querySelector(".b-table");
                    tableDragger(el, {
                        mode: "column",
                        dragHandler: "th",
                        onlyBody: true,
                        animation: 300,
                    });
                },
                { deep: true }
            );
        });

        const dataMeta = computed(() => {
            const from =
                (pagination.current_page - 1) * pagination.per_page + 1;
            const to = Math.min(
                pagination.total,
                pagination.current_page * pagination.per_page
            );
            return {
                from,
                to,
                of: pagination.total,
            };
        });

        const onPagination = (page) => {
            pagination.current_page = page;
            if (router.history.current.name !== "project") {
                router.replace(
                    {
                        query: Object.assign({ ...tasks.params.filter }),
                    },
                    () => { }
                );
            }
            getTasks();
        };

        const updateStatus = ($event, id) => {
            updateTaskStatus($event, id);
        };

        return {
            refTaskTable,
            availableData,
            categoryStyles,
            statusOptions,
            showCompleted,
            dialog,
            manageCateDialog,
            tasks,
            resolveUserRoleVariant,
            avatarText,
            deleteTask,
            pagination,
            dataMeta,
            t,
            getRandomNumber,
            updateTaskStatus,
            setAssignToEdit,
            onPagination,
            userData,
            updateStatus,
            skin,
            selectedTask,
            isTaskDetailsActive,
            openSideBar,
            showMyTasks,
            toggleTaskView
        };
    },
};
</script>

<style lang="scss">
@import "~@core/scss/vue/libs/vue-select.scss";

#task-headers .dropdown-menu #list-dropdown {
    min-width: 250px;
    padding: 0px;
}

#taskTable th,
#taskTable td {
    padding: 0.72rem 1rem;
}

#taskTable .cate-badge {
    padding: 8px;
    border-radius: 5px;
}

#taskTable .tb-status {
    min-width: 150px;
}

#taskTable .tb-date {
    min-width: 150px;
}

#taskTable .tb-title {
    min-width: 120px;
}

#taskTable .tb-desc {
    min-width: 250px;
}

#taskTable .tb-cate {
    min-width: 150px;
}

#taskTable .tb-location {
    min-width: 150px;
}

#taskTable .tb-assign {
    min-width: 120px;
}

.mx-datepicker {
    input {
        background: transparent !important;
        border: 1px solid #7367f0;
        color: #7367f0;
        padding: 18px 10px;
        border-radius: 5px;
    }

    .mx-icon-calendar {
        color: #7367f0;
    }
}

.tb-status {
    .btn-group {
        border: 0px !important;
    }
}
</style>
