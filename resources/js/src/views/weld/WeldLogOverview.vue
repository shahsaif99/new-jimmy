<template>
  <div>
    <b-card no-body class="p-2">
      <b-row class="mb-2">
        <b-col md="4">
          <b-form-input
            v-model="filters.search"
            placeholder="Search by drawing no..."
            trim
            @input="debouncedFetch"
          />
        </b-col>
        <b-col md="3">
          <b-form-select
            v-model="filters.status"
            :options="statusOptions"
            @change="fetchWeldLogs()"
          />
        </b-col>
        <b-col md="5" class="text-right">
          <b-button
            v-if="$can('weld-log-create', 'all')"
            variant="primary"
            @click="openNewWeldLogModal"
          >
            <feather-icon icon="PlusIcon" size="14" class="mr-50" />
            New Weld Log
          </b-button>
        </b-col>
      </b-row>

      <b-overlay
        :show="apiHelpers.loading"
        variant="transparent"
        rounded="sm"
      >
        <b-table
          v-if="weldLogs.length"
          :items="weldLogs"
          :fields="tableFields"
          responsive
          hover
          striped
          small
          class="mb-0"
          tbody-tr-class="cursor-pointer"
          @row-clicked="openDetailModal"
        >
          <template #cell(status)="data">
            <b-badge :variant="data.item.status === 'completed' ? 'success' : 'warning'">
              {{ data.item.status.replace(/_/g, ' ') }}
            </b-badge>
          </template>

          <template #cell(project_name)="data">
            {{ data.item.project_no }} - {{ data.item.project_name }}
          </template>

          <template #cell(updated_at)="data">
            {{ formatDate(data.item.updated_at) }}
          </template>

          <template #cell(actions)="data">
            <b-dropdown
              variant="link"
              no-caret
              right
            >
              <template #button-content>
                <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
              </template>
              <b-dropdown-item v-if="$can('weld-log-edit', 'all')" @click.stop="openEditModal(data.item)">
                <feather-icon icon="EditIcon" size="14" class="mr-50" />
                Edit
              </b-dropdown-item>
              <b-dropdown-item v-if="$can('weld-log-delete', 'all')" @click.stop="handleDelete(data.item.id)">
                <feather-icon icon="TrashIcon" size="14" class="mr-50" />
                Delete
              </b-dropdown-item>
            </b-dropdown>
          </template>
        </b-table>

        <div
          v-else-if="!apiHelpers.loading"
          class="text-center text-muted py-4"
        >
          No weld logs found
        </div>
      </b-overlay>

      <!-- Pagination -->
      <div v-if="pagination.total > pagination.per_page" class="d-flex justify-content-center mt-2">
        <b-pagination
          v-model="pagination.current_page"
          :total-rows="pagination.total"
          :per-page="pagination.per_page"
          @change="onPageChange"
        />
      </div>
    </b-card>

    <!-- New / Edit Weld Log Modal -->
    <new-weld-log-modal
      :visible="showEditModal || dialog.show.weldLog.add"
      :edit-data="editingWeldLog"
      @close="closeEditModal"
      @created="onWeldLogCreated"
    />

    <!-- Weld Log Detail Modal -->
    <weld-log-detail-modal
      :visible="dialog.show.weldLog.detail"
      :weld-log="currentWeldLog"
      @close="dialog.closeDialog('weldLog', 'detail')"
      @updated="onWeldLogUpdated"
    />
  </div>
</template>

<script>
import {
  BCard,
  BCardTitle,
  BTable,
  BButton,
  BOverlay,
  BFormInput,
  BFormSelect,
  BBadge,
  BRow,
  BCol,
  BPagination,
  BDropdown,
  BDropdownItem,
} from 'bootstrap-vue'
import { ref, onMounted } from '@vue/composition-api'
import useWeldLogs from '@/composables/weldLogs'
import NewWeldLogModal from './NewWeldLogModal.vue'
import WeldLogDetailModal from './WeldLogDetailModal.vue'

