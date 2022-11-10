<template>
  <div>

    <b-modal
      cancel-variant="outline-secondary"
      centered
      :hide-footer="true"
      title="Export"
      @close="$emit('update:is-export-active', false)"
      :visible="isExportActive"
      @hide="$emit('update:is-export-active', false)"
    >

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
              name="name"
              rules="required"
            >
              <b-form-group
                label-for="name"
                :state="getValidationState(validationContext)"
              >
                <b-form-input
                  id="name"
                  v-model="exportForm.name"
                  trim
                  placeholder="Enter File Name"
                />
                <b-form-invalid-feedback :state="getValidationState(validationContext)">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
            <validation-provider
              #default="validationContext"
              name="Select Format"
              rules="required"
            >
              <b-form-group
                label-for="format"
                :state="getValidationState(validationContext)"
              >
                <v-select
                  placeholder="Select Format"
                  v-model="exportForm.format"
                  :options="formats"
                  :clearable="false"
                  input-id="format"
                  :state="getValidationState(validationContext)"
                />

                <b-form-invalid-feedback :state="getValidationState(validationContext)">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>

            <div class="d-flex mt-2">
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                class="mr-2"
                type="submit"
              >
                Export
              </b-button>
              <b-button
                v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                type="button"
                variant="outline-secondary"
                @click="$emit('update:is-export-active', false)"
              >
                Cancel
              </b-button>
            </div>
          </b-form>
        </b-overlay>
      </validation-observer>
    </b-modal>
  </div>

</template>

<script>
import {
  BModal, BForm, BFormInput, BFormGroup, BFormInvalidFeedback, BOverlay, BButton,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { reactive } from '@vue/composition-api'
import { required } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import Ripple from 'vue-ripple-directive'
import useExport from '@/composables//export'

export default {
  components: {
    BButton,
    BModal,
    BForm,
    BOverlay,
    BFormInput,
    BFormGroup,
    vSelect,
    BFormInvalidFeedback,
    // Form Validation
    ValidationProvider,
    ValidationObserver,
  },
  model: {
    prop: 'isExportActive',
    event: 'update:is-export-active',
  },
  directives: {
    Ripple,
  },
  props: {
    isExportActive: {
      type: Boolean,
      required: true,
    },
    filters: {
      type: Object,
      required: true,
    },
    exportUrl: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      required,
    }
  },
  setup(props) {
    const exportForm = reactive({
      name: '',
      format: '',
    })

    const formats = [
      {
        extension: 'xlsx',
        label: 'XLSX',
      },
      {
        extension: 'csv',
        label: 'CSV',
      },
    ]

    const { exportData, respResult, busy } = useExport()

    const fileDownload = (data, name) => {
      const url = window.URL.createObjectURL(new Blob([data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', name)
      document.body.appendChild(link)
      link.click()
      link.remove()
    }

    const onSubmit = async () => {
      const { name, format: { extension } } = exportForm
      await exportData(props.exportUrl, {
        name, extension, ...props.filters,
      })
      fileDownload(respResult.value, `${name}.${extension}`)
    }

    const {
      refFormObserver, getValidationState, resetForm,
    } = formValidation()

    return {
      busy,
      formats,
      exportForm,
      onSubmit,
      refFormObserver,
      getValidationState,
      resetForm,
    }
  },
}
</script>
