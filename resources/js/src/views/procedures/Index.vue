<template>
  <div >
    <addProcedure
      @refetch-data="getDocuments"
      :add-document-active.sync="addDocumentActive"
      v-if="addDocumentActive"
    />

    <AddCategory
      :is-add-category-active.sync="isAddCategoryActive"
    />
    <b-overlay
      id="overlay-background"
      variant="transparent"
      rounded="sm"
            >
            <b-card>
                <div class="d-flex  w-100">
                  <div style="gap: 5px;" class="w-100 d-flex">
                    <v-select :model-value="searchQuery" class="select-search" ref="searchSelectRef" :placeholder="searchQuery !== '' ? searchQuery : 'Search documents...' "  style="width:100%" :key="searchQuery.length " :getOptionLabel="(item) => item.title"  :filterable="false" :options="formattedOptions" @search="onSearch">
                      <template slot="no-options">
                        type to search documents...
                      </template>
                      <template v-slot:no-options="{ search, searching }">
                        <template v-if="searching">
                          No results found for <em>{{ search }}</em
                          >.
                        </template>
                        <em v-else style="opacity: 0.5">Start typing to search for a documents.</em>
                      </template>
                      <template  #option="{ documentsFlat,  }">
                          <div @click="selectSearchDocument(subItem,subItem.docId)" class="d-flex w-100 justify-content-between py-1" v-for="subItem in documentsFlat" :key="subItem.id">
                          <div style="width: 300px;" class="d-block text-truncate" v-html="boldContent(subItem.title)"></div> 
                            <div>
                              <b-badge pill v-if="subItem.title_hits > 0" variant="warning"> {{subItem.title_hits}} TREFF | TITTEL  </b-badge>
                              <b-badge pill v-if="subItem.content_hits > 0"  variant="primary">{{ subItem.content_hits }} TITTLE</b-badge>
                            </div>
                          </div>
                      </template>
                    </v-select>
                    <v-select  v-model="filters.tags" :getOptionLabel="(item) => item.label"  placeholder="Filters: tags"  :reduce="option => option.value" :options="tags.options" multiple style="width:250px" />
                     
    
                  </div>
                  <div class="col-auto">
                    <b-button
                      variant="primary"
                      @click="generatePDF(documentData)"
                    >
                      <span class="text-nowrap">{{ $t('Doc. reg') }}</span>
                    </b-button>
                    <b-button
                      variant="primary"
                      @click="editDocument"
                      v-if="isDocumentOpen"
                    >
                      <span class="text-nowrap">{{ $t('Edit') }}</span>
                    </b-button>
                    <b-button
                      variant="danger"
                      @click="deleteDocumentEntry"
                      v-if="isDocumentOpen"
                    >
                      <span class="text-nowrap">{{ $t('Delete') }}</span>
                    </b-button>
                    <b-button
                      variant="primary"
                      @click="addDocumentActive=true"
                    >
                      <span class="text-nowrap">{{ $t('Add') }}</span>
                    </b-button>
                  </div>
                </div>
            </b-card>
    </b-overlay>
    <div
      class="justify-content-end d-flex mb-1"
      v-if="isDocumentOpen || isDocumentEdit"
    >
      <b-button
        v-b-toggle:my-collapse
        class="flat-primary"
        size="sm"
      >
        <span class="when-open">{{ $t('Close') }}</span><span class="when-closed">{{ $t('Open') }}</span> {{ $t('Document Details') }}
      </b-button>
    </div>

    <div  >
      <div  >
        <div class="split" :class="!isDocumentOpen && !isDocumentEdit ? 'show-gutter':''" >
          <div
            id="split-0"
     
          >
            <h3>
              {{ $t('Table Of Contents') }}
            </h3>
            <b-card style="min-height: 60vh;">
              <vue-perfect-scrollbar
                :settings="perfectScrollbarSettings"
                class="indexing-table-scroller scroll-area"
                v-if="processedDocumentsData.length > 0"
              >
                <ul class="list-unstyled indexing-table">
                  <li
                    v-for="(document, key) in processedDocumentsData"
                    :key="key+document.title"
                  >
                    <h4>
                      <a
                      style="font-weight: 700; font-size: 16px;"
                      class="d-block text-truncate"
                      >
                        {{ document.title }} 
                      </a>
                    </h4>
                    <ul class="list-unstyled">
                      <li
                        v-for="(subDocument, subIndex) in document.documents"
                        :key="subIndex"
                      >
                        <h4>
                          <a
                           style="font-weight: 700; font-size: 16px;"
                          >
                            {{ subDocument.title }}
                          </a>

                        </h4>
                        <ul class="list-unstyled">
                          <li
                            v-for="(subSubDocument, subSubIndex) in subDocument.documents"
                            :key="subSubIndex"
                          >
                            <h4>
                              <a
                               style="font-weight: 400; font-size: 16px;"
                                @click="getDocument(subSubDocument, subSubDocument.docId)"
                                 class="d-block text-truncate"
                              >
                              {{ subSubDocument.docId }}-{{ subSubDocument.title }}
                              </a>
   
                            </h4>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </vue-perfect-scrollbar>
              <div v-else>No Documents or Procedures found</div>
            </b-card>
          </div>

          <div
             id="split-1"
          >
            <b-tooltip target="tooltip-target-1" triggers="hover">
              {{ documentData.title }}
            </b-tooltip>
            <h3 class="d-block text-truncate" id="tooltip-target-1">{{ documentData.title }}</h3>
            <template v-if="isDocumentOpen">
              <b-card
              
                no-body
                class="p-1 ck-content"
              >
                <div
                  v-html="editorContent"
                  v-if="documentData.type == 'Procedure'"
                />
                <div v-html="highlightedContent(documentData.content)" />
              </b-card>
            </template>
            <template v-if="isDocumentEdit && !isDocumentOpen">
              <!-- <ckeditor
                :editor="ClassicEditor"
                :config="editorConfig"
                v-model="documentData.content"
              /> -->
              <!-- <div style="width: 100%" id="rteref" ref="rteref"></div> -->
             <textarea v-if="isDocumentEdit && !isDocumentOpen" v-model="documentData.content" style="width: 100%" id="rteref" ref="rteref" /> 
            </template>
            <!-- <div v-else>
              <h4 class="p-4">
                {{ $t('To open a document, click on it on the right side.') }}
              </h4>
            </div> -->
          </div>

          <div
             id="split-2"
          >
            <div class="">
              <h3  class="d-block text-truncate" style="opacity: 0;">
                {{ documentData.title }}
              </h3>

              
              
              <b-collapse
              id="my-collapse"
              visible
            >
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
                      <b-row>
                        <b-col
                      sm="12"
                      class="justify-content-start d-flex"
                    >  

                        <i
                                class="bi bi-x cursor-pointer"
                                style="font-size: 20px;height: 24px"
                                       @click="cancelEditDocument"
                            ></i>
                  </b-col>
                      </b-row>

                      <b-row v-if="documentData">

                        <b-col
                      sm="12"
                      class="mb-2 justify-content-around d-flex"
                    >
                      <label><input
                        v-model="documentData.type"
                        value="Procedure"
                        type="radio"
                        name="type"
                        :checked="documentData.type == 'Procedure'"
                        id=""
                      >  {{ $t('Procedure') }}</label>
                      <label><input
                        v-model="documentData.type"
                         value="Document"
                        type="radio"
                        name="type"
                        :checked="documentData.type == 'Document'"
                        id=""
                      >  {{ $t('Document') }}</label>

                    </b-col>

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
                  <b-form-select
                    id="category"
                    v-model="documentData.category_id"
                    :state="getValidationState(validationContext)"
                    trim
                    value-field="id"
                    text-field="name"
                    @change="showSubCategories"
                    :options="categories"
                    :placeholder="$t('Category')"
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
                :name="$t('SubCategory')"
                rules="required"
              >
                <b-form-group
                  :label="$t('SubCategory')"
                  label-for="address"
                >
                  <b-form-select
                    id="subcategory"
                    v-model="documentData.subcategory_id"
                    :state="getValidationState(validationContext)"
                    trim
                    value-field="id"
                    text-field="name"
                    :options="subcategories"
                    :placeholder="$t('SubCategory')"
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
                        </b-col> -->


                        <b-col
                          cols="6"
                          md="6"
                        >
                          <validation-provider
                            #default="validationContext"
                            :name="$t('Status')"
                            rules="required"
                          >
                            <b-form-group
                              :label="$t('Status')"
                              label-for="address"
                            >
                              <b-form-select
                                id="type"
                                v-model="documentData.type"
                                :state="getValidationState(validationContext)"
                                :options="['Published', 'Draft']"
                                :placeholder="$t('Status')"
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
                          cols="12"
                          md="12"
                        >
                          <p>Tags:</p>

                          <v-select  v-model="documentData.tag_ids" :getOptionLabel="(item) => item.name"  placeholder="Add tags"   :options="tags.data" multiple  />
                        </b-col>
                     
                      </b-row>

                      <div class="mt-2 justify-content-end d-flex">
                        <b-button
                          variant="primary"
                          class="mb-1"
                        
                        >
                          <span class="text-nowrap">Send for approval</span>
                        </b-button>
                        <b-button
                          variant="primary"
                          class="mb-1 ml-2"
                          type="submit"
                        >
                          <span class="text-nowrap">Update Document</span>
                        </b-button>
                      </div>
                    </b-card>
                  </b-form>
                </validation-observer>
              </div>
              </b-collapse>
              
            
                <b-collapse
              
                  id="my-collapse"
                  visible
                >
                <b-card
                no-body
                class="p-1"
               v-if="isDocumentOpen && !isDocumentEdit"
              >
                  <b-row  >
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
                      sm="12"
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
                        <strong>{{ $t('Category') }}</strong>
                      </h6>
                      <span>{{ documentData.category.name }}</span>
                    </b-col>
                    <b-col
                      sm="6"
                      class="mb-2"
                    >
                      <h6>
                        <strong>{{ $t('SubCategory') }}</strong>
                      </h6>
                      <span>{{ documentData.subcategory.name }}</span>
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
                        <strong>{{ $t('Doc. no') }}</strong>
                      </h6>
                      <span>{{ documentData.docId }}</span>
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
                        <strong>{{ $t('Revision No.') }}</strong>
                      </h6>
                      <span>{{ revisionNumberFormatter(documentData.revision_number) }}</span>
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
                        <strong>{{ $t('Status') }}</strong>
                      </h6>
                      <span>Published</span>
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
                  
                    <b-col
                      sm="6"
                      class="mb-2"
                    >
                      <h6>
                        <strong>{{ $t('Approved By') }}</strong>
                      </h6>
                      <span>{{ documentData.approved_by }}</span>
                    </b-col>

                
                    <b-col cols="12">
                      <strong>{{ $t('Tags') }}</strong>
                      <div style="gap:5px" class="d-flex align-item-center text-capitalize mt-1">
                            <p style="background: #f4f4f4; padding: 5px; border-radius: 3px"  v-for="(item,index) in documentData.tag_ids" :key="index">
                              {{ item.name }}
                            </p>
                          </div>
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
                </b-card>
                </b-collapse>
     
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  BButton, BCard, BCol, BRow, BFormGroup, BFormInput, BCollapse, VBToggle, BForm, BFormInvalidFeedback, BFormRadioGroup, BFormSelect,
  BFormRadio,BDropdown,BDropdownItem,BOverlay,BBadge,BTooltip
} from 'bootstrap-vue'
import Split from 'split.js'
import { ref, onMounted, computed,watch } from '@vue/composition-api'
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
import ManageDialog from "@/views/procedures/dialogs/ManageTags.vue";
import useCategories from '@/composables/category'
import useTags from "@/composables/tags";
import vSelect from 'vue-select'
import { debounce } from 'lodash';
import router from '@/router'

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
    vSelect,
    BDropdown,BDropdownItem,BOverlay,BBadge,ManageDialog,BTooltip
  },
  directives: {
    'b-toggle': VBToggle,
  },
  setup(_, context) {
    const isExportActive = ref(false)
    const addDocumentActive = ref(false)
    const isAddCategoryActive = ref(false)

    const searchSelectRef = ref(null)

    const {
      refFormObserver, getValidationState,
    } = formValidation()

    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
      wheelPropagation: false,
      wheelSpeed: 0.3,
    }


    const {
      getDocuments, documentsData, updateDocument, filters, deleteDocument, searchDocumentOptions,searchDocuments,generatePDF,filterDocuments
    } = useDocuments()

    const {
      fetchCategories, categories, fetchSubCategories, subcategories,
    } = useCategories()

    const {  tagDialog, getTags,tags } =
    useTags();


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
      status: ''
    }


    const digits = ref([0,0,0])

    const increaseRevision = (index) => {
      if(digits.value[index] < 9 ){
        digits.value.splice(index, 1, digits.value[index] + 1);
      }
    }
    const decreaseRevision = (index) => {
      if(digits.value[index] > 0 ){
        digits.value.splice(index, 1, digits.value[index] - 1);
      }
    }

    const revision_number = computed(() => {
      return Number(digits.value.join(''));
    });

    const processedDocumentsData = computed(() =>{
      if(documentsData.value.length === 0 || documentsData.value.length === undefined) return []

      return documentsData.value.filter(category => {
      if (category.title !== "0-Unknown") {
        category.documents = Object.fromEntries(
          Object.entries(category.documents).filter(([key, value]) => key !== "0-Unknown")
        );
        return true;
      }
      return false;
    });
    
    }) 

    const setRevisionNumber = (value) => {
    if(value === null) return
      const strValue = value.toString().padStart(3, '0');
      digits.value = strValue.split('').map(Number);
    };

    watch(revision_number, () => {
      documentData.value.revision_number = revision_number.value
    })

    watch(()=>filters, (newVal) => {
        filterDocuments();
    },{deep:true})
   
    const documentData = ref({ ...initialState })
    const isDocumentOpen = ref(false)
    const isDocumentEdit = ref(false)
    const editDocument = () => {
      isDocumentOpen.value = false
      isDocumentEdit.value = true
      setTimeout(() => {
      if(rteref.value){
        rte.value = new RichTextEditor(rteref.value,editor1cfg);
      }
      }, 50);
    }
    const cancelEditDocument = () => {
      isDocumentOpen.value = true
      isDocumentEdit.value = false
      const editorRef = document.querySelector(".richtexteditor")
      if(editorRef){
        editorRef.remove()
      }
    }
    const editorContent = ref('')
    const searchQuery = ref('')

    const rteref = ref(null);
    let rte = ref(null)

    const editor1cfg = {}
        editor1cfg.toolbar = "mytoolbar";

        editor1cfg.toolbar_mytoolbar = "{bold,italic}|{fontname,fontsize}|{forecolor,backcolor}"
        + " #{paragraphs:toggle,fontname:toggle,inlinestyle,lineheight}"
		+ "/{insertlink,unlink,insertblockquote,insertemoji,insertchars,inserttable,insertimage,insertvideo,insertdocument}" + "#{undo,redo,fullscreenenter,fullscreenexit,togglemore }"

    onMounted(async () => {
    //   filters.type = 'Procedure'
      await getDocuments()
      getTags()
      Split(['#split-0', '#split-1', '#split-2'],{
        gutterSize: 7,
        minSize: 400,
      })
      if(router.history.current.query.id){
        function findDocumentById(data, id) {
            for (const item of data) {
                // Check if the item contains 'documents' as an object with keys
                if (item.documents) {
                    for (const key in item.documents) {
                        const documentGroup = item.documents[key];

                        // If 'documents' is an array, search recursively
                        if (Array.isArray(documentGroup.documents)) {
                            const result = findDocumentById(documentGroup.documents, id);
                            if (result) {
                                return result;
                            }
                        }
                    }
                }
            }

            // If the item itself has an 'id' that matches, return it
            for (const doc of data) {
                if (doc.id === id) {
                    return doc;
                }
            }

            return null; // Return null if no match is found
        }

        const doc = findDocumentById(documentsData.value,Number(router.history.current.query.id))
        if(doc){
          getDocument(doc,doc.docId)
        }
      }
   
    })

    const search = () => {
      filters.q = searchQuery.value
      getDocuments()
    }

    const docNumber = ref('')


    const getDocument = (data, docId, clearQuery= true) => {
      if(clearQuery) searchQuery.value = ''
      const editorRef = document.querySelector(".richtexteditor")
      if(editorRef){
        editorRef.remove()
      }
      fetchCategories()
      fetchSubCategories(data.category_id)
      docNumber.value = docId
      isDocumentOpen.value = true
      isDocumentEdit.value = false
      documentData.value = { ...data }
      setRevisionNumber(documentData.value.revision_number)
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
                ><span style="text-transform: uppercase;font-size: 11px;">${i18n.t('Doc. no')}:<br /></span><span style="font-size: 15px;">${docId}</span></span
            ></td>

            <td style="border: 1px solid #bfbfbf; padding:0.1rem 0.1rem !important"><span
                ><span style="text-transform: uppercase;font-size: 11px;">${i18n.t('Revision No.')}:<br /></span>${revisionNumberFormatter(documentData.value.revision_number) }</span
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

    const selectSearchDocument = (data, docId) =>{
      getDocument(data, docId, false)
      searchDocumentOptions.value = []
      searchQuery.value = filters.q
    }

    const onSubmit = async () => {
      searchQuery.value = ''
      filters.q = ''
      documentData.value.content = rte.value.getHTMLCode()
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

    const showSubCategories = id => {
      fetchSubCategories(id)
      // formData.value.category_id = categories.value.find(item => item.id === id)
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
      // removePlugins: ['ImageUpload', 'EasyImage'],
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


    const formattedOptions = computed(() => {
      // Flatten documents hierarchy
      return searchDocumentOptions.value.map(option => ({
        ...option,
        documentsFlat: option.documents.flatMap(item => item.documents)
      }));
    });

  // Debounced search function
  const searchDocument =  debounce(async(loading, searchValue) => {
    filters.q = searchValue
    await searchDocuments()
    loading(false);
    }, 350);

    // Search handler
    const onSearch = (searchValue, loading) => {

      if (searchValue.length) {
        loading(true);
        searchDocument(loading, searchValue);
      }
    };

    const highlightedContent = (content) => {
  if (searchQuery.value.trim() !== '') {
    // Escape special characters in the search query for regex
    const escapeRegex = (string) => {
      return string.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
    };

    const searchTerm = escapeRegex(searchQuery.value.trim());
    const regex = new RegExp(`(${searchTerm})`, 'gi');

    // Use a temporary container to safely handle HTML content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;

    // Function to replace text while preserving HTML structure
    const replaceText = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const parentNode = node.parentNode;
        const newHtml = node.textContent.replace(regex, '<span class="highlight">$1</span>');
        if (newHtml !== node.textContent) {
          const fragment = document.createDocumentFragment();
          const div = document.createElement('div');
          div.innerHTML = newHtml;
          while (div.firstChild) {
            fragment.appendChild(div.firstChild);
          }
          parentNode.replaceChild(fragment, node);
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        Array.from(node.childNodes).forEach(replaceText);
      }
    };

    replaceText(tempDiv);

    return tempDiv.innerHTML;
  } else {
    return content;
  }
};

    const boldContent = (content) => {
      const inputValue  = document.querySelector(".vs__search").value

      if(inputValue !== ''){

      const regex = new RegExp(`(${inputValue})`, 'gi');
      return content.replace(regex, '<span style="font-weight:700">$1</span>');
      }else{
        return content
      }
      
    };

    const revisionNumberFormatter = (number) => {
      if(number === null) return
      const digits = number.toString().split('');
      if (digits.length === 1) {
        return `0.0.${digits[0]}`;
      }
      if (digits.length === 2) {
        return `0.${digits[0]}.${digits[1]}`;
      }
      if (digits.length === 3) {
        return `${digits[0]}.${digits[1]}.${digits[2]}`;
      }
      return digits.join('.');
    }
    
    return {
      highlightedContent,
      revisionNumberFormatter,
      filters,
      digits,
      increaseRevision,
      decreaseRevision,
      onSearch,
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
      categories,
      showSubCategories,
      subcategories,
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
      searchDocumentOptions,
      formattedOptions,
      selectSearchDocument,
      searchSelectRef,
      generatePDF,
      tagDialog,
      tags,
      cancelEditDocument,
      boldContent,
      rteref,
      processedDocumentsData
    }
  },
}
</script>

  <style lang="scss" scoped>
  hr{
    margin: 0;
    padding: 0px;
  }
