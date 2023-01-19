<template>
  <div>
    <b-row>
      <b-col
        cols="12"
        md="3"
      >
        <statistic-card-horizontal
          icon="CalendarIcon"
          :statistic="t('Number of holiday requests')"
          :statistic-title="`${vacations.length} ${t('request(s)')}`"
        />
      </b-col>
    </b-row>
    <b-card
      no-body
      class="mb-0 mt-2"
    >
      <h3 class="p-1">
        {{ t('Vacations requests') }}
      </h3>
      <b-table
        ref="refListTable"
        class="position-relative"
        :items="vacations"
        responsive
        :fields="overviewTableColumns"
        primary-key="id"
        :sort-by.sync="sortBy"
        show-empty
        :empty-text="t('No matching records found')"
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
          <div class="text-nowrap">
            <b-button
              variant="success"
              class="btn-icon"
              size="sm"
              @click="confirmStatus(data.item.id, 'approved')"
              :id="`row-overview-${data.item.id}-check-btn`"
            >
              <feather-icon icon="CheckIcon" />
            </b-button>
            <b-tooltip
              :title="t('Accept Request')"
              class="cursor-pointer"
              :target="`row-overview-${data.item.id}-check-btn`"
            />
            <b-button
              variant="warning"
              class="btn-icon"
              size="sm"
              :id="`row-overview-${data.item.id}-cross-btn`"
              @click="confirmStatus(data.item.id, 'declined')"
            >
              <feather-icon icon="XIcon" />
            </b-button>
            <b-tooltip
              :title="t('Decline Request')"
              class="cursor-pointer"
              :target="`row-overview-${data.item.id}-cross-btn`"
            />
            <b-button
              variant="danger"
              class="btn-icon"
              size="sm"
              :id="`row-overview-${data.item.id}-trash-btn`"
              @click="confirmDelete(data.item.id)"
            >
              <feather-icon icon="TrashIcon" />
            </b-button>
            <b-tooltip
              :title="t('Delete Request')"
              class="cursor-pointer"
              :target="`row-overview-${data.item.id}-trash-btn`"
            />
          </div>
        </template>
      </b-table>
      <div class="mx-2 mb-2">
        <b-row>
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <span
              class="text-muted"
            >{{ t('Showing') }} {{ dataMeta.from }} {{ t('to') }} {{ dataMeta.to }} {{ t('of') }}
              {{ dataMeta.of }} {{ t('entries') }}</span>
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
  BButton,
  BTooltip,
  BPagination,
} from 'bootstrap-vue'
import { ref, onMounted } from '@vue/composition-api'
import useVacations from '@/composables/vacations'
import StatisticCardHorizontal from '@core/components/statistics-cards/StatisticCardHorizontal.vue'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import i18n from '@/libs/i18n'

export default {
  components: {
    BCol,
    BRow,
    BCard,
    BBadge,
    BTable,
    BButton,
    BTooltip,
    BPagination,
    StatisticCardHorizontal,

  },
  setup(_, { root, emit }) {
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
      currentPage,
      totalRecords,
      refListTable,
      deleteVacation,
      isSortDirDesc,
      resolveStatus,
      fetchVacations,
      perPageOptions,
      overviewTableColumns,
      updateVacationStatus,
    } = useVacations()

    const { t } = useI18nUtils()


    onMounted(async () => {
      filters.status = 'pending'
      await fetchVacations()
    })
    const isExportActive = ref(false)
    const absenceId = ref(0)
    const deleteConfirmed = async id => {
      await deleteVacation(id)
      if (respResult.value.status === 200) {
        fetchVacations()
      }
    }


    const absenceStatusConfirmed = async data => {
      await updateVacationStatus(data)
      if (respResult.value.status === 200) {
        emit('refetch-data')
        fetchVacations()
      }
    }

    const confirmStatus = async (id, status) => {
      root.$bvModal
        .msgBoxConfirm(`Please confirm that you want to ${status} absence request.`, {
          title: i18n.t('Please Confirm'),
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
        .msgBoxConfirm(i18n.t('Please confirm that you want to delete absence.'), {
          title: i18n.t('Please Confirm'),
          size: 'sm',
        })
        .then(value => {
          if (value) {
            deleteConfirmed(id)
          }
        })
    }

    return {
      t,
      busy,
      sortBy,
      filters,
      perPage,
      vacations,
      dataMeta,
      absenceId,
      refetchData,
      searchQuery,
      currentPage,
      totalRecords,
      confirmStatus,
      refListTable,
      isSortDirDesc,
      confirmDelete,
      resolveStatus,
      perPageOptions,
      isExportActive,
      overviewTableColumns,
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
