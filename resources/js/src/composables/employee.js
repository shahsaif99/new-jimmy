import axios from '@axios'
import { computed, ref, watch } from '@vue/composition-api'
import route from 'ziggy-js'
import toaster from './toaster'

export default function useEmployee() {
  const busy = ref(false)
  const respResult = ref(null)
  const prospects = ref([])
  const order = ref(null)
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
    { key: 'title', sortable: true },
    { key: 'created_at', sortable: false },
    { key: 'status', sortable: false },
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

  const fetchOrders = async () => {
    try {
      busy.value = true
      const response = await axios.get(route('orders.index'), {
        params: {
          q: searchQuery.value,
          perPage: perPage.value,
          page: currentPage.value,
          sortBy: sortBy.value,
          sortDesc: isSortDirDesc.value,
        },
      })
      prospects.value = response.data.data
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

  const getOrder = async id => {
    try {
      const response = await axios.get(route('orders.show', { id }))
      order.value = response.data.data
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


  const storeOrder = async data => {
    errors.value = ''
    try {
      busy.value = true
      const response = await axios.post(route('orders.store'), data)
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

  const storeOrderDetails = async (id, data) => {
    errors.value = ''
    try {
      busy.value = true
      const response = await axios.post(route('orders.store.details', id), data)
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


  const updateOrderStatus = async orderData => {
    try {
      busy.value = true
      const response = await axios.post(route('orders.status', orderData.id), orderData)
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

  const staticData = ref([
    {
      name: 'Ola Normann', email: 'ola.norman@norman.no', phone: '47 99 88 77 66', dateOfEmployement: '2/12/2015', endDate: '2/12/2015', status: 0, jobDescription: 'Welder',
    },
    {
      name: 'Ola Normann', email: 'ola.norman@norman.no', phone: '47 99 88 77 66', dateOfEmployement: '2/12/2015', endDate: '2/12/2015', status: 0, jobDescription: 'Welder',
    },
    {
      name: 'Ola Normann', email: 'ola.norman@norman.no', phone: '47 99 88 77 66', dateOfEmployement: '2/12/2015', endDate: '2/12/2015', status: 0, jobDescription: 'Welder',
    },
    {
      name: 'Ola Normann', email: 'ola.norman@norman.no', phone: '47 99 88 77 66', dateOfEmployement: '2/12/2015', endDate: '2/12/2015', status: 0, jobDescription: 'Welder',
    },
    {
      name: 'Ola Normann', email: 'ola.norman@norman.no', phone: '47 99 88 77 66', dateOfEmployement: '2/12/2015', endDate: '2/12/2015', status: 0, jobDescription: 'Welder',
    },
    {
      name: 'Ola Normann', email: 'ola.norman@norman.no', phone: '47 99 88 77 66', dateOfEmployement: '2/12/2015', endDate: '2/12/2015', status: 0, jobDescription: 'Welder',
    },
    {
      name: 'Ola Normann', email: 'ola.norman@norman.no', phone: '47 99 88 77 66', dateOfEmployement: '2/12/2015', endDate: '2/12/2015', status: 1, jobDescription: 'Welder',
    },
    {
      name: 'Ola Normann', email: 'ola.norman@norman.no', phone: '47 99 88 77 66', dateOfEmployement: '2/12/2015', endDate: '2/12/2015', status: 0, jobDescription: 'Welder',
    },
    {
      name: 'Ola Normann', email: 'ola.norman@norman.no', phone: '47 99 88 77 66', dateOfEmployement: '2/12/2015', endDate: '2/12/2015', status: 0, jobDescription: 'Welder',
    },
    {
      name: 'Ola Normann', email: 'ola.norman@norman.no', phone: '47 99 88 77 66', dateOfEmployement: '2/12/2015', endDate: '2/12/2015', status: 1, jobDescription: 'Welder',
    },
    {
      name: 'Ola Normann', email: 'ola.norman@norman.no', phone: '47 99 88 77 66', dateOfEmployement: '2/12/2015', endDate: '2/12/2015', status: 1, jobDescription: 'Welder',
    },
  ])

  const columns = [
    { key: 'name' },
    { key: 'email' },
    { key: 'phone' },
    { key: 'dateOfEmployement' },
    { key: 'endDate' },
    { key: 'status' },
    { key: 'jobDescription' },
    { key: 'actions' },
  ]
  const competenceColumns = [
    { key: 'name' },
    { key: 'completedDate' },
    { key: 'validUntil' },
  ]
  const updateOrder = async data => {
    errors.value = ''
    try {
      busy.value = true
      const response = await axios.put(route('orders.update', data.id), data)
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

  const deleteOrder = async id => {
    try {
      busy.value = true
      const response = await axios.delete(route('orders.destroy', id))
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
  const resolveOrderStatus = status => {
    if (status === 'Pending') {
      return 'warning'
    } if (status === 'Complete Information') { return 'danger' }
    return 'primary'
  }


  watch([currentPage, searchQuery], () => {
    fetchOrders()
  })

  return {
    busy,
    sortBy,
    errors,
    perPage,
    order,
    dataMeta,
    prospects,
    storeOrder,
    getOrder,
    respResult,
    updateOrder,
    fetchOrders,
    currentPage,
    searchQuery,
    totalRecords,
    tableColumns,
    deleteOrder,
    isSortDirDesc,
    perPageOptions,
    resolveOrderStatus,
    storeOrderDetails,
    updateOrderStatus,
    staticData,
    competenceColumns,
    columns,
  }
}

