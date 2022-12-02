<template>
  <b-modal
    cancel-variant="outline-secondary"
    centered
    :hide-footer="true"
    title="Edit Project"
    size="lg"
    class="modal-edit-project-active"
    id="edit-project-active"
    @close="$emit('update:edit-project-active', false)"
    :visible="editProjectActive"
    @hide="$emit('update:edit-project-active', false)"
  >
    <div>
      <b-card>
        <validation-observer
          ref="refFormObserver"
        >
          <b-row>
            <b-col
              cols="6"
              md="6"
            >
              <validation-provider
                #default="validationContext"
                name="Project Number"
                rules="required"
              >
                <b-form-group
                  label="Project Number"
                  label-for="projectnumber"
                >
                  <b-form-input
                    v-model="formData.project_number"
                    placeholder="Project Number"
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
                name="Project Name"
                rules="required"
              >
                <b-form-group
                  label="Project Name"
                  label-for="projectname"
                >
                  <b-form-input
                    v-model="formData.project_name"
                    placeholder="Project name"
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
                name="Start Date"
                rules="required"
              >
                <b-form-group
                  label="Start Date"
                  label-for="startdate"
                >
                  <b-form-input
                    type="date"
                    v-model="formData.start_date"
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
                name="End Date"
                rules="required"
              >
                <b-form-group
                  label="End Date"
                  label-for="enddate"
                >
                  <b-form-input
                    type="date"
                    v-model="formData.end_date"
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
              cols="6"
              md="6"
            >
              <validation-provider
                #default="validationContext"
                name="Customer"
                rules="required"
              >
                <b-form-group
                  label="Customer"
                  label-for="customer"
                >
                  <b-form-input
                    v-model="formData.customer"
                    placeholder="Customer"
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
            <b-col>
              <b-table
                ref="refListTable"
                class="position-relative mt-2"
                :items="attachmentData"
                responsive
                :fields="attachmentFields"
                primary-key="id"
                :sort-by.sync="sortBy"
                show-empty
                empty-text="No matching records found"
                :sort-desc.sync="isSortDirDesc"
              />
            </b-col>
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
  BFormInput,
  BButton,
  BFormGroup,
  BFormInvalidFeedback,
  BTable,
  BFormFile,
  BBadge,

} from 'bootstrap-vue'
import { ref } from '@vue/composition-api'
import useProjects from '@/composables/project'
import { required } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {
  components: {
    // Export,
    BCol,
    BRow,
    BCard,
    BFormInput,
    BButton,
    BFormGroup,
    ValidationProvider,
    ValidationObserver,
    BFormInvalidFeedback,
    BTable,
    BFormFile,
    BBadge,
  },
  model: {
    prop: 'editProjectActive',
    event: 'update:edit-project-active',
  },
  props: {
    editProjectActive: {
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
      attachmentFields,
      attachmentData,
    } = useProjects()

    const option = ['John', 'David', 'Messi', 'Ronaldo', 'Pedri', 'Tom']
    const formData = ref(
      {
        project_number: '101',
        project_name: 'Hello',
        start_date: '17-01-2001',
        end_date: '20-08-2001',
        customer: 'Client',
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
      attachmentFields,
      attachmentData,
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

