<template>
  <div>
    <EditAvvikListing
      :is-edit-avvik-listing-active.sync="isEditAvvikListingActive"
      v-if="isEditAvvikListingActive"
      :avvik-listing-id="avvikData.id"
      @refetch-data="fetchAvvikListings"
    />
    <CreateAvvikListing
      :is-add-avvik-listing-active.sync="isAddAvvikListingActive"
      v-if="isAddAvvikListingActive"
      @refetch-data="fetchAvvikListings"
    />
    <b-row>
      <b-col
        cols="12"
        md="2"
      >
        <statistic-card-vertical
          icon="ListIcon"
          statistic="Antall avvik"
          :statistic-title="avvikStatistics.total"
        />
      </b-col>
      <b-col
        cols="12"
        md="2"
      >
        <statistic-card-vertical
          icon="ListIcon"
          statistic="Antall uønsket hendelser"
          :statistic-title="avvikStatistics.avvikHendelse"
        />
      </b-col>
      <b-col
        cols="12"
        md="2"
      >
        <statistic-card-vertical
          icon="ListIcon"
          statistic="Åpne avvik/RUH"
          :statistic-title="avvikStatistics.avvikOpen"
        />
      </b-col>

      <b-col
        cols="12"
        md="2"
      >
        <statistic-card-vertical
          icon="ListIcon"
          statistic="Antall alvorlighetsgrad kritisk"
          :statistic-title="avvikStatistics.avvikCritic"
        />
      </b-col>
      <b-col
        cols="12"
        md="4"
      >
        <b-card class="pb-0">
          <vue-apex-charts
            type="line"
            height="240"
            v-if="!busy"
            :options="monthlyChart.chartOptions"
            :series="monthlyChart.series"
          />
        </b-card>
      </b-col>
    </b-row>
    <b-card
      no-body
      class="mb-0"
    >

      <div class="m-2">
        <b-card-title>
          Avvik / RUH
        </b-card-title>
        <b-row>

          <b-col
            cols="12"
            md="4"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          >
            <v-select
              v-model="perPage"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="perPageOptions"
              :clearable="false"
              class="per-page-selector d-inline-block mx-50"
            />
            <label>{{ t('records per page') }}</label>
            <b-button
              variant="primary"
              @click="$router.push({ name: 'avvik-listings-create' })"
              class="ml-2"
            >
              <span class="text-nowrap">Add Avvik / RUH</span>
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
            md="4"
          >
            <div
              class="d-flex align-items-center justify-content-end"
            >
              <b-form-input
                v-model="searchQuery"
                class="d-inline-block mr-1 md-2"
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
          :items="avvikruhListings"
          responsive
          :fields="tableColumns"
          primary-key="id"
          :sort-by.sync="sortBy"
          show-empty
          :empty-text="t('No matching records found')"
          :sort-desc.sync="isSortDirDesc"
          tbody-tr-class="item-row"
        >
          <template #head()="data">
            <span>{{ $t(data.label) }}</span>
          </template>
          <template #cell(status)="data">
            <div
              class="text-nowrap"
            >
              <span
                class="align-text-top text-capitalize"
                :class="`text-${resolveStatus(data.item.close_status)}`"
              >
                <b-badge :variant="resolveStatus(data.item.close_status)">
                  <span>{{ data.item.close_status }}</span>
                </b-badge>
              </span>
            </div>
          </template>
          <template #cell(lending)="data">
            <b-button
              variant="flat-primary"
              size="sm"
              @click="lendingEquipment(data.item)"
            >
              Show
            </b-button>
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
              <!-- <b-dropdown-item
                @click="viewEquipment(data.item)"
              >
                <feather-icon icon="EyeIcon" />
                <span class="align-middle ml-50">View</span>
              </b-dropdown-item> -->
              <b-dropdown-item
                @click="$router.push({ name: 'avvik-listings-edit', params: { id: data.item.id } })"
                v-if="$can('avvik-edit', 'all')"
              >
                <feather-icon icon="EditIcon" />
                <span class="align-middle ml-50">{{ t('Edit') }}</span>
              </b-dropdown-item>
              <b-dropdown-item
                @click="confirmDelete(data.item.id)"
                v-if="$can('avvik-delete', 'all')"
              >
                <feather-icon
                  icon="TrashIcon"
                />
                <span class="align-middle ml-50">{{ t('Delete') }}</span>
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
  BOverlay,
  BFormInput,
  BPagination,
  BButton,
  BDropdown,
  BCardTitle,
  BCardBody,
  BDropdownItem,
} from 'bootstrap-vue'
import { ref, onMounted, watch } from '@vue/composition-api'
import vSelect from 'vue-select'
// eslint-disable-next-line import/no-cycle
import useAvvikRuh from '@/composables/avvikRuh'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import i18n from '@/libs/i18n'
import flatPickr from 'vue-flatpickr-component'
import StatisticCardVertical from '@core/components/statistics-cards/StatisticCardVertical.vue'
import VueApexCharts from 'vue-apexcharts'
import { $themeColors } from '@themeConfig'
import CreateAvvikListing from './Create.vue'
import EditAvvikListing from './Edit.vue'

