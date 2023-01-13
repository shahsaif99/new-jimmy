<template>
  <div>
    <b-row>
      <b-col
        cols="12"
        md="3"
        v-for="(stats, index) in absencesStats"
        :key="index"
      >
        <statistic-card-horizontal
          icon="CalendarIcon"
          :statistic="`Number of ${stats.type}`"
          :statistic-title="`${stats.total_days} requests`"
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
          :items="absences"
          responsive
          :fields="overviewTableColumns"
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
              <b-dropdown-item
                v-if="data.item.status !== 'approved'"
                @click="editAbsence(data.item.id)"
              >
                <feather-icon icon="EditIcon" />
                <span class="align-middle ml-50">Edit</span>
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
  BBadge,
  BTable,
  BOverlay,
  BDropdown,
  BPagination,
  BDropdownItem,
} from 'bootstrap-vue'
import { ref, onMounted } from '@vue/composition-api'
import useAbsences from '@/composables/absences'
import StatisticCardHorizontal from '@core/components/statistics-cards/StatisticCardHorizontal.vue'

export default {
  components: {
    BCol,
    BRow,
    BCard,
    BBadge,
    BTable,
    BOverlay,
    BDropdown,
    BPagination,
    BDropdownItem,
    StatisticCardHorizontal,
  },
  setup(_, { root }) {
    const {
      busy,
      sortBy,
      filters,
      perPage,
      absences,
      dataMeta,
      respResult,
      refetchData,
      searchQuery,
      currentPage,
      totalRecords,
      refListTable,
      deleteAbsence,
      absencesStats,
      isSortDirDesc,
      resolveStatus,
      fetchAbsences,
      absenceStats,
      perPageOptions,
      fetchAbsencesStats,
      overviewTableColumns,
    } = useAbsences()

    onMounted(async () => {
      await fetchAbsences()
      await fetchAbsencesStats()
    })
    const isExportActive = ref(false)
    const absenceId = ref(0)
    const deleteConfirmed = async id => {
      await deleteAbsence(id)
      if (respResult.value.status === 200) {
        fetchAbsences()
      }
    }


    const confirmDelete = async id => {
      root.$bvModal
        .msgBoxConfirm('Please confirm that you want to delete absence.', {
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
      absences,
      dataMeta,
      absenceId,
      refetchData,
      searchQuery,
      currentPage,
      absencesStats,
      absenceStats,
      totalRecords,
      refListTable,
      isSortDirDesc,
      confirmDelete,
      resolveStatus,
      perPageOptions,
      isExportActive,
      fetchAbsences,
      overviewTableColumns,
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
