<template>
  <b-overlay :show="loading" rounded="sm">
    <div>
      <!-- Year Filter -->
      <div class="mb-2">
        <date-picker
          v-model="selectedYear"
          type="year"
          :placeholder="t('Select year')"
          style="width: 150px"
          @change="onYearChange"
        />
      </div>

    <!-- Average Processing Time Cards -->
    <b-row class="mb-2">
      <b-col cols="12" md="4">
        <b-card class="h-100">
          <h6 class="font-weight-bold mb-2">{{ t('Average processing time deviation') }}</h6>
          <h3 class="mb-0">{{ avgProcessingTime }} {{ t('days') }}</h3>
          <div class="text-right mt-2">
            <span class="cursor-pointer text-primary" @click="expandCard('avgProcessing')">
              <feather-icon icon="ChevronRightIcon" size="16" />
              {{ t('Expand') }}
            </span>
          </div>
        </b-card>
      </b-col>
      <b-col cols="12" md="4">
        <b-card class="h-100">
          <h6 class="font-weight-bold mb-2">{{ t('Average processing time HSE deviation') }}</h6>
          <h3 class="mb-0">{{ avgHSEProcessingTime }} {{ t('days') }}</h3>
          <div class="text-right mt-2">
            <span class="cursor-pointer text-primary" @click="expandCard('avgHSE')">
              <feather-icon icon="ChevronRightIcon" size="16" />
              {{ t('Expand') }}
            </span>
          </div>
        </b-card>
      </b-col>
      <b-col cols="12" md="4">
        <b-card class="h-100">
          <h6 class="font-weight-bold mb-2">{{ t('Average processing time quality/environment deviation') }}</h6>
          <h3 class="mb-0">{{ avgQualityProcessingTime }} {{ t('days') }}</h3>
          <div class="text-right mt-2">
            <span class="cursor-pointer text-primary" @click="expandCard('avgQuality')">
              <feather-icon icon="ChevronRightIcon" size="16" />
              {{ t('Expand') }}
            </span>
          </div>
        </b-card>
      </b-col>
    </b-row>

    <!-- Charts Row 1 -->
    <b-row class="mb-2">
      <!-- Type Deviation Pie Chart -->
      <b-col cols="12" md="4">
        <b-card class="h-100">
          <div class="d-flex justify-content-between align-items-start mb-1">
            <h6 class="font-weight-bold">{{ t('Type deviation') }}</h6>
            <span class="text-muted">{{ t('Total deviation') }}: {{ totalDeviations }}</span>
          </div>
          <vue-apex-charts
            type="pie"
            height="300"
            :options="typeChartOptions"
            :series="typeChartSeries"
          />
          <div class="text-right mt-1">
            <span class="cursor-pointer text-primary" @click="expandCard('typeDeviation')">
              <feather-icon icon="ChevronRightIcon" size="16" />
              {{ t('Expand') }}
            </span>
          </div>
        </b-card>
      </b-col>

      <!-- Deviations Registered Monthly Line Chart -->
      <b-col cols="12" md="8">
        <b-card class="h-100">
          <h6 class="font-weight-bold mb-1">{{ t('Deviations - registered monthly') }}</h6>
          <vue-apex-charts
            type="line"
            height="300"
            :options="monthlyChartOptions"
            :series="monthlyChartSeries"
          />
          <div class="text-right mt-1">
            <span class="cursor-pointer text-primary" @click="expandCard('monthlyDeviations')">
              <feather-icon icon="ChevronRightIcon" size="16" />
              {{ t('Expand') }}
            </span>
          </div>
        </b-card>
      </b-col>
    </b-row>

    <!-- Charts Row 2 -->
    <b-row>
      <!-- Open Deviations Pie Chart -->
      <b-col cols="12" md="4">
        <b-card class="h-100">
          <h6 class="font-weight-bold mb-1">{{ t('Open deviations') }}</h6>
          <vue-apex-charts
            type="pie"
            height="300"
            :options="statusChartOptions"
            :series="statusChartSeries"
          />
          <div class="text-right mt-1">
            <span class="cursor-pointer text-primary" @click="expandCard('openDeviations')">
              <feather-icon icon="ChevronRightIcon" size="16" />
              {{ t('Expand') }}
            </span>
          </div>
        </b-card>
      </b-col>

      <!-- Deviation Category Bar Chart -->
      <b-col cols="12" md="4">
        <b-card class="h-100">
          <h6 class="font-weight-bold mb-1">{{ t('Deviation category') }}</h6>
          <vue-apex-charts
            type="bar"
            height="300"
            :options="categoryChartOptions"
            :series="categoryChartSeries"
          />
          <div class="text-right mt-1">
            <span class="cursor-pointer text-primary" @click="expandCard('deviationCategory')">
              <feather-icon icon="ChevronRightIcon" size="16" />
              {{ t('Expand') }}
            </span>
          </div>
        </b-card>
      </b-col>
    </b-row>

    <!-- Expand Modal -->
    <b-modal
      :visible="showExpandModal"
      :title="expandModalTitle"
      size="lg"
      hide-footer
      centered
      @hide="onModalHide"
    >
      <div v-if="expandModalType === 'avgProcessing'" class="text-center py-4">
        <h6 class="font-weight-bold mb-2">{{ t('Average processing time deviation') }}</h6>
        <h1 class="display-3 mb-0">{{ avgProcessingTime }} {{ t('days') }}</h1>
        <p class="text-muted mt-2">{{ t('Based on') }} {{ closedDeviationsCount }} {{ t('closed deviations') }}</p>
      </div>

      <div v-else-if="expandModalType === 'avgHSE'" class="text-center py-4">
        <h6 class="font-weight-bold mb-2">{{ t('Average processing time HSE deviation') }}</h6>
        <h1 class="display-3 mb-0">{{ avgHSEProcessingTime }} {{ t('days') }}</h1>
        <p class="text-muted mt-2">{{ t('Based on HSE and Undesired Event deviations') }}</p>
      </div>

      <div v-else-if="expandModalType === 'avgQuality'" class="text-center py-4">
        <h6 class="font-weight-bold mb-2">{{ t('Average processing time quality/environment deviation') }}</h6>
        <h1 class="display-3 mb-0">{{ avgQualityProcessingTime }} {{ t('days') }}</h1>
        <p class="text-muted mt-2">{{ t('Based on Quality and Environmental deviations') }}</p>
      </div>

      <div v-else-if="expandModalType === 'typeDeviation'">
        <div class="d-flex justify-content-end mb-2">
          <span class="text-muted">{{ t('Total deviation') }}: {{ totalDeviations }}</span>
        </div>
        <vue-apex-charts
          type="pie"
          height="400"
          :options="typeChartOptions"
          :series="typeChartSeries"
        />
      </div>

      <div v-else-if="expandModalType === 'monthlyDeviations'">
        <vue-apex-charts
          type="line"
          height="400"
          :options="monthlyChartOptions"
          :series="monthlyChartSeries"
        />
      </div>

      <div v-else-if="expandModalType === 'openDeviations'">
        <vue-apex-charts
          type="pie"
          height="400"
          :options="statusChartOptions"
          :series="statusChartSeries"
        />
      </div>

      <div v-else-if="expandModalType === 'deviationCategory'">
        <vue-apex-charts
          type="bar"
          height="400"
          :options="categoryChartOptions"
          :series="categoryChartSeries"
        />
      </div>
    </b-modal>
    </div>
  </b-overlay>
