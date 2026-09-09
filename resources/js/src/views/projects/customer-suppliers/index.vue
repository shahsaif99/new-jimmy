<template>
  <div>
    <b-card>
      <QuickOptions @add="openAdd" @export="exportCustomerSuppliers" />

      <b-overlay :show="apiHelpers.loading" variant="transparent" rounded="sm">
        <b-table
          :items="customerSuppliers"
          :fields="tableFields"
          responsive
          hover
          show-empty
          :empty-text="t('No customers or suppliers found')"
          class="mb-0 cs-table"
          tbody-tr-class="cursor-pointer"
          no-local-sorting
          :sort-by.sync="filters.sortBy"
          :sort-desc.sync="filters.sortDesc"
          @row-clicked="openDetail"
        >
          <template #cell(name)="data">
            <span class="font-weight-bold text-body">{{ data.item.name }}</span>
            <b-badge v-if="!data.item.is_active" variant="light-secondary" class="ml-50">
              {{ t('Deactivated') }}
            </b-badge>
          </template>

          <!-- A record typed "both" earns both icons, as in the design. -->
          <template #cell(type)="data">
            <span class="d-inline-flex align-items-center" style="gap: 6px">
              <b-avatar
                v-if="isCustomer(data.item.type)"
                size="28"
                variant="light-success"
                :title="t('Customer')"
              >
                <feather-icon icon="HomeIcon" size="14" />
              </b-avatar>
              <b-avatar
                v-if="isSupplier(data.item.type)"
                size="28"
                variant="light-primary"
                :title="t('Supplier')"
              >
                <feather-icon icon="TruckIcon" size="14" />
              </b-avatar>
            </span>
          </template>

          <template #cell(email)="data">
            <a v-if="data.item.email" :href="`mailto:${data.item.email}`" @click.stop>
              {{ data.item.email }}
            </a>
            <span v-else class="text-muted">—</span>
          </template>

          <template #cell(evaluation_status)="data">
            <span
              v-if="data.item.evaluation_status === 'not_applicable'"
              class="text-muted"
            >
              —<br><small>({{ t('Not applicable') }})</small>
            </span>
            <span v-else class="d-inline-flex align-items-center" :class="statusTextClass(data.item.evaluation_status)">
              <feather-icon :icon="statusIcon(data.item.evaluation_status)" size="15" class="mr-50" />
              {{ data.item.evaluation_status_label }}
            </span>
          </template>

          <template #cell(latest_score)="data">
            <span v-if="data.item.latest_score !== null">{{ data.item.latest_score.toFixed(2) }}</span>
            <span v-else class="text-muted">—</span>
          </template>

          <template #cell(latest_evaluation_date)="data">
            <span v-if="data.item.latest_evaluation_date">
              {{ formatDate(data.item.latest_evaluation_date) }}
            </span>
            <span v-else class="text-muted">—</span>
          </template>

          <template #cell(actions)="data">
            <b-dropdown variant="link" no-caret right @click.native.stop>
              <template #button-content>
                <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
              </template>
              <b-dropdown-item @click="openDetail(data.item)">
                <feather-icon icon="EyeIcon" size="14" class="mr-50" />
                {{ t('View details') }}
              </b-dropdown-item>
              <b-dropdown-item @click="openEdit(data.item)">
                <feather-icon icon="EditIcon" size="14" class="mr-50" />
                {{ t('Edit') }}
              </b-dropdown-item>
              <b-dropdown-item @click="confirmDelete(data.item)">
                <feather-icon icon="TrashIcon" size="14" class="mr-50" />
                {{ t('Delete') }}
              </b-dropdown-item>
            </b-dropdown>
          </template>
        </b-table>
      </b-overlay>

      <div class="d-flex flex-wrap justify-content-between align-items-center mt-1">
        <small class="text-muted">
          {{ t('Showing') }} {{ dataMeta.from }} {{ t('to') }} {{ dataMeta.to }}
          {{ t('of') }} {{ dataMeta.of }} {{ t('entries') }}
        </small>

        <div class="d-flex align-items-center">
          <span class="text-muted mr-50">{{ t('Show') }}</span>
          <b-form-select
            v-model="pagination.per_page"
            :options="perPageOptions"
            size="sm"
            style="width: 5rem"
            @change="onPerPageChange"
          />
          <span class="text-muted ml-50 mr-1">{{ t('entries') }}</span>
          <b-pagination
            v-model="pagination.current_page"
            :total-rows="pagination.total"
            :per-page="pagination.per_page"
            first-number
            last-number
            class="mb-0"
            @change="onPagination"
          />
        </div>
      </div>
    </b-card>

    <CustomerSupplierForm
      v-if="dialog.show.customerSupplier.add || dialog.show.customerSupplier.edit"
      :showing="dialog.show.customerSupplier.add || dialog.show.customerSupplier.edit"
      :is-edit="dialog.show.customerSupplier.edit"
      :record="dialog.temp.customerSupplier.data"
      @close="closeForm"
      @saved="onSaved"
    />
  </div>
</template>

