<template>
    <div>
        <edit-project
            v-if="dialog.show.project.edit"
            :showing="dialog.show.project.edit"
            @closeDialog="dialog.toggleDialog('project', 'edit')"
        />
        <add-project
            v-if="dialog.show.project.add"
            :showing="dialog.show.project.add"
            @closeDialog="dialog.toggleDialog('project', 'add')"
        />
        <add-document
            :is-add-document-active.sync="isAddDocumentActive"
            v-if="isAddDocumentActive"
        />
        <b-card>
            <QuickAction />
            <!-- <div class="m-2">
        <b-row>
          <b-col cols="12" md="8" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
            <v-select v-model="perPage" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" :options="perPageOptions"
              :clearable="false" class="per-page-selector d-inline-block mx-50" />
            <label>{{ t('records per page') }}</label>
            <b-button variant="primary" @click="dialog.toggleDialog('project', 'add')" v-if="$can('projects-add', 'all')"
              class="ml-3">
              <span class="text-nowrap">Add Project</span>
            </b-button>
            <b-button variant="primary" @click="isAddDocumentActive = true" v-if="$can('projects-add-documents', 'all')"
              class="ml-3">
              <span class="text-nowrap">Add Document</span>
            </b-button>
          </b-col>
          <b-col cols="12" md="4">
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input v-model="searchQuery" class="d-inline-block mr-1" :placeholder="t('Search...')" />
            </div>
          </b-col>
        </b-row>
      </div> -->
            <b-overlay
                id="overlay-background"
                :show="busy"
                variant="transparent"
                rounded="sm"
            >
                <b-table
                    @row-clicked="viewProject"
                    ref="refListTable"
                    id="projectTable"
                    class="position-relative cursor-pointer"
                    :items="availableData.rows"
                    responsive
                    :fields="availableData.columns"
                    show-empty
                    :empty-text="t('No matching records found')"
                    style="min-height: 60vh"
                >
                    <template #head()="scope">
                        <div
                            class="text-nowrap d-flex align-items-center justify-content-between"
                            v-if="scope.label === 'No.'"
                            style="cursor: pointer"
                            @click="filters.sortDesc = !filters.sortDesc"
                        >
                            {{ scope.label }}
                            <div class="d-flex flex-column">
                                <feather-icon
                                    icon="ChevronUpIcon"
                                    :class="
                                        !filters.sortDesc
                                            ? 'text-black'
                                            : 'text-muted'
                                    "
                                />
                                <feather-icon
                                    icon="ChevronDownIcon"
                                    :class="
                                        filters.sortDesc
                                            ? 'text-black'
                                            : 'text-muted'
                                    "
                                />
                            </div>
                        </div>
                        <div
                            v-else
                            class="text-nowrap d-flex align-items-center justify-content-between"
                            style="margin-top: 5px"
                        >
                            {{ scope.label }}
                        </div>
                    </template>
                    <template #cell(start_date)="data">
                        <p class="text-capitalize m-0">
                            {{ moment(data.value).format("L") }}
                        </p>
                    </template>
                    <template #cell(end_date)="data">
                        <p class="text-capitalize m-0">
                            {{ moment(data.value).format("L") }}
                        </p>
                    </template>
                    <template #cell(status)="data">
                        <p
                            :class="
                                data.value == 'completed'
                                    ? 'completed'
                                    : 'incompleted'
                            "
                            class="text-capitalize text-center m-0"
                            style="padding: 4px; border-radius: 4px"
                        >
                            {{
                                data.value ? data.value.replace(/_/g, " ") : ""
                            }}
                        </p>
                    </template>
                    <template #cell(action)="data">
                        <b-dropdown variant="link" no-caret>
                            <template #button-content>
                                <feather-icon
                                    icon="MoreVerticalIcon"
                                    size="16"
                                    class="align-middle text-body"
                                />
                            </template>
                            <b-dropdown-item
                                @click="
                                    $router.push({
                                        path: `/project/${data.item.id}`,
                                    })
                                "
                            >
                                <feather-icon icon="EyeIcon" />
                                <span class="align-middle ml-50">{{
                                    t("View")
                                }}</span>
                            </b-dropdown-item>
                            <b-dropdown-item @click="editProject(data.item.id)">
                                <feather-icon icon="EditIcon" />
                                <span class="align-middle ml-50">{{
                                    t("Edit")
                                }}</span>
                            </b-dropdown-item>

                            <b-dropdown-item
                                @click="deleteProject(data.item.id)"
                            >
                                <feather-icon icon="TrashIcon" />
                                <span class="align-middle ml-50">{{
                                    t("Delete")
                                }}</span>
                            </b-dropdown-item>
                        </b-dropdown>
                    </template>
                </b-table>
            </b-overlay>
            <div class="mx-2 mb-2">
                <b-row>
                    <b-col
                        cols="12"
                        sm="6"
                        class="d-flex align-items-center justify-content-center justify-content-sm-start"
                    >
                        <span class="text-muted"
                            >{{ t("Showing") }} {{ dataMeta.from }}
                            {{ t("to") }} {{ dataMeta.to }} {{ t("of") }}
                            {{ dataMeta.of }} {{ t("entries") }}</span
                        >
                    </b-col>
                    <!-- Pagination -->
                    <b-col
                        cols="12"
                        sm="6"
                        class="d-flex align-items-center justify-content-center justify-content-sm-end"
                    >
                        <b-pagination
                            v-model="pagination.current_page"
                            :total-rows="pagination.total"
                            :per-page="pagination.per_page"
                            first-number
                            last-number
                            class="mb-0 mt-1 mt-sm-0"
                            prev-class="prev-item"
                            next-class="next-item"
                            :key="pagination.current_page"
                            @change="onPagination"
                        >
                            <template #prev-text>
                                <feather-icon
                                    icon="ChevronLeftIcon"
                                    size="18"
                                />
                            </template>
                            <template #next-text>
                                <feather-icon
                                    icon="ChevronRightIcon"
                                    size="18"
                                />
                            </template>
                        </b-pagination>
                    </b-col>
                </b-row>
            </div>
        </b-card>
    </div>
