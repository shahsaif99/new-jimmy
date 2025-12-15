<template>
  <b-modal
    cancel-variant="outline-secondary"
    centered
    :hide-footer="true"
    size="lg"
    class="modal-equipment-selection"
    :visible="show"
    :hide-header="true"
    @hide="onModalHide"
  >
    <div style="position: relative">
      <div class="d-flex align-items-center justify-content-between mb-2">
        <h3>{{ t('Select Equipment') }}</h3>
        <i class="bi bi-x ml-2" style="font-size: xx-large; cursor: pointer" @click="closeDialog"></i>
      </div>

      <!-- Search Box -->
      <b-form-input v-model="searchQuery" class="mb-2" :placeholder="t('Search equipment...')" trim />

      <!-- Equipment Table -->
      <div class="equipment-container" style="height: 500px; overflow-y: auto">
        <div v-if="loading" class="d-flex justify-content-center align-items-center" style="height: 100%">
          <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>

        <div
          v-else-if="!filteredEquipments.length"
          class="empty-message d-flex justify-content-center align-items-center"
          style="height: 100%"
        >
          <p style="font-size: 18px">
            {{ t('No equipment found') }}
          </p>
        </div>

        <b-table
          v-else
          :items="filteredEquipments"
          :fields="tableFields"
          responsive
          hover
          striped
          class="mb-0"
          @row-clicked="selectEquipment"
        >
          <template #cell(select)="data">
            <b-form-radio v-model="selectedEquipmentId" :value="data.item.id" name="equipment-selection" />
          </template>

          <template #cell(name)="data">
            {{ data.item.name }}
          </template>

          <template #cell(serial_number)="data">
            {{ data.item.serial_number || 'N/A' }}
          </template>

          <template #cell(category)="data">
            {{ data.item.category ? data.item.category.name : 'N/A' }}
          </template>

          <template #cell(supplier)="data">
            {{ data.item.supplier || 'N/A' }}
          </template>
        </b-table>
      </div>

      <!-- Footer Actions -->
      <div class="d-flex justify-content-end mt-3">
        <b-button variant="outline-secondary" class="mr-2" @click="closeDialog">
          {{ t('Cancel') }}
        </b-button>
        <b-button variant="primary" :disabled="!selectedEquipmentId" @click="confirmSelection">
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
    const equipments = ref([])
    const loading = ref(false)
    const searchQuery = ref('')
    const selectedEquipmentId = ref(props.selectedId)

    const tableFields = [
      { key: 'select', label: '' },
      { key: 'name', label: 'Name', sortable: true },
      { key: 'serial_number', label: 'Serial Number', sortable: true },
      { key: 'category', label: 'Category', sortable: true },
      { key: 'supplier', label: 'Supplier', sortable: true },
    ]

    const filteredEquipments = computed(() => {
      const list = equipments.value ?? []
      const q = searchQuery.value?.trim().toLowerCase()

      const filtered = q
        ? list.filter((e) => {
            const name = e.name ?? ''
            const serialNumber = e.serial_number ?? ''
            const category = e.category?.name ?? ''
            const supplier = e.supplier ?? ''
            return (
              name.toLowerCase().includes(q) ||
              serialNumber.toLowerCase().includes(q) ||
              category.toLowerCase().includes(q) ||
              supplier.toLowerCase().includes(q)
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

    const fetchEquipments = async () => {
      try {
        loading.value = true
        const response = await axios.get(route('equipments.index'))
        equipments.value = response.data.data || response.data
      } catch (error) {
        toast.error('Failed to load equipment')
        console.error(error)
      } finally {
        loading.value = false
      }
    }

    const selectEquipment = (equipment) => {
      selectedEquipmentId.value = equipment.id
    }

    const confirmSelection = () => {
      const selected = equipments.value.find(
        (e) => e.id === selectedEquipmentId.value
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
          fetchEquipments()
          selectedEquipmentId.value = props.selectedId
        }
      }
    )

    watch(
      () => props.selectedId,
      (newVal) => {
        selectedEquipmentId.value = newVal
      }
    )

    onMounted(() => {
      if (props.show) {
        fetchEquipments()
      }
    })

    return {
      t,
      equipments,
      loading,
      searchQuery,
      selectedEquipmentId,
      tableFields,
      filteredEquipments,
      selectEquipment,
      confirmSelection,
      closeDialog,
      onModalHide,
    }
  },
}
</script>

<style lang="scss" scoped>
.equipment-container {
  ::v-deep .table {
    tbody tr {
      cursor: pointer;
    }
  }
}
</style>
