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
        {{ t('Absence Overview') }}
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
        :empty-text="t('No matching records found')"
        :sort-desc.sync="isSortDirDesc"
      >
        <template #cell(user)="data">
          <b-media vertical-align="center">
            <template #aside>
              <b-avatar
                size="32"
                :src="data.item.avatar"
                :text="avatarText(data.item.user.name)"
                :to="{ name: 'users-edit', params: { id: data.item.user.id } }"
              />
            </template>
            <b-link
              :to="{ name: 'users-edit', params: { id: data.item.user.id } }"
            >
              {{ data.item.user.name }}
            </b-link>
          </b-media>
        </template>

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
          <div
            class="text-nowrap"
            v-if="data.item.status != 'approved'"
          >
            <!-- <b-button
              variant="success"
              class="btn-icon"
              size="sm"
              @click="confirmStatus(data.item.id, 'approved')"
              :id="`row-${data.item.id}-check-btn`"
            >
              <feather-icon icon="CheckIcon" />
            </b-button> -->
            <feather-icon
              @click="confirmStatus(data.item.id, 'approved')"
              :id="`row-overview-${data.item.id}-check-btn`"
              icon="CheckIcon"
              class="cursor-pointer"
              size="16"
            />
            <b-tooltip
              :title="t('Accept Request')"
              class="cursor-pointer"
              :target="`row-${data.item.id}-check-btn`"
            />
            <b-button
              variant="warning"
              class="btn-icon"
              size="sm"
              :id="`row-${data.item.id}-cross-btn`"
              @click="confirmStatus(data.item.id, 'declined')"
            >
              <feather-icon icon="XIcon" />
            </b-button>
            <b-tooltip
              :title="t('Decline Request')"
              class="cursor-pointer"
              :target="`row-${data.item.id}-cross-btn`"
            />
            <b-button
              variant="danger"
              class="btn-icon"
              size="sm"
              :id="`row-${data.item.id}-trash-btn`"
              @click="confirmDelete(data.item.id)"
            >
              <feather-icon icon="TrashIcon" />
            </b-button>
            <b-tooltip
              :title="t('Delete Request')"
              class="cursor-pointer"
              :target="`row-${data.item.id}-trash-btn`"
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
  BTable,
  BAvatar,
  BMedia,
  BLink,
  BPagination,
} from 'bootstrap-vue'
import { ref, onMounted } from '@vue/composition-api'
import useAbsences from '@/composables/absences'
import StatisticCardHorizontal from '@core/components/statistics-cards/StatisticCardHorizontal.vue'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import i18n from '@/libs/i18n'
import { avatarText } from '@core/utils/filter'
import PendingRequest from './PendingRequest.vue'

export default {
  components: {
    BCol,
    BRow,
    BMedia,
    BLink,
    BCard,
    BAvatar,
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
      fetchAbsencesStats,
      updateAbsenceStatus,
      overviewTableColumns,
    } = useAbsences()

    const { t } = useI18nUtils()


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


    const absenceStatusConfirmed = async data => {
      await updateAbsenceStatus(data)
      if (respResult.value.status === 200) {
        fetchAbsences()
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

    const overviewTableColumns1 = [
    //   { key: 'user.name', sortable: true, label: i18n.t('Employee Name') },
      { key: 'user', sortable: true, label: i18n.t('Employee') },
      { key: 'from_date', sortable: false, label: i18n.t('From Date') },
      { key: 'to_date', sortable: false, label: i18n.t('To Date') },
      { key: 'days', sortable: false, label: i18n.t('Days') },
      { key: 'type', sortable: false, label: i18n.t('Type') },
      {
        key: 'comments', sortable: false, width: 100, label: i18n.t('Comments'),
      },
    ]

    return {
      t,
      busy,
      sortBy,
      filters,
      perPage,
      absences,
      dataMeta,
      absenceId,
      refetchData,
      avatarText,
      searchQuery,
      currentPage,
      absencesStats,
      absenceStats,
      totalRecords,
      refListTable,
      isSortDirDesc,
      confirmStatus,
      confirmDelete,
      resolveStatus,
      perPageOptions,
      isExportActive,
      fetchAbsences,
      overviewTableColumns,
      overviewTableColumns1,
      absenceStatusConfirmed,
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
