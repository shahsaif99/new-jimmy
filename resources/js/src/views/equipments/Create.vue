<template>
  <div>
    <b-modal cancel-variant="outline-secondary" centered :hide-footer="true" :title="t('Add Equipment')" size="lg"
      class="modal-is-add-equipment-active" id="is-add-equipment-active"
      @close="$emit('update:is-add-equipment-active', false)" :visible="isAddEquipmentActive"
      @hide="$emit('update:is-add-equipment-active', false)">
      <div>
        <validation-observer ref="refFormObserver" #default="{ handleSubmit }">
          <b-form @submit.prevent="handleSubmit(onSubmit)" @reset.prevent="resetForm">
            <div>
              <b-row>
                <b-col cols="6" md="6">
                  <!-- <b-media class="mb-2">
                    <template #aside>
                      <div class="border" :class="{ 'p-4': !previewImg }">
                        <b-img v-if="previewImg" ref="previewEl" width="160" :src="previewImg"
                          :alt="t('Image Preview')" />
                        <span v-if="!previewImg">{{
                          t("Image Preview")
                        }}</span>
                      </div>
                    </template>
<div class="d-flex flex-wrap">
  <b-button variant="primary" size="sm" @click="
                        $refs.refInputEl.click()
                        ">
    <input ref="refInputEl" type="file" class="d-none" @input="inputImageRenderer" />
    <span class="d-none d-sm-inline">{{ t("Upload") }}</span>
  </b-button>
</div>
</b-media> -->
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
                  <b-form-group description="Automatically generated ID" class="mt-2" :label="t('ID')" label-for="id">
                    <b-form-input disabled v-model="formData.id" :placeholder="t('ID')" />
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols=" 6" md="6">
                  <b-form-group :label="t('Name')" label-for="oname">
                    <b-form-input v-model="formData.name" :placeholder="t('Name')" />
                  </b-form-group>
                </b-col>
                <b-col cols=" 6" md="6">
                  <b-form-group :label="t('Supplier')" label-for="supplier">
                    <b-form-input v-model="formData.supplier" :placeholder="t('Supplier')" />
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="6" md="6">
                  <b-form-group :label="t('Category')" label-for="category">
                    <InfiniteScrollSelect v-model="formData.category" @onSearch="equipmentCategories.search
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
                    <b-form-input v-model="formData.serial_number" type="text" :placeholder="t('Serial Number')
                      " />
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="6" md="6">
                  <b-form-group :label="t('Certificate No.')" label-for="certificateNumber">
                    <b-form-input v-model="formData.certificate_number
                      " type="text" :placeholder="t('Certificate No.')
                        " />
                  </b-form-group>
                </b-col>

                <b-col cols="6" md="6">
                  <b-form-group :label="t('Valid Until')" label-for="validUntil">
                    <b-form-input type="date" v-model="formData.valid_until" placeholder="Valid Until" />
                  </b-form-group>
                </b-col>

                <b-col cols="6" md="6">

                  <b-form-group :label="t('Checklist')" label-for="checklist">
                    <b-button v-if="!checklistSidebar.data" @click.prevent="checklistSidebar.open"
                      variant="outline-secondary" class="w-100">
                      <i class="bi bi-paperclip"></i>

                      <span class="text-nowrap">{{
                        t("Attach checklist")
                      }}</span>
                    </b-button>
                    <div v-else class="d-flex align-items-center justify-content-between  w-100 card-custom">
                      <div class="d-flex align-items-center" style="gap: 10px">
                        <div style="height: 50px; width: 50px; position: relative">
                          <i :class="checklistSidebar.data.icon" :style="{ background: checklistSidebar.data.color }"
                            class="bi bi-list-check svg-icon title-icon" style="
                                    height: 100% !important;
                                    width: 100% !important;
                                    max-width: 100%;
                                "></i>
                        </div>
                        <div style="font-weight: medium; font-size: 18px">
                          {{ checklistSidebar.data.name }}
                        </div>
                      </div>
                      <i @click="checklistSidebar.reset" :style="{
                        fontSize: '20px',
                        cursor: 'pointer',
                      }" class="bi bi-dash-circle-fill"></i>
                    </div>

                  </b-form-group>
                </b-col>
                <b-col cols="6" md="6">
                  <b-form-group :label="t('Procedure')" label-for="procedure">
                    <b-button v-if="!procedureSidebar.data" @click.prevent="procedureSidebar.open"
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
                          {{ procedureSidebar.data.data.title }}
                        </div>
                      </div>
                      <i @click="procedureSidebar.reset" :style="{
                        fontSize: '20px',
                        cursor: 'pointer',
                      }" class="bi bi-dash-circle-fill"></i>
                    </div>
                  </b-form-group>

                </b-col>
                <b-col sm="6">
                  <b-form-group :label="t('Select Storage Location')
                    " label-for="storageLocation">
                    <InfiniteScrollSelect v-model="formData.storageLocation" @onSearch="storageLocations.search
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
                <b-col xl=" 12" sm="12">
                  <h2 class="mr-1 md-2">
                    {{ t("Files") }}
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
                          + {{ names.length - 1 }}
                          {{ t("More files") }}
                        </b-badge>
                      </template>
                    </b-form-file>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <div class="d-flex align-items-center justify-content-end">
                    <b-button variant="primary" type="submit">
                      <span class="text-nowrap">{{
                        t("Create Equipment")
                      }}</span>
                    </b-button>
                  </div>
                </b-col>
              </b-row>
            </div>
          </b-form>
        </validation-observer>
      </div>
    </b-modal>
    <Qrcode :is-qrcode-active.sync="isQrcodeActive" :qrText="formData.id" v-if="isQrcodeActive" />
    <Checklist :isOpen="checklistSidebar.isOpen" @attach="checklistSidebar.attach" @close="checklistSidebar.close" />
    <Procedure :isOpen="procedureSidebar.isOpen" @attach="procedureSidebar.attach" @close="procedureSidebar.close" />
  </div>
