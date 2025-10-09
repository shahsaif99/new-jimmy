import axios from '@axios'
import { computed, ref, watch } from '@vue/composition-api'
import route from 'ziggy-js'
import toaster from './toaster'

export default function settingsRuhTypes() {
  const busy = ref(false)
  const respResult = ref(null)
  const ruhTypes = ref([])
  const errors = ref({})
  const absenceType = ref({})
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
    { key: 'name', sortable: true, label: 'Type' },
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

  const fetchRuhTypes = async () => {
    try {
      const response = await axios.get(route('ruh-types.index'), {
        params: {
          q: searchQuery.value,
          perPage: perPage.value,
          page: currentPage.value,
          sortBy: sortBy.value,
          sortDesc: isSortDirDesc.value,
        },
      })
      ruhTypes.value = response.data.data
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


  const storeRuhType = async data => {
    errors.value = ''
    try {
      busy.value = true
      const response = await axios.post(route('ruh-types.store'), data)
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


  const updateRuhType = async data => {
    errors.value = ''
    try {
      busy.value = true
      const response = await axios.put(route('ruh-types.update', data.id), data)
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


  const deleteRuhType = async id => {
    try {
      busy.value = true
      const response = await axios.delete(route('ruh-types.destroy', id))
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


  const fetchRuhTypesList = async (searchString = '') => {
    busy.value = true
    try {
      const response = await axios.get(route('ruh-types.index'), {
        params: {
          q: searchString,
        },
      })
      ruhTypes.value = response.data.data
    } catch (e) {
      toast.error(e.response.data.message)
    } finally {
      busy.value = false
    }
  }

  watch([currentPage, perPage, searchQuery], () => {
    fetchRuhTypes()
  })

  return {
    busy,
    sortBy,
    errors,
    perPage,
    dataMeta,
    absenceType,
    respResult,
    searchQuery,
    currentPage,
    ruhTypes,
    totalRecords,
    tableColumns,
    isSortDirDesc,
    perPageOptions,
    storeRuhType,
    deleteRuhType,
    updateRuhType,
    fetchRuhTypes,
    fetchRuhTypesList,
  }
}
