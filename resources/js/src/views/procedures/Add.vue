<template>
  <b-modal cancel-variant="outline-secondary" centered :hide-footer="true" title="Add Document" size="lg"
    no-enforce-focus class="modal-add-document-active" id="add-document-active"
    @close="$emit('update:add-document-active', false)" :visible="addDocumentActive"
    @hide="$emit('update:add-document-active', false)">
    <div>
      <validation-observer #default="{ handleSubmit }" ref="refFormObserver">
        <b-form @submit.prevent="handleSubmit(onSubmit)" @reset.prevent="resetForm">
          <b-row>

            <b-col sm="12" class="my-2 justify-content-around d-flex">
              <label><input v-model="formData.type" value="Procedure" type="radio" name="type"
                  :checked="formData.type == 'Procedure'" id=""> {{ $t('Procedure') }}</label>
              <label><input v-model="formData.type" value="Document" type="radio" name="type"
                  :checked="formData.type == 'Document'" id=""> {{ $t('Document') }}</label>

            </b-col>

            <b-col cols="12" md="12">
              <validation-provider #default="validationContext" :name="$t('Document Title')" rules="required">
                <b-form-group :label="$t('Document Title')" label-for="oname">
                  <b-form-input v-model="formData.title" :placeholder="$t('Document Title')"
                    :state="getValidationState(validationContext)" trim />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col cols="6" md="6">
              <validation-provider #default="validationContext" :name="$t('Category')" rules="required">
                <b-form-group :label="$t('Category')" label-for="cname">
                  <b-form-select id="category" v-model="formData.category_id"
                    :state="getValidationState(validationContext)" trim value-field="id" text-field="name"
                    @change="showSubCategories" :options="categories" :placeholder="$t('Category')" />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col cols="6" md="6">
              <validation-provider #default="validationContext" :name="$t('SubCategory')" rules="required">
                <b-form-group :label="$t('SubCategory')" label-for="address">
                  <b-form-select id="subcategory" v-model="formData.subcategory_id"
                    :state="getValidationState(validationContext)" trim value-field="id" text-field="name"
                    :options="subcategories" :placeholder="$t('SubCategory')" />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- <b-col
              cols="6"
              md="6"
            >
              <validation-provider
                #default="validationContext"
                :name="$t('Document Type')"
                rules="required"
              >
                <b-form-group
                  :label="$t('Document Type')"
                  label-for="address"
                >
                  <b-form-select
                    id="type"
                    v-model="formData.type"
                    :state="getValidationState(validationContext)"
                    :options="['Procedure', 'Document']"
                    :placeholder="$t('Document Type')"
                  />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col> -->

            <b-col cols="6" md="6">
              <validation-provider #default="validationContext" :name="$t('Created Date')" rules="required">
                <b-form-group :label="$t('Created Date')" label-for="created_date">
                  <b-form-input type="date" v-model="formData.created_date" placeholder="" trim
                    :state="getValidationState(validationContext)" />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col cols="6" md="6">
              <validation-provider #default="validationContext" :name="$t('Doc. no')" rules="required">
                <b-form-group :label="$t('Doc. no')" label-for="registered">
                  <b-form-input trim v-model="formData.document_number" :placeholder="$t('Doc. no')"
                    :state="getValidationState(validationContext)" type="number" pattern="[0-9]" />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col cols="6" md="6">
              <validation-provider #default="validationContext" :name="$t('Revised Date')" rules="required">
                <b-form-group :label="$t('Revised Date')" label-for="revised_date">
                  <b-form-input type="date" trim v-model="formData.revised_date" :placeholder="$t('Revised Date')"
                    :state="getValidationState(validationContext)" />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <!-- <b-col
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
                    type="number"
                    pattern="[0-9]"
                  />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col> -->

            <b-col cols="6" md="6">
              <validation-provider #default="validationContext" :name="$t('Revision No.')">
                <b-form-group :label="$t('Revision No.')" label-for="revision_number">
                  <div style="gap: 10px;" class="d-flex">
                    <div class="position-realtive d-flex justify-items-center align-items-center flex-column"
                      v-for="(digit, index) in digits" :key="index">
                      <i class="bi bi-caret-up-fill cursor-pointer" style="font-size: 20px;height: 24px"
                        @click="increaseRevision(index)"></i>
                      <div class="d-flex align-items-end position-relative">
                        <b-form-input v-model="digits[index]" type="tel" maxlength="1"
                          style="width: 30px;;padding: 0px 8px;text-align: center;" />
                        <span v-if="(index + 1) < digits.length" class="revision_dot"></span>
                      </div>
                      <i @click="decreaseRevision(index)" class="bi bi-caret-down-fill cursor-pointer"
                        style="font-size: 20px;height: 20px;"></i>
                    </div>
                  </div>
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <b-col cols="6" md="6">
              <validation-provider #default="validationContext" :name="$t('Doc Author')" rules="required">
                <b-form-group :label="$t('Doc Author')" label-for="author">
                  <b-form-input trim v-model="formData.author" :placeholder="$t('Doc Author')"
                    :state="getValidationState(validationContext)" />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider></b-col>

            <b-col cols="6" md="6">
              <validation-provider #default="validationContext" :name="$t('Status')" rules="required">
                <b-form-group :label="$t('Status')" label-for="address">
                  <b-form-select id="type" v-model="formData.status" :state="getValidationState(validationContext)"
                    :options="['Published', 'Draft']" :placeholder="$t('Status')" />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <b-col cols="6" md="6">
              <validation-provider #default="validationContext" :name="$t('Approved By')" rules="required">
                <b-form-group :label="$t('Approved By')" label-for="approved_by">
                  <b-form-input trim v-model="formData.approved_by" :placeholder="$t('Approved By')"
                    :state="getValidationState(validationContext)" />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col cols="6" md="6">
              <validation-provider #default="validationContext" :name="$t('Approved Date')" rules="required">
                <b-form-group :label="$t('Approved Date')" label-for="approved_date">
                  <b-form-input type="date" v-model="formData.approved_date" :placeholder="$t('Approved Date')"
                    :state="getValidationState(validationContext)" />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <b-col cols="12" md="12">
              <validation-provider #default="validationContext" :name="$t('Tags')">
                <b-form-group :label="$t('Tags')" label-for="oname">


                  <v-select v-model="formData.tag_ids" :getOptionLabel="(item) => item.name" placeholder="Add tags"
                    :options="tags.data" multiple />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="editor" cols="12">
              <!-- <ckeditor
             
                :editor="ClassicEditor"
                :config="editorConfig"
                v-model="formData.content"
              /> -->

              <div style="width: 100%" ref="rteref"><!--Don't change Inner HTML because VUE will delete RTE UI--></div>
            </b-col>
          </b-row>

          <div class="d-flex align-items-center justify-content-end mt-3">
            <b-button variant="primary" type="submit">
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
  BFormSelect,
  BFormInput,
  BFormInvalidFeedback,
} from 'bootstrap-vue'
import { ref, onMounted, watch, computed } from '@vue/composition-api'
import { required } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import CKEditor from '@ckeditor/ckeditor5-vue2'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import useDocuments from '@/composables/documents'
import useCategories from '@/composables/category'
import useTags from "@/composables/tags";
import vSelect from 'vue-select'
export default {
  components: {
    ckeditor: CKEditor.component,
    BCol,
    BRow,
    BForm,
    BButton,
    BFormGroup,
    BFormInput,
    BFormSelect,
    ValidationObserver,
    ValidationProvider,
    BFormInvalidFeedback,
    vSelect
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

    const {
      fetchCategories, categories, fetchSubCategories, subcategories,
    } = useCategories()
    const initialState = {
      title: '',
      category_id: '',
      subcategory_id: '',
      created_date: '',
      document_number: '',
      revised_date: '',
      revision_number: '',
      author: '',
      approved_by: '',
      type: '',
      content: '',
      tag_ids: [],
      status: ''
    }

    const rteref = ref(null);
    let rte = ref(null)

    const formData = ref({ ...initialState })

    const { storeDocument, respResult } = useDocuments()

    const { tags } = useTags();

    onMounted(async () => {
      await fetchCategories()
      if (rteref.value) {

        const editor1cfg = {}
        editor1cfg.toolbar = "mytoolbar";
        editor1cfg.toolbar_mytoolbar = "{bold,italic}|{fontname,fontsize}|{forecolor,backcolor}"
          + " #{paragraphs:toggle,fontname:toggle,inlinestyle,lineheight}"
          + "/{insertlink,unlink,insertblockquote,insertemoji,insertchars,inserttable,insertimage,insertvideo,insertdocument}" + "#{undo,redo,fullscreenenter,fullscreenexit,togglemore }"

        rte.value = new RichTextEditor(rteref.value, editor1cfg);
      }
    })

    const showSubCategories = id => {
      fetchSubCategories(id)
      // formData.value.category_id = categories.value.find(item => item.id === id)
    }


    const contentUpdate = data => {
      formData.value.content = data
    }
    const onSubmit = async () => {

      formData.value.content = rte.value.getHTMLCode()

      await storeDocument(formData.value)

      if (respResult.value.status === 200) {
        emit('refetch-data')
        emit('update:add-document-active', false)
      }
    }

    const editorConfig = ref({
      removePlugins: ['ImageUpload', 'EasyImage'],
    })

    const digits = ref([0, 0, 0])

    const increaseRevision = (index) => {
      if (digits.value[index] < 9) {
        digits.value.splice(index, 1, digits.value[index] + 1);
      }
    }
    const decreaseRevision = (index) => {
      if (digits.value[index] > 0) {
        digits.value.splice(index, 1, digits.value[index] - 1);
      }
    }

    const revision_number = computed(() => {
      return Number(digits.value.join(''));
    });

    const setRevisionNumber = (value) => {
      const strValue = value.toString().padStart(3, '0');
      digits.value = strValue.split('').map(Number);
    };

    watch(revision_number, () => {
      formData.value.revision_number = revision_number.value
    })

    return {
      formData,
      required,
      onSubmit,
      categories,
      resetForm,
      showSubCategories,
      subcategories,
      editorConfig,
      contentUpdate,
      ClassicEditor,
      refFormObserver,
      getValidationState,
      tags,
      digits,
      increaseRevision,
      decreaseRevision,
      setRevisionNumber,
      rteref
    }
  },
}
</script>
<style lang="scss">
#add-document-active___BV_modal_outer_ {
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

.editor {
  .ck .ck-toolbar__items {
    z-index: 1 !important;
  }
}

.rte-modern.rte-desktop.rte-toolbar-default {
  min-width: 0 !important;
}

.revision_dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #6e6b7b;
  position: absolute;
  bottom: 0px;
  right: -7px;
}
</style>
