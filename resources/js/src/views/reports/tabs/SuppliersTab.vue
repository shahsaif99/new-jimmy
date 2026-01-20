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

      <!-- Charts Row 1 -->
      <b-row class="mb-2">
        <!-- Supplier Evaluations Pie Chart -->
        <b-col cols="12" md="5">
          <b-card class="h-100">
            <div class="d-flex justify-content-between align-items-start mb-1">
              <h6 class="font-weight-bold">{{ t('Supplier Evaluations') }}</h6>
              <span class="text-muted">{{ t('Total Suppliers') }}: {{ totalSuppliers }}</span>
            </div>
            <vue-apex-charts
              type="pie"
              height="300"
              :options="evaluationChartOptions"
              :series="evaluationChartSeries"
            />
            <div class="text-right mt-1">
              <span class="cursor-pointer text-primary" @click="expandCard('evaluations')">
                <feather-icon icon="ChevronRightIcon" size="16" />
                {{ t('Expand') }}
              </span>
            </div>
          </b-card>
        </b-col>

        <!-- Supplier Evaluation - Registered Monthly Line Chart -->
        <b-col cols="12" md="7">
          <b-card class="h-100">
            <h6 class="font-weight-bold mb-1">{{ t('Supplier Evaluation - registered monthly') }}</h6>
            <vue-apex-charts
              type="line"
              height="300"
              :options="monthlyChartOptions"
              :series="monthlyChartSeries"
            />
            <div class="text-right mt-1">
              <span class="cursor-pointer text-primary" @click="expandCard('monthlySuppliers')">
                <feather-icon icon="ChevronRightIcon" size="16" />
                {{ t('Expand') }}
              </span>
            </div>
          </b-card>
        </b-col>
      </b-row>

      <!-- Charts Row 2 -->
      <b-row>
        <!-- Supplier Management Systems Bar Chart -->
        <b-col cols="12" md="6">
          <b-card class="h-100">
            <div class="d-flex justify-content-between align-items-start mb-1">
              <h6 class="font-weight-bold">{{ t('Supplier Management Systems') }}</h6>
              <span class="text-muted">{{ t('Total Suppliers') }}: {{ totalSuppliers }}</span>
            </div>
            <vue-apex-charts
              type="bar"
              height="300"
              :options="managementSystemsChartOptions"
              :series="managementSystemsChartSeries"
            />
            <div class="text-right mt-1">
              <span class="cursor-pointer text-primary" @click="expandCard('managementSystems')">
                <feather-icon icon="ChevronRightIcon" size="16" />
                {{ t('Expand') }}
              </span>
            </div>
          </b-card>
        </b-col>

        <!-- Supplier Of Bar Chart -->
        <b-col cols="12" md="6">
          <b-card class="h-100">
            <div class="d-flex justify-content-between align-items-start mb-1">
              <h6 class="font-weight-bold">{{ t('Supplier of') }}</h6>
              <span class="text-muted">{{ t('Total Suppliers') }}: {{ totalSuppliers }}</span>
            </div>
            <vue-apex-charts
              type="bar"
              height="300"
              :options="supplierOfChartOptions"
              :series="supplierOfChartSeries"
            />
            <div class="text-right mt-1">
              <span class="cursor-pointer text-primary" @click="expandCard('supplierOf')">
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
        <div v-if="expandModalType === 'evaluations'">
          <div class="d-flex justify-content-end mb-2">
            <span class="text-muted">{{ t('Total Suppliers') }}: {{ totalSuppliers }}</span>
          </div>
          <vue-apex-charts
            type="pie"
            height="400"
            :options="evaluationChartOptions"
            :series="evaluationChartSeries"
          />
        </div>

        <div v-else-if="expandModalType === 'monthlySuppliers'">
          <vue-apex-charts
            type="line"
            height="400"
            :options="monthlyChartOptions"
            :series="monthlyChartSeries"
          />
        </div>

        <div v-else-if="expandModalType === 'managementSystems'">
          <div class="d-flex justify-content-end mb-2">
            <span class="text-muted">{{ t('Total Suppliers') }}: {{ totalSuppliers }}</span>
          </div>
          <vue-apex-charts
            type="bar"
            height="400"
            :options="managementSystemsChartOptions"
            :series="managementSystemsChartSeries"
          />
        </div>

        <div v-else-if="expandModalType === 'supplierOf'">
          <div class="d-flex justify-content-end mb-2">
            <span class="text-muted">{{ t('Total Suppliers') }}: {{ totalSuppliers }}</span>
          </div>
          <vue-apex-charts
            type="bar"
            height="400"
            :options="supplierOfChartOptions"
            :series="supplierOfChartSeries"
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
  name: 'SuppliersTab',
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
    const evaluations = ref([])
    const loading = ref(false)

    // Modal state
    const showExpandModal = ref(false)
    const expandModalType = ref('')
    const expandModalTitle = ref('')

    // Year selector - read from query param or default to current year
    const yearParam = currentRoute.value.query.year
    const initialYear = yearParam ? new Date(`${yearParam}-01-01`) : new Date()
    const selectedYear = ref(initialYear)

    // Fetch all supplier evaluations
    const fetchSupplierEvaluations = async () => {
      try {
        loading.value = true
        const year = selectedYear.value ? new Date(selectedYear.value).getFullYear() : new Date().getFullYear()
        const response = await axios.get(route('supplier-evaluations.index'), {
          params: {
            year,
          },
        })
        evaluations.value = response.data.evaluations || []
      } catch (error) {
        console.error('Error fetching supplier evaluations:', error)
      } finally {
        loading.value = false
      }
    }

    const onYearChange = () => {
      // Update query parameter
      const year = selectedYear.value ? new Date(selectedYear.value).getFullYear() : new Date().getFullYear()
      router.replace({
        query: { ...currentRoute.value.query, year },
      }).catch(() => {})
      fetchSupplierEvaluations()
    }

    // Watch for query param changes (when switching tabs)
    watch(
      () => currentRoute.value.query.year,
      newYear => {
        if (newYear) {
          const newDate = new Date(`${newYear}-01-01`)
          if (newDate.getFullYear() !== new Date(selectedYear.value).getFullYear()) {
            selectedYear.value = newDate
            fetchSupplierEvaluations()
          }
        }
      }
    )

    // Get unique suppliers from evaluations
    const uniqueSuppliers = computed(() => {
      const supplierMap = new Map()
      evaluations.value.forEach(evaluation => {
        if (evaluation.supplier && !supplierMap.has(evaluation.supplier_id)) {
          supplierMap.set(evaluation.supplier_id, evaluation.supplier)
        }
      })
      return Array.from(supplierMap.values())
    })

    // Statistics
    const totalSuppliers = computed(() => uniqueSuppliers.value.length)

    // Supplier Evaluations Pie Chart (Meets requirements vs Not meet requirements)
    const evaluationChartOptions = ref({
      chart: {
        type: 'pie',
        toolbar: { show: false },
      },
      labels: ['Meets requirements', 'Not meet requirements'],
      colors: ['#7CB5EC', '#434348'],
      legend: {
        position: 'right',
        fontSize: '12px',
      },
    })

    const evaluationChartSeries = computed(() => {
      const meetsRequirements = evaluations.value.filter(
        d => d.status === 'meets_requirements'
      ).length
      const notMeetsRequirements = evaluations.value.filter(
        d => d.status === 'does_not_meet_requirements'
      ).length
      return [meetsRequirements, notMeetsRequirements]
    })

    // Monthly Line Chart - based on evaluation_date
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
      colors: ['#7CB5EC'],
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

      evaluations.value.forEach(evaluation => {
        const dateStr = evaluation.evaluation_date
        if (dateStr) {
          const date = new Date(dateStr)
          if (!isNaN(date.getTime())) {
            const month = date.getMonth()
            monthlyCounts[month]++
          }
        }
      })

      return [{
        name: t('Evaluations'),
        data: monthlyCounts,
      }]
    })

    // Management Systems Bar Chart - from supplier data
    const managementSystemsChartOptions = ref({
      chart: {
        type: 'bar',
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 4,
          barHeight: '60%',
        },
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: '12px',
          colors: ['#fff'],
        },
      },
      xaxis: {
        categories: ['ISO 9001', 'ISO 14001', 'ISO 45001', 'Miljøfyrtårn'],
      },
      yaxis: {
        labels: {
          style: {
            fontSize: '11px',
          },
        },
      },
      colors: ['#7CB5EC'],
      legend: {
        show: false,
      },
    })

    const managementSystemsChartSeries = computed(() => {
      const systems = {
        'ISO 9001': 0,
        'ISO 14001': 0,
        'ISO 45001': 0,
        'Miljofyrtan': 0,
      }

      uniqueSuppliers.value.forEach(supplier => {
        if (supplier.management_systems && Array.isArray(supplier.management_systems)) {
          supplier.management_systems.forEach(system => {
            if (system in systems) {
              systems[system]++
            }
          })
        }
      })

      return [{
        name: t('Suppliers'),
        data: [systems['ISO 9001'], systems['ISO 14001'], systems['ISO 45001'], systems['Miljofyrtan']],
      }]
    })

    // Supplier Of Bar Chart - from supplier data
    const supplierOfChartOptions = ref({
      chart: {
        type: 'bar',
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 4,
          barHeight: '60%',
        },
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: '12px',
          colors: ['#fff'],
        },
      },
      xaxis: {
        categories: [
          'Comprehensive service',
          'Hiring of personnel',
          'Delivery of critical goods/components',
          'Subcontractors',
        ],
      },
      yaxis: {
        labels: {
          style: {
            fontSize: '11px',
          },
        },
      },
      colors: ['#7CB5EC'],
      legend: {
        show: false,
      },
    })

    const getSupplierOfCounts = () => {
      const counts = {
        comprehensive_service: 0,
        hiring_of_personnel: 0,
        delivery_of_critical_goods_components: 0,
        subcontractors: 0,
        delivery_of_non_critical_goods: 0,
      }

      uniqueSuppliers.value.forEach(supplier => {
        if (supplier.supplier_of) {
          const supplierOfArray = Array.isArray(supplier.supplier_of)
            ? supplier.supplier_of
            : [supplier.supplier_of]

          supplierOfArray.forEach(item => {
            if (item in counts) {
              counts[item]++
            }
          })
        }
      })

      return counts
    }

    const supplierOfChartSeries = computed(() => {
      const counts = getSupplierOfCounts()
      return [{
        name: t('Suppliers'),
        data: [
          counts.comprehensive_service,
          counts.hiring_of_personnel,
          counts.delivery_of_critical_goods_components,
          counts.subcontractors,
        ],
      }]
    })

    const modalTitles = {
      evaluations: 'Supplier Evaluations',
      monthlySuppliers: 'Supplier Evaluation - registered monthly',
      managementSystems: 'Supplier Management Systems',
      supplierOf: 'Supplier of',
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
      await fetchSupplierEvaluations()
    })

    return {
      t,
      loading,
      selectedYear,
      onYearChange,
      totalSuppliers,
      evaluationChartOptions,
      evaluationChartSeries,
      monthlyChartOptions,
      monthlyChartSeries,
      managementSystemsChartOptions,
      managementSystemsChartSeries,
      supplierOfChartOptions,
      supplierOfChartSeries,
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
