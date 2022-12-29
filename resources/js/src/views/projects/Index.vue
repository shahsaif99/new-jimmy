<template>
  <div>
    <edit-project
      :is-edit-project-active.sync="isEditProjectActive"
      v-if="isEditProjectActive"
      :project="project"
      @refetch-data="fetchProjects"
    />
    <add-project
      :is-add-project-active.sync="isAddProjectActive"
      v-if="isAddProjectActive"
      @refetch-data="fetchProjects"
    />
    <add-document
      :is-add-document-active.sync="isAddDocumentActive"
      v-if="isAddDocumentActive"
    />
    <b-card
      no-body
      class="mb-0"
    >
      <div class="m-2">
        <b-row>
          <b-col
            cols="12"
            md="8"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          >
            <label>Show</label>
            <v-select
              v-model="perPage"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="perPageOptions"
              :clearable="false"
              class="per-page-selector d-inline-block mx-50"
            />
            <label>entries</label>
            <b-button
              variant="primary"
              @click="isAddProjectActive = true"
              v-if="$can('projects-add', 'all')"
              class="ml-3"
            >
              <span class="text-nowrap">Add Project</span>
            </b-button>
            <b-button
              variant="primary"
              @click="isAddDocumentActive=true"
              v-if="$can('projects-add-documents', 'all')"
              class="ml-3"
            >
              <span class="text-nowrap">Add Document</span>
            </b-button>
          </b-col>
          <b-col
            cols="12"
            md="4"
          >
            <div
              class="d-flex align-items-center justify-content-end"
            >
              <b-form-input
                v-model="searchQuery"
                class="d-inline-block mr-1"
                placeholder="Search..."
              />
            </div>
          </b-col>
        </b-row>
      </div>
      <b-overlay
        id="overlay-background"
        :show="busy"
        variant="transparent"
        rounded="sm"
      >
        <b-table
          ref="refListTable"
          class="position-relative"
          :items="projects"
          responsive
          :fields="tableColumns"
          primary-key="id"
          :sort-by.sync="sortBy"
          show-empty
          empty-text="No matching records found"
          :sort-desc.sync="isSortDirDesc"
        >
          <template #cell(actions)="data">
            <b-dropdown
              variant="link"
              no-caret
            >
              <template #button-content>
                <feather-icon
                  icon="MoreVerticalIcon"
                  size="16"
                  class="align-middle text-body"
                />
              </template>
              <b-dropdown-item
                @click="editProject(data.item)"
              >
                <feather-icon icon="EditIcon" />
                <span class="align-middle ml-50">Edit</span>
              </b-dropdown-item>
              <b-dropdown-item
                @click="confirmDelete(data.item.id)"
              >
                <feather-icon
                  icon="TrashIcon"
                />
                <span class="align-middle ml-50">Delete</span>
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
            <span
              class="text-muted"
            >Showing {{ dataMeta.from }} to {{ dataMeta.to }} of
              {{ dataMeta.of }} entries</span>
          </b-col>
          <!-- Pagination -->
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-end"
          >
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRecords"
              :per-page="perPage"
              first-number
              last-number
              class="mb-0 mt-1 mt-sm-0"
              prev-class="prev-item"
              next-class="next-item"
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
} from 'bootstrap-vue'
import { ref, onMounted } from '@vue/composition-api'
import vSelect from 'vue-select'
import useProjects from '@/composables/projects'
import AddProject from './dialogs/AddProject.vue'
import AddDocument from './dialogs/AddDocument.vue'
import EditProject from './dialogs/EditProject.vue'

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
    } = useProjects()

    onMounted(() => {
      fetchProjects()
    })
    const isExportActive = ref(false)
    const isAddProjectActive = ref(false)
    const isAddDocumentActive = ref(false)
    const isEditProjectActive = ref(false)
    const project = ref({})
    const deleteConfirmed = async id => {
      await deleteProject(id)
      if (respResult.value.status === 200) {
        fetchProjects()
      }
    }

    const editProject = item => {
      project.value = item
      isEditProjectActive.value = true
    }


    const confirmDelete = async id => {
      root.$bvModal
        .msgBoxConfirm('Please confirm that you want to delete project.', {
          title: 'Please Confirm',
          size: 'sm',
        })
        .then(value => {
          if (value) {
            deleteConfirmed(id)
          }
        })
    }
    return {
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
    }
  },
}
</script>
  <style scoped>
  .per-page-selector {
    width: 90px;
  }
  </style>

  <style lang="scss">
  @import '~@core/scss/vue/libs/vue-select.scss';
  </style>
