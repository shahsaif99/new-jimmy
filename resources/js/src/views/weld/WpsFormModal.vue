<template>
  <b-modal
    :visible="visible"
    :title="isEdit ? 'Edit WPS' : 'Add WPS'"
    size="lg"
    hide-footer
    @hidden="onClose"
  >
    <b-form @submit.prevent="handleSubmit">
      <b-row>
        <!-- Document name -->
        <b-col md="6">
          <b-form-group label="Document name" label-for="wps-name">
            <b-form-input
              id="wps-name"
              v-model="form.name"
              placeholder="Free text"
              required
            />
          </b-form-group>
        </b-col>
        <!-- WPQR -->
        <b-col md="6">
          <b-form-group label="WPQR" label-for="wps-wpqr">
            <b-form-input
              id="wps-wpqr"
              v-model="form.wpqr"
              placeholder="Free text"
            />
          </b-form-group>
        </b-col>
        <!-- Welding process -->
        <b-col md="6">
          <b-form-group label="Welding process" label-for="wps-process">
            <b-form-select
              id="wps-process"
              v-model="form.welding_process"
              :options="[{ value: null, text: 'Select...' }, ...weldingProcessOptions]"
              required
            />
          </b-form-group>
        </b-col>
        <!-- Material group -->
        <b-col md="6">
          <b-form-group label="Material group" label-for="wps-material">
            <b-form-select
              id="wps-material"
              v-model="form.material_group"
              :options="[{ value: null, text: 'Select...' }, ...materialGroupOptions]"
              required
            />
          </b-form-group>
        </b-col>
        <!-- Welding Position (multiple) -->
        <b-col md="6">
          <b-form-group label="Welding Position" label-for="wps-position">
            <v-select
              id="wps-position"
              v-model="form.welding_position"
              :options="weldingPositionOptions"
              multiple
              placeholder="Select..."
            />
          </b-form-group>
        </b-col>
        <!-- Joint type (multiple) -->
        <b-col md="6">
          <b-form-group label="Joint type" label-for="wps-joint">
            <v-select
              id="wps-joint"
              v-model="form.joint_type"
              :options="jointTypeOptions"
              multiple
              placeholder="Select..."
            />
          </b-form-group>
        </b-col>
        <!-- Thickness (mm) -->
        <b-col md="6">
          <b-form-group label="Thickness (mm)">
            <div class="d-flex align-items-center">
              <b-form-input
                v-model="form.thickness_min"
                placeholder="Min"
                class="mr-50"
              />
              <span class="mx-50">-</span>
              <b-form-input
                v-model="form.thickness_max"
                placeholder="Max"
              />
            </div>
          </b-form-group>
        </b-col>
        <!-- Diameter (mm) -->
        <b-col md="6">
          <b-form-group label="Diameter (mm)">
            <div class="d-flex align-items-center">
              <b-form-input
                v-model="form.diameter_min"
                placeholder="Min"
                class="mr-50"
              />
              <span class="mx-50">-</span>
              <b-form-input
                v-model="form.diameter_max"
                placeholder="Max"
              />
            </div>
          </b-form-group>
        </b-col>
        <!-- Layer -->
        <b-col md="6">
          <b-form-group label="Layer" label-for="wps-layer">
            <b-form-select
              id="wps-layer"
              v-model="form.layer"
              :options="[{ value: null, text: 'Single layer / Multi layer' }, ...layerOptions]"
            />
          </b-form-group>
        </b-col>
        <!-- Single / Double (sides) -->
        <b-col md="6">
          <b-form-group label="Single / Double" label-for="wps-sides">
            <b-form-select
              id="wps-sides"
              v-model="form.sides"
              :options="[{ value: null, text: 'Single side / double side' }, ...sidesOptions]"
            />
          </b-form-group>
        </b-col>
        <!-- Standard (multiple) -->
        <b-col md="6">
          <b-form-group label="Standard" label-for="wps-standard">
            <v-select
              id="wps-standard"
              v-model="form.standard"
              :options="standardOptions"
              multiple
              placeholder="Select..."
            />
          </b-form-group>
        </b-col>
        <!-- Ref. Spec (multiple) -->
        <b-col md="6">
          <b-form-group label="Ref. Spec." label-for="wps-refspec">
            <v-select
              id="wps-refspec"
              v-model="form.ref_spec"
              :options="refSpecOptions"
              multiple
              placeholder="Select..."
            />
          </b-form-group>
        </b-col>
        <!-- Prepared date -->
        <b-col md="6">
          <b-form-group label="Prepared date" label-for="wps-date">
            <b-form-input
              id="wps-date"
              v-model="form.prepared_date"
              type="date"
              placeholder="dd.mm.yyyy"
            />
          </b-form-group>
        </b-col>
        <!-- Prepared by -->
        <b-col md="6">
          <b-form-group label="Prepared by" label-for="wps-preparedby">
            <b-form-select
              id="wps-preparedby"
              v-model="form.prepared_by"
              :options="userOptions"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <!-- File upload -->
      <b-row>
        <b-col md="12">
          <b-form-group>
            <div
              class="drop-zone"
              :class="{ 'drop-zone--dragging': isDragging }"
              @dragover.prevent="isDragging = true"
              @dragleave.prevent="isDragging = false"
              @drop.prevent="onDrop"
              @click="$refs.fileInput.click()"
            >
              <input
                ref="fileInput"
                type="file"
                style="display: none"
                @change="onFileSelect"
              />
              <div class="drop-zone__content text-center">
                <feather-icon icon="UploadCloudIcon" size="28" class="text-primary mb-50" />
                <p class="mb-0">Drag &amp; Drop your files or <span class="text-primary">Browse</span></p>
              </div>
            </div>
            <!-- Existing files (edit mode) -->
            <div v-if="existingFiles.length" class="mt-1">
              <b-badge
                v-for="file in existingFiles"
                :key="file.id"
                variant="light-success"
                class="p-50 mr-50 mb-50"
              >
                {{ file.filename }}
                <feather-icon
                  icon="XIcon"
                  size="14"
                  class="ml-50 cursor-pointer"
                  @click="removeExistingFile(file.id)"
                />
              </b-badge>
            </div>
            <!-- Newly selected file -->
            <div v-if="attachment" class="mt-1">
              <b-badge variant="light-primary" class="p-50">
                {{ attachment.name }}
                <feather-icon
                  icon="XIcon"
                  size="14"
                  class="ml-50 cursor-pointer"
                  @click="attachment = null"
                />
              </b-badge>
            </div>
          </b-form-group>
        </b-col>
      </b-row>

      <div class="d-flex justify-content-end mt-1">
        <b-button type="submit" variant="primary" :disabled="apiHelpers.loading">
          Save
        </b-button>
      </div>
    </b-form>
  </b-modal>
