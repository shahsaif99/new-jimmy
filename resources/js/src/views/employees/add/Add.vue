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
          <b-row>
            <b-col
              cols="12"
              md="6"
            >
              <b-card>
                <b-card-title>
                  {{ t('Details') }}
                </b-card-title>

                <b-row>
                  <b-col
                    cols="12"
                    md="6"
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
                    md="6"
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
                    md="6"
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
                    md="6"
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
                    md="6"
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
                    md="6"
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
                          :locale="locale"
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
                    md="6"
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
                    md="6"
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
                    md="6"
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

                  <!-- Field: Status -->

                </b-row>

              </b-card>
              <b-card>
                <b-card-title>
                  Login Information
                </b-card-title>
                <b-row>
                  <!-- Field: Email -->
                  <b-col
                    cols="12"
                    md="12"
                  >
                    <validation-provider
                      #default="validationContext"
                      :name="t('Email')"
                      rules="required|email"
                    >
                      <b-form-group
                        :label="t('Email')"
                      >
                        <b-form-input
                          id="email"
                          v-model="formData.email"
                          :state="getValidationState(validationContext)"
                          trim
                          :placeholder="t('Email')"
                        />

                        <b-form-invalid-feedback>
                          {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col
                    cols="12"
                    md="6"
                  >
                    <validation-provider
                      #default="validationContext"
                      :name="t('Password')"
                      rules="required|min:6"
                    >
                      <b-form-group
                        :label="t('Password')"
                      >
                        <b-input-group
                          class="input-group-merge"
                          :state="getValidationState(validationContext)"
                        >
                          <b-form-input
                            id="password"
                            v-model="formData.password"
                            :state="getValidationState(validationContext)"
                            :type="passwordFieldType"
                            :name="t('Password')"
                            :placeholder="t('Password')"
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
                        <b-form-invalid-feedback :state="getValidationState(validationContext)">
                          {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col
                    cols="12"
                    md="6"
                  >
                    <validation-provider
                      #default="validationContext"
                      :name="t('Confirm Password')"
                      rules="required|confirmed:Password"
                    >
                      <b-form-group
                        :label="t('Confirm Password')"
                      >
                        <b-input-group
                          class="input-group-merge"
                          :state="getValidationState(validationContext)"
                        >
                          <b-form-input
                            class="form-control-merge"
                            v-model="formData.password_confirmation"
                            :state="getValidationState(validationContext)"
                            :type="passwordFieldType"
                            :placeholder="t('Confirm Password')"
                          />
                          <b-input-group-append is-text>
                            <feather-icon
                              class="cursor-pointer"
                              :icon="passwordToggleIcon"
                              @click="togglePasswordVisibility"
                            />
                          </b-input-group-append>
                        </b-input-group>
                        <b-form-invalid-feedback :state="getValidationState(validationContext)">
                          {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
            <b-col
              cols="12"
              md="6"
            >
              <b-card>
                <b-card-title>
                  {{ t('Employment Details') }}
                </b-card-title>
                <b-row>

                  <b-col
                    cols="12"
                    md="6"
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
                          :locale="locale"
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
                    md="6"
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
                          :locale="locale"
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
                    md="6"
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
              </b-card>
            </b-col>
          </b-row>

          <b-row>
            <b-col sm="6">
              <b-card>
                <div class="d-flex mt-2 justify-content-end">
                  <b-button
                    type="reset"
                    variant="outline-secondary"
                  >
                    {{ t('Reset') }}
                  </b-button>
                  <b-button
                    variant="primary"
                    class="ml-2"
                    type="submit"
                  >
                    {{ t('Create User') }}
                  </b-button>
                </div>

              </b-card>
            </b-col>
          </b-row>
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
  BInputGroup,
  BCardTitle,
  BFormDatepicker,
  BFormSelect,
  BFormTextarea,
  BInputGroupAppend,
  BFormInvalidFeedback,
} from 'bootstrap-vue'
import { ref, computed, onMounted } from '@vue/composition-api'
// import vSelect from 'vue-select'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import formValidation from '@core/comp-functions/forms/form-validation'
import useUsers from '@/composables/users'
import {
  required, email, min,
} from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import { useUtils as useI18nUtils } from '@core/libs/i18n'


export default {
  components: {
    BRow,
    BCard,
    BCol,
    BForm,
    BButton,
    BOverlay,
    BCardTitle,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BInputGroup,
    BFormTextarea,
    BFormDatepicker,
    BInputGroupAppend,
    ValidationProvider,
    ValidationObserver,
    BFormInvalidFeedback,
  },
  mixins: [togglePasswordVisibility],
  setup(props, { emit }) {
    const initialState = {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      status: 1,
      address: '',
      post_address: '',
      postal_code: '',
      gender: '',
      citizen_country: '',
      position_percentage: '',
      employement_date: '',
      end_date: '',
      dob: '',
      description: '',
      password: '',
      password_confirmation: '',
      role: 'Employee',
    }

    const { t } = useI18nUtils()


    const formData = ref({ ...initialState })

    // const formData = ref(JSON.parse(JSON.stringify(blankFormData)))
    const statusOptions = [
      { label: 'Active', value: 1 },
      { label: 'Inactive', value: 0 },
    ]
    const {
      storeUser,
      respResult,
      busy,
    } = useUsers()


    const resetformData = () => {
    //   formData.value = JSON.parse(JSON.stringify(blankFormData))
    }


    const passwordFieldType = ref(null)
    const passwordToggleIcon = computed(() => (passwordFieldType.value === 'password' ? 'EyeIcon' : 'EyeOffIcon'))

    onMounted(() => {
    //   fetchPermissionsList()
    })
    const locale = localStorage.getItem('locale')

    const generatePassword = () => {
      const password = Math.random().toString(36).slice(-10)
      formData.value.password = password
      formData.value.password_confirmation = password
    }

    const onSubmit = async () => {
      await storeUser(formData.value)
      if (respResult.value.status === 200) {
        emit('refetch-data')
      }
    }
    const { refFormObserver, getValidationState, resetForm } = formValidation(resetformData)

    return {
      t,
      min,
      email,
      busy,
      locale,
      required,
      formData,
      onSubmit,
      resetForm,
      statusOptions,
      refFormObserver,
      generatePassword,
      getValidationState,
      passwordToggleIcon,
    }
  },
}
</script>

  <style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
  </style>
