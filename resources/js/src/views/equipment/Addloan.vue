<template>
  <b-modal
    cancel-variant="outline-secondary"
    centered
    :hide-footer="true"
    title="Add Lending History"
    size="lg"
    class="modal-is-lending-active"
    id="is-lending-active"
    @close="$emit('update:is-lending-active', false)"
    :visible="isLendingActive"
    @hide="$emit('update:is-lending-active', false)"
  >
    <div>
      <b-card>
        <validation-observer
          ref="refFormObserver"
        >
          <div>
            <b-row>
              <b-col
                cols="6"
                md="6"
              >
                <validation-provider
                  #default="validationContext"
                  name="Lending Date"
                  rules="required"
                >
                  <b-form-group
                    label="Lending Date"
                    label-for="lendingdate"
                  >
                    <b-form-input
                      type="date"
                      v-model="formData.lendingDate"
                      placeholder="Lending Date"
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
                  name="Returned Date"
                  rules="required"
                >
                  <b-form-group
                    label="Returned Date"
                    label-for="returneddate"
                  >
                    <b-form-input
                      type="date"
                      v-model="formData.returnedDate"
                      placeholder="Returned Date"
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
                  name="Loaned to"
                  rules="required"
                >
                  <b-form-group
                    label="Loaned To"
                    label-for="loanedto"
                    class="mt-2"
                  >
                    <b-form-input
                      v-model="formData.loanedTo"
                      placeholder="Loaned To"
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
                  name="Project"
                  rules="required"
                >
                  <b-form-group
                    label="Project"
                    label-for="project"
                    class="mt-2"
                  >
                    <b-form-input
                      v-model="formData.project"
                      placeholder="Project"
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
              <b-col
                cols="6"
                md="6"
              >
                <validation-provider
                  #default="validationContext"
                  name="Registered by"
                  rules="required"
                >
                  <b-form-group
                    label="Registered By"
                    label-for="registeredby"
                    class="mt-2"
                  >
                    <b-form-input
                      v-model="formData.rgisteredBy"
                      placeholder="Registered By"
                      :state="getValidationState(validationContext)"
                    />
                    <b-form-invalid-feedback>
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider></b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="d-flex align-items-center justify-content-end">
                  <b-button
                    variant="primary"
                    class="mr-2 px-5 mt-2"
                  >
                    <span class="text-nowrap">Add</span>
                  </b-button>
                </div>
              </b-col>
            </b-row>
          </div>
        </validation-observer>
      </b-card>
    </div>
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
    BFormInvalidFeedback,
    BRow,
    BCard,
    BFormInput,
    BButton,
    BFormGroup,
    ValidationProvider,
    ValidationObserver,
  },
  model: {
    prop: 'isLendingActive',
    event: 'update:is-lending-active',
  },
  props: {
    isLendingActive: {
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
        lendingDate: '',
        returnedDate: '',
        loanedTo: '',
        project: '',
        registeredBy: '',
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
      resetForm,
      getValidationState,
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

