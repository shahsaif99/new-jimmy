<template>
  <b-modal
    :visible="showing"
    :title="isEdit ? t('Edit Customer/Supplier') : t('Add Customer/Supplier')"
    size="xl"
    scrollable
    hide-footer
    @hidden="$emit('close')"
  >
    <b-form @submit.prevent="onSubmit">
      <b-row>
        <!-- Basic information -->
        <b-col md="6" class="mb-2">
          <div class="cs-panel h-100">
            <h5 class="mb-2">{{ t('Basic information') }}</h5>

            <b-form-group :label="t('Name')">
              <b-form-input v-model="form.name" :placeholder="t('Company name')" required />
            </b-form-group>

            <b-form-group :label="t('Type / Role')">
              <b-form-select v-model="form.type" :options="typeOptions" required />
            </b-form-group>

            <b-form-group :label="t('Organization number')">
              <b-form-input v-model="form.organization_number" :placeholder="t('Enter organization number')" />
            </b-form-group>

            <b-form-group :label="t('Status')">
              <b-form-select v-model="form.is_active" :options="activeStatusOptions" />
            </b-form-group>

            <b-form-group :label="t('Customer manager')">
              <InfiniteScrollSelect
                v-model="form.customer_manager_id"
                :select-value="managerName"
                :options="formattedUsers"
                :has-next-page="isNextPageAvailable"
                :loading="busy"
                @onSearch="searchUsers"
                @onPaginate="currentPage++"
              />
            </b-form-group>

            <!-- Evaluation settings only apply to suppliers. -->
            <div v-if="isSupplier" class="cs-evaluate-box">
              <label class="d-block mb-50">
                <strong>{{ t('Shall the supplier be evaluated?') }}</strong>
              </label>
              <b-form-checkbox v-model="form.should_be_evaluated" switch class="mb-1">
                {{ t('Yes, evaluate this supplier') }}
              </b-form-checkbox>

              <template v-if="form.should_be_evaluated">
                <b-form-group :label="t('Evaluation interval')" class="mb-1">
                  <b-form-select
                    v-model="form.evaluation_interval_months"
                    :options="evaluationIntervalOptions"
                  />
                </b-form-group>

                <b-alert variant="primary" show class="mb-0">
                  <div class="alert-body d-flex">
                    <feather-icon icon="InfoIcon" size="15" class="mr-50 mt-25 flex-shrink-0" />
                    <small>{{ t('The next evaluation date will be calculated based on the last evaluation date.') }}</small>
                  </div>
                </b-alert>
              </template>
            </div>
          </div>
        </b-col>

        <!-- Contact information -->
        <b-col md="6" class="mb-2">
          <div class="cs-panel h-100">
            <h5 class="mb-2">{{ t('Contact information') }}</h5>

            <b-form-group :label="t('Contact person')">
              <b-form-input v-model="form.contact_person" :placeholder="t('Enter contact person')" />
            </b-form-group>

            <b-form-group :label="t('Email')">
              <b-form-input v-model="form.email" type="email" :placeholder="t('Enter email')" />
            </b-form-group>

            <b-form-group :label="t('Telephone number')">
              <b-form-input v-model="form.telephone_number" :placeholder="t('Enter telephone number')" />
            </b-form-group>

            <b-form-group :label="t('Address')">
              <b-form-input v-model="form.address" :placeholder="t('Enter address')" />
            </b-form-group>

            <b-row>
              <b-col cols="6">
                <b-form-group :label="t('Postal code')">
                  <b-form-input v-model="form.postal_code" :placeholder="t('Enter postal code')" />
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group :label="t('City')">
                  <b-form-input v-model="form.place" :placeholder="t('Enter city')" />
                </b-form-group>
              </b-col>
            </b-row>
          </div>
        </b-col>

        <!-- Classification -->
        <b-col v-if="isSupplier" md="6" class="mb-2">
          <div class="cs-panel h-100">
            <h5 class="mb-2">{{ t('Classification') }}</h5>
            <b-form-group :label="t('Supplier of')">
              <b-form-radio
                v-for="option in supplierOfOptions"
                :key="option.value"
                v-model="form.supplier_of"
                :value="option.value"
                class="mb-50"
              >
                {{ option.text }}
              </b-form-radio>
            </b-form-group>
          </div>
        </b-col>

        <!-- Management systems -->
        <b-col :md="isSupplier ? 6 : 12" class="mb-2">
          <div class="cs-panel h-100">
            <h5 class="mb-2">{{ t('Management systems') }}</h5>
            <div class="d-flex flex-wrap" style="gap: 0.75rem">
              <b-form-checkbox
                v-for="system in managementSystems"
                :key="system.value"
                v-model="form.management_systems"
                :value="system.value"
                class="cs-system-check"
              >
                {{ system.text }}
              </b-form-checkbox>
            </div>
          </div>
        </b-col>

        <!-- Supplier evaluations -->
        <b-col v-if="isSupplier" cols="12" class="mb-2">
          <div class="cs-panel">
            <div class="d-flex flex-wrap justify-content-between align-items-center mb-1">
              <h5 class="mb-0">{{ t('Supplier Evaluations') }}</h5>
              <b-button
                v-if="isEdit"
                variant="outline-primary"
                size="sm"
                :disabled="!form.should_be_evaluated"
                @click="openEvaluation()"
              >
                <feather-icon icon="PlusIcon" size="14" class="mr-50" />
                {{ t('Add Supplier Evaluation') }}
              </b-button>
            </div>

            <b-alert :variant="form.should_be_evaluated ? 'primary' : 'secondary'" show>
              <div class="alert-body d-flex">
                <feather-icon icon="InfoIcon" size="15" class="mr-50 mt-25 flex-shrink-0" />
                <small v-if="!form.should_be_evaluated">
                  {{ t('This supplier is not set to be evaluated, so its status is Not applicable.') }}
                </small>
                <small v-else-if="!isEdit">
                  {{ t('Save this supplier first, then add evaluations from its detail page.') }}
                </small>
                <small v-else>
                  {{ t('This supplier is set to be evaluated. Add evaluations and set the evaluation interval.') }}
                </small>
              </div>
            </b-alert>

            <b-table
              v-if="isEdit && evaluations.length"
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

            <p v-else-if="isEdit" class="text-muted mb-0">
              {{ t('No evaluations added yet.') }}
            </p>
          </div>
        </b-col>

        <!-- Documents -->
        <b-col cols="12" class="mb-2">
          <div class="cs-panel">
            <h5 class="mb-1">{{ t('Documents') }}</h5>
            <b-form-file
              v-model="files"
              multiple
              :placeholder="t('Choose files or drop them here...')"
              :drop-placeholder="t('Drop files here...')"
            />
          </div>
        </b-col>
      </b-row>

      <div class="d-flex justify-content-end mt-1">
        <b-button variant="outline-secondary" class="mr-1" @click="$emit('close')">
          {{ t('Cancel') }}
        </b-button>
        <b-button type="submit" variant="primary" :disabled="apiHelpers.saving">
          <feather-icon icon="CheckIcon" size="14" class="mr-50" />
          {{ t('Save') }}
        </b-button>
      </div>
    </b-form>

    <SupplierEvaluationForm
      v-if="showEvaluationForm"
      :showing="showEvaluationForm"
      :supplier-id="record ? record.id : null"
      @close="showEvaluationForm = false"
      @saved="onEvaluationSaved"
    />
  </b-modal>
