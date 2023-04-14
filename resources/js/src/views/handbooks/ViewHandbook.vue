<template>
  <div>
    <!-- ManageChapters -->
    <ManageChapters
      :is-manage-chapters-active.sync="isManageChaptersActive"
      v-if="isManageChaptersActive"
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
          variant="primary"
          class="mb-1"
          @click="isManageChaptersActive=true"
        >
          <span class="text-nowrap">Manage Chapters</span>
        </b-button>
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
                    v-for="(chapterHandbooks, chapter, chapterIndex) in handbookChapters"
                    :key="chapterIndex"
                  >
                    <h4><a href="javascript:;">{{ chapterIndex + 1 }} {{ chapter }}</a></h4>
                    <ul class="indexing-table list-unstyled">
                      <li>
                        <!-- <h4><a
                          href="javascript:;"
                        >{{ chapterHandbooks }}</a></h4> -->
                        <ul class="list-unstyled">
                          <li
                            v-for="(handbook, index2) in chapterHandbooks"
                            :key="index2"
                          >
                            <a
                              href="javascript:;"
                              @click="getDocumentData(handbook)"
                            > {{ chapterIndex + 1 }}.{{ index2 + 1 }} {{ handbook.title }}</a>
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
            <div>
              <!-- <h3>{{ documentData.title }}</h3> -->
              <validation-observer
                #default="{ handleSubmit }"
                ref="refFormObserver"
              >
                <b-form
                  @submit.prevent="handleSubmit(onSubmit)"
                  @reset.prevent="resetForm"
                >
                  <b-card>

                    <ckeditor
                      :editor="ClassicEditor"
                      :config="editorConfig"
                      v-model="formData.content"
                    />
                    <div class="mt-2 justify-content-end d-flex">
                      <b-button
                        variant="primary"
                        class="mb-1"
                        type="submit"
                      >
                        <span class="text-nowrap">{{ isDocumentOpen ? 'Update' : 'Add' }} Document</span>
                      </b-button>
                    </div>
                  </b-card>
                </b-form>
              </validation-observer>
            </div>
            <!-- <div v-else>
              <h4 class="p-4">
                {{ $t('To open a document, click on it on the right side.') }}
              </h4>
            </div> -->
          </b-col>
          <b-col
            sm="3"
            class=""
          >
            <div>
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
                  <b-tabs
                    v-model="tabIndex"
                  >

                    <!-- general tab -->
                    <b-tab>

                      <!-- title -->
                      <template #title>
                        <span class="font-weight-bold">{{ $t('Document Details') }}</span>
                      </template>

                      <b-row>
                        <b-col
                          cols="12"
                          md="12"
                        >
                          <validation-provider
                            #default="validationContext"
                            :name="$t('Title')"
                            rules="required"
                          >
                            <b-form-group
                              :label="$t('Title')"
                              label-for="oname"
                            >
                              <b-form-input
                                v-model="formData.title"
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
                          cols="12"
                          md="12"
                        >
                          <validation-provider
                            #default="validationContext"
                            :name="$t('Chapter')"
                            rules="required"
                          >
                            <b-form-group
                              :label="$t('Chapter')"
                              label-for="oname"
                            >
                              <b-form-select
                                :options="chapters"
                                text-field="name"
                                value-field="name"
                                v-model="formData.chapter"
                                :state="getValidationState(validationContext)"
                                trim
                              />
                              <b-form-invalid-feedback>
                                {{ validationContext.errors[0] }}
                              </b-form-invalid-feedback>
                            </b-form-group>
                          </validation-provider>
                        </b-col>

                      </b-row>

                    </b-tab>


                    <!-- change password tab -->
                    <b-tab>
                      <template #title>
                        <span class="font-weight-bold">{{ $t('Handbook Details') }}</span>
                      </template>
                      <b-row v-if="documentData">
                        <b-col
                          sm="6"
                          class="mb-2"
                        >
                          <h6>
                            <strong>{{ $t('Title') }}</strong>
                          </h6>
                          <span>{{ documentData.title }}</span>
                        </b-col>
                        <b-col
                          sm="6"
                          class="mb-2"
                        >
                          <h6>
                            <strong>{{ $t('Document No.') }}</strong>
                          </h6>
                          <span>{{ documentData.document_number }}</span>
                        </b-col>
                        <b-col
                          sm="6"
                          class="mb-2"
                        >
                          <h6>
                            <strong>{{ $t('Created Date') }}</strong>
                          </h6>
                          <span>{{ documentData.created_at }}</span>
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
                        <!-- <b-col cols="12">
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
                    </b-col> -->
                      </b-row>
                    </b-tab>

                  </b-tabs>

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
  BButton, BCard, BCol, BRow, BFormGroup, BFormInput, BCollapse, VBToggle, BForm, BFormInvalidFeedback, BFormSelect, BTab, BTabs,
} from 'bootstrap-vue'
import { ref, onMounted } from '@vue/composition-api'
// eslint-disable-next-line import/no-cycle
import useJwt from '@/auth/jwt/useJwt'
import CKEditor from '@ckeditor/ckeditor5-vue2'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// eslint-disable-next-line import/no-cycle
import useHandbooks from '@/composables/handbooks'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { required } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import html2pdf from 'html2pdf.js'
import i18n from '@/libs/i18n'
import useSettingsChapters from '@/composables/settingsChapters'
import ManageChapters from './ManageChapters.vue'

