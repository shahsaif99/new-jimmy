<template>
  <b-modal
    cancel-variant="outline-secondary"
    centered
    :hide-footer="true"
    title="Add Document"
    size="lg"
    no-enforce-focus
    class="modal-add-document-active"
    id="add-document-active"
    @close="$emit('update:add-document-active', false)"
    :visible="addDocumentActive"
    @hide="$emit('update:add-document-active', false)"
  >
    <div>
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
                :name="$t('Document Title')"
                rules="required"
              >
                <b-form-group
                  :label="$t('Document Title')"
                  label-for="oname"
                >
                  <b-form-input
                    v-model="formData.title"
                    :placeholder="$t('Document Title')"
                    :state="getValidationState(validationContext)"
                    trim
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
                :name="$t('Category')"
                rules="required"
              >
                <b-form-group
                  :label="$t('Category')"
                  label-for="cname"
                >
                  <b-form-input
                    v-model="formData.category"
                    :placeholder="$t('Category')"
                    :state="getValidationState(validationContext)"
                    trim
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
                :name="$t('SubCategory')"
                rules="required"
              >
                <b-form-group
                  :label="$t('SubCategory')"
                  label-for="address"
                >
                  <b-form-input
                    v-model="formData.subcategory"
                    :placeholder="$t('SubCategory')"
                    :state="getValidationState(validationContext)"
                    trim
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
                :name="$t('Created Date')"
                rules="required"
              >
                <b-form-group
                  :label="$t('Created Date')"
                  label-for="created_date"
                >
                  <b-form-input
                    type="date"
                    v-model="formData.created_date"
                    placeholder=""
                    trim
                    :state="getValidationState(validationContext)"
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
                :name="$t('Doc No.')"
                rules="required"
              >
                <b-form-group
                  :label="$t('Doc No.')"
                  label-for="registered"
                >
                  <b-form-input
                    trim
                    v-model="formData.document_number"
                    :placeholder="$t('Doc No.')"
                    :state="getValidationState(validationContext)"
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
                :name="$t('Revised Date')"
                rules="required"
              >
                <b-form-group
                  :label="$t('Revised Date')"
                  label-for="revised_date"
                >
                  <b-form-input
                    type="date"
                    trim
                    v-model="formData.revised_date"
                    :placeholder="$t('Revised Date')"
                    :state="getValidationState(validationContext)"
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
                :name="$t('Revision No.')"
                rules="required"
              >
                <b-form-group
                  :label="$t('Revision No.')"
                  label-for="revision_number"
                >
                  <b-form-input
                    trim
                    v-model="formData.revision_number"
                    :placeholder="$t('Revision No.')"
                    :state="getValidationState(validationContext)"
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
                :name="$t('Doc Author')"
                rules="required"
              >
                <b-form-group
                  :label="$t('Doc Author')"
                  label-for="author"
                >
                  <b-form-input
                    trim
                    v-model="formData.author"
                    :placeholder="$t('Doc Author')"
                    :state="getValidationState(validationContext)"
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
                :name="$t('Approved By')"
                rules="required"
              >
                <b-form-group
                  :label="$t('Approved By')"
                  label-for="approved_by"
                >
                  <b-form-input
                    trim
                    v-model="formData.approved_by"
                    :placeholder="$t('Approved By')"
                    :state="getValidationState(validationContext)"
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
                :name="$t('Approved Date')"
                rules="required"
              >
                <b-form-group
                  :label="$t('Approved Date')"
                  label-for="approved_date"
                >
                  <b-form-input
                    type="date"
                    v-model="formData.approved_date"
                    :placeholder="$t('Approved Date')"
                    :state="getValidationState(validationContext)"
                  />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <ckeditor
                :editor="ClassicEditor"
                :config="editorConfig"
                v-model="formData.content"
              />
            </b-col>
          </b-row>

          <div
            class="d-flex align-items-center justify-content-end mt-3"
          >
            <b-button
              variant="primary"
              type="submit"
            >
              <span class="text-nowrap">{{ $t('Submit') }}</span>
            </b-button>
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
  BFormInput,
  BFormInvalidFeedback,
} from 'bootstrap-vue'
import { ref } from '@vue/composition-api'
import { required } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import CKEditor from '@ckeditor/ckeditor5-vue2'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import useDocuments from '@/composables/documents'

export default {
  components: {
    ckeditor: CKEditor.component,
    BCol,
    BRow,
    BForm,
    BButton,
    BFormGroup,
    BFormInput,
    ValidationObserver,
    ValidationProvider,
    BFormInvalidFeedback,
  },
  model: {
    prop: 'addDocumentActive',
    event: 'update:add-document-active',
  },
  props: {
    addDocumentActive: {
      type: Boolean,
      required: true,
    },
  },
  setup(_, { emit }) {
    const {
      refFormObserver, getValidationState, resetForm,
    } = formValidation()

    const initialState = {
      title: '',
      category: '',
      subcategory: '',
      created_date: '',
      document_number: '',
      revised_date: '',
      revision_number: '',
      author: '',
      approved_by: '',
      type: 'procedure',
      content: '',
    }

    const formData = ref({ ...initialState })

    const { storeDocument, respResult } = useDocuments()


    const contentUpdate = data => {
      formData.value.content = data
    }
    const onSubmit = async () => {
      await storeDocument(formData.value)

      if (respResult.value.status === 200) {
        emit('refetch-data')
        emit('update:add-document-active', false)
      }
    }

    const editorConfig = ref({
      removePlugins: ['ImageUpload', 'EasyImage'],
    })

    return {
      formData,
      required,
      onSubmit,
      contentUpdate,
      resetForm,
      editorConfig,
      ClassicEditor,
      refFormObserver,
      getValidationState,

    }
  },
}
</script>
  <style lang="scss">
  #add-document-active___BV_modal_outer_{
      z-index: 1000000 !important;
  }
  .per-page-selector {
      width: 90px;
  }
  :root {
      --ck-z-default: 10555 !important;
      --ck-z-modal: calc(var(--ck-z-default) + 999) !important;
  }
  .ck-editor__editable {
      min-height: 300px;
  }
  </style>

