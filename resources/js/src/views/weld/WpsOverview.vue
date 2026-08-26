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
          <b-col md="3">
            <b-form-group label="Joint Type" label-size="sm">
              <b-form-select
                v-model="filters.joint_type"
                :options="jointTypeOpts"
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
          small
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

      <!-- Pagination: shown whenever there are rows, so the page-size control is
           reachable even when everything fits on one page. -->
      <div v-if="pagination.total" class="d-flex justify-content-end align-items-center mt-2">
        <span class="text-muted mr-50">Show</span>
        <b-form-select
          v-model="pagination.per_page"
          :options="perPageOptions"
          size="sm"
          style="width: 5rem"
          @change="onPerPageChange"
        />
        <span class="text-muted ml-50 mr-1">entries</span>
        <b-pagination
          v-model="pagination.current_page"
          :total-rows="pagination.total"
          :per-page="pagination.per_page"
          class="mb-0"
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
import { utils, writeFile } from 'xlsx'
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
    const jointTypeOpts = [
      { value: '', text: 'All' },
      { value: 'BW', text: 'BW' },
      { value: 'FW', text: 'FW' },
    ]

    const tableFields = [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'welding_process', label: 'Process', sortable: true },
      { key: 'joint_type', label: 'Joint', sortable: false, thClass: 'text-center', tdClass: 'text-center' },
      { key: 'material_group', label: 'Group', sortable: true, thClass: 'text-center', tdClass: 'text-center' },
      { key: 'thickness', label: 'Thickness', sortable: false, thClass: 'text-center', tdClass: 'text-center' },
      { key: 'diameter', label: 'Diameter', sortable: false, thClass: 'text-center', tdClass: 'text-center' },
      // A b-table formatter that throws blanks the whole grid, not just its own
      // cell, so a standard stored as a bare string is tolerated here.
      { key: 'standard', label: 'Standard', sortable: false, formatter: (val) => { if (!val || !val.length) return '-'; return Array.isArray(val) ? val.join(', ') : String(val) } },
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

    const perPageOptions = [10, 25, 50, 100]

    // Changing the page size while deep in the list would land on a page that
    // no longer exists, so go back to the first.
    const onPerPageChange = (size) => {
      pagination.per_page = size
      pagination.current_page = 1
      fetchWps()
    }

    const downloadOverview = () => {
      const data = wpsList.value.map((w) => ({
        Name: w.name || '',
        'Welding Process': w.welding_process || '',
        'Joint Type': (w.joint_type || []).join(', '),
        'Material Group': w.material_group || '',
        Thickness: w.thickness || '',
        Diameter: w.diameter || '',
        Standard: (w.standard || []).join(', '),
      }))
      const ws = utils.json_to_sheet(data)
      const wb = utils.book_new()
      utils.book_append_sheet(wb, ws, 'WPS Overview')
      writeFile(wb, 'wps-overview.xlsx')
    }

    const formatSides = (sides) => {
      if (sides === 'bs') return 'Both Sides'
      if (sides === 'ss') return 'Single Side'
      return sides || '-'
    }

    const onDownload = (wps) => {
      if (!wps) return
      const data = [{
        'Name': wps.name || '-',
        'Welding Process': wps.welding_process || '-',
        'WPQR Number': wps.wpqr || '-',
        'Thickness': wps.thickness || '-',
        'Diameter': wps.diameter || '-',
        'Joint Type': (wps.joint_type || []).join(', ') || '-',
        'Material Group': wps.material_group || '-',
        'Welding Position': (wps.welding_position || []).join(', ') || '-',
        'Layer': wps.layer || '-',
        'Side': formatSides(wps.sides),
        'Standard': (wps.standard || []).join(', ') || '-',
        'Ref. Standard': (wps.ref_spec || []).join(', ') || '-',
        'Prepared Date': wps.prepared_date || '-',
        'Prepared By': wps.prepared_by_name || '-',
      }]
      const ws = utils.json_to_sheet(data)
      const wb = utils.book_new()
      utils.book_append_sheet(wb, ws, 'WPS Detail')
      writeFile(wb, `wps-${wps.name || 'detail'}.xlsx`)
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
      jointTypeOpts,
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
      perPageOptions,
      onPerPageChange,
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
