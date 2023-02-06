import axios from '@axios'
import { ref, reactive } from '@vue/composition-api'
import route from 'ziggy-js'
import toaster from './toaster'

export default function useDocuments() {
  const toast = toaster()
  const documentsData = ref({})
  const busy = ref(false)
  const errors = ref({})
  const filters = reactive({
  })
  const respResult = ref(null)
  const searchQuery = ref('')

  const getDocuments = async () => {
    try {
      const response = await axios.get(route('documents'), {
        params: {
          q: searchQuery.value,
          ...filters,
        },
      })
      documentsData.value = response.data
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
    }
  }


  const storeDocument = async data => {
    errors.value = ''
    try {
      busy.value = true
      const response = await axios.post(route('documents.store'), data)
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

  const updateDocument = async data => {
    errors.value = ''
    try {
      console.log(data.id)
      busy.value = true
      const response = await axios.post(route('documents.update', data.id), data)
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
    filters,
    updateDocument,
    getDocuments,
    documentsData,
    storeDocument,
  }
}
