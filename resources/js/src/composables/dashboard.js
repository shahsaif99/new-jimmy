import axios from '@axios'
import { ref } from '@vue/composition-api'
import route from 'ziggy-js'
import toaster from './toaster'

export default function useDashboard() {
  const busy = ref(false)
  const errors = ref('')
  const toast = toaster()
  const statistics = ref({})
  const isDataFetched = ref(false)

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(route('dashboard.statistics'))
      statistics.value = response.data
      isDataFetched.value = true
    } catch (e) {
      console.log(e)
      toast.error(e.response.data.message)
    }
  }


  return {
    busy,
    errors,
    statistics,
    fetchStatistics,
    isDataFetched,
  }
}
