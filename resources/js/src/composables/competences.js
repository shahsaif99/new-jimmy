import axios from '@axios'
import {
  computed, ref, watch, reactive,
} from '@vue/composition-api'
import route from 'ziggy-js'
import toaster from './toaster'

export default function useCompetences() {
  const busy = ref(false)
  const respResult = ref(null)
  const competences = ref([])
  const competence = ref(null)
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
  const filters = reactive({})

  const tableColumns = [
    {
      label: 'Name',
      field: 'competence',
    },
    {
      field: 'completed_date',
      label: 'Completed Date',
      type: 'date',
      dateInputFormat: 'yyyy-MM-dd',
      dateOutputFormat: 'MM.dd.yyyy',
    },
    {
      field: 'valid_until',
      label: 'Valid Until',
      type: 'date',
      dateInputFormat: 'yyyy-MM-dd',
      dateOutputFormat: 'MM.dd.yyyy',
    },
    {
      label: 'Status',
      field: 'status',
    },
    {
      label: 'Files',
      field: 'files',
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

  const fetchCompetences = async params => {
    try {
      busy.value = true
      const response = await axios.get(route('competences.index'), {
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
      competences.value = response.data.data
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

  const getCompetence = async id => {
    try {
      const response = await axios.get(route('competences.show', { id }))
      competence.value = response.data.data
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


  const storeCompetence = async data => {
    errors.value = ''
    try {
      busy.value = true
      const response = await axios.post(route('competences.store'), data)
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


  const updateCompetence = async (id, data) => {
    errors.value = ''
    try {
      busy.value = true
      const response = await axios.post(route('competences.update', id), data)
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
      const response = await axios.post(route('competences.upload.documents', id), data)
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

  const deleteCompetence = async id => {
    try {
      busy.value = true
      const response = await axios.delete(route('competences.destroy', id))
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
  const resolveCompetencestatus = status => {
    if (status === 'Pending') {
      return 'warning'
    } if (status === 'Complete Information') { return 'danger' }
    return 'primary'
  }

  const fetchCompetencesList = async (searchString = '') => {
    busy.value = true
    try {
      const response = await axios.get(route('competences.index'), {
        params: {
          q: searchString,
        },
      })
      competences.value = response.data.data
    } catch (e) {
      toast.error(e.response.data.message)
    } finally {
      busy.value = false
    }
  }

  const resolveStatus = status => {
    if (status === 'Active') { return 'success' }
    if (status === 'Expired') { return 'danger' }
    return 'primary'
  }

  watch([currentPage, searchQuery, perPage], () => {
    fetchCompetences()
  })

  return {
    busy,
    sortBy,
    errors,
    perPage,
    filters,
    competence,
    dataMeta,
    competences,
    getCompetence,
    respResult,
    currentPage,
    searchQuery,
    totalRecords,
    tableColumns,
    deleteCompetence,
    isSortDirDesc,
    updateCompetence,
    fetchCompetences,
    storeCompetence,
    perPageOptions,
    uploadDocument,
    resolveStatus,
    fetchCompetencesList,
    resolveCompetencestatus,
  }
}

