<template>
  <b-modal
    :visible="show"
    :title="t('Edit Company Details')"
    size="lg"
    @hidden="$emit('update:show', false)"
  >
    <b-row>
      <b-col cols="6">
        <b-form-group :label="t('Legal Name')" label-size="md">
          <b-form-input v-model="form.legal_name" :placeholder="t('Enter legal name')" size="md" />
        </b-form-group>
      </b-col>
      <b-col cols="6">
        <b-form-group :label="t('Display Name')" label-size="md">
          <b-form-input v-model="form.display_name" :placeholder="t('Enter display name')" size="md" />
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="6">
        <b-form-group :label="t('Org. Number')" label-size="md">
          <b-form-input v-model="form.org_number" :placeholder="t('Enter org. number')" size="md" />
        </b-form-group>
      </b-col>
      <b-col cols="6">
        <b-form-group :label="t('DUNS Number')" label-size="md">
          <b-form-input v-model="form.duns_number" :placeholder="t('Enter DUNS number')" size="md" />
        </b-form-group>
      </b-col>
    </b-row>
    <b-form-group :label="t('Additional Information')" label-size="md">
      <b-form-textarea v-model="form.additional_information" :placeholder="t('Enter additional information')" rows="4" />
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
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormTextarea,
  BButton,
  BSpinner,
} from "bootstrap-vue";
import { reactive, watch } from "@vue/composition-api";
import { useUtils as useI18nUtils } from "@core/libs/i18n";
import useCompanyInformation from "@/composables/company-information";

export default {
  components: {
    BModal,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormTextarea,
    BButton,
    BSpinner,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    companyInfo: {
      type: Object,
      default: null,
    },
  },
  setup(props, { emit }) {
    const { t } = useI18nUtils();
    const { busy, updateCompanyInfo } = useCompanyInformation();

    const form = reactive({
      legal_name: "",
      display_name: "",
      org_number: "",
      duns_number: "",
      additional_information: "",
    });

    watch(
      () => props.show,
      (val) => {
        if (val && props.companyInfo) {
          form.legal_name = props.companyInfo.legal_name || "";
          form.display_name = props.companyInfo.display_name || "";
          form.org_number = props.companyInfo.org_number || "";
          form.duns_number = props.companyInfo.duns_number || "";
          form.additional_information = props.companyInfo.additional_information || "";
        }
      }
    );

    const save = async () => {
      const response = await updateCompanyInfo({ ...form });
      if (response) {
        emit("saved");
        emit("update:show", false);
      }
    };

    return {
      t,
      form,
      busy,
      save,
    };
  },
};
</script>
