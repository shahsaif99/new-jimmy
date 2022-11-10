import axios from '@axios'
import { ref } from '@vue/composition-api'
import toaster from './toaster'

export default function useExport() {
  const toast = toaster()
  const respResult = ref(null)
  const busy = ref(false)

  const exportData = async (url, data) => {
    try {
      busy.value = true
      const response = await axios.post(url, data, {
        responseType: 'blob',
      })
      respResult.value = response.data
    } catch (error) {
      if (error.message === 'Network Error') {
        toast.error(error.message)
      } else {
        respResult.value = error
        toast.error(error.response.data.message)
      }
    } finally {
      busy.value = false
    }
  }
  return {
    exportData,
    respResult,
    busy,
  }
}
