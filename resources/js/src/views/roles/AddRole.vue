<template>
  <b-sidebar
    id="add-new-role-sidebar"
    :visible="isAddNewRoleSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-add-new-role-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          {{ t('Add New Role') }}
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
              :ame="t('Role')"
              rules="required"
            >
              <b-form-group
                :label="t('Role')"
                label-for="role"
              >
                <b-form-input
                  id="role"
                  v-model="form.name"
                  autofocus
                  :state="getValidationState(validationContext)"
                  trim
                  :placeholder="t('Enter Role')"
                />

                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>

            <validation-provider
              #default="validationContext"
              :name="t('Permissions')"
              rules="required"
            >
              <b-form-checkbox
                @change="selectAll"
                class="pb-1"
                switch
                inline
              >
                {{ t('Select All Permissions') }}
              </b-form-checkbox>

              <b-form-group
                label-for="status"
                :state="getValidationState(validationContext)"
              >
                <v-select
                  ref="select"
                  multiple
                  placeholder="Select Permissions"
                  v-model="form.permissions"
                  :options="permissions"
                  :reduce="permission => permission.id"
                  :clearable="false"
                  label="name"
                  :value="selected"
                  input-id="title"
                />
                <b-form-invalid-feedback :state="getValidationState(validationContext)">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>

            <!-- Form Actions -->
            <div class="d-flex mt-2">
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                class="mr-2"
                type="submit"
              >
                {{ t('Add Role') }}
              </b-button>
              <b-button
                v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                type="button"
                variant="outline-secondary"
                @click="hide"
              >
                {{ t('Cancel') }}
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
  BSidebar, BForm, BFormGroup, BFormInvalidFeedback, BButton, BOverlay, BFormInput, BFormCheckbox,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref, onMounted, reactive } from '@vue/composition-api'
import { required } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import useRoles from '@/composables/roles'
import usePermissions from '@/composables/permissions'
import { useUtils as useI18nUtils } from '@core/libs/i18n'

export default {
  components: {
    BForm,
    vSelect,
    BButton,
    BSidebar,
    BOverlay,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    ValidationProvider,
    ValidationObserver,
    BFormInvalidFeedback,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: 'isAddNewRoleSidebarActive',
    event: 'update:is-add-new-role-sidebar-active',
  },
  props: {
    isAddNewRoleSidebarActive: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      required,
    }
  },
  setup(props, { emit }) {
    const form = reactive({
      name: '',
      permissions: [],
    })
    const {
      busy,
      storeRole,
      respResult,
    } = useRoles()

    const { t } = useI18nUtils()


    const {
      permissions,
      fetchPermissionsList,
    } = usePermissions()

    onMounted(async () => {
      if (props.isAddNewRoleSidebarActive) {
        await fetchPermissionsList()
      }
    })

    const resetForm = () => {

    }

    const selected = ref([])
    const selectAll = value => {
      if (value) {
        selected.value = permissions.value.map(permission => permission.id)
      } else {
        selected.value = []
      }
      form.permissions = selected.value
    }
    const onSubmit = async () => {
      await storeRole(form)
      if (respResult.value.status === 200) {
        emit('refetch-data')
        emit('update:is-add-new-role-sidebar-active', false)
      }
    }

    const {
      refFormObserver, getValidationState,
    } = formValidation()

    return {
      t,
      busy,
      form,
      selected,
      selectAll,
      permissions,
      onSubmit,
      resetForm,
      refFormObserver,
      getValidationState,
    }
  },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';

#add-new-user-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>
