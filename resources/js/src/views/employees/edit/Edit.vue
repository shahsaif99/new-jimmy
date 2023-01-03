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
                  Details
                </b-card-title>

                <b-row>
                  <b-col
                    cols="12"
                    md="6"
                  >
                    <validation-provider
                      #default="validationContext"
                      name="First Name"
                      rules="required"
                    >
                      <b-form-group
                        label="First Name"
                      >
                        <b-form-input
                          placeholder="First Name"
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
                      name="Last Name"
                      rules="required"
                    >
                      <b-form-group
                        label="Last Name"
                      >
                        <b-form-input
                          id="last_name"
                          v-model="formData.last_name"
                          :state="getValidationState(validationContext)"
                          trim
                          placeholder="Last Name"
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
                      name="Employee Number"
                    >
                      <b-form-group
                        label="Employee Number"
                      >
                        <b-form-input
                          id="employee_number"
                          v-model="formData.employee_number"
                          :state="getValidationState(validationContext)"
                          trim
                          placeholder="Employee Number"
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
                      name="Address"
                      rules="required"
                    >
                      <b-form-group
                        label="Address"
                      >
                        <b-form-input
                          id="address"
                          v-model="formData.address"
                          :state="getValidationState(validationContext)"
                          trim
                          placeholder="Address"
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
                      name="Post Address"
                    >
                      <b-form-group
                        label="Post Address"
                      >
                        <b-form-input
                          id="post_address"
                          v-model="formData.post_address"
                          :state="getValidationState(validationContext)"
                          trim
                          placeholder="Post Address"
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
                      name="Post Code"
                    >
                      <b-form-group
                        label="Post Code"
                      >
                        <b-form-input
                          id="postal_code"
                          v-model="formData.postal_code"
                          :state="getValidationState(validationContext)"
                          trim
                          placeholder="Post Code"
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
                      name="Date of Birth"
                    >
                      <b-form-group
                        label="Date of Birth"
                      >
                        <b-form-datepicker
                          id="dob"
                          v-model="formData.dob"
                          :state="getValidationState(validationContext)"
                          trim
                          placeholder="Date of Birth"
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
                      name="Gender"
                      rules="required"
                    >
                      <b-form-group
                        label="Gender"
                      >
                        <b-form-select
                          id="gender"
                          v-model="formData.gender"
                          :state="getValidationState(validationContext)"
                          trim
                          :options="['Male','Female']"
                          placeholder="Gender"
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
                        label="Phone"
                      >
                        <b-form-input
                          id="phone"
                          v-model="formData.phone"
                          :state="getValidationState(validationContext)"
                          trim
                          placeholder="Phone"
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
                      name="Citizen Country"
                    >
                      <b-form-group
                        label="Citizen Country"
                      >
                        <b-form-input
                          id="citizen_country"
                          v-model="formData.citizen_country"
                          :state="getValidationState(validationContext)"
                          trim
                          placeholder="Citizen Country"
                        />

                        <b-form-invalid-feedback>
                          {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </validation-provider>
                  </b-col>

                  <!-- Field: Status -->
                  <!-- <b-col
                      cols="12"
                      md="6"
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
                          <v-select
                            placeholder="Status"
                            v-model="formData.status"
                            :options="statusOptions"
                            :reduce="status => status.value"
                            :clearable="false"
                            input-id="title"
                          />
                          <b-form-invalid-feedback :state="getValidationState(validationContext)">
                            {{ validationContext.errors[0] }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </validation-provider>
                    </b-col> -->
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
                      name="Email"
                      rules="required|email"
                    >
                      <b-form-group
                        label="Email"
                      >
                        <b-form-input
                          id="email"
                          v-model="formData.email"
                          :state="getValidationState(validationContext)"
                          trim
                          placeholder="Email"
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
                      name="Password"
                      rules="min:6"
                    >
                      <b-form-group
                        label="Password"
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
                            name="password"
                            placeholder="Password"
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
                      name="Confirm Password"
                      rules="confirmed:Password"
                    >
                      <b-form-group
                        label="Confirm Password"
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
                  Employment Details
                </b-card-title>
                <b-row>

                  <b-col
                    cols="12"
                    md="6"
                  >
                    <validation-provider
                      #default="validationContext"
                      name="Employement Date"
                      rules="required"
                    >
                      <b-form-group
                        label="Employement Date"
                      >
                        <b-form-datepicker
                          id="employement_date"
                          v-model="formData.employement_date"
                          :state="getValidationState(validationContext)"
                          trim
                          placeholder="Employement Date"
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
                      name="End Date"
                    >
                      <b-form-group
                        label="End Date"
                      >
                        <b-form-datepicker
                          id="end_date"
                          v-model="formData.end_date"
                          :state="getValidationState(validationContext)"
                          trim
                          placeholder="End Date"
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
                      name="Position Percentage"
                    >
                      <b-form-group
                        label="Position Percentage"
                      >
                        <b-form-input
                          id="position_percentage"
                          v-model="formData.position_percentage"
                          :state="getValidationState(validationContext)"
                          trim
                          placeholder="Position Percentage"
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
                      name="Job Description"
                    >
                      <b-form-group
                        label="Job Description"
                      >
                        <b-form-textarea
                          id="description"
                          v-model="formData.description"
                          :state="getValidationState(validationContext)"
                          trim
                          placeholder="Job Description"
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
                    Reset
                  </b-button>
                  <b-button
                    variant="primary"
                    class="ml-2"
                    type="submit"
                  >
                    Update User
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
  setup(props, { emit, root }) {
    const formData = ref({})

    // const formData = ref(JSON.parse(JSON.stringify(blankFormData)))
    const statusOptions = [
      { label: 'Active', value: 1 },
      { label: 'Inactive', value: 0 },
    ]
    const {
      user,
      busy,
      getUser,
      updateUser,
      respResult,

    } = useUsers()


    const resetformData = () => {
      //   formData.value = JSON.parse(JSON.stringify(blankFormData))
    }

    const userId = ref(null)
    const passwordFieldType = ref(null)
    const passwordToggleIcon = computed(() => (passwordFieldType.value === 'password' ? 'EyeIcon' : 'EyeOffIcon'))

    onMounted(async () => {
      userId.value = root.$route.params.id
      await getUser(userId.value)
      formData.value = {
        ...user.value,
        password: '',
        password_confirmation: '',
      }
    })

    const generatePassword = () => {
      const password = Math.random().toString(36).slice(-10)
      formData.value.password = password
      formData.value.password_confirmation = password
    }

    const onSubmit = async () => {
      await updateUser(formData.value)
      if (respResult.value.status === 200) {
        emit('refetch-data')
      }
    }
    const { refFormObserver, getValidationState, resetForm } = formValidation(resetformData)

    return {
      min,
      email,
      busy,
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
