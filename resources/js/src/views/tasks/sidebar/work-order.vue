<template>
    <div>
        <b-sidebar
            @hidden="close"
            width="550px"
            :visible="isOpen"
            backdrop
            no-header
            right
        >
            <template #default="{ hide }">
                <div class="p-1 h-full bg-white" style="min-height: 100%;">
                    <h4 id="sidebar-no-header-title">
                        {{ tabsOptions[currentTab] }}
                    </h4>
                    <b-tabs v-model="currentTab" content-class="mt-1" justified>
                        <b-tab title="Work Order" active>
                            <b-card v-if="task.data">
                                <b-overlay
                                    id="overlay-background"
                                    variant="transparent"
                                    rounded="sm"
                                >
                                    <div>
                                        <h2>
                                            {{ task.data.title || "No Title" }}
                                        </h2>
                                        <ul class="mt-2">
                                            <li
                                                v-if="task.data.img"
                                                class="list"
                                            >
                                                <span
                                                    class="value border rounded"
                                                >
                                                    <img
                                                        class="rounded"
                                                        width="250"
                                                        :src="task.data.img"
                                                        alt="Task Image"
                                                    />
                                                </span>
                                            </li>
                                            <li
                                                v-if="task.data.location"
                                                class="list"
                                            >
                                                <span class="label"
                                                    >Location</span
                                                >
                                                <span class="value">
                                                    {{
                                                        task.data.location
                                                            .area || "N/A"
                                                    }}
                                                    {{
                                                        task.data.location
                                                            .floor || ""
                                                    }}
                                                    {{
                                                        task.data.location
                                                            .room || ""
                                                    }}
                                                </span>
                                            </li>
                                            <li
                                                v-if="task.data.category"
                                                class="list"
                                            >
                                                <span class="label"
                                                    >Category</span
                                                >
                                                <span class="value">{{
                                                    task.data.category.name ||
                                                    "Uncategorized"
                                                }}</span>
                                            </li>
                                            <li
                                                v-if="task.data.priority"
                                                class="list"
                                            >
                                                <span class="label"
                                                    >Priority</span
                                                >
                                                <span class="value">
                                                    <i
                                                        v-if="
                                                            priorityIcons[
                                                                task.data.priority.toLowerCase()
                                                            ]
                                                        "
                                                        :class="`bi ${
                                                            priorityIcons[
                                                                task.data.priority.toLowerCase()
                                                            ]
                                                        }`"
                                                    >
                                                    </i>
                                                    {{ task.data.priority }}
                                                </span>
                                            </li>
                                            <li
                                                v-if="task.data.status"
                                                class="list"
                                            >
                                                <span class="label"
                                                    >Status</span
                                                >
                                                <span class="value">
                                                    <i
                                                        v-if="
                                                            statusIcons[
                                                                task.data.status
                                                            ]
                                                        "
                                                        :class="`bi ${
                                                            statusIcons[
                                                                task.data.status
                                                            ]
                                                        }`"
                                                    ></i>
                                                    {{ task.data.status }}
                                                </span>
                                            </li>
                                            <li
                                                v-if="task.data.description"
                                                class="list"
                                            >
                                                <span class="label"
                                                    >Description</span
                                                >
                                                <span class="value">{{
                                                    task.data.description ||
                                                    "No description available"
                                                }}</span>
                                            </li>
                                            <li
                                                v-if="
                                                    task.data.users &&
                                                    task.data.users.length > 0
                                                "
                                                class="list"
                                            >
                                                <span class="label"
                                                    >Assigned to</span
                                                >
                                                <span class="value">
                                                    <b-media
                                                        vertical-align="center"
                                                    >
                                                        <template #aside>
                                                            <b-avatar
                                                                size="32"
                                                                v-if="
                                                                    task.data
                                                                        .users[0]
                                                                        .avatar
                                                                "
                                                                :src="
                                                                    task.data
                                                                        .users[0]
                                                                        .avatar
                                                                "
                                                                :text="
                                                                    avatarText(
                                                                        task
                                                                            .data
                                                                            .users[0]
                                                                            .name ||
                                                                            'User'
                                                                    )
                                                                "
                                                                :variant="`light-${resolveUserRoleVariant(
                                                                    task.data
                                                                        .users[0]
                                                                        .name ||
                                                                        'User'
                                                                )}`"
                                                                :to="{
                                                                    name: 'users-edit',
                                                                    params: {
                                                                        id: task
                                                                            .data
                                                                            .users[0]
                                                                            .id,
                                                                    },
                                                                }"
                                                            />
                                                        </template>
                                                        <b-link
                                                            v-if="
                                                                task.data
                                                                    .users[0].id
                                                            "
                                                            :to="{
                                                                name: 'users-edit',
                                                                params: {
                                                                    id: task
                                                                        .data
                                                                        .users[0]
                                                                        .id,
                                                                },
                                                            }"
                                                        >
                                                            {{
                                                                task.data
                                                                    .users[0]
                                                                    .name ||
                                                                "Unnamed User"
                                                            }}
                                                        </b-link>
                                                    </b-media>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>

                                    <b-card
                                        v-if="task.data.checklist"
                                        class="d-flex card-custom"
                                        style="max-width: 500px"
                                    >
                                        <div class="d-flex">
                                            <div
                                                class="rounded"
                                                v-if="task.data.checklist.color"
                                                :style="{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    width: '50px',
                                                    height: '50px',
                                                    background:
                                                        task.data.checklist
                                                            .color,
                                                }"
                                            >
                                                <i
                                                    v-if="
                                                        task.data.checklist.icon
                                                    "
                                                    :style="{
                                                        color: '#fff',
                                                        fontSize: '20px',
                                                    }"
                                                    :class="
                                                        task.data.checklist.icon
                                                    "
                                                ></i>
                                            </div>
                                            <div
                                                style="
                                                    display: flex;
                                                    flex-direction: column;
                                                    align-items: start;
                                                "
                                            >
                                                <span
                                                    style="
                                                        font-size: 16px;
                                                        font-weight: 600;
                                                    "
                                                    class="ml-2 text-capitalize text-truncate"
                                                >
                                                    {{
                                                        task.data.checklist
                                                            .name ||
                                                        "Unnamed Checklist"
                                                    }}
                                                </span>
                                                <span
                                                    class="ml-2 text-capitalize"
                                                >
                                                    <strong
                                                        v-if="
                                                            task.data.checklist
                                                                .sections
                                                        "
                                                        >{{
                                                            task.data.checklist
                                                                .sections.length
                                                        }}</strong
                                                    >
                                                    Items
                                                </span>
                                            </div>
                                        </div>
                                    </b-card>
                                    <ul class="list-unstyled">
                                        <li class="mb-2">
                                            <strong>Project No:</strong>
                                            {{ task.data.project.project_no }}
                                        </li>
                                    </ul>

                                    <div
                                        v-if="userData.role === 'Admin'"
                                        style="width: 180px; gap: 10px"
                                        class="d-flex align-items-center"
                                    >
                                        <b-button
                                            :to="`/tasks/${props.id}/overview`"
                                            variant="primary"
                                            size="sm"
                                        >
                                            Detail View
                                        </b-button>
                                    </div>
                                    <div style="width: 100px" v-else>
                                        <b-button
                                     :to="`/tasks/${props.id}/overview`"
                                            variant="primary"
                                            size="sm"
                                        >
                                            <span
                                                v-if="
                                                    task.data.status ===
                                                        'in progress' ||
                                                    task.data.status ===
                                                        'completed'
                                                "
                                                >Detail View
                                            </span>
                                            <span v-else>Start task </span>
                                        </b-button>
                                    </div>
                                </b-overlay>
                            </b-card>
                        </b-tab>
                        <b-tab title="Comments">
                            <Comments
                                v-if="tabsOptions[currentTab] === 'Comments'"
                                :id="props.id"
                            />
                        </b-tab>
                    </b-tabs>
                </div>
            </template>
        </b-sidebar>
    </div>
</template>

<script>
import { onMounted, computed, watch, ref } from "@vue/composition-api";
import { useUtils as useI18nUtils } from "@core/libs/i18n";
import useTasks from "@/composables/tasks";
import useUsers from "@/composables/users";
import { avatarText } from "@core/utils/filter";
import useJwt from "@/auth/jwt/useJwt";
import Comments from "./comments.vue";

import {
    BSidebar,
    BTabs,
    BTab,
    BFormGroup,
    BFormInput,
    BButton,
    BFormRadio,
    BCard,
    BRow,
    BCol,
    BTable,
    BButtonGroup,
    BDropdown,
    BDropdownItem,
    BOverlay,
    BAvatar,
    BLink,
    BMedia,
} from "bootstrap-vue";

export default {
    components: {
        BSidebar,
        BFormGroup,
        BFormRadio,
        BCard,
        BTabs,
        BTab,
        BRow,
        BCol,
        BFormInput,
        BButton,
        BTable,
        BButtonGroup,
        BDropdown,
        BDropdownItem,
        BOverlay,
        BAvatar,
        BLink,
        BMedia,
        Comments,
    },
    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },
        id: {
            type: Number,
            required: true,
        },
    },
    setup(props, { emit }) {
        const { t } = useI18nUtils();
        const currentTab = ref(0);
        const tabsOptions = ["Work Order", "Comments"];
        const selectedTab = ref(0);

        const { task, getTaskById, updateTaskStatus } = useTasks();
        const { resolveUserRoleVariant } = useUsers();
        const userData = JSON.parse(useJwt.getUserData());

        const statusIcons = {
            open: "bi-circle text-primary",
            completed: "bi-circle text-warning",
            "in progress": "bi-circle text-dark",
            "on hold": "bi-circle text-success",
        };
        const priorityIcons = {
            critical: "bi-thermometer-high text-danger",
            high: "bi-reception-4 text-warning",
            medium: "bi-reception-3 text-secondary",
            low: "bi-reception-2 text-info",
            none: "bi-reception-0 text-primary",
        };

        const formatDate = (isoDateString) => {
            const date = new Date(isoDateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");

            return `${year}-${month}-${day}`;
        };

        onMounted(async () => {
            await getTaskById(props.id);
        });

        const close = () => {
            emit("close");
        };
        return {
            t,
            currentTab,
            tabsOptions,
            selectedTab,
            close,
            formatDate,
            task,
            userData,
            avatarText,
            resolveUserRoleVariant,
            statusIcons,
            priorityIcons,
            updateTaskStatus,
            props,
        };
    },
};
</script>

<style>
.list {
    display: flex;
    list-style: none;
    gap: 40px;
    margin-bottom: 15px;

    .label {
        font-size: medium;
        font-weight: 600;
        text-transform: capitalize;
        min-width: 200px;
    }

    .value {
        font-size: medium;

        text-transform: capitalize;
    }
}

ul {
    padding: 0;
    margin: 0;
}

.card-custom {
    background-color: #f4f4f4 !important;
}

.dark-layout {
    .card-custom {
        background-color: #283046 !important;
    }
}
</style>
