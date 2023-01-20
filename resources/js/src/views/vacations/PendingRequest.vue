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
        :fields="pendingTableColumns"
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
        <template #cell(user)="data">
          <b-media vertical-align="center">
            <template #aside>
              <b-avatar
                size="32"
                :src="data.item.user.avatar_url"
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
        <template #cell(days)="data">
          <span>{{ data.item.days }} {{ t('days(s)') }}</span>
        </template>
        <template #cell(actions)="data">
          <div
            class="text-nowrap"
            v-if="data.item.status !== 'approved'"
          >
            <span class="text-success">
              <feather-icon
                @click="confirmStatus(data.item.id, 'approved')"
                :id="`pending-accept-request-${data.item.id}-check-btn`"
                icon="CheckIcon"
                class="cursor-pointer ml-1"
                size="16"
              />
            </span>
            <b-tooltip
              :title="t('Accept Request')"
              :target="`pending-accept-request-${data.item.id}-check-btn`"
            />

            <span class="text-danger">
              <feather-icon
                @click="confirmStatus(data.item.id, 'declined')"
                :id="`pending-decline-request-${data.item.id}-cross-btn`"
                icon="SlashIcon"
                class="cursor-pointer ml-1"
                size="16"
              />
            </span>
            <b-tooltip
              :title="t('Decline Request')"
              :target="`pending-decline-request-${data.item.id}-cross-btn`"
            />

            <feather-icon
              @click="confirmDelete(data.item.id)"
              :id="`delete-request-${data.item.id}-trash-btn`"
              icon="Trash2Icon"
              class="cursor-pointer ml-1"
              size="16"
            />
            <b-tooltip
              :title="t('Delete Request')"
              :target="`delete-request-${data.item.id}-trash-btn`"
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
  BMedia,
  BBadge,
  BLink,
  BTable,
  BAvatar,
  BTooltip,
  BPagination,
} from 'bootstrap-vue'
import { ref, onMounted } from '@vue/composition-api'
import useVacations from '@/composables/vacations'
import StatisticCardHorizontal from '@core/components/statistics-cards/StatisticCardHorizontal.vue'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import i18n from '@/libs/i18n'
import { avatarText } from '@core/utils/filter'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BMedia,
    BBadge,
    BLink,
    BTable,
    BAvatar,
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
      pendingTableColumns,
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
      avatarText,
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
      pendingTableColumns,
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
