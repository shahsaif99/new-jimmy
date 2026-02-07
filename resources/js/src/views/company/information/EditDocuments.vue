<template>
  <b-modal
    :visible="show"
    :title="t('Upload Documents')"
    @hidden="$emit('update:show', false)"
  >
    <b-form-group :label="t('Select Files')">
      <b-form-file
        v-model="files"
        :placeholder="t('Choose files or drop them here...')"
        multiple
      />
    </b-form-group>
    <div v-if="files && files.length > 0" class="mt-1">
      <div v-for="(file, index) in files" :key="index" class="d-flex align-items-center py-25">
        <feather-icon icon="FileTextIcon" size="14" class="mr-50" />
        <span>{{ file.name }}</span>
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
  BFormFile,
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
    BFormFile,
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

    watch(
      () => props.show,
      (val) => {
        if (!val) {
          files.value = null;
        }
      }
    );

    const save = async () => {
      if (!files.value || files.value.length === 0) return;
      const formData = new FormData();
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
      files,
      busy,
      save,
    };
  },
};
</script>
