<template>
  <div>
    <!-- Detail Sidebar -->
    <wps-detail-sidebar
      :is-visible.sync="showDetailSidebar"
      :wps-details="currentWps"
      :loading="apiHelpers.loading"
      @edit="onEditFromSidebar"
    />

    <b-card no-body class="p-2">
      <!-- Header row -->
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
            v-model="searchQuery"
            placeholder="Search"
            trim
          />
        </div>

        <div class="d-flex align-items-center">
          <b-button
            variant="flat-secondary"
            size="sm"
            class="px-75"
            @click="downloadOverview"
          >
            <feather-icon icon="DownloadIcon" size="16" />
          </b-button>
        </div>
      </div>

      <!-- Filter panel -->
      <b-collapse :visible="showFilters">
        <b-row class="mb-2">
          <b-col md="3">
            <b-form-group label="Welding Process" label-size="sm">
              <b-form-select
                v-model="processFilter"
                :options="[{ value: '', text: 'All' }, ...weldingProcessOpts]"
                size="sm"
                @change="onFilterChange"
              />
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group label="Material Group" label-size="sm">
              <b-form-select
                v-model="materialFilter"
                :options="[{ value: '', text: 'All' }, ...materialGroupOpts]"
                size="sm"
                @change="onFilterChange"
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
          v-if="filteredWps.length"
          :items="filteredWps"
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
            </b-dropdown>
          </template>
        </b-table>

        <div
          v-else-if="!apiHelpers.loading"
          class="text-center text-muted py-4"
        >
          No WPS found for this project
        </div>
      </b-overlay>
    </b-card>

    <!-- Edit WPS Modal -->
    <wps-form-modal
      :visible="showFormModal"
      :is-edit="true"
      :edit-data="editingWps"
      :project-id="projectId"
      @close="closeFormModal"
      @saved="onFormSaved"
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
  BDropdown,
  BDropdownItem,
  BCollapse,
} from 'bootstrap-vue'
import { ref, computed, onMounted, watch } from '@vue/composition-api'
import useWps, {
  weldingProcessOptions,
  materialGroupOptions,
} from '@/composables/wps'
import WpsDetailSidebar from '@/views/weld/WpsDetailSidebar.vue'
import WpsFormModal from '@/views/weld/WpsFormModal.vue'

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
    BDropdown,
    BDropdownItem,
    BCollapse,
    WpsDetailSidebar,
    WpsFormModal,
  },
  props: {
    projectId: {
      type: [Number, String],
      required: true,
    },
  },
  setup(props) {
    const {
      wpsList,
      currentWps,
      apiHelpers,
      fetchWps,
      getWps,
      deleteWps,
    } = useWps()

    const showFilters = ref(false)
    const showDetailSidebar = ref(false)
    const showFormModal = ref(false)
    const editingWps = ref(null)
    const searchQuery = ref('')
    const processFilter = ref('')
    const materialFilter = ref('')

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

    const filteredWps = computed(() => {
      let list = wpsList.value ?? []
      const q = searchQuery.value?.trim().toLowerCase()
      if (q) {
        list = list.filter((w) =>
          (w.name ?? '').toLowerCase().includes(q) ||
          (w.welding_process ?? '').toLowerCase().includes(q)
        )
      }
      if (processFilter.value) {
        list = list.filter((w) => w.welding_process === processFilter.value)
      }
      if (materialFilter.value) {
        list = list.filter((w) => w.material_group === materialFilter.value)
      }
      return list
    })

    const onFilterChange = () => {
      // Client-side filtering via computed
    }

    const onRowClicked = async (item) => {
      await getWps(item.id)
      showDetailSidebar.value = true
    }

    const openEditModal = (item) => {
      editingWps.value = item
      showFormModal.value = true
    }

    const onEditFromSidebar = (item) => {
      showDetailSidebar.value = false
      openEditModal(item)
    }

    const closeFormModal = () => {
      showFormModal.value = false
      editingWps.value = null
    }

    const onFormSaved = () => {
      closeFormModal()
      fetchWps(props.projectId)
    }

    const handleDelete = async (id) => {
      if (!confirm('Are you sure you want to delete this WPS?')) return
      const success = await deleteWps(id)
      if (success) fetchWps(props.projectId)
    }

    const downloadOverview = () => {
      const headers = ['Name', 'Process', 'Joint', 'Group', 'Thickness', 'Diameter', 'Standard']
      const rows = filteredWps.value.map((w) => [
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
      a.download = 'wps-project-overview.csv'
      a.click()
      URL.revokeObjectURL(url)
    }

    onMounted(() => {
      if (props.projectId) {
        fetchWps(props.projectId)
      }
    })

    watch(
      () => props.projectId,
      (newVal) => {
        if (newVal) fetchWps(newVal)
      }
    )

    return {
      wpsList,
      currentWps,
      apiHelpers,
      showFilters,
      showDetailSidebar,
      showFormModal,
      editingWps,
      searchQuery,
      processFilter,
      materialFilter,
      weldingProcessOpts,
      materialGroupOpts,
      tableFields,
      filteredWps,
      onFilterChange,
      onRowClicked,
      openEditModal,
      onEditFromSidebar,
      closeFormModal,
      onFormSaved,
      handleDelete,
      downloadOverview,
    }
  },
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
