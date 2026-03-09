<template>
  <div>
    <!-- Detail Sidebar -->
    <wps-detail-sidebar
      :is-visible.sync="showDetailSidebar"
      :wps-details="currentWps"
      :loading="apiHelpers.loading"
      @edit="onEditFromSidebar"
      @download="onDownload"
    />

    <b-card no-body class="p-2">
      <!-- Header row: Filters | Search | icons | + Add -->
      <div class="d-flex justify-content-between align-items-center mb-2">
        <div class="d-flex align-items-center">
          <b-button
            variant="outline-primary"
            size="sm"
            class="d-flex align-items-center"
            @click="showFilters = !showFilters"
          >
            <feather-icon icon="SlidersIcon" size="14" class="mr-50" />
            Filters
          </b-button>
        </div>

        <div class="d-flex align-items-center flex-grow-1 mx-2">
          <b-form-input
            v-model="filters.search"
            placeholder="Search"
            trim
            @input="debouncedFetch"
          />
        </div>

        <div class="d-flex align-items-center">
          <b-button
            variant="flat-secondary"
            size="sm"
            class="mr-50 px-75"
            @click="downloadOverview"
          >
            <feather-icon icon="DownloadIcon" size="16" />
          </b-button>
          <b-button
            v-if="$can('wps-create', 'all')"
            variant="primary"
            size="sm"
            @click="openAddModal"
          >
            + Add
          </b-button>
        </div>
      </div>

      <!-- Filter panel -->
      <b-collapse :visible="showFilters">
        <b-row class="mb-2">
          <b-col md="3">
            <b-form-group label="Welding Process" label-size="sm">
              <b-form-select
                v-model="filters.welding_process"
                :options="[{ value: '', text: 'All' }, ...weldingProcessOpts]"
                size="sm"
                @change="fetchWps()"
              />
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group label="Material Group" label-size="sm">
              <b-form-select
                v-model="filters.material_group"
                :options="[{ value: '', text: 'All' }, ...materialGroupOpts]"
                size="sm"
                @change="fetchWps()"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-collapse>

      <!-- Table -->
      <b-overlay
        :show="apiHelpers.loading"
        variant="transparent"
        rounded="sm"
      >
        <b-table
          v-if="wpsList.length"
          :items="wpsList"
          :fields="tableFields"
          responsive
          hover
          class="mb-0"
          tbody-tr-class="cursor-pointer"
          @row-clicked="onRowClicked"
        >
          <template #cell(joint_type)="data">
            <b-badge
              v-for="(j, index) in (data.item.joint_type || [])"
              :key="index"
              variant="light-secondary"
              class="mr-50"
            >
              {{ j }}
            </b-badge>
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
              <b-dropdown-item v-if="$can('wps-edit', 'all')" @click.stop="openEditModal(data.item)">
                <feather-icon icon="EditIcon" size="14" class="mr-50" />
                Edit
              </b-dropdown-item>
              <b-dropdown-item v-if="$can('wps-delete', 'all')" @click.stop="handleDelete(data.item.id)">
                <feather-icon icon="TrashIcon" size="14" class="mr-50" />
                Delete
              </b-dropdown-item>
              <b-dropdown-item v-if="$can('wps-edit', 'all')" @click.stop="openAddToProject(data.item)">
                <feather-icon icon="LinkIcon" size="14" class="mr-50" />
                Add to project
              </b-dropdown-item>
            </b-dropdown>
          </template>
        </b-table>

        <div
          v-else-if="!apiHelpers.loading"
          class="text-center text-muted py-4"
        >
          No WPS found
        </div>
      </b-overlay>

      <!-- Pagination -->
      <div v-if="pagination.total > pagination.per_page" class="d-flex justify-content-end mt-2">
        <b-pagination
          v-model="pagination.current_page"
          :total-rows="pagination.total"
          :per-page="pagination.per_page"
          @change="onPageChange"
        />
      </div>
    </b-card>

    <!-- Add/Edit WPS Modal -->
    <wps-form-modal
      :visible="showFormModal"
      :is-edit="isEditing"
      :edit-data="editingWps"
      @close="closeFormModal"
      @saved="onFormSaved"
    />

    <!-- Add to Project Modal -->
    <add-to-project-modal
      :visible="showAddToProjectModal"
      :loading="apiHelpers.loading"
      @close="showAddToProjectModal = false"
      @selected="onProjectSelected"
    />
  </div>
</template>

<script>
import {
  BCard,
  BTable,
  BButton,
  BOverlay,
  BFormInput,
  BFormSelect,
  BFormGroup,
  BBadge,
  BRow,
  BCol,
  BPagination,
  BDropdown,
  BDropdownItem,
  BCollapse,
} from 'bootstrap-vue'
import { ref, onMounted } from '@vue/composition-api'
import useWps, {
  weldingProcessOptions,
  materialGroupOptions,
} from '@/composables/wps'
import WpsDetailSidebar from './WpsDetailSidebar.vue'
import WpsFormModal from './WpsFormModal.vue'
import AddToProjectModal from './AddToProjectModal.vue'

