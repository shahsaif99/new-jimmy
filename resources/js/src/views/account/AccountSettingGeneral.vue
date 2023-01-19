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
            <span>{{ t('Details') }}</span>
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
                @submit.prevent="handleSubmit(onSubmit)"
                @reset.prevent="resetForm"
              >
                <b-card>
                  <b-row>
                    <b-col
                      cols="12"
                      md="3"
                    >
                      <b-media class="mb-2">
                        <template #aside>
                          <b-avatar
                            ref="previewEl"
                            :src="formData.avatar_url"
                            :text="avatarText(formData.name)"
                            size="90px"
                            rounded
                          />
                        </template>
                        <h4 class="mb-1">
                          {{ formData.name }}
                        </h4>
                        <div class="d-flex flex-wrap">
                          <b-button
                            variant="primary"
                            size="sm"
                            @click="$refs.refInputEl.click()"
                          >
                            <input
                              ref="refInputEl"
                              type="file"
                              class="d-none"
                              @input="inputImageRenderer"
                            >
                            <span class="d-none d-sm-inline">{{ t('Upload') }}</span>
                          </b-button>
                          <b-button
                            variant="outline-secondary"
                            class="ml-1"
                            @click="removeImage"
                            size="sm"
                          >
                            <span class="d-none d-sm-inline">{{ t('Remove') }}</span>
                          </b-button>
                        </div>
                      </b-media>
                    </b-col>
                    <b-col
                      cols="12"
                      md="3"
                    >
                      <validation-provider
                        #default="validationContext"
                        :name="t('First Name')"
                        rules="required"
                      >
                        <b-form-group
                          :label="t('First Name')"
                        >
                          <b-form-input
                            :placeholder="t('First Name')"
                            id="first_name"
                            v-model="formData.first_name"
                            :state="getValidationState(validationContext)"
                            trim
                          />

                          <b-form-invalid-feedback>
                            {{ validationContext.errors[0] }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </validation-provider>
                    </b-col>

                    <!-- Field: Full Name -->
                    <b-col
                      cols="12"
                      md="3"
                    >
                      <validation-provider
                        #default="validationContext"
                        :name="t('Last Name')"
                        rules="required"
                      >
                        <b-form-group
                          :label="t('Last Name')"
                        >
                          <b-form-input
                            id="last_name"
                            v-model="formData.last_name"
                            :state="getValidationState(validationContext)"
                            trim
                            :placeholder="t('Last Name')"
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
                        :name="t('Address')"
                        rules="required"
                      >
                        <b-form-group
                          :label="t('Address')"
                        >
                          <b-form-input
                            id="address"
                            v-model="formData.address"
                            :state="getValidationState(validationContext)"
                            trim
                            :placeholder="t('Address')"
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
                        :name="t('Post Address')"
                      >
                        <b-form-group
                          :label="t('Post Address')"
                        >
                          <b-form-input
                            id="post_address"
                            v-model="formData.post_address"
                            :state="getValidationState(validationContext)"
                            trim
                            :placeholder="t('Post Address')"
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
                        :name="t('Post Code')"
                      >
                        <b-form-group
                          :name="t('Post Code')"
                        >
                          <b-form-input
                            id="postal_code"
                            v-model="formData.postal_code"
                            :state="getValidationState(validationContext)"
                            trim
                            :placeholder="t('Post Code')"
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
                        :name="t('Date of Birth')"
                      >
                        <b-form-group
                          :label="t('Date of Birth')"
                        >
                          <b-form-datepicker
                            id="dob"
                            v-model="formData.dob"
                            :state="getValidationState(validationContext)"
                            trim
                            :placeholder="t('Date of Birth')"
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
                        :name="t('Gender')"
                        rules="required"
                      >
                        <b-form-group
                          :label="t('Gender')"
                        >
                          <b-form-select
                            id="gender"
                            v-model="formData.gender"
                            :state="getValidationState(validationContext)"
                            trim
                            :options="['Male','Female']"
                            :placeholder="t('Gender')"
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
                        name="Phone"
                        rules="required"
                      >
                        <b-form-group
                          :label="t('Phone')"
                        >
                          <b-form-input
                            id="phone"
                            v-model="formData.phone"
                            :state="getValidationState(validationContext)"
                            trim
                            :placeholder="t('Phone')"
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
                        :name="t('Citizen Country')"
                      >
                        <b-form-group
                          :label="t('Citizen Country')"
                        >
                          <b-form-input
                            id="citizen_country"
                            v-model="formData.citizen_country"
                            :state="getValidationState(validationContext)"
                            trim
                            :placeholder="t('Citizen Country')"
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
                        :name="t('Employement Date')"
                        rules="required"
                      >
                        <b-form-group
                          :label="t('Employement Date')"
                        >
                          <b-form-datepicker
                            id="employement_date"
                            v-model="formData.employement_date"
                            :state="getValidationState(validationContext)"
                            trim
                            :placeholder="t('Employement Date')"
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
                        :name="t('End Date')"
                      >
                        <b-form-group
                          :label="t('End Date')"
                        >
                          <b-form-datepicker
                            id="end_date"
                            v-model="formData.end_date"
                            :state="getValidationState(validationContext)"
                            trim
                            :placeholder="t('End Date')"
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
                        :name="t('Position Percentage')"
                      >
                        <b-form-group
                          :label="t('Position Percentage')"
                        >
                          <b-form-input
                            id="position_percentage"
                            v-model="formData.position_percentage"
                            :state="getValidationState(validationContext)"
                            trim
                            :placeholder="t('Position Percentage')"
                          />

                          <b-form-invalid-feedback>
                            {{ validationContext.errors[0] }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <!-- Field: Status -->
                    <b-col
                      cols="12"
                      md="3"
                    >
                      <validation-provider
                        #default="validationContext"
                        name="Status"
                        rules="required"
                      >
                        <b-form-group
                          label="Status"
                          :state="getValidationState(validationContext)"
                        >
                          <!-- <v-select
                      placeholder="Status"
                      v-model="formData.status"
                      :options="statusOptions"
                      :reduce="status => status.value"
                      :clearable="false"
                      input-id="title"
                    /> -->
                          <b-form-select
                            id="status"
                            v-model="formData.status"
                            :state="getValidationState(validationContext)"
                            value-field="value"
                            text-field="label"
                            :options="statusOptions"
                            placeholder="Status"
                          />
                          <b-form-invalid-feedback :state="getValidationState(validationContext)">
                            {{ validationContext.errors[0] }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      cols="12"
                      md="12"
                    >
                      <validation-provider
                        #default="validationContext"
                        :name="t('Job Description')"
                      >
                        <b-form-group
                          :label="t('Job Description')"
                        >
                          <b-form-textarea
                            id="description"
                            v-model="formData.description"
                            :state="getValidationState(validationContext)"
                            trim
                            :placeholder="t('Job Description')"
                          />

                          <b-form-invalid-feedback>
                            {{ validationContext.errors[0] }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                  </b-row>

                  <div class="d-flex mt-2 justify-content-end">
                    <b-button
                      variant="primary"
                      class="ml-2"
                      type="submit"
                    >
                      {{ t('Update User') }}
                    </b-button>
                  </div>
                </b-card>
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
  BTabs, BTab, BFormDatepicker, BMedia, BAvatar, BFormSelect, BFormTextarea,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { ref, onMounted } from '@vue/composition-api'
// import useAccount from '@/composables/account'
import { required, alphaNum, email } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { avatarText } from '@core/utils/filter'
import useUsers from '@/composables/users'
import useJwt from '@/auth/jwt/useJwt'
import { useUtils as useI18nUtils } from '@core/libs/i18n'

export default {
  components: {
    BRow,
    BCol,
    BTab,
    BCard,
    BTabs,
    BForm,
    BMedia,
    BAvatar,
    BButton,
    BOverlay,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BFormTextarea,
    BFormDatepicker,
    ValidationProvider,
    ValidationObserver,
    BFormInvalidFeedback,
  },
  directives: {
    Ripple,
  },
  setup() {
    const userData = JSON.parse(useJwt.getUserData())
    const { t } = useI18nUtils()
    const formData = ref({})
    const statusOptions = [
      { label: 'Active', value: true },
      { label: 'Inactive', value: false },
    ]

    const {
      user,
      busy,
      getUser,
      updateUser,
    } = useUsers()


    onMounted(async () => {
      await getUser(userData.id)
      formData.value = user.value
    })

    // remove image
    const removeImage = () => {
      formData.value.avatar_new = ''
    }
    const refInputEl = ref(null)
    const previewEl = ref(null)

    const { inputImageRenderer } = useInputImageRenderer(refInputEl, base64 => {
      formData.value.avatar_url = base64
      formData.value.avatar_new = base64
    })

    const {
      refFormObserver, getValidationState, resetForm,
    } = formValidation()

    const onSubmit = async () => {
      await updateUser(formData.value)
    }

    return {
      t,
      busy,
      email,
      formData,
      required,
      alphaNum,
      onSubmit,
      previewEl,
      resetForm,
      avatarText,
      refInputEl,
      removeImage,
      statusOptions,
      refFormObserver,
      inputImageRenderer,
      getValidationState,
    }
  },
}
</script>
