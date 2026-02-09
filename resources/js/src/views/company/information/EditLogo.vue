<template>
  <b-modal
    :visible="show"
    :title="t('Add Logo')"
    @hidden="$emit('update:show', false)"
  >
    <b-form-group :label="t('Preview')">
      <div class="preview-box text-center">
        <img v-if="preview" :src="preview" alt="Preview" class="img-fluid" style="max-height: 150px;" />
        <span v-else class="text-muted">{{ t('No image selected') }}</span>
      </div>
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
          accept="image/*"
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

    <template #modal-footer>
      <b-button variant="primary" block :disabled="busy || !preview" @click="save">
        <b-spinner v-if="busy" label="Spinning" small class="mr-50" />
        {{ t('Upload') }}
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import {
  BModal,
  BFormGroup,
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
    const { busy, uploadLogo } = useCompanyInformation();

    const file = ref(null);
    const preview = ref(null);
    const isDragging = ref(false);

    watch(
      () => props.show,
      (val) => {
        if (!val) {
          file.value = null;
          preview.value = null;
        }
      }
    );

    const processFile = (f) => {
      if (f && f.type.startsWith("image/")) {
        file.value = f;
        const reader = new FileReader();
        reader.onload = (e) => {
          preview.value = e.target.result;
        };
        reader.readAsDataURL(f);
      }
    };

    const onDrop = (e) => {
      isDragging.value = false;
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) {
        processFile(droppedFile);
      }
    };

    const onFileSelect = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        processFile(selectedFile);
      }
      e.target.value = '';
    };

    const save = async () => {
      if (!preview.value) return;
      const response = await uploadLogo({ logo: preview.value });
      if (response) {
        emit("saved");
        emit("update:show", false);
      }
    };

    return {
      t,
      file,
      preview,
      busy,
      save,
      isDragging,
      onDrop,
      onFileSelect,
    };
  },
};
</script>

<style scoped>
.preview-box {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
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
