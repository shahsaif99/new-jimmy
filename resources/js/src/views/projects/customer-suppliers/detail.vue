<template>
  <b-overlay :show="apiHelpers.loading && !record" variant="transparent" rounded="sm" :opacity="0.5">
    <div v-if="record">
      <!-- Header -->
      <b-card class="mb-2">
        <div class="d-flex flex-wrap justify-content-between align-items-start">
          <div class="d-flex align-items-center">
            <b-avatar
              rounded
              size="52"
              :variant="isSupplier ? 'light-primary' : 'light-success'"
              class="mr-1"
            >
              <feather-icon :icon="isSupplier ? 'TruckIcon' : 'HomeIcon'" size="24" />
            </b-avatar>
            <div>
              <div class="d-flex flex-wrap align-items-center" style="gap: 0.75rem">
                <h3 class="mb-0">{{ record.name }}</h3>
                <b-badge
                  v-if="isSupplier"
                  :variant="statusVariant(record.evaluation_status)"
                  class="cs-status-badge"
                >
                  <feather-icon :icon="statusIcon(record.evaluation_status)" size="14" class="mr-50" />
                  {{ record.evaluation_status_label }}
                </b-badge>
                <b-badge v-if="!record.is_active" variant="light-secondary">
                  {{ t('Deactivated') }}
                </b-badge>
              </div>
              <div class="text-muted mt-25">
                {{ record.type_label }}
                <span v-if="record.organization_number">
                  &nbsp;|&nbsp; {{ t('Organization number') }}: {{ record.organization_number }}
                </span>
              </div>
            </div>
          </div>

          <div class="d-flex align-items-center mt-1 mt-md-0">
            <b-button variant="outline-primary" class="mr-1" @click="openEdit">
              <feather-icon icon="EditIcon" size="14" class="mr-50" />
              {{ t('Edit') }}
            </b-button>
            <b-dropdown variant="outline-secondary" no-caret right>
              <template #button-content>
                <feather-icon icon="MoreHorizontalIcon" size="14" class="mr-50" />
                {{ t('More') }}
              </template>
              <b-dropdown-item @click="goBack">
                <feather-icon icon="ListIcon" size="14" class="mr-50" />
                {{ t('Back to overview') }}
              </b-dropdown-item>
              <b-dropdown-item @click="confirmDelete">
                <feather-icon icon="TrashIcon" size="14" class="mr-50" />
                {{ t('Delete') }}
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
      </b-card>

      <b-card no-body class="mb-0">
        <b-tabs v-model="activeTab" card>
          <!-- Information -->
          <b-tab :title="t('Information')">
            <b-alert
              v-if="isSupplier && record.evaluation_status !== 'not_applicable'"
              :variant="bannerVariant"
              show
            >
              <div class="alert-body d-flex flex-wrap align-items-center" style="gap: 1.5rem">
                <span class="d-inline-flex align-items-center">
                  <feather-icon :icon="statusIcon(record.evaluation_status)" size="16" class="mr-50" />
                  {{ t('Status is based on the latest supplier evaluation.') }}
                </span>
                <span v-if="record.latest_evaluation_date">
                  {{ t('Latest evaluation') }}: <strong>{{ formatDate(record.latest_evaluation_date) }}</strong>
                </span>
                <span v-if="record.latest_score !== null">
                  {{ t('Score') }}: <strong>{{ record.latest_score.toFixed(2) }}</strong>
                </span>
                <b-badge
                  v-if="record.latest_evaluation_result"
                  :variant="record.latest_evaluation_result === 'meets_requirements' ? 'light-success' : 'light-danger'"
                >
                  {{ record.latest_evaluation_result === 'meets_requirements'
                    ? t('Meets Requirements') : t('Does Not Meet Requirements') }}
                </b-badge>
                <span v-else>{{ t('No evaluation recorded yet.') }}</span>
              </div>
            </b-alert>

            <b-alert v-else-if="isSupplier" variant="secondary" show>
              <div class="alert-body">
                {{ t('This supplier is not marked for evaluation, so its status is Not applicable.') }}
              </div>
            </b-alert>

            <b-row>
              <b-col md="6" class="mb-2">
                <div class="cs-panel h-100">
                  <h5 class="mb-2">{{ t('Basic information') }}</h5>
                  <dl class="cs-list mb-0">
                    <dt>{{ t('Name') }}</dt>
                    <dd>{{ record.name }}</dd>

                    <dt>{{ t('Type / Role') }}</dt>
                    <dd>{{ record.type_label }}</dd>

                    <dt>{{ t('Organization Number') }}</dt>
                    <dd>{{ record.organization_number || '—' }}</dd>

                    <dt>{{ t('Status') }}</dt>
                    <dd>
                      <span :class="record.is_active ? 'text-success' : 'text-muted'">
                        ● {{ record.is_active ? t('Active') : t('Deactivated') }}
                      </span>
                    </dd>

                    <dt>{{ t('Customer Manager') }}</dt>
                    <dd>{{ record.customer_manager_name || '—' }}</dd>

                    <template v-if="isSupplier && record.should_be_evaluated">
                      <dt>{{ t('Evaluation interval') }}</dt>
                      <dd>
                        {{ record.evaluation_interval_months
                          ? t('Every') + ' ' + record.evaluation_interval_months + ' ' + t('months')
                          : '—' }}
                      </dd>

                      <dt>{{ t('Next evaluation') }}</dt>
                      <dd>
                        <span :class="isOverdue ? 'text-warning font-weight-bold' : ''">
                          {{ record.next_evaluation_date ? formatDate(record.next_evaluation_date) : '—' }}
                        </span>
                        <small v-if="isOverdue" class="text-warning ml-50">({{ t('overdue') }})</small>
                      </dd>
                    </template>
                  </dl>
                </div>
              </b-col>

              <b-col md="6" class="mb-2">
                <div class="cs-panel h-100">
                  <h5 class="mb-2">{{ t('Contact Information') }}</h5>
                  <dl class="cs-list mb-0">
                    <dt>{{ t('Contact Person') }}</dt>
                    <dd>{{ record.contact_person || '—' }}</dd>

                    <dt>{{ t('Email') }}</dt>
                    <dd>
                      <a v-if="record.email" :href="`mailto:${record.email}`">{{ record.email }}</a>
                      <span v-else>—</span>
                    </dd>

                    <dt>{{ t('Phone Number') }}</dt>
                    <dd>{{ record.telephone_number || '—' }}</dd>

                    <dt>{{ t('Address') }}</dt>
                    <dd>
                      <div v-if="record.address || record.postal_code || record.place">
                        <div v-if="record.address">{{ record.address }}</div>
                        <div>{{ [record.postal_code, record.place].filter(Boolean).join(' ') }}</div>
                      </div>
                      <span v-else>—</span>
                    </dd>

                    <template v-if="record.website">
                      <dt>{{ t('Website') }}</dt>
                      <dd><a :href="record.website" target="_blank" rel="noopener">{{ record.website }}</a></dd>
                    </template>
                  </dl>
                </div>
              </b-col>

              <b-col v-if="isSupplier" md="6" class="mb-2">
                <div class="cs-panel h-100">
                  <h5 class="mb-2">{{ t('Classification') }}</h5>
                  <div class="text-muted mb-1">{{ t('Supplier of') }}</div>
                  <div
                    v-for="option in supplierOfOptions"
                    :key="option.value"
                    class="d-flex align-items-center mb-50"
                  >
                    <span class="cs-radio" :class="{ 'cs-radio--on': isSupplierOf(option.value) }"></span>
                    <span :class="isSupplierOf(option.value) ? 'font-weight-bold' : 'text-muted'">
                      {{ option.text }}
                    </span>
                  </div>
                </div>
              </b-col>

              <b-col :md="isSupplier ? 6 : 12" class="mb-2">
                <div class="cs-panel h-100">
                  <h5 class="mb-2">{{ t('Management Systems') }}</h5>
                  <div v-if="record.management_systems.length" class="d-flex flex-wrap" style="gap: 0.5rem">
                    <b-badge
                      v-for="system in record.management_systems"
                      :key="system"
                      variant="light-success"
                      class="cs-system-badge"
                    >
                      <feather-icon icon="CheckCircleIcon" size="14" class="mr-50" />
                      {{ systemLabel(system) }}
                    </b-badge>
                  </div>
                  <p v-else class="text-muted mb-0">{{ t('None recorded') }}</p>
                </div>
              </b-col>

              <!-- Supplier evaluations -->
              <b-col v-if="isSupplier" cols="12">
                <div class="cs-panel">
                  <div class="d-flex flex-wrap justify-content-between align-items-center mb-1">
                    <h5 class="mb-0">{{ t('Supplier Evaluations') }}</h5>
                    <b-button variant="outline-primary" size="sm" @click="openEvaluation()">
                      <feather-icon icon="PlusIcon" size="14" class="mr-50" />
                      {{ t('Add Supplier Evaluation') }}
                    </b-button>
                  </div>

                  <b-table
                    v-if="evaluations.length"
                    :items="evaluations"
                    :fields="evaluationFields"
                    responsive
                    small
                    class="mb-0"
                  >
                    <template #cell(evaluation_date)="data">
                      {{ formatDate(data.item.evaluation_date) }}
                    </template>
                    <template #cell(total_score)="data">
                      {{ data.item.total_score !== null ? data.item.total_score.toFixed(2) : '—' }}
                    </template>
                    <template #cell(status)="data">
                      <b-badge :variant="data.item.status === 'meets_requirements' ? 'light-success' : 'light-danger'">
                        {{ data.item.status_label }}
                      </b-badge>
                    </template>
                    <template #cell(actions)="data">
                      <b-dropdown variant="link" no-caret right>
                        <template #button-content>
                          <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
                        </template>
                        <b-dropdown-item @click="openEvaluation(data.item)">
                          <feather-icon icon="EditIcon" size="14" class="mr-50" />
                          {{ t('Edit') }}
                        </b-dropdown-item>
                        <b-dropdown-item @click="removeEvaluation(data.item)">
                          <feather-icon icon="TrashIcon" size="14" class="mr-50" />
                          {{ t('Delete') }}
                        </b-dropdown-item>
                      </b-dropdown>
                    </template>
                  </b-table>

                  <p v-else class="text-muted mb-0">
                    {{ t('No evaluations added yet. Add a supplier evaluation to get started.') }}
                  </p>
                </div>
              </b-col>
            </b-row>
          </b-tab>

          <!-- Non-Conformances -->
          <b-tab :title="t('Non-Conformances')" lazy>
            <SupplierDeviations :supplier-id="record.id" />
          </b-tab>

          <!-- Documents -->
          <b-tab :title="t('Documents')" lazy>
            <b-table
              v-if="record.documents.length"
              :items="record.documents"
              :fields="documentFields"
              responsive
              small
              class="mb-0"
            >
              <template #cell(file_name)="data">
                <a :href="data.item.file_url" target="_blank" rel="noopener">{{ data.item.file_name }}</a>
              </template>
              <template #cell(file_size)="data">
                {{ formatSize(data.item.file_size) }}
              </template>
              <template #cell(created_at)="data">
                {{ formatDate(data.item.created_at) }}
              </template>
              <template #cell(actions)="data">
                <b-button variant="flat-danger" size="sm" @click="removeDocument(data.item)">
                  <feather-icon icon="TrashIcon" size="14" />
                </b-button>
              </template>
            </b-table>
            <p v-else class="text-muted mb-0">{{ t('No documents uploaded.') }}</p>
          </b-tab>
        </b-tabs>
      </b-card>

    </div>

    <CustomerSupplierForm
      v-if="showEditForm"
      :showing="showEditForm"
      :is-edit="true"
      :record="editRecord"
      @close="showEditForm = false"
      @saved="onRecordSaved"
    />

    <SupplierEvaluationForm
      v-if="showEvaluationForm"
      :showing="showEvaluationForm"
      :supplier-id="evaluationSupplierId"
      @close="showEvaluationForm = false"
      @saved="onEvaluationSaved"
    />
  </b-overlay>