export default {
  components: {
    // Export,
    BRow,
    BCol,
    BCard,
    BForm,
    BButton,
    BTab,
    BTabs,
    BCollapse,
    BFormSelect,
    BFormInput,
    BFormGroup,
    ManageChapters,
    VuePerfectScrollbar,
    ValidationObserver,
    ValidationProvider,
    BFormInvalidFeedback,
    ckeditor: CKEditor.component,
  },
  directives: {
    'b-toggle': VBToggle,
  },
  setup(_, { root }) {
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
      getHandbook, handbook: documentData, updateHandbookChapter, storeHandbookChapter,
      getHandbookChapters, handbookChapters, filters: handbookFilters,
    } = useHandbooks()

    const {
      fetchChaptersList, chapters, filters: chapterFilters,
    } = useSettingsChapters()

    const initialState = {
      title: '',
      chapter: '',
      content: '',
      handbook_id: root.$route.params.id,
    }
    const formData = ref({ ...initialState })

    const documentContent = ref('')
    const isDocumentOpen = ref(false)
    const isManageChaptersActive = ref(false)
    const editorContent = ref('')
    onMounted(async () => {
      await getHandbook(root.$route.params.id)
      chapterFilters.handbook_id = Number(root.$route.params.id)
      handbookFilters.handbook_id = Number(root.$route.params.id)
      await fetchChaptersList()
      await getHandbookChapters()
    })

    const getDocumentData = data => {
      isDocumentOpen.value = true
      formData.value = { ...data }
    //   editorContent.value = `<table style="border: 1px double #b3b3b3;border-collapse: collapse;border-spacing: 0;height: 100%;width: 100%;"><tbody><tr><td style="border: 1px solid #bfbfbf;padding: 0.3rem 1rem !important;"><span >${i18n.t('Approved Date')}:<br>${documentData.value.approved_date}</span></td><td style="border: 1px solid #bfbfbf;padding: 0.3rem 1rem !important;"><span >${i18n.t('Approved By')}:<br>${documentData.value.approved_by}</span></td><td style="border: 1px solid #bfbfbf;padding: 0.3rem 1rem !important;"><span >${i18n.t('Doc Author')}:<br>${documentData.value.author}</span></td></tr><tr><td style="border: 1px solid #bfbfbf;padding: 0.3rem 1rem !important;"><span >${i18n.t('Revised No')}:<br>${documentData.value.revision_number}</span></td><td style="border: 1px solid #bfbfbf;padding: 0.3rem 1rem !important;"><span >${i18n.t('Revised Date')}:<br>${documentData.value.revised_date}</span></td><td style="border: 1px solid #bfbfbf;padding: 0.3rem 1rem !important;"><span >${i18n.t('Doc No')}:<br>${documentData.value.document_number}</span></td></tr></tbody></table><br/>`
    }

    const onSubmit = async () => {
      if (isDocumentOpen.value) {
        await updateHandbookChapter(formData.value, formData.value.id)
      } else {
        await storeHandbookChapter(formData.value, root.$route.params.id)
      }
      getHandbookChapters()
    }

    const downloadPdf = () => {
      if (isDocumentOpen.value) {
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
    const searchQuery = ref('')
    const search = () => {
      handbookFilters.q = searchQuery.value
      handbookFilters.handbook_id = Number(root.$route.params.id)
      getHandbookChapters()
    }

    const editorConfig = ref({
      removePlugins: ['ImageUpload', 'EasyImage'],
    })

    const tabIndex = ref(0)
    const localStorageData = JSON.parse(useJwt.getUserData())


    return {
      search,
      onSubmit,
      required,
      chapters,
      formData,
      tabIndex,
      downloadPdf,
      isDocumentOpen,
      getDocumentData,
      documentData,
      searchQuery,
      handbookChapters,
      ClassicEditor,
      editorConfig,
      documentContent,
      isExportActive,
      refFormObserver,
      getValidationState,
      addDocumentActive,
      localStorageData,
      isManageChaptersActive,
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
.ck-editor__editable {
      min-height: 300px !important;
  }
</style>
