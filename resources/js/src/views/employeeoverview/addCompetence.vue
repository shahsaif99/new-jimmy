<template>
  <b-modal
    cancel-variant="outline-secondary"
    centered
    :hide-footer="true"
    title="Add Competence"
    size="lg"
    class="modal-is-competence-active"
    id="is-competence-active"
    @close="$emit('update:is-competence-active', false)"
    :visible="isCompetenceActive"
    @hide="$emit('update:is-competence-active', false)"
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
                name="Name"
                rules="required"
              >
                <b-form-group
                  label="Name"
                  label-for="name"
                >
                  <b-form-input
                    v-model="formData.name"
                    placeholder="Name"
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
    prop: 'isCompetenceActive',
    event: 'update:is-competence-active',
  },
  props: {
    isCompetenceActive: {
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

    const formData = ref(
      {
        name: '',
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

