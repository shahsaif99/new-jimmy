<!-- eslint-disable vue/no-parsing-error -->
<template>
  <b-overlay :show="busy" rounded="sm">
    <b-row>
      <!-- LEFT COLUMN -->
      <b-col md="7" class="d-flex flex-column">
        <!-- Action Buttons -->
        <h3 class="pb-2 pt-1 bold">{{ t('Welcome, ') }}{{ statistics.user.name }}</h3>
        <div class="d-flex flex-wrap mb-2" style="gap: 0.75rem;">
          <b-button
            variant="warning"
            size="lg"
            class="text-white d-flex align-items-center"
            @click="$router.push({ name: 'avvik-listings-create' })"
          >
            <feather-icon icon="AlertTriangleIcon" class="mr-50" />
            <span>{{ t('New Incident') }}</span>
          </b-button>
          <b-button
            variant="outline-secondary"
            size="lg"
            class="d-flex align-items-center"
            @click="$router.push({ name: 'avvik-listings-create', query: { type: 'Improvement Suggestion' } })"
          >
            <feather-icon icon="TrendingUpIcon" class="mr-50" />
            <span>{{ t('New Improvement') }}</span>
          </b-button>
          <b-button
            variant="outline-secondary"
            class="d-flex align-items-center"
            @click="$router.push({ name: 'tasks' })"
          >
            <feather-icon icon="CheckSquareIcon" class="mr-50" />
            <span>{{ t('New Task') }}</span>
          </b-button>
        </div>

        <!-- What would you like to do? Shortcuts -->
        <h5 class="mb-1">{{ t('What would you like to do?') }}</h5>
        <b-row class="mb-2">
          <b-col
            v-for="shortcut in shortcuts"
            :key="shortcut.label"
            cols="4"
            class="mb-1"
          >
            <b-card
              class="mb-0 h-100 cursor-pointer shortcut-card"
              :class="{ 'disabled-card': shortcut.disabled }"
              @click="!shortcut.disabled && $router.push({ name: shortcut.route })"
            >
              <div class="d-flex align-items-center">
                <feather-icon :icon="shortcut.icon" size="20" class="mr-75" />
                <span class="small">{{ t(shortcut.label) }}</span>
              </div>
            </b-card>
          </b-col>
        </b-row>

        <!-- Information Board -->
        <b-card class="mb-0 flex-grow-1">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <h4 class="font-weight-bold mb-0">{{ t('Information Board') }}</h4>
            <span
              class="cursor-pointer text-primary"
              @click="$router.push({ name: 'information-board' })"
            >
              <feather-icon icon="ArrowRightIcon" size="16" />
              {{ t('View all') }}
            </span>
          </div>
          <div v-if="statistics.board_items && statistics.board_items.length">
            <div
              v-for="item in statistics.board_items"
              :key="item.id"
              class="border-bottom py-1 cursor-pointer"
              @click="viewMessage(item)"
            >
              <div class="d-flex justify-content-between">
                <div>
                  <h5 class="mb-25">{{ item.title }}</h5>
                  <p class="mb-0 board-item-content">
                    {{ stripHtml(item.content) }}
                  </p>
                </div>
                <div class="text-right text-nowrap ml-1">
                  <small class="d-block">{{ item.created_at }}</small>
                  <small>{{ item.author }}</small>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-center text-muted py-2">
            {{ t('No information posted yet') }}
          </div>
        </b-card>
      </b-col>

      <!-- RIGHT COLUMN -->
      <b-col md="5" class="d-flex flex-column">
        <!-- Stat Cards -->
        <b-row class="mb-2">
          <b-col cols="4">
            <b-card class="text-center mb-0 h-100">
              <h5 class="mb-1">{{ t('Incidents this week') }}</h5>
              <h2 class="mb-50">{{ statistics.incidents_this_week }}</h2>
              <b-badge :variant="statistics.incidents_week_diff > 0 ? 'light-danger' : 'light-success'">
                {{ statistics.incidents_week_diff > 0 ? '+' : '' }}{{ statistics.incidents_week_diff }} {{ t('vs last week') }}
              </b-badge>
            </b-card>
          </b-col>
          <b-col cols="4">
            <b-card class="text-center mb-0 h-100">
              <h5 class="mb-1">{{ t('Incidents this year') }}</h5>
              <h2 class="mb-50">{{ statistics.incidents_this_year }}</h2>
              <b-badge :variant="statistics.incidents_year_change > 0 ? 'light-danger' : 'light-success'">
                {{ statistics.incidents_year_change > 0 ? '+' : '' }}{{ statistics.incidents_year_change }}% {{ t('vs last year') }}
              </b-badge>
            </b-card>
          </b-col>
          <b-col cols="4">
            <b-card class="text-center mb-0 h-100 border-danger">
              <h5 class="mb-1">{{ t('Incidents overdue') }}</h5>
              <h2 class="mb-50 text-danger">{{ statistics.incidents_overdue }}</h2>
              <b-badge variant="light-danger">
                {{ t('Requires attention') }}
              </b-badge>
            </b-card>
          </b-col>
        </b-row>

        <!-- Incidents Chart -->
        <b-card class="mb-2">
          <h5 class="mb-1">{{ t('Incidents Registered monthly') }}</h5>
          <vue-apex-charts
            v-if="isDataFetched"
            type="line"
            height="250"
            :options="chartOptions"
            :series="chartSeries"
          />
        </b-card>

        <!-- Expiring Cards -->
        <b-row class="mt-auto">
          <b-col cols="6">
            <b-card
              class="text-center mb-0 h-100 cursor-pointer"
              @click="$router.push({ name: 'equipments', query: { status: 'expires' } })"
            >
              <feather-icon icon="BriefcaseIcon" size="28" class="mb-1 text-warning" />
              <h5 class="mb-50">{{ t('Expiring Equipment') }}</h5>
              <h2 class="mb-50">{{ statistics.expiring_equipment }}</h2>
              <b-badge :variant="statistics.expiring_equipment_diff > 0 ? 'light-danger' : 'light-success'">
                {{ statistics.expiring_equipment_diff > 0 ? '+' : '' }}{{ statistics.expiring_equipment_diff }}
                {{ t('since last week') }}
              </b-badge>
            </b-card>
          </b-col>
          <b-col cols="6">
            <b-card
              class="text-center mb-0 h-100 cursor-pointer"
              @click="$router.push({ name: 'competence', query: { status: 'expiring' } })"
            >
              <feather-icon icon="AwardIcon" size="28" class="mb-1 text-info" />
              <h5 class="mb-50">{{ t('Expiring Competence') }}</h5>
              <h2 class="mb-50">{{ statistics.expiring_competence }}</h2>
              <b-badge :variant="statistics.expiring_competence_diff > 0 ? 'light-danger' : 'light-success'">
                {{ statistics.expiring_competence_diff > 0 ? '+' : '' }}{{ statistics.expiring_competence_diff }}
                {{ t('since last week') }}
              </b-badge>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <!-- My Tasks — full width -->
    <b-row class="mt-2">
      <b-col cols="12">
        <b-card class="mb-0">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <h5 class="font-weight-bold mb-0">{{ t('My Tasks') }}</h5>
            <span
              class="cursor-pointer text-primary"
              @click="$router.push({ name: 'tasks' })"
            >
              <feather-icon icon="ArrowRightIcon" size="16" />
              {{ t('View all') }}
            </span>
          </div>
          <b-table
            :items="statistics.my_tasks"
            :fields="taskFields"
            responsive
            show-empty
            :empty-text="t('No open tasks')"
            class="mb-0"
          >
            <template #cell(status)="data">
              <b-badge
                :style="{
                  backgroundColor: getStatusColor(data.value).bg,
                  color: getStatusColor(data.value).text,
                }"
              >
                {{ data.value }}
              </b-badge>
            </template>
            <template #cell(due_date)="data">
              {{ data.value || '-' }}
            </template>
            <template #cell(category)="data">
              {{ data.value || '-' }}
            </template>
            <template #cell(description)="data">
              <span class="text-truncate d-inline-block" style="max-width: 300px;">
                {{ data.value || '-' }}
              </span>
            </template>
          </b-table>
        </b-card>
      </b-col>
    </b-row>
    <ViewMessage
      v-if="showViewMessage"
      :showing="showViewMessage"
      :item="selectedMessage"
      @close="showViewMessage = false"
    />
  </b-overlay>
