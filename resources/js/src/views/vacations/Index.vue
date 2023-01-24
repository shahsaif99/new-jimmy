<template>
  <div>
    <edit-vacation
      :is-edit-vacation-active.sync="isEditVacationActive"
      v-if="isEditVacationActive"
      :vacation-id="vacationId"
      @refetch-data="fetchVacations"
    />
    <add-vacation
      :is-add-vacation-active.sync="isAddVacationActive"
      v-if="isAddVacationActive"
      @refetch-data="fetchVacations"
    />
    <b-row>
      <b-col
        cols="12"
        md="3"
      >
        <statistic-card-horizontal
          icon="CalendarIcon"
          :statistic="t('Number of holiday days')"
          :statistic-title="`${vacationsStats.vacations} ${$t('day(s)')}`"
        />
      </b-col>
      <b-col
        cols="12"
        md="3"
      >
        <statistic-card-horizontal
          icon="CalendarIcon"
          :statistic="t('Remaining holidays')"
          :statistic-title="`${vacationsStats.remainingVacations} ${$t('day(s)')}`"
        />
      </b-col>
      <b-col
        cols="12"
        md="3"
      >
        <statistic-card-horizontal
          icon="CalendarIcon"
          :statistic="t('Used holidays')"
          :statistic-title="`${vacationsStats.usedVacations} ${$t('day(s)')}`"
        />
      </b-col>
    </b-row>
    <b-card
      no-body
      class="mb-0 mt-2"
    >
      <div class="m-2">
        <b-row>
          <b-col
            cols="12"
            md="3"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          >
            <label>{{ t('Show') }}</label>
            <v-select
              v-model="perPage"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="perPageOptions"
              :clearable="false"
              class="per-page-selector d-inline-block mx-50"
            />
            <label>{{ t('entries') }}</label>
            <b-button
              variant="primary"
              @click="isAddVacationActive = true"
              v-if="$can('vacations-add', 'all')"
              class="ml-3"
            >
              <span class="text-nowrap">{{ t('Add Vacation') }}</span>
            </b-button>
          </b-col>
          <b-col
            cols="12"
            md="2"
            class="mb-md-0 mb-2"
          >
            <flat-pickr
              :config="pickerConfig"
              id="month"
              class="form-control"
              :placeholder="t('Select Date Range')"
              v-model="filters.range"
            />
          </b-col>
          <b-col
            cols="12"
            md="2"
            class="mb-md-0 mb-2"
          >
            <v-select
              :placeholder="t('Status')"
              v-model="filters.status"
              :options="statusOptions"
              :reduce="status => status.value"
              :clearable="false"
              input-id="title"
            />

          </b-col>
          <b-col
            cols="12"
            md="2"
            class="mb-md-0 mb-2"
          >
            <b-button
              variant="primary"
              @click="filterRecords"
            >
              {{ t('Filter') }}
            </b-button>
            <b-button
              variant="warning"
              @click="resetFilter"
            >
              {{ t('Reset') }}
            </b-button>
          </b-col>
          <b-col
            cols="12"
            md="3"
          >
            <div
              class="d-flex align-items-center justify-content-end"
            >
              <b-form-input
                v-model="searchQuery"
                class="d-inline-block mr-1"
                :placeholder="t('Search...')"
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
          :items="vacations"
          responsive
          :fields="tableColumns"
          primary-key="id"
          :sort-by.sync="sortBy"
          show-empty
          :empty-text="t('No matching records found')"
          :sort-desc.sync="isSortDirDesc"
        >
          <template #head()="data">
            <span>{{ $t(data.label) }}</span>
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
          <template #cell(approved_date)="data">
            <span v-if="data.item.approved_date">{{ moment(data.item.approved_date).format('YYYY.MM.DD') }}</span>
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
            <feather-icon
              :id="`user-row-${data.item.id}-pencil-icon`"
              icon="EditIcon"
              size="16"
              class="mx-1 cursor-pointer"
              @click="editVacation(data.item.id)"
            />
            <!-- <b-tooltip
              title="Edit"
              :target="`user-row-${data.item.id}-pencil-icon`"
            /> -->
            <feather-icon
              :id="`user-row-${data.item.id}-trash-icon`"
              icon="TrashIcon"
              class="cursor-pointer"
              size="16"
              @click="confirmDelete(data.item.id)"
            />
            <!-- <b-tooltip
              title="Delete"
              :target="`user-row-${data.item.id}-trash-icon`"
            /> -->
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
  BLink,
  BMedia,
  BAvatar,
  BOverlay,
  BBadge,
  BButton,
  BFormInput,
  BPagination,
} from 'bootstrap-vue'
import { ref, onMounted } from '@vue/composition-api'
import vSelect from 'vue-select'
import useVacations from '@/composables/vacations'
import StatisticCardHorizontal from '@core/components/statistics-cards/StatisticCardHorizontal.vue'
import flatPickr from 'vue-flatpickr-component'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import i18n from '@/libs/i18n'
// eslint-disable-next-line import/no-cycle
import { avatarText } from '@core/utils/filter'
// eslint-disable-next-line import/no-cycle
import useJwt from '@/auth/jwt/useJwt'
import moment from 'moment'
import AddVacation from './dialogs/AddVacation.vue'
import EditVacation from './dialogs/EditVacation.vue'

export default {
  components: {
    BCol,
    BRow,
    BCard,
    BTable,
    BLink,
    BBadge,
    BMedia,
    vSelect,
    BAvatar,
    BButton,
    BOverlay,
    flatPickr,
    AddVacation,
    BFormInput,
    BPagination,
    EditVacation,
    StatisticCardHorizontal,
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
      fetchVacationsStats,
    } = useVacations()

    const userData = JSON.parse(useJwt.getUserData())

    onMounted(async () => {
      filters.userId = userData.id
      await fetchVacations()
      await fetchVacationsStats()
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
    const { t } = useI18nUtils()

    const editVacation = id => {
      vacationId.value = id
      isEditVacationActive.value = true
    }


    const confirmDelete = async id => {
      root.$bvModal
        .msgBoxConfirm(i18n.t('Please confirm that you want to delete vacation.'), {
          title: i18n.t('Please Confirm'),
          size: 'sm',
          okTitle: i18n.t('Confirm'),
          cancelTitle: i18n.t('Cancel'),
        })
        .then(value => {
          if (value) {
            deleteConfirmed(id)
          }
        })
    }

    const pickerConfig = {
      mode: 'range',
      dateFormat: 'Y-m-d',
    }

    const statusOptions = [
      { label: 'Approved', value: 'approved' },
      { label: 'Pending', value: 'pending' },
    ]

    const filterRecords = () => {
      fetchVacations()
    }

    const filterKey = ref(0)
    const resetFilter = () => {
      Object.keys(filters).forEach(index => { filters[index] = null })
      filterKey.value += 1
      fetchVacations()
    }

    return {
      t,
      busy,
      sortBy,
      moment,
      filters,
      perPage,
      vacations,
      dataMeta,
      avatarText,
      resetFilter,
      vacationId,
      refetchData,
      editVacation,
      searchQuery,
      currentPage,
      pickerConfig,
      filterRecords,
      vacationsStats,
      vacationStats,
      tableColumns,
      statusOptions,
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
  <style scoped>
  .per-page-selector {
    width: 90px;
  }
  </style>

  <style lang="scss">
  @import '~flatpickr/dist/flatpickr.css';
  @import '~@core/scss/vue/libs/vue-select.scss';
  </style>
