<template>
  <b-modal
    :visible="visible"
    :title="editData ? 'Edit Weld Log' : 'New Weld Log'"
    size="lg"
    hide-footer
    @hidden="onClose"
  >
    <b-form @submit.prevent="handleSubmit">
      <b-row>
        <b-col md="6">
          <b-form-group label="Project" label-for="wl-project">
            <b-form-select
              id="wl-project"
              v-model="weldLogForm.project_id"
              :options="projectOptions"
              :disabled="!!projectId"
              required
            />
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="Drawing No." label-for="wl-drawing">
            <b-form-input
              id="wl-drawing"
              v-model="weldLogForm.drawing_no"
              placeholder="Enter drawing number"
              required
            />
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="Status" label-for="wl-status">
            <b-form-select
              id="wl-status"
              v-model="weldLogForm.status"
              :options="statusOptions"
              required
            />
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="NDT Required" label-for="wl-ndt">
            <b-form-select
              id="wl-ndt"
              v-model="weldLogForm.ndt_required"
              :options="ndtOptions"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row v-if="weldLogForm.ndt_required">
        <b-col md="3">
          <b-form-group label="RT" label-for="wl-rt">
            <b-form-input
              id="wl-rt"
              v-model.number="weldLogForm.ndt_rt"
              type="number"
              min="0"
            />
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group label="MT" label-for="wl-mt">
            <b-form-input
              id="wl-mt"
              v-model.number="weldLogForm.ndt_mt"
              type="number"
              min="0"
            />
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group label="PT" label-for="wl-pt">
            <b-form-input
              id="wl-pt"
              v-model.number="weldLogForm.ndt_pt"
              type="number"
              min="0"
            />
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group label="VT" label-for="wl-vt">
            <b-form-input
              id="wl-vt"
              v-model.number="weldLogForm.ndt_vt"
              type="number"
              min="0"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <!-- File upload -->
      <b-row>
        <b-col md="12">
          <b-form-group>
            <!-- Existing files (edit mode) -->
            <div v-if="existingFiles.length" class="mb-1">
              <div
                v-for="file in existingFiles"
                :key="file.id"
                class="d-flex justify-content-between align-items-center p-75 border rounded mb-50"
              >
                <div class="d-flex align-items-center">
                  <feather-icon icon="FileIcon" size="16" class="text-primary mr-75" />
                  <span>{{ file.filename }}</span>
                </div>
                <feather-icon
                  icon="XCircleIcon"
                  size="18"
                  class="text-danger cursor-pointer"
                  @click="removeExistingFile(file.id)"
                />
              </div>
            </div>

            <!-- Drag & drop zone -->
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

            <!-- New file selected -->
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

      <div class="d-flex justify-content-end mt-2">
        <b-button variant="secondary" class="mr-1" @click="onClose">
          Cancel
        </b-button>
        <b-button type="submit" variant="primary" :disabled="apiHelpers.loading">
          {{ editData ? 'Save' : 'Create' }}
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
import { ref, onMounted, watch } from '@vue/composition-api'
import useWeldLogs from '@/composables/weldLogs'
import useProjects from '@/composables/projects'
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
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    projectId: {
      type: [Number, String],
      default: null,
    },
    editData: {
      type: Object,
      default: null,
    },
  },
  setup(props, { emit }) {
    const {
      weldLogForm,
      apiHelpers,
      storeWeldLog,
      updateWeldLog,
    } = useWeldLogs()

    const { projects, fetchProjectsList } = useProjects()

    const attachment = ref(null)
    const isDragging = ref(false)
    const existingFiles = ref([])
    const removedFileIds = ref([])
    const projectOptions = ref([{ value: null, text: 'Select Project' }])

    const statusOptions = [
      { value: 'in_progress', text: 'In Progress' },
      { value: 'completed', text: 'Completed' },
    ]

    const ndtOptions = [
      { value: false, text: 'No' },
      { value: true, text: 'Yes' },
    ]

    const loadProjects = async () => {
      await fetchProjectsList()
      projectOptions.value = [
        { value: null, text: 'Select Project' },
        ...projects.value.map((p) => ({
          value: p.id,
          text: `${p.project_no} - ${p.name}`,
        })),
      ]
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

    const removeExistingFile = (fileId) => {
      existingFiles.value = existingFiles.value.filter((f) => f.id !== fileId)
      removedFileIds.value.push(fileId)
    }

    const handleSubmit = async () => {
      let success
      if (props.editData) {
        success = await updateWeldLog(props.editData.id, attachment.value, removedFileIds.value)
      } else {
        success = await storeWeldLog(attachment.value)
      }
      if (success) {
        attachment.value = null
        existingFiles.value = []
        removedFileIds.value = []
        emit('created')
      }
    }

    const onClose = () => {
      weldLogForm.reset()
      attachment.value = null
      existingFiles.value = []
      removedFileIds.value = []
      emit('close')
    }

    watch(
      () => props.visible,
      (val) => {
        if (val) {
          if (props.editData) {
            weldLogForm.project_id = props.editData.project_id
            weldLogForm.drawing_no = props.editData.drawing_no
            weldLogForm.status = props.editData.status
            weldLogForm.ndt_required = props.editData.ndt_required
            weldLogForm.ndt_rt = props.editData.ndt_rt || 0
            weldLogForm.ndt_mt = props.editData.ndt_mt || 0
            weldLogForm.ndt_pt = props.editData.ndt_pt || 0
            weldLogForm.ndt_vt = props.editData.ndt_vt || 0
            existingFiles.value = props.editData.media ? [...props.editData.media] : []
            removedFileIds.value = []
          } else {
            weldLogForm.reset()
            existingFiles.value = []
            removedFileIds.value = []
            if (props.projectId) {
              weldLogForm.project_id = props.projectId
            }
          }
        }
      }
    )

    onMounted(() => {
      loadProjects()
    })

    return {
      weldLogForm,
      apiHelpers,
      attachment,
      isDragging,
      existingFiles,
      projectOptions,
      statusOptions,
      ndtOptions,
      onDrop,
      onFileSelect,
      removeExistingFile,
      handleSubmit,
      onClose,
    }
  },
}
</script>

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
