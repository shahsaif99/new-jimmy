import axios from '@axios'
import {
  computed, ref, watch, reactive,
} from '@vue/composition-api'
import route from 'ziggy-js'
import toaster from './toaster'

export default function useVacations() {
  const busy = ref(false)
  const respResult = ref(null)
  const vacations = ref([])
  const errors = ref({})
  const vacationData = ref({})
  const vacationsStats = ref({})
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
    { key: 'user', sortable: true, label: 'Name' },
    { key: 'from_date', sortable: false },
    { key: 'to_date', sortable: false },
    { key: 'days', sortable: false },
    { key: 'status', sortable: false },
    {
      key: 'comments', sortable: false, width: 100,
    },
    { key: 'approved_by', sortable: false },
    { key: 'approved_date', sortable: false },
    { key: 'actions', label: 'Actions' },
  ]

  const pendingTableColumns = [
    { key: 'user', sortable: true, label: 'Name' },
    { key: 'from_date', sortable: false },
    { key: 'to_date', sortable: false },
    { key: 'days', sortable: false },
    { key: 'status', sortable: false },
    {
      key: 'comments', sortable: false, width: 100,
    },
    { key: 'actions', label: 'Actions' },
  ]

  const overviewTableColumns = [
    {
      label: 'From Date',
      field: 'from_date',
      type: 'date',
      dateInputFormat: 'yyyy-MM-dd', // expects 2018-03-16
      dateOutputFormat: 'MM.dd.yyyy', //
    },
    {
      label: 'To Date',
      field: 'to_date',
      type: 'date',
      dateInputFormat: 'yyyy-MM-dd', // expects 2018-03-16
      dateOutputFormat: 'MM.dd.yyyy', //
    },
    {
      label: 'Days',
      field: 'days',
    },
    {
      label: 'Status',
      field: 'status',
    },
    {
      label: 'Comments',
      field: 'comments',
    },
    {
      field: 'approved_date',
      label: 'Approved Date',
      type: 'date',
      dateInputFormat: 'yyyy-MM-dd', // expects 2018-03-16
      dateOutputFormat: 'MM.dd.yyyy', //
    },
    {
      label: 'Actions',
      field: 'actions',
    },
  ]


  const dataMeta = computed(() => {
    const localItemsCount = refListTable.value ? refListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalRecords.value,
    }
  })

  const fetchVacations = async params => {
    try {
      busy.value = true
      const response = await axios.get(route('vacations.index'), {
        params: {
          ...params,
          q: searchQuery.value,
          perPage: perPage.value,
          page: currentPage.value,
          sortBy: sortBy.value,
          sortDesc: isSortDirDesc.value,
          ...filters,
        },
      })
      vacations.value = response.data.data
      if (response.data.meta) {
        const { total } = response.data.meta
        totalRecords.value = total
      }
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

  const getVacation = async id => {
    try {
      const response = await axios.get(route('vacations.show', { id }))
      vacationData.value = response.data.data
      console.log(vacationData.value)
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


  const storeVacation = async data => {
    errors.value = ''
    try {
      busy.value = true
      const response = await axios.post(route('vacations.store'), data)
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


  const updateVacation = async data => {
    errors.value = ''
    try {
      busy.value = true
      const response = await axios.put(route('vacations.update', data.id), data)
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


  const deleteVacation = async id => {
    try {
      busy.value = true
      const response = await axios.delete(route('vacations.destroy', id))
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
  const resolveStatus = status => {
    if (status === 'pending') {
      return 'warning'
    } if (status === 'approved') { return 'success' }
    if (status === 'declined') { return 'danger' }
    return 'primary'
  }

  const fetchVacationsList = async (searchString = '') => {
    busy.value = true
    try {
      const response = await axios.get(route('vacations.index'), {
        params: {
          q: searchString,
        },
      })
      vacations.value = response.data.data
    } catch (e) {
      toast.error(e.response.data.message)
    } finally {
      busy.value = false
    }
  }

  const fetchVacationsStats = async (searchString = '') => {
    busy.value = true
    try {
      const response = await axios.get(route('vacations.statistics'), {
        params: {
          q: searchString,
        },
      })
      vacationsStats.value = response.data.data
    } catch (e) {
      toast.error(e.response.data.message)
    } finally {
      busy.value = false
    }
  }

  const updateVacationStatus = async userData => {
    try {
      busy.value = true
      const response = await axios.post(route('vacations.status', userData.id), userData)
      respResult.value = response
      toast.success(response.data.message)
    } catch (e) {
      if (e.response.status === 422) {
        toast.error(e.response.data.message)
      }
    } finally {
      busy.value = false
    }
  }

  watch([currentPage, searchQuery, perPage], () => {
    fetchVacations()
  })

  return {
    busy,
    sortBy,
    errors,
    perPage,
    dataMeta,
    filters,
    vacations,
    getVacation,
    respResult,
    vacationData,
    currentPage,
    searchQuery,
    totalRecords,
    tableColumns,
    deleteVacation,
    isSortDirDesc,
    vacationsStats,
    updateVacation,
    fetchVacations,
    storeVacation,
    resolveStatus,
    perPageOptions,
    fetchVacationsList,
    fetchVacationsStats,
    updateVacationStatus,
    pendingTableColumns,
    overviewTableColumns,
  }
}