export default {
  components: {
    BCard,
    BTable,
    BButton,
    BOverlay,
    BFormInput,
    BFormSelect,
    BFormGroup,
    BBadge,
    BRow,
    BCol,
    BPagination,
    BDropdown,
    BDropdownItem,
    BCollapse,
    WpsDetailSidebar,
    WpsFormModal,
    AddToProjectModal,
  },
  setup() {
    const {
      wpsList,
      currentWps,
      form,
      dialog,
      apiHelpers,
      filters,
      pagination,
      fetchWps,
      getWps,
      deleteWps,
      addToProject,
    } = useWps()

    const showFilters = ref(false)
    const showDetailSidebar = ref(false)
    const showFormModal = ref(false)
    const showAddToProjectModal = ref(false)
    const isEditing = ref(false)
    const editingWps = ref(null)
    const addToProjectWpsId = ref(null)

    const weldingProcessOpts = weldingProcessOptions
    const materialGroupOpts = materialGroupOptions

    const tableFields = [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'welding_process', label: 'Process', sortable: true },
      { key: 'joint_type', label: 'Joint', sortable: false, thClass: 'text-center', tdClass: 'text-center' },
      { key: 'material_group', label: 'Group', sortable: true, thClass: 'text-center', tdClass: 'text-center' },
      { key: 'thickness', label: 'Thickness', sortable: false, thClass: 'text-center', tdClass: 'text-center' },
      { key: 'diameter', label: 'Diameter', sortable: false, thClass: 'text-center', tdClass: 'text-center' },
      { key: 'standard', label: 'Standard', sortable: false, formatter: (val) => (val && val.length ? val.join(', ') : '-') },
      { key: 'actions', label: '', sortable: false, thStyle: { width: '50px' }, tdClass: 'text-center' },
    ]

    let debounceTimer = null
    const debouncedFetch = () => {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => fetchWps(), 300)
    }

    const onRowClicked = async (item) => {
      await getWps(item.id)
      showDetailSidebar.value = true
    }

    const openAddModal = () => {
      isEditing.value = false
      editingWps.value = null
      showFormModal.value = true
    }

    const openEditModal = (item) => {
      isEditing.value = true
      editingWps.value = item
      showFormModal.value = true
    }

    const onEditFromSidebar = (item) => {
      showDetailSidebar.value = false
      openEditModal(item)
    }

    const closeFormModal = () => {
      showFormModal.value = false
      isEditing.value = false
      editingWps.value = null
    }

    const onFormSaved = () => {
      closeFormModal()
      fetchWps()
    }

    const handleDelete = async (id) => {
      if (!confirm('Are you sure you want to delete this WPS?')) return
      const success = await deleteWps(id)
      if (success) fetchWps()
    }

    const openAddToProject = (item) => {
      addToProjectWpsId.value = item.id
      showAddToProjectModal.value = true
    }

    const onProjectSelected = async (projectId) => {
      if (addToProjectWpsId.value) {
        const success = await addToProject(addToProjectWpsId.value, projectId)
        if (success) {
          showAddToProjectModal.value = false
          fetchWps()
        }
      }
    }

    const onPageChange = (page) => {
      pagination.current_page = page
      fetchWps()
    }

    const downloadOverview = () => {
      // Build CSV for download
      const headers = ['Name', 'Process', 'Joint', 'Group', 'Thickness', 'Diameter', 'Standard']
      const rows = wpsList.value.map((w) => [
        w.name,
        w.welding_process,
        (w.joint_type || []).join(' / '),
        w.material_group,
        w.thickness || '',
        w.diameter || '',
        (w.standard || []).join(', '),
      ])
      const csv = [headers.join(','), ...rows.map((r) => r.map((c) => `"${c || ''}"`).join(','))].join('\n')
      const blob = new Blob([csv], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'wps-overview.csv'
      a.click()
      URL.revokeObjectURL(url)
    }

    const onDownload = (item) => {
      // Download single WPS as CSV
      downloadOverview()
    }

    onMounted(() => {
      fetchWps()
    })

    return {
      wpsList,
      currentWps,
      apiHelpers,
      filters,
      pagination,
      showFilters,
      showDetailSidebar,
      showFormModal,
      showAddToProjectModal,
      isEditing,
      editingWps,
      weldingProcessOpts,
      materialGroupOpts,
      tableFields,
      debouncedFetch,
      fetchWps,
      onRowClicked,
      openAddModal,
      openEditModal,
      onEditFromSidebar,
      closeFormModal,
      onFormSaved,
      handleDelete,
      openAddToProject,
      onProjectSelected,
      onPageChange,
      downloadOverview,
      onDownload,
    }
  },
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
