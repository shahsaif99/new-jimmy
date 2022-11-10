import axios from '@axios'
import { ref } from '@vue/composition-api'
import useJwt from '@/auth/jwt/useJwt'
import route from 'ziggy-js'
import toaster from './toaster'

export default function useAccount() {
  const toast = toaster()
  const accountData = ref(null)
  const busy = ref(false)
  const errors = ref({})
  const fetchAccount = async () => {
    const response = await axios.get(route('account'))
    accountData.value = response.data.data
  }
  const updatePassword = async formData => {
    try {
      busy.value = true
      const response = await axios.put(route('account.password'), formData)
      toast.success(response.data.message)
    } catch (err) {
      if (err.response.status === 422) {
        errors.value = err.response.data.errors
      }
      toast.error(err.response.data.message)
    } finally {
      busy.value = false
    }
  }
  const updateGeneral = async formData => {
    try {
      busy.value = true
      const response = await axios.put(route('account.general'), formData)
      const { data } = response.data
      useJwt.setUserData(JSON.stringify(data))
      toast.success(response.data.message)
    } catch (err) {
      if (err.response.status === 422) {
        errors.value = err.response.data.errors
      }
      toast.error(err.response.data.message)
    } finally {
      busy.value = false
    }
  }
  return {
    busy,
    errors,
    accountData,
    fetchAccount,
    updateGeneral,
    updatePassword,
  }
}
