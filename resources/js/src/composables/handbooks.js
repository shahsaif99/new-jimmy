import axios from '@axios'
import {
  computed, ref, watch, reactive,
} from '@vue/composition-api'
import route from 'ziggy-js'
import toaster from './toaster'

export default function useHandbooks() {
  const busy = ref(false)
  const respResult = ref(null)
  const handbooks = ref([])
  const handbook = ref(null)
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
  const handbookChapters = ref([])

  const filters = reactive({
    handbook_id: '',
  })

  const tableColumns = [
    { key: 'id', sortable: false },
    { key: 'title', sortable: true },
    { key: 'document_number', sortable: true },
    { key: 'revision_number', sortable: false },
    { key: 'scope', sortable: false },
    { key: 'author', sortable: false },
    { key: 'revised_date', sortable: false },
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

  const fetchHandbooks = async () => {
    try {
      busy.value = true
      const response = await axios.get(route('handbooks.index'), {
        params: {
          q: searchQuery.value,
          perPage: perPage.value,
          page: currentPage.value,
          sortBy: sortBy.value,
          sortDesc: isSortDirDesc.value,
          ...filters,
        },
      })
      handbooks.value = response.data.data
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

  const getHandbook = async id => {
    try {
      const response = await axios.get(route('handbooks.show', { id }))
      handbook.value = response.data.data
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


  const storeHandbook = async data => {
    errors.value = ''
    try {
      busy.value = true
      const response = await axios.post(route('handbooks.store'), data)
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

  const storeHandbookChapter = async (data, handbookId) => {
    errors.value = ''
    try {
      busy.value = true
      const response = await axios.post(route('handbook.store.chapter', handbookId), data)
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

  //   get handbook chapters by handbook id

  const getHandbookChapters = async () => {
    try {
      busy.value = true
      //   const response = await axios.get(route('handbook.get.chapter', handbookId))
      const response = await axios.get(route('handbook.get.chapter'), {
        params: {
          q: searchQuery.value,
          ...filters,
        },
      })
      respResult.value = response
      //   return response.data.data
      handbookChapters.value = response.data
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


  const updateHandbook = async (data, id) => {
    errors.value = ''
    try {
      busy.value = true
      const response = await axios.put(route('handbooks.update', id), data)
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

  //   updateHandbookChapter


  const updateHandbookChapter = async (data, id) => {
    errors.value = ''
    try {
      busy.value = true
      const response = await axios.put(route('handbook.update.chapter', id), data)
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


  const deleteHandbook = async id => {
    try {
      busy.value = true
      const response = await axios.delete(route('handbooks.destroy', id))
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
  const resolveHandbookstatus = status => {
    if (status === 'Pending') {
      return 'warning'
    } if (status === 'Complete Information') { return 'danger' }
    return 'primary'
  }

  const fetchHandbooksList = async (searchString = '') => {
    busy.value = true
    try {
      const response = await axios.get(route('handbooks.index'), {
        params: {
          q: searchString,
        },
      })
      handbooks.value = response.data.data
    } catch (e) {
      toast.error(e.response.data.message)
    } finally {
      busy.value = false
    }
  }


  watch([currentPage, searchQuery, perPage], () => {
    fetchHandbooks()
  })

  return {
    busy,
    sortBy,
    errors,
    perPage,
    handbook,
    dataMeta,
    filters,
    handbooks,
    getHandbook,
    handbookChapters,
    getHandbookChapters,
    respResult,
    currentPage,
    searchQuery,
    totalRecords,
    tableColumns,
    deleteHandbook,
    isSortDirDesc,
    updateHandbook,
    fetchHandbooks,
    storeHandbook,
    perPageOptions,
    updateHandbookChapter,
    storeHandbookChapter,
    fetchHandbooksList,
    resolveHandbookstatus,
  }
}

