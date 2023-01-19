<template>
  <b-modal
    cancel-variant="outline-secondary"
    centered
    :hide-footer="true"
    title="Edit Project"
    size="lg"
    class="modal-edit-project-active"
    id="edit-project-active"
    @close="$emit('update:is-edit-project-active', false)"
    :visible="isEditProjectActive"
    @hide="$emit('update:is-edit-project-active', false)"
  >
    <div>
      <validation-observer
        ref="refFormObserver"
        #default="{ handleSubmit }"
      >
        <b-form
          @submit.prevent="handleSubmit(onSubmit)"
          @reset.prevent="resetForm"
        >
          <b-row>
            <b-col
              cols="6"
              md="6"
            >
              <validation-provider
                #default="validationContext"
                :name="t('Project Name')"
                rules="required"
              >
                <b-form-group
                  :label="t('Project Name')"
                  label-for="projectname"
                >
                  <b-form-input
                    v-model="formData.name"
                    :placeholder="t('Project Name')"
                    :state="
                      getValidationState(
                        validationContext
                      )
                    "
                  />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col
              cols="6"
              md="6"
            >
              <validation-provider
                #default="validationContext"
                :name="t('Start Date')"
                rules="required"
              >
                <b-form-group
                  :label="t('Start Date')"
                  label-for="startdate"
                >
                  <b-form-input
                    type="date"
                    v-model="formData.start_date"
                    :state="
                      getValidationState(
                        validationContext
                      )
                    "
                  />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider></b-col>
            <b-col
              cols="6"
              md="6"
            >
              <validation-provider
                #default="validationContext"
                :name="t('End Date')"
                rules="required"
              >
                <b-form-group
                  :label="t('End Date')"
                  label-for="enddate"
                >
                  <b-form-input
                    type="date"
                    v-model="formData.end_date"
                    :state="
                      getValidationState(
                        validationContext
                      )
                    "
                  />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider></b-col>
            <b-col
              cols="6"
              md="6"
            >
              <validation-provider
                #default="validationContext"
                :name="t('Customer')"
                rules="required"
              >
                <b-form-group
                  :label="t('Customer')"
                  label-for="customer"
                >
                  <b-form-input
                    v-model="formData.customer"
                    :placeholder="t('Customer')"
                    :state="
                      getValidationState(
                        validationContext
                      )
                    "
                  />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
          </b-row>
          <div class="mb-2">
            <b-row>
              <b-col>
                <div class="d-flex align-items-center justify-content-end">
                  <b-button
                    variant="primary"
                    class="mt-1"
                    type="submit"
                  >
                    <span class="text-nowrap">{{ t('Update') }}</span>
                  </b-button>
                </div>
              </b-col>
            </b-row>
          </div>
        </b-form>
      </validation-observer>
    </div>
  </b-modal>
</template>

<script>
import {
  BRow,
  BCol,
  BForm,
  BFormInput,
  BButton,
  BFormGroup,
  BFormInvalidFeedback,
} from 'bootstrap-vue'
import { ref, onMounted } from '@vue/composition-api'
import useProjects from '@/composables/projects'
import { required } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { useUtils as useI18nUtils } from '@core/libs/i18n'

export default {
  components: {
    BCol,
    BRow,
    BForm,
    BFormInput,
    BButton,
    BFormGroup,
    ValidationProvider,
    ValidationObserver,
    BFormInvalidFeedback,
  },
  model: {
    prop: 'isEditProjectActive',
    event: 'update:is-edit-project-active',
  },
  props: {
    isEditProjectActive: {
      type: Boolean,
      required: true,
    },
    project: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { t } = useI18nUtils()

    const formData = ref({ })
    const {
      busy,
      respResult,
      updateProject,
    } = useProjects()

    onMounted(() => {
      if (props.project) {
        formData.value = { ...props.project }
      }
    })

    const resetForm = () => {

    }


    const onSubmit = async () => {
      await updateProject(formData.value)
      if (respResult.value.status === 200) {
        emit('refetch-data')
        emit('update:is-edit-project-active', false)
      }
    }
    const {
      refFormObserver, getValidationState,
    } = formValidation()

    return {
      t,
      busy,
      formData,
      required,
      onSubmit,
      resetForm,
      refFormObserver,
      getValidationState,
    }
  },
}
</script>
  <style lang="scss" scoped>
  .per-page-selector {
      width: 90px;
  }
  </style>

