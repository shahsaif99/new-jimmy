<template>
  <b-modal
    cancel-variant="outline-secondary"
    centered
    :hide-footer="true"
    title="Add Equipment"
    size="lg"
    class="modal-is-equipment-active"
    id="is-equipment-active"
    @close="$emit('update:is-equipment-active', false)"
    :visible="isEquipmentActive"
    @hide="$emit('update:is-equipment-active', false)"
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
                  name="Name"
                  rules="required"
                >
                  <b-form-group
                    label="Name"
                    label-for="oname"
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
              <b-col
                cols="6"
                md="6"
              >
                <validation-provider
                  #default="validationContext"
                  name="Serial Number"
                  rules="required"
                >
                  <b-form-group
                    label="Serial Number"
                    label-for="serialno"
                  >
                    <b-form-input
                      v-model="formData.serialNumber"
                      placeholder="Serial Number"
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
                  name="Supplier"
                  rules="required"
                >
                  <b-form-group
                    label="Supplier"
                    label-for="supplier"
                    class="mt-1"
                  >
                    <b-form-input
                      v-model="formData.supplier"
                      placeholder="Supplier"
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
                  name="Category"
                  rules="required"
                >
                  <b-form-group
                    label="Category"
                    label-for="category"
                    class="mt-1"
                  >
                    <b-form-input
                      v-model="formData.category"
                      placeholder="Category"
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
                  name="Certificate Number"
                  rules="required"
                >
                  <b-form-group
                    label="Certificate Number"
                    label-for="certificateNumber"
                    class="mt-1"
                  >
                    <b-form-input
                      v-model="formData.certificateNo"
                      placeholder="Certificate Number"
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
                  name="Valid Until"
                  rules="required"
                >
                  <b-form-group
                    label="Valid Until"
                    label-for="validUntil"
                    class="mt-1"
                  >
                    <b-form-input
                      type="date"
                      v-model="formData.validUntil"
                      placeholder="Valid Until"
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
                xl="12"
                sm="12"
              >
                <h2 class="mt-2 mr-1 md-2">
                  Files
                </h2>
              </b-col>
            </b-row>
            <b-row>
              <b-button
                variant="primary"
                class="mt-2 ml-1"
              >
                <span class="text-nowrap">Upload</span>
              </b-button>
              <b-button
                variant="outline-secondary"
                class="mt-2 ml-1"
              >
                <span class="text-nowrap">Delete</span>
              </b-button>
            </b-row>
            <b-row>
              <b-col>
                <div
                  class="d-flex align-items-center justify-content-end"
                >
                  <b-button
                    variant="primary"
                    @click="formSubmitted"
                  >
                    <span class="text-nowrap">Submit</span>
                  </b-button>
                </div>
              </b-col>
            </b-row>
          </div>
        </validation-observer></b-card>
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
  BFormInvalidFeedback,
  BFormGroup,
} from 'bootstrap-vue'
import { ref } from '@vue/composition-api'
import useProspects from '@/composables/prospects'
import { required, alphaNum } from '@validations'
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
    ValidationProvider,
    ValidationObserver,
    BFormInvalidFeedback,
    BFormGroup,
  },
  model: {
    prop: 'isEquipmentActive',
    event: 'update:is-equipment-active',
  },
  props: {
    isEquipmentActive: {
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
        serialNumber: '',
        supplier: '',
        category: '',
        certificateNo: '',
        validUntil: '',
      },
    )
    const {
      refFormObserver, getValidationState, resetForm,
    } = formValidation()


    const tableColumns = [
      { key: 'title' },
      { key: 'created' },
      { key: 'view' },
      { key: 'file' },
    ]
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
      formData,
      totalRecords,
      refListTable,
      isSortDirDesc,
      perPageOptions,
      FormData,
      tableColumns,
      required,
      alphaNum,
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
