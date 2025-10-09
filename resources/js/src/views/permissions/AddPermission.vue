<template>
  <b-sidebar
    id="add-new-permission-sidebar"
    :visible="isAddNewPermissionSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-add-new-permission-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          {{ t('Add New Permission') }}
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
              :name="t('Permission')"
              rules="required"
            >
              <b-form-group
                :label="t('Permission')"
                label-for="permission"
              >
                <b-form-input
                  id="permission"
                  v-model="form.name"
                  autofocus
                  :state="getValidationState(validationContext)"
                  trim
                  :placeholder="t('Enter Permission')"
                />

                <b-form-invalid-feedback>
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
                {{ t('Add Permission') }}
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
  BSidebar, BForm, BFormGroup, BFormInvalidFeedback, BButton, BOverlay, BFormInput,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { reactive } from '@vue/composition-api'
import { required } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import Ripple from 'vue-ripple-directive'
import usePermissions from '@/composables/permissions'
import { useUtils as useI18nUtils } from '@core/libs/i18n'

export default {
  components: {
    BSidebar,
    BOverlay,
    BFormInput,
    BForm,
    BFormGroup,
    BFormInvalidFeedback,
    BButton,
    // Form Validation
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: 'isAddNewPermissionSidebarActive',
    event: 'update:is-add-new-permission-sidebar-active',
  },
  props: {
    isAddNewPermissionSidebarActive: {
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
    })
    const {
      busy,
      storePermission,
      respResult,
    } = usePermissions()

    const { t } = useI18nUtils()


    const resetForm = () => {
      form.name = ''
    }
    const onSubmit = async () => {
      await storePermission(form)
      if (respResult.value.status === 200) {
        emit('refetch-data')
        resetForm()
        // emit('update:is-add-new-permission-sidebar-active', false)
      }
    }

    const {
      refFormObserver, getValidationState,
    } = formValidation()

    return {
      t,
      busy,
      form,
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