</template>

<script>
import {
  BRow,
  BImg,
  BCol,
  BForm,
  BMedia,
  BBadge,
  BButton,
  BFormFile,
  BFormInput,
  BFormGroup,
  BFormInvalidFeedback,
} from "bootstrap-vue";
import { ref, onMounted, reactive } from "@vue/composition-api";
import { required } from "@validations";
import formValidation from "@core/comp-functions/forms/form-validation";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import useEquipments from "@/composables/equipments";
import vSelect from "vue-select";
import { useInputImageRenderer } from "@core/comp-functions/forms/form-utils";
import { useUtils as useI18nUtils } from "@core/libs/i18n";
import Qrcode from "./Qrcode.vue";
import useEquipmentCategories from "@/composables/equipment-categories";
import useStorageLocations from "@/composables/storage-location";
import InfiniteScrollSelect from "../components/InfiniteScrollSelect.vue";
import Checklist from "./sidebar/Checklist.vue";
import Procedure from "./sidebar/Procedure.vue";
import toaster from "@/composables/toaster";

export default {
  components: {
    BCol,
    BImg,
    BRow,
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
    Qrcode,
    InfiniteScrollSelect,
    Checklist,
    Procedure
  },
  model: {
    prop: "isAddEquipmentActive",
    event: "update:is-add-equipment-active",
  },
  props: {
    isAddEquipmentActive: {
      type: Boolean,
      required: true,
    },
  },
  setup(_, { emit }) {
    const { busy, respResult, storeEquipment } = useEquipments();

    const { t } = useI18nUtils();
    const isQrcodeActive = ref(false);
    const { apiHelpers, equipmentCategories, getEquipmentCategories } =
      useEquipmentCategories();

    const {
      apiHelpers: storageApiHelpers,
      storageLocations,
      getStorageLocations,
    } = useStorageLocations();

    const checklistSidebar = reactive({
      data: null,
      isOpen: false,
      open() {
        procedureSidebar.isOpen = false
        this.isOpen = true
      },
      close() {
        checklistSidebar.isOpen = false
      },
      attach(value) {
        checklistSidebar.isOpen = false
        formData.value.checklist = value.id
        checklistSidebar.data = value
      },
      reset() {
        formData.value.checklist = null
        checklistSidebar.data = null
      }

    });

    const procedureSidebar = reactive({
      data: null,
      isOpen: false,
      open() {
        checklistSidebar.isOpen = false
        this.isOpen = true
      },
      close() {
        procedureSidebar.isOpen = false
      },
      attach(value) {
        procedureSidebar.isOpen = false
        formData.value.procedure = value.id
        procedureSidebar.data = value
      },
      reset() {
        formData.value.procedure = null
        procedureSidebar.data = null
      }

    });

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

    const initialState = {
      id: crypto.randomUUID(),
      name: "",
      serial_number: "",
      supplier: "",
      category: "",
      certificate_number: "",
      valid_until: "",
      storageLocation: null,
      image: "",
      checklist: null,
      procedure: null,
      level_of_training: null,
      qr_code: false,
    };

    const files = ref([]);

    const formData = ref({ ...initialState });

    const { refFormObserver, getValidationState, resetForm } =
      formValidation();

    const onSubmit = async () => {
      try {
        if (
          !formData.value.name ||
          !formData.value.supplier ||
          !formData.value.storageLocation ||
          !formData.value.id
        ) {
          toaster().error("Please fill in all required fields.");
          return;
        }


        const formNewData = new FormData();

        // Add files to the FormData object
        if (files.value && files.value.length > 0) {
          for (let index = 0; index < files.value.length; index++) {
            formNewData.append("files[]", files.value[index]);
          }
        }

        formNewData.append("name", formData.value.name || "");
        formNewData.append("serial_number", formData.value.serial_number || "");
        formNewData.append("supplier", formData.value.supplier || "");
        formNewData.append("category_id", formData.value.category || "");
        formNewData.append("certificate_number", formData.value.certificate_number || "");
        formNewData.append("valid_until", formData.value.valid_until || "");
        formNewData.append("image", formData.value.image || "");
        formNewData.append("storage_location_id", formData.value.storageLocation || "");
        formNewData.append("checklist_id", formData.value.checklist || "");
        formNewData.append("procedure_id", formData.value.procedure || "");
        formNewData.append("level_of_training", formData.value.level_of_training || "");
        formNewData.append("qr_code", formData.value.qr_code ? 1 : 0);
        formNewData.append("tool_id", formData.value.id);

        // Send data to the server
        const response = await storeEquipment(formNewData);

        // Handle response
        if (response.status === 200) {
          emit("refetch-data");
          emit("update:is-add-equipment-active", false);
        } else {
          console.error("Failed to store equipment:", response);
        }
      } catch (error) {
        console.error("An error occurred while submitting the form:", error);
      }
    };

    const refInputEl = ref(null);
    const previewImg = ref(null);

    // remove image
    const removeImage = () => {
      previewImg.value = "";
      formData.value.image = "";
    };

    const { inputImageRenderer } = useInputImageRenderer(
      refInputEl,
      (base64) => {
        formData.value.image = base64;
        previewImg.value = base64;
      }
    );

    const addQrcoode = () => {
      isQrcodeActive.value = true;
      formData.value.qr_code = true;
    };

    onMounted(() => {
      getEquipmentCategories();
      getStorageLocations();
    });

    return {
      t,
      busy,
      files,
      formData,
      onSubmit,
      required,
      resetForm,
      previewImg,
      addQrcoode,
      refInputEl,
      removeImage,
      refFormObserver,
      inputImageRenderer,
      getValidationState,
      isQrcodeActive,
      apiHelpers,
      equipmentCategories,
      getEquipmentCategories,
      storageApiHelpers,
      storageLocations,
      getStorageLocations,
      checklistSidebar,
      procedureSidebar,
      levelOfTrainingOptions
    };
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>

<style lang="scss" scoped>
.icon {
  width: 20px;
}

.btn-qr {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0px;
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  gap: 5px;
}
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