import axios from '@axios'
import {
  computed, ref, watch, reactive,
} from '@vue/composition-api'
import route from 'ziggy-js'
import toaster from './toaster'

export default function useLendings() {
  const busy = ref(false)
  const respResult = ref(null)
  const lendings = ref([])
  const lending = ref(null)
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
    equipmentId: '',
  })

  const tableColumns = [
    { key: 'id', sortable: false },
    { key: 'lending_date', sortable: true },
    { key: 'returned_date', sortable: false },
    { key: 'loaned_to', sortable: false },
    { key: 'equipment.name', sortable: false, label: 'Euipment' },
    { key: 'registered_by.name', sortable: false, label: 'Registered By' },
    { key: 'actions' },
  ]


  const dataMeta = computed(() => {
    const localItemsCount = refListTable.value ? refListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalRecords.value,
    }
  })

  const fetchLendings = async () => {
    try {
      busy.value = true
      const response = await axios.get(route('lendings.index'), {
        params: {
          q: searchQuery.value,
          perPage: perPage.value,
          page: currentPage.value,
          sortBy: sortBy.value,
          sortDesc: isSortDirDesc.value,
          ...filters,
        },
      })
      lendings.value = response.data.data
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

  const getLending = async id => {
    try {
      const response = await axios.get(route('lendings.show', { id }))
      lending.value = response.data.data
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


  const storeLending = async data => {
    errors.value = ''
    try {
      busy.value = true
      const response = await axios.post(route('lendings.store'), data)
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


  const updateLending = async (data, id) => {
    errors.value = ''
    try {
      busy.value = true
      const response = await axios.post(route('lendings.update', id), data)
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

  const deleteLending = async id => {
    try {
      busy.value = true
      const response = await axios.delete(route('lendings.destroy', id))
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
  const resolveLendingstatus = status => {
    if (status === 'Pending') {
      return 'warning'
    } if (status === 'Complete Information') { return 'danger' }
    return 'primary'
  }

  const fetchLendingsList = async (searchString = '') => {
    busy.value = true
    try {
      const response = await axios.get(route('lendings.index'), {
        params: {
          q: searchString,
        },
      })
      lendings.value = response.data.data
    } catch (e) {
      toast.error(e.response.data.message)
    } finally {
      busy.value = false
    }
  }


  const attachmentFields = [
    { key: 'name' },
    { key: 'attachment' },
  ]
  const attachmentData = [
    { name: 'hello.png', attachment: 'hello' },
    { name: 'hello.png', attachment: 'hello' },
  ]
  watch([currentPage, searchQuery, perPage], () => {
    fetchLendings()
  })

  return {
    busy,
    sortBy,
    errors,
    perPage,
    lending,
    dataMeta,
    filters,
    lendings,
    getLending,
    respResult,
    currentPage,
    searchQuery,
    totalRecords,
    tableColumns,
    deleteLending,
    isSortDirDesc,
    updateLending,
    fetchLendings,
    storeLending,
    perPageOptions,
    attachmentData,
    attachmentFields,
    fetchLendingsList,
    resolveLendingstatus,
  }
}