</template>

<script>
import { ref, computed, onMounted, watch } from '@vue/composition-api'
import { BCard, BRow, BCol, BOverlay, BModal } from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/scss/index.scss'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import { useRouter } from '@core/utils/utils'
import axios from '@axios'
import route from 'ziggy-js'

export default {
  name: 'DeviationsTab',
  components: {
    BCard,
    BRow,
    BCol,
    BOverlay,
    BModal,
    VueApexCharts,
    DatePicker,
  },
  setup() {
    const { t } = useI18nUtils()
    const { route: currentRoute, router } = useRouter()

    // Local state for reports (not shared with other components)
    const deviations = ref([])
    const statistics = ref({})
    const loading = ref(false)

    // Modal state
    const showExpandModal = ref(false)
    const expandModalType = ref('')
    const expandModalTitle = ref('')

    // Fetch all deviations for reports
    const fetchAllDeviations = async () => {
      try {
        loading.value = true
        const response = await axios.get(route('avvikruh.index'), {
          params: {
            perPage: 10000, // Fetch all records
          },
        })
        deviations.value = response.data.data || []
      } catch (error) {
        console.error('Error fetching deviations:', error)
      } finally {
        loading.value = false
      }
    }

    // Fetch statistics
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(route('avvikruh.statistics'))
        statistics.value = response.data || {}
      } catch (error) {
        console.error('Error fetching statistics:', error)
      }
    }

    // Year selector - read from query param or default to current year
    const yearParam = currentRoute.value.query.year
    const initialYear = yearParam ? new Date(`${yearParam}-01-01`) : new Date()
    const selectedYear = ref(initialYear)

    // Filter deviations by year and exclude improvement suggestions
    const filteredDeviations = computed(() => {
      const year = selectedYear.value ? new Date(selectedYear.value).getFullYear() : new Date().getFullYear()

      return deviations.value.filter(item => {
        // Exclude improvement suggestions
        if (item.type === 'Improvement Suggestion' || item.type === 'improvement suggestion') {
          return false
        }

        // Filter by year
        const dateStr = item.date || item.created_at
        if (dateStr) {
          const itemYear = new Date(dateStr).getFullYear()
          return itemYear === year
        }
        return false
      })
    })

    const onYearChange = () => {
      // Update query parameter
      const year = selectedYear.value ? new Date(selectedYear.value).getFullYear() : new Date().getFullYear()
      router.replace({
        query: { ...currentRoute.value.query, year },
      }).catch(() => {})
    }

    // Watch for query param changes (when switching tabs)
    watch(
      () => currentRoute.value.query.year,
      newYear => {
        if (newYear) {
          const newDate = new Date(`${newYear}-01-01`)
          if (newDate.getFullYear() !== new Date(selectedYear.value).getFullYear()) {
            selectedYear.value = newDate
          }
        }
      }
    )

    // Helper function to calculate days between two dates
    const calculateDaysBetween = (startDate, endDate) => {
      if (!startDate || !endDate) return null
      const start = new Date(startDate)
      const end = new Date(endDate)
      if (isNaN(start.getTime()) || isNaN(end.getTime())) return null
      const diffTime = Math.abs(end - start)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays
    }

    // Statistics
    const totalDeviations = computed(() => filteredDeviations.value.length)

    const closedDeviationsCount = computed(() =>
      filteredDeviations.value.filter(d => d.date && d.close_date).length
    )

    const avgProcessingTime = computed(() => {
      // Filter deviations that have both date and close_date (closed deviations)
      const closedDeviations = filteredDeviations.value.filter(d => d.date && d.close_date)
      if (closedDeviations.length === 0) return 0

      const totalDays = closedDeviations.reduce((sum, d) => {
        const days = calculateDaysBetween(d.date, d.close_date)
        return sum + (days || 0)
      }, 0)

      return Math.round(totalDays / closedDeviations.length)
    })

    const avgHSEProcessingTime = computed(() => {
      const hseDeviations = filteredDeviations.value.filter(
        d => (d.type === 'HSE Deviation' || d.type === 'Undesired Event') && d.date && d.close_date
      )
      if (hseDeviations.length === 0) return 0

      const totalDays = hseDeviations.reduce((sum, d) => {
        const days = calculateDaysBetween(d.date, d.close_date)
        return sum + (days || 0)
      }, 0)

      return Math.round(totalDays / hseDeviations.length)
    })

    const avgQualityProcessingTime = computed(() => {
      const qualityDeviations = filteredDeviations.value.filter(
        d => (d.type === 'Quality Deviation' || d.type === 'Environmental Deviation') && d.date && d.close_date
      )
      if (qualityDeviations.length === 0) return 0

      const totalDays = qualityDeviations.reduce((sum, d) => {
        const days = calculateDaysBetween(d.date, d.close_date)
        return sum + (days || 0)
      }, 0)

      return Math.round(totalDays / qualityDeviations.length)
    })

    // Type Deviation Pie Chart
    const typeChartOptions = computed(() => ({
      chart: {
        type: 'pie',
        toolbar: { show: false },
      },
      labels: getTypeLabels(),
      colors: ['#9CCB7B', '#90ABE0', '#FED440', '#62993E', '#3159A1', '#E4AA00', '#DBEBD0'],
      legend: {
        position: 'right',
        fontSize: '12px',
      },
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
          },
        },
      }],
    }))

    const typeChartSeries = computed(() => getTypeSeries())

    const getTypeLabels = () => {
      const types = {}
      filteredDeviations.value.forEach(d => {
        const type = d.type || 'Unknown'
        types[type] = (types[type] || 0) + 1
      })
      return Object.keys(types)
    }

    const getTypeSeries = () => {
      const types = {}
      filteredDeviations.value.forEach(d => {
        const type = d.type || 'Unknown'
        types[type] = (types[type] || 0) + 1
      })
      return Object.values(types)
    }

    // Monthly Deviations Line Chart
    const monthlyChartOptions = ref({
      chart: {
        type: 'line',
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      stroke: {
        curve: 'smooth',
        width: 3,
      },
      colors: ['#7CB5EC', '#434349'],
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
      yaxis: {
        min: 0,
        labels: {
          formatter: val => Math.round(val),
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
      },
      markers: {
        size: 5,
        hover: {
          size: 7,
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
    })

    const monthlyChartSeries = computed(() => {
      const monthlyCounts = Array(12).fill(0)

      filteredDeviations.value.forEach(d => {
        const dateStr = d.date || d.created_at
        if (dateStr) {
          const date = new Date(dateStr)
          if (!isNaN(date.getTime())) {
            const month = date.getMonth()
            monthlyCounts[month]++
          }
        }
      })

      return [{
        name: t('Deviations'),
        data: monthlyCounts,
      }]
    })

    // Open Deviations Pie Chart
    const statusChartOptions = ref({
      chart: {
        type: 'pie',
        toolbar: { show: false },
      },
      labels: ['Open', 'Closed'],
      colors: ['#269B84','#FFD700'],
      legend: {
        position: 'right',
        fontSize: '12px',
      },
    })

    const statusChartSeries = computed(() => {
      const open = filteredDeviations.value.filter(d => d.status === 'open').length
      const closed = filteredDeviations.value.filter(d => d.status === 'closed').length
      return [open, closed]
    })

    // Deviation Category Bar Chart
    const categoryChartOptions = computed(() => ({
      chart: {
        type: 'bar',
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          columnWidth: '30%',
          distributed: true,
        },
      },
      dataLabels: {
        enabled: true,
        position: 'top',
      },
      xaxis: {
        categories: getCategoryLabels(),
        labels: {
          style: {
            fontSize: '11px',
          },
        },
      },
      yaxis: {
        min: 0,
        labels: {
          formatter: val => Math.round(val),
        },
      },
      colors: ['#FFCC00', '#269B84', '#00008B', '#008CE0', '#ea5455'],
      legend: {
        show: false,
      },
    }))

    const categoryChartSeries = computed(() => [{
      name: t('Deviations'),
      data: getCategorySeries(),
    }])

    const getCategoryLabels = () => {
      const categories = {}
      filteredDeviations.value.forEach(d => {
        const category = d.event_type || 'Uncategorized'
        categories[category] = (categories[category] || 0) + 1
      })
      return Object.keys(categories).slice(0, 5) // Show top 5 categories
    }

    const getCategorySeries = () => {
      const categories = {}
      filteredDeviations.value.forEach(d => {
        const category = d.event_type || 'Uncategorized'
        categories[category] = (categories[category] || 0) + 1
      })
      return Object.values(categories).slice(0, 5) // Show top 5 categories
    }

    const modalTitles = {
      avgProcessing: 'Average processing time deviation',
      avgHSE: 'Average processing time HSE deviation',
      avgQuality: 'Average processing time quality/environment deviation',
      typeDeviation: 'Type deviation',
      monthlyDeviations: 'Deviations - registered monthly',
      openDeviations: 'Open deviations',
      deviationCategory: 'Deviation category',
    }

    const expandCard = cardName => {
      expandModalType.value = cardName
      expandModalTitle.value = modalTitles[cardName] || cardName
      showExpandModal.value = true
    }

    const onModalHide = () => {
      showExpandModal.value = false
    }

    onMounted(async () => {
      await fetchAllDeviations()
      await fetchStatistics()
    })

    return {
      t,
      loading,
      selectedYear,
      onYearChange,
      totalDeviations,
      closedDeviationsCount,
      avgProcessingTime,
      avgHSEProcessingTime,
      avgQualityProcessingTime,
      typeChartOptions,
      typeChartSeries,
      monthlyChartOptions,
      monthlyChartSeries,
      statusChartOptions,
      statusChartSeries,
      categoryChartOptions,
      categoryChartSeries,
      expandCard,
      showExpandModal,
      expandModalType,
      expandModalTitle,
      onModalHide,
    }
  },
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
