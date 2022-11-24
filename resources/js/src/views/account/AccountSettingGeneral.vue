<template>
  <b-card>
    <!-- BODY -->
    <template>
      <b-tabs
        content-class="pt-1"
        fill
      >
        <b-tab>
          <template #title>
            <feather-icon icon="UserIcon" />
            <span>Details</span>
          </template>
          <b-overlay
            id="overlay-background"
            :show="busy"
            variant="transparent"
            rounded="sm"
          >
            <validation-observer
              #default="{ handleSubmit }"
              ref="refFormObserver"
            >
              <b-form
                v-if="userData"
                class="mt-2"
                @submit.prevent="handleSubmit(onSubmit)"
                @reset.prevent="resetForm"
              >
                <b-row>
                  <b-col sm="4">
                    <b-form-group
                      label="Name"
                      label-for="name"
                    >
                      <validation-provider
                        #default="validationContext"
                        name="username"
                        rules="required"
                      >
                        <b-form-input
                          id="name"
                          v-model="userData.name"
                          :state="getValidationState(validationContext)"
                          placeholder="Enter Name"
                        />
                        <b-form-invalid-feedback>
                          {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                  <b-col sm="4">
                    <b-form-group
                      label="Employee Number"
                      label-for="employeeNumber"
                    >
                      <validation-provider
                        #default="validationContext"
                        name="employee number"
                        rules="required"
                      >
                        <b-form-input
                          id="employeeNumber"
                          v-model="userData.employee_number"
                          type="text"
                          :state="getValidationState(validationContext)"
                          placeholder="Enter employee number"
                        />
                        <b-form-invalid-feedback>
                          {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                  <b-col sm="4">
                    <b-form-group
                      label="Address"
                      label-for="address"
                    >
                      <validation-provider
                        #default="validationContext"
                        name="Address"
                        vid="Address"
                        rules="required"
                      >
                        <b-form-input
                          id="address"
                          v-model="address"
                          type="text"
                          :state="getValidationState(validationContext)"
                          placeholder="Enter Address"
                        />
                        <b-form-invalid-feedback>
                          {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                  <b-col sm="4">
                    <b-form-group
                      label="Post Address"
                      label-for="postaddress"
                    >
                      <validation-provider
                        #default="validationContext"
                        name="Post Address"
                        rules="required"
                      >
                        <b-form-input
                          id="postaddress"
                          v-model="userData.post_address"
                          type="text"
                          :state="getValidationState(validationContext)"
                          placeholder="Enter Post Address"
                        />
                        <b-form-invalid-feedback>
                          {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                  <b-col sm="4">
                    <b-form-group
                      label="Post code"
                      label-for="postcode"
                    >
                      <validation-provider
                        #default="validationContext"
                        name="post code"
                        rules="required"
                      >
                        <b-form-input
                          id="postCode"
                          v-model="post_code"
                          type="number"
                          :state="getValidationState(validationContext)"
                          placeholder="Enter post code"
                        />
                        <b-form-invalid-feedback>
                          {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                  <b-col sm="4">
                    <b-form-group
                      label="Date of birth"
                      label-for="dob"
                    >
                      <validation-provider
                        #default="validationContext"
                        name="Date of birth"
                        rules="required"
                      >
                        <b-form-datepicker
                          id="dateOfBirth"
                          v-model="userData.date_of_birth"
                          placeholder="Enter Date of Birth"
                          :state="getValidationState(validationContext)"
                        />
                        <b-form-invalid-feedback>
                          {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                  <b-col sm="4">
                    <b-form-group
                      label="Sex"
                      label-for="sex"
                    >
                      <validation-provider
                        #default="validationContext"
                        name="gender"
                        rules="required"
                      >
                        <v-select
                          id="gender"
                          v-model="gender"
                          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                          :options="options"
                          :selectable="option => ! option.value.includes('select_value')"
                          label="text"
                          :state="getValidationState(validationContext)"
                        />
                        <b-form-invalid-feedback>
                          {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                  <b-col sm="4">
                    <b-form-group
                      label="Phone Number"
                      label-for="phonenumber"
                    >
                      <validation-provider
                        #default="validationContext"
                        name="phone"
                        rules="required"
                      >
                        <b-form-input
                          id="postcode"
                          v-model="userData.phone_number"
                          type="number"
                          :state="getValidationState(validationContext)"
                          placeholder="Enter Phone Number"
                        />
                        <b-form-invalid-feedback>
                          {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                  <b-col sm="4">
                    <b-form-group
                      label="Citizen Country"
                      label-for="citizencountry"
                    >
                      <validation-provider
                        #default="validationContext"
                        name="citizen country"
                        rules="required"
                      >
                        <b-form-input
                          id="postcode"
                          v-model="userData.citizen_country"
                          type="text"
                          :state="getValidationState(validationContext)"
                          placeholder="Enter Citizen Country"
                        />
                        <b-form-invalid-feedback>
                          {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                  <b-col sm="4">
                    <validation-provider
                      #default="validationContext"
                      name="Email"
                      rules="required|email"
                    >
                      <b-form-group
                        label="Email"
                        label-for="email"
                      >
                        <b-form-input
                          id="email"
                          v-model="userData.email"
                          :state="getValidationState(validationContext)"
                          trim
                          disabled
                        />

                        <b-form-invalid-feedback>
                          {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col sm="4">
                    <validation-provider
                      #default="validationContext"
                      name="Username"
                      rules="required"
                    >
                      <b-form-group
                        label="Username"
                        label-for="Username"
                      >
                        <b-form-input
                          id="username"
                          v-model="userData.username"
                          :state="getValidationState(validationContext)"
                          placeholder="Enter username"
                          trim
                          disabled
                        />

                        <b-form-invalid-feedback>
                          {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col cols="12">
                    <b-button
                      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                      variant="primary"
                      class="mt-2 mr-1"
                      type="submit"
                    >
                      Save changes
                    </b-button>
                    <b-button
                      v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                      variant="outline-secondary"
                      type="reset"
                      class="mt-2"
                      @click.prevent="resetForm"
                    >
                      Reset
                    </b-button>
                  </b-col>
                </b-row>
              </b-form>
            </validation-observer>
          </b-overlay>
        </b-tab>
      </b-tabs>
    </template>
  </b-card>
</template>

<script>
import {
  BOverlay, BFormInvalidFeedback, BButton, BForm, BFormGroup, BFormInput, BRow, BCol, BCard,
  BTabs, BTab, BFormDatepicker,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { ref, watchEffect } from '@vue/composition-api'
import useAccount from '@/composables/account'
import { required, alphaNum, email } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { avatarText } from '@core/utils/filter'
import vSelect from 'vue-select'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BForm,
    BOverlay,
    BButton,
    BFormGroup,
    BFormInput,
    ValidationProvider,
    ValidationObserver,
    BFormInvalidFeedback,
    BTabs,
    BTab,
    BFormDatepicker,
    vSelect,
  },
  directives: {
    Ripple,
  },
  props: {
    accountData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      required,
      alphaNum,
      email,
      formData: {},
      profileFile: null,
    }
  },
  setup(props) {
    const refInputEl = ref(null)
    const previewEl = ref(null)
    const userData = ref({})

    watchEffect(() => {
      userData.value = props.accountData
    })

    const removeImage = () => {
      userData.value.avatar = ''
    }
    const {
      updateGeneral,
      busy,
    } = useAccount()
    const { inputImageRenderer } = useInputImageRenderer(refInputEl, base64 => {
      userData.value.avatar_url = base64
      userData.value.avatar_new = base64
    })
    const {
      refFormObserver, getValidationState, resetForm,
    } = formValidation()

    const onSubmit = async () => {
      await updateGeneral(userData.value)
    }

    return {
      busy,
      userData,
      onSubmit,
      previewEl,
      resetForm,
      avatarText,
      refInputEl,
      removeImage,
      refFormObserver,
      inputImageRenderer,
      getValidationState,
      options: [
        { value: 'male', text: 'Male' },
        { value: 'female', text: 'Female' },
      ],
    }
  },
}
</script>
