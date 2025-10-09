import axios from '@axios'
import { ref } from '@vue/composition-api'
import route from 'ziggy-js'
import toaster from './toaster'

export default function useSettings() {
  const busy = ref(false)
  const respResult = ref(null)
  const settings = ref({})
  const errors = ref({})
  const toast = toaster()


  const fetchSettings = async () => {
    try {
      busy.value = true
      const response = await axios.get(route('settings.index'))
      settings.value = response.data.data
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


  const storeNewSetting = async data => {
    errors.value = ''
    try {
      busy.value = true
      const response = await axios.post(route('settings.store'), data)
      respResult.value = response
      toast.success(response.data.message)
    } catch (error) {
      if (error.message === 'Network Error') {
        toast.error(error.message)
      } else {
        if (error.response.status === 422) {
          errors.value = error.response.data.errors
        }
        respResult.value = error
        toast.error(error.response.data.message)
      }
    } finally {
      busy.value = false
    }
  }

  const updateSettings = async data => {
    errors.value = ''
    try {
      busy.value = true
      const response = await axios.put(route('settings.update', 1), data)
      respResult.value = response
      toast.success(response.data.message)
    } catch (error) {
      console.log(error)
      if (error.message === 'Network Error') {
        toast.error(error.message)
      } else {
        if (error.response.status === 422) {
          errors.value = error.response.data.errors
        }
        respResult.value = error
        toast.error(error.response.data.message)
      }
    } finally {
      busy.value = false
    }
  }


  return {
    busy,
    errors,
    settings,
    respResult,
    updateSettings,
    fetchSettings,
    storeNewSetting,
  }
}