<script>
import {
  BAvatar,
  BBadge,
  BCard,
  BDropdown,
  BDropdownItem,
  BFormSelect,
  BOverlay,
  BPagination,
  BTable,
} from 'bootstrap-vue'
import { computed, onMounted, watch } from '@vue/composition-api'
import moment from 'moment'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import router from '@/router'
import useCustomerSupplier from '@/composables/customer-suppliers'
import QuickOptions from './header/quick-action.vue'
import CustomerSupplierForm from './dialogs/CustomerSupplierForm.vue'

export default {
  name: 'CustomerSupplierOverview',
  components: {
    BAvatar,
    BBadge,
    BCard,
    BDropdown,
    BDropdownItem,
    BFormSelect,
    BOverlay,
    BPagination,
    BTable,
    QuickOptions,
    CustomerSupplierForm,
  },
  setup() {
    const { t } = useI18nUtils()
    const {
      customerSuppliers,
      pagination,
      apiHelpers,
      filters,
      dialog,
      form,
      reset,
      fetchCustomerSuppliers,
      deleteCustomerSupplier,
      exportCustomerSuppliers,
      statusIcon,
    } = useCustomerSupplier()

    const tableFields = [
      { key: 'name', label: t('Name'), sortable: true },
      { key: 'type', label: t('Type / Role'), sortable: true, thClass: 'text-center', tdClass: 'text-center' },
      { key: 'organization_number', label: t('Organization Number'), sortable: true },
      { key: 'contact_person', label: t('Contact Person'), sortable: true },
      { key: 'email', label: t('Email'), sortable: true },
      { key: 'evaluation_status', label: t('Status (Suppliers only)'), sortable: true },
      { key: 'latest_score', label: t('Score (Suppliers only)'), sortable: true, thClass: 'text-right', tdClass: 'text-right' },
      { key: 'latest_evaluation_date', label: t('Evaluation'), sortable: true },
      { key: 'actions', label: '', sortable: false, thStyle: { width: '60px' }, tdClass: 'text-center' },
    ]

    const perPageOptions = [10, 25, 50, 100]

    const isCustomer = (type) => type === 'customer' || type === 'both'
    const isSupplier = (type) => type === 'supplier' || type === 'both'

    const statusTextClass = (status) =>
      ({
        approved: 'text-success',
        not_acceptable: 'text-danger',
        under_evaluation: 'text-warning',
      }[status] || 'text-muted')

    const formatDate = (date) => (date ? moment(date).format('ll') : '')

    const dataMeta = computed(() => {
      const from = pagination.total === 0 ? 0 : (pagination.current_page - 1) * pagination.per_page + 1
      const to = Math.min(pagination.total, pagination.current_page * pagination.per_page)
      return { from, to, of: pagination.total }
    })

    const onPagination = (page) => {
      pagination.current_page = page
      fetchCustomerSuppliers()
    }

    // A smaller page count can leave the current page beyond the end.
    const onPerPageChange = (size) => {
      pagination.per_page = size
      pagination.current_page = 1
      fetchCustomerSuppliers()
    }

    const openDetail = (item) => {
      router.push({ name: 'customer-supplier-detail', params: { id: item.id } })
    }

    const openAdd = () => {
      form.reset()
      dialog.temp.customerSupplier.data = null
      dialog.temp.customerSupplier.id = null
      dialog.show.customerSupplier.add = true
    }

    const openEdit = (item) => {
      dialog.temp.customerSupplier.data = item
      dialog.temp.customerSupplier.id = item.id
      dialog.show.customerSupplier.edit = true
    }

    const closeForm = () => {
      dialog.closeDialog('customerSupplier', 'add')
      dialog.closeDialog('customerSupplier', 'edit')
    }

    const onSaved = () => {
      closeForm()
      fetchCustomerSuppliers()
    }

    const confirmDelete = async (item) => {
      // eslint-disable-next-line no-alert
      if (!confirm(t('Delete this record and all of its evaluations and documents?'))) return
      const ok = await deleteCustomerSupplier(item.id)
      if (ok) fetchCustomerSuppliers()
    }

    onMounted(() => {
      reset()
      fetchCustomerSuppliers()
    })

    // Any filter or sort change restarts at page one; staying on page 5 of a
    // narrower result set would show an empty table.
    watch(
      () => ({
        search: filters.search,
        type: filters.type,
        evaluation_status: filters.evaluation_status,
        is_active: filters.is_active,
        system: filters.system,
        supplier_of: filters.supplier_of,
        sortBy: filters.sortBy,
        sortDesc: filters.sortDesc,
      }),
      () => {
        pagination.current_page = 1
        fetchCustomerSuppliers()
      },
      { deep: true }
    )

    return {
      t,
      customerSuppliers,
      tableFields,
      perPageOptions,
      pagination,
      apiHelpers,
      filters,
      dialog,
      dataMeta,
      isCustomer,
      isSupplier,
      statusIcon,
      statusTextClass,
      formatDate,
      onPagination,
      onPerPageChange,
      openDetail,
      openAdd,
      openEdit,
      closeForm,
      onSaved,
      confirmDelete,
      exportCustomerSuppliers,
    }
  },
}
</script>

<style scoped lang="scss">
.cs-table ::v-deep td {
  vertical-align: middle;
}
</style>
