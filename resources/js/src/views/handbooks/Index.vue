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
                  <li>
                    <h4><a href="#">01 Bedrift</a></h4>
                    <ul class="indexing-table list-unstyled">
                      <li>
                        <h4><a href="#">0101 Innledning</a></h4>
                        <ul class="list-unstyled">
                          <li>
                            <a href="#">0101-0001-D Informasjon om bedrift</a>
                          </li>
                          <li>
                            <a href="#">0101-0001-D Etablering av rutiner</a>
                          </li>
                          <li>
                            <a href="#">0101-0001-D Politikk</a>
                          </li>
                          <li>
                            <a href="#">0101-0001-D Oversikt over systemgj</a>
                          </li>
                          <li>
                            <a href="#">0101-0001-D Dokumentasjon på inte</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h4><a href="#">0102 Firmaorganisasjon</a></h4>
                        <ul class="list-unstyled">
                          <li>
                            <a href="#">0102-0001-D Organisasjonsplan</a>
                          </li>
                          <li>
                            <a href="#">0101-0002-D Firmaorganisasjon</a>
                          </li>
                          <li>
                            <a href="#">0101-0003-1 Stillingsbeskrivelse pros</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <h4><a href="#">02 HMS</a></h4>
                    <ul class="indexing-table list-unstyled">
                      <li>
                        <h4><a href="#">0201 Personal og ledelse</a></h4>
                        <ul class="list-unstyled">
                          <li>
                            <a href="#">0201-0001-1 Risikovurdering i bedrift</a>
                          </li>
                          <li>
                            <a href="#">0201-0002-1 Generelle HMS oppgav</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h4><a href="#">0201 HMS plan, vemerunde og risikov</a></h4>
                        <ul class="list-unstyled">
                          <li>
                            <a href="#">0201-0001-1 HMS-plan</a>
                          </li>
                          <li>
                            <a href="#">0201-0002-D Risikovurdering i prosj</a>
                          </li>
                          <li>
                            <a href="#">0201-0003-1 Instruks for abreid i høy</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </vue-perfect-scrollbar>
            </b-card>
          </b-col>
          <b-col sm="6">
            <h3>Innledning</h3>
            <b-card>
              <ckeditor
                :editor="ClassicEditor"
                :config="editorConfig"
                v-model="content"
              />
              <div class="mt-2 justify-content-end d-flex">
                <b-button
                  variant="primary"
                  class="mb-1"
                >
                  <span class="text-nowrap">Update Document</span>
                </b-button>
              </div>
            </b-card>
          </b-col>
          <b-col
            sm="3"
            class=""
          >
            <div class="justify-content-end d-flex mb-1">
              <b-button
                v-b-toggle:my-collapse
                class="flat-primary"
                size="sm"
              >
                <span class="when-open">Close</span><span class="when-closed">Open</span> Document Details
              </b-button>
            </div>
            <b-card>

              <b-collapse
                id="my-collapse"
                class="mt-2"
                visible
              >
                <b-row>
                  <b-col
                    sm="6"
                    class="mb-2"
                  >
                    <h6>
                      <strong>Category</strong>
                    </h6>
                    <span>Bedrift</span>
                  </b-col>
                  <b-col
                    sm="6"
                    class="mb-2"
                  >
                    <h6>
                      <strong>SubCategory</strong>
                    </h6>
                    <span>Innledning</span>
                  </b-col>
                  <b-col
                    sm="6"
                    class="mb-2"
                  >
                    <h6>
                      <strong>Created Date</strong>
                    </h6>
                    <span>Bedrift</span>
                  </b-col>
                  <b-col
                    sm="6"
                    class="mb-2"
                  >
                    <h6>
                      <strong>Doc No</strong>
                    </h6>
                    <span>0231675</span>
                  </b-col>
                  <b-col
                    sm="6"
                    class="mb-2"
                  >
                    <h6>
                      <strong>Revised Date</strong>
                    </h6>
                    <span>12.12.2022</span>
                  </b-col>
                  <b-col
                    sm="6"
                    class="mb-2"
                  >
                    <h6>
                      <strong>Approved By</strong>
                    </h6>
                    <span>Olan</span>
                  </b-col>
                  <b-col
                    sm="6"
                    class="mb-2"
                  >
                    <h6>
                      <strong>Doc Author</strong>
                    </h6>
                    <span>Olan</span>
                  </b-col>
                  <b-col
                    sm="6"
                    class="mb-2"
                  >
                    <h6>
                      <strong>Approved Date</strong>
                    </h6>
                    <span>12.12.2022</span>
                  </b-col>
                  <b-col cols="12">
                    <button class="btn btn-primary">
                      <feather-icon
                        icon="DownloadIcon"
                        class="mr-1"
                      />
                      Download PDF
                    </button>
                  </b-col>
                </b-row>
              </b-collapse>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </div>

  </div>
</template>

<script>
import {
  BButton, BCard, BCol, BRow, BFormGroup, BFormInput, BCollapse, VBToggle,
} from 'bootstrap-vue'
import { ref } from '@vue/composition-api'
// eslint-disable-next-line import/no-cycle
import useJwt from '@/auth/jwt/useJwt'
import CKEditor from '@ckeditor/ckeditor5-vue2'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import addHandbooks from './Add.vue'

export default {
  components: {
    // Export,
    BRow,
    BCol,
    BCard,
    BButton,
    BCollapse,
    BFormInput,
    BFormGroup,
    addHandbooks,
    VuePerfectScrollbar,
    ckeditor: CKEditor.component,
  },
  directives: {
    'b-toggle': VBToggle,
  },
  setup() {
    const isExportActive = ref(false)
    const addDocumentActive = ref(false)

    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
      wheelPropagation: false,
      wheelSpeed: 0.3,
    }

    const editorConfig = ref({
      removePlugins: ['ImageUpload', 'EasyImage'],
    })

    const content = ref('<h1>Home Page / About Us Page</h1> <p>Australian College of Vocational Education and Training (ACVET) aims to be a recognised provider of vocational education and training facilitating industry relevant skills and knowledge for students.Our primary purpose is the provision of high-quality vocational training in a supportive and well-resourced learning environment for students to help equip them with industry-relevant skills and qualifications that are most needed in Australia.</p>')

    const localStorageData = JSON.parse(useJwt.getUserData())

    const columns = [
      { key: 'organizationName' },
      { key: 'companyName' },
      { key: 'visitingAddress' },
      { key: 'registered' },
      { key: 'companyType' },
      { key: 'industry' },
      { key: 'website' },
      { key: 'email' },
      { key: 'telephone' },
    ]
    return {
      content,
      columns,
      ClassicEditor,
      editorConfig,
      isExportActive,
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
