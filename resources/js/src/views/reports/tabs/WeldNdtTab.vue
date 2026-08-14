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

      <!-- KPI cards: the mockup runs all seven across a single row on a wide screen -->
      <div class="kpi-grid mb-2">
        <b-card
          v-for="card in statCards"
          :key="card.key"
          class="mb-0"
          body-class="pb-1"
        >
          <div class="d-flex align-items-start mb-1">
            <b-avatar rounded :variant="card.variant" size="34" class="mr-75 flex-shrink-0">
              <feather-icon :icon="card.icon" size="16" />
            </b-avatar>
            <h6 class="font-weight-bold mb-0 kpi-title">{{ t(card.title) }}</h6>
          </div>
          <h2 class="mb-25 kpi-value">{{ card.value }}</h2>
          <small :class="card.subClass">{{ card.sub }}</small>
        </b-card>
      </div>

      <b-row class="mb-2">
        <!-- Welds by project -->
        <b-col cols="12" lg="4" class="mb-2 mb-lg-0">
          <b-card class="h-100 mb-0">
            <h6 class="font-weight-bold mb-1">{{ t('Welds by project') }}</h6>
            <b-table
              v-if="projects.length"
              :items="projects"
              :fields="projectFields"
              responsive
              small
              class="mb-0"
            >
              <template #cell(project_name)="data">
                <span :title="data.item.project_no">{{ data.item.project_name }}</span>
              </template>
              <template #cell(repair_rate)="data">
                <span :class="repairRateClass(data.item.repair_rate)">
                  {{ formatPercent(data.item.repair_rate) }}
                </span>
              </template>
            </b-table>
            <p v-else class="text-muted mb-0">{{ t('No welds registered for this year') }}</p>
          </b-card>
        </b-col>

        <!-- NDT summary -->
        <b-col cols="12" lg="4" class="mb-2 mb-lg-0">
          <b-card class="h-100 mb-0">
            <div class="d-flex justify-content-between align-items-start mb-1">
              <h6 class="font-weight-bold mb-0">{{ t('NDT summary') }}</h6>
              <span class="text-muted">{{ t('Total tests') }}: {{ totalNdtTests }}</span>
            </div>
            <b-table
              v-if="totalNdtTests"
              :items="methodRows"
              :fields="methodFields"
              responsive
              small
              class="mb-0"
            >
              <template #cell(pass_rate)="data">
                <span class="text-success">{{ formatPercent(data.item.pass_rate) }}</span>
              </template>
            </b-table>
            <p v-else class="text-muted mb-0">{{ t('No NDT results recorded for this year') }}</p>
          </b-card>
        </b-col>

        <!-- NDT inspections by method -->
        <b-col cols="12" lg="4">
          <b-card class="h-100 mb-0">
            <div class="d-flex justify-content-between align-items-start mb-1">
              <h6 class="font-weight-bold mb-0">{{ t('NDT inspections by method') }}</h6>
              <span class="text-muted">{{ t('Total tests') }}: {{ totalNdtTests }}</span>
            </div>
            <vue-apex-charts
              v-if="totalNdtTests"
              type="donut"
              height="300"
              :options="donutOptions"
              :series="donutSeries"
            />
            <p v-else class="text-muted mb-0">{{ t('No NDT results recorded for this year') }}</p>
          </b-card>
        </b-col>
      </b-row>

      <!-- Trend -->
      <b-card>
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-1">
          <h6 class="font-weight-bold mb-0">
            {{ showVolume ? t('Weld volume (12 months)') : t('Pass rate trend (12 months)') }}
          </h6>
          <div class="d-flex align-items-center">
            <span class="text-muted mr-1">{{ t('Show') }}:</span>
            <b-form-select v-model="trendMode" :options="trendOptions" size="sm" style="width: 160px" />
          </div>
        </div>
        <vue-apex-charts
          :key="trendMode"
          :type="showVolume ? 'bar' : 'line'"
          height="320"
          :options="trendChartOptions"
          :series="trendSeries"
        />
      </b-card>
    </div>
  </b-overlay>
</template>

