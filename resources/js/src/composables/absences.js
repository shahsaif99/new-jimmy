import axios from '@axios'
import { computed, ref, watch } from '@vue/composition-api'
import route from 'ziggy-js'
import toaster from './toaster'

export default function useAbsences() {
  const busy = ref(false)
  const respResult = ref(null)
  const absences = ref([])
  const absence = ref(null)
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

  const tableColumns = [
    { key: 'id', sortable: false },
    { key: 'type', sortable: true },
    { key: 'from_date', sortable: false },
    { key: 'to_date', sortable: false },
    { key: 'days', sortable: false },
    { key: 'status', sortable: false },
    { key: 'approved_by', sortable: false },
    { key: 'approved_date', sortable: false },
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

  const fetchAbsences = async () => {
    try {
      busy.value = true
      const response = await axios.get(route('absences.index'), {
        params: {
          q: searchQuery.value,
          perPage: perPage.value,
          page: currentPage.value,
          sortBy: sortBy.value,
          sortDesc: isSortDirDesc.value,
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
      absence.value = response.data.data
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

  const uploadDocument = async (data, id) => {
    console.log(data)
    errors.value = ''
    try {
      busy.value = true
      const response = await axios.post(route('absences.upload.documents', id), data)
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
  const resolveAbsencestatus = status => {
    if (status === 'Pending') {
      return 'warning'
    } if (status === 'Complete Information') { return 'danger' }
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


  const attachmentFields = [
    { key: 'name' },
    { key: 'attachment' },
  ]
  const attachmentData = [
    { name: 'hello.png', attachment: 'hello' },
    { name: 'hello.png', attachment: 'hello' },
  ]
  watch([currentPage, searchQuery], () => {
    fetchAbsences()
  })

  return {
    busy,
    sortBy,
    errors,
    perPage,
    absence,
    dataMeta,
    absences,
    getAbsence,
    respResult,
    currentPage,
    searchQuery,
    totalRecords,
    tableColumns,
    deleteAbsence,
    isSortDirDesc,
    updateAbsence,
    fetchAbsences,
    storeAbsence,
    perPageOptions,
    attachmentData,
    uploadDocument,
    attachmentFields,
    fetchAbsencesList,
    resolveAbsencestatus,
  }
}

