import axios from '@axios'
import {
  computed, ref, watch, reactive,
} from '@vue/composition-api'
import route from 'ziggy-js'
import toaster from './toaster'

export default function useEquipments() {
  const busy = ref(false)
  const respResult = ref(null)
  const equipments = ref([])
  const equipment = ref(null)
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
  })


  const tableColumns = [
    { key: 'id', sortable: false },
    { key: 'name', sortable: true },
    { key: 'serial_number', sortable: false },
    { key: 'supplier', sortable: false },
    { key: 'category', sortable: false },
    { key: 'certificate_number', sortable: false },
    { key: 'valid_until', sortable: false },
    { key: 'project.name', sortable: false, label: 'Project' },
    { key: 'created_at', sortable: false },
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

  const fetchEquipments = async () => {
    try {
      busy.value = true
      const response = await axios.get(route('equipments.index'), {
        params: {
          q: searchQuery.value,
          perPage: perPage.value,
          page: currentPage.value,
          sortBy: sortBy.value,
          sortDesc: isSortDirDesc.value,
          ...filters,
        },
      })
      equipments.value = response.data.data
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

  const getEquipment = async id => {
    try {
      const response = await axios.get(route('equipments.show', { id }))
      equipment.value = response.data.data
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


  const storeEquipment = async data => {
    errors.value = ''
    try {
      busy.value = true
      const response = await axios.post(route('equipments.store'), data)
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


  const updateEquipment = async (data, id) => {
    errors.value = ''
    try {
      console.log(data)
      busy.value = true
      const response = await axios.post(route('equipments.update', id), data)
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

  const deleteEquipment = async id => {
    try {
      busy.value = true
      const response = await axios.delete(route('equipments.destroy', id))
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
  const resolveEquipmentstatus = status => {
    if (status === 'Pending') {
      return 'warning'
    } if (status === 'Complete Information') { return 'danger' }
    return 'primary'
  }

  const fetchEquipmentsList = async (searchString = '') => {
    busy.value = true
    try {
      const response = await axios.get(route('equipments.index'), {
        params: {
          q: searchString,
        },
      })
      equipments.value = response.data.data
    } catch (e) {
      toast.error(e.response.data.message)
    } finally {
      busy.value = false
    }
  }

  watch([currentPage, searchQuery, perPage], () => {
    fetchEquipments()
  })

  return {
    busy,
    sortBy,
    errors,
    filters,
    perPage,
    equipment,
    dataMeta,
    equipments,
    storeEquipment,
    getEquipment,
    respResult,
    updateEquipment,
    fetchEquipments,
    currentPage,
    searchQuery,
    totalRecords,
    tableColumns,
    deleteEquipment,
    isSortDirDesc,
    perPageOptions,
    fetchEquipmentsList,
    resolveEquipmentstatus,
  }
}

