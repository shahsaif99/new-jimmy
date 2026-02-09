<template>
  <div>
    <b-row>
      <!-- Left Column -->
      <b-col cols="12" md="8">
        <!-- Company Details Card -->
        <b-card>
          <div class="d-flex justify-content-between align-items-center mb-1">
            <h5 class="mb-0">{{ t('Company Details') }}</h5>
            <b-button
              v-if="$can('company-edit', 'all')"
              variant="flat-primary"
              size="sm"
              @click="showEditCompanyDetails = true"
            >
              <feather-icon icon="EditIcon" size="14" class="mr-25" />
              {{ t('Edit') }}
            </b-button>
          </div>
          <b-row>
            <b-col cols="6">
              <div class="mb-1">
                <small class="text-muted">{{ t('Legal Name') }}</small>
                <p class="mb-0">{{ companyInfo && companyInfo.legal_name || '-' }}</p>
              </div>
            </b-col>
            <b-col cols="6">
              <div class="mb-1">
                <small class="text-muted">{{ t('Display Name') }}</small>
                <p class="mb-0">{{ companyInfo && companyInfo.display_name || '-' }}</p>
              </div>
            </b-col>
            <b-col cols="6">
              <div class="mb-1">
                <small class="text-muted">{{ t('Org. Number') }}</small>
                <p class="mb-0">{{ companyInfo && companyInfo.org_number || '-' }}</p>
              </div>
            </b-col>
            <b-col cols="6">
              <div class="mb-1">
                <small class="text-muted">{{ t('DUNS Number') }}</small>
                <p class="mb-0">{{ companyInfo && companyInfo.duns_number || '-' }}</p>
              </div>
            </b-col>
          </b-row>
        </b-card>

        <!-- Contact Details Card -->
        <b-card>
          <div class="d-flex justify-content-between align-items-center mb-1">
            <h5 class="mb-0">{{ t('Contact Details') }}</h5>
            <b-button
              v-if="$can('company-edit', 'all')"
              variant="flat-primary"
              size="sm"
              @click="showEditContactDetails = true"
            >
              <feather-icon icon="EditIcon" size="14" class="mr-25" />
              {{ t('Edit') }}
            </b-button>
          </div>
          <b-row>
            <b-col cols="6">
              <div class="mb-1">
                <small class="text-muted">{{ t('Contact Person') }}</small>
                <p class="mb-0">{{ companyInfo && companyInfo.contact_person || '-' }}</p>
              </div>
            </b-col>
            <b-col cols="6">
              <div class="mb-1">
                <small class="text-muted">{{ t('E-mail') }}</small>
                <p class="mb-0">{{ companyInfo && companyInfo.email || '-' }}</p>
              </div>
            </b-col>
            <b-col cols="6">
              <div class="mb-1">
                <small class="text-muted">{{ t('Phone') }}</small>
                <p class="mb-0">{{ companyInfo && companyInfo.phone || '-' }}</p>
              </div>
            </b-col>
            <b-col cols="6">
              <div class="mb-1">
                <small class="text-muted">{{ t('Website') }}</small>
                <p class="mb-0">{{ companyInfo && companyInfo.website || '-' }}</p>
              </div>
            </b-col>
            <b-col cols="6">
              <div class="mb-1">
                <small class="text-muted">{{ t('Postal Address') }}</small>
                <p class="mb-0">{{ companyInfo && companyInfo.postal_address || '-' }}</p>
              </div>
            </b-col>
            <b-col cols="6">
              <div class="mb-1">
                <small class="text-muted">{{ t('Visiting Address') }}</small>
                <p class="mb-0">{{ companyInfo && companyInfo.visiting_address || '-' }}</p>
              </div>
            </b-col>
          </b-row>
        </b-card>

        <!-- Additional Information Card -->
        <b-card>
          <div class="d-flex justify-content-between align-items-center mb-1">
            <h5 class="mb-0">{{ t('Additional Information') }}</h5>
            <b-button
              v-if="$can('company-edit', 'all')"
              variant="flat-primary"
              size="sm"
              @click="showEditCompanyDetails = true"
            >
              <feather-icon icon="EditIcon" size="14" class="mr-25" />
              {{ t('Edit') }}
            </b-button>
          </div>
          <p class="mb-0" style="white-space: pre-wrap;">{{ companyInfo && companyInfo.additional_information || '-' }}</p>
        </b-card>
      </b-col>

      <!-- Right Column -->
      <b-col cols="12" md="4">
        <!-- Company Logo Card -->
        <b-card>
          <div class="d-flex justify-content-between align-items-center mb-1">
            <h5 class="mb-0">{{ t('Company Logo') }}</h5>
            <b-button
              v-if="$can('company-edit', 'all')"
              variant="flat-primary"
              size="sm"
              @click="showEditLogo = true"
            >
              <feather-icon icon="EditIcon" size="14" class="mr-25" />
              {{ t('Edit') }}
            </b-button>
          </div>
          <div class="text-center">
            <img
              v-if="companyInfo && companyInfo.logo_url"
              :src="companyInfo.logo_url"
              alt="Company Logo"
              class="img-fluid"
              style="max-height: 150px;"
            />
            <p v-else class="text-muted mb-0">{{ t('No logo uploaded') }}</p>
          </div>
        </b-card>

        <!-- Documents / Declarations Card -->
        <b-card>
          <div class="d-flex justify-content-between align-items-center mb-1">
            <h5 class="mb-0">{{ t('Documents / Declarations') }}</h5>
            <b-button
              v-if="$can('company-edit', 'all')"
              variant="flat-primary"
              size="sm"
              @click="showEditDocuments = true"
            >
              <feather-icon icon="PlusIcon" size="14" class="mr-25" />
              {{ t('Add') }}
            </b-button>
          </div>
          <div v-if="documents.length === 0">
            <p class="text-muted mb-0">{{ t('No documents uploaded') }}</p>
          </div>
          <div v-else>
            <div
              v-for="doc in documents"
              :key="doc.id"
              class="d-flex justify-content-between align-items-center py-50 border-bottom"
            >
              <div>
                <div v-if="doc.title" class="font-weight-bold">{{ doc.title }}</div>
                <div class="d-flex align-items-center">
                  <feather-icon icon="FileTextIcon" size="16" class="mr-50 text-primary" />
                  <a :href="doc.url" target="_blank">{{ doc.filename }}.{{ doc.extension }}</a>
                </div>
              </div>
              <b-button
                v-if="$can('company-edit', 'all')"
                variant="flat-danger"
                size="sm"
                class="btn-icon"
                @click="handleDeleteDocument(doc.id)"
              >
                <feather-icon icon="TrashIcon" size="14" />
              </b-button>
            </div>
          </div>
        </b-card>
      </b-col>
    </b-row>

    <!-- Edit Modals -->
    <EditCompanyDetails
      :show.sync="showEditCompanyDetails"
      :company-info="companyInfo"
      @saved="onSaved"
    />
    <EditContactDetails
      :show.sync="showEditContactDetails"
      :company-info="companyInfo"
      @saved="onSaved"
    />
    <EditLogo
      :show.sync="showEditLogo"
      @saved="onSaved"
    />
    <EditDocuments
      :show.sync="showEditDocuments"
      @saved="onSaved"
    />
  </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BButton,
} from "bootstrap-vue";
import { onMounted, ref, computed } from "@vue/composition-api";
import { useUtils as useI18nUtils } from "@core/libs/i18n";
import useCompanyInformation from "@/composables/company-information";
import EditCompanyDetails from "./EditCompanyDetails.vue";
import EditContactDetails from "./EditContactDetails.vue";
import EditLogo from "./EditLogo.vue";
import EditDocuments from "./EditDocuments.vue";

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BButton,
    EditCompanyDetails,
    EditContactDetails,
    EditLogo,
    EditDocuments,
  },
  setup() {
    const { t } = useI18nUtils();
    const { busy, companyInfo, getCompanyInfo, deleteDocument } = useCompanyInformation();

    const showEditCompanyDetails = ref(false);
    const showEditContactDetails = ref(false);
    const showEditLogo = ref(false);
    const showEditDocuments = ref(false);

    const documents = computed(() => {
      if (companyInfo.value && companyInfo.value.media) {
        return companyInfo.value.media;
      }
      return [];
    });

    const onSaved = () => {
      getCompanyInfo();
    };

    const handleDeleteDocument = async (id) => {
      const response = await deleteDocument(id);
      if (response) {
        getCompanyInfo();
      }
    };

    onMounted(() => {
      getCompanyInfo();
    });

    return {
      t,
      busy,
      companyInfo,
      documents,
      showEditCompanyDetails,
      showEditContactDetails,
      showEditLogo,
      showEditDocuments,
      onSaved,
      handleDeleteDocument,
    };
  },
};
</script>