<script>
import { ref, computed, onMounted } from '@vue/composition-api'
import {
  BCard, BRow, BCol, BOverlay, BTable, BAvatar, BFormSelect,
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/scss/index.scss'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import { useRouter } from '@core/utils/utils'
import axios from '@axios'
import route from 'ziggy-js'

// Kept in step with the mockup so a method reads the same colour in the donut,
// the legend and the trend lines.
const METHOD_COLORS = {
  VT: '#28c76f',
  RT: '#00a5f5',
  MT: '#7367f0',
  PT: '#ff9f43',
}

const VISUAL_COLOR = '#ea5455'

export default {
  name: 'WeldNdtTab',
  components: {
    BCard,
    BRow,
    BCol,
    BOverlay,
    BTable,
    BAvatar,
    BFormSelect,
    VueApexCharts,
    DatePicker,
  },
  setup() {
    const { t } = useI18nUtils()
    const { route: currentRoute, router } = useRouter()

    const report = ref(null)
    const loading = ref(false)
    const trendMode = ref('pass_rate')

    const yearParam = currentRoute.value.query.year
    const initialYear = yearParam ? new Date(`${yearParam}-01-01`) : new Date()
    const selectedYear = ref(initialYear)

    const yearValue = () => (selectedYear.value
      ? new Date(selectedYear.value).getFullYear()
      : new Date().getFullYear())

    const fetchReport = async () => {
      try {
        loading.value = true
        const response = await axios.get(route('weld-report.index'), {
          params: { year: yearValue() },
        })
        report.value = response.data.data || null
      } catch (error) {
        console.error('Error fetching weld report:', error)
      } finally {
        loading.value = false
      }
    }

    const onYearChange = () => {
      router.replace({
        query: { ...currentRoute.value.query, year: yearValue() },
      }).catch(() => {})
      fetchReport()
    }

    const totals = computed(() => report.value?.totals || {})
    const methodRows = computed(() => report.value?.methods || [])
    const projects = computed(() => report.value?.projects || [])
    const trend = computed(() => report.value?.trend || null)

    const formatNumber = value => (value == null ? '0' : Number(value).toLocaleString())

    // A rate is null when nothing was measured, which is different from 0%.
    const formatPercent = value => (value == null ? '–' : `${Number(value).toFixed(1)}%`)

    const methodBy = key => methodRows.value.find(m => m.method === key) || {}

    const totalNdtTests = computed(() => methodRows.value.reduce((sum, m) => sum + (m.tests || 0), 0))

    const passRateCard = (method, icon, variant) => {
      const row = methodBy(method)
      return {
        key: method,
        title: `${method} pass rate`,
        icon,
        variant,
        value: formatPercent(row.pass_rate),
        sub: `${formatNumber(row.passed)} / ${formatNumber(row.tests)}`,
        subClass: 'text-success',
      }
    }

    const statCards = computed(() => [
      {
        key: 'total',
        title: 'Total welds',
        icon: 'ZapIcon',
        variant: 'light-primary',
        value: formatNumber(totals.value.total_welds),
        sub: t('This year'),
        subClass: 'text-muted',
      },
      {
        key: 'repair',
        title: 'Repair rate',
        icon: 'ToolIcon',
        variant: 'light-warning',
        value: formatPercent(totals.value.repair_rate),
        sub: `${formatNumber(totals.value.repairs)} / ${formatNumber(totals.value.total_welds)}`,
        subClass: 'text-warning',
      },
      {
        key: 'visual',
        title: 'Visual (Welder) pass rate',
        icon: 'EyeIcon',
        variant: 'light-info',
        value: formatPercent(totals.value.visual_pass_rate),
        sub: `${formatNumber(totals.value.visual_passed)} / ${formatNumber(totals.value.visual_tested)}`,
        subClass: 'text-success',
      },
      passRateCard('VT', 'ShieldIcon', 'light-success'),
      passRateCard('RT', 'RadioIcon', 'light-primary'),
      passRateCard('MT', 'MagnetIcon', 'light-info'),
      passRateCard('PT', 'DropletIcon', 'light-warning'),
    ])

    const projectFields = [
      { key: 'project_name', label: t('Project') },
      { key: 'welds', label: t('Welds'), thClass: 'text-center', tdClass: 'text-center' },
      { key: 'repairs', label: t('Repairs'), thClass: 'text-center', tdClass: 'text-center' },
      { key: 'repair_rate', label: t('Repair rate'), thClass: 'text-right', tdClass: 'text-right' },
    ]

    const methodFields = [
      { key: 'method', label: t('Method') },
      { key: 'tests', label: t('Tests'), thClass: 'text-center', tdClass: 'text-center' },
      { key: 'pass_rate', label: t('Pass rate'), thClass: 'text-right', tdClass: 'text-right' },
    ]

    // Repair rates above 2% are worth a second look; the mockup flags them amber.
    const repairRateClass = rate => {
      if (rate == null) return 'text-muted'
      if (rate >= 2) return 'text-warning'
      return 'text-success'
    }

    const donutSeries = computed(() => methodRows.value.map(m => m.tests || 0))

    const donutOptions = computed(() => ({
      chart: { type: 'donut' },
      labels: methodRows.value.map(m => m.method),
      colors: methodRows.value.map(m => METHOD_COLORS[m.method] || '#82868b'),
      legend: { position: 'bottom' },
      dataLabels: { enabled: true },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                show: true,
                label: t('Total NDT tests'),
                formatter: () => formatNumber(totalNdtTests.value),
              },
            },
          },
        },
      },
    }))

    const showVolume = computed(() => trendMode.value === 'volume')

    const trendOptions = [
      { value: 'pass_rate', text: t('Pass rate') },
      { value: 'volume', text: t('Weld volume') },
    ]

    const trendSeries = computed(() => {
      if (!trend.value) return []

      if (showVolume.value) {
        return [{ name: t('Welds'), data: trend.value.volume }]
      }

      const rates = trend.value.pass_rate || {}

      return [
        { name: t('Visual (Welder)'), data: rates.visual || [] },
        { name: 'VT', data: rates.vt || [] },
        { name: 'RT', data: rates.rt || [] },
        { name: 'MT', data: rates.mt || [] },
        { name: 'PT', data: rates.pt || [] },
      ]
    })

    const trendChartOptions = computed(() => {
      const categories = trend.value?.months || []

      if (showVolume.value) {
        return {
          chart: { toolbar: { show: false } },
          colors: ['#7367f0'],
          xaxis: { categories },
          dataLabels: { enabled: false },
          plotOptions: { bar: { columnWidth: '45%', borderRadius: 4 } },
        }
      }

      return {
        chart: { toolbar: { show: false } },
        colors: [VISUAL_COLOR, METHOD_COLORS.VT, METHOD_COLORS.RT, METHOD_COLORS.MT, METHOD_COLORS.PT],
        stroke: { width: 2, curve: 'straight' },
        markers: { size: 4 },
        xaxis: { categories },
        yaxis: {
          max: 100,
          labels: { formatter: value => (value == null ? '' : `${Number(value).toFixed(0)}%`) },
        },
        tooltip: {
          y: { formatter: value => (value == null ? t('No tests') : `${Number(value).toFixed(1)}%`) },
        },
        legend: { position: 'bottom' },
        dataLabels: { enabled: false },
      }
    })

    onMounted(fetchReport)

    return {
      t,
      loading,
      selectedYear,
      onYearChange,
      statCards,
      projects,
      projectFields,
      methodRows,
      methodFields,
      totalNdtTests,
      repairRateClass,
      formatPercent,
      donutSeries,
      donutOptions,
      trendMode,
      trendOptions,
      showVolume,
      trendSeries,
      trendChartOptions,
    }
  },
}
</script>

<style scoped lang="scss">
.kpi-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

@media (min-width: 768px) {
  .kpi-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}

// Only once there is room for readable cards do all seven share a row.
@media (min-width: 1400px) {
  .kpi-grid { grid-template-columns: repeat(7, minmax(0, 1fr)); }
}

.kpi-title {
  font-size: 0.85rem;
  line-height: 1.25;
}

.kpi-value {
  font-size: 1.6rem;
}
</style>