</template>

<script>
import {
  BModal,
  BForm,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BButton,
  BRow,
  BCol,
  BBadge,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { ref, onMounted, watch } from '@vue/composition-api'
import useWps, {
  weldingProcessOptions,
  materialGroupOptions,
  weldingPositionOptions,
  jointTypeOptions,
  layerOptions,
  sidesOptions,
  standardOptions,
  refSpecOptions,
} from '@/composables/wps'
import axios from '@axios'
import route from 'ziggy-js'

export default {
  components: {
    BModal,
    BForm,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BButton,
    BRow,
    BCol,
    BBadge,
    vSelect,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
    editData: {
      type: Object,
      default: null,
    },
    projectId: {
      type: [Number, String],
      default: null,
    },
  },
  setup(props, { emit }) {
    const { form, apiHelpers, storeWps, updateWps, dialog } = useWps()

    const attachment = ref(null)
    const isDragging = ref(false)
    const userOptions = ref([{ value: null, text: 'Select...' }])
    const existingFiles = ref([])
    const removedMediaIds = ref([])

    const loadUsers = async () => {
      try {
        const response = await axios.get(route('users.index'))
        userOptions.value = [
          { value: null, text: 'Select...' },
          ...response.data.data.map((u) => ({
            value: u.id,
            text: u.name || `${u.first_name} ${u.last_name}`,
          })),
        ]
      } catch (e) {
        // Users not critical
      }
    }

    const onDrop = (e) => {
      isDragging.value = false
      const file = e.dataTransfer.files[0]
      if (file) attachment.value = file
    }

    const onFileSelect = (e) => {
      const file = e.target.files[0]
      if (file) attachment.value = file
      e.target.value = ''
    }

    const removeExistingFile = (mediaId) => {
      removedMediaIds.value.push(mediaId)
      existingFiles.value = existingFiles.value.filter((f) => f.id !== mediaId)
    }

    const handleSubmit = async () => {
      let success
      if (props.isEdit) {
        dialog.temp.wps.id = props.editData.id
        success = await updateWps(attachment.value, removedMediaIds.value)
      } else {
        success = await storeWps(attachment.value)
      }
      if (success) {
        attachment.value = null
        removedMediaIds.value = []
        existingFiles.value = []
        emit('saved')
      }
    }

    const onClose = () => {
      form.reset()
      attachment.value = null
      removedMediaIds.value = []
      existingFiles.value = []
      emit('close')
    }

    watch(
      () => props.visible,
      (val) => {
        if (val) {
          if (props.isEdit && props.editData) {
            form.set({
              name: props.editData.name,
              wpqr: props.editData.wpqr,
              welding_process: props.editData.welding_process,
              material_group: props.editData.material_group,
              welding_position: props.editData.welding_position || [],
              joint_type: props.editData.joint_type || [],
              thickness_min: props.editData.thickness_min,
              thickness_max: props.editData.thickness_max,
              diameter_min: props.editData.diameter_min,
              diameter_max: props.editData.diameter_max,
              layer: props.editData.layer,
              sides: props.editData.sides,
              standard: props.editData.standard || [],
              ref_spec: props.editData.ref_spec || [],
              prepared_date: props.editData.prepared_date,
              prepared_by: props.editData.prepared_by,
              project_id: props.editData.project_id,
            })
            existingFiles.value = props.editData.media ? [...props.editData.media] : []
            removedMediaIds.value = []
          } else {
            form.reset()
            if (props.projectId) {
              form.project_id = props.projectId
            }
          }
        }
      }
    )

    onMounted(() => {
      loadUsers()
    })

    return {
      form,
      apiHelpers,
      attachment,
      isDragging,
      userOptions,
      weldingProcessOptions,
      materialGroupOptions,
      weldingPositionOptions,
      jointTypeOptions,
      layerOptions,
      sidesOptions,
      standardOptions,
      refSpecOptions,
      existingFiles,
      removeExistingFile,
      onDrop,
      onFileSelect,
      handleSubmit,
      onClose,
    }
  },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
</style>

<style lang="scss" scoped>
.drop-zone {
  border: 2px dashed #c8c8c8;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.2s, background-color 0.2s;
}
.drop-zone:hover,
.drop-zone--dragging {
  border-color: #7367f0;
  background-color: #f8f7ff;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
