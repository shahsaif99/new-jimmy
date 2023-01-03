<template>
  <b-modal
    cancel-variant="outline-secondary"
    centered
    :hide-footer="true"
    title="Add Competence"
    size="lg"
    class="modal-add-competence-active"
    id="add-competence-active"
    @close="$emit('update:is-add-competence-active', false)"
    :visible="isAddCompetenceActive"
    @hide="$emit('update:is-add-competence-active', false)"
  >
    <div>
      <validation-observer
        ref="refFormObserver"
        #default="{ handleSubmit }"
      >
        <b-form
          @submit.prevent="handleSubmit(onSubmit)"
          @reset.prevent="resetForm"
        >
          <b-row>
            <b-col
              cols="6"
              md="6"
            >
              <validation-provider
                #default="validationContext"
                name="Course Name"
                rules="required"
              >
                <b-form-group
                  label="Course Name"
                  label-for="competencename"
                >
                  <b-form-input
                    v-model="formData.name"
                    placeholder="Course Name"
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
                  label="Completed Date"
                  label-for="startdate"
                >
                  <b-form-input
                    type="date"
                    v-model="formData.completed_date"
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
                  label-for="enddate"
                >
                  <b-form-input
                    type="date"
                    v-model="formData.valid_until"
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
              </validation-provider></b-col>
            <b-col
              cols="12"
              md="12"
            >

              <b-form-group
                label="Add Documents/Images"
                label-for="files"
                class="mt-2"
              >
                <validation-provider
                  #default="validationContext"
                  name="Files"
                >
                  <b-form-file
                    multiple
                    :state="getValidationState(validationContext)"
                    v-model="files"
                  >
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
                  <b-form-invalid-feedback :state="getValidationState(validationContext)">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col sm="12">
              <ValidationProvider
                #default="validationContext"
                name="Employees"
                rules="required"
              >
                <b-form-group
                  label="Select Employee"
                  label-for="employee"
                  :state="getValidationState(validationContext)"
                >
                  <v-select
                    v-model="formData.employees"
                    class="w-full"
                    placeholder="Type here to search employees"
                    :options="users"
                    multiple
                    :close-on-select="false"
                    :select-on-tab="true"
                    :clearable="false"
                    input-id="employee"
                    :filterable="false"
                    label="name"
                    @search="onSearch"
                    :state="getValidationState(validationContext)"
                  >
                    <template slot="no-options">
                      type to search employees..
                    </template>
                    <template
                      slot="option"
                      slot-scope="option"
                    >
                      {{ option.name }}
                    </template>
                    <template
                      slot="selected-option"
                      slot-scope="option"
                    >
                      {{ option.name }}
                    </template>
                  </v-select>
                  <b-form-invalid-feedback :state="getValidationState(validationContext)">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>
          <div class="mb-2">
            <b-row>
              <b-col>
                <div class="d-flex align-items-center justify-content-end">
                  <b-button
                    variant="primary"
                    class="mt-1"
                    type="submit"
                  >
                    <span class="text-nowrap">Submit</span>
                  </b-button>
                </div>
              </b-col>
            </b-row>
          </div>
        </b-form>
      </validation-observer>
    </div>
  </b-modal>
</template>

<script>
import {
  BRow,
  BCol,
  BForm,
  BBadge,
  BButton,
  BFormFile,
  BFormInput,
  BFormGroup,
  BFormInvalidFeedback,
} from 'bootstrap-vue'
import { ref } from '@vue/composition-api'
import useCompetences from '@/composables/competences'
import useUsers from '@/composables/users'
import { required } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import debounce from 'lodash/debounce'
import vSelect from 'vue-select'

export default {
  components: {
    BCol,
    BRow,
    BForm,
    BBadge,
    BButton,
    vSelect,
    BFormFile,
    BFormInput,
    BFormGroup,
    ValidationProvider,
    ValidationObserver,
    BFormInvalidFeedback,
  },
  model: {
    prop: 'isAddCompetenceActive',
    event: 'update:is-add-competence-active',
  },
  props: {
    isAddCompetenceActive: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const initialState = {
      name: '',
      completed_date: '',
      valid_until: '',
      employees: [],
    }


    const formData = ref({ ...initialState })
    const files = ref([])
    const {
      busy: storeBusy,
      respResult,
      competences,
      storeCompetence,

    } = useCompetences()

    const {
      busy: usersBusy,
      users,
      filters,
      fetchUsersList,
    } = useUsers()

    const fetchAsynEmployees = debounce(async (loading, name) => {
      if (!name.length) {
        competences.value = []
        return
      }
      filters.role = 'Employee'
      fetchUsersList(name)
      loading(false)
    }, 350)

    const onSearch = (name, loading) => {
      if (!name.length) {
        competences.value = []
        return
      }
      loading(true)
      fetchAsynEmployees(loading, name, this)
    }

    const resetForm = () => {

    }


    const onSubmit = async () => {
      const formDataObj = new FormData()
      formDataObj.append('name', formData.value.name)
      formDataObj.append('completed_date', formData.value.completed_date)
      formDataObj.append('valid_until', formData.value.valid_until)
      formDataObj.append('employees', JSON.stringify(formData.value.employees.map(item => item.id)))
      for (let index = 0; index < files.value.length; index++) {
        formDataObj.append('files[]', files.value[index])
      }
      await storeCompetence(formDataObj)
      if (respResult.value.status === 200) {
        emit('refetch-data')
        emit('update:is-add-competence-active', false)
      }
    }
    const {
      refFormObserver, getValidationState,
    } = formValidation()

    return {
      files,
      users,
      onSearch,
      usersBusy,
      storeBusy,
      debounce,
      formData,
      required,
      onSubmit,
      resetForm,
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
