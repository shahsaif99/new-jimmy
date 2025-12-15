<template>
  <div>
    <!-- Details Sidebar -->
    <avvik-details-sidebar
      :is-visible.sync="isDetailsSidebarVisible"
      :avvik-details="selectedAvvikDetails"
      :loading="detailsLoading"
    />

    <b-card no-body class="p-2">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <b-card-title class="mb-0">{{ t('Deviations') }}</b-card-title>
        <b-button
          variant="primary"
          size="sm"
          @click="$router.push({ name: 'avvik-listings-create' })"
        >
          {{ t('Add Deviation') }}
        </b-button>
      </div>

      <b-form-input
        v-model="searchQuery"
        class="mb-2"
        :placeholder="t('Search deviations...')"
        trim
      />

      <b-overlay
        :show="loading"
        variant="transparent"
        rounded="sm"
      >
        <b-table
          v-if="filteredDeviations.length"
          :items="filteredDeviations"
          :fields="tableFields"
          responsive
          hover
          striped
          class="mb-0"
          tbody-tr-class="cursor-pointer"
          @row-clicked="onRowClicked"
        >
          <template #cell(title)="data">
            {{ data.item.title }}
          </template>

          <template #cell(type)="data">
            {{ data.item.type }}
          </template>

          <template #cell(date)="data">
            {{ formatDate(data.item.date) }}
          </template>

          <template #cell(severity)="data">
            <b-badge :variant="getSeverityVariant(data.item.severity)">
              {{ data.item.severity || 'Not defined' }}
            </b-badge>
          </template>

          <template #cell(status)="data">
            <b-badge :variant="getStatusVariant(data.item.close_status)">
              {{ data.item.close_status }}
            </b-badge>
          </template>

          <template #cell(responsible)="data">
            {{ data.item.user ? data.item.user.name : 'N/A' }}
          </template>

          <template #cell(actions)="data">
            <b-button
              variant="flat-primary"
              size="sm"
              @click.stop="$router.push({ name: 'avvik-listings-edit', params: { id: data.item.id } })"
            >
              <feather-icon icon="EditIcon" size="14" />
            </b-button>
          </template>
        </b-table>

        <div
          v-else-if="!loading"
          class="text-center text-muted py-4"
        >
          {{ t('No deviations found for this project') }}
        </div>
      </b-overlay>
    </b-card>
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
import { ref, computed, watch, onMounted } from '@vue/composition-api'
import axios from '@axios'
import route from 'ziggy-js'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import AvvikDetailsSidebar from '@/views/avvik-listings/sidebar/AvvikDetailsSidebar.vue'

export default {
  components: {
    BCard,
    BCardTitle,
    BTable,
    BButton,
    BOverlay,
    BFormInput,
    BBadge,
    AvvikDetailsSidebar,
  },
  props: {
    projectId: {
      type: [Number, String],
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18nUtils()
    const deviations = ref([])
    const loading = ref(false)
    const searchQuery = ref('')

    // Sidebar state
    const isDetailsSidebarVisible = ref(false)
    const selectedAvvikDetails = ref(null)
    const detailsLoading = ref(false)

    const tableFields = [
      { key: 'title', label: 'Title', sortable: true },
      { key: 'type', label: 'Type', sortable: true },
      { key: 'date', label: 'Date', sortable: true },
      { key: 'severity', label: 'Severity', sortable: true },
      { key: 'status', label: 'Status', sortable: true },
      { key: 'responsible', label: 'Responsible', sortable: false },
      { key: 'actions', label: 'Actions', sortable: false },
    ]

    const filteredDeviations = computed(() => {
      const list = deviations.value ?? []
      const q = searchQuery.value?.trim().toLowerCase()

      if (!q) return list

      return list.filter((d) => {
        const title = d.title ?? ''
        const type = d.type ?? ''
        const userName = d.user?.name ?? ''
        return (
          title.toLowerCase().includes(q) ||
          type.toLowerCase().includes(q) ||
          userName.toLowerCase().includes(q)
        )
      })
    })

    const fetchDeviations = async () => {
      try {
        loading.value = true
        const response = await axios.get(route('avvikruh.index'), {
          params: {
            project_id: props.projectId,
          },
        })
        deviations.value = response.data.data || response.data
      } catch (error) {
        console.error('Failed to load deviations', error)
      } finally {
        loading.value = false
      }
    }

    const onRowClicked = async (item) => {
      isDetailsSidebarVisible.value = true
      detailsLoading.value = true
      selectedAvvikDetails.value = null

      try {
        const response = await axios.get(route('avvikruh.show', { id: item.id }))
        selectedAvvikDetails.value = response.data.data
      } catch (error) {
        console.error('Failed to load deviation details', error)
      } finally {
        detailsLoading.value = false
      }
    }

    const formatDate = (date) => {
      if (!date) return 'N/A'
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
      return new Date(date).toLocaleDateString(undefined, options)
    }

    const getSeverityVariant = (severity) => {
      switch (severity) {
        case 'Critical':
          return 'danger'
        case 'High':
          return 'warning'
        case 'Medium':
          return 'info'
        case 'Low':
          return 'success'
        default:
          return 'secondary'
      }
    }

    const getStatusVariant = (status) => {
      if (status === 'Closed') return 'success'
      if (status === 'Open') return 'warning'
      return 'secondary'
    }

    onMounted(() => {
      if (props.projectId) {
        fetchDeviations()
      }
    })

    watch(
      () => props.projectId,
      (newVal) => {
        if (newVal) {
          fetchDeviations()
        }
      }
    )

    return {
      t,
      deviations,
      loading,
      searchQuery,
      tableFields,
      filteredDeviations,
      formatDate,
      getSeverityVariant,
      getStatusVariant,
      isDetailsSidebarVisible,
      selectedAvvikDetails,
      detailsLoading,
      onRowClicked,
    }
  },
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
