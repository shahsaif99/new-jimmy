<template>
  <div>
    <b-card no-body class="p-2">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <b-card-title class="mb-0">Weld Log</b-card-title>
        <b-button
          v-if="$can('weld-log-create', 'all')"
          variant="primary"
          size="sm"
          @click="openNewWeldLogModal"
        >
          New Weld Log
        </b-button>
      </div>

      <b-form-input
        v-model="searchQuery"
        class="mb-2"
        placeholder="Search weld logs..."
        trim
      />

      <b-overlay
        :show="apiHelpers.loading"
        variant="transparent"
        rounded="sm"
      >
        <b-table
          v-if="filteredWeldLogs.length"
          :items="filteredWeldLogs"
          :fields="tableFields"
          responsive
          hover
          striped
          class="mb-0"
          tbody-tr-class="cursor-pointer"
          @row-clicked="openDetailModal"
        >
          <template #cell(status)="data">
            <b-badge :variant="data.item.status === 'completed' ? 'success' : 'warning'">
              {{ data.item.status.replace(/_/g, ' ') }}
            </b-badge>
          </template>

          <template #cell(updated_at)="data">
            {{ formatDate(data.item.updated_at) }}
          </template>

          <template #cell(actions)="data">
            <b-button
              v-if="$can('weld-log-delete', 'all')"
              variant="flat-danger"
              size="sm"
              @click.stop="handleDeleteWeldLog(data.item.id)"
            >
              <feather-icon icon="TrashIcon" size="14" />
            </b-button>
          </template>
        </b-table>

        <div
          v-else-if="!apiHelpers.loading"
          class="text-center text-muted py-4"
        >
          No weld logs found for this project
        </div>
      </b-overlay>
    </b-card>

    <!-- New Weld Log Modal -->
    <new-weld-log-modal
      :visible="dialog.show.weldLog.add"
      :project-id="projectId"
      @close="dialog.closeDialog('weldLog', 'add')"
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
  BBadge,
} from 'bootstrap-vue'
import { ref, computed, onMounted, watch } from '@vue/composition-api'
import useWeldLogs from '@/composables/weldLogs'
import NewWeldLogModal from '@/views/weld/NewWeldLogModal.vue'
import WeldLogDetailModal from '@/views/weld/WeldLogDetailModal.vue'

export default {
  components: {
    BCard,
    BCardTitle,
    BTable,
    BButton,
    BOverlay,
    BFormInput,
    BBadge,
    NewWeldLogModal,
    WeldLogDetailModal,
  },
  props: {
    projectId: {
      type: [Number, String],
      required: true,
    },
  },
  setup(props) {
    const {
      weldLogs,
      currentWeldLog,
      dialog,
      apiHelpers,
      fetchWeldLogs,
      getWeldLog,
      deleteWeldLog,
    } = useWeldLogs()

    const searchQuery = ref('')

    const tableFields = [
      { key: 'drawing_no', label: 'Drawing No.', sortable: true },
      { key: 'welds_count', label: 'No. of welds', sortable: true },
      { key: 'ndt_rt', label: 'RT', sortable: false },
      { key: 'ndt_mt', label: 'MT', sortable: false },
      { key: 'ndt_pt', label: 'PT', sortable: false },
      { key: 'ndt_vt', label: 'VT', sortable: false },
      { key: 'updated_at', label: 'Last edited', sortable: true },
      { key: 'status', label: 'Status', sortable: true },
      { key: 'actions', label: 'Action', sortable: false },
    ]

    const filteredWeldLogs = computed(() => {
      const list = weldLogs.value ?? []
      const q = searchQuery.value?.trim().toLowerCase()
      if (!q) return list
      return list.filter((wl) =>
        (wl.drawing_no ?? '').toLowerCase().includes(q)
      )
    })

    const formatDate = (date) => {
      if (!date) return 'N/A'
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
      return new Date(date).toLocaleDateString(undefined, options)
    }

    const openNewWeldLogModal = () => {
      dialog.toggleDialog('weldLog', 'add')
    }

    const openDetailModal = async (item) => {
      await getWeldLog(item.id)
      dialog.toggleDialog('weldLog', 'detail')
    }

    const handleDeleteWeldLog = async (id) => {
      if (!confirm('Are you sure you want to delete this weld log?')) return
      const success = await deleteWeldLog(id)
      if (success) fetchWeldLogs(props.projectId)
    }

    const onWeldLogCreated = () => {
      fetchWeldLogs(props.projectId)
    }

    const onWeldLogUpdated = () => {
      fetchWeldLogs(props.projectId)
    }

    onMounted(() => {
      if (props.projectId) {
        fetchWeldLogs(props.projectId)
      }
    })

    watch(
      () => props.projectId,
      (newVal) => {
        if (newVal) fetchWeldLogs(newVal)
      }
    )

    return {
      weldLogs,
      currentWeldLog,
      dialog,
      apiHelpers,
      searchQuery,
      tableFields,
      filteredWeldLogs,
      formatDate,
      openNewWeldLogModal,
      openDetailModal,
      handleDeleteWeldLog,
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
