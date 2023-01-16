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
    <PendingRequest />
    <b-card
      no-body
      class="mb-0 mt-2"
    >
      <h3 class="p-1">
        Absence overview
      </h3>
      <b-table
        ref="refListTable"
        class="position-relative competence-table"
        :items="absences"
        responsive
        :fields="overviewTableColumns1"
        primary-key="id"
        :sort-by.sync="sortBy"
        :busy="busy"
        show-empty
        empty-text="No matching records found"
        :sort-desc.sync="isSortDirDesc"
      />
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
  BPagination,
} from 'bootstrap-vue'
import { ref, onMounted } from '@vue/composition-api'
import useAbsences from '@/composables/absences'
import StatisticCardHorizontal from '@core/components/statistics-cards/StatisticCardHorizontal.vue'
import PendingRequest from './PendingRequest.vue'

export default {
  components: {
    BCol,
    BRow,
    BCard,
    BTable,
    BPagination,
    PendingRequest,
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
      updateAbsenceStatus,
      fetchAbsencesStats,
      overviewTableColumns,
    } = useAbsences()

    onMounted(async () => {
      filters.status = 'approved'
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


    const absenceStatusConfirmed = async data => {
      await updateAbsenceStatus(data)
      if (respResult.value.status === 200) {
        fetchAbsences()
      }
    }

    const confirmStatus = async (id, status) => {
      root.$bvModal
        .msgBoxConfirm(`Please confirm that you want to ${status} absence request.`, {
          title: 'Please Confirm',
          size: 'sm',
        })
        .then(value => {
          if (value) {
            absenceStatusConfirmed({ id, status })
          }
        })
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

    const overviewTableColumns1 = [
      { key: 'user.name', sortable: true, label: 'Employee Name' },
      { key: 'from_date', sortable: false },
      { key: 'to_date', sortable: false },
      { key: 'days', sortable: false },
      { key: 'type', sortable: false },
      { key: 'comments', sortable: false, width: 100 },
    ]

    // const absencsOverview = ref([
    //   {
    //     name: 'Employee 1',
    //     _showDetails: true,
    //     absents: [
    //       {
    //         type: 'self',
    //         from_date: '12-12-2020',
    //         to_date: '12-12-2020',
    //         days: '22 days',
    //         status: 'approved',
    //         approved_by: 'approved',
    //         approved_date: '12-12-2020',
    //         comments: 'test',
    //       },
    //       {
    //         type: 'self',
    //         from_date: '12-12-2020',
    //         to_date: '12-12-2020',
    //         days: '22 days',
    //         status: 'approved',
    //         approved_by: 'approved',
    //         approved_date: '12-12-2020',
    //         comments: 'test',
    //       },
    //       {
    //         type: 'self',
    //         from_date: '12-12-2020',
    //         to_date: '12-12-2020',
    //         days: '22 days',
    //         status: 'approved',
    //         approved_by: 'approved',
    //         approved_date: '12-12-2020',
    //         comments: 'test',
    //       },
    //       {
    //         type: 'self',
    //         from_date: '12-12-2020',
    //         to_date: '12-12-2020',
    //         days: '22 days',
    //         status: 'approved',
    //         approved_by: 'approved',
    //         approved_date: '12-12-2020',
    //         comments: 'test',
    //       },
    //     ],
    //   },
    //   {
    //     name: 'Employee 2',
    //     _showDetails: true,
    //     absents: [
    //       {
    //         type: 'self',
    //         from_date: '12-12-2020',
    //         to_date: '12-12-2020',
    //         days: '22 days',
    //         status: 'approved',
    //         approved_by: 'approved',
    //         approved_date: '12-12-2020',
    //         comments: 'test',
    //       },
    //       {
    //         type: 'self',
    //         from_date: '12-12-2020',
    //         to_date: '12-12-2020',
    //         days: '22 days',
    //         status: 'approved',
    //         approved_by: 'approved',
    //         approved_date: '12-12-2020',
    //         comments: 'test',
    //       },
    //       {
    //         type: 'self',
    //         from_date: '12-12-2020',
    //         to_date: '12-12-2020',
    //         days: '22 days',
    //         status: 'approved',
    //         approved_by: 'approved',
    //         approved_date: '12-12-2020',
    //         comments: 'test',
    //       },
    //       {
    //         type: 'self',
    //         from_date: '12-12-2020',
    //         to_date: '12-12-2020',
    //         days: '22 days',
    //         status: 'approved',
    //         approved_by: 'approved',
    //         approved_date: '12-12-2020',
    //         comments: 'test',
    //       },
    //     ],
    //   },
    // ])

    const absencsOverview = ref([
      {
        name: 'Employee 1',
        type: 'self',
        from_date: '12-12-2020',
        to_date: '12-12-2020',
        days: '22 days',
        status: 'approved',
        approved_by: 'approved',
        approved_date: '12-12-2020',
        comments: 'test',
      },
      {
        name: 'Employee 1',
        type: 'self',
        from_date: '12-12-2020',
        to_date: '12-12-2020',
        days: '22 days',
        status: 'approved',
        approved_by: 'approved',
        approved_date: '12-12-2020',
        comments: 'test',
      },
      {
        name: 'Employee 2',
        type: 'self',
        from_date: '12-12-2020',
        to_date: '12-12-2020',
        days: '22 days',
        status: 'approved',
        approved_by: 'approved',
        approved_date: '12-12-2020',
        comments: 'test',
      },
      {
        name: 'Employee 2',
        type: 'self',
        from_date: '12-12-2020',
        to_date: '12-12-2020',
        days: '22 days',
        status: 'approved',
        approved_by: 'approved',
        approved_date: '12-12-2020',
        comments: 'test',
      },
    ])

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
      confirmStatus,
      refListTable,
      isSortDirDesc,
      confirmDelete,
      resolveStatus,
      perPageOptions,
      isExportActive,
      fetchAbsences,
      overviewTableColumns,
      absencsOverview,
      overviewTableColumns1,
    }
  },
}
</script>
  <style lang="scss">
  @import '~@core/scss/vue/libs/vue-select.scss';
  </style>
<style>
.per-page-selector {
    width: 90px;
}
</style>
