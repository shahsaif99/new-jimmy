<template>
  <b-modal
    cancel-variant="outline-secondary"
    centered
    :hide-footer="true"
    :title="t('Add Information')"
    size="lg"
    class="modal-is-dashboard-active"
    id="is-dashboard-active"
    @close="$emit('update:is-dashboard-active', false)"
    :visible="isDashboardActive"
    @hide="$emit('update:is-dashboard-active', false)"
  >

    <validation-observer
      #default="{ handleSubmit }"
      ref="refFormObserver"
    >
      <b-form
        @submit.prevent="handleSubmit(onSubmit)"
        @reset.prevent="resetForm"
      >
        <b-row>
          <b-col
            cols="12"
            md="12"
          >
            <validation-provider
              #default="validationContext"
              :name="t('Information')"
              rules="required"
            >
              <b-form-group
                :label="t('Information')"
                label-for="information"
              >
                <b-form-textarea
                  v-model="content"
                  :placeholder="t('Information')"
                  rows="6"
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
        <b-row>
          <b-col>
            <div
              class="d-flex align-items-center justify-content-end"
            >
              <b-button
                variant="primary"
                class="px-5 mt-2"
                type="submit"
              >
                <span class="text-nowrap">{{ t('Submit') }}</span>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
  </b-modal>
</template>

<script>
import {
  BRow,
  BCol,
  BForm,
  BButton,
  BFormGroup,
  BFormTextarea,
  BFormInvalidFeedback,
} from 'bootstrap-vue'
import { ref } from '@vue/composition-api'
import useInformationBoard from '@/composables/informationBoard'
import { required } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { useUtils as useI18nUtils } from '@core/libs/i18n'

export default {
  components: {
    // Export,
    BCol,
    BRow,
    BForm,
    BButton,
    BFormGroup,
    BFormTextarea,
    ValidationProvider,
    ValidationObserver,
    BFormInvalidFeedback,
  },
  model: {
    prop: 'isDashboardActive',
    event: 'update:is-dashboard-active',
  },
  props: {
    isDashboardActive: {
      type: Boolean,
      required: true,
    },
  },
  setup(_, { emit }) {
    const {
      busy,
      respResult,
      storeInformation,
    } = useInformationBoard()

    const { t } = useI18nUtils()

    const { refFormObserver, getValidationState, resetForm } = formValidation()

    const content = ref('')

    const onSubmit = async () => {
      await storeInformation({ content: content.value })

      if (respResult.value.status === 200) {
        emit('refetch-data')
        content.value = ''
      }
    }

    return {
      t,
      busy,
      content,
      onSubmit,
      required,
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

<style lang="scss">
@import "~@core/scss/vue/libs/vue-select.scss";
</style>
