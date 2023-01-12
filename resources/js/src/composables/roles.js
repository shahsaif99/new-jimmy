import axios from '@axios'
import { computed, ref, watch } from '@vue/composition-api'
import route from 'ziggy-js'
import toaster from './toaster'

export default function useRoles() {
  const busy = ref(false)
  const respResult = ref(null)
  const roles = ref([])
  const errors = ref({})
  const roleData = ref({})
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

  const fetchRoles = async () => {
    try {
      const response = await axios.get(route('roles.index'), {
        params: {
          q: searchQuery.value,
          perPage: perPage.value,
          page: currentPage.value,
          sortBy: sortBy.value,
          sortDesc: isSortDirDesc.value,
        },
      })
      roles.value = response.data.data
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
    }
  }


  const storeRole = async data => {
    errors.value = ''
    try {
      busy.value = true
      const response = await axios.post(route('roles.store'), data)
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

  const getRole = async id => {
    try {
      const response = await axios.get(route('roles.show', { id }))
      roleData.value = response.data.data
    } catch (error) {
      if (error.message === 'Network Error') {
        toast.error(error.message)
      } else {
        respResult.value = error
        toast.error(error.response.data.message)
      }
    }
  }


  const updateRole = async data => {
    errors.value = ''
    try {
      busy.value = true
      const response = await axios.put(route('roles.update', data.id), data)
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


  const deleteRole = async id => {
    try {
      busy.value = true
      const response = await axios.delete(route('roles.destroy', id))
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


  const fetchRolesList = async (searchString = '') => {
    busy.value = true
    try {
      const response = await axios.get(route('roles.index'), {
        params: {
          q: searchString,
        },
      })
      roles.value = response.data.data
    } catch (e) {
      toast.error(e.response.data.message)
    } finally {
      busy.value = false
    }
  }

  watch([currentPage, perPage, searchQuery], () => {
    fetchRoles()
  })

  return {
    busy,
    sortBy,
    roles,
    errors,
    getRole,
    perPage,
    dataMeta,
    roleData,
    storeRole,
    respResult,
    searchQuery,
    currentPage,
    deleteRole,
    updateRole,
    fetchRoles,
    totalRecords,
    tableColumns,
    isSortDirDesc,
    perPageOptions,
    fetchRolesList,
  }
}