.bold{
  font-weight: 700 !important;
}
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
          height: 100%;
          .indexing-table {
              li {
                  h4 {
                      margin-bottom: 0px;
                      font-size: 14px;
                  }
                  a {
                      padding: 0px;
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
  .split {
    display: flex;
    flex-direction: row;
}

.show-gutter{
  .gutter {
   display: none !important;
}

}

.gutter {
    background-color: #eee;
    background-repeat: no-repeat;
    background-position: 50%;
}

.gutter.gutter-horizontal {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==');
    cursor: col-resize;
    margin-top:30px;
    margin-bottom:30px;
  }
  </style>
  <style lang="scss">
  .highlight {
    background-color: yellow !important;
    padding: 2px 4px
      /* Or any other highlight style you prefer */
  }

  @import "~@core/scss/vue/libs/vue-select.scss";

  .select-search {
.vs__selected{
  display: none
}
.vs__actions{
  display: none;
}

 .vs__dropdown-menu li { background-color: transparent; }
    /* List Items */
    .vs__dropdown-option {
      line-height: 1.42857143;
      /* Normalize line height */
      display: block;
      padding: 3px 20px;
      clear: both;
      color: #333;
      /* Overrides most CSS frameworks */
      white-space: nowrap;
      color: black !important;

      &:hover {
        cursor: pointer;
        background: transparent !important;
      }
    }

    .vs__dropdown-option--highlight {
      background: transparent !important;

      &:hover {
        cursor: pointer;
        color: black !important;
        background: transparent !important;
      }
    }
  }


  a {

    .dark-layout & {
      color: #d0d2d6 !important;
    }
  }

  span {

    .dark-layout & {
      color: #d0d2d6 !important;
    }
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


