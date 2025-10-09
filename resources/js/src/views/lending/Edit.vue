<template>
  <b-modal
    cancel-variant="outline-secondary"
    centered
    :hide-footer="true"
    :title="t('Edit Lending History')"
    size="lg"
    class="modal-is-edit-lending-active"
    id="is-edit-lending-active"
    @close="$emit('update:is-edit-lending-active', false)"
    :visible="isEditLendingActive"
    @hide="$emit('update:is-edit-lending-active', false)"
  >
    <div>
      <validation-observer
        ref="refFormObserver"
        #default="{ handleSubmit }"
      >
        <b-form
          @submit.prevent="handleSubmit(onSubmit)"
          @reset.prevent="resetForm"
        >
          <div>
            <b-row>
              <b-col
                cols="6"
                md="6"
              >
                <validation-provider
                  #default="validationContext"
                  :name="t('Lending Date')"
                  rules="required"
                >
                  <b-form-group
                    :label="t('Lending Date')"
                    label-for="lending_date"
                  >
                    <b-form-input
                      type="date"
                      v-model="formData.lending_date"
                      :placeholder="t('Lending Date')"
                      :state="getValidationState(validationContext)"
                    />
                    <b-form-invalid-feedback>
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </b-col>
              <b-col
                cols="6"
                md="6"
              >
                <validation-provider
                  #default="validationContext"
                  :name="t('Returned Date')"
                  rules="required"
                >
                  <b-form-group
                    :label="t('Returned Date')"
                    label-for="returned_date"
                  >
                    <b-form-input
                      type="date"
                      v-model="formData.returned_date"
                      :placeholder="t('Returned Date')"
                      :state="getValidationState(validationContext)"
                    />
                    <b-form-invalid-feedback>
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </b-col>

              <b-col
                cols="6"
                md="6"
              >
                <validation-provider
                  #default="validationContext"
                  :name="t('Loaned to')"
                  rules="required"
                >
                  <b-form-group
                    :label="t('Loaned to')"
                    label-for="loaned_to"
                  >
                    <b-form-input
                      v-model="formData.loaned_to"
                      :placeholder="t('Loaned to')"
                      :state="getValidationState(validationContext)"
                    />
                    <b-form-invalid-feedback>
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </b-col>
              <b-col sm="6">
                <ValidationProvider
                  #default="validationContext"
                  :name="t('Equipment')"
                  rules="required"
                >
                  <b-form-group
                    :label="t('Select Equipment')"
                    label-for="equipment"
                    :state="getValidationState(validationContext)"
                  >
                    <v-select
                      v-model="formData.equipment"
                      class="w-full"
                      :placeholder="t('Type here to search equipments')"
                      :options="equipments"
                      :close-on-select="true"
                      :select-on-tab="true"
                      :clearable="true"
                      input-id="equipment"
                      :filterable="false"
                      label="name"
                      @search="onSearch"
                      :state="getValidationState(validationContext)"
                    >
                      <template slot="no-options">
                        {{ t('type to search equipments..') }}
                      </template>
                      <template
                        slot="option"
                        slot-scope="option"
                      >
                        {{ option.name }} - {{ option.serial_number }}
                      </template>
                      <template
                        slot="selected-option"
                        slot-scope="option"
                      >
                        {{ option.name }} - {{ option.serial_number }}
                      </template>
                    </v-select>
                    <b-form-invalid-feedback :state="getValidationState(validationContext)">
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </ValidationProvider>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="d-flex align-items-center justify-content-end">
                  <b-button
                    variant="primary"
                    class="px-5 mt-2"
                    type="submit"
                  >
                    <span class="text-nowrap">{{ t('Update') }}</span>
                  </b-button>
                </div>
              </b-col>
            </b-row>
          </div>
        </b-form>
      </validation-observer>
    </div>
  </b-modal>
</template>

<script>
import {
  BRow,
  BCol,
  BForm,
  BFormInput,
  BButton,
  BFormGroup,
  BFormInvalidFeedback,
} from 'bootstrap-vue'
import { ref, onMounted } from '@vue/composition-api'
import useEquipments from '@/composables/equipments'
import useLendings from '@/composables/lendings'
import { required } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import debounce from 'lodash/debounce'
import vSelect from 'vue-select'
import { useUtils as useI18nUtils } from '@core/libs/i18n'

export default {
  components: {
    BCol,
    BRow,
    BForm,
    BButton,
    vSelect,
    BFormGroup,
    BFormInput,
    ValidationProvider,
    ValidationObserver,
    BFormInvalidFeedback,
  },
  model: {
    prop: 'isEditLendingActive',
    event: 'update:is-edit-lending-active',
  },
  props: {
    isEditLendingActive: {
      type: Boolean,
      required: true,
    },
    lending: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const formData = ref({ })
    const {
      refFormObserver, getValidationState, resetForm,
    } = formValidation()

    const { t } = useI18nUtils()


    const { updateLending, respResult } = useLendings()

    const { fetchEquipmentsList, equipments } = useEquipments()

    onMounted(() => {
      if (props.lending) {
        formData.value = { ...props.lending }
      }
    })


    const fetchAsynEquipments = debounce(async (loading, name) => {
      if (!name.length) {
        equipments.value = []
        return
      }
      fetchEquipmentsList(name)
      loading(false)
    }, 350)

    const onSearch = (name, loading) => {
      if (!name.length) {
        equipments.value = []
        return
      }
      loading(true)
      fetchAsynEquipments(loading, name, this)
    }


    const onSubmit = async () => {
      const formNewData = new FormData()
      formNewData.append('lending_date', formData.value.lending_date)
      formNewData.append('returned_date', formData.value.returned_date)
      formNewData.append('loaned_to', formData.value.loaned_to)
      formNewData.append('equipment_id', formData.value.equipment.id)
      formNewData.append('_method', 'put')
      await updateLending(formNewData, formData.value.id)
      if (respResult.value.status === 200) {
        emit('refetch-data')
        emit('update:is-edit-lending-active', false)
      }
    }
    return {
      t,
      formData,
      required,
      onSubmit,
      resetForm,
      onSearch,
      equipments,
      refFormObserver,
      getValidationState,
      fetchAsynEquipments,
    }
  },
}
</script>
  <style lang="scss">
    @import '@core/scss/vue/libs/vue-select.scss';
  </style>

