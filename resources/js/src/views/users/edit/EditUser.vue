<template>
  <div>
    <b-card>


      <!-- Media -->
      <b-media class="mb-2">
        <template #aside>
          <b-avatar
            ref="previewEl"
            :src="userData.avatar"
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
            <span class="d-none d-sm-inline">Update</span>
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
      </b-media>

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

              <!-- Field: Username -->
              <b-col
                cols="12"
                md="4"
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
                      v-model="userData.first_name"
                      autofocus
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
                md="4"
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
                      v-model="userData.last_name"
                      autofocus
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

              <!-- Field: Email -->
              <b-col
                cols="12"
                md="4"
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
                      v-model="userData.email"
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
                md="4"
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
                      v-model="userData.phone"
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

              <!-- Field: Status -->


              <!-- Field: Role -->
              <!-- <b-col
                cols="12"
                md="4"
              >
                <validation-provider
                  #default="validationContext"
                  name="Role"
                  rules="required"
                >
                  <b-form-group
                    label="Role"
                    :state="getValidationState(validationContext)"
                  >
                    <v-select
                      placeholder="Select Role"
                      v-model="userData.roles"
                      :options="roles"
                      label="name"
                      :reduce="role => role.name"
                      :clearable="false"
                      input-id="role"
                    />
                    <b-form-invalid-feedback :state="getValidationState(validationContext)">
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </b-col> -->

              <!-- Field: Email -->

              <b-col
                cols="12"
                md="4"
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
                        v-model="userData.password"
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
                    <b-form-invalid-feedback>
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </b-col>
              <b-col
                cols="12"
                md="4"
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
                    <b-form-invalid-feedback>
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </b-col>
              <b-col
                cols="12"
                md="4"
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
                      v-model="userData.status"
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
              </b-col>
            </b-row>
            <b-card
              class="border mt-1"
            >
              <b-card-title class="mb-1">
                User Role Permissions
              </b-card-title>
              <validation-provider
                #default="validationContext"
                name="Role"
                rules="required"
              >
                <b-form-group
                  label="Role"
                  :state="getValidationState(validationContext)"
                >
                  <b-form-radio-group
                    v-model="userData.role"
                    value-field="name"
                    text-field="name"
                    :options="roles"
                    name="radio-options"
                    @change="selectRole"
                    :state="getValidationState(validationContext)"
                  />
                  <b-form-invalid-feedback :state="getValidationState(validationContext)">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>

              <b-form-group label="Permissions">
                <b-form-checkbox-group
                  id="flavors"
                  v-model="userData.permissions"
                  :options="permissions"
                  name="flavors"
                  value-field="id"
                  text-field="name"
                  stacked
                />
              </b-form-group>
            </b-card>
            <div class="d-flex mt-2">
              <b-button
                variant="primary"
                class="mr-2"
                type="submit"
              >
                Save Changes
              </b-button>
              <b-button
                type="reset"
                variant="outline-secondary"
              >
                Reset
              </b-button>
            </div>
          </b-form>
        </b-overlay>
      </validation-observer>
    </b-card>
  </div>

</template>

<script>
import {
  BRow,
  BCol,
  BForm,
  BCard,
  BMedia,
  BAvatar,
  BButton,
  BOverlay,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BCardTitle,
  BFormRadioGroup,
  BFormCheckboxGroup,
  BInputGroupAppend,
  BFormInvalidFeedback,
} from 'bootstrap-vue'
import {
  ref, computed, onMounted, watch,
} from '@vue/composition-api'
import { avatarText } from '@core/utils/filter'
import vSelect from 'vue-select'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import formValidation from '@core/comp-functions/forms/form-validation'
import {
  required, email, min,
} from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import useUsers from '@/composables/users'
import useRoles from '@/composables/roles'
import usePermissions from '@/composables/permissions'


export default {
  components: {
    BRow,
    BCard,
    BCol,
    BForm,
    BMedia,
    BButton,
    vSelect,
    BAvatar,
    BOverlay,
    BCardTitle,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BFormRadioGroup,
    BFormCheckboxGroup,
    BInputGroupAppend,
    ValidationProvider,
    ValidationObserver,
    BFormInvalidFeedback,
  },
  mixins: [togglePasswordVisibility],
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const statusOptions = [
      { label: 'Active', value: true },
      { label: 'Inactive', value: false },
    ]
    const {
      updateUser,
      busy,
      user,
      getUser,
    } = useUsers()

    const {
      perPage,
      roles,
      fetchRoles,
    } = useRoles()

    const { permissions, fetchPermissionsList } = usePermissions()


    const userData = ref({})

    watch(user, () => {
      userData.value = user.value
      userData.value = {
        ...userData.value,
        password: '',
        password_confirmation: '',
        roles: userData.value.roles.find(role => role.name).name,
      }
    })

    const selectRole = role => {
      const roleItem = roles.value.find(item => role === item.name)
      userData.value.permissions = roleItem.permissions.map(item => item.id)
    }

    // remove index from role

    const resetuserData = () => {
      userData.value = JSON.parse(JSON.stringify(user.value))
    }

    const passwordFieldType = ref(null)
    const passwordToggleIcon = computed(() => (passwordFieldType.value === 'password' ? 'EyeIcon' : 'EyeOffIcon'))
    // removing roles pagination
    perPage.value = null
    onMounted(async () => {
      await getUser(props.id)
      await fetchRoles()
      await fetchPermissionsList()
      userData.value = user.value

      const userRole = userData.value.roles.find(role => role.name).name
      userData.value = {
        ...userData.value,
        password: '',
        password_confirmation: '',
        role: userRole,
      }
      selectRole(userRole)
    })


    // generate random password with special characters

    const generatePassword = () => {
      const password = Math.random().toString(36).slice(-10)
      userData.value.password = password
      userData.value.password_confirmation = password
    }

    const onSubmit = async () => {
      console.log(userData.value)
      await updateUser(userData.value)
    }
    const { refFormObserver, getValidationState, resetForm } = formValidation(resetuserData)

    // remove image
    const removeImage = () => {
      userData.value.avatar = ''
    }
    const refInputEl = ref(null)
    const previewEl = ref(null)

    const { inputImageRenderer } = useInputImageRenderer(refInputEl, base64 => {
      userData.value.avatar = base64
    })

    return {
      busy,
      min,
      email,
      roles,
      required,
      userData,
      onSubmit,
      resetForm,
      previewEl,
      permissions,
      refInputEl,
      avatarText,
      selectRole,
      removeImage,
      statusOptions,
      refFormObserver,
      generatePassword,
      getValidationState,
      inputImageRenderer,
      passwordToggleIcon,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
