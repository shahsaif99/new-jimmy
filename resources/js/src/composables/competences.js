import axios from '@axios'
import {
  computed, ref, watch, reactive,
} from '@vue/composition-api'
import route from 'ziggy-js'
import toaster from './toaster'
import router from '@/router'

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

  const filters = reactive({
    group: true,
    userId: null,
    expandAll: false,
    accordion: [
      {
        id: 1,
        key: 'user_id',
        label: 'user',
        options: [],
        model: null,
        isExpand: false,
        computedHeight: 0,
      },
      {
        id: 2,
        key: 'competence_name',
        label: 'competence name',
        options: [],
        model: null,
        isExpand: false,
        computedHeight: 0,
      },
      {
        id: 3,
        key: 'status',
        label: 'status',
        options: ['active', 'expire', 'expired'],
        model: null,
        isExpand: false,
        computedHeight: 0,
      },
      {
        id: 4,
        key: 'level',
        label: 'level',
        options: [
          { label: 'Level 0: Not relevant', value: 0 },
          { label: 'Level 1: Has some competence and can complete the work with support', value: 1 },
          { label: 'Level 2: Has good skills and can work independently', value: 2 },
          { label: 'Level 3: Very good competence', value: 3 },
          { label: 'Level 4: Expert, can teach', value: 4 },
        ],
        model: null,
        isExpand: false,
        computedHeight: 0,
      },
    ],
    toggleExpand() {
      if (!filters.expandAll) {
        filters.accordion.forEach(item => {
          item.isExpand = true
        })
      } else {
        filters.accordion.forEach(item => {
          item.isExpand = false
        })
      }
      filters.expandAll = !filters.expandAll
    },
    get() {
      const data = {
        group: filters.group,
      }

      if (filters.userId) {
        data.userId = filters.userId
      }

      filters.accordion.forEach(({ key, model }) => {
        if (model !== null && model !== '' && model !== false) {
          data[key] = model
        }
      })

      return data
    },
    initFromQuery(query) {
      // Initialize filters from URL query parameters
      filters.accordion.forEach(item => {
        if (query[item.key] !== undefined) {
          // Convert to number for level filter
          if (item.key === 'level') {
            item.model = Number(query[item.key])
          } else if (item.key === 'user_id') {
            item.model = Number(query[item.key])
          } else {
            item.model = query[item.key]
          }
        }
      })

      if (query.q) {
        searchQuery.value = query.q
      }

      if (query.page) {
        currentPage.value = Number(query.page)
      }

      if (query.perPage) {
        perPage.value = Number(query.perPage)
      }
    },
  })

  const tableColumns = [
    {
      label: 'Name',
      field: 'competence',
    },
    {
      label: 'Status',
      field: 'status',
    },
    {
      field: 'planned_date',
      label: 'Planned Date',
      type: 'date',
      dateInputFormat: 'yyyy-MM-dd',
      dateOutputFormat: 'MM.dd.yyyy',
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
      label: 'Level',
      field: 'level',
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
          ...filters.get(),
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
    const lowerStatus = status?.toLowerCase()
    if (lowerStatus === 'valid') { return 'success' } // Green
    if (lowerStatus === 'expiring') { return 'warning' } // Yellow
    if (lowerStatus === 'expired') { return 'danger' } // Red
    return 'secondary' // Default gray for unknown status
  }

  const getLevelLabel = level => {
    const levelOptions = [
      { label: 'Level 0: Not relevant', value: 0 },
      { label: 'Level 1: Has some competence and can complete the work with support', value: 1 },
      { label: 'Level 2: Has good skills and can work independently', value: 2 },
      { label: 'Level 3: Very good competence', value: 3 },
      { label: 'Level 4: Expert, can teach', value: 4 },
    ]
    const levelOption = levelOptions.find(opt => opt.value === level)
    return levelOption ? levelOption.label : ''
  }

  const downloadCompetenceFiles = async id => {
    try {
      const response = await axios.get(route('competences.download', id), {
        responseType: 'blob',
      })

      // Get filename from Content-Disposition header or use default
      let filename = 'competence_files.zip'
      const contentDisposition = response.headers['content-disposition']
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?(.+)"?/)
        if (filenameMatch.length === 2) {
          filename = filenameMatch[1]
        }
      }

      // Create a blob URL and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      if (error.message === 'Network Error') {
        toast.error(error.message)
      } else {
        toast.error(error.response?.data?.message || 'Failed to download files')
      }
    }
  }

  watch([currentPage, searchQuery, perPage], () => {
    updateQueryParams()
    fetchCompetences()
  })

  // Watch individual filter accordion items for changes
  watch(() => filters.accordion.map(item => item.model), () => {
    console.log('Filter changed, fetching competences...')
    updateQueryParams()
    fetchCompetences()
  }, { deep: true })

  const updateQueryParams = () => {
    const query = {}

    if (searchQuery.value) {
      query.q = searchQuery.value
    }

    if (perPage.value && perPage.value !== 10) {
      query.perPage = perPage.value
    }

    if (currentPage.value && currentPage.value !== 1) {
      query.page = currentPage.value
    }

    filters.accordion.forEach(({ key, model }) => {
      if (model !== '' && model !== false && model !== null) {
        query[key] = model
      }
    })

    router.push({ query }).catch(() => {})
  }

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
    getLevelLabel,
    fetchCompetencesList,
    downloadCompetenceFiles,
    resolveCompetencestatus,
    refListTable,
  }
}

