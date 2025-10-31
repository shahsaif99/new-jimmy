<template>
  <b-modal cancel-variant="outline-secondary" centered :hide-footer="true" :title="t('Update Equipment')" size="lg"
    class="modal-is-edit-equipment-active" id="is-edit-equipment-active"
    @close="$emit('update:is-edit-equipment-active', false)" :visible="isEditEquipmentActive"
    @hide="$emit('update:is-edit-equipment-active', false)">
    <div>
      <validation-observer ref="refFormObserver" #default="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(onSubmit)" @reset.prevent="resetForm">
          <div>

            <!-- <b-media class="mb-2">
              <template #aside>
                <div class="border" :class="{ 'p-4': !previewImg }">
                  <b-img v-if="previewImg" ref="previewEl" width="160" :src="previewImg" :alt="t('Image Preview')" />
                  <span v-if="!previewImg">{{ t('Image Preview') }}</span>
                </div>
              </template>
<div class="d-flex flex-wrap">
  <b-button variant="primary" size="sm" @click="$refs.refInputEl.click()">
    <input ref="refInputEl" type="file" class="d-none" @input="inputImageRenderer">
    <span class="d-none d-sm-inline">{{ t('Upload') }}</span>
  </b-button>

</div>
</b-media> -->

            <b-row>
              <b-col cols="6" md="6">
                <div class=" w-100 mb-2">
                  <div style="height: 210px; " class="border-dashed text-center cursor-pointer w-100"
                    @click="$refs.refInputEl.click()" :class="{ 'preview-container': previewImg }">
                    <input ref="refInputEl" type="file" class="d-none" accept="image/*" @input="inputImageRenderer" />
                    <img v-if="previewImg" ref="previewEl" :src="previewImg" rounded class="p-1"
                      style="height: 100%; object-fit: contain;" :alt="t('Image Preview')" />
                    <div v-else
                      class="upload-placeholder h-100 d-flex flex-column justify-content-center align-items-center">
                      <i class="bi bi-cloud-arrow-up-fill" style="font-size: 2rem;"></i>
                      <span class="text-muted">{{ t("Click to Upload Image") }}</span>
                    </div>
                  </div>
                </div>
              </b-col>

              <b-col cols="6" md="6">
                <b-button v-if="!formData.qr_code" @click.prevent="addQrcoode" variant="outline-secondary"
                  class="w-100">
                  <i class="bi bi-qr-code" style=" margin:0 4px;"></i>

                  Add Qr Code
                </b-button>
                <div class="d-flex justify-content-end align-items-center" v-else>
                  <p class="mx-1 text-success">
                    <feather-icon icon="CheckCircleIcon" size="16" class="" />
                    QR code created
                  </p>
                  <p>-</p>
                  <p @click="formData.qr_code = false" class="mx-1 text-danger cursor-pointer">
                    <feather-icon icon="Trash2Icon" size="16" class="" />
                    Remove
                  </p>
                </div>
                <b-form-group class="mt-2" :label="t('ID')" label-for="id">
                  <b-form-input disabled v-model="formData.tool_id" :placeholder="t('ID')" />
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="6" md="6">
                <b-form-group :label="t('Name')" label-for="oname">
                  <b-form-input v-model="formData.name" :placeholder="t('Name')" />
                </b-form-group>
              </b-col>

              <b-col cols="6" md="6">
                <b-form-group :label="('Supplier')" label-for="supplier">
                  <b-form-input v-model="formData.supplier" :placeholder="t('Supplier')" />
                </b-form-group>
              </b-col>

              <b-col cols="6" md="6">
                <b-form-group :label="t('Category')" label-for="category">
                  <InfiniteScrollSelect :selectValue="formData.category ? formData.category.name : ''"
                    v-model="formData.category_id" @onSearch="equipmentCategories.search
                      " :options="equipmentCategories.formatedData
                        " :has-next-page="equipmentCategories.hasNextPage
                          " :loading="apiHelpers.loading" @onFetchOptions="getEquipmentCategories
                            " @onPaginate="
                              equipmentCategories.currentPage++
                              " />
                </b-form-group>
              </b-col>

              <b-col cols="6" md="6">
                <b-form-group :label="t('Serial Number')" label-for="serialno">
                  <b-form-input v-model="formData.serial_number" type="text"  :placeholder="t('Serial Number')" />
                </b-form-group>
              </b-col>

              <b-col cols="6" md="6">
                <b-form-group :label="t('Certificate No.')" label-for="certificateNumber">
                  <b-form-input v-model="formData.certificate_number" type="text"  :placeholder="t('Certificate No.')" />
                </b-form-group>
              </b-col>

              <b-col cols="6" md="6">
                <b-form-group :label="t('Valid Until')" label-for="validUntil">
                  <b-form-input type="date" v-model="formData.valid_until" placeholder="Valid Until" />
                </b-form-group>
              </b-col>

              <b-col cols="6" md="6">

                <b-form-group :label="t('Checklist')" label-for="checklist">
                  <b-button v-if="!selectedChecklist" @click.prevent="showChecklistDialog = true"
                    variant="outline-secondary" class="w-100">
                    <i class="bi bi-paperclip"></i>

                    <span class="text-nowrap">{{
                      t("Attach checklist")
                    }}</span>
                  </b-button>
                  <div v-else class="d-flex align-items-center justify-content-between  w-100 card-custom">
                    <div class="d-flex align-items-center" style="gap: 10px">
                      <div style="height: 50px; width: 50px; position: relative">
                        <i :class="selectedChecklist.icon" :style="{ background: selectedChecklist.color }"
                          class="bi bi-list-check svg-icon title-icon" style="
                                  height: 100% !important;
                                  width: 100% !important;
                                  max-width: 100%;
                              "></i>
                      </div>
                      <div style="font-weight: medium; font-size: 18px">
                        {{ selectedChecklist.name }}
                      </div>
                    </div>
                    <i @click="removeChecklist" :style="{
                      fontSize: '20px',
                      cursor: 'pointer',
                    }" class="bi bi-dash-circle-fill"></i>
                  </div>

                </b-form-group>
              </b-col>

              <b-col cols="6" md="6">
                <b-form-group :label="t('Procedure')" label-for="procedure">
                  <b-button v-if="!selectedProcedure" @click.prevent="showProcedureDialog = true"
                    variant="outline-secondary" class="w-100">
                    <i class="bi bi-paperclip"></i>

                    <span class="text-nowrap">{{
                      t("Attach procedure")
                    }}</span>
                  </b-button>
                  <div v-else class="d-flex align-items-center justify-content-between w-100  card-custom">
                    <div class="d-flex align-items-center" style="gap: 10px">
                      <div style="height: 50px; width: 50px; position: relative">
                        <i class="bi bi-list-check svg-icon title-icon" style="
                                height: 100% !important;
                                width: 100% !important;
                                max-width: 100%;
                            "></i>
                      </div>
                      <div style="font-weight: medium; font-size: 18px">
                        {{ selectedProcedure.title }}
                      </div>
                    </div>
                    <i @click="removeProcedure" :style="{
                      fontSize: '20px',
                      cursor: 'pointer',
                    }" class="bi bi-dash-circle-fill"></i>
                  </div>
                </b-form-group>

              </b-col>

              <b-col sm="6">

                <b-form-group :label="t('Select Storage Location')" label-for="Storage Location">
                  <InfiniteScrollSelect :selectValue="formData.storage_location.name" v-model="formData.storageLocation"
                    @onSearch="storageLocations.search
                      " :options="storageLocations.formatedData
                        " :has-next-page="storageLocations.hasNextPage
                          " :loading="storageApiHelpers.loading
                            " @onFetchOptions="getStorageLocations
                              " @onPaginate="
                                storageLocations.currentPage++
                                " />
                </b-form-group>
              </b-col>
              <b-col sm="6">

                <b-form-group :label="t('Level Of Training')" label-for="levelOfTraining">
                  <v-select :reduce="data => data.value" v-model="formData.level_of_training
                    " class="w-full" :placeholder="t(
                      'Type here to search level of training'
                    )
                      " :options="levelOfTrainingOptions" :clearable="false" input-id="levelOfTraining"
                    :filterable="false">
                  </v-select>
                </b-form-group>

              </b-col>
            </b-row>

            <b-row>
              <b-col xl="12" sm="12">
                <h2 class="mr-1 md-2">
                  {{ t('Files') }}
                </h2>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="12" md="12">
                <b-form-group :label="t('Add Documents/Images')" label-for="files">
                  <b-form-file multiple v-model="files">
                    <template slot="file-name" slot-scope="{ names }">
                      <b-badge variant="primary">
                        {{ names[0] }}
                      </b-badge>
                      <b-badge v-if="names.length > 1" variant="primary">
                        + {{ names.length - 1 }} {{ t('More files') }}
                      </b-badge>
                    </template>
                  </b-form-file>
                </b-form-group>
              </b-col>

              <b-col class="d-flex flex-column pb-1" style="gap: 5px" xl="12" sm="12">
                <h6>{{ t('Attached Files') }}</h6>
                <div class="d-flex align-items-center justify-content-between font-italic" style="gap: 5px" v-for="(
                        image, index
                    ) in formData.media" :key="index">
                  <span class="text-truncate">{{
                    image.filename
                  }}</span>

                  <div>
                    <i @click="removeAttachedFile(image, index)" style="font-size: 1.2rem"
                      class="bi bi-trash text-danger cursor-pointer"></i>
                  </div>
                </div>
              </b-col>
            </b-row>

            <b-row>
              <b-col>
                <div class="d-flex align-items-center justify-content-end">
                  <b-button variant="primary" type="submit">
                    <span class="text-nowrap">{{ t('Update Equipment') }}</span>
                  </b-button>
                </div>
              </b-col>
            </b-row>
          </div>
        </b-form>
      </validation-observer>
    </div>
    <ChecklistSelectionDialog :show="showChecklistDialog" :selectedId="formData ? formData.checklist : null"
      @select="handleChecklistSelect" @close="showChecklistDialog = false" />
    <ProcedureSelectionDialog :show="showProcedureDialog" :selectedId="formData ? formData.procedure : null"
      @select="handleProcedureSelect" @close="showProcedureDialog = false" />
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
import { ref, onMounted, watch, reactive } from '@vue/composition-api'
import { required, alphaNum } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import useEquipments from '@/composables/equipments'
import vSelect from 'vue-select'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import useEquipmentCategories from "@/composables/equipment-categories";
import useStorageLocations from "@/composables/storage-location";
import InfiniteScrollSelect from "../components/InfiniteScrollSelect.vue";
import ChecklistSelectionDialog from "@/views/checklist/dialogs/ChecklistSelectionDialog.vue";
import ProcedureSelectionDialog from "@/views/checklist/dialogs/ProcedureSelectionDialog.vue";
import toaster from "@/composables/toaster";

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
    InfiniteScrollSelect,
    ChecklistSelectionDialog,
    ProcedureSelectionDialog
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

    const isQrcodeActive = ref(false);
    const { apiHelpers, equipmentCategories, getEquipmentCategories } =
      useEquipmentCategories();

    const levelOfTrainingOptions = [{
      label: 'Instruction',
      value: 'instruction'
    }, {
      label: 'Instruction and practice',
      value: 'instruction and practice'
    }, {
      label: 'Certified training',
      value: 'certified training'
    }]

    const {
      apiHelpers: storageApiHelpers,
      storageLocations,
      getStorageLocations,
    } = useStorageLocations();

    const { t } = useI18nUtils()


    const formData = ref()
    const files = ref([])
    const refInputEl = ref(null)
    const previewImg = ref(null)

    const showChecklistDialog = ref(false);
    const showProcedureDialog = ref(false);
    const selectedChecklist = ref(null);
    const selectedProcedure = ref(null);

    const handleChecklistSelect = (checklist) => {
      selectedChecklist.value = checklist;
      formData.value.checklist = checklist.id;
      showChecklistDialog.value = false;
    };

    const handleProcedureSelect = (procedure) => {
      selectedProcedure.value = procedure;
      formData.value.procedure = procedure.id;
      showProcedureDialog.value = false;
    };

    const removeChecklist = () => {
      selectedChecklist.value = null;
      formData.value.checklist = null;
    };

    const removeProcedure = () => {
      selectedProcedure.value = null;
      formData.value.procedure = null;
    };


    onMounted(async () => {

      if (props.equipment) {
        previewImg.value = props.equipment.image_url
        formData.value = { ...props.equipment }
        formData.value.valid_until = formatDate(formData.value.valid_until)
        selectedChecklist.value = formData.value.checklist
        selectedProcedure.value = formData.value.procedure
        formData.value.filenames = []
      }
      await getStorageLocations()
      await getEquipmentCategories()
      storageLocations.formatedData.push(formData.value.storage_location)
      equipmentCategories.formatedData.push(formData.value.category)
      formData.value.storageLocation = formData.value.storage_location_id
      formData.value.category = formData.value.category_id
    })


    const addQrcoode = () => {
      isQrcodeActive.value = true;
      formData.value.qr_code = true;
    };


    const {
      refFormObserver, getValidationState, resetForm,
    } = formValidation()

    const onSubmit = async () => {
      if (
        !formData.value.name ||
        !formData.value.supplier ||
        !formData.value.storageLocation ||
        !formData.value.id
      ) {
        toaster().error("Please fill in all required fields.");
        return;
      }

      const formNewData = new FormData()

      for (let index = 0; index < files.value.length; index++) {
        formNewData.append('files[]', files.value[index])
      }

      for (let index = 0; index < formData.value.filenames.length; index++) {
        formNewData.append('files_to_delete[]', formData.value.filenames[index]);
      }


      if (typeof formData.value.image === 'string' && formData.value.image.startsWith('data:image/') && formData.value.image.includes('base64,')) {
        formNewData.append('image', formData.value.image)
      }

      if (typeof formData.value.checklist === 'number') {
        formNewData.append("checklist_id", formData.value.checklist);
      }

      if (formData.value.checklist === null) {
        formNewData.append("checklist_id", '');
      }

      if (typeof formData.value.procedure === 'number') {
        formNewData.append("procedure_id", formData.value.procedure);
      }

      if (formData.value.procedure === null) {
        formNewData.append("procedure_id", '');
      }

      const fieldsToCheck = [
        'name',
        'serial_number',
        'supplier',
        'certificate_number',
        'category_id',
        'valid_until',
        'storageLocation',
        'qr_code',
        'level_of_training'
      ];

      fieldsToCheck.forEach(field => {
        // Append from formData if it has a value (not undefined, null, or empty)
        if (formData.value[field] !== undefined && formData.value[field] !== null) {
          // Special handling for the qr_code field
          if (field === 'qr_code') {
            formNewData.append(field, formData.value[field] ? 1 : 0);
          } else {
            formNewData.append(field, formData.value[field]);
          }
        }
        // Append from props.equipment only if it has a value and is not null or undefined
        else if (props.equipment && props.equipment[field] !== null && props.equipment[field] !== undefined) {
          // Special handling for the qr_code field
          if (field === 'qr_code') {
            formNewData.append(field, props.equipment[field] ? 1 : 0);
          } else {
            formNewData.append(field, props.equipment[field]);
          }
        }
      });

      // Append _method as 'put'
      formNewData.append('_method', 'put');

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

    const formatDate = (isoDateString) => {
      const date = new Date(isoDateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    }

    const removeAttachedFile = (image, index) => {
      formData.value.media.splice(index, 1)
      formData.value.filenames.push(image.filename)
    }

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
      onSubmit,
      required,
      alphaNum,
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
      apiHelpers,
      equipmentCategories,
      getEquipmentCategories,
      storageApiHelpers,
      storageLocations,
      getStorageLocations,
      addQrcoode,
      showChecklistDialog,
      showProcedureDialog,
      selectedChecklist,
      selectedProcedure,
      handleChecklistSelect,
      handleProcedureSelect,
      removeChecklist,
      removeProcedure,
      levelOfTrainingOptions,
      removeAttachedFile
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
<style scoped>
p {
  margin: 0px;
}

.svg-icon {
  background: #0096fd;
  padding: 10px;
  fill: white;
  border-radius: 5px;
  max-width: 60px;
  min-width: 50px;
}

.title-icon {
  height: 100% !important;
  width: 100% !important;
  max-width: 100%;
  position: absolute;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: white;
}

.task-div {
  padding: 10px;
  border: 2px solid darkgrey;
}

.border-bottom-zero {
  border-bottom: 0 !important;
}
</style>
<style lang="scss" scoped>
@import "~@core/scss/base/bootstrap-extended/include";
@import "~@core/scss/base/components/variables-dark";

.dark-layout {
  .card-custom {
    background-color: #283046 !important;
  }
}

.card-custom {
  background-color: #f4f4f4 !important;
  border-radius: 6px;
  padding: 10px
}
</style>

<style>
.border-dashed {
  border: 2px dashed #dee2e6;
  border-radius: 0.25rem;
  transition: all 0.3s ease;
}

.border-dashed:hover {
  border-color: #007bff;
  background-color: rgba(0, 123, 255, 0.05);
}

.preview-container {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.upload-placeholder .fas {
  font-size: 2rem;
  color: #6c757d;
}
</style>