<template>
  <b-modal
    cancel-variant="outline-secondary"
    centered
    :hide-footer="true"
    :title="$t('Edit Competence Course')"
    size="lg"
    class="modal-edit-project-active"
    id="edit-project-active"
    @close="$emit('update:is-edit-competence-active', false)"
    :visible="isEditCompetenceActive"
    @hide="$emit('update:is-edit-competence-active', false)"
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

          <validation-provider
            #default="validationContext"
            :name="t('Name')"
            rules="required"
          >
            <b-form-group
              :label="t('Name')"
              label-for="projectname"
            >
              <b-form-input
                v-model="formData.name"
                :placeholder="t('Name')"
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
import useSettingsCompetence from '@/composables/settingsCompetence'

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
    prop: 'isEditCompetenceActive',
    event: 'update:is-edit-competence-active',
  },
  props: {
    isEditCompetenceActive: {
      type: Boolean,
      required: true,
    },
    competence: {
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
      updateCompetence,
    } = useSettingsCompetence()

    onMounted(() => {
      if (props.competence) {
        formData.value = { ...props.competence }
      }
    })

    const {
      refFormObserver, getValidationState, resetForm,
    } = formValidation()


    const onSubmit = async () => {
      await updateCompetence(formData.value)
      if (respResult.value.status === 200) {
        emit('refetch-data')
        emit('update:is-edit-competence-active', false)
        resetForm()
      }
    }

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

