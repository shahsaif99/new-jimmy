<template>
  <b-modal
    cancel-variant="outline-secondary"
    centered
    :hide-footer="true"
    title="Edit Absence"
    size="lg"
    class="modal-edit-absence-active"
    id="edit-absence-active"
    @close="$emit('update:is-edit-absence-active', false)"
    :visible="isEditAbsenceActive"
    @hide="$emit('update:is-edit-absence-active', false)"
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
          <b-row>
            <b-col
              cols="6"
              md="6"
            >
              <validation-provider
                #default="validationContext"
                name="Absence Name"
                rules="required"
              >
                <b-form-group
                  label="Absence Name"
                  label-for="absencename"
                >
                  <b-form-input
                    v-model="formData.type"
                    placeholder="Absence Name"
                    :state="
                      getValidationState(
                        validationContext
                      )
                    "
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
                name="Start Date"
                rules="required"
              >
                <b-form-group
                  label="Start Date"
                  label-for="startdate"
                >
                  <b-form-input
                    type="date"
                    v-model="formData.start_date"
                    :state="
                      getValidationState(
                        validationContext
                      )
                    "
                  />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider></b-col>
            <b-col
              cols="6"
              md="6"
            >
              <validation-provider
                #default="validationContext"
                name="End Date"
                rules="required"
              >
                <b-form-group
                  label="End Date"
                  label-for="enddate"
                >
                  <b-form-input
                    type="date"
                    v-model="formData.end_date"
                    :state="
                      getValidationState(
                        validationContext
                      )
                    "
                  />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider></b-col>
            <b-col
              cols="6"
              md="6"
            >
              <validation-provider
                #default="validationContext"
                name="Customer"
                rules="required"
              >
                <b-form-group
                  label="Customer"
                  label-for="customer"
                >
                  <b-form-input
                    v-model="formData.customer"
                    placeholder="Customer"
                    :state="
                      getValidationState(
                        validationContext
                      )
                    "
                  />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
          </b-row>
          <div class="mb-2">
            <b-row>
              <b-col>
                <div class="d-flex align-items-center justify-content-end">
                  <b-button
                    variant="primary"
                    class="mt-1"
                    type="submit"
                  >
                    <span class="text-nowrap">Update</span>
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
import useAbsences from '@/composables/absences'
import { required } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {
  components: {
    BCol,
    BRow,
    BForm,
    BFormInput,
    BButton,
    BFormGroup,
    ValidationProvider,
    ValidationObserver,
    BFormInvalidFeedback,
  },
  model: {
    prop: 'isEditAbsenceActive',
    event: 'update:is-edit-absence-active',
  },
  props: {
    isEditAbsenceActive: {
      type: Boolean,
      required: true,
    },
    absence: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const initialState = {
      type: '',
      from_date: '',
      to_date: '',
      days: '',
      comments: '',
    }

    const formData = ref({ })
    const {
      busy,
      respResult,
      updateAbsence,
    } = useAbsences()

    onMounted(() => {
      if (props.absence) {
        formData.value = { ...props.absence }
      }
    })

    const resetForm = () => {

    }

    const onSubmit = async () => {
      await updateAbsence(formData.value)
      if (respResult.value.status === 200) {
        emit('refetch-data')
        emit('update:is-edit-absence-active', false)
      }
    }
    const {
      refFormObserver, getValidationState,
    } = formValidation()

    return {
      busy,
      formData,
      required,
      onSubmit,
      resetForm,
      refFormObserver,
      getValidationState,
    }
  },
}
</script>
  <style lang="scss" scoped>
  .per-page-selector {
      width: 90px;
  }
  </style>

  <style lang="scss">
  @import "~@core/scss/vue/libs/vue-select.scss";
  </style>

