<template>
  <div>

    <editProject
      :edit-project-active.sync="editProjectActive"
      v-if="editProjectActive"
    />
    <b-card>
      <h2>
        Projects
      </h2>
      <div class="mb-2">
        <b-col
          cols="auto"
        >
          <div class="d-flex align-items-center justify-content-end">
            <div v-if="localStorageData.role=='admin'">
              <b-button
                variant="primary"
                class="mr-2 px-5 mt-2"
                @click="addProjectActive=true"
              >
                <span class="text-nowrap">Add Project</span>
              </b-button>
            </div>
            <addProject
              :add-project-active.sync="addProjectActive"
              v-if="addProjectActive"
            />
            <b-button
              variant="primary"
              class="px-5 mt-2"
              @click="addDocumentActive=true"
            >
              <span class="text-nowrap">Add Document</span>
            </b-button>
            <addDocument
              :add-document-active.sync="addDocumentActive"
              v-if="addDocumentActive"
            />
          </div>
        </b-col>
        <div class="m-2">
          <b-row>
            <b-col
              cols="12"
              md="6"
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
            </b-col>
            <b-col
              cols="12"
              md="6"
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
            :items="staticData"
            responsive
            :fields="fields"
            primary-key="id"
            :sort-by.sync="sortBy"
            show-empty
            empty-text="No matching records found"
            :sort-desc.sync="isSortDirDesc"
          >
            <template #cell(id)="staticData">
              <b-link
                :to="{ name: 'admin-student-profile', params: { id: staticData.projectNumber }}"
                class="font-weight-bold"
              >
                {{ staticData.projectNumber }}
              </b-link>
            </template> -->


            <template #cell(actions)="staticData">
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
                  @click="editProjectActive=true"
                >
                  <feather-icon icon="EditIcon" />
                  <span class="align-middle ml-50">Edit</span>
                </b-dropdown-item>
                <b-dropdown-item
                  @click="confirmDelete(staticData.id)"
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
      </div></b-card>
  </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BTable,
  BOverlay,
  BLink,
  BFormInput,
  BButton,
  BPagination,
  BDropdown,
  BDropdownItem,
} from 'bootstrap-vue'
import { ref } from '@vue/composition-api'
import vSelect from 'vue-select'
import useProjects from '@/composables/project'
// eslint-disable-next-line import/no-cycle
import useJwt from '@/auth/jwt/useJwt'
import addProject from './addProject.vue'
import addDocument from './addDocument.vue'
import editProject from './editProject.vue'

export default {
  components: {
    // Export,
    BCol,
    BRow,
    BCard,
    BTable,
    BLink,
    vSelect,
    BOverlay,
    BFormInput,
    BPagination,
    addProject,
    addDocument,
    BButton,
    BDropdown,
    BDropdownItem,
    editProject,
  },
  setup(_, { root }) {
    const {
      busy,
      sortBy,
      filters,
      perPage,
      student,
      prospects,
      dataMeta,
      refetchData,
      searchQuery,
      currentPage,
      totalRecords,
      refListTable,
      deleteStudent,
      isSortDirDesc,
      fields,
      staticData,
      fetchStudents,
      perPageOptions,
    } = useProjects()


    // onMounted(() => {
    //   fetchSupervisorsList()
    //   fetchGroupsList()
    //   fetchProjectsList()
    // })
    // watch(() => root.$route.meta.status, async status => {
    //   filters.status = status
    //   fetchStudents()
    // }, {
    //   immediate: true,
    // })

    const isExportActive = ref(false)
    const filterKey = ref(0)

    const addProjectActive = ref(false)
    const addDocumentActive = ref(false)
    const editProjectActive = ref(false)

    const filterUpdate = filterQuery => {
      Object.assign(filters, filterQuery)
    }

    const resetFilter = () => {
      Object.keys(filters).forEach(index => { filters[index] = null })
      filterKey.value += 1
    }
    const localStorageData = JSON.parse(useJwt.getUserData())
    const confirmDelete = async id => {
      root.$bvModal
        .msgBoxConfirm('Please confirm that you want to delete student and all of linked data.', {
          title: 'Please Confirm',
          size: 'sm',
        })
        .then(value => {
          if (value) {
            deleteStudent(id)

            fetchStudents()
          }
        })
    }
    return {
      busy,
      sortBy,
      filters,
      student,
      perPage,
      prospects,
      dataMeta,
      filterKey,
      resetFilter,
      refetchData,
      searchQuery,
      currentPage,
      filterUpdate,
      fields,
      totalRecords,
      refListTable,
      isSortDirDesc,
      confirmDelete,
      perPageOptions,
      isExportActive,
      staticData,
      addProjectActive,
      addDocumentActive,
      editProjectActive,
      localStorageData,
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
