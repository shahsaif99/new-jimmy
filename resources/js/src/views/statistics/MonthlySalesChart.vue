<template>
  <b-card no-body>
    <b-card-header class="align-items-baseline">
      <div>
        <b-card-title class="mb-25">
          Monthly Sales
        </b-card-title>
        <b-card-text class="mb-0">
          Total Sales: 100,000
        </b-card-text>
      </div>
    </b-card-header>

    <b-card-body class="pb-0">
      <vue-apex-charts
        type="line"
        height="250"
        v-if="isDataFetched"
        :options="chartOptions"
        :series="monthlySales.series"
      />
    </b-card-body>
  </b-card>
</template>
<script>
import VueApexCharts from 'vue-apexcharts'
import {
  BCard, BCardHeader, BCardTitle, BCardText, BCardBody,
} from 'bootstrap-vue'
import { ref } from '@vue/composition-api'
import { $themeColors } from '@themeConfig'

export default {
  components: {
    VueApexCharts,
    BCard,
    BCardHeader,
    BCardTitle,
    BCardText,
    BCardBody,
  },
  props: {
    isDataFetched: {
      type: Boolean,
    },
    monthlySales: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const chartOptions = ref({
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
      colors: ['#df87f2'],
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
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
    })

    return {
      chartOptions,
    }
  },

}
</script>
