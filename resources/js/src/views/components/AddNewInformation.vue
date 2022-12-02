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

    <validation-observer
      #default="{ handleSubmit }"
      ref="refFormObserver"
    >
      <b-form
        @submit.prevent="handleSubmit(onSubmit)"
        @reset.prevent="resetForm"
      >
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
                  :state="
                    getValidationState(
                      validationContext
                    )
                  "
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
            cols="12"
            md="12"
          >
            <validation-provider
              #default="validationContext"
              name="Author"
              rules="required"
            >
              <b-form-group
                label="Author"
                label-for="author"
              >
                <b-form-input
                  v-model="formData.author"
                  placeholder="Author"
                  :state="
                    getValidationState(
                      validationContext
                    )
                  "
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
            <div
              class="d-flex align-items-center justify-content-end"
            >
              <b-button
                variant="primary"
                class="px-5 mt-2"
                type="submit"
              >
                <span class="text-nowrap">Submit</span>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
  </b-modal>
</template>

<script>
import {
  BRow,
  BCol,
  BForm,
  BButton,
  BFormInput,
  BFormGroup,
  BFormTextarea,
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
    BForm,
    BButton,
    BFormInput,
    BFormGroup,
    BFormTextarea,
    ValidationProvider,
    ValidationObserver,
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

    const { refFormObserver, getValidationState, resetForm } = formValidation()


    const onSubmit = async () => {
    //   await updateGeneral(formData.value)
    }

    const formData = ref({
      inforamtion: '',
      author: '',
      given: '',
    })
    return {
      busy,
      sortBy,
      filters,
      student,
      perPage,
      onSubmit,
      prospects,
      dataMeta,
      refetchData,
      searchQuery,
      formData,
      required,
      resetForm,
      currentPage,
      totalRecords,
      refListTable,
      isSortDirDesc,
      perPageOptions,
      refFormObserver,
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
@import "~@core/scss/vue/libs/vue-select.scss";
</style>
