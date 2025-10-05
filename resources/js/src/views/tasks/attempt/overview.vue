<template>
    <div class="mt-2" v-if="task.data">
        <b-card>
            <b-overlay id="overlay-background" variant="transparent" rounded="sm">
                <div>
                    <h2>{{ task.data.title || 'No Title' }}</h2>
                    <ul class="mt-2">
                        <li v-if="task.data.img" class="list">
                            <span class="value border rounded">
                                <img class="rounded" width="250" :src="task.data.img" alt="Task Image" />
                            </span>
                        </li>
                        <li v-if="task.data.location" class="list">
                            <span class="label">Location</span>
                            <span class="value">
                                {{ task.data.location.area || 'N/A' }}
                                {{ task.data.location.floor || '' }}
                                {{ task.data.location.room || '' }}
                            </span>
                        </li>
                        <li v-if="task.data.category" class="list">
                            <span class="label">Category</span>
                            <span class="value">{{ task.data.category.name || 'Uncategorized' }}</span>
                        </li>
                        <li v-if="task.data.priority" class="list">
                            <span class="label">Priority</span>
                            <span class="value">
                                <i v-if="priorityIcons[task.data.priority.toLowerCase()]"
                                    :class="`bi ${priorityIcons[task.data.priority.toLowerCase()]}`">
                                </i>
                                {{ task.data.priority }}
                            </span>
                        </li>
                        <li v-if="task.data.status" class="list">
                            <span class="label">Status</span>
                            <span class="value">
                                <i v-if="statusIcons[task.data.status]"
                                    :class="`bi ${statusIcons[task.data.status]}`"></i>
                                {{ task.data.status }}
                            </span>
                        </li>
                        <li v-if="task.data.description" class="list">
                            <span class="label">Description</span>
                            <span class="value">{{ task.data.description || 'No description available' }}</span>
                        </li>
                        <li v-if="task.data.users && task.data.users.length > 0" class="list">
                            <span class="label">Assigned to</span>
                            <span class="value">
                                <b-media vertical-align="center">
                                    <template #aside>
                                        <b-avatar size="32" v-if="task.data.users[0].avatar"
                                            :src="task.data.users[0].avatar"
                                            :text="avatarText(task.data.users[0].name || 'User')"
                                            :variant="`light-${resolveUserRoleVariant(task.data.users[0].name || 'User')}`"
                                            :to="{
                                                name: 'users-edit',
                                                params: { id: task.data.users[0].id },
                                            }" />
                                    </template>
                                    <b-link v-if="task.data.users[0].id"
                                        :to="{ name: 'users-edit', params: { id: task.data.users[0].id } }">
                                        {{ task.data.users[0].name || 'Unnamed User' }}
                                    </b-link>
                                </b-media>
                            </span>
                        </li>
                    </ul>
                </div>

                <b-card v-if="task.data.checklist" class="d-flex card-custom" style="max-width: 500px">
                    <div class="d-flex">
                        <div class="rounded" v-if="task.data.checklist.color" :style="{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '50px',
                            height: '50px',
                            background: task.data.checklist.color
                        }">
                            <i v-if="task.data.checklist.icon" :style="{ color: '#fff', fontSize: '20px' }"
                                :class="task.data.checklist.icon"></i>
                        </div>
                        <div style="display: flex; flex-direction: column; align-items: start;">
                            <span style="font-size: 16px; font-weight: 600" class="ml-2 text-capitalize text-truncate">
                                {{ task.data.checklist.name || 'Unnamed Checklist' }}
                            </span>
                            <span class="ml-2 text-capitalize">
                                <strong v-if="task.data.checklist.sections">{{ task.data.checklist.sections.length
                                    }}</strong>
                                Items
                            </span>
                        </div>
                    </div>
                </b-card>

                <b-card v-if="task.data.project" class="mt-4 p-1 border-primary shadow-sm">
                    <h3 class="text-primary border-bottom pb-2 mb-3">Project Details</h3>
                    <ul class="list-unstyled">
                        <li class="mb-2"><strong>Project No:</strong> {{ task.data.project.project_no }}</li>
                        <li class="mb-2"><strong>Name:</strong> {{ task.data.project.name }}</li>
                        <li class="mb-2 d-flex align-items-center gx-5"><strong>Status:</strong>
                            <div :class="task.data.project.status == 'completed' ? 'completed' : 'incompleted'"
                                style="width: 120px; padding:5px" class="rounded text-capitalize text-center ml-1">

                                {{ task.data.project.status.replace(/_/g, ' ') }}
                            </div>
                        </li>
                        <li class="mb-2"><strong>Customer:</strong> {{ task.data.project.customer_name }}</li>
                        <li class="mb-2"><strong>Project Manager:</strong> {{ task.data.project.project_manager_name }}
                        </li>
                        <li class="mb-2"><strong>Start Date:</strong> {{ task.data.project.start_date }}</li>
                        <li class="mb-2"><strong>End Date:</strong> {{ task.data.project.end_date }}</li>
                        <li class="mb-2"><strong>Cost:</strong> ${{ task.data.project.cost }}</li>
                        <li class="mb-2"><strong>Description:</strong> {{ task.data.project.description }}</li>
                    </ul>
                </b-card>

                <div v-if="userData.role !== 'Admin'">
                    <button v-if="task.data.status === 'in progress'" class="btn btn-primary mt-4">
                        <router-link class="text-white" to="perform-task">Continue task</router-link>
                    </button>
                    <button v-else-if="task.data.status === 'completed'" class="btn btn-primary mt-4">
                        <router-link class="text-white" to="perform-task">View task</router-link>
                    </button>
                    <button v-else @click="updateTaskStatus('in progress', task.data.id)" class="btn btn-primary mt-4">
                        Start task
                    </button>
                </div>
                <div v-else>
                    <button class="btn btn-primary mt-4">
                        <router-link class="text-white" to="perform-task">View task</router-link>
                    </button>
                </div>
            </b-overlay>
        </b-card>
    </div>
</template>


<script>
import useTasks from "@/composables/tasks";
import useUsers from "@/composables/users";
import { onMounted } from "@vue/composition-api";
import { BOverlay, BAvatar, BLink, BMedia, BCard } from "bootstrap-vue";
import { avatarText } from "@core/utils/filter";
import useJwt from "@/auth/jwt/useJwt";

export default {
    components: { BOverlay, BAvatar, BLink, BMedia, BCard },
    setup(props, { emit, root }) {
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

        onMounted(async () => {
            await getTaskById(root.$route.params.id);
        });

        return {
            task,
            userData,
            avatarText,
            resolveUserRoleVariant,
            statusIcons,
            priorityIcons,
            updateTaskStatus,
        };
    },
};
</script>
<style lang="scss" scoped>
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
