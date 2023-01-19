<template>
  <b-modal
    cancel-variant="outline-secondary"
    centered
    :hide-footer="true"
    :title="t('Update Equipment')"
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
            <b-media class="mb-2">
              <template #aside>
                <div
                  class="border"
                  :class="{'p-4': !previewImg}"
                >
                  <b-img
                    v-if="previewImg"
                    ref="previewEl"
                    width="160"
                    :src="previewImg"
                    :alt="t('Image Preview')"
                  />
                  <span v-if="!previewImg">{{ t('Image Preview') }}</span>
                </div>
              </template>
              <div class="d-flex flex-wrap">
                <b-button
                  variant="primary"
                  size="sm"
                  @click="$refs.refInputEl.click()"
                >
                  <input
                    ref="refInputEl"
                    type="file"
                    class="d-none"
                    @input="inputImageRenderer"
                  >
                  <span class="d-none d-sm-inline">{{ t('Upload') }}</span>
                </b-button>
                <!-- <b-button
                  variant="outline-secondary"
                  class="ml-1"
                  @click="removeImage"
                  size="sm"
                >
                  <span class="d-sm-inline">Remove</span>
                </b-button> -->
              </div>
            </b-media>
            <b-row>
              <b-col
                cols="6"
                md="6"
              >
                <validation-provider
                  #default="validationContext"
                  :name="t('Name')"
                  rules="required"
                >
                  <b-form-group
                    :label="t('Name')"
                    label-for="oname"
                  >
                    <b-form-input
                      v-model="formData.name"
                      :placeholder="t('Name')"
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
                  :name="t('Supplier')"
                >
                  <b-form-group
                    :label="('Supplier')"
                    label-for="supplier"
                  >
                    <b-form-input
                      v-model="formData.supplier"
                      :placeholder="t('Supplier')"
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
                  :name="t('Category')"
                >
                  <b-form-group
                    :label="t('Category')"
                    label-for="category"
                  >
                    <b-form-input
                      v-model="formData.category"
                      :placeholder="t('Category')"
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
                  :name="t('Serial Number')"
                >
                  <b-form-group
                    :label="t('Serial Number')"
                    label-for="serialno"
                  >
                    <b-form-input
                      v-model="formData.serial_number"
                      :placeholder="t('Serial Number')"
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
                  :name="t('Certificate No.')"
                >
                  <b-form-group
                    :label="t('Certificate No.')"
                    label-for="certificateNumber"
                  >
                    <b-form-input
                      v-model="formData.certificate_number"
                      :placeholder="t('Certificate No.')"
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
                  :name="t('Valid Until')"
                >
                  <b-form-group
                    :label="t('Valid Until')"
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
                  :name="t('Storage Location')"
                >
                  <b-form-group
                    :label="t('Select Storage Location')"
                    label-for="project"
                    :state="getValidationState(validationContext)"
                  >
                    <v-select
                      v-model="formData.project"
                      class="w-full"
                      :placeholder="t('Type here to search projects')"
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
                        {{ t('type to search projects..') }}
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
                  {{ t('Files') }}
                </h2>
              </b-col>
            </b-row>
            <b-row>
              <b-col
                cols="12"
                md="12"
              >
                <b-form-group
                  :label="t('Add Documents/Images')"
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
                        + {{ names.length - 1 }} {{ t('More files') }}
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
                    <span class="text-nowrap">{{ t('Update Equipment') }}</span>
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
  BImg,
  BMedia,
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
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { useUtils as useI18nUtils } from '@core/libs/i18n'

export default {
  components: {
    BCol,
    BRow,
    BImg,
    BForm,
    BBadge,
    BMedia,
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

    const { t } = useI18nUtils()


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
    const refInputEl = ref(null)
    const previewImg = ref(null)


    onMounted(() => {
      if (props.equipment) {
        previewImg.value = props.equipment.image_url
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
      if (formData.value.image) {
        formNewData.append('image', formData.value.image)
      }
      formNewData.append('_method', 'put')
      await updateEquipment(formNewData, formData.value.id)
      if (respResult.value.status === 200) {
        emit('refetch-data')
        emit('update:is-edit-equipment-active', false)
      }
    }


    // remove image
    const removeImage = () => {
      previewImg.value = ''
      formData.value.image = ''
    }


    const { inputImageRenderer } = useInputImageRenderer(refInputEl, base64 => {
      formData.value.image = base64
      previewImg.value = base64
    })

    return {
      t,
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
      refInputEl,
      resetForm,
      previewImg,
      removeImage,
      refetchData,
      searchQuery,
      currentPage,
      totalRecords,
      refListTable,
      isSortDirDesc,
      perPageOptions,
      refFormObserver,
      getValidationState,
      inputImageRenderer,
    }
  },
}
</script>

  <style lang="scss">
    @import '@core/scss/vue/libs/vue-select.scss';
    </style>

