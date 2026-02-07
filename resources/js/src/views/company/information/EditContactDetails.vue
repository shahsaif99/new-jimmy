<template>
  <b-modal
    :visible="show"
    :title="t('Edit Contact Details')"
    size="lg"
    @hidden="$emit('update:show', false)"
  >
    <b-row>
      <b-col cols="6">
        <b-form-group :label="t('Contact Person')" label-size="md">
          <b-form-input v-model="form.contact_person" :placeholder="t('Enter contact person')" size="md" />
        </b-form-group>
      </b-col>
      <b-col cols="6">
        <b-form-group :label="t('E-mail')" label-size="md">
          <b-form-input v-model="form.email" type="email" :placeholder="t('Enter email')" size="md" />
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="6">
        <b-form-group :label="t('Phone')" label-size="md">
          <b-form-input v-model="form.phone" :placeholder="t('Enter phone number')" size="md" />
        </b-form-group>
      </b-col>
      <b-col cols="6">
        <b-form-group :label="t('Website')" label-size="md">
          <b-form-input v-model="form.website" :placeholder="t('Enter website')" size="md" />
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="6">
        <b-form-group :label="t('Postal Address')" label-size="md">
          <b-form-input v-model="form.postal_address" :placeholder="t('Enter postal address')" size="md" />
        </b-form-group>
      </b-col>
      <b-col cols="6">
        <b-form-group :label="t('Visiting Address')" label-size="md">
          <b-form-input v-model="form.visiting_address" :placeholder="t('Enter visiting address')" size="md" />
        </b-form-group>
      </b-col>
    </b-row>

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
      contact_person: "",
      email: "",
      phone: "",
      website: "",
      postal_address: "",
      visiting_address: "",
    });

    watch(
      () => props.show,
      (val) => {
        if (val && props.companyInfo) {
          form.contact_person = props.companyInfo.contact_person || "";
          form.email = props.companyInfo.email || "";
          form.phone = props.companyInfo.phone || "";
          form.website = props.companyInfo.website || "";
          form.postal_address = props.companyInfo.postal_address || "";
          form.visiting_address = props.companyInfo.visiting_address || "";
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
