<template>
  <b-modal
    :visible="show"
    :title="t('Edit Location')"
    @hidden="$emit('update:show', false)"
  >
    <b-form-group :label="t('Title')" label-size="md">
      <b-form-input v-model="form.title" :placeholder="t('Enter location title')" size="md" />
    </b-form-group>
    <b-form-group :label="t('Address')" label-size="md">
      <b-form-input v-model="form.address" :placeholder="t('Enter address')" size="md" />
    </b-form-group>
    <b-form-group :label="t('Add More Attachments')">
      <b-form-file
        v-model="files"
        :placeholder="t('Choose files or drop them here...')"
        multiple
      />
    </b-form-group>

    <template #modal-footer>
      <div class="d-flex align-items-center">
        <b-button variant="primary" size="sm" class="mr-1" :disabled="busy" @click="save">
          <b-spinner v-if="busy" label="Spinning" small />
          <feather-icon v-else icon="CheckIcon" size="16" />
          {{ t('Save') }}
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
  BFormFile,
  BButton,
  BSpinner,
} from "bootstrap-vue";
import { reactive, ref, watch } from "@vue/composition-api";
import { useUtils as useI18nUtils } from "@core/libs/i18n";
import useCompanyLocations from "@/composables/company-locations";

export default {
  components: {
    BModal,
    BFormGroup,
    BFormInput,
    BFormFile,
    BButton,
    BSpinner,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    location: {
      type: Object,
      default: null,
    },
  },
  setup(props, { emit }) {
    const { t } = useI18nUtils();
    const { busy, updateLocation } = useCompanyLocations();

    const form = reactive({
      title: "",
      address: "",
    });

    const files = ref(null);

    watch(
      () => props.show,
      (val) => {
        if (val && props.location) {
          form.title = props.location.title || "";
          form.address = props.location.address || "";
        }
        if (!val) {
          files.value = null;
        }
      }
    );

    const save = async () => {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("address", form.address);

      if (files.value && files.value.length > 0) {
        files.value.forEach((file) => {
          formData.append("files[]", file);
        });
      }

      const response = await updateLocation(formData, props.location.id);
      if (response) {
        emit("saved");
        emit("update:show", false);
      }
    };

    return {
      t,
      form,
      files,
      busy,
      save,
    };
  },
};
</script>
