import axios from '@axios'
import route from 'ziggy-js'
import { ref } from '@vue/composition-api'
import toaster from './toaster'

export default function useDashboard() {
  const busy = ref(false)
  const toast = toaster()
  const statistics = ref({
    incidents_this_week: 0,
    incidents_week_diff: 0,
    incidents_this_year: 0,
    incidents_year_change: 0,
    incidents_overdue: 0,
    monthly_labels: [],
    monthly_counts: [],
    monthly_average: 0,
    expiring_equipment: 0,
    expiring_equipment_diff: 0,
    expiring_competence: 0,
    expiring_competence_diff: 0,
    my_tasks: [],
    board_items: [],
  })
  const isDataFetched = ref(false)

  const fetchStatistics = async () => {
    try {
      busy.value = true
      const response = await axios.get(route('dashboard.statistics'))
      statistics.value = response.data
      isDataFetched.value = true
    } catch (e) {
      console.log(e)
      if (e.response && e.response.data) {
        toast.error(e.response.data.message)
      }
    } finally {
      busy.value = false
    }
  }

  return {
    busy,
    statistics,
    fetchStatistics,
    isDataFetched,
  }
}
