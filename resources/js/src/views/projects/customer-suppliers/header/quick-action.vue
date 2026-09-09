<template>
  <div class="cs-toolbar mb-2">
    <b-input-group class="input-group-merge cs-search">
      <b-input-group-prepend is-text>
        <feather-icon icon="SearchIcon" size="14" />
      </b-input-group-prepend>
      <b-form-input
        v-model="filters.search"
        debounce="400"
        :placeholder="t('Search by name, organization number, email, contact person...')"
      />
    </b-input-group>

    <b-form-group :label="t('Type / Role')" class="mb-0 cs-select">
      <b-form-select v-model="filters.type" :options="typeFilterOptions" />
    </b-form-group>

    <b-form-group :label="t('Status (Suppliers only)')" class="mb-0 cs-select">
      <b-form-select v-model="filters.evaluation_status" :options="evaluationStatusOptions" />
    </b-form-group>

    <b-dropdown variant="outline-primary" no-caret right class="cs-action">
      <template #button-content>
        <feather-icon icon="FilterIcon" size="14" class="mr-50" />
        {{ t('Filters') }}
        <b-badge v-if="activeFilters" variant="primary" class="ml-50">{{ activeFilters }}</b-badge>
      </template>
      <div class="px-1 py-50 cs-filter-panel">
        <b-form-group :label="t('Record status')" class="mb-1">
          <b-form-select v-model="filters.is_active" :options="activeFilterOptions" size="sm" />
        </b-form-group>
        <b-form-group :label="t('Management system')" class="mb-1">
          <b-form-select v-model="filters.system" :options="systemFilterOptions" size="sm" />
        </b-form-group>
        <b-form-group :label="t('Supplier of')" class="mb-0">
          <b-form-select v-model="filters.supplier_of" :options="supplierOfFilterOptions" size="sm" />
        </b-form-group>
      </div>
    </b-dropdown>

    <b-button variant="outline-secondary" class="cs-action" @click="onClear">
      <feather-icon icon="RefreshCcwIcon" size="14" class="mr-50" />
      {{ t('Clear') }}
    </b-button>

    <b-button variant="outline-secondary" class="cs-action" @click="$emit('export')">
      <feather-icon icon="DownloadIcon" size="14" class="mr-50" />
      {{ t('Export') }}
    </b-button>

    <b-button variant="primary" class="cs-action" @click="$emit('add')">
      <feather-icon icon="PlusIcon" size="14" class="mr-50" />
      {{ t('Add') }}
    </b-button>
  </div>
</template>

<script>
import {
  BButton,
  BDropdown,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BInputGroup,
  BInputGroupPrepend,
  BBadge,
} from 'bootstrap-vue'
import { computed } from '@vue/composition-api'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import useCustomerSupplier, {
  typeFilterOptions,
  evaluationStatusOptions,
  managementSystems,
  supplierOfOptions,
} from '@/composables/customer-suppliers'

export default {
  name: 'CustomerSupplierToolbar',
  components: {
    BButton,
    BDropdown,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BInputGroup,
    BInputGroupPrepend,
    BBadge,
  },
  setup() {
    const { t } = useI18nUtils()
    const { filters } = useCustomerSupplier()

    const activeFilterOptions = [
      { value: '', text: 'All' },
      { value: true, text: 'Active' },
      { value: false, text: 'Deactivated' },
    ]

    const systemFilterOptions = [
      { value: '', text: 'All' },
      ...managementSystems,
    ]

    const supplierOfFilterOptions = [
      { value: '', text: 'All' },
      ...supplierOfOptions,
    ]

    const activeFilters = computed(() => filters.activeCount())

    const onClear = () => {
      filters.reset()
    }

    return {
      t,
      filters,
      typeFilterOptions,
      evaluationStatusOptions,
      activeFilterOptions,
      systemFilterOptions,
      supplierOfFilterOptions,
      activeFilters,
      onClear,
    }
  },
}
</script>

<style scoped lang="scss">
.cs-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 0.75rem;
}

.cs-search {
  flex: 1 1 18rem;
  min-width: 14rem;
}

.cs-select {
  flex: 0 1 14rem;
  min-width: 11rem;
}

// Buttons sit on the input baseline rather than the label baseline.
.cs-action {
  margin-bottom: 1px;
}

.cs-filter-panel {
  min-width: 15rem;
}
</style>