export default {
  components: {
    BCard,
    BCardTitle,
    BTable,
    BButton,
    BOverlay,
    BFormInput,
    BFormSelect,
    BBadge,
    BRow,
    BCol,
    BPagination,
    BDropdown,
    BDropdownItem,
    NewWeldLogModal,
    WeldLogDetailModal,
  },
  setup() {
    const {
      weldLogs,
      currentWeldLog,
      dialog,
      apiHelpers,
      filters,
      pagination,
      fetchWeldLogs,
      getWeldLog,
      deleteWeldLog,
    } = useWeldLogs()

    const statusOptions = [
      { value: '', text: 'All Statuses' },
      { value: 'in_progress', text: 'In Progress' },
      { value: 'completed', text: 'Completed' },
    ]

    const tableFields = [
      { key: 'drawing_no', label: 'Drawing No.', sortable: true },
      { key: 'welds_count', label: 'No. of welds', sortable: true, thClass: 'text-center', tdClass: 'text-center' },
      { key: 'ndt_rt', label: 'RT', sortable: false, thClass: 'text-center', tdClass: 'text-center', thStyle: { width: '60px' } },
      { key: 'ndt_mt', label: 'MT', sortable: false, thClass: 'text-center', tdClass: 'text-center', thStyle: { width: '60px' } },
      { key: 'ndt_pt', label: 'PT', sortable: false, thClass: 'text-center', tdClass: 'text-center', thStyle: { width: '60px' } },
      { key: 'ndt_vt', label: 'VT', sortable: false, thClass: 'text-center', tdClass: 'text-center', thStyle: { width: '60px' } },
      { key: 'updated_at', label: 'Last edited', sortable: true },
      { key: 'status', label: 'Status', sortable: true, thClass: 'text-center', tdClass: 'text-center' },
      { key: 'project_name', label: 'Project', sortable: false },
      { key: 'actions', label: '', sortable: false, thStyle: { width: '60px' }, tdClass: 'text-center' },
    ]

    let debounceTimer = null
    const debouncedFetch = () => {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        fetchWeldLogs()
      }, 300)
    }

    const formatDate = (date) => {
      if (!date) return 'N/A'
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
      return new Date(date).toLocaleDateString(undefined, options)
    }

    const showEditModal = ref(false)
    const editingWeldLog = ref(null)

    const openNewWeldLogModal = () => {
      editingWeldLog.value = null
      dialog.toggleDialog('weldLog', 'add')
    }

    const openEditModal = (item) => {
      editingWeldLog.value = item
      showEditModal.value = true
    }

    const closeEditModal = () => {
      showEditModal.value = false
      editingWeldLog.value = null
      dialog.closeDialog('weldLog', 'add')
    }

    const openDetailModal = async (item) => {
      await getWeldLog(item.id)
      dialog.toggleDialog('weldLog', 'detail')
    }

    const handleDelete = async (id) => {
      if (!confirm('Are you sure you want to delete this weld log?')) return
      const success = await deleteWeldLog(id)
      if (success) fetchWeldLogs()
    }

    const onPageChange = (page) => {
      pagination.current_page = page
      fetchWeldLogs()
    }

    const onWeldLogCreated = () => {
      closeEditModal()
      fetchWeldLogs()
    }

    const onWeldLogUpdated = () => {
      fetchWeldLogs()
    }

    onMounted(() => {
      fetchWeldLogs()
    })

    return {
      weldLogs,
      currentWeldLog,
      dialog,
      apiHelpers,
      filters,
      pagination,
      statusOptions,
      tableFields,
      formatDate,
      showEditModal,
      editingWeldLog,
      debouncedFetch,
      openNewWeldLogModal,
      openEditModal,
      closeEditModal,
      openDetailModal,
      handleDelete,
      onPageChange,
      onWeldLogCreated,
      onWeldLogUpdated,
    }
  },
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
