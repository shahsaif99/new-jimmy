<template>
  <div>
    <editEmployee
      :edit-employee-active.sync="editEmployeeActive"
      v-if="editEmployeeActive"
    />
    <b-card>
      <div class="mb-2">
        <b-row>
          <b-col>
            <div v-if="localStorageData.role=='admin'">
              <div
                class="d-flex align-items-center justify-content-end"
              >
                <b-button
                  variant="primary"
                  @click="addEmployeeActive=true"
                >
                  <span class="text-nowrap">Add new</span>
                </b-button>
                <addEmployee
                  :add-employee-active.sync="addEmployeeActive"
                  v-if="addEmployeeActive"
                />
              </div>
            </div>
          </b-col>
        </b-row>
      </div>
      <div class="mb-2">
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
                class="d-inline-block mr-1 md-2"
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
          :fields="columns"
          :items="staticData"
          responsive
          primary-key="id"
          :sort-by.sync="sortBy"
          show-empty
          empty-text="No matching records found"
          :sort-desc.sync="isSortDirDesc"
        >
          <template #cell(avatar)="staticData">
            <b-media vertical-align="center">
              <template #aside>
                <!-- <b-avatar
                  size="32"
                  :src="StaticData.avatar_url"
                  :text="avatarText(StaticData.name)"
                  variant="light-success"
                /> -->
              </template>
              <b-link
                class="font-weight-bold d-block text-nowrap"
              >
                {{ staticData.name }}
              </b-link>
              <!-- <small class="text-muted">@{{ data.item.email }}</small> -->
            </b-media>
          </template>
          <!-- Column: Status -->
          <template #cell(status)="staticData">
            <div>
              <b-form-checkbox
                :checked="staticData.status"
                class="custom-control-success"
                name="check-button"
                @change="onChangeStatus(staticData.id, staticData.status)"
                switch
              />
            </div>
          </template>
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
                @click="editEmployeeActive=true"
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
    </b-card>
  </div>
</template>

<script>
import {
  BButton, BCard, BCol, BDropdown,
  BDropdownItem, BFormCheckbox, BFormInput, BOverlay, BPagination, BRow, BTable, BMedia, BLink,
} from 'bootstrap-vue'
import { ref } from '@vue/composition-api'
import vSelect from 'vue-select'
import useEmployee from '@/composables/employee'
// eslint-disable-next-line import/no-cycle
import useJwt from '@/auth/jwt/useJwt'
import addEmployee from './addEmployee.vue'
import editEmployee from './editEmployee.vue'


export default {
  components: {
    // Export,
    BRow,
    BCol,
    BLink,
    BCard,
    BTable,
    BMedia,
    BButton,
    vSelect,
    BOverlay,
    BDropdown,
    BFormInput,
    BPagination,
    BDropdownItem,
    BFormCheckbox,
    addEmployee,
    editEmployee,
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
      fetchStudents,
      perPageOptions,
      staticData,
      columns,
    } = useEmployee()

    const isExportActive = ref(false)
    const filterKey = ref(0)
    const addEmployeeActive = ref(false)
    const editEmployeeActive = ref(false)

    const filterUpdate = filterQuery => {
      Object.assign(filters, filterQuery)
    }

    const localStorageData = JSON.parse(useJwt.getUserData())
    const resetFilter = () => {
      Object.keys(filters).forEach(index => { filters[index] = null })
      filterKey.value += 1
    }
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
      columns,
      totalRecords,
      refListTable,
      isSortDirDesc,
      confirmDelete,
      perPageOptions,
      isExportActive,
      staticData,
      addEmployeeActive,
      editEmployeeActive,
      localStorageData,
    }
  },
}
</script>
<style lang="scss" scoped>
    .per-page-selector {
        width: 90px;
    }
</style>

<style lang="scss">
    @import '~@core/scss/vue/libs/vue-select.scss';
</style>
