<template>
  <b-modal
    cancel-variant="outline-secondary"
    centered
    :hide-footer="true"
    title="Add Project"
    size="lg"
    class="modal-add-project-active"
    id="add-project-active"
    @close="$emit('update:add-project-active', false)"
    :visible="addProjectActive"
    @hide="$emit('update:add-project-active', false)"
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

} from 'bootstrap-vue'
import { ref } from '@vue/composition-api'
import useProspects from '@/composables/prospects'
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
  },
  model: {
    prop: 'addProjectActive',
    event: 'update:add-project-active',
  },
  props: {
    addProjectActive: {
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

    const option = ['John', 'David', 'Messi', 'Ronaldo', 'Pedri', 'Tom']
    const formData = ref(
      {
        project_number: '',
        project_name: '',
        start_date: '',
        end_date: '',
        customer: '',
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

