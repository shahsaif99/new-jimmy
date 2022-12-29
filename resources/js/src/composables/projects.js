import axios from '@axios'
import { computed, ref, watch } from '@vue/composition-api'
import route from 'ziggy-js'
import toaster from './toaster'

export default function useProjects() {
  const busy = ref(false)
  const respResult = ref(null)
  const projects = ref([])
  const project = ref(null)
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
    { key: 'name', sortable: true },
    { key: 'start_date', sortable: false },
    { key: 'end_date', sortable: false },
    { key: 'customer', sortable: false },
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

  const fetchProjects = async () => {
    try {
      busy.value = true
      const response = await axios.get(route('projects.index'), {
        params: {
          q: searchQuery.value,
          perPage: perPage.value,
          page: currentPage.value,
          sortBy: sortBy.value,
          sortDesc: isSortDirDesc.value,
        },
      })
      projects.value = response.data.data
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

  const getProject = async id => {
    try {
      const response = await axios.get(route('projects.show', { id }))
      project.value = response.data.data
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


  const storeProject = async data => {
    errors.value = ''
    try {
      busy.value = true
      const response = await axios.post(route('projects.store'), data)
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


  const updateProject = async data => {
    errors.value = ''
    try {
      busy.value = true
      const response = await axios.put(route('projects.update', data.id), data)
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
      const response = await axios.post(route('projects.upload.documents', id), data)
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

  const deleteProject = async id => {
    try {
      busy.value = true
      const response = await axios.delete(route('projects.destroy', id))
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
  const resolveProjectstatus = status => {
    if (status === 'Pending') {
      return 'warning'
    } if (status === 'Complete Information') { return 'danger' }
    return 'primary'
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
    fetchProjects()
  })

  return {
    busy,
    sortBy,
    errors,
    perPage,
    project,
    dataMeta,
    projects,
    getProject,
    respResult,
    currentPage,
    searchQuery,
    totalRecords,
    tableColumns,
    deleteProject,
    isSortDirDesc,
    updateProject,
    fetchProjects,
    storeProject,
    perPageOptions,
    attachmentData,
    uploadDocument,
    attachmentFields,
    resolveProjectstatus,
  }
}

