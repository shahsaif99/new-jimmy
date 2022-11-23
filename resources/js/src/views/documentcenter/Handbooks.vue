<template>
  <div>
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
                  @click="addHandbooksActive=true"
                >
                  <span class="text-nowrap">Add new</span>
                </b-button>
                <addHandbooks
                  :add-handbooks-active.sync="addHandbooksActive"
                  v-if="addHandbooksActive"
                />
              </div>
            </div>
          </b-col>
        </b-row>
        <div class="mb-2">
          <b-row>
            <b-col
              cols="12"
              md="6"
              class="d-flex align-items-center justify-content-start mb-1 mb-md-0 mt-1"
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
                  class="d-inline-block mr-1 md-2 mt-1"
                  placeholder="Search..."
                />
              </div>
            </b-col>
          </b-row>
          <b-overlay
            id="overlay-background"
            :show="busy"
            variant="transparent"
            rounded="sm"
          >
            <b-table
              ref="refListTable"
              class="position-relative mt-2"
              responsive
              :fields="columns"
              primary-key="id"
              :sort-by.sync="sortBy"
              show-empty
              empty-text="No matching records found"
              :sort-desc.sync="isSortDirDesc"
            />
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
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import {
  BButton, BCard, BCol, BRow, BFormInput, BTable, BPagination, BOverlay,
} from 'bootstrap-vue'
import { ref } from '@vue/composition-api'
import useProspects from '@/composables/prospects'
import vSelect from 'vue-select'
// eslint-disable-next-line import/no-cycle
import useJwt from '@/auth/jwt/useJwt'
import addHandbooks from './addHandbooks.vue'


export default {
  components: {
    // Export,
    BRow,
    BCol,
    BCard,
    BButton,
    addHandbooks,
    BFormInput,
    BOverlay,
    vSelect,
    BTable,
    BPagination,
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
    } = useProspects()

    const isExportActive = ref(false)
    const filterKey = ref(0)
    const addHandbooksActive = ref(false)

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

    const columns = [
      { key: 'organizationName' },
      { key: 'companyName' },
      { key: 'visitingAddress' },
      { key: 'registered' },
      { key: 'companyType' },
      { key: 'industry' },
      { key: 'website' },
      { key: 'email' },
      { key: 'telephone' },
    ]
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
      addHandbooksActive,
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

