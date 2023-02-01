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
                name="Document Title"
                rules="required"
              >
                <b-form-group
                  label="Document Title"
                  label-for="oname"
                >
                  <b-form-input
                    v-model="formData.title"
                    placeholder="Document Title"
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
                name="Category"
                rules="required"
              >
                <b-form-group
                  label="Category"
                  label-for="cname"
                >
                  <b-form-input
                    v-model="formData.category"
                    placeholder="Category"
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
                name="SubCategory"
                rules="required"
              >
                <b-form-group
                  label="SubCategory "
                  label-for="address"
                >
                  <b-form-input
                    v-model="formData.subcategory"
                    placeholder="SubCategory"
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
                name="Created Date"
                rules="required"
              >
                <b-form-group
                  label="Created Date"
                  label-for="created_date"
                >
                  <b-form-input
                    type="date"
                    v-model="formData.created_date"
                    placeholder=""
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
                name="Doc No."
                rules="required"
              >
                <b-form-group
                  label="Doc No."
                  label-for="registered"
                >
                  <b-form-input

                    v-model="formData.document_number"
                    placeholder=""
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
                name="Revised Date"
                rules="required"
              >
                <b-form-group
                  label="Revised Date"
                  label-for="revised_date"
                >
                  <b-form-input
                    type="date"
                    v-model="formData.revised_date"
                    placeholder="Revised Date"
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
                name="Revision No."
                rules="required"
              >
                <b-form-group
                  label="Revision No."
                  label-for="revision_number"
                >
                  <b-form-input
                    v-model="formData.revision_number"
                    placeholder="Revision No."
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
                name="Doc Author"
                rules="required"
              >
                <b-form-group
                  label="Doc Author"
                  label-for="author"
                >
                  <b-form-input
                    v-model="formData.author"
                    placeholder="Doc Author"
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
                name="Approved Date"
                rules="required"
              >
                <b-form-group
                  label="Approved Date"
                  label-for="approved_date"
                >
                  <b-form-input
                    type="date"
                    v-model="formData.approved_date"
                    placeholder="Approved Date"
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
                value="test"
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
  setup() {
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
      content: '<h1>Home Page / About Us Page</h1> <p>Australian College of Vocational Education and Training (ACVET) aims to be a recognised provider of vocational education and training facilitating industry relevant skills and knowledge for students.Our primary purpose is the provision of high-quality vocational training in a supportive and well-resourced learning environment for students to help equip them with industry-relevant skills and qualifications that are most needed in Australia.</p>',
    }


    const formData = ref({ ...initialState })
    const contentUpdate = data => {
      formData.value.content = data
    }
    const onSubmit = async () => {
    //   await updateGeneral(formData.value)
    }

    // console.log(ClassicEditor.builtinPlugins.map(plugin => plugin.pluginName))
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