</template>

<script>
import {
    BCard,
    BRow,
    BCol,
    BTable,
    BOverlay,
    BButton,
    BDropdown,
    BFormInput,
    BPagination,
    BDropdownItem,
} from "bootstrap-vue";
import { ref, onMounted, computed, watch } from "@vue/composition-api";
import vSelect from "vue-select";
import useProjects from "@/composables/projects";
import { useUtils as useI18nUtils } from "@core/libs/i18n";
import i18n from "@/libs/i18n";
import AddProject from "./dialogs/AddProject.vue";
import AddDocument from "./dialogs/AddDocument.vue";
import EditProject from "./dialogs/EditProject.vue";
import QuickAction from "./header/quick-action.vue";
import moment from "moment";
import router from "@/router";
import { filter } from "lodash";

export default {
    components: {
        BCol,
        BRow,
        BCard,
        BTable,
        vSelect,
        BButton,
        BOverlay,
        BDropdown,
        AddProject,
        BFormInput,
        BPagination,
        AddDocument,
        EditProject,
        BDropdownItem,
        QuickAction,
    },
    setup(_, { root }) {
        const {
            busy,
            sortBy,
            filters,
            perPage,
            projects,
            dataMeta,
            respResult,
            refetchData,
            searchQuery,
            tableColumns,
            currentPage,
            totalRecords,
            refListTable,
            deleteProject,
            isSortDirDesc,
            fetchProjects,
            perPageOptions,
            dialog,
            columns,
            availableData,
            pagination,
        } = useProjects();

        const { t } = useI18nUtils();

        const viewProject = (data) => {
            router.push({ path: `/project/${data.id}` });
        };

        onMounted(() => {
            fetchProjects();
            watch(
                () => ({
                    date: filters.date,
                    search: filters.search,
                    customer_id: filters.customer_id,
                    sortBy: filters.sortBy,
                    sortDesc: filters.sortDesc,
                    accordion: filters.accordion.map(({ key, model }) => ({
                        key,
                        model,
                    })),
                }),
                () => {
                    fetchProjects();
                },
                { deep: true }
            );
        });
        const isExportActive = ref(false);
        const isAddProjectActive = ref(false);
        const isAddDocumentActive = ref(false);
        const isEditProjectActive = ref(false);
        const project = ref({});
        const deleteConfirmed = async (id) => {
            await deleteProject(id);
            if (respResult.value.status === 200) {
                fetchProjects();
            }
        };

        const editProject = (id) => {
            dialog.toggleDialog("project", "edit");
            dialog.temp.project.data = projects.value.find(
                (item) => item.id === id
            );
            dialog.temp.project.id = id;
        };

        const onPagination = (page) => {
            pagination.current_page = page;
            // router.replace(
            //     {
            //         query: Object.assign({ ...customerSuppliers.params.filter }),
            //     },
            //     () => { }
            // );
            fetchProjects();
        };

        const confirmDelete = async (id) => {
            root.$bvModal
                .msgBoxConfirm(
                    i18n.t("Please confirm that you want to delete project."),
                    {
                        title: i18n.t("Please Confirm"),
                        size: "sm",
                        okTitle: i18n.t("Confirm"),
                        cancelTitle: i18n.t("Cancel"),
                    }
                )
                .then((value) => {
                    if (value) {
                        deleteConfirmed(id);
                    }
                });
        };

        return {
            t,
            busy,
            sortBy,
            filters,
            project,
            perPage,
            projects,
            dataMeta,
            refetchData,
            editProject,
            searchQuery,
            currentPage,
            tableColumns,
            totalRecords,
            refListTable,
            isSortDirDesc,
            confirmDelete,
            perPageOptions,
            isExportActive,
            fetchProjects,
            isAddProjectActive,
            isAddDocumentActive,
            isEditProjectActive,
            dialog,
            columns,
            availableData,
            moment,
            deleteProject,
            pagination,
            onPagination,
            viewProject,
        };
    },
};
</script>
<style lang="scss">
@import "~@core/scss/vue/libs/vue-select.scss";

#projectTable {
    /* Hide the first <th> in each table */
    th:first-child {
        display: none !important;
    }

    /* Hide the first <td> in each table */
    td:first-child {
        display: none !important;
    }
}

#projectTable th,
#projectTable td {
    padding: 0.72rem 1rem;
}

#projectTable .cate-badge {
    padding: 8px;
    border-radius: 5px;
}

#projectTable .tb-status {
    min-width: 150px;
}

#projectTable .tb-date {
    min-width: 150px;
}

#projectTable .tb-title {
    min-width: 120px;
}

#projectTable .tb-desc {
    min-width: 250px;
}

#projectTable .tb-cate {
    min-width: 150px;
}

#projectTable .tb-location {
    min-width: 150px;
}

#projectTable .tb-assign {
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