</template>

<script>
import {
  BAlert,
  BAvatar,
  BBadge,
  BButton,
  BCard,
  BCol,
  BDropdown,
  BDropdownItem,
  BOverlay,
  BRow,
  BTab,
  BTable,
  BTabs,
} from 'bootstrap-vue'
import { computed, onMounted, ref } from '@vue/composition-api'
import moment from 'moment'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import router from '@/router'
import useCustomerSupplier from '@/composables/customer-suppliers'
import SupplierDeviations from './SupplierDeviations.vue'
import CustomerSupplierForm from './dialogs/CustomerSupplierForm.vue'
import SupplierEvaluationForm from './dialogs/SupplierEvaluationForm.vue'

export default {
  name: 'CustomerSupplierDetail',
  components: {
    BAlert,
    BAvatar,
    BBadge,
    BButton,
    BCard,
    BCol,
    BDropdown,
    BDropdownItem,
    BOverlay,
    BRow,
    BTab,
    BTable,
    BTabs,
    SupplierDeviations,
    CustomerSupplierForm,
    SupplierEvaluationForm,
  },
  setup(props, { root }) {
    const { t } = useI18nUtils()
    const {
      current: record,
      evaluations,
      apiHelpers,
      evaluationForm,
      supplierOfOptions,
      managementSystems,
      statusVariant,
      statusIcon,
      fetchCustomerSupplier,
      fetchEvaluations,
      deleteEvaluation,
      deleteCustomerSupplier,
      deleteDocument,
    } = useCustomerSupplier()

    const activeTab = ref(0)
    const showEditForm = ref(false)
    const showEvaluationForm = ref(false)

    // Snapshots taken when a dialog opens. Binding the dialogs straight to the
    // shared record would tear them down again the moment it is refreshed.
    const editRecord = ref(null)
    const evaluationSupplierId = ref(null)

    const id = root.$route.params.id

    const isSupplier = computed(
      () => record.value && (record.value.type === 'supplier' || record.value.type === 'both')
    )

    const bannerVariant = computed(
      () =>
        ({
          approved: 'success',
          not_acceptable: 'danger',
          under_evaluation: 'warning',
        }[record.value ? record.value.evaluation_status : ''] || 'secondary')
    )

    const isOverdue = computed(() => {
      if (!record.value || !record.value.next_evaluation_date) return false
      return moment(record.value.next_evaluation_date).isBefore(moment(), 'day')
    })

    const evaluationFields = [
      { key: 'evaluation_date', label: t('Date'), sortable: true },
      { key: 'performed_by_name', label: t('Performed By'), sortable: true },
      { key: 'total_score', label: t('Score'), sortable: true },
      { key: 'status', label: t('Result'), sortable: true },
      { key: 'actions', label: '', thStyle: { width: '60px' } },
    ]

    const documentFields = [
      { key: 'file_name', label: t('File') },
      { key: 'file_size', label: t('Size') },
      { key: 'created_at', label: t('Uploaded') },
      { key: 'actions', label: '', thStyle: { width: '60px' } },
    ]

    const formatDate = (date) => (date ? moment(date).format('L') : '')

    const formatSize = (bytes) => {
      if (!bytes) return ''
      const mb = bytes / (1024 * 1024)
      return mb >= 1 ? `${mb.toFixed(2)} MB` : `${(bytes / 1024).toFixed(0)} KB`
    }

    const systemLabel = (value) =>
      (managementSystems.find((s) => s.value === value) || {}).text || value

    const isSupplierOf = (value) =>
      Array.isArray(record.value.supplier_of) && record.value.supplier_of.includes(value)

    const load = async () => {
      await fetchCustomerSupplier(id)
    }

    const openEdit = () => {
      editRecord.value = record.value
      showEditForm.value = true
    }

    const onRecordSaved = async () => {
      showEditForm.value = false
      await load()
    }

    const openEvaluation = (evaluation = null) => {
      evaluationForm.reset()
      evaluationSupplierId.value = record.value.id
      if (evaluation) {
        evaluationForm.set(evaluation)
      } else {
        evaluationForm.supplier_id = record.value.id
      }
      showEvaluationForm.value = true
    }

    // A new evaluation can change the derived status and next-due date, so the
    // whole record is reloaded rather than just the evaluations table.
    const onEvaluationSaved = async () => {
      showEvaluationForm.value = false
      await load()
    }

    const removeEvaluation = async (evaluation) => {
      // eslint-disable-next-line no-alert
      if (!confirm(t('Delete this evaluation?'))) return
      const ok = await deleteEvaluation(evaluation.id)
      if (ok) await load()
    }

    const removeDocument = async (document) => {
      // eslint-disable-next-line no-alert
      if (!confirm(t('Delete this document?'))) return
      const ok = await deleteDocument(document.id)
      if (ok) await load()
    }

    const goBack = () => {
      router.push({ name: 'customer-supplier' })
    }

    const confirmDelete = async () => {
      // eslint-disable-next-line no-alert
      if (!confirm(t('Delete this record and all of its evaluations and documents?'))) return
      const ok = await deleteCustomerSupplier(record.value.id)
      if (ok) goBack()
    }

    onMounted(load)

    return {
      t,
      record,
      evaluations,
      apiHelpers,
      activeTab,
      isSupplier,
      bannerVariant,
      isOverdue,
      evaluationFields,
      documentFields,
      supplierOfOptions,
      statusVariant,
      statusIcon,
      formatDate,
      formatSize,
      systemLabel,
      isSupplierOf,
      showEditForm,
      showEvaluationForm,
      editRecord,
      evaluationSupplierId,
      openEdit,
      onRecordSaved,
      openEvaluation,
      onEvaluationSaved,
      removeEvaluation,
      removeDocument,
      goBack,
      confirmDelete,
    }
  },
}
</script>

<style scoped lang="scss">
.cs-panel {
  border: 1px solid rgba(34, 41, 47, 0.08);
  border-radius: 0.428rem;
  padding: 1.25rem;
}

.cs-list {
  display: grid;
  grid-template-columns: minmax(9rem, 40%) 1fr;
  row-gap: 0.85rem;
  column-gap: 1rem;
  margin: 0;

  dt {
    font-weight: 400;
    color: #6e6b7b;
  }

  dd {
    margin: 0;
    font-weight: 500;
  }
}

.cs-status-badge {
  font-size: 0.85rem;
  padding: 0.45rem 0.7rem;
}

.cs-system-badge {
  padding: 0.5rem 0.7rem;
  font-size: 0.85rem;
}

// Mirrors the mockup's read-only radio list for the single classification.
.cs-radio {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid #d8d6de;
  margin-right: 0.6rem;
  flex-shrink: 0;
}

.cs-radio--on {
  border-color: #7367f0;
  background: #7367f0;
  box-shadow: inset 0 0 0 2px #fff;
}
</style>
