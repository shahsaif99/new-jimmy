<template>
  <div>
    <b-row>
      <b-col
        cols="12"
        md="3"
        v-for="(stats, index) in vacationsStats"
        :key="index"
      >
        <statistic-card-horizontal
          icon="CalendarIcon"
          :statistic="stats.type"
          :statistic-title="`${stats.total_days} days`"
        />
      </b-col>
    </b-row>
    <b-card
      no-body
      class="mb-0 mt-2"
    >
      <b-overlay
        id="overlay-background"
        :show="busy"
        variant="transparent"
        rounded="sm"
      >
        <b-table
          ref="refListTable"
          class="position-relative"
          :items="vacations"
          responsive
          :fields="tableColumns"
          primary-key="id"
          :sort-by.sync="sortBy"
          show-empty
          empty-text="No matching records found"
          :sort-desc.sync="isSortDirDesc"
        >
          <template #cell(status)="data">
            <div
              class="text-nowrap"
            >
              <span
                class="align-text-top text-capitalize"
                :class="`text-${resolveStatus(data.item.status)}`"
              >
                <b-badge :variant="resolveStatus(data.item.status)">
                  <span>{{ data.item.status }}</span>
                </b-badge>
              </span>
            </div>
          </template>
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
              <b-dropdown-item>
                <feather-icon icon="EditIcon" />
                <span class="align-middle ml-50">Accept</span>
              </b-dropdown-item>
              <b-dropdown-item>
                <feather-icon icon="EditIcon" />
                <span class="align-middle ml-50">Not Accept</span>
              </b-dropdown-item>
              <b-dropdown-item
                @click="confirmDelete(data.item.id)"
                v-if="data.item.status !== 'approved'"
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
  BBadge,
  BDropdown,
  BPagination,
  BDropdownItem,
} from 'bootstrap-vue'
import { ref, onMounted } from '@vue/composition-api'
import useVacations from '@/composables/vacations'

export default {
  components: {
    BCol,
    BRow,
    BCard,
    BTable,
    BBadge,
    BOverlay,
    BDropdown,
    BPagination,
    BDropdownItem,
  },
  setup(_, { root }) {
    const {
      busy,
      sortBy,
      filters,
      perPage,
      vacations,
      dataMeta,
      respResult,
      refetchData,
      searchQuery,
      tableColumns,
      currentPage,
      totalRecords,
      refListTable,
      deleteVacation,
      vacationsStats,
      isSortDirDesc,
      resolveStatus,
      fetchVacations,
      vacationStats,
      perPageOptions,
    } = useVacations()

    onMounted(async () => {
      await fetchVacations()
    //   await fetchVacationsStats()
    })
    const isExportActive = ref(false)
    const isAddVacationActive = ref(false)
    const isAddDocumentActive = ref(false)
    const isEditVacationActive = ref(false)
    const vacationId = ref(0)
    const deleteConfirmed = async id => {
      await deleteVacation(id)
      if (respResult.value.status === 200) {
        fetchVacations()
      }
    }

    const editVacation = id => {
      vacationId.value = id
      isEditVacationActive.value = true
    }


    const confirmDelete = async id => {
      root.$bvModal
        .msgBoxConfirm('Please confirm that you want to delete vacation.', {
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
      perPage,
      vacations,
      dataMeta,
      vacationId,
      refetchData,
      editVacation,
      searchQuery,
      currentPage,
      vacationsStats,
      vacationStats,
      tableColumns,
      totalRecords,
      refListTable,
      isSortDirDesc,
      confirmDelete,
      resolveStatus,
      perPageOptions,
      isExportActive,
      fetchVacations,
      isAddVacationActive,
      isAddDocumentActive,
      isEditVacationActive,
    }
  },
}
</script>
