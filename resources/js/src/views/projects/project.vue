<template>
    <div v-if="projectData" class="project-dashboard">
        <!-- Header Section -->
        <div class="project-header mb-4">
            <div class="w-100">
                <h2 v-if="!apiHelpers.loading" class="project-title">
                    {{ projectData.project_no }} - {{ projectData.name }}
                </h2>
                <b-skeleton v-else animation="wave" width="20%"></b-skeleton>
                <div v-if="!apiHelpers.loading" class="project-company">
                    {{ projectData.customer_name }}
                </div>
                <b-skeleton v-else animation="wave" width="10%"></b-skeleton>
            </div>
            <div
                :class="
                    projectData.status == 'completed'
                        ? 'completed'
                        : 'incompleted'
                "
                style="width: 120px; padding: 5px"
                class="rounded text-capitalize text-center"
            >
                {{ projectData.status.replace(/_/g, " ") }}
            </div>
        </div>

        <BTabs>
            <BTab title="Dashboard" active>
                <BCard no-body class="p-2">
                    <div class="status-cards">
                        <BRow>
                            <BCol md="3">
                                <BCard class="status-card open-tasks">
                                    <div
                                        class="d-flex justify-content-between align-items-center"
                                    >
                                        <div class="w-100">
                                            <h4 class="mb-1">Open tasks</h4>
                                            <h3
                                                v-if="!apiHelpers.loading"
                                                class="mb-0"
                                            >
                                                {{ projectData.task_count }}
                                            </h3>
                                            <b-skeleton
                                                v-else
                                                animation="wave"
                                                width="40%"
                                            ></b-skeleton>
                                        </div>
                                        <i class="bi bi-pencil-square"></i>
                                    </div>
                                </BCard>
                            </BCol>

                            <BCol md="3">
                                <BCard class="status-card submitted-checklists">
                                    <div
                                        class="d-flex justify-content-between align-items-center"
                                    >
                                        <div class="w-100">
                                            <h4 class="mb-1">
                                                Submitted checklists
                                            </h4>
                                            <h3
                                                v-if="!apiHelpers.loading"
                                                class="mb-0"
                                            >
                                                {{
                                                    statusData.submittedChecklists
                                                }}
                                            </h3>
                                            <b-skeleton
                                                v-else
                                                animation="wave"
                                                width="40%"
                                            ></b-skeleton>
                                        </div>
                                        <i class="bi bi-question-circle"></i>
                                    </div>
                                </BCard>
                            </BCol>

                            <BCol md="3">
                                <BCard class="status-card safe-job-analysis">
                                    <div
                                        class="d-flex justify-content-between align-items-center"
                                    >
                                        <div class="w-100">
                                            <h4 class="mb-1">
                                                Safe Job Analysis
                                            </h4>
                                            <h3
                                                v-if="!apiHelpers.loading"
                                                class="mb-0"
                                            >
                                                {{ statusData.safeJobAnalysis }}
                                            </h3>
                                            <b-skeleton
                                                v-else
                                                animation="wave"
                                                width="40%"
                                            ></b-skeleton>
                                        </div>
                                        <i class="bi bi-x-circle"></i>
                                    </div>
                                </BCard>
                            </BCol>

                            <BCol md="3">
                                <BCard class="status-card pictures">
                                    <div
                                        class="d-flex justify-content-between align-items-center"
                                    >
                                        <div class="w-100">
                                            <h4 class="mb-1">Pictures</h4>
                                            <h3
                                                v-if="!apiHelpers.loading"
                                                class="mb-0"
                                            >
                                                {{ statusData.pictures }}
                                            </h3>
                                            <b-skeleton
                                                v-else
                                                animation="wave"
                                                width="40%"
                                            ></b-skeleton>
                                        </div>
                                        <i class="bi bi-check-circle"></i>
                                    </div>
                                </BCard>
                            </BCol>
                        </BRow>
                    </div>

                    <BRow>
                        <BCol>
                            <div class="project-details">
                                <div
                                    class="d-flex justify-content-between mb-1"
                                >
                                    <h3>Project Details</h3>
                                </div>

                                <div class="detail-item">
                                    <strong>Start date:</strong>
                                    <span v-if="!apiHelpers.loading">
                                        {{ formatDate(projectData.start_date) }}
                                    </span>
                                    <b-skeleton
                                        v-else
                                        animation="wave"
                                        width="5%"
                                    ></b-skeleton>
                                </div>
                                <div class="detail-item">
                                    <strong>End date:</strong>
                                    <span v-if="!apiHelpers.loading">
                                        {{ formatDate(projectData.end_date) }}
                                    </span>
                                    <b-skeleton
                                        v-else
                                        animation="wave"
                                        width="5%"
                                    ></b-skeleton>
                                </div>
                                <div class="detail-item">
                                    <strong>Project manager:</strong>
                                    <span v-if="!apiHelpers.loading">
                                        {{ projectData.project_manager_name }}
                                    </span>
                                    <b-skeleton
                                        v-else
                                        animation="wave"
                                        width="5%"
                                    ></b-skeleton>
                                </div>
                                <div class="detail-item">
                                    <strong>HSE manager:</strong>
                                    <span v-if="!apiHelpers.loading">
                                        {{
                                            projectData.project_hse_manager_name
                                        }}
                                    </span>
                                    <b-skeleton
                                        v-else
                                        animation="wave"
                                        width="5%"
                                    ></b-skeleton>
                                </div>
                                <div class="mt-3">
                                    <strong>Project description:</strong>
                                    <p v-if="!apiHelpers.loading" class="mt-2">
                                        {{ projectData.description }}
                                    </p>
                                    <b-skeleton
                                        v-else
                                        animation="wave"
                                        class="mt-1"
                                        width="20%"
                                    ></b-skeleton>
                                </div>
                            </div>
                        </BCol>
                    </BRow>
                </BCard>
            </BTab>

            <BTab title="Task">
                <Tasks />
            </BTab>

            <BTab title="Documents">
                <BCard no-body class="p-2">
                    <BCardTitle>Documents</BCardTitle>
                    <BCardText>Document management content goes here</BCardText>
                </BCard>
            </BTab>

            <BTab title="Checklists">
                <BCard no-body class="p-2">
                    <BCardTitle>Checklists</BCardTitle>
                    <BCardText>Checklist content goes here</BCardText>
                </BCard>
            </BTab>

            <BTab title="Safe Job Analysis">
                <BCard no-body class="p-2">
                    <BCardTitle>Safe Job Analysis</BCardTitle>
                    <BCardText>Safe job analysis content goes here</BCardText>
                </BCard>
            </BTab>

            <BTab title="Deviation">
                <BCard no-body class="p-2">
                    <BCardTitle>Deviation</BCardTitle>
                    <BCardText>Deviation tracking content goes here</BCardText>
                </BCard>
            </BTab>

            <BTab title="Crew list">
                <BCard no-body class="p-2">
                    <BCardTitle>Crew List</BCardTitle>
                    <BCardText>Crew management content goes here</BCardText>
                </BCard>
            </BTab>

            <BTab title="Pictures">
                <BCard no-body class="p-2">
                    <BCardTitle>Pictures</BCardTitle>
                    <BCardText>Project pictures gallery goes here</BCardText>
                </BCard>
            </BTab>
        </BTabs>
    </div>
