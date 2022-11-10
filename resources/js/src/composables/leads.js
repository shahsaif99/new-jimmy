import axios from '@axios'
import { computed, ref, watch } from '@vue/composition-api'
import route from 'ziggy-js'
import toaster from './toaster'

export default function useLeads() {
  const busy = ref(false)
  const respResult = ref(null)
  const leads = ref([])
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
    { key: 'name', sortable: true },
    { key: 'email', sortable: true },
    { key: 'created_at', sortable: false, label: 'Date added' },
    { key: 'status', sortable: false },
    { key: 'broker.name', sortable: false, label: 'Broker' },
    { key: 'amount_currency', sortable: false, label: 'amount' },
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

  const fetchLeads = async () => {
    try {
      busy.value = true
      const response = await axios.get(route('leads.index'), {
        params: {
          q: searchQuery.value,
          perPage: perPage.value,
          page: currentPage.value,
          sortBy: sortBy.value,
          sortDesc: isSortDirDesc.value,
        },
      })
      leads.value = response.data.data
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

  const fetchKanBanLeads = async () => {
    try {
      busy.value = true
      const response = await axios.get(route('leads.kanban'), {
        params: {
        },
      })
      leads.value = response.data.data
      console.log(leads.value)
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

  const getLead = async id => {
    try {
      const response = await axios.get(route('leads.show', { id }))
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

  const assignBroker = async data => {
    errors.value = ''
    try {
      busy.value = true
      const response = await axios.post(route('leads.assign.broker'), data)
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


  const storeLead = async data => {
    errors.value = ''
    try {
      busy.value = true
      const response = await axios.post(route('leads.store'), data)
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
      const response = await axios.post(route('leads.store.details', id), data)
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

  const updateLead = async data => {
    errors.value = ''
    try {
      busy.value = true
      const response = await axios.put(route('leads.update', data.id), data)
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

  const updateKanban = async (leadId, status) => {
    errors.value = ''
    try {
      busy.value = true
      const response = await axios.post(route('leads.kanban.update', leadId), { status })
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


  const deleteLead = async id => {
    try {
      busy.value = true
      const response = await axios.delete(route('leads.destroy', id))
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
  const resolvePayDayStatus = leadStatus => {
    if (leadStatus === 'lead') { return '- 4 days' }
    if (leadStatus === 'application') { return '- 3 days' }
    if (leadStatus === 'submitted') { return '- 2 days' }
    if (leadStatus === 'approved') { return '- tomorrow' }
    if (leadStatus === 'settled') { return '- today' }
    return ''
  }

  const resolveLeadStatus = leadStatus => {
    if (leadStatus === 'lead') { return 'danger' }
    if (leadStatus === 'application') { return 'warning' }
    if (leadStatus === 'submitted') { return 'info' }
    if (leadStatus === 'approved') { return 'primary' }
    if (leadStatus === 'settled') { return 'success' }
    return ''
  }

  watch([currentPage, searchQuery], () => {
    fetchLeads()
  })

  return {
    busy,
    sortBy,
    errors,
    order,
    leads,
    perPage,
    dataMeta,
    storeLead,
    getLead,
    respResult,
    updateLead,
    fetchLeads,
    currentPage,
    updateKanban,
    deleteLead,
    assignBroker,
    searchQuery,
    totalRecords,
    tableColumns,
    isSortDirDesc,
    perPageOptions,
    fetchKanBanLeads,
    resolvePayDayStatus,
    storeOrderDetails,
    resolveLeadStatus,
  }
}
