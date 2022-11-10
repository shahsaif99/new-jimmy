<template>
  <b-card>
    <!-- BODY -->
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
          <!-- media -->
          <b-media class="mb-2">
            <template #aside>
              <b-avatar
                ref="previewEl"
                :src="userData.avatar_url"
                :text="avatarText(userData.name)"
                size="90px"
                rounded
              />
            </template>
            <h4 class="mb-1">
              {{ userData.name }}
            </h4>
            <div class="d-flex flex-wrap">
              <b-button
                variant="primary"
                @click="$refs.refInputEl.click()"
              >
                <input
                  ref="refInputEl"
                  type="file"
                  class="d-none"
                  @input="inputImageRenderer"
                >
                <span class="d-none d-sm-inline">Browse</span>
                <feather-icon
                  icon="EditIcon"
                  class="d-inline d-sm-none"
                />
              </b-button>
              <b-button
                variant="outline-secondary"
                class="ml-1"
                @click="removeImage"
              >
                <span class="d-none d-sm-inline">Remove</span>
                <feather-icon
                  icon="TrashIcon"
                  class="d-inline d-sm-none"
                />
              </b-button>
            </div>
            <b-card-text>Allowed JPG, GIF or PNG. Max size of 800kB</b-card-text>
          </b-media>


          <b-row>
            <b-col sm="4">
              <validation-provider
                #default="validationContext"
                name="First Name"
                rules="required"
              >
                <b-form-group
                  label="First Name"
                  label-for="first_name"
                >
                  <b-form-input
                    id="first_name"
                    v-model="userData.first_name"
                    autofocus
                    :state="getValidationState(validationContext)"
                    trim
                    placeholder="John"
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
                name="Last Name"
                rules="required"
              >
                <b-form-group
                  label="Last Name"
                  label-for="last_name"
                >
                  <b-form-input
                    id="last_name"
                    v-model="userData.last_name"
                    autofocus
                    :state="getValidationState(validationContext)"
                    trim
                    placeholder="Doe"
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
  </b-card>
</template>

<script>
import {
  BOverlay, BFormInvalidFeedback, BButton, BForm, BFormGroup, BFormInput, BRow, BCol, BCard, BMedia, BCardText,
  BAvatar,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { ref, watchEffect } from '@vue/composition-api'
import useAccount from '@/composables/account'
import { required, alphaNum, email } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { avatarText } from '@core/utils/filter'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BMedia,
    BForm,
    BAvatar,
    BOverlay,
    BButton,
    BCardText,
    BFormGroup,
    BFormInput,
    ValidationProvider,
    ValidationObserver,
    BFormInvalidFeedback,
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

    }
  },
}
</script>
