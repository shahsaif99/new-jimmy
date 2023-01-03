<template>
  <b-modal
    cancel-variant="outline-secondary"
    centered
    :hide-footer="true"
    title="Add Competence"
    size="lg"
    class="modal-edit-competence-active"
    id="edit-competence-active"
    @close="$emit('update:edit-competence-active', false)"
    :visible="editCompetenceActive"
    @hide="$emit('update:edit-competence-active', false)"
  >
    <div>
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
                label="Select Employees"
                label-for="selectemployees"
              >
                <v-select
                  v-model="selected"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  multiple
                  label="title"
                  :options="option"
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
            <validation-provider
              #default="validationContext"
              name="Name of Course"
              rules="required"
            >
              <b-form-group
                label="Name of Course"
                label-for="name"
              >
                <b-form-input
                  v-model="formData.cource_title"
                  placeholder="Name of Course"
                  :state="getValidationState(validationContext)"
                />
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider></b-col>
        </b-row>
        <b-row>
          <b-col
            cols="6"
            md="6"
          >
            <validation-provider
              #default="validationContext"
              name="Completed Date"
              rules="required"
            >
              <b-form-group
                label="Completed"
                label-for="completed"
                class="mt-2"
              >
                <b-form-input
                  type="date"
                  v-model="formData.completed"
                  placeholder="00.00.0000"
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
              name="Valid Until Date"
              rules="required"
            >
              <b-form-group
                label="Valid Until"
                label-for="validUntil"
                class="mt-2"
              >
                <b-form-input
                  type="date"
                  v-model="formData.validUntil"
                  placeholder="00.00.0000"
                  :state="getValidationState(validationContext)"
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
              label="Select Files/Images"
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
                >
                  <span class="text-nowrap">Submit</span>
                </b-button>
              </div>
            </b-col>
          </b-row>
        </div>
      </validation-observer></div>
  </b-modal>
</template>

<script>
import {
  BRow,
  BCol,
  BFormInput,
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
    BFormInput,
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
    prop: 'editCompetenceActive',
    event: 'update:edit-competence-active',
  },
  props: {
    editCompetenceActive: {
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
    const selected = ref([])
    const option = ['John', 'David', 'Messi', 'Ronaldo', 'Pedri', 'Tom']
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
      option,
      refetchData,
      searchQuery,
      currentPage,
      totalRecords,
      refListTable,
      isSortDirDesc,
      perPageOptions,
      formData,
      required,
      refFormObserver,
      getValidationState,
      resetForm,
      selected,
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

