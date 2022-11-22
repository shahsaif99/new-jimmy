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


  const staticData = [
    {
      information: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s ', author: 'Ola Normann', given: '00.00.000',
    },
    {
      information: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ', author: 'Ola Normann', given: '00.00.000',
    },
    {
      information: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form,', author: 'Ola Normann', given: '00.00.000',
    },
    {
      information: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. ', author: 'Ola Normann', given: '00.00.000',
    },
    {
      information: ' Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc. ', author: 'Ola Normann', given: '00.00.000',
    },
    {
      information: 'All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. ', author: 'Ola Normann', given: '00.00.000',
    },
    {
      information: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. ', author: 'Ola Normann', given: '00.00.000',
    },
    {
      information: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. ', author: 'Ola Normann', given: '00.00.000',
    },
    {
      information: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. ', author: 'Ola Normann', given: '00.00.000',
    },
    {
      information: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. ', author: 'Ola Normann', given: '00.00.000',
    },
    {
      information: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. ', author: 'Ola Normann', given: '00.00.000',
    },
    {
      information: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. ', author: 'Ola Normann', given: '00.00.000',
    },
    {
      information: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. ', author: 'Ola Normann', given: '00.00.000',
    },
    {
      information: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. ', author: 'Ola Normann', given: '00.00.000',
    },
    {
      information: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. ', author: 'Ola Normann', given: '00.00.000',
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
  }
}
