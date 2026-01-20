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

      <!-- Stats Cards Row -->
      <b-row class="mb-2">
        <b-col cols="12" md="6">
          <b-card class="h-100">
            <h6 class="font-weight-bold mb-2">{{ t('Submitted improvement suggestions') }}</h6>
            <h3 class="mb-0">{{ totalImprovements }}</h3>
            <div class="text-right mt-2">
              <span class="cursor-pointer text-primary" @click="expandCard('submitted')">
                <feather-icon icon="ChevronRightIcon" size="16" />
                {{ t('Expand') }}
              </span>
            </div>
          </b-card>
        </b-col>
        <b-col cols="12" md="6">
          <b-card class="h-100">
            <h6 class="font-weight-bold mb-2">{{ t('Average processing time for improvement sugg.') }}</h6>
            <h3 class="mb-0">{{ avgProcessingTime }} {{ t('days') }}</h3>
            <div class="text-right mt-2">
              <span class="cursor-pointer text-primary" @click="expandCard('avgProcessing')">
                <feather-icon icon="ChevronRightIcon" size="16" />
                {{ t('Expand') }}
              </span>
            </div>
          </b-card>
        </b-col>
      </b-row>

      <!-- Charts Row -->
      <b-row>
        <!-- Monthly Line Chart -->
        <b-col cols="12" md="7">
          <b-card class="h-100">
            <h6 class="font-weight-bold mb-1">{{ t('Improvement suggestions - registered monthly') }}</h6>
            <vue-apex-charts
              type="line"
              height="300"
              :options="monthlyChartOptions"
              :series="monthlyChartSeries"
            />
            <div class="text-right mt-1">
              <span class="cursor-pointer text-primary" @click="expandCard('monthlyImprovements')">
                <feather-icon icon="ChevronRightIcon" size="16" />
                {{ t('Expand') }}
              </span>
            </div>
          </b-card>
        </b-col>

        <!-- Open/Closed Pie Chart -->
        <b-col cols="12" md="5">
          <b-card class="h-100">
            <h6 class="font-weight-bold mb-1">{{ t('Open improvement suggestions') }}</h6>
            <vue-apex-charts
              type="pie"
              height="300"
              :options="statusChartOptions"
              :series="statusChartSeries"
            />
            <div class="text-right mt-1">
              <span class="cursor-pointer text-primary" @click="expandCard('openImprovements')">
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
        <div v-if="expandModalType === 'submitted'" class="text-center py-4">
          <h6 class="font-weight-bold mb-2">{{ t('Submitted improvement suggestions') }}</h6>
          <h1 class="display-3 mb-0">{{ totalImprovements }}</h1>
          <p class="text-muted mt-2">{{ t('Total improvement suggestions for selected year') }}</p>
        </div>

        <div v-else-if="expandModalType === 'avgProcessing'" class="text-center py-4">
          <h6 class="font-weight-bold mb-2">{{ t('Average processing time for improvement sugg.') }}</h6>
          <h1 class="display-3 mb-0">{{ avgProcessingTime }} {{ t('days') }}</h1>
          <p class="text-muted mt-2">{{ t('Based on') }} {{ closedImprovementsCount }} {{ t('closed suggestions') }}</p>
        </div>

        <div v-else-if="expandModalType === 'monthlyImprovements'">
          <vue-apex-charts
            type="line"
            height="400"
            :options="monthlyChartOptions"
            :series="monthlyChartSeries"
          />
        </div>

        <div v-else-if="expandModalType === 'openImprovements'">
          <vue-apex-charts
            type="pie"
            height="400"
            :options="statusChartOptions"
            :series="statusChartSeries"
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
  name: 'ImprovementsTab',
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

    // Local state for reports
    const improvements = ref([])
    const loading = ref(false)

    // Modal state
    const showExpandModal = ref(false)
    const expandModalType = ref('')
    const expandModalTitle = ref('')

    // Fetch all improvement suggestions
    const fetchAllImprovements = async () => {
      try {
        loading.value = true
        const response = await axios.get(route('avvikruh.index'), {
          params: {
            perPage: 10000,
          },
        })
        // Filter for improvement suggestions only
        const allData = response.data.data || []
        improvements.value = allData.filter(
          item => item.type === 'Improvement Suggestion' || item.type === 'improvement suggestion'
        )
      } catch (error) {
        console.error('Error fetching improvements:', error)
      } finally {
        loading.value = false
      }
    }

    // Year selector - read from query param or default to current year
    const yearParam = currentRoute.value.query.year
    const initialYear = yearParam ? new Date(`${yearParam}-01-01`) : new Date()
    const selectedYear = ref(initialYear)

    // Filter improvements by year
    const filteredImprovements = computed(() => {
      const year = selectedYear.value ? new Date(selectedYear.value).getFullYear() : new Date().getFullYear()

      return improvements.value.filter(item => {
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
    const totalImprovements = computed(() => filteredImprovements.value.length)

    const closedImprovementsCount = computed(() =>
      filteredImprovements.value.filter(d => d.date && d.close_date).length
    )

    const avgProcessingTime = computed(() => {
      const closedItems = filteredImprovements.value.filter(d => d.date && d.close_date)
      if (closedItems.length === 0) return 0

      const totalDays = closedItems.reduce((sum, d) => {
        const days = calculateDaysBetween(d.date, d.close_date)
        return sum + (days || 0)
      }, 0)

      return Math.round(totalDays / closedItems.length)
    })

    // Monthly Line Chart
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

      filteredImprovements.value.forEach(d => {
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
        name: t('Improvement Suggestions'),
        data: monthlyCounts,
      }]
    })

    // Open/Closed Pie Chart
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
      const open = filteredImprovements.value.filter(d => d.status === 'open').length
      const closed = filteredImprovements.value.filter(d => d.status === 'closed').length
      return [open, closed]
    })

    const modalTitles = {
      submitted: 'Submitted improvement suggestions',
      avgProcessing: 'Average processing time for improvement sugg.',
      monthlyImprovements: 'Improvement suggestions - registered monthly',
      openImprovements: 'Open improvement suggestions',
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
      await fetchAllImprovements()
    })

    return {
      t,
      loading,
      selectedYear,
      onYearChange,
      totalImprovements,
      closedImprovementsCount,
      avgProcessingTime,
      monthlyChartOptions,
      monthlyChartSeries,
      statusChartOptions,
      statusChartSeries,
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
