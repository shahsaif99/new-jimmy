import axios from '@axios'
import {
  computed, ref, watch, reactive,
} from '@vue/composition-api'
import route from 'ziggy-js'
import toaster from './toaster'

export default function useAbsences() {
  const busy = ref(false)
  const respResult = ref(null)
  const absences = ref([])
  const errors = ref({})
  const absenceData = ref({})
  const absencesStats = ref({})
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
    { key: 'user', sortable: true, label: 'Employee Name' },
    { key: 'from_date', sortable: false, label: 'From Date' },
    { key: 'to_date', sortable: false, label: 'To Date' },
    { key: 'days', sortable: false, label: 'Days' },
    { key: 'status', sortable: false, label: 'Status' },
    {
      key: 'comments', sortable: false, label: 'Comments', width: 100,
    },
    { key: 'approved_by', sortable: false, label: 'Approved By' },
    { key: 'approved_date', sortable: false, label: 'Approved Date' },
    { key: 'actions', label: 'Actions' },
  ]

  const pendingTableColumns = [
    { key: 'user', sortable: true, label: 'Employee Name' },
    { key: 'from_date', sortable: false, label: 'From Date' },
    { key: 'to_date', sortable: false, label: 'To Date' },
    { key: 'days', sortable: false, label: 'Days' },
    { key: 'status', sortable: false, label: 'Status' },
    {
      key: 'comments', sortable: false, label: 'Comments', width: 100,
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
    { field: 'approved_by', label: 'Approved By' },
    { field: 'approved_date', label: 'Approved Date' },
    {
      label: 'Actions',
      field: 'actions',
    },
  ]

  //   const overviewTableColumns = [
  //     { key: 'user', sortable: true, label: 'Employee Name' },
  //     // { key: 'user.name', sortable: true, label: 'Employee Name' },
  //     { key: 'from_date', sortable: false, label: 'From Date' },
  //     { key: 'to_date', sortable: false, label: 'To Date' },
  //     { key: 'days', sortable: false, label: 'Days' },
  //     { key: 'status', sortable: false, label: 'Status' },
  //     { key: 'type', sortable: true, label: 'Type' },
  //     {
  //       key: 'comments', sortable: false, label: 'Comments', width: 100,
  //     },
  //     { key: 'actions', label: 'Actions' },
  //   ]

  const dataMeta = computed(() => {
    const localItemsCount = refListTable.value ? refListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalRecords.value,
    }
  })

  const fetchAbsences = async params => {
    try {
      busy.value = true
      const response = await axios.get(route('absences.index'), {
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
      absences.value = response.data.data
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

  const getAbsence = async id => {
    try {
      const response = await axios.get(route('absences.show', { id }))
      absenceData.value = response.data.data
      console.log(absenceData.value)
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


  const storeAbsence = async data => {
    errors.value = ''
    try {
      busy.value = true
      const response = await axios.post(route('absences.store'), data)
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


  const updateAbsence = async data => {
    errors.value = ''
    try {
      busy.value = true
      const response = await axios.put(route('absences.update', data.id), data)
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


  const deleteAbsence = async id => {
    try {
      busy.value = true
      const response = await axios.delete(route('absences.destroy', id))
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

  const fetchAbsencesList = async (searchString = '') => {
    busy.value = true
    try {
      const response = await axios.get(route('absences.index'), {
        params: {
          q: searchString,
        },
      })
      absences.value = response.data.data
    } catch (e) {
      toast.error(e.response.data.message)
    } finally {
      busy.value = false
    }
  }

  const fetchAbsencesStats = async (searchString = '') => {
    busy.value = true
    try {
      const response = await axios.get(route('absences.statistics'), {
        params: {
          q: searchString,
        },
      })
      absencesStats.value = response.data.data
    } catch (e) {
      toast.error(e.response.data.message)
    } finally {
      busy.value = false
    }
  }

  const updateAbsenceStatus = async userData => {
    try {
      busy.value = true
      const response = await axios.post(route('absences.status', userData.id), userData)
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
    fetchAbsences()
  })

  return {
    busy,
    sortBy,
    errors,
    perPage,
    dataMeta,
    filters,
    absences,
    getAbsence,
    respResult,
    absenceData,
    currentPage,
    searchQuery,
    totalRecords,
    tableColumns,
    deleteAbsence,
    isSortDirDesc,
    absencesStats,
    updateAbsence,
    fetchAbsences,
    storeAbsence,
    resolveStatus,
    perPageOptions,
    fetchAbsencesList,
    fetchAbsencesStats,
    updateAbsenceStatus,
    pendingTableColumns,
    overviewTableColumns,
  }
}