</template>

<script>
import {
  BAlert,
  BBadge,
  BButton,
  BCol,
  BDropdown,
  BDropdownItem,
  BForm,
  BFormCheckbox,
  BFormFile,
  BFormGroup,
  BFormInput,
  BFormRadio,
  BFormSelect,
  BModal,
  BRow,
  BTable,
} from 'bootstrap-vue'
import { computed, onMounted, onUnmounted, ref, watch } from '@vue/composition-api'
import moment from 'moment'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import useCustomerSupplier from '@/composables/customer-suppliers'
import useUsers from '@/composables/users'
import InfiniteScrollSelect from '@/views/components/InfiniteScrollSelect.vue'
import SupplierEvaluationForm from './SupplierEvaluationForm.vue'

export default {
  name: 'CustomerSupplierForm',
  components: {
    BAlert,
    BBadge,
    BButton,
    BCol,
    BDropdown,
    BDropdownItem,
    BForm,
    BFormCheckbox,
    BFormFile,
    BFormGroup,
    BFormInput,
    BFormRadio,
    BFormSelect,
    BModal,
    BRow,
    BTable,
    InfiniteScrollSelect,
    SupplierEvaluationForm,
  },
  props: {
    showing: { type: Boolean, default: false },
    isEdit: { type: Boolean, default: false },
    record: { type: Object, default: null },
  },
  setup(props, { emit }) {
    const { t } = useI18nUtils()
    const {
      form,
      apiHelpers,
      evaluations,
      typeOptions,
      activeStatusOptions,
      evaluationIntervalOptions,
      managementSystems,
      supplierOfOptions,
      addCustomerSupplier,
      updateCustomerSupplier,
      fetchEvaluations,
      deleteEvaluation,
      evaluationForm,
    } = useCustomerSupplier()

    const { fetchUsers, users, searchQuery, currentPage, isNextPageAvailable, busy } = useUsers()

    const files = ref([])
    const tempUsers = ref([])
    const showEvaluationForm = ref(false)

    const isSupplier = computed(() => form.type === 'supplier' || form.type === 'both')
    const managerName = computed(() => (props.record ? props.record.customer_manager_name || '' : ''))

    const evaluationFields = [
      { key: 'evaluation_date', label: t('Date') },
      { key: 'performed_by_name', label: t('Performed by') },
      { key: 'total_score', label: t('Score') },
      { key: 'status', label: t('Result') },
      { key: 'actions', label: '', thStyle: { width: '60px' } },
    ]

    const formatDate = (date) => (date ? moment(date).format('L') : '')

    const searchUsers = (query) => {
      currentPage.value = 1
      searchQuery.value = query
      tempUsers.value = []
      fetchUsers()
    }

    const formattedUsers = computed(() => {
      const map = new Map()
      tempUsers.value.forEach((user) => {
        if (!map.has(user.id)) map.set(user.id, { value: user.id, label: user.name })
      })
      return Array.from(map.values())
    })

    watch(users, (newVal) => {
      tempUsers.value = [...tempUsers.value, ...newVal]
    })

    // Clearing the flag should not silently keep an interval that no longer
    // applies, and setting it needs a sensible default rather than an empty box.
    watch(
      () => form.should_be_evaluated,
      (on) => {
        if (on && !form.evaluation_interval_months) {
          form.evaluation_interval_months = 12
        } else if (!on) {
          form.evaluation_interval_months = null
        }
      }
    )

    const openEvaluation = (evaluation = null) => {
      evaluationForm.reset()
      if (evaluation) {
        evaluationForm.set(evaluation)
      } else {
        evaluationForm.supplier_id = props.record ? props.record.id : null
      }
      showEvaluationForm.value = true
    }

    const onEvaluationSaved = async () => {
      showEvaluationForm.value = false
      if (props.record) await fetchEvaluations(props.record.id)
    }

    const removeEvaluation = async (evaluation) => {
      // eslint-disable-next-line no-alert
      if (!confirm(t('Delete this evaluation?'))) return
      const ok = await deleteEvaluation(evaluation.id)
      if (ok && props.record) await fetchEvaluations(props.record.id)
    }

    const onSubmit = async () => {
      try {
        if (props.isEdit && props.record) {
          await updateCustomerSupplier(props.record.id, files.value)
        } else {
          await addCustomerSupplier(files.value)
        }
        emit('saved')
      } catch (error) {
        // errorHandler already surfaced the reason; keep the form open.
      }
    }

    onMounted(async () => {
      fetchUsers()

      if (props.isEdit && props.record) {
        form.set(props.record)
        // Only the evaluations are missing from a list row, and fetching just
        // those avoids touching the record the detail page is rendering.
        await fetchEvaluations(props.record.id)
      } else {
        form.reset()
        evaluations.value = []
      }
    })

    onUnmounted(() => {
      form.reset()
      files.value = []
    })

    return {
      t,
      form,
      files,
      apiHelpers,
      evaluations,
      evaluationFields,
      typeOptions,
      activeStatusOptions,
      evaluationIntervalOptions,
      managementSystems,
      supplierOfOptions,
      isSupplier,
      managerName,
      formattedUsers,
      isNextPageAvailable,
      busy,
      currentPage,
      searchUsers,
      formatDate,
      showEvaluationForm,
      openEvaluation,
      onEvaluationSaved,
      removeEvaluation,
      onSubmit,
    }
  },
}
</script>

<style lang="scss">
@import "~@core/scss/vue/libs/vue-select.scss";
</style>

<style scoped lang="scss">
.cs-panel {
  border: 1px solid rgba(34, 41, 47, 0.08);
  border-radius: 0.428rem;
  padding: 1.25rem;
}

.cs-evaluate-box {
  border: 1px solid #7367f0;
  border-radius: 0.428rem;
  padding: 1rem;
  margin-top: 0.5rem;
}

.cs-system-check {
  flex: 0 0 auto;
  min-width: 9rem;
}
</style>
