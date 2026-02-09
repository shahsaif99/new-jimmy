<template>
  <b-modal
    :visible="show"
    :title="t('Upload Documents')"
    @hidden="$emit('update:show', false)"
  >
    <b-form-group :label="t('Title')">
      <b-form-input v-model="title" :placeholder="t('Enter document title')" />
    </b-form-group>
    <b-form-group :label="t('Attach Documents')">
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
          multiple
          style="display: none"
          @change="onFileSelect"
        />
        <div class="drop-zone__content">
          <feather-icon icon="UploadIcon" size="28" class="drop-zone__icon" />
          <p class="drop-zone__text mb-0 mt-1">{{ t('Drag and Drop here') }}</p>
          <p class="drop-zone__or mb-0">{{ t('or') }}</p>
          <p class="drop-zone__browse mb-0">{{ t('Browse files') }}</p>
        </div>
      </div>
    </b-form-group>
    <div v-if="files && files.length > 0" class="mt-1">
      <div v-for="(file, index) in files" :key="index" class="d-flex align-items-center justify-content-between py-25">
        <div class="d-flex align-items-center">
          <feather-icon icon="FileTextIcon" size="14" class="mr-50" />
          <span>{{ file.name }}</span>
        </div>
        <feather-icon icon="XIcon" size="14" class="cursor-pointer text-danger" @click="removeFile(index)" />
      </div>
    </div>

    <template #modal-footer>
      <div class="d-flex align-items-center">
        <b-button variant="primary" size="sm" class="mr-1" :disabled="busy || !files || files.length === 0" @click="save">
          <b-spinner v-if="busy" label="Spinning" small />
          <feather-icon v-else icon="UploadIcon" size="16" />
          {{ t('Upload') }}
        </b-button>
        <b-button variant="outline-primary" size="sm" :disabled="busy" @click="$emit('update:show', false)">
          <feather-icon icon="XIcon" size="16" />
          {{ t('Close') }}
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
import {
  BModal,
  BFormGroup,
  BFormInput,
  BButton,
  BSpinner,
} from "bootstrap-vue";
import { ref, watch } from "@vue/composition-api";
import { useUtils as useI18nUtils } from "@core/libs/i18n";
import useCompanyInformation from "@/composables/company-information";

export default {
  components: {
    BModal,
    BFormGroup,
    BFormInput,
    BButton,
    BSpinner,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const { t } = useI18nUtils();
    const { busy, uploadDocuments } = useCompanyInformation();

    const files = ref(null);
    const title = ref("");
    const isDragging = ref(false);

    const onDrop = (e) => {
      isDragging.value = false;
      const droppedFiles = Array.from(e.dataTransfer.files);
      if (droppedFiles.length) {
        files.value = files.value ? [...files.value, ...droppedFiles] : droppedFiles;
      }
    };

    const onFileSelect = (e) => {
      const selectedFiles = Array.from(e.target.files);
      if (selectedFiles.length) {
        files.value = files.value ? [...files.value, ...selectedFiles] : selectedFiles;
      }
      e.target.value = '';
    };

    const removeFile = (index) => {
      files.value.splice(index, 1);
      if (files.value.length === 0) files.value = null;
    };

    watch(
      () => props.show,
      (val) => {
        if (!val) {
          files.value = null;
          title.value = "";
        }
      }
    );

    const save = async () => {
      if (!files.value || files.value.length === 0) return;
      const formData = new FormData();
      if (title.value) {
        formData.append("title", title.value);
      }
      files.value.forEach((file) => {
        formData.append("files[]", file);
      });
      const response = await uploadDocuments(formData);
      if (response) {
        emit("saved");
        emit("update:show", false);
      }
    };

    return {
      t,
      title,
      files,
      busy,
      save,
      isDragging,
      onDrop,
      onFileSelect,
      removeFile,
    };
  },
};
</script>

<style scoped>
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
.drop-zone__content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.drop-zone__icon {
  color: #5e5873;
}
.drop-zone__text {
  font-weight: 600;
  color: #5e5873;
  font-size: 14px;
}
.drop-zone__or {
  color: #b9b9c3;
  font-size: 13px;
}
.drop-zone__browse {
  color: #7367f0;
  font-weight: 600;
  font-size: 14px;
}
</style>
