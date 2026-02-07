<template>
  <b-modal
    :visible="show"
    :title="t('Upload Company Logo')"
    @hidden="$emit('update:show', false)"
  >
    <b-form-group :label="t('Logo Image')">
      <b-form-file
        v-model="file"
        :placeholder="t('Choose a file or drop it here...')"
        accept="image/*"
        @input="onFileChange"
      />
    </b-form-group>
    <div v-if="preview" class="text-center mt-1">
      <img :src="preview" alt="Preview" class="img-fluid" style="max-height: 150px;" />
    </div>

    <template #modal-footer>
      <div class="d-flex align-items-center">
        <b-button variant="primary" size="sm" class="mr-1" :disabled="busy || !preview" @click="save">
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
    const { busy, uploadLogo } = useCompanyInformation();

    const file = ref(null);
    const preview = ref(null);

    watch(
      () => props.show,
      (val) => {
        if (!val) {
          file.value = null;
          preview.value = null;
        }
      }
    );

    const onFileChange = (f) => {
      if (f) {
        const reader = new FileReader();
        reader.onload = (e) => {
          preview.value = e.target.result;
        };
        reader.readAsDataURL(f);
      } else {
        preview.value = null;
      }
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
      onFileChange,
      save,
    };
  },
};
</script>
