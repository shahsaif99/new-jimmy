<template>
  <b-modal
    cancel-variant="outline-secondary"
    centered
    :hide-footer="true"
    title="Add Document"
    size="lg"
    class="modal-is-add-document-active"
    id="is-add-document-active"
    @close="$emit('update:is-add-document-active', false)"
    :visible="isAddDocumentActive"
    @hide="$emit('update:is-add-document-active', false)"
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
              cols="12"
              md="12"
            >
              <validation-provider
                #default="validationContext"
                name="Select Project"
                rules="required"
              >
                <b-form-group
                  label="Select Project"
                >
                  <v-select
                    v-model="projectId"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="projects"
                    label="name"
                    :reduce="project => project.id"
                    :state="getValidationState(validationContext)"
                  />
                  <b-form-invalid-feedback :state="getValidationState(validationContext)">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider></b-col>
          </b-row>
          <b-row>
            <b-col
              cols="12"
              md="12"
            >

              <b-form-group
                label="Add Documents/Images"
                label-for="files"
                class="mt-2"
              >
                <validation-provider
                  #default="validationContext"
                  name="Files"
                  rules="required"
                >
                  <b-form-file
                    multiple
                    :state="getValidationState(validationContext)"
                    v-model="files"
                  >
                    <template
                      slot="file-name"
                      slot-scope="{ names }"
                    >
                      <b-badge variant="primary">
                        {{ names[0] }}
                      </b-badge>
                      <b-badge
                        v-if="names.length > 1"
                        variant="primary"
                      >
                        + {{ names.length - 1 }} More files
                      </b-badge>
                    </template>
                  </b-form-file>
                  <b-form-invalid-feedback :state="getValidationState(validationContext)">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>
          <div class="mb-2">
            <b-row>
              <b-col>
                <div
                  class="d-flex align-items-center justify-content-end"
                >
                  <b-button
                    variant="primary"
                    class="mt-1"
                    type="submit"
                  >
                    <span class="text-nowrap">Submit</span>
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
  BButton,
  BFormGroup,
  BFormInvalidFeedback,
  BFormFile,
  BBadge,
} from 'bootstrap-vue'
import { ref, onMounted } from '@vue/composition-api'
import { required } from '@validations'
import vSelect from 'vue-select'
import formValidation from '@core/comp-functions/forms/form-validation'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import useProjects from '@/composables/projects'

export default {
  components: {
    // Export,
    BCol,
    BRow,
    BForm,
    BButton,
    BFormGroup,
    ValidationProvider,
    ValidationObserver,
    BFormInvalidFeedback,
    vSelect,
    BFormFile,
    BBadge,
  },
  model: {
    prop: 'isAddDocumentActive',
    event: 'update:is-add-document-active',
  },
  props: {
    isAddDocumentActive: {
      type: Boolean,
      required: true,
    },
  },
  setup(_, { emit }) {
    const {
      projects,
      respResult,
      uploadDocument,
      fetchProjects,
    } = useProjects()
    const projectId = ref('')
    const files = ref([])

    onMounted(() => {
      fetchProjects()
    })

    const onSubmit = async () => {
      const formData = new FormData()
      for (let index = 0; index < files.value.length; index++) {
        formData.append('files[]', files.value[index])
      }
      await uploadDocument(formData, projectId.value)
      if (respResult.value.status === 200) {
        emit('refetch-data')
        emit('update:is-add-document-active', false)
      }
    }

    const {
      refFormObserver, getValidationState, resetForm,
    } = formValidation()


    return {
      files,
      projectId,
      required,
      onSubmit,
      projects,
      resetForm,
      fetchProjects,
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
    @import '~@core/scss/vue/libs/vue-select.scss';
    </style>

