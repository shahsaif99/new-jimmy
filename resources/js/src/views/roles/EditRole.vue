<template>
  <b-sidebar
    id="edit-role-sidebar"
    :visible="isEditRoleSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-edit-role-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div
        class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1"
      >
        <h5 class="mb-0">
          Edit Role
        </h5>

        <feather-icon
          class="ml-1 cursor-pointer"
          icon="XIcon"
          size="16"
          @click="hide"
        />
      </div>

      <!-- BODY -->
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
          <!-- Form -->
          <b-form
            class="p-2"
            @submit.prevent="handleSubmit(onSubmit)"
            @reset.prevent="resetForm"
          >
            <validation-provider
              #default="validationContext"
              name="Role"
              rules="required"
            >
              <b-form-group
                label="Role"
                label-for="role"
              >
                <b-form-input
                  id="role"
                  v-model="roleData.name"
                  autofocus
                  :state="
                    getValidationState(validationContext)
                  "
                  trim
                  placeholder="Enter Role"
                />

                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>

            <validation-provider
              #default="validationContext"
              name="Permissions"
              rules="required"
            >
              <b-form-checkbox
                @change="selectAll"
                class="pb-1"
                switch
                inline
              >
                Select All Permissions
              </b-form-checkbox>
              <b-form-group
                label-for="status"
                :state="getValidationState(validationContext)"
              >
                <v-select
                  multiple
                  placeholder="Select Permissions"
                  v-model="roleData.permissions"
                  :options="permissions"
                  :clearable="false"
                  :reduce="permission => permission.id"
                  label="name"
                  input-id="title"
                  :value="selected"
                  :close-on-select="false"
                />
                <b-form-invalid-feedback
                  :state="
                    getValidationState(validationContext)
                  "
                >
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>

            <!-- Form Actions -->
            <div class="d-flex mt-2">
              <b-button
                variant="primary"
                class="mr-2"
                type="submit"
              >
                Update Role
              </b-button>
              <b-button
                type="button"
                variant="outline-secondary"
                @click="hide"
              >
                Cancel
              </b-button>
            </div>
          </b-form>
        </b-overlay>
      </validation-observer>
    </template>
  </b-sidebar>
</template>

<script>
import {
  BForm,
  BButton,
  BOverlay,
  BSidebar,
  BFormInput,
  BFormGroup,
  BFormCheckbox,
  BFormInvalidFeedback,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  onMounted, ref,
} from '@vue/composition-api'
import { required } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import useRoles from '@/composables/roles'
import usePermissions from '@/composables/permissions'
import vSelect from 'vue-select'

export default {
  components: {
    vSelect,
    BForm,
    BButton,
    BSidebar,
    BOverlay,
    BFormInput,
    BFormGroup,
    BFormCheckbox,
    BFormInvalidFeedback,
    ValidationProvider,
    ValidationObserver,
  },
  model: {
    prop: 'isEditRoleSidebarActive',
    event: 'update:is-edit-role-sidebar-active',
  },
  props: {
    isEditRoleSidebarActive: {
      type: Boolean,
      required: true,
    },
    roleId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      required,
    }
  },
  setup(props, { emit }) {
    const {
      busy, updateRole, respResult, getRole, roleData,
    } = useRoles()
    const { permissions, fetchPermissionsList } = usePermissions()
    const selected = ref([])

    onMounted(async () => {
      if (props.isEditRoleSidebarActive) {
        await fetchPermissionsList()
        await getRole(props.roleId)
        roleData.value.permissions = props.role.permissions.map(permission => permission.id)
      }
    })

    const selectAll = value => {
      if (value) {
        selected.value = permissions.value.map(permission => permission.id)
      } else {
        selected.value = props.role.permissions
      }
      roleData.value.permissions = selected.value
    }
    const resetForm = () => {}
    const onSubmit = async () => {
      await updateRole(roleData.value)
      if (respResult.value.status === 200) {
        emit('refetch-data')
        emit('update:is-edit-role-sidebar-active', false)
      }
    }

    const { refFormObserver, getValidationState } = formValidation()

    return {
      busy,
      selected,
      roleData,
      onSubmit,
      selectAll,
      resetForm,
      permissions,
      refFormObserver,
      getValidationState,
    }
  },
}
</script>

<style lang="scss">
@import "~@core/scss/vue/libs/vue-select.scss";

#edit-user-sidebar {
    .vs__dropdown-menu {
        max-height: 200px !important;
    }
}
</style>