</template>

<script>
import { computed, onMounted, ref } from '@vue/composition-api'
import {
  BRow, BCol, BCard, BButton, BTable, BBadge, BOverlay,
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import useDashboard from '@/composables/dashboard'
import ViewMessage from '@/views/company/information-board/ViewMessage.vue'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BButton,
    BTable,
    BBadge,
    BOverlay,
    VueApexCharts,
    ViewMessage,
  },
  setup() {
    const { t } = useI18nUtils()
    const {
      busy, statistics, fetchStatistics, isDataFetched,
    } = useDashboard()

    const shortcuts = [
      { label: 'Documents', icon: 'FileTextIcon', route: 'procedures', disabled: false },
      { label: 'Risk', icon: 'ShieldIcon', route: 'avvik-listings', disabled: false },
      { label: 'Organization', icon: 'UsersIcon', route: 'company-information', disabled: false },
      { label: 'Equipment', icon: 'BriefcaseIcon', route: 'equipments', disabled: false },
      { label: 'Process', icon: 'SettingsIcon', route: '', disabled: true },
      { label: 'Competence', icon: 'AwardIcon', route: 'competence', disabled: false },
    ]

    const taskFields = [
      { key: 'title', label: t('Title') },
      { key: 'description', label: t('Description') },
      { key: 'due_date', label: t('Due date') },
      { key: 'category', label: t('Category') },
      { key: 'status', label: t('Status') },
    ]

    const getStatusColor = status => {
      const colors = {
        open: { bg: '#f0f9ff', text: '#38bdf8' },
        completed: { bg: '#ecfdf5', text: '#4ade80' },
        'in progress': { bg: '#fffbeb', text: '#fbbf24' },
        'on hold': { bg: '#fef2f2', text: '#f87171' },
      }
      return colors[status] || { bg: '#f3f4f6', text: '#6b7280' }
    }

    const stripHtml = html => {
      if (!html) return ''
      const tmp = document.createElement('DIV')
      tmp.innerHTML = html
      return tmp.textContent || tmp.innerText || ''
    }

    const chartOptions = computed(() => ({
      chart: {
        type: 'line',
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      stroke: {
        curve: 'smooth',
        width: [2, 2],
        dashArray: [0, 5],
      },
      colors: ['#7CB5EC', '#A0A0A0'],
      xaxis: {
        categories: statistics.value.monthly_labels || [],
      },
      yaxis: {
        min: 0,
        labels: {
          formatter: val => Math.round(val),
        },
      },
      markers: {
        size: [4, 0],
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
      },
      annotations: {
        yaxis: [
          {
            y: statistics.value.monthly_average || 0,
            borderColor: '#A0A0A0',
            strokeDashArray: 4,
            label: {
              text: `${t('Average')}: ${statistics.value.monthly_average || 0}`,
              position: 'left',
              style: {
                color: '#666',
                background: '#fff',
              },
            },
          },
        ],
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
    }))

    const chartSeries = computed(() => [
      {
        name: t('Incidents'),
        data: statistics.value.monthly_counts || [],
      },
    ])

    const showViewMessage = ref(false)
    const selectedMessage = ref({})

    const viewMessage = item => {
      selectedMessage.value = item
      showViewMessage.value = true
    }

    onMounted(() => {
      fetchStatistics()
    })

    return {
      t,
      busy,
      statistics,
      isDataFetched,
      shortcuts,
      taskFields,
      chartOptions,
      chartSeries,
      getStatusColor,
      stripHtml,
      viewMessage,
      showViewMessage,
      selectedMessage,
    }
  },
}
</script>

<style scoped>
.bold{
    font-weight: bold;
}
.small{
    font-weight: bold;
}
h5{
    font-weight: bold;
}
.shortcut-card {
  transition: all 0.2s ease;
}
.shortcut-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.disabled-card {
  opacity: 0.5;
  pointer-events: none;
}
.cursor-pointer {
  cursor: pointer;
}
.board-item-content {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
