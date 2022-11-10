<template>
  <div />

</template>

<script>
import {
  BRow, BCol, BCard, BButton, BFormSelect, BFormSelectOption,
} from 'bootstrap-vue'
import useJwt from '@/auth/jwt/useJwt'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import useDashboard from '@/composables/dashboard'
import useLeads from '@/composables/leads'
import useUsers from '@/composables/users'
import { onMounted, ref, watch } from '@vue/composition-api'


export default {
  components: {

  },
  setup() {
    const {
      statistics,
      isDataFetched,
      fetchStatistics,
    } = useDashboard()

    const {
      sortBy,
      filters,
      perPage,
      leads,
      dataMeta,
      refetchData,
      fetchLeads,
      searchQuery,
      currentPage,
      totalRecords,
      tableColumns,
      refListTable,
      isSortDirDesc,
      perPageOptions,
    } = useLeads()
    const user = JSON.parse(useJwt.getUserData())
    const date = new Date()
    const year = date.getFullYear()
    const isAddLeadActive = ref(false)

    const makeShortcuts = ref([
      { text: 'Today', onClick: () => [new Date(), new Date()] },
      {
        text: 'Yesterday',
        onClick: () => [new Date(Date.now() - 3600 * 1000 * 24), new Date()],
      },
      {
        text: 'Last Week',
        onClick: () => [new Date(Date.now() - 7 * 24 * 3600 * 1000), new Date()],
      },
      {
        text: 'Monthly',
        onClick: () => [new Date(Date.now() - 30 * 24 * 3600 * 1000), new Date()],
      },
      {
        text: 'Yearly',
        onClick: () => [new Date(Date.now() - 365 * 24 * 3600 * 1000), new Date()],
      },
    ])


    const dashboardFilters = ref({
      period: [new Date(Date.now() - 30 * 24 * 3600 * 1000), new Date()],
      partner: 'all',
    })
    const monthlySales = ref({
      series: {},
      chartOptions: {
        xaxis: {
          categories: [],
        },
      },
    })

    const weeklyLeads = ref({
      series: {},
      chartOptions: {
        xaxis: {
          categories: [],
        },
      },
    })

    onMounted(async () => {
      await fetchStatistics()
    })


    // watch(statistics, () => {
    //   if (isDataFetched.value) {
    //     monthlySales.value.series = [
    //       {
    //         name: 'Settled',
    //         data: [10, 20, 30, 50, 40, 60],
    //       },
    //     ]
    //     monthlySales.value.chartOptions.xaxis.categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    //     // Weekly Leads
    //     weeklyLeads.value.series = [
    //       {
    //         name: 'Leads',
    //         data: [10, 5, 8, 4, 6, 12, 10],
    //       },
    //     ]
    //     weeklyLeads.value.chartOptions.xaxis.categories = ['12 Oct', '13 Oct', '14 Oct', '15 Oct', '16 Oct', '17 Oct', '18 Oct']
    //   }
    // })

    return {
      year,
      user,
      leads,
      sortBy,
      filters,
      perPage,
      dataMeta,
      fetchLeads,
      statistics,
      searchQuery,
      currentPage,
      refetchData,
      weeklyLeads,
      monthlySales,
      totalRecords,
      makeShortcuts,
      tableColumns,
      refListTable,
      isDataFetched,
      isSortDirDesc,
      perPageOptions,
      isAddLeadActive,
      dashboardFilters,
    }
  },
}
</script>
<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
</style>
