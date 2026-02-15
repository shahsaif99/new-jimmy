import axios from '@axios'
import { computed, ref, reactive } from '@vue/composition-api'
import route from 'ziggy-js'
import toaster from './toaster'

const visibleToOptions = [
  { value: 'Administrator', label: 'Administrator' },
  { value: 'Employee', label: 'Employee' },
  { value: 'User', label: 'User' },
]

const statusOptions = [
  { value: 'published', text: 'Published' },
  { value: 'draft', text: 'Draft' },
]

const columns = ref([
  { key: 'title', label: 'Title', sortable: true },
  { key: 'created_at', label: 'Date', sortable: true },
  { key: 'author', label: 'Author', sortable: false },
  { key: 'visible_to', label: 'Visible to', sortable: false },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'action', label: 'Action', sortable: false },
])

const filters = reactive({
  search: '',
  accordion: [
    {
      id: 1,
      key: 'status',
      label: 'Status',
      options: ['published', 'draft'],
      model: '',
      isExpand: false,
      computedHeight: 0,
    },
    {
      id: 2,
      key: 'visible_to',
      label: 'Visible to',
      options: ['Administrator', 'Employee', 'User'],
      model: '',
      isExpand: false,
      computedHeight: 0,
    },
  ],
  expandAll: false,
  toggleExpand() {
    filters.accordion.forEach((item) => {
      item.isExpand = !filters.expandAll
    })
    filters.expandAll = !filters.expandAll
  },
  get(pagination) {
    const data = {}

    filters.accordion.forEach(({ key, model }) => {
      if (model !== '' && model !== false) {
        data[key] = model
      }
    })

    if (filters.search) {
      data.q = filters.search
    }

    if (pagination) {
      data.page = pagination.current_page || 1
      data.perPage = pagination.per_page || 10
    }

    return data
  },
  reset() {
    filters.search = ''
    filters.accordion.forEach((item) => {
      item.model = ''
    })
  },
})

const publishingOptions = [
  { value: 'draft', text: 'Draft (Not published)' },
  { value: 'now', text: 'Now' },
  { value: 'scheduled', text: 'Select date and time' },
]

const form = reactive({
  title: '',
  content: '',
  visible_to: [],
  status: 'draft',
  publishing: 'draft',
  publish_at: '',
  push_notification: false,

  getData() {
    const data = {
      title: this.title,
      content: this.content,
      visible_to: this.visible_to,
      status: this.publishing === 'draft' ? 'draft' : 'published',
      push_notification: this.push_notification,
    }

    if (this.publishing === 'scheduled' && this.publish_at) {
      data.publish_at = this.publish_at
    } else {
      data.publish_at = null
    }

    return data
  },

  set(data) {
    this.title = data.title || ''
    this.content = data.content || ''
    this.visible_to = data.visible_to || []
    this.status = data.status || 'draft'
    this.push_notification = data.push_notification || false
    this.publish_at = data.publish_at || ''

    if (data.status === 'draft') {
      this.publishing = 'draft'
    } else if (data.publish_at) {
      this.publishing = 'scheduled'
    } else {
      this.publishing = 'now'
    }
  },

  reset() {
    this.title = ''
    this.content = ''
    this.visible_to = []
    this.status = 'draft'
    this.publishing = 'draft'
    this.publish_at = ''
    this.push_notification = false
  },
})

const items = ref([])

const apiHelpers = reactive({
  loading: false,
  toast: toaster(),
  errors: {},
  respResult: null,
  reset() {
    this.loading = false
    this.errors = {}
    this.respResult = null
  },
})

const pagination = reactive({
  current_page: 1,
  total: 0,
  per_page: 10,
  reset() {
    this.current_page = 1
    this.total = 0
    this.per_page = 10
  },
})

const dialog = reactive({
  show: {
    add: false,
    edit: false,
  },
  temp: {
    data: null,
    id: null,
  },
  toggleDialog(action) {
    dialog.show[action] = !dialog.show[action]
  },
  reset() {
    dialog.show.add = false
    dialog.show.edit = false
    dialog.temp.data = null
    dialog.temp.id = null
  },
})

const errorHandler = (error) => {
  if (error.message === 'Network Error') {
    return apiHelpers.toast.error(error.message)
  }

  if (error.response) {
    if (error.response.status === 422) {
      apiHelpers.errors = error.response.data.errors || {}
    }

    if (error.response.data && error.response.data.message) {
      return apiHelpers.toast.error(error.response.data.message)
    }
  }

  apiHelpers.toast.error('An unexpected error occurred.')
}

export default function useInformationBoard() {
  const reset = () => {
    form.reset()
    pagination.reset()
    dialog.reset()
    apiHelpers.reset()
    filters.reset()
    items.value = []
  }

  const fetchBoardInformation = async () => {
    try {
      apiHelpers.loading = true

      const queryParams = filters.get(pagination)

      const response = await axios.get(route('boardinformation.index'), {
        params: queryParams,
      })

      items.value = response.data.data
      if (response.data.pagination) {
        pagination.current_page = response.data.pagination.current_page
        pagination.total = response.data.pagination.total
        pagination.per_page = response.data.pagination.per_page
      }
    } catch (error) {
      errorHandler(error)
    } finally {
      apiHelpers.loading = false
    }
  }

  const storeInformation = async () => {
    try {
      apiHelpers.loading = true
      apiHelpers.errors = {}

      const response = await axios.post(route('boardinformation.store'), form.getData())
      apiHelpers.respResult = response
      apiHelpers.toast.success(response.data.message)

      form.reset()
      dialog.show.add = false
      fetchBoardInformation()
    } catch (error) {
      errorHandler(error)
      throw error
    } finally {
      apiHelpers.loading = false
    }
  }

  const updateInformation = async () => {
    try {
      apiHelpers.loading = true
      apiHelpers.errors = {}

      const response = await axios.put(
        route('boardinformation.update', { boardinformation: dialog.temp.id }),
        form.getData()
      )
      apiHelpers.respResult = response
      apiHelpers.toast.success(response.data.message)

      form.reset()
      dialog.show.edit = false
      dialog.temp.data = null
      dialog.temp.id = null
      fetchBoardInformation()
    } catch (error) {
      errorHandler(error)
      throw error
    } finally {
      apiHelpers.loading = false
    }
  }

  const deleteInformation = async (id) => {
    try {
      apiHelpers.loading = true

      const response = await axios.delete(route('boardinformation.destroy', id))
      apiHelpers.toast.success(response.data.message)
      fetchBoardInformation()
    } catch (error) {
      errorHandler(error)
    } finally {
      apiHelpers.loading = false
    }
  }

  const dataMeta = computed(() => {
    const from = (pagination.current_page - 1) * pagination.per_page + 1
    const to = Math.min(pagination.total, pagination.current_page * pagination.per_page)
    return {
      from: pagination.total > 0 ? from : 0,
      to,
      of: pagination.total,
    }
  })

  return {
    items,
    form,
    filters,
    columns,
    dialog,
    pagination,
    apiHelpers,
    dataMeta,
    visibleToOptions,
    statusOptions,
    publishingOptions,
    reset,
    fetchBoardInformation,
    storeInformation,
    updateInformation,
    deleteInformation,
  }
}
