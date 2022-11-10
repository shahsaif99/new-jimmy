import axios from '@axios'
import {
  computed, ref, watch, reactive,
} from '@vue/composition-api'
// Notification
import route from 'ziggy-js'
import toaster from './toaster'

export default function useUsers() {
  // Use toast
  const busy = ref(false)
  const toast = toaster()
  const respResult = ref(null)
  const refListTable = ref(null)
  // Table Handlers
  const tableColumns = [
    { key: 'avatar', sortable: false, label: 'Name' },
    // { key: 'name', sortable: true },
    { key: 'email', sortable: true },
    { key: 'phone', sortable: true },
    { key: 'role_name', sortable: true },
    { key: 'status', sortable: true },
    { key: 'actions' },
  ]
  const filters = reactive({
    status: null,
    role: null,
  })
  const users = ref([])
  const roleUsers = ref([])
  const usersStats = ref([])
  const perPage = ref(10)
  const totalRecords = ref(0)
  const currentPage = ref(1)
  const perPageOptions = [10, 25, 50, 100]
  const searchQuery = ref('')
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)
  const userId = ref(null)
  const user = ref({})
  const errors = ref({})

  const dataMeta = computed(() => {
    const localItemsCount = refListTable.value ? refListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalRecords.value,
    }
  })

  const refetchData = () => {
    refListTable.value.refresh()
  }


  const deleteUser = async id => {
    try {
      busy.value = true
      const res = await axios.delete(route('users.destroy', id))
      respResult.value = res
      toast.success(res.data.message)
      // refetchData()
    } catch (error) {
      toast.error('Error! Deleting user')
    } finally {
      busy.value = false
    }
  }

  const getUser = async id => {
    const response = await axios.get(route('users.show', id))
    user.value = response.data.data
  }


  const updateUser = async userData => {
    try {
      busy.value = true
      const response = await axios.put(route('users.update', userData.id), userData)
      respResult.value = response
      toast.success(response.data.message)
    } catch (error) {
      if (error.response.status === 422) {
        errors.value = error.response.data.errors
      }
      toast.error(error.response.data.message)
    } finally {
      busy.value = false
    }
  }

  const updateUserStatus = async userData => {
    try {
      busy.value = true
      const response = await axios.post(route('users.status', userData.id), userData)
      respResult.value = response
      toast.success(response.data.message)
    } catch (e) {
      console.log(e)
      if (e.response.status === 422) {
        toast.error(e.response.data.message)
      }
    } finally {
      busy.value = false
    }
  }


  const storeUser = async formData => {
    busy.value = true
    await axios
      .post(route('users.store'), formData)
      .then(resp => {
        respResult.value = resp
        toast.success(resp.data.message)
      })
      .catch(err => {
        respResult.value = err
        if (err.response.status === 422) {
          toast.error(err.response.data.message)
        }
      }).finally(() => {
        busy.value = false
      })
  }

  const fetchUsers = async () => {
    busy.value = true
    try {
      const response = await axios.get(route('users.index'), {
        params: {
          q: searchQuery.value,
          perPage: perPage.value,
          page: currentPage.value,
          sortBy: sortBy.value,
          sortDesc: isSortDirDesc.value,
          ...filters,
        },
      })
      const { total } = response.data.meta
      users.value = response.data.data
      totalRecords.value = total
    } catch (e) {
      toast.error(e.response.data.message)
    } finally {
      busy.value = false
    }
  }

  const fetchUsersStats = async () => {
    busy.value = true
    try {
      const response = await axios.get(route('users.stats'))
      usersStats.value = response.data
    } catch (e) {
      toast.error(e.response.data.message)
    } finally {
      busy.value = false
    }
  }

  const fetchUsersByRole = async role => {
    busy.value = true
    try {
      const response = await axios.get(route('users.index'), {
        params: {
          role,
        },
      })
      roleUsers.value = response.data.data
    } catch (e) {
      toast.error(e.response.data.message)
    } finally {
      busy.value = false
    }
  }


  const resolveUserRoleVariant = role => {
    if (role === 'Admin') return 'danger'
    if (role === 'BDM') return 'success'
    if (role === 'Broker') return 'warning'
    if (role === 'Partner') return 'primary'
    return 'info'
  }

  const resolveUserRoleIcon = role => {
    if (role === 'Admin') return 'SlackIcon'
    if (role === 'BDM') return 'SettingsIcon'
    if (role === 'Broker') return 'UserIcon'
    if (role === 'Partner') return 'ServerIcon'
    return 'UserIcon'
  }

  watch([currentPage, perPage, searchQuery, filters], () => {
    fetchUsers()
  })

  return {
    user,
    busy,
    users,
    errors,
    getUser,
    userId,
    sortBy,
    perPage,
    filters,
    dataMeta,
    respResult,
    roleUsers,
    storeUser,
    usersStats,
    fetchUsers,
    deleteUser,
    refetchData,
    updateUser,
    currentPage,
    searchQuery,
    refListTable,
    totalRecords,
    tableColumns,
    isSortDirDesc,
    perPageOptions,
    fetchUsersStats,
    fetchUsersByRole,
    updateUserStatus,
    resolveUserRoleIcon,
    resolveUserRoleVariant,
  }
}
