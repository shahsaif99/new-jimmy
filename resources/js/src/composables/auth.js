import axios from '@axios'
import { ref } from '@vue/composition-api'
import route from 'ziggy-js'
import toaster from './toaster'

export default function useAuth() {
  const busy = ref(false)
  const responseStatus = ref(null)
  const toast = toaster()
  const errors = ref({})


  const login = async loginData => {
    try {
      busy.value = true
      const response = await axios.post(route('login'), loginData)
      responseStatus.value = response
    } catch (error) {
      if (error.message === 'Network Error') {
        toast.error(error.message)
      } else {
        if (error.response.status === 422) {
          errors.value = error.response.data.errors
        }
        responseStatus.value = error
        toast.error(error.response.data.message)
      }
    } finally {
      busy.value = false
    }
  }

  const forgotPassword = async email => {
    try {
      busy.value = true
      const response = await axios.post(route('password.email'), { email })
      toast.success(response.data.message)
    } catch (error) {
      if (error.message === 'Network Error') {
        toast.error(error.message)
      } else {
        responseStatus.value = error
        toast.error(error.response.data.message)
      }
    } finally {
      busy.value = false
    }
  }


  const resetPassword = async formData => {
    try {
      busy.value = true
      const response = await axios.post(route('password.reset'), formData)
      responseStatus.value = response
      toast.success(response.data.message)
    } catch (error) {
      if (error.message === 'Network Error') {
        toast.error(error.message)
      } else {
        responseStatus.value = error
        toast.error(error.response.data.message)
      }
    } finally {
      busy.value = false
    }
  }

  return {
    busy,
    login,
    forgotPassword,
    resetPassword,
    responseStatus,
  }
}
