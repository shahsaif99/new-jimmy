import {
  ref, watch, computed, reactive,
} from '@vue/composition-api'
import axios from '@axios'
import route from 'ziggy-js'
import toaster from './toaster'

export default function useStudents() {
  const toast = toaster()
  const students = ref([])
  const studentData = ref({})
  const refListTable = ref(null)
  const respResult = ref(null)
  const perPage = ref(12)
  const totalRecords = ref(0)
  const currentPage = ref(1)
  const perPageOptions = [12, 24, 48, 96]
  const searchQuery = ref('')
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)
  const busy = ref(false)
  const tableColumns = [
    { key: 'id', sortable: true },
    { key: 'name', sortable: true },
    { key: 'personal_email', sortable: true },
    { key: 'institution', sortable: true },
    { key: 'pathway', sortable: true },
    { key: 'pathway', sortable: true },
    { key: 'cohort', sortable: true },
    { key: 'status', sortable: false },
    { key: 'actions' },
  ]

  const placementsTableColumns = [
    { key: 'type', sortable: true, label: 'Placement Type' },
    { key: 'host', sortable: true },
    { key: 'start_date', sortable: true },
    { key: 'end_date', sortable: true },
    { key: 'status', sortable: false },
    { key: 'actions' },
  ]

  const expensesTableColumns = [
    { key: 'type', sortable: true, label: 'Expense Type' },
    { key: 'cost', sortable: true },
    { key: 'date of expense', sortable: true },
    { key: 'status', sortable: false },
    { key: 'actions' },
  ]

  const notesTableColumns = [
    { key: 'added_by', sortable: true, label: 'Expense Type' },
    { key: 'created_at', sortable: true, label: 'Date Added' },
    { key: 'note', sortable: true, label: 'Note Preview' },
    { key: 'actions' },
  ]

  const filters = reactive({
    supervisors: [],
    groups: [],
    project_id: null,
    supervisor_id: null,
  })

  const dataMeta = computed(() => {
    const localItemsCount = refListTable.value ? refListTable.value.localItems.length : 0
    return {
      from:
                  perPage.value * (currentPage.value - 1)
                  + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalRecords.value,
    }
  })


  const refetchData = () => {
    refListTable.value.refresh()
  }


  const deleteStudent = async id => {
    try {
      busy.value = true
      const res = await axios.delete(route('admin.students.destroy', id))
      respResult.value = res
      toast.success(res.data.message)
      // refetchData()
    } catch (error) {
      toast.error('Error! Deleting student')
    } finally {
      busy.value = false
    }
  }

  const fetchStudents = async () => {
    busy.value = true
    try {
      const response = await axios.get(route('admin.students.index'), {
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
      students.value = response.data.data
      totalRecords.value = total
    } catch (e) {
      toast.error(e.response.data.message)
    } finally {
      busy.value = false
    }
  }


  const getStudent = async id => {
    busy.value = true
    try {
      const response = await axios.get(route('admin.students.show', id))
      studentData.value = response.data.data
    } catch (e) {
      toast.error(e.response.data.message)
    } finally {
      busy.value = false
    }
  }

  const storeStudent = async formData => {
    busy.value = true
    await axios
      .post(route('admin.students.store'), formData)
      .then(resp => {
        respResult.value = resp
        toast.success(resp.data.message)
      })
      .catch(err => {
        respResult.value = err.response
        if (err.response.status === 422) {
          toast.error(err.response.data.message)
        }
      }).finally(() => {
        busy.value = false
      })
  }

  const updateStudent = async (id, formData) => {
    busy.value = true
    await axios
      .put(route('admin.students.update', id), formData)
      .then(resp => {
        respResult.value = resp
        toast.success(resp.data.message)
      })
      .catch(err => {
        respResult.value = err.response
        if (err.response.status === 422) {
          toast.error(err.response.data.message)
        }
      }).finally(() => {
        busy.value = false
      })
  }

  const fetchStudentsList = async (searchString = '') => {
    busy.value = true
    try {
      const response = await axios.get(route('admin.students.index'), {
        params: {
          q: searchString,
        },
      })
      students.value = response.data.data
    } catch (e) {
      toast.error(e.response.data.message)
    } finally {
      busy.value = false
    }
  }

  watch([currentPage, perPage, searchQuery, filters], () => {
    fetchStudents()
  }, { deep: true })

  return {
    busy,
    sortBy,
    filters,
    perPage,
    studentData,
    students,
    dataMeta,
    respResult,
    getStudent,
    refetchData,
    searchQuery,
    currentPage,
    tableColumns,
    storeStudent,
    deleteStudent,
    updateStudent,
    totalRecords,
    isSortDirDesc,
    fetchStudents,
    perPageOptions,
    refListTable,
    notesTableColumns,
    fetchStudentsList,
    expensesTableColumns,
    placementsTableColumns,
  }
}
