<template>
  <div>
    <div class="row justify-content-between align-items-center mb-2">
      <div class="col-md-3">
        <b-form-group>
          <b-form-input
            type="text"
            placeholder="Search"
          />
        </b-form-group>
      </div>
      <div class="col-auto">
        <b-button
          variant="primary"
          class="mb-1"
          @click="addDocumentActive=true"
        >
          <span class="text-nowrap">Add Handbook Document</span>
        </b-button>
        <addHandbooks
          :add-document-active.sync="addDocumentActive"
          v-if="addDocumentActive"
        />
      </div>
    </div>

    <div class="mb-2">
      <div class="mb-2">
        <b-row>
          <b-col
            sm="3"
            class=""
          >
            <h3>Table Of Contents</h3>
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
                    <h4><a href="javascript:;">{{ index }}</a></h4>
                    <ul class="indexing-table list-unstyled">
                      <li>
                        <h4><a
                          href="javascript:;"
                        >{{ Object.values(mainCategory)[0].subcategory }}</a></h4>
                        <ul class="list-unstyled">
                          <li
                            v-for="(subCategory, index2) in mainCategory"
                            :key="index2"
                          >
                            <a
                              href="javascript:;"
                              @click="getDocument(subCategory)"
                            >{{ subCategory.title }}</a>
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
            <div v-if="isDocumentOpen">
              <h3>{{ documentData.title }}</h3>
              <validation-observer
                #default="{ handleSubmit }"
                ref="refFormObserver"
              >
                <b-form
                  @submit.prevent="handleSubmit(onSubmit)"
                  @reset.prevent="resetForm"
                >
                  <b-card>
                    <b-row v-if="documentData">
                      <b-col
                        cols="3"
                        md="3"
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
                        cols="3"
                        md="3"
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
                        cols="3"
                        md="3"
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
                        cols="3"
                        md="3"
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
                        cols="3"
                        md="3"
                      >
                        <validation-provider
                          #default="validationContext"
                          :name="$t('Doc No.')"
                        >
                          <b-form-group
                            :label="$t('Doc No.')"
                            label-for="registered"
                          >
                            <b-form-input
                              trim
                              v-model="documentData.document_number"
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
                        cols="3"
                        md="3"
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
                        cols="3"
                        md="3"
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
                        cols="3"
                        md="3"
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
                        cols="3"
                        md="3"
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
                        cols="3"
                        md="3"
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
                    <ckeditor
                      :editor="ClassicEditor"
                      :config="editorConfig"
                      v-model="documentData.content"
                    />
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
            <div v-else>
              <h4 class="p-4">
                {{ $t('To open a document, click on it on the right side.') }}
              </h4>
            </div>
          </b-col>
          <b-col
            sm="3"
            class=""
          >
            <div v-if="isDocumentOpen">
              <div class="justify-content-end d-flex mb-1">
                <b-button
                  v-b-toggle:my-collapse
                  class="flat-primary"
                  size="sm"
                >
                  <span class="when-open">Close</span><span class="when-closed">Open</span> Document Details
                </b-button>
              </div>
              <b-card
                no-body
                class="p-1"
              >

                <b-collapse
                  id="my-collapse"
                  visible
                >
                  <b-row>
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
                        <strong>{{ $t('Created Date') }}</strong>
                      </h6>
                      <span>{{ documentData.created_date }}</span>
                    </b-col>
                    <b-col
                      sm="6"
                      class="mb-2"
                    >
                      <h6>
                        <strong>{{ $t('Doc No') }}</strong>
                      </h6>
                      <span>{{ documentData.document_number }}</span>
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
                        <strong>{{ $t('Revised No') }}</strong>
                      </h6>
                      <span>{{ documentData.revision_number }}</span>
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
                        <strong>{{ $t('Doc Author') }}</strong>
                      </h6>
                      <span>{{ documentData.author }}</span>
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
  BButton, BCard, BCol, BRow, BFormGroup, BFormInput, BCollapse, VBToggle, BForm, BFormInvalidFeedback,
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
import addHandbooks from './Add.vue'

export default {
  components: {
    // Export,
    BRow,
    BCol,
    BCard,
    BForm,
    BButton,
    BCollapse,
    BFormInput,
    BFormGroup,
    addHandbooks,
    VuePerfectScrollbar,
    ValidationObserver,
    ValidationProvider,
    BFormInvalidFeedback,
    ckeditor: CKEditor.component,
  },
  directives: {
    'b-toggle': VBToggle,
  },
  setup() {
    const isExportActive = ref(false)
    const addDocumentActive = ref(false)

    const {
      refFormObserver, getValidationState,
    } = formValidation()

    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
      wheelPropagation: false,
      wheelSpeed: 0.3,
    }
    const {
      getDocuments, documentsData, updateDocument, filters,
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
      type: 'handbook',
      content: '',
    }

    const documentData = ref({ ...initialState })
    const isDocumentOpen = ref(false)
    const editorContent = ref('')
    onMounted(async () => {
      filters.type = 'handbook'
      await getDocuments()
    })

    const getDocument = data => {
      isDocumentOpen.value = true
      documentData.value = { ...data }
      editorContent.value = `<table style="border: 1px double #b3b3b3;border-collapse: collapse;border-spacing: 0;height: 100%;width: 100%;"><tbody><tr><td style="border: 1px solid #bfbfbf;padding: 0.3rem 1rem !important;"><span >${i18n.t('Approved Date')}:<br>${documentData.value.approved_date}</span></td><td style="border: 1px solid #bfbfbf;padding: 0.3rem 1rem !important;"><span >${i18n.t('Approved By')}:<br>${documentData.value.approved_by}</span></td><td style="border: 1px solid #bfbfbf;padding: 0.3rem 1rem !important;"><span >${i18n.t('Doc Author')}:<br>${documentData.value.author}</span></td></tr><tr><td style="border: 1px solid #bfbfbf;padding: 0.3rem 1rem !important;"><span >${i18n.t('Revised No')}:<br>${documentData.value.revision_number}</span></td><td style="border: 1px solid #bfbfbf;padding: 0.3rem 1rem !important;"><span >${i18n.t('Revised Date')}:<br>${documentData.value.revised_date}</span></td><td style="border: 1px solid #bfbfbf;padding: 0.3rem 1rem !important;"><span >${i18n.t('Doc No')}:<br>${documentData.value.document_number}</span></td></tr></tbody></table><br/>`
    }

    const onSubmit = async () => {
      await updateDocument(documentData.value)
    }

    const downloadPdf = () => {
      if (isDocumentOpen.value) {
        console.log(editorContent.value)
        const opt = {
          margin: 1,
          filename: `${documentData.value.title}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        }
        const htmlContent = `${editorContent.value}${document.querySelector('.ck-content').innerHTML}`
        html2pdf().set(opt).from(htmlContent).save()
      }
    }


    const editorConfig = ref({
      removePlugins: ['ImageUpload', 'EasyImage'],
    })


    const localStorageData = JSON.parse(useJwt.getUserData())


    return {
      onSubmit,
      required,
      downloadPdf,
      isDocumentOpen,
      getDocument,
      documentData,
      documentsData,
      ClassicEditor,
      editorConfig,
      isExportActive,
      refFormObserver,
      getValidationState,
      addDocumentActive,
      localStorageData,
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
.ck-content p{
    font-size:12px !important;
}
</style>
