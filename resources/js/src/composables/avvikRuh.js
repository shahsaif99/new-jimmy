import axios from '@axios'
import {
  computed, ref, watch, reactive,
} from '@vue/composition-api'
import route from 'ziggy-js'
import toaster from './toaster'

export default function useAvvikRuh() {
  const busy = ref(false)
  const respResult = ref(null)
  const avvikruhListings = ref([])
  const avvikData = ref({})
  const avvikStatistics = ref({})
  const errors = ref({})
  const toast = toaster()
  const perPage = ref(10)
  const totalRecords = ref(0)
  const currentPage = ref(1)
  const perPageOptions = [10, 25, 50, 100]
  const searchQuery = ref('')
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)
  const refListTable = ref(null)
  const filters = reactive({
  })


  const tableColumns = [
    { key: 'id', sortable: true, label: 'ID' },
    { key: 'title', sortable: true, label: 'Title' },
    { key: 'type', sortable: false, label: 'Type' },
    { key: 'date', sortable: false, label: 'Registration Date' },
    { key: 'status', sortable: false, label: 'Status' },
    { key: 'user.name', sortable: false, label: 'Responsible' },
    { key: 'severity', sortable: false, label: 'Severity' },
    { key: 'project.name', sortable: false, label: 'Project' },
    { key: 'actions', label: 'Actions' },
  ]


  const dataMeta = computed(() => {
    const localItemsCount = refListTable.value ? refListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalRecords.value,
    }
  })


  const fetchAvvikListings = async () => {
    try {
      busy.value = true
      const response = await axios.get(route('avvikruh.index'), {
        params: {
          q: searchQuery.value,
          perPage: perPage.value,
          page: currentPage.value,
          sortBy: sortBy.value,
          sortDesc: isSortDirDesc.value,
          ...filters,
        },
      })
      avvikruhListings.value = response.data.data
      if (response.data.meta) {
        const { total } = response.data.meta
        totalRecords.value = total
      }
    } catch (error) {
      console.log(error)
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

  const getAvvikListing = async id => {
    try {
      const response = await axios.get(route('avvikruh.show', { id }))
      avvikData.value = response.data.data
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


  const storeAvvikListing = async (data, files = []) => {
    errors.value = ''
    try {
      busy.value = true
      const formData = new FormData()

      // Append all data fields
      Object.keys(data).forEach(key => {
        if (data[key] !== null && data[key] !== undefined) {
          if (typeof data[key] === 'object' && !(data[key] instanceof File)) {
            formData.append(key, JSON.stringify(data[key]))
          } else if (typeof data[key] === 'boolean') {
            formData.append(key, data[key] ? '1' : '0')
          } else {
            formData.append(key, data[key])
          }
        }
      })

      // Append files
      if (files && files.length > 0) {
        files.forEach((file, index) => {
          formData.append(`files[${index}]`, file)
        })
      }

      const response = await axios.post(route('avvikruh.store'), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
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


  const updateAvvikListing = async (data, id, files = [], filesToDelete = []) => {
    errors.value = ''
    try {
      busy.value = true
      const formData = new FormData()

      // Append all data fields
      Object.keys(data).forEach(key => {
        if (data[key] !== null && data[key] !== undefined) {
          if (typeof data[key] === 'object' && !(data[key] instanceof File)) {
            formData.append(key, JSON.stringify(data[key]))
          } else if (typeof data[key] === 'boolean') {
            formData.append(key, data[key] ? '1' : '0')
          } else {
            formData.append(key, data[key])
          }
        }
      })

      // Append files
      if (files && files.length > 0) {
        files.forEach((file, index) => {
          formData.append(`files[${index}]`, file)
        })
      }

      // Append files to delete
      if (filesToDelete && filesToDelete.length > 0) {
        filesToDelete.forEach((filename, index) => {
          formData.append(`files_to_delete[${index}]`, filename)
        })
      }

      // Use POST with _method for file uploads (Laravel doesn't support PUT with multipart/form-data)
      formData.append('_method', 'PUT')

      const response = await axios.post(route('avvikruh.update', id), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
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

  const deleteAvvikListing = async id => {
    try {
      busy.value = true
      const response = await axios.delete(route('avvikruh.destroy', id))
      toast.success(response.data.message)
      respResult.value = response
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
  const resolveEquipmentstatus = status => {
    if (status === 'Pending') {
      return 'warning'
    } if (status === 'Complete Information') { return 'danger' }
    return 'primary'
  }

  const fetchAvvikRuhList = async (searchString = '') => {
    busy.value = true
    try {
      const response = await axios.get(route('avvikruh.index'), {
        params: {
          q: searchString,
        },
      })
      avvikruhListings.value = response.data.data
    } catch (e) {
      toast.error(e.response.data.message)
    } finally {
      busy.value = false
    }
  }

  const fetchAvvikStatistics = async () => {
    try {
      const response = await axios.get(route('avvikruh.statistics'))
      avvikStatistics.value = response.data
    } catch (e) {
      toast.error(e.response.data.message)
    }
  }

  const resolveStatus = status => {
    if (status === 'Closed') {
      return 'success'
    } if (status === 'Open') { return 'warning' }
    return 'primary'
  }

  watch([currentPage, searchQuery, perPage], () => {
    fetchAvvikListings()
  })

  return {
    busy,
    sortBy,
    errors,
    filters,
    perPage,
    avvikData,
    dataMeta,
    resolveStatus,
    avvikStatistics,
    fetchAvvikStatistics,
    avvikruhListings,
    storeAvvikListing,
    getAvvikListing,
    respResult,
    updateAvvikListing,
    fetchAvvikListings,
    currentPage,
    searchQuery,
    totalRecords,
    tableColumns,
    refListTable,
    deleteAvvikListing,
    isSortDirDesc,
    perPageOptions,
    fetchAvvikRuhList,
    resolveEquipmentstatus,
  }
}

