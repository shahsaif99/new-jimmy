<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">

      <!-- Forgot Password v1 -->
      <b-card class="mb-0">
        <b-link class="brand-logo text-center justify-center">
          <!-- <Logo logo-classes="w-100  fill-current text-primary" /> -->
        </b-link>

        <b-card-title class="mb-1">
          Forgot Password? 🔒
        </b-card-title>
        <b-card-text class="mb-2">
          Enter your email and we'll send you instructions to reset your password
        </b-card-text>

        <!-- form -->
        <validation-observer
          ref="refFormObserver"
          #default="{ handleSubmit }"
        >
          <b-overlay
            :show="busy"
            spinner-variant="primary"
            spinner-type="grow"
            rounded="sm"
            opacity="0.20"
          >
            <b-form
              class="auth-forgot-password-form mt-2"
              @submit.prevent="handleSubmit(onSubmit)"
            >
              <validation-provider
                #default="validationContext"
                name="Email"
                rules="required|email"
              >
                <b-form-group
                  label-for="email"
                >
                  <b-form-input
                    id="email"
                    v-model="userEmail"
                    :state="getValidationState(validationContext)"
                    trim
                    placeholder="Email"
                  />

                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>

              <b-button
                type="submit"
                variant="primary"
                block
              >
                Send reset link
              </b-button>
            </b-form>
          </b-overlay>
        </validation-observer>

        <b-card-text class="text-center mt-2">
          <b-link :to="{name:'login'}">
            <feather-icon icon="ChevronLeftIcon" /> Back to login
          </b-link>
        </b-card-text>

      </b-card>
    <!-- /Forgot Password v1 -->
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BCard, BLink, BCardText, BCardTitle, BFormGroup, BFormInput, BForm, BButton, BFormInvalidFeedback, BOverlay,
} from 'bootstrap-vue'
import { required, email } from '@validations'
import { $themeConfig } from '@themeConfig'
import { ref } from '@vue/composition-api'
import useAuth from '@/composables/auth'
import formValidation from '@core/comp-functions/forms/form-validation'
import Logo from '@core/layouts/components/Logo.vue'

export default {
  components: {
    Logo,
    BCard,
    BForm,
    BLink,
    BButton,
    BOverlay,
    BCardText,
    BCardTitle,
    BFormGroup,
    BFormInput,
    ValidationProvider,
    ValidationObserver,
    BFormInvalidFeedback,
  },
  data() {
    return {
      required,
      email,
    }
  },
  setup() {
    const { appName } = $themeConfig.app
    const { busy, forgotPassword } = useAuth()
    const userEmail = ref(null)
    const onSubmit = async () => {
      forgotPassword(userEmail.value)
    }

    const {
      refFormObserver, getValidationState,
    } = formValidation()
    return {
      refFormObserver,
      getValidationState,
      userEmail,
      onSubmit,
      appName,
      busy,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
