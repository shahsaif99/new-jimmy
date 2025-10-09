<template>
  <div>
    <b-card
      no-body
      class="mb-0 mt-2"
    >
      <h3 class="p-1">
        {{ t('Absence requests') }}
      </h3>
      <b-table
        ref="refListTable"
        class="position-relative"
        :items="absences"
        responsive
        :fields="pendingTableColumns"
        primary-key="id"
        :sort-by.sync="sortBy"
        show-empty
        :empty-text="t('No matching records found')"
        :sort-desc.sync="isSortDirDesc"
      >

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
        <template #head()="data">
          <span>{{ $t(data.label) }}</span>
        </template>
        <template #cell(type)="data">
          <span>{{ $t(data.item.type) }} </span>
        </template>
        <template #cell(days)="data">
          <span>{{ data.item.days }} {{ t('day(s)') }}</span>
        </template>
        <template #cell(from_date)="data">
          <span>{{ moment(data.item.from_date).format('YYYY.MM.DD') }}</span>
        </template>
        <template #cell(to_date)="data">
          <span>{{ moment(data.item.to_date).format('YYYY.MM.DD') }}</span>
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
                <span>{{ $t(data.item.status) }}</span>
              </b-badge>
            </span>
          </div>
        </template>
        <template #cell(actions)="data">
          <div
            class="text-nowrap"
            v-if="data.item.status !== 'approved'"
          >
            <span class="text-success">
              <feather-icon
                @click="confirmStatus(data.item.id, 'approved')"
                :id="`accept-request-${data.item.id}-check-btn`"
                icon="CheckIcon"
                class="cursor-pointer ml-1"
                size="16"
              />
            </span>

            <span class="text-danger">
              <feather-icon
                @click="confirmStatus(data.item.id, 'declined')"
                :id="`decline-request-${data.item.id}-cross-btn`"
                icon="SlashIcon"
                class="cursor-pointer ml-1"
                size="16"
              />
            </span>

            <feather-icon
              @click="confirmDelete(data.item.id)"
              :id="`delete-request-${data.item.id}-trash-btn`"
              icon="Trash2Icon"
              class="cursor-pointer ml-1"
              size="16"
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
  BPagination,
} from 'bootstrap-vue'
import { ref, onMounted } from '@vue/composition-api'
import useAbsences from '@/composables/absences'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import i18n from '@/libs/i18n'
import { avatarText } from '@core/utils/filter'
import moment from 'moment'

export default {
  components: {
    BCol,
    BRow,
    BCard,
    BLink,
    BMedia,
    BBadge,
    BTable,
    BAvatar,
    BPagination,
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
      pendingTableColumns,
    } = useAbsences()

    const { t } = useI18nUtils()


    onMounted(async () => {
      filters.status = 'pending'
      await fetchAbsences()
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
        .msgBoxConfirm(i18n.t(`Please confirm that you want to ${status} absence request.`), {
          title: i18n.t('Please Confirm'),
          okTitle: i18n.t('Confirm'),
          cancelTitle: i18n.t('Cancel'),
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
          okTitle: i18n.t('Confirm'),
          cancelTitle: i18n.t('Cancel'),
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
      moment,
      filters,
      perPage,
      absences,
      dataMeta,
      avatarText,
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
