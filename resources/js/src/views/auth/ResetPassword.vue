<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">
      <!-- Reset Password v1 -->
      <b-card class="mb-0">

        <!-- logo -->
        <b-link class="brand-logo text-center justify-center">
          <!-- <Logo logo-classes="w-100  fill-current text-primary" /> -->
        </b-link>
        <b-card-title class="mb-1">
          Reset Password 🔒
        </b-card-title>
        <b-card-text class="mb-2">
          Your new password must be different from previously used passwords
        </b-card-text>

        <!-- form -->
        <validation-observer
          ref="refFormObserver"
          #default="{ handleSubmit }"
        >
          <b-form
            class="auth-reset-password-form mt-2"
            @submit.prevent="handleSubmit(onSubmit)"
          >
            <b-form-group
              label="Email"
              label-for="login-email"
            >
              <validation-provider
                #default="{ errors }"
                name="Email"
                rules="required|email"
              >
                <b-form-input
                  disabled
                  id="login-email"
                  v-model="form.email"
                  :state="errors.length > 0 ? false : null"
                  name="login-email"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <!-- password -->
            <b-form-group
              label="New Password"
              label-for="reset-password-new"
            >
              <validation-provider
                #default="{ errors }"
                name="Password"
                vid="Password"
                rules="required|password"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid':null"
                >
                  <b-form-input
                    id="reset-password-new"
                    v-model="form.password"
                    :type="passwordFieldType"
                    :state="errors.length > 0 ? false:null"
                    class="form-control-merge"
                    name="reset-password-new"
                    placeholder="············"
                  />

                  <b-input-group-append is-text>
                    <feather-icon
                      class="cursor-pointer"
                      :icon="passwordToggleIcon"
                      @click="togglePasswordVisibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- confirm password -->
            <b-form-group
              label-for="reset-password-confirm"
              label="Confirm Password"
            >
              <validation-provider
                #default="{ errors }"
                name="Confirm Password"
                rules="required|confirmed:Password"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid':null"
                >
                  <b-form-input
                    id="reset-password-confirm"
                    v-model="form.password_confirmation"
                    :type="passwordFieldType"
                    class="form-control-merge"
                    :state="errors.length > 0 ? false:null"
                    name="reset-password-confirm"
                    placeholder="············"
                  />
                  <b-input-group-append is-text>
                    <feather-icon
                      class="cursor-pointer"
                      :icon="passwordToggleIcon"
                      @click="togglePasswordVisibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- submit button -->
            <b-button
              block
              type="submit"
              variant="primary"
            >
              Set New Password
            </b-button>
          </b-form>
        </validation-observer>

        <p class="text-center mt-2">
          <b-link :to="{name:'login'}">
            <feather-icon icon="ChevronLeftIcon" /> Back to login
          </b-link>
        </p>

      </b-card>
    <!-- /Reset Password v1 -->
    </div>
  </div>

</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import Logo from '@core/layouts/components/Logo.vue'
import {
  BCard,
  BCardTitle,
  BCardText,
  BForm,
  BFormGroup,
  BInputGroup,
  BInputGroupAppend,
  BLink,
  BFormInput,
  BButton,
} from 'bootstrap-vue'
import { required } from '@validations'
import { $themeConfig } from '@themeConfig'
import useAuth from '@/composables/auth'
import { ref, computed, reactive } from '@vue/composition-api'
import formValidation from '@core/comp-functions/forms/form-validation'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'

export default {
  components: {
    Logo,
    BCard,
    BButton,
    BCardTitle,
    BCardText,
    BForm,
    BFormGroup,
    BInputGroup,
    BLink,
    BFormInput,
    BInputGroupAppend,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],

  data() {
    return {
      required,
    }
  },
  props: {
    email: {
      required: true,
      type: String,
    },
    token: {
      required: true,
      type: String,
    },
  },
  setup(props, { root }) {
    const { appName } = $themeConfig.app
    const { busy, resetPassword, responseStatus } = useAuth()

    const form = reactive({
      password: '',
      password_confirmation: '',
      email: props.email,
      token: props.token,
    })
    const userEmail = ref(null)
    const onSubmit = async () => {
      await resetPassword(form)

      if (responseStatus.value.status === 200) {
        root.$router.push({ name: 'login' })
      }
    }
    const passwordFieldType = ref(null)
    const passwordToggleIcon = computed(() => (passwordFieldType.value === 'password' ? 'EyeIcon' : 'EyeOffIcon'))


    const {
      refFormObserver, getValidationState,
    } = formValidation()
    return {
      passwordToggleIcon,
      getValidationState,
      refFormObserver,
      userEmail,
      onSubmit,
      appName,
      busy,
      form,
    }
  },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/pages/page-auth.scss';
</style>
