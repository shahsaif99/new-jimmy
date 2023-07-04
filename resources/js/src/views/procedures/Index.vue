<template>
  <div>
    <addProcedure
      @refetch-data="getDocuments"
      :add-document-active.sync="addDocumentActive"
      v-if="addDocumentActive"
    />

    <AddCategory
      :is-add-category-active.sync="isAddCategoryActive"
    />

    <div class="row justify-content-between align-items-center mb-2">
      <div class="col-md-3">
        <div class="justify-content-between d-flex">
          <b-form-input
            type="text"
            v-model="searchQuery"
            placeholder="Search"
            @keyup.enter="search()"
          />
          <b-button
            variant="primary"
            class="mb-1"
            @click="search()"
          >
            <span
              class="text-nowrap"
            >{{ $t('Search...') }}</span>
          </b-button>
        </div>
      </div>

      <div class="col-auto">
        <b-button
          class="mb-1"
          variant="primary"
          @click="isAddCategoryActive=true"
        >
          <span class="text-nowrap">{{ $t('Add Category') }}</span>
        </b-button>
        <b-button
          variant="primary"
          class="mb-1"
          @click="editDocument"
          v-if="isDocumentOpen"
        >
          <span class="text-nowrap">{{ $t('Edit') }}</span>
        </b-button>
        <b-button
          variant="danger"
          class="mb-1"
          @click="deleteDocumentEntry"
          v-if="isDocumentOpen"
        >
          <span class="text-nowrap">{{ $t('Delete') }}</span>
        </b-button>
        <b-button
          variant="primary"
          class="mb-1"
          @click="addDocumentActive=true"
        >
          <span class="text-nowrap">{{ $t('Add Procedure Document') }}</span>
        </b-button>
      </div>
    </div>
    <div
      class="justify-content-end d-flex mb-1"
      v-if="isDocumentOpen"
    >
      <b-button
        v-b-toggle:my-collapse
        class="flat-primary"
        size="sm"
      >
        <span class="when-open">{{ $t('Close') }}</span><span class="when-closed">{{ $t('Open') }}</span> {{ $t('Document Details') }}
      </b-button>
    </div>
    <div class="mb-2">
      <div class="mb-2">
        <b-row>
          <b-col
            sm="3"
            class=""
          >
            <h3>
              {{ $t('Table Of Contents') }}
            </h3>
            <b-card>
              <vue-perfect-scrollbar
                :settings="perfectScrollbarSettings"
                class="indexing-table-scroller scroll-area"
              >
                <ul class="list-unstyled indexing-table">
                  <li
                    v-for="(mainCategory, index) in documentsData"
                    :key="index"
                  >
                    <h4><a href="javascript:;"> {{ getIndex(documentsData, index) }} {{ index }}</a></h4>
                    <ul class="indexing-table list-unstyled">
                      <li
                        v-for="(group, index2) in mainCategory"
                        :key="index2"
                      >
                        <h4>
                          <a
                            href="javascript:;"
                          > {{ getIndex(documentsData, index) }}{{ getIndex(mainCategory, index2) }} {{ index2 }} </a></h4>
                        <ul class="list-unstyled">
                          <li
                            v-for="(subgroup, index3) in group"
                            :key="index3"
                          >
                            <a
                              href="javascript:;"
                              @click="getDocument(subgroup, `${getIndex(documentsData, index)}${getIndex(mainCategory, index)}-${subgroup.document_number }`)"
                            > {{ getIndex(documentsData, index) }}{{ getIndex(mainCategory, index2) }}-{{ subgroup.document_number }}-{{ subgroup.type.charAt(0) }}-{{ subgroup.title }}</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </vue-perfect-scrollbar>
            </b-card>
          </b-col>
          <b-col
            sm="6"
          >
            <h3>{{ documentData.title }}</h3>
            <template v-if="isDocumentOpen">
              <b-card
                no-body
                class="p-1 ck-content"
              >
                <div
                  v-html="editorContent"
                  v-if="documentData.type == 'Procedure'"
                />
                <div v-html="documentData.content" />
              </b-card>
            </template>
            <template v-if="isDocumentEdit && !isDocumentOpen">
              <ckeditor
                :editor="ClassicEditor"
                :config="editorConfig"
                v-model="documentData.content"
              />
            </template>
            <!-- <div v-else>
              <h4 class="p-4">
                {{ $t('To open a document, click on it on the right side.') }}
              </h4>
            </div> -->
          </b-col>
          <b-col
            sm="3"
          >
            <div class="">
              <h3 style="opacity: 0;">
                {{ documentData.title }}
              </h3>
              <div
                v-if="isDocumentEdit && !isDocumentOpen"
              >
                <validation-observer
                  #default="{ handleSubmit }"
                  ref="refFormObserver"
                >
                  <b-form
                    @submit.prevent="handleSubmit(onSubmit)"
                    @reset.prevent="resetForm"
                  >
                    <b-card
                      no-body
                      class="p-1"
                    >
                      <b-row v-if="documentData">
                        <b-col
                          cols="6"
                          md="6"
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
                                v-model="documentData.title"
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
                                v-model="documentData.category"
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
                                v-model="documentData.subcategory"
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
                            :name="$t('Document Type')"
                            rules="required"
                          >
                            <b-form-group
                              :label="$t('Document Type')"
                              label-for="address"
                            >
                              <b-form-select
                                id="type"
                                v-model="documentData.type"
                                :state="getValidationState(validationContext)"
                                :options="['Procedure', 'Document']"
                                :placeholder="$t('Document Type')"
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
                                v-model="documentData.created_date"
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
                            :name="$t('Doc. no')"
                          >
                            <b-form-group
                              :label="$t('Doc. no')"
                              label-for="registered"
                            >
                              <b-form-input
                                trim
                                v-model="documentData.document_number"
                                :placeholder="$t('Doc. no')"
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
                                v-model="documentData.revised_date"
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
                                v-model="documentData.revision_number"
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
                          >
                            <b-form-group
                              :label="$t('Doc Author')"
                              label-for="author"
                            >
                              <b-form-input
                                trim
                                v-model="documentData.author"
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
                                v-model="documentData.approved_by"
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
                                v-model="documentData.approved_date"
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

                      <div class="mt-2 justify-content-end d-flex">
                        <b-button
                          variant="primary"
                          class="mb-1"
                          type="submit"
                        >
                          <span class="text-nowrap">Update Document</span>
                        </b-button>
                      </div>
                    </b-card>
                  </b-form>
                </validation-observer>
              </div>
              <b-card
                no-body
                class="p-1"
                v-if="isDocumentOpen && !isDocumentEdit"
              >
                <b-collapse
                  id="my-collapse"
                  visible
                >
                  <b-row>
                    <b-col
                      sm="12"
                      class="mb-2 justify-content-around d-flex"
                    >
                      <label><input
                        type="radio"
                        name="type"
                        disabled
                        :checked="documentData.type == 'Procedure'"
                        id=""
                      >  {{ $t('Procedure') }}</label>
                      <label><input
                        type="radio"
                        name="type"
                        disabled
                        :checked="documentData.type == 'Document'"
                        id=""
                      >  {{ $t('Document') }}</label>

                    </b-col>
                    <b-col
                      sm="6"
                      class="mb-2"
                    >
                      <h6>
                        <strong>{{ $t('Category') }}</strong>
                      </h6>
                      <span>{{ documentData.category }}</span>
                    </b-col>
                    <b-col
                      sm="6"
                      class="mb-2"
                    >
                      <h6>
                        <strong>{{ $t('SubCategory') }}</strong>
                      </h6>
                      <span>{{ documentData.subcategory }}</span>
                    </b-col>

                    <b-col
                      sm="6"
                      class="mb-2"
                    >
                      <h6>
                        <strong>{{ $t('Document Title') }}</strong>
                      </h6>
                      <span>{{ documentData.title }}</span>
                    </b-col>
                    <b-col
                      sm="6"
                      class="mb-2"
                    >
                      <h6>
                        <strong>{{ $t('Doc. no') }}</strong>
                      </h6>
                      <span>{{ docNumber }}</span>
                    </b-col>
                    <b-col
                      sm="6"
                      class="mb-2"
                    >
                      <h6>
                        <strong>{{ $t('Created Date') }}</strong>
                      </h6>
                      <span>{{ documentData.created_date }}</span>
                    </b-col>
                    <b-col
                      sm="6"
                      class="mb-2"
                    >
                      <h6>
                        <strong>{{ $t('Doc Author') }}</strong>
                      </h6>
                      <span>{{ documentData.author }}</span>
                    </b-col>
                    <b-col
                      sm="6"
                      class="mb-2"
                    >
                      <h6>
                        <strong>{{ $t('Revision No.') }}</strong>
                      </h6>
                      <span>{{ documentData.revision_number }}</span>
                    </b-col>
                    <b-col
                      sm="6"
                      class="mb-2"
                    >
                      <h6>
                        <strong>{{ $t('Revised Date') }}</strong>
                      </h6>
                      <span>{{ documentData.revised_date }}</span>
                    </b-col>
                    <b-col
                      sm="6"
                      class="mb-2"
                    >
                      <h6>
                        <strong>{{ $t('Approved By') }}</strong>
                      </h6>
                      <span>{{ documentData.approved_by }}</span>
                    </b-col>

                    <b-col
                      sm="6"
                      class="mb-2"
                    >
                      <h6>
                        <strong>{{ $t('Approved Date') }}</strong>
                      </h6>
                      <span>{{ documentData.approved_date }}</span>
                    </b-col>
                    <b-col cols="12">
                      <button
                        class="btn btn-primary"
                        @click="downloadPdf"
                      >
                        <feather-icon
                          icon="DownloadIcon"
                          class="mr-1"
                        />
                        {{ $t('Download PDF') }}
                      </button>
                    </b-col>
                  </b-row>
                </b-collapse>
              </b-card>
            </div>
          </b-col>
        </b-row>
      </div>
    </div>

  </div>
