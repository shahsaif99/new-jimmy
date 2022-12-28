import axios from '@axios'
import { computed, ref, watch } from '@vue/composition-api'
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
    { key: 'id', sortable: false },
    { key: 'avatar', sortable: false },
    { key: 'name', sortable: true },
    { key: 'email', sortable: true },
    { key: 'mobile', sortable: true },
    { key: 'roles.0.name', sortable: true, label: 'Role' },
    { key: 'status', sortable: true },
    { key: 'actions' },
  ]
  const usersStats = ref([])
  const users = ref([])
  const roleUsers = ref([])
  const roleUsersById = ref([])
  const perPage = ref(10)
  const totalRecords = ref(0)
  const currentPage = ref(1)
  const perPageOptions = [10, 25, 50, 100]
  const searchQuery = ref('')
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)
  const roleFilter = ref(null)
  const statusFilter = ref(null)
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


  const fetchUsers = () => {
    axios.get(route('users.index'), {
      params: {
        q: searchQuery.value,
        perPage: perPage.value,
        page: currentPage.value,
        sortBy: sortBy.value,
        sortDesc: isSortDirDesc.value,
        role: roleFilter.value,
        status: statusFilter.value,
        userId: userId.value,
      },
    })
      .then(response => {
        users.value = response.data.data
        const { total } = response.data.meta
        totalRecords.value = total
      })
      .catch(error => {
        console.log(error)
        // toast.error('Error fetching employee list')
      })
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

  const resolveUserRoleVariant = role => {
    if (role === 'Admin') return 'danger'
    return 'primary'
  }

  const resolveUserRoleIcon = role => {
    if (role === 'Employee') return 'DatabaseIcon'
    if (role === 'User') return 'UserIcon'
    if (role === 'Admin') return 'ServerIcon'
    return 'UserIcon'
  }
  watch([currentPage, perPage, searchQuery], () => {
    fetchUsers()
  })

  return {
    errors,
    updateUserStatus,
    roleUsersById,
    roleUsers,
    userId,
    busy,
    respResult,
    storeUser,
    fetchUsers,
    tableColumns,
    perPage,
    currentPage,
    totalRecords,
    dataMeta,
    perPageOptions,
    searchQuery,
    sortBy,
    isSortDirDesc,
    usersStats,
    refListTable,
    resolveUserRoleVariant,
    resolveUserRoleIcon,
    refetchData,
    getUser,
    updateUser,
    user,
    users,
    deleteUser,
    fetchUsersStats,
  }
}
