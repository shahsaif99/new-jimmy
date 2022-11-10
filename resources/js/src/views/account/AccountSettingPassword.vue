<template>
  <b-card>
    <!-- form -->
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

        <!-- User Info: Input Fields -->
        <b-form
          @submit.prevent="handleSubmit(onSubmit)"
          @reset.prevent="resetForm"
        >
          <b-row>
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="Current Password"
                rules="required"
                vid="current_password"
              >
                <b-form-group
                  label="Current Password"
                  :state="getValidationState(validationContext)"
                >
                  <b-input-group
                    class="input-group-merge"
                  >
                    <b-form-input
                      id="current-password"
                      v-model="userData.current_password"
                      :state="getValidationState(validationContext)"
                      :type="passwordFieldType"
                      name="password"
                      placeholder="Current Password"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>

                </b-form-group>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </validation-provider>
            </b-col>
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="Password"
                rules="min:6|required"
                vid="password"
              >
                <b-form-group
                  label="New Password"
                  :state="getValidationState(validationContext)"
                >
                  <b-input-group
                    class="input-group-merge"
                  >
                    <b-form-input
                      id="new-password"
                      v-model="userData.password"
                      :state="getValidationState(validationContext)"
                      :type="passwordFieldType"
                      name="password"
                      placeholder="New Password"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        icon="RefreshCcwIcon"
                        @click="generatePassword"
                      />
                    </b-input-group-append>
                  </b-input-group>

                </b-form-group>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
                <small>Password must be min 6 characters long and must contain letters, numbers</small>
              </validation-provider>
            </b-col>
            <!-- new password -->
            <b-col
              cols="12"
              md="4"
            >
              <validation-provider
                #default="validationContext"
                name="Confirm Password"
                rules="confirmed:password|min:6|required"
                vid="password_confirmation"
              >
                <b-form-group
                  label="Confirm Password"
                  :state="getValidationState(validationContext)"
                >
                  <b-input-group
                    class="input-group-merge"
                  >
                    <b-form-input
                      class="form-control-merge"
                      v-model="userData.password_confirmation"
                      :state="getValidationState(validationContext)"
                      :type="passwordFieldType"
                      placeholder="Confirm Password"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>

                </b-form-group>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </validation-provider>
            </b-col>
            <!--/ new password -->

            <!-- buttons -->
            <b-col cols="12">
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                class="mt-1 mr-1"
                type="submit"
              >
                Update
              </b-button>
              <b-button
                v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                type="reset"
                variant="outline-secondary"
                class="mt-1"
              >
                Reset
              </b-button>
            </b-col>
            <!--/ buttons -->
          </b-row>
        </b-form>
      </b-overlay>
    </validation-observer>
  </b-card>
</template>

<script>
import {
  BButton, BForm, BFormGroup, BFormInput, BRow, BCol, BCard, BInputGroup, BInputGroupAppend, BOverlay, BFormInvalidFeedback,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import {
  ref, computed, watch, watchEffect,
} from '@vue/composition-api'
import useAccount from '@/composables/account'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import formValidation from '@core/comp-functions/forms/form-validation'
import {
  required, min,
} from '@validations'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BForm,
    BButton,
    BOverlay,
    BFormInput,
    BFormGroup,
    BInputGroup,
    BInputGroupAppend,
    ValidationProvider,
    ValidationObserver,
    BFormInvalidFeedback,
  },
  directives: {
    Ripple,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      required,
      min,
    }
  },
  setup() {
    const {
      busy,
      errors,
      updatePassword,
    } = useAccount()
    const passwordFieldType = ref(null)
    const passwordToggleIcon = computed(() => (passwordFieldType.value === 'password' ? 'EyeIcon' : 'EyeOffIcon'))
    const blankUserData = {
      current_password: '',
      password: '',
      password_confirmation: '',
    }
    const userData = ref(JSON.parse(JSON.stringify(blankUserData)))
    const resetuserData = () => {
      userData.value = JSON.parse(JSON.stringify(blankUserData))
    }
    const generatePassword = () => {
      const password = Math.random().toString(36).slice(-10)
      userData.value.password = password
      userData.value.password_confirmation = password
    }

    const onSubmit = async () => {
      await updatePassword(userData.value)
      // set validation errors
    }

    const { refFormObserver, getValidationState, resetForm } = formValidation(resetuserData)

    // watch errors
    watch(errors, newErrors => {
      refFormObserver.value.setErrors(newErrors)
    })


    return {
      busy,
      userData,
      resetForm,
      onSubmit,
      refFormObserver,
      generatePassword,
      getValidationState,
      passwordToggleIcon,
      passwordFieldType,
    }
  },
}
</script>
