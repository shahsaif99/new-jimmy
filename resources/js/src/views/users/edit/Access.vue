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
          <b-card>
            <b-card-title>
              Login Information
            </b-card-title>
            <b-row>
              <b-col
                cols="12"
                md="3"
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
                      :disabled="true"
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
                md="3"
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
                md="3"
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
              <b-col
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
              </b-col>
            </b-row>
          </b-card>
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
                  v-model="formData.role"
                  value-field="name"
                  text-field="name"
                  :options="roles"
                  :key="componentKey"
                  name="radio-options"
                  @change="selectRole"
                  :state="getValidationState(validationContext)"
                />
                <b-form-invalid-feedback :state="getValidationState(validationContext)">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>

            <b-form-group
              label="Permissions"
            >
              <b-form-checkbox-group
                v-model="formData.permissions_list"
                :options="permissions"
                :key="componentKey"
                value-field="id"
                text-field="name"
                stacked
              />
            </b-form-group>

            <div class="d-flex mt-2 justify-content-end">
              <b-button
                variant="primary"
                class="ml-2"
                type="submit"
              >
                Update User
              </b-button>
            </div>
          </b-card>
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
  BCardTitle,
  BInputGroup,
  BFormRadioGroup,
  BFormCheckboxGroup,
  BInputGroupAppend,
  BFormInvalidFeedback,
} from 'bootstrap-vue'
import {
  ref, computed, onMounted, toRef,
} from '@vue/composition-api'
// import vSelect from 'vue-select'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import formValidation from '@core/comp-functions/forms/form-validation'
import useUsers from '@/composables/users'
import {
  required,
} from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import vSelect from 'vue-select'
import usePermissions from '@/composables/permissions'
import useRoles from '@/composables/roles'

export default {
  components: {
    BRow,
    BCard,
    BCol,
    BForm,
    BOverlay,
    vSelect,
    BButton,
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
    userData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const formData = toRef(props, 'userData')
    const statusOptions = [
      { label: 'Active', value: true },
      { label: 'Inactive', value: false },
    ]
    const {
      roles,
      fetchRolesList,
    } = useRoles()

    const {
      busy,
      updateUser,
      respResult,
    } = useUsers()

    const { permissions, fetchPermissionsList } = usePermissions()
    const componentKey = ref(0)

    const selectRole = async role => {
      const roleItem = roles.value.find(item => role === item.name)
      formData.value.permissions_list = roleItem.permissions.map(item => item.id)
    }

    const resetformData = () => {
      //   formData.value = JSON.parse(JSON.stringify(blankFormData))
    }
    const passwordFieldType = ref(null)
    const passwordToggleIcon = computed(() => (passwordFieldType.value === 'password' ? 'EyeIcon' : 'EyeOffIcon'))

    onMounted(async () => {
      await fetchPermissionsList()
      await fetchRolesList()
      const userRole = formData.value.roles.find(role => role.name).name
      formData.value.role = userRole
      if (formData.value.permissions.length > 0) {
        formData.value.permissions_list = formData.value.permissions.map(item => item.id)
      } else {
        selectRole(userRole)
      }
      componentKey.value += 1
    })

    const generatePassword = () => {
      const password = Math.random().toString(36).slice(-10)
      formData.value.password = password
      formData.value.password_confirmation = password
    }

    const onSubmit = async () => {
      await updateUser(formData.value)
      if (respResult.value.status === 200) {
        // emit('refetch-data')
      }
    }
    const { refFormObserver, getValidationState, resetForm } = formValidation(resetformData)

    return {
      busy,
      roles,
      required,
      formData,
      onSubmit,
      resetForm,
      permissions,
      selectRole,
      statusOptions,
      componentKey,
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

