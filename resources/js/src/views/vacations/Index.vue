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
          :statistic-title="`${vacationsStats.vacations} days`"
        />
      </b-col>
      <b-col
        cols="12"
        md="3"
      >
        <statistic-card-horizontal
          icon="CalendarIcon"
          :statistic="t('Remaining holidays')"
          :statistic-title="`${vacationsStats.remainingVacations} days`"
        />
      </b-col>
      <b-col
        cols="12"
        md="3"
      >
        <statistic-card-horizontal
          icon="CalendarIcon"
          :statistic="t('Used holidays')"
          :statistic-title="`${vacationsStats.usedVacations} days`"
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
            <feather-icon
              :id="`user-row-${data.item.id}-pencil-icon`"
              icon="EditIcon"
              size="16"
              class="mx-1 cursor-pointer"
              @click="editVacation(data.item.id)"
            />
            <b-tooltip
              title="Edit"
              :target="`user-row-${data.item.id}-pencil-icon`"
            />
            <feather-icon
              :id="`user-row-${data.item.id}-trash-icon`"
              icon="TrashIcon"
              class="cursor-pointer"
              size="16"
              @click="confirmDelete(data.item.id)"
            />
            <b-tooltip
              title="Delete"
              :target="`user-row-${data.item.id}-trash-icon`"
            />
            <!-- <b-dropdown
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
                @click="editVacation(data.item.id)"
              >
                <feather-icon icon="EditIcon" />
                <span class="align-middle ml-50">{{ t('Edit') }}</span>
              </b-dropdown-item>
              <b-dropdown-item
                @click="confirmDelete(data.item.id)"
                v-if="data.item.status !== 'approved'"
              >
                <feather-icon
                  icon="TrashIcon"
                />
                <span class="align-middle ml-50">{{ t('Delete') }}</span>
              </b-dropdown-item>
            </b-dropdown> -->
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
  BOverlay,
  BBadge,
  BTooltip,
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
import AddVacation from './dialogs/AddVacation.vue'
import EditVacation from './dialogs/EditVacation.vue'

export default {
  components: {
    BCol,
    BRow,
    BCard,
    BTable,
    BBadge,
    vSelect,
    BButton,
    BTooltip,
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

    onMounted(async () => {
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
      filters,
      perPage,
      vacations,
      dataMeta,
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
