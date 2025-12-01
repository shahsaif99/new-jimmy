<template>
  <b-modal
    cancel-variant="outline-secondary"
    centered
    :hide-footer="true"
    size="lg"
    class="modal-supplier-selection"
    :visible="show"
    :hide-header="true"
    @hide="onModalHide"
  >
    <div style="position: relative">
      <div class="d-flex align-items-center justify-content-between mb-2">
        <h3>{{ t('Select Supplier') }}</h3>
        <i class="bi bi-x ml-2" style="font-size: xx-large; cursor: pointer" @click="closeDialog"></i>
      </div>

      <!-- Search Box -->
      <b-form-input v-model="searchQuery" class="mb-2" :placeholder="t('Search suppliers...')" trim />

      <!-- Suppliers Table -->
      <div class="supplier-container" style="height: 500px; overflow-y: auto">
        <div v-if="loading" class="d-flex justify-content-center align-items-center" style="height: 100%">
          <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>

        <div
          v-else-if="!filteredSuppliers.length"
          class="empty-message d-flex justify-content-center align-items-center"
          style="height: 100%"
        >
          <p style="font-size: 18px">
            {{ t('No suppliers found') }}
          </p>
        </div>

        <b-table
          v-else
          :items="filteredSuppliers"
          :fields="tableFields"
          responsive
          hover
          striped
          class="mb-0"
          @row-clicked="selectSupplier"
        >
          <template #cell(select)="data">
            <b-form-radio v-model="selectedSupplierId" :value="data.item.id" name="supplier-selection" />
          </template>

          <template #cell(name)="data">
            {{ data.item.name }}
          </template>

          <template #cell(contact_person)="data">
            {{ data.item.contact_person || 'N/A' }}
          </template>

          <template #cell(email)="data">
            {{ data.item.email || 'N/A' }}
          </template>

          <template #cell(telephone_number)="data">
            {{ data.item.telephone_number || 'N/A' }}
          </template>
        </b-table>
      </div>

      <!-- Footer Actions -->
      <div class="d-flex justify-content-end mt-3">
        <b-button variant="outline-secondary" class="mr-2" @click="closeDialog">
          {{ t('Cancel') }}
        </b-button>
        <b-button variant="primary" :disabled="!selectedSupplierId" @click="confirmSelection">
          {{ t('Select') }}
        </b-button>
      </div>
    </div>
  </b-modal>
</template>

<script>
import {
  BModal,
  BButton,
  BFormInput,
  BFormRadio,
  BTable,
} from 'bootstrap-vue'
import { ref, computed, watch, onMounted } from '@vue/composition-api'
import axios from '@axios'
import route from 'ziggy-js'
import toaster from '@/composables/toaster'
import { useUtils as useI18nUtils } from '@core/libs/i18n'

export default {
  components: {
    BModal,
    BButton,
    BFormInput,
    BFormRadio,
    BTable,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    selectedId: {
      type: Number,
      default: null,
    },
  },
  setup(props, { emit }) {
    const toast = toaster()
    const { t } = useI18nUtils()
    const suppliers = ref([])
    const loading = ref(false)
    const searchQuery = ref('')
    const selectedSupplierId = ref(props.selectedId)

    const tableFields = [
      { key: 'select', label: '' },
      { key: 'name', label: 'Name', sortable: true },
      { key: 'contact_person', label: 'Contact Person', sortable: true },
      { key: 'email', label: 'Email', sortable: true },
      { key: 'telephone_number', label: 'Phone', sortable: true },
    ]

    const filteredSuppliers = computed(() => {
      const list = suppliers.value ?? []
      const q = searchQuery.value?.trim().toLowerCase()

      const filtered = q
        ? list.filter((s) => {
            const name = s.name ?? ''
            const contact = s.contact_person ?? ''
            const email = s.email ?? ''
            return (
              name.toLowerCase().includes(q) ||
              contact.toLowerCase().includes(q) ||
              email.toLowerCase().includes(q)
            )
          })
        : [...list]

      return filtered.sort((a, b) =>
        (a.name ?? '').localeCompare((b.name ?? ''), undefined, {
          sensitivity: 'base',
          numeric: true,
        })
      )
    })

    const fetchSuppliers = async () => {
      try {
        loading.value = true
        const response = await axios.get(route('customers-suppliers.index'), {
          params: {
            type: 'supplier',
          },
        })
        suppliers.value = response.data.customerSuppliers || response.data.data || response.data
      } catch (error) {
        toast.error('Failed to load suppliers')
        console.error(error)
      } finally {
        loading.value = false
      }
    }

    const selectSupplier = (supplier) => {
      selectedSupplierId.value = supplier.id
    }

    const confirmSelection = () => {
      const selected = suppliers.value.find(
        (s) => s.id === selectedSupplierId.value
      )
      if (selected) {
        emit('select', selected)
      }
    }

    const closeDialog = () => {
      emit('close')
    }

    const onModalHide = () => {
      emit('close')
    }

    watch(
      () => props.show,
      (newVal) => {
        if (newVal) {
          fetchSuppliers()
          selectedSupplierId.value = props.selectedId
        }
      }
    )

    watch(
      () => props.selectedId,
      (newVal) => {
        selectedSupplierId.value = newVal
      }
    )

    onMounted(() => {
      if (props.show) {
        fetchSuppliers()
      }
    })

    return {
      t,
      suppliers,
      loading,
      searchQuery,
      selectedSupplierId,
      tableFields,
      filteredSuppliers,
      selectSupplier,
      confirmSelection,
      closeDialog,
      onModalHide,
    }
  },
}
</script>

<style lang="scss" scoped>
.supplier-container {
  ::v-deep .table {
    tbody tr {
      cursor: pointer;
    }
  }
}
</style>
