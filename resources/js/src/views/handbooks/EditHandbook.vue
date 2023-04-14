<template>
  <b-modal
    cancel-variant="outline-secondary"
    centered
    :hide-footer="true"
    title="Edit Document"
    size="lg"
    no-enforce-focus
    class="modal-is-edit-handbook-active"
    id="is-edit-handbook-active"
    @close="$emit('update:is-edit-handbook-active', false)"
    :visible="isEditHandbookActive"
    @hide="$emit('update:is-edit-handbook-active', false)"
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
                :name="$t('Created Date')"
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
                :name="$t('Revised Date')"
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
                :name="$t('Revised By.')"
              >
                <b-form-group
                  :label="$t('Revised By.')"
                  label-for="revised_by"
                >
                  <b-form-input
                    trim
                    v-model="formData.revised_by"
                    :placeholder="$t('Revised By.')"
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
                :name="$t('Scope')"
              >
                <b-form-group
                  :label="$t('Scope')"
                  label-for="scope"
                >
                  <b-form-input
                    trim
                    v-model="formData.scope"
                    :placeholder="$t('Scope')"
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
                :name="$t('Doc Author')"
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
          <!-- <b-row>
            <b-col cols="12">
              <ckeditor
                :editor="ClassicEditor"
                :config="editorConfig"
                v-model="formData.content"
              />
            </b-col>
          </b-row> -->

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
import { ref, onMounted } from '@vue/composition-api'
import { required } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import useHandbooks from '@/composables/handbooks'

export default {
  components: {
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
    prop: 'isEditHandbookActive',
    event: 'update:is-edit-handbook-active',
  },
  props: {
    isEditHandbookActive: {
      type: Boolean,
      required: true,
    },
    handbook: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const {
      refFormObserver, getValidationState, resetForm,
    } = formValidation()

    const initialState = {
      title: '',
      document_number: '',
      scope: '',
      created_by: '',
      created_date: '',
      revised_date: '',
      revised_by: '',
      revision_number: '',
      author: '',
      approved_by: '',
      approved_date: '',
      _method: 'PUT',
    }

    const formData = ref({ ...initialState })

    onMounted(() => {
      if (props.isEditHandbookActive) {
        console.log(props.handbook)
        formData.value = { ...props.handbook }
      }
    })

    const { updateHandbook, respResult } = useHandbooks()


    const contentUpdate = data => {
      formData.value.content = data
    }
    const onSubmit = async () => {

      await updateHandbook(formData.value, props.handbook.id)
      if (respResult.value.status === 200) {
        emit('refetch-data')
        emit('update:is-edit-handbook-active', false)
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
      refFormObserver,
      getValidationState,

    }
  },
}
</script>
<style lang="scss">
#is-edit-handbook-active___BV_modal_outer_{
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

