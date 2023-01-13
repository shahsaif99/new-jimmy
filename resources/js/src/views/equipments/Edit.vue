<template>
  <b-modal
    cancel-variant="outline-secondary"
    centered
    :hide-footer="true"
    title="Update Equipment"
    size="lg"
    class="modal-is-edit-equipment-active"
    id="is-edit-equipment-active"
    @close="$emit('update:is-edit-equipment-active', false)"
    :visible="isEditEquipmentActive"
    @hide="$emit('update:is-edit-equipment-active', false)"
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
                </validation-provider>
              </b-col>
              <b-col
                cols="6"
                md="6"
              >
                <validation-provider
                  #default="validationContext"
                  name="Supplier"
                >
                  <b-form-group
                    label="Supplier"
                    label-for="supplier"
                  >
                    <b-form-input
                      v-model="formData.supplier"
                      placeholder="Supplier"
                      :state="getValidationState(validationContext)"
                    />
                    <b-form-invalid-feedback :state="getValidationState(validationContext)">
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
                  name="Category"
                >
                  <b-form-group
                    label="Category"
                    label-for="category"
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
                </validation-provider>
              </b-col>
              <b-col
                cols="6"
                md="6"
              >
                <validation-provider
                  #default="validationContext"
                  name="Serial Number"
                >
                  <b-form-group
                    label="Serial Number"
                    label-for="serialno"
                  >
                    <b-form-input
                      v-model="formData.serial_number"
                      placeholder="Serial Number"
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
                  name="Certificate Number"
                >
                  <b-form-group
                    label="Certificate Number"
                    label-for="certificateNumber"
                  >
                    <b-form-input
                      v-model="formData.certificate_number"
                      placeholder="Certificate Number"
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
                  name="Valid Until"
                >
                  <b-form-group
                    label="Valid Until"
                    label-for="validUntil"
                  >
                    <b-form-input
                      type="date"
                      v-model="formData.valid_until"
                      placeholder="Valid Until"
                      :state="getValidationState(validationContext)"
                    />
                    <b-form-invalid-feedback>
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </b-col>
              <b-col sm="12">
                <ValidationProvider
                  #default="validationContext"
                  name="Storage Location"
                >
                  <b-form-group
                    label="Select Storage Location"
                    label-for="project"
                    :state="getValidationState(validationContext)"
                  >
                    <v-select
                      v-model="formData.project"
                      class="w-full"
                      placeholder="Type here to search projects"
                      :options="projects"
                      :close-on-select="true"
                      :select-on-tab="true"
                      :clearable="false"
                      input-id="project"
                      :filterable="false"
                      label="name"
                      @search="onSearch"
                      :state="getValidationState(validationContext)"
                    >
                      <template slot="no-options">
                        type to search projects..
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
              <b-col
                cols="12"
                md="12"
              >
                <b-form-group
                  label="Add Documents/Images"
                  label-for="files"
                >
                  <b-form-file
                    multiple
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
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div
                  class="d-flex align-items-center justify-content-end"
                >
                  <b-button
                    variant="primary"
                    type="submit"
                  >
                    <span class="text-nowrap">Update Equipment</span>
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
import { ref, onMounted } from '@vue/composition-api'
import { required, alphaNum } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import useEquipments from '@/composables/equipments'
import useProjects from '@/composables/projects'
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
    prop: 'isEditEquipmentActive',
    event: 'update:is-edit-equipment-active',
  },
  props: {
    isEditEquipmentActive: {
      type: Boolean,
      required: true,
    },
    equipment: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const {
      busy,
      sortBy,
      filters,
      perPage,
      student,
      dataMeta,
      respResult,
      refetchData,
      searchQuery,
      currentPage,
      totalRecords,
      refListTable,
      isSortDirDesc,
      updateEquipment,
      perPageOptions,
    } = useEquipments()

    const { fetchProjectsList, projects } = useProjects()

    const fetchAsynProjects = debounce(async (loading, name) => {
      if (!name.length) {
        projects.value = []
        return
      }
      fetchProjectsList(name)
      loading(false)
    }, 350)

    const formData = ref()
    const files = ref([])

    onMounted(() => {
      if (props.equipment) {
        console.log(props.equipment)
        formData.value = { ...props.equipment }
      }
    })

    const onSearch = (name, loading) => {
      if (!name.length) {
        projects.value = []
        return
      }
      loading(true)
      fetchAsynProjects(loading, name, this)
    }

    const {
      refFormObserver, getValidationState, resetForm,
    } = formValidation()


    const onSubmit = async () => {
      const formNewData = new FormData()
      for (let index = 0; index < files.value.length; index++) {
        formNewData.append('files[]', files.value[index])
      }

      if (formData.value.project) {
        formNewData.append('project_id', formData.value.project.id)
      }
      formNewData.append('name', formData.value.name)
      if (formData.value.serial_number) {
        formNewData.append('serial_number', formData.value.serial_number)
      }
      if (formData.value.supplier) {
        formNewData.append('supplier', formData.value.supplier)
      }
      if (formData.value.category) {
        formNewData.append('category', formData.value.category)
      }
      if (formData.value.certificate_number) {
        formNewData.append('certificate_number', formData.value.certificate_number)
      }
      if (formData.value.valid_until) {
        formNewData.append('valid_until', formData.value.valid_until)
      }
      formNewData.append('_method', 'put')
      await updateEquipment(formNewData, formData.value.id)
      if (respResult.value.status === 200) {
        emit('refetch-data')
        emit('update:is-edit-equipment-active', false)
      }
    }

    return {
      busy,
      files,
      sortBy,
      filters,
      student,
      perPage,
      dataMeta,
      formData,
      projects,
      onSubmit,
      required,
      alphaNum,
      onSearch,
      resetForm,
      refetchData,
      searchQuery,
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

  <style lang="scss">
    @import '@core/scss/vue/libs/vue-select.scss';
    </style>

