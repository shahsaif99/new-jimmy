<template>
  <div>
    <validation-observer
      #default="{ handleSubmit }"
      ref="refFormObserver"
    >
      <b-overlay
        :show="busy"
        spinner-variant="primary"
        spinner-type="grow"
        rounded="sm"
        opacity="0.20"
      >
        <b-form
          @submit.prevent="handleSubmit(onSubmit)"
          @reset.prevent="resetForm"
        >
          <b-card>
            <b-row>
              <b-col
                cols="12"
                md="3"
              >
                <validation-provider
                  #default="validationContext"
                  name="Salary Type"
                  rules="required"
                >
                  <b-form-group
                    label="Salary Type"
                  >
                    <b-form-input
                      id="salary_type"
                      v-model="formData.salary_type"
                      :state="getValidationState(validationContext)"
                      trim
                      placeholder="Salary Type"
                    />

                    <b-form-invalid-feedback>
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </b-col>
              <b-col
                cols="12"
                md="3"
              >
                <validation-provider
                  #default="validationContext"
                  name="Holidays"
                  rules="required"
                >
                  <b-form-group
                    label="Holidays"
                  >
                    <b-form-input
                      id="salary_type"
                      v-model="formData.holidays"
                      :state="getValidationState(validationContext)"
                      trim
                      type="number"
                      placeholder="Holidays"
                    />

                    <b-form-invalid-feedback>
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </b-col>
              <!-- <b-col
                cols="12"
                md="3"
              >
                <validation-provider
                  #default="validationContext"
                  name="Salary Type"
                  rules="required"
                >
                  <b-form-group
                    label="Salary Type"
                  >
                    <b-form-input
                      id="salary_type"
                      v-model="formData.salary_type"
                      :state="getValidationState(validationContext)"
                      trim
                      placeholder="Salary Type"
                    />

                    <b-form-invalid-feedback>
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </b-col> -->
            </b-row>
            <div class="d-flex mt-2 justify-content-end">
              <b-button
                variant="primary"
                class="ml-2"
                type="submit"
              >
                Update User
              </b-button>
            </div>
          </b-card>
        </b-form>
      </b-overlay>
    </validation-observer>
  </div>

</template>

<script>
import {
  BRow,
  BCol,
  BForm,
  BCard,
  BButton,
  BOverlay,
  BFormGroup,
  BFormInput,
  BFormInvalidFeedback,
} from 'bootstrap-vue'
import {
  toRef,
} from '@vue/composition-api'
// import vSelect from 'vue-select'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import formValidation from '@core/comp-functions/forms/form-validation'
import {
  required,
} from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import useUsers from '@/composables/users'

export default {
  components: {
    BRow,
    BCard,
    BCol,
    BForm,
    BButton,
    BOverlay,
    BFormGroup,
    BFormInput,
    ValidationProvider,
    ValidationObserver,
    BFormInvalidFeedback,
  },
  mixins: [togglePasswordVisibility],
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const statusOptions = [
      { label: 'Active', value: true },
      { label: 'Inactive', value: false },
    ]

    const formData = toRef(props, 'userData')
    const {
      busy,
      updateUser,
    } = useUsers()


    const resetformData = () => {
      //   formData.value = JSON.parse(JSON.stringify(blankFormData))
    }

    const onSubmit = async () => {
      await updateUser(formData.value)
    }
    const { refFormObserver, getValidationState, resetForm } = formValidation(resetformData)

    return {
      busy,
      required,
      formData,
      onSubmit,
      resetForm,
      statusOptions,
      refFormObserver,
      getValidationState,
    }
  },
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>

