<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">

      <!-- Login v1 -->
      <b-card class="mb-0 pb-4">
        <b-link class="brand-logo text-center justify-center">
          <!-- <Logo logo-classes="w-50  fill-current text-primary" /> -->
        </b-link>

        <b-card-title class="mb-1">
          Welcome to {{ appName }}!
        </b-card-title>
        <b-card-text class="mb-2">
          Please sign-in to your account
        </b-card-text>

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
            <b-form
              class="auth-login-form mt-2"
              @submit.prevent="handleSubmit(onSubmit)"
            >
              <!-- email -->
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
                    id="login-email"
                    v-model="loginData.email"
                    :state="errors.length > 0 ? false : null"
                    name="login-email"
                    placeholder="john@example.com"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <b-form-group>
                <div class="d-flex justify-content-between">
                  <label for="login-password">Password</label>
                  <b-link
                    :to="{
                      name: 'forgot-password',
                    }"
                  >
                    <small>Forgot Password?</small>
                  </b-link>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="Password"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                  >
                    <b-form-input
                      id="login-password"
                      v-model="loginData.password"
                      :state="errors.length > 0 ? false : null"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      name="login-password"
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

              <!-- checkbox -->
              <b-form-group>
                <b-form-checkbox
                  id="remember-me"
                  v-model="status"
                  name="checkbox-1"
                >
                  Remember Me
                </b-form-checkbox>
              </b-form-group>

              <b-button
                type="submit"
                variant="primary"
                block
              >
                Sign in
              </b-button>
            </b-form>
          </b-overlay>
        </validation-observer>

        <!-- <b-card-text class="text-center mt-2">
          <span>New on our platform? </span>
          <b-link :to="{name:'auth-register-v1'}">
            <span>Create an account</span>
          </b-link>
        </b-card-text> -->

        <!-- <div class="divider my-2">
          <div class="divider-text">
            or
          </div>
        </div> -->

        <!-- social button -->
        <!-- <div class="auth-footer-btn d-flex justify-content-center">
          <b-button
            href="javascript:void(0)"
            variant="facebook"
          >
            <feather-icon icon="FacebookIcon" />
          </b-button>
          <b-button
            href="javascript:void(0)"
            variant="twitter"
          >
            <feather-icon icon="TwitterIcon" />
          </b-button>
          <b-button
            href="javascript:void(0)"
            variant="google"
          >
            <feather-icon icon="MailIcon" />
          </b-button>
          <b-button
            href="javascript:void(0)"
            variant="github"
          >
            <feather-icon icon="GithubIcon" />
          </b-button>
        </div> -->
      </b-card>
      <!-- /Login v1 -->
    </div>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import Logo from '@core/layouts/components/Logo.vue'
import {
  BCard,
  BLink,
  BFormGroup,
  BFormInput,
  BInputGroupAppend,
  BInputGroup,
  BFormCheckbox,
  BCardText,
  BCardTitle,
  BForm,
  BButton,
  BOverlay,
} from 'bootstrap-vue'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import useJwt from '@/auth/jwt/useJwt'
import { $themeConfig } from '@themeConfig'
import { ref, computed, reactive } from '@vue/composition-api'
import useAuth from '@/composables/auth'
import { required, email } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'

export default {
  components: {
    BCard,
    BLink,
    BForm,
    BButton,
    BOverlay,
    BCardText,
    BFormInput,
    BFormGroup,
    BCardTitle,
    BInputGroup,
    BFormCheckbox,
    BInputGroupAppend,
    ValidationObserver,
    ValidationProvider,
    Logo,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      spinner: false,
      status: '',
      sideImg: require('@/assets/images/pages/login-bg.jpeg'),
      required,
      email,
    }
  },
  setup(props, { root }) {
    const {
      busy,
      responseStatus,
      login,
    } = useAuth()

    const passwordFieldType = ref(null)
    const passwordToggleIcon = computed(() => (passwordFieldType.value === 'password' ? 'EyeIcon' : 'EyeOffIcon'))
    const { appName } = $themeConfig.app
    const loginData = reactive({
      email: '',
      password: '',
    })

    const {
      refFormObserver, getValidationState, resetForm,
    } = formValidation()
    const onSubmit = async () => {
      await login(loginData)
      if (responseStatus.value.status === 200) {
        const { userData, permissions, token } = responseStatus.value.data
        useJwt.setToken(token)
        useJwt.setUserData(JSON.stringify(userData))
        localStorage.setItem('abilities', JSON.stringify(permissions.abilities))
        root.$ability.update([
          {
            subject: 'all',
            action: permissions.abilities,
          },
        ])
        root.$router.replace({ name: 'dashboard' })
          .then(() => {
            root.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                title: `Welcome ${userData.name}`,
                icon: 'CoffeeIcon',
                variant: 'success',
                text: 'You have successfully logged in.',
              },
            })
          })
      }
    }
    return {
      busy,
      appName,
      onSubmit,
      loginData,
      resetForm,
      refFormObserver,
      getValidationState,
      passwordToggleIcon,
      passwordFieldType,
    }
  },
}
</script>
  <style lang="scss">
    @import '@core/scss/vue/pages/page-auth.scss';
  </style>