</template>

<script>
import {
  BButton, BCard, BCol, BRow, BFormGroup, BFormInput, BCollapse, VBToggle, BForm, BFormInvalidFeedback, BFormRadioGroup, BFormSelect,
  BFormRadio,
} from 'bootstrap-vue'
import { ref, onMounted } from '@vue/composition-api'
// eslint-disable-next-line import/no-cycle
import useJwt from '@/auth/jwt/useJwt'
import CKEditor from '@ckeditor/ckeditor5-vue2'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// eslint-disable-next-line import/no-cycle
import useDocuments from '@/composables/documents'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { required } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import html2pdf from 'html2pdf.js'
import i18n from '@/libs/i18n'
import addProcedure from './Add.vue'
import AddCategory from '../category/add/AddCategory.vue'

export default {
  components: {
    // Export,
    BRow,
    BCol,
    BCard,
    BForm,
    BButton,
    BCollapse,
    BFormSelect,
    BFormInput,
    BFormGroup,
    addProcedure,
    BFormRadio,
    AddCategory,
    BFormRadioGroup,
    VuePerfectScrollbar,
    ValidationObserver,
    ValidationProvider,
    BFormInvalidFeedback,
    ckeditor: CKEditor.component,
  },
  directives: {
    'b-toggle': VBToggle,
  },
  setup(_, context) {
    const isExportActive = ref(false)
    const addDocumentActive = ref(false)
    const isAddCategoryActive = ref(false)

    const {
      refFormObserver, getValidationState,
    } = formValidation()

    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
      wheelPropagation: false,
      wheelSpeed: 0.3,
    }


    const {
      getDocuments, documentsData, updateDocument, filters, deleteDocument,
    } = useDocuments()


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
      approved_date: '',
      type: '',
      content: '',
    }

    const documentData = ref({ ...initialState })
    const isDocumentOpen = ref(false)
    const isDocumentEdit = ref(false)
    const editDocument = () => {
      isDocumentOpen.value = false
      isDocumentEdit.value = true
    }
    const editorContent = ref('')
    const searchQuery = ref('')
    onMounted(async () => {
    //   filters.type = 'Procedure'
      await getDocuments()
    })

    const search = () => {
      filters.q = searchQuery.value
      getDocuments()
    }

    const docNumber = ref('')


    const getDocument = (data, docId) => {
      docNumber.value = docId
      isDocumentOpen.value = true
      isDocumentEdit.value = false
      documentData.value = { ...data }
      editorContent.value = `<table style="
border-collapse: collapse;
border-spacing: 0;
height: 100%;
width: 100%;
">
<tr>
            <td style="border: 1px solid #bfbfbf; padding:0.1rem 0.1rem !important"><span
                ><span style="text-transform: uppercase;font-size: 11px;">${i18n.t('Created Date')}:<br /></span><span style="font-size: 15px;">${documentData.value.created_date}</span></span
            ></td>
            <td style="border: 1px solid #bfbfbf; padding:0.1rem 0.1rem !important"><span
                ><span style="text-transform: uppercase;font-size: 11px;">${i18n.t('Revised Date')}:<br /></span><span style="font-size: 15px;">${documentData.value.revised_date}</span></span
            ></td>
            <td style="border: 1px solid #bfbfbf; padding:0.1rem 0.1rem !important" colspan="2"><span><span style="text-transform: uppercase;font-size: 11px;">${i18n.t('Doc Author')}:<br /></span>${documentData.value.author}</span></td>
                <td rowspan="2" style="border: 1px solid #bfbfbf; padding:0.1rem 0.1rem !important; border-left: none;"><span style="font-size:20px; color:#186784;">adger energi</span></td>
            </tr>

          <tr>
            <td style="border: 1px solid #bfbfbf; padding:0.1rem 0.1rem !important"><span
                ><span style="text-transform: uppercase;font-size: 11px;">${i18n.t('Doc. no')}:<br /></span><span style="font-size: 15px;">${docId}-${documentData.value.type.charAt(0)}</span></span
            ></td>

            <td style="border: 1px solid #bfbfbf; padding:0.1rem 0.1rem !important"><span
                ><span style="text-transform: uppercase;font-size: 11px;">${i18n.t('Revision No.')}:<br /></span>${documentData.value.revision_number}</span
            ></td>
            <td style="border: 1px solid #bfbfbf; padding:0.1rem 0.1rem !important"><span
                ><span style="text-transform: uppercase;font-size: 11px;">${i18n.t('Approved By')}:<br /></span><span style="font-size: 15px;">${documentData.value.approved_by}</span></span
            ></td>
            <td style="border: 1px solid #bfbfbf; padding:0.1rem 0.1rem !important"><span
                ><span style="text-transform: uppercase;font-size: 11px;">${i18n.t('Approved Date')}:<br /></span><span style="font-size: 15px;">${documentData.value.approved_date}</span></span
            ></td>
          </tr>
    <tr>
      <td colspan="5" style="border: 1px solid #bfbfbf; padding:0.1rem 0.1rem !important;border-top: none;" class="text-center">
        <p class="p-0 m-0" ><strong>${documentData.value.title}</strong></p>
      </td>
    </tr>
  </table>`
    }

    const onSubmit = async () => {
      await updateDocument(documentData.value)
      getDocument(documentData.value)
      getDocuments()
    }

    const downloadPdf = () => {
      if (isDocumentOpen.value) {
        const opt = {
          margin: 0.5,
          filename: `${documentData.value.title}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 1 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        }
        const contentHtml = ref('')
        if (isDocumentEdit) {
          contentHtml.value = document.querySelector('.ck-content').innerHTML
        } else {
          contentHtml.value = document.querySelector('.ck-content').innerHTML
        }
        const htmlContent = `${contentHtml.value}`
        html2pdf().set(opt).from(htmlContent).save()
      }
    }

    // get object index number
    const getIndex = (obj, value) => {
      const keys = Object.keys(obj)

      //   with 0 if index is less than 10
      if (keys.indexOf(value) + 1 < 10) {
        return `0${keys.indexOf(value) + 1}`
      }
      return keys.indexOf(value) + 1
    }

    const getIndex2 = (obj, value) => {
      const keys = Object.keys(obj)

      return keys.indexOf(value) + 1
    }

    // getIndexByValue
    const getIndexByValue = (obj, value) => {
      console.log(value)
      //  find value in objecct by subcategory name
      //   const keys = Object.keys(obj)
      // check subcategory value in object and return index
      const index = Object.values(obj).findIndex((item, i) => {
        if (item.subcategory === value) {
          return i
        }
      })
      console.log(index + 1)

      //   with 0 if index is less than 10
      if (index + 1 < 10) {
        return `0${index + 1}`
      }
      return index + 1
    }

    const editorConfig = ref({
      removePlugins: ['ImageUpload', 'EasyImage'],
    })

    const deleteConfirmed = async () => {
      await deleteDocument(documentData.value.id)
      await getDocuments()
      isDocumentOpen.value = false
      documentData.value = {}
    }

    const deleteDocumentEntry = async () => {
      if (isDocumentOpen.value) {
        context.root.$bvModal
          .msgBoxConfirm(i18n.t('Please confirm that you want to delete document.'), {
            title: i18n.t('Please Confirm'),
            size: 'sm',
          })
          .then(value => {
            if (value) {
              deleteConfirmed()
            }
          })
      }
    }


    const localStorageData = JSON.parse(useJwt.getUserData())


    return {
      search,
      onSubmit,
      required,
      getIndex2,
      searchQuery,
      docNumber,
      getIndex,
      getDocuments,
      editDocument,
      downloadPdf,
      isDocumentEdit,
      isDocumentOpen,
      getDocument,
      editorContent,
      documentData,
      documentsData,
      getIndexByValue,
      ClassicEditor,
      editorConfig,
      isExportActive,
      deleteDocumentEntry,
      refFormObserver,
      getValidationState,
      addDocumentActive,
      localStorageData,
      isAddCategoryActive,
      perfectScrollbarSettings,
    }
  },
}
</script>

  <style lang="scss" scoped>

  .collapsed > .when-open,
  .not-collapsed > .when-closed {
    display: none;
  }
  .ck.ck-editor{
      z-index: 100;
  }
      .per-page-selector {
          width: 90px;
      }
      .indexing-table-scroller {
          height: 500px;
          .indexing-table {
              li {
                  h4 {
                      margin-bottom: 0px;
                      font-size: 14px;
                  }
                  a {
                      padding: 5px;
                      border-radius: 5px;
                      color: #333;
                      display: block;
                      font-size: 13px;
                      &:hover {
                          color: #FFF;
                          background-image: linear-gradient(118deg, #7367f0, rgba(115, 103, 240, 0.7))
                      }
                  }
                  ul {
                      padding-left: 20px;
                  }
              }
          }
      }
  </style>

  <style>
  /* .ck-content p{
      font-size:12px !important;
  } */
  </style>
