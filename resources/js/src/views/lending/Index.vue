<template>
  <div>
    <EditLoan
      :is-edit-lending-active.sync="isEditLendingActive"
      v-if="isEditLendingActive"
      :lending="lending"
      @refetch-data="fetchLendings"
    />
    <AddLoan
      :is-add-lending-active.sync="isAddLendingActive"
      v-if="isAddLendingActive"
      @refetch-data="fetchLendings"
      :equipment="equipment"
    />
    <b-card
      no-body
      class="mb-0"
    >
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
            <b-button
              variant="primary"
              @click="isAddLendingActive=true"
              class="ml-1"
            >
              <span class="text-nowrap">Add New Lending</span>
            </b-button>
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
          class="position-relative mr-1"
          responsive
          :items="lendings"
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
                @click="editLending(data.item)"
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
  BFormInput,
  BPagination,
  BButton,
  BDropdown,
  BDropdownItem,
} from 'bootstrap-vue'
import { ref, onMounted } from '@vue/composition-api'
// eslint-disable-next-line import/no-cycle
import vSelect from 'vue-select'
import useLendings from '@/composables/lendings'
import AddLoan from './Create.vue'
import EditLoan from './Edit.vue'

export default {
  components: {
    // Export,
    BCol,
    BRow,
    BCard,
    BTable,
    BButton,
    vSelect,
    BOverlay,
    BFormInput,
    BPagination,
    AddLoan,
    BDropdown,
    BDropdownItem,
    EditLoan,
  },
  props: {
    equipment: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { root }) {
    const {
      busy,
      sortBy,
      filters,
      perPage,
      lendings,
      dataMeta,
      respResult,
      refetchData,
      searchQuery,
      currentPage,
      totalRecords,
      refListTable,
      deleteLending,
      isSortDirDesc,
      fetchLendings,
      perPageOptions,
      tableColumns,
    } = useLendings()

    onMounted(() => {
      if (props.equipment) {
        filters.equipmentId = props.equipment.id
      }
      fetchLendings()
    })


    const isExportActive = ref(false)
    const filterKey = ref(0)
    const isAddLendingActive = ref(false)
    const isEditLendingActive = ref(false)
    const lending = ref({})

    const editLending = item => {
      lending.value = item
      isEditLendingActive.value = true
    }


    const deleteConfirmed = async id => {
      await deleteLending(id)
      if (respResult.value.status === 200) {
        fetchLendings()
      }
    }

    const confirmDelete = async id => {
      root.$bvModal
        .msgBoxConfirm('Please confirm that you want to delete lending.', {
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
      lending,
      perPage,
      dataMeta,
      lendings,
      filterKey,
      refetchData,
      searchQuery,
      currentPage,
      tableColumns,
      editLending,
      totalRecords,
      fetchLendings,
      refListTable,
      isSortDirDesc,
      confirmDelete,
      perPageOptions,
      isExportActive,
      isAddLendingActive,
      isEditLendingActive,
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

