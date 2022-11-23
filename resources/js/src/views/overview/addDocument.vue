<template>
  <b-modal
    cancel-variant="outline-secondary"
    centered
    :hide-footer="true"
    title="Add Document"
    size="lg"
    class="modal-add-document-active"
    id="add-document-active"
    @close="$emit('update:add-document-active', false)"
    :visible="addDocumentActive"
    @hide="$emit('update:add-document-active', false)"
  >
    <div>
      <b-card>
        <validation-observer
          ref="refFormObserver"
        >
          <b-row>
            <b-col
              cols="12"
              md="12"
            >
              <validation-provider
                #default="validationContext"
                name="Select Employees"
                rules="required"
              >
                <b-form-group
                  label="Select Project"
                  label-for="selectprojects"
                >
                  <v-select
                    v-model="selected"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    label="Project"
                    :options="projectNames"
                  />
                  <b-form-invalid-feedback>
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
                <b-form-file multiple>
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
                    @click="formSubmitted"
                  >
                    <span class="text-nowrap">Submit</span>
                  </b-button>
                </div>
              </b-col>
            </b-row>
          </div>
        </validation-observer></b-card></div>
  </b-modal>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BButton,
  BFormGroup,
  BFormInvalidFeedback,
  BFormFile,
  BBadge,
} from 'bootstrap-vue'
import { ref } from '@vue/composition-api'
import useProspects from '@/composables/prospects'
import { required } from '@validations'
import vSelect from 'vue-select'
import formValidation from '@core/comp-functions/forms/form-validation'
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {
  components: {
    // Export,
    BCol,
    BRow,
    BCard,
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
      busy,
      sortBy,
      filters,
      perPage,
      student,
      prospects,
      dataMeta,
      refetchData,
      searchQuery,
      currentPage,
      totalRecords,
      refListTable,
      isSortDirDesc,
      perPageOptions,
    } = useProspects()
    const selected = ref('')
    const projectNames = ['ReactJS', 'CRM', 'Python Flask Project', 'ASP .net desktop Application', 'C++ Heavy Application', 'Vue js and Laravel']
    const formData = ref(
      {
        course_title: '',
        completed: '',
        validUntil: '',
      },
    )
    const {
      refFormObserver, getValidationState, resetForm,
    } = formValidation()


    return {
      busy,
      sortBy,
      filters,
      student,
      perPage,
      prospects,
      dataMeta,
      projectNames,
      refetchData,
      searchQuery,
      currentPage,
      selected,
      totalRecords,
      refListTable,
      isSortDirDesc,
      perPageOptions,
      formData,
      required,
      refFormObserver,
      getValidationState,
      resetForm,
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

