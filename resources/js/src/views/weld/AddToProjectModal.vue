<template>
  <b-modal
    :visible="visible"
    title="Add to Project"
    size="lg"
    hide-footer
    @hidden="onClose"
  >
    <b-form-input
      v-model="searchQuery"
      class="mb-2"
      placeholder="Search..."
      trim
    />

    <b-table
      v-if="filteredProjects.length"
      :items="filteredProjects"
      :fields="tableFields"
      responsive
      hover
      striped
      selectable
      select-mode="single"
      class="mb-0"
      @row-selected="onRowSelected"
    >
      <template #cell(project_no)="data">
        {{ data.item.project_no }}
      </template>
      <template #cell(customer_name)="data">
        {{ data.item.customer_name || '-' }}
      </template>
      <template #cell(name)="data">
        {{ data.item.name }}
      </template>
    </b-table>

    <div
      v-else
      class="text-center text-muted py-4"
    >
      No projects found
    </div>

    <div class="d-flex justify-content-end mt-2">
      <b-button
        variant="primary"
        :disabled="!selectedProjectId || loading"
        @click="handleSave"
      >
        Save
      </b-button>
    </div>
  </b-modal>
</template>

<script>
import {
  BModal,
  BFormInput,
  BTable,
  BButton,
} from 'bootstrap-vue'
import { ref, computed, onMounted } from '@vue/composition-api'
import useProjects from '@/composables/projects'

export default {
  components: {
    BModal,
    BFormInput,
    BTable,
    BButton,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const { projects, fetchProjectsList } = useProjects()

    const searchQuery = ref('')
    const selectedProjectId = ref(null)

    const tableFields = [
      { key: 'project_no', label: 'PO', sortable: true },
      { key: 'customer_name', label: 'Customer', sortable: false },
      { key: 'name', label: 'Project name', sortable: true },
    ]

    const filteredProjects = computed(() => {
      const list = projects.value ?? []
      const q = searchQuery.value?.trim().toLowerCase()
      if (!q) return list
      return list.filter((p) =>
        (p.name ?? '').toLowerCase().includes(q) ||
        (p.project_no ?? '').toString().toLowerCase().includes(q) ||
        (p.customer_name ?? '').toLowerCase().includes(q)
      )
    })

    const onRowSelected = (items) => {
      selectedProjectId.value = items.length ? items[0].id : null
    }

    const handleSave = () => {
      if (selectedProjectId.value) {
        emit('selected', selectedProjectId.value)
      }
    }

    const onClose = () => {
      selectedProjectId.value = null
      searchQuery.value = ''
      emit('close')
    }

    onMounted(() => {
      fetchProjectsList()
    })

    return {
      searchQuery,
      selectedProjectId,
      tableFields,
      filteredProjects,
      onRowSelected,
      handleSave,
      onClose,
    }
  },
}
</script>
