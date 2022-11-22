import axios from '@axios'
import route from 'ziggy-js'
import { computed, ref } from '@vue/composition-api'
import toaster from './toaster'

export default function useDashboard() {
  const busy = ref(false)
  const errors = ref('')
  const toast = toaster()
  const statistics = ref({})
  const isDataFetched = ref(false)
  const respResult = ref(null)
  const perPage = ref(10)
  const totalRecords = ref(0)
  const currentPage = ref(1)
  const perPageOptions = [10, 25, 50, 100]
  const searchQuery = ref('')
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)
  const refListTable = ref(null)

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(route('dashboard.statistics'))
      statistics.value = response.data
      isDataFetched.value = true
    } catch (e) {
      console.log(e)
      toast.error(e.response.data.message)
    }
  }

  const columns = [
    { key: 'information' },
    { key: 'author' },
    { key: 'given' },
  ]

  const documentFields = [
    { key: 'nameOfPerson' },
    { key: 'category' },
    { key: 'validUntil' },
    { key: 'show' },
  ]

  const documentData = [
    {
      nameOfPerson: 'Ola Normann', category: 'Varme arbeider', validUntil: '17-05-2001', show: 'File',
    },
    {
      nameOfPerson: 'Ola Normann', category: 'Varme arbeider', validUntil: '17-05-2001', show: 'File',
    },
    {
      nameOfPerson: 'Ola Normann', category: 'Varme arbeider', validUntil: '17-05-2001', show: 'File',
    },
    {
      nameOfPerson: 'Ola Normann', category: 'Varme arbeider', validUntil: '17-05-2001', show: 'File',
    },
    {
      nameOfPerson: 'Ola Normann', category: 'Varme arbeider', validUntil: '17-05-2001', show: 'File',
    },
  ]
  const staticData = [
    {
      information: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.  ', author: 'Ola Normann', given: '00.00.000',
    },
    {
      information: 'Contrary to popular belief, Lorem Ipsum is not simply random text.  ', author: 'Ola Normann', given: '00.00.000',
    },
    {
      information: 'There are many variations of passages of Lorem Ipsum available,', author: 'Ola Normann', given: '00.00.000',
    },
    {
      information: 'The standard chunk of Lorem Ipsum used since the 1500s ', author: 'Ola Normann', given: '00.00.000',
    },
  ]
  const dataMeta = computed(() => {
    const localItemsCount = refListTable.value ? refListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalRecords.value,
    }
  })
  return {
    busy,
    errors,
    statistics,
    fetchStatistics,
    isDataFetched,
    searchQuery,
    sortBy,
    isSortDirDesc,
    refListTable,
    respResult,
    perPageOptions,
    perPage,
    totalRecords,
    currentPage,
    columns,
    dataMeta,
    staticData,
    documentData,
    documentFields,
  }
}
