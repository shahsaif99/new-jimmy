<template>
  <b-modal
    cancel-variant="outline-secondary"
    centered
    :hide-footer="true"
    title="Add new Item"
    size="lg"
    class="modal-is-dashboard-active"
    id="is-dashboard-active"
    @close="$emit('update:is-dashboard-active', false)"
    :visible="isDashboardActive"
    @hide="$emit('update:is-dashboard-active', false)"
  >
    <div>
      <b-card>
        <validation-observer
          ref="refFormObserver"
        >
          <div>
            <b-row>
              <b-col
                cols="12"
                md="12"
              >
                <validation-provider
                  #default="validationContext"
                  name="Information"
                  rules="required"
                >
                  <b-form-group
                    label="Information"
                    label-for="information"
                  >
                    <b-form-textarea
                      v-model="formData.information"
                      placeholder="Information"
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
                  name="Author"
                  rules="required"
                >
                  <b-form-group
                    label="Author"
                    label-for="author"
                    class="mt-2"
                  >
                    <b-form-input
                      v-model="formData.author"
                      placeholder="Author"
                      :state="getValidationState(validationContext)"
                    />
                    <b-form-invalid-feedback>
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group></validation-provider></b-col>
              <b-col
                cols="6"
                md="6"
              >
                <validation-provider
                  #default="validationContext"
                  name="Given"
                  rules="required"
                >
                  <b-form-group
                    label="Given"
                    label-for="given"
                    class="mt-2"
                  >
                    <b-form-input
                      v-model="formData.given"
                      placeholder="Given"
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
                <div class="d-flex align-items-center justify-content-end">
                  <b-button
                    variant="primary"
                    class="mr-2 px-5 mt-2"
                  >
                    <span class="text-nowrap">Submit</span>
                  </b-button>
                </div>
              </b-col>
            </b-row>
          </div></validation-observer></b-card></div>
  </b-modal>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BFormInput,
  BButton,
  BFormTextarea,
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
    BFormTextarea,
    BButton,
    ValidationProvider,
    ValidationObserver,
    BFormGroup,
    BFormInvalidFeedback,
  },
  model: {
    prop: 'isDashboardActive',
    event: 'update:is-dashboard-active',
  },
  props: {
    isDashboardActive: {
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

    const {
      refFormObserver, getValidationState, resetForm,
    } = formValidation()

    const formData = ref(
      {
        inforamtion: '',
        author: '',
        given: '',
      },
    )
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
      refFormObserver,
      getValidationState,
      required,
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