export default {
  components: {
    BCol,
    BRow,
    BCard,
    BTable,
    BButton,
    vSelect,
    BOverlay,
    BBadge,
    BCardBody,
    flatPickr,
    BFormInput,
    BPagination,
    BDropdown,
    BCardTitle,
    VueApexCharts,
    BDropdownItem,
    EditAvvikListing,
    CreateAvvikListing,
    StatisticCardVertical,
  },
  setup(_, { root }) {
    const {
      busy,
      sortBy,
      filters,
      perPage,
      student,
      dataMeta,
      avvikruhListings,
      respResult,
      refetchData,
      searchQuery,
      currentPage,
      tableColumns,
      totalRecords,
      refListTable,
      resolveStatus,
      isSortDirDesc,
      perPageOptions,
      avvikStatistics,
      fetchAvvikStatistics,
      deleteAvvikListing,
      fetchAvvikListings,
    } = useAvvikRuh()
    const { t } = useI18nUtils()


    const avvikTotal = ref(0)
    const isExportActive = ref(false)
    const isAddAvvikListingActive = ref(false)
    const isEditAvvikListingActive = ref(false)
    const avvikData = ref({})

    const deleteConfirmed = async id => {
      await deleteAvvikListing(id)
      if (respResult.value.status === 200) {
        fetchAvvikListings()
      }
    }

    const editAvvikListing = item => {
      avvikData.value = item
      isEditAvvikListingActive.value = true
    }

    const confirmDelete = async id => {
      root.$bvModal
        .msgBoxConfirm(i18n.t('Please confirm that you want to delete avvik.'), {
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

    const monthlyChart = ref({
      series: [
        {
          name: 'Number of Avvik',
          data: [],
        },
        {
          name: 'Number of Uønsket hendelse',
          data: [-145, -80, -60, -180, -100, -60, -85, -75, -100],
        },
      ],
      chartOptions: {
        chart: {
          toolbar: { show: false },
          zoom: { enabled: false },
          type: 'line',
          dropShadow: {
            enabled: true,
            top: 18,
            left: 2,
            blur: 5,
            opacity: 0.2,
          },
          offsetX: -10,
        },
        stroke: {
          curve: 'smooth',
          width: 4,
        },
        grid: {
          borderColor: '#ebe9f1',
          padding: {
            top: -20,
            bottom: 5,
            left: 20,
          },
        },
        legend: {
          show: false,
        },
        colors: ['#df87f2', '#f66d9b'],
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            inverseColors: false,
            gradientToColors: [$themeColors.primary],
            shadeIntensity: 1,
            type: 'horizontal',
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100],
          },
        },
        markers: {
          size: 0,
          hover: {
            size: 5,
          },
        },
        xaxis: {
          labels: {
            offsetY: 5,
            style: {
              colors: '#b9b9c3',
              fontSize: '0.857rem',
            },
          },
          axisTicks: {
            show: false,
          },
          categories: [],
          axisBorder: {
            show: false,
          },
          tickPlacement: 'on',
        },
        yaxis: {
          tickAmount: 5,
          labels: {
            style: {
              colors: '#b9b9c3',
              fontSize: '0.857rem',
            },
            formatter(val) {
              return val > 999 ? `${(val / 1000).toFixed(1)}k` : val
            },
          },
        },
        tooltip: {
          x: { show: false },
        },
      },
    })

    onMounted(async () => {
      await fetchAvvikStatistics()
      await fetchAvvikListings()
    })

    watch(avvikStatistics, () => {
      if (!busy.value) {
        monthlyChart.value.series[0].data = avvikStatistics.value.avvikListingsMonthlyDeviation
        monthlyChart.value.series[1].data = avvikStatistics.value.avvikListingsMonthlyUnwantedInnciednt
        monthlyChart.value.chartOptions.xaxis.categories = avvikStatistics.value.avvikListingsMonthlyLabels
      }
    })

    // watch monthlyChart


    const filterRecords = () => {
      fetchAvvikListings()
    }

    const resetFilter = () => {
      Object.keys(filters).forEach(index => { filters[index] = null })
      fetchAvvikListings()
    }


    const pickerConfig = {
      mode: 'range',
      dateFormat: 'Y-m-d',
    }


    return {
      t,
      busy,
      sortBy,
      filters,
      student,
      perPage,
      dataMeta,
      avvikData,
      avvikStatistics,
      filterRecords,
      refetchData,
      resetFilter,
      avvikTotal,
      resolveStatus,
      searchQuery,
      monthlyChart,
      avvikruhListings,
      currentPage,
      tableColumns,
      pickerConfig,
      totalRecords,
      refListTable,
      isSortDirDesc,
      editAvvikListing,
      confirmDelete,
      perPageOptions,
      isExportActive,
      fetchAvvikListings,
      deleteAvvikListing,
      isAddAvvikListingActive,
      isEditAvvikListingActive,
    }
  },
}
</script>
<style lang="scss" >
    .per-page-selector {
        width: 90px;
    }
</style>

<style lang="scss">
@import '~flatpickr/dist/flatpickr.css';
@import '~@core/scss/vue/libs/vue-select.scss';
</style>
