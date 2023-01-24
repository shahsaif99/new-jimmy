import axios from '@axios'
import { computed, ref, watch } from '@vue/composition-api'
import route from 'ziggy-js'
import toaster from './toaster'

export default function useSettingsCompetence() {
  const busy = ref(false)
  const respResult = ref(null)
  const competences = ref([])
  const errors = ref({})
  const competence = ref({})
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

  const fetchCompetences = async () => {
    try {
      const response = await axios.get(route('competence-courses.index'), {
        params: {
          q: searchQuery.value,
          perPage: perPage.value,
          page: currentPage.value,
          sortBy: sortBy.value,
          sortDesc: isSortDirDesc.value,
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
    }
  }


  const storeCompetence = async data => {
    errors.value = ''
    try {
      busy.value = true
      const response = await axios.post(route('competence-courses.store'), data)
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


  const updateCompetence = async data => {
    errors.value = ''
    try {
      busy.value = true
      const response = await axios.put(route('competence-courses.update', data.id), data)
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


  const deleteCompetence = async id => {
    try {
      busy.value = true
      const response = await axios.delete(route('competence-courses.destroy', id))
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


  const fetchCompetenceList = async (searchString = '') => {
    busy.value = true
    try {
      const response = await axios.get(route('competence-courses.index'), {
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

  watch([currentPage, perPage, searchQuery], () => {
    fetchCompetences()
  })

  return {
    busy,
    sortBy,
    errors,
    perPage,
    dataMeta,
    competence,
    respResult,
    competences,
    searchQuery,
    currentPage,
    totalRecords,
    tableColumns,
    isSortDirDesc,
    perPageOptions,
    storeCompetence,
    deleteCompetence,
    updateCompetence,
    fetchCompetences,
    fetchCompetenceList,
  }
}