</template>

<script>
import { onMounted, ref, watch, computed } from "@vue/composition-api";
import useProjects from "@/composables/projects";
import router from "@/router";
import Tasks from "@/views/tasks/index.vue";
import {
    BTabs,
    BTab,
    BNav,
    BNavItem,
    BRow,
    BCol,
    BCard,
    BButton,
    BCardTitle,
    BCardText,
    BSkeleton,
} from "bootstrap-vue";

export default {
    name: "ProjectDashboard",
    components: {
        BTabs,
        BTab,
        BNav,
        BNavItem,
        BRow,
        BCol,
        BCard,
        BButton,
        BCardTitle,
        BCardText,
        Tasks,
        BSkeleton,
    },

    setup() {
        const { getProject, project: projectData, apiHelpers } = useProjects();

        onMounted(async () => {
            await getProject(router.history.current.params.id);
        });

        const formatDate = (date) => {
            if (!date) return "N/A";
            const options = { year: "numeric", month: "short", day: "numeric" };
            return new Date(date).toLocaleDateString(undefined, options);
        };
        const getStatusClass = (status) => {
            switch (status) {
                case "in_progress":
                    return "text-warning";
                case "completed":
                    return "text-success";
                case "pending":
                    return "text-secondary";
                default:
                    return "text-muted";
            }
        };

        const statusData = ref({
            openTasks: 0,
            submittedChecklists: 0,
            safeJobAnalysis: 0,
            pictures: 0,
        });

        const handleEdit = () => {
            console.log("Edit button clicked");
        };

        return {
            projectData,
            handleEdit,
            formatDate,
            getStatusClass,
            statusData,
            apiHelpers,
        };
    },
};
</script>

<style lang="scss">
.project-dashboard {
    padding: 20px;

    .project-header {
        display: flex;
        justify-content: space-between;
        align-items: start;

        .project-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }

        .project-company {
            font-size: 1.1rem;
            color: #666;
        }

        .project-location {
            color: #666;

            i {
                margin-right: 5px;
            }
        }
    }

    .status-cards {
        .status-card {
            border-radius: 8px;
            border: none;

            h6 {
                color: #666;
                font-size: 0.9rem;
            }

            h3 {
                font-weight: 600;
            }

            i {
                font-size: 1.5rem;
            }

            &.open-tasks {
                background-color: #ffe4e4;
            }

            &.submitted-checklists {
                background-color: #fff3e0;
            }

            &.safe-job-analysis {
                background-color: #f3e5f5;
            }

            &.pictures {
                background-color: #e0f2f1;
            }
        }
    }

    .project-details {
        .detail-item {
            display: flex;
            gap: 10px;
            align-items: center;
            margin-bottom: 0.75rem;

            strong {
                color: #495057;
            }
        }
        .b-skeleton {
            margin: 0px;
        }
    }

    .map-container {
        height: 100%;
        min-height: 300px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}
</style>
