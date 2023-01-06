<template>
  <b-modal
    cancel-variant="outline-secondary"
    centered
    :hide-footer="true"
    title="Add Lending History"
    size="lg"
    class="modal-is-add-lending-active"
    id="is-add-lending-active"
    @close="$emit('update:is-add-lending-active', false)"
    :visible="isAddLendingActive"
    @hide="$emit('update:is-add-lending-active', false)"
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
                  name="Lending Date"
                  rules="required"
                >
                  <b-form-group
                    label="Lending Date"
                    label-for="lending_date"
                  >
                    <b-form-input
                      type="date"
                      v-model="formData.lending_date"
                      placeholder="Lending Date"
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
                  name="Returned Date"
                  rules="required"
                >
                  <b-form-group
                    label="Returned Date"
                    label-for="returned_date"
                  >
                    <b-form-input
                      type="date"
                      v-model="formData.returned_date"
                      placeholder="Returned Date"
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
                  name="Loaned to"
                  rules="required"
                >
                  <b-form-group
                    label="Loaned To"
                    label-for="loaned_to"
                  >
                    <b-form-input
                      v-model="formData.loaned_to"
                      placeholder="Loaned To"
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
                  name="Equipment"
                  rules="required"
                >
                  <b-form-group
                    label="Select Equipment"
                    label-for="equipment"
                    :state="getValidationState(validationContext)"
                  >
                    <v-select
                      v-model="formData.equipment"
                      class="w-full"
                      placeholder="Type here to search equipments"
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
                        type to search equipments..
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
              <!-- <b-col
                cols="6"
                md="6"
              >
                <validation-provider
                  #default="validationContext"
                  name="Registered by"
                  rules="required"
                >
                  <b-form-group
                    label="Registered By"
                    label-for="registeredby"
                  >
                    <b-form-input
                      v-model="formData.rgisteredBy"
                      placeholder="Registered By"
                      :state="getValidationState(validationContext)"
                    />
                    <b-form-invalid-feedback>
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </b-col> -->
            </b-row>
            <b-row>
              <b-col>
                <div class="d-flex align-items-center justify-content-end">
                  <b-button
                    variant="primary"
                    class="px-5 mt-2"
                    type="submit"
                  >
                    <span class="text-nowrap">Add</span>
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
    prop: 'isAddLendingActive',
    event: 'update:is-add-lending-active',
  },
  props: {
    isAddLendingActive: {
      type: Boolean,
      required: true,
    },
    equipment: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { emit }) {
    const initialState = {
      lending_date: '',
      returned_date: '',
      loaned_to: '',
      equipment: '',
    }
    const formData = ref({ ...initialState })


    const {
      refFormObserver, getValidationState, resetForm,
    } = formValidation()

    const { storeLending, respResult } = useLendings()

    const { fetchEquipmentsList, equipments } = useEquipments()

    onMounted(() => {
      if (props.equipment) {
        formData.value.equipment = props.equipment
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
      //   await updateGeneral(formData.value)
      await storeLending(formNewData)
      if (respResult.value.status === 200) {
        emit('refetch-data')
        emit('update:is-add-lending-active', false)
      }
    }
    return {
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
