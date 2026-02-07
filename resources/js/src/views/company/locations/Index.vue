<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-1">
      <h4 class="mb-0">{{ t('Locations') }}</h4>
      <b-button
        v-if="$can('company-edit', 'all')"
        variant="primary"
        size="sm"
        @click="showAddLocation = true"
      >
        <feather-icon icon="PlusIcon" size="14" class="mr-25" />
        {{ t('Add') }}
      </b-button>
    </div>

    <b-row>
      <b-col
        v-for="location in locations"
        :key="location.id"
        cols="12"
        sm="6"
        md="4"
        xl="3"
        class="mb-1"
      >
        <b-card class="h-100 mb-0">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <h5 class="mb-50">{{ location.title }}</h5>
              <p class="text-muted mb-50">
                <feather-icon icon="MapPinIcon" size="14" class="mr-25" />
                {{ location.address || '-' }}
              </p>
            </div>
            <b-dropdown
              v-if="$can('company-edit', 'all')"
              variant="link"
              no-caret
              right
              toggle-class="p-0"
            >
              <template #button-content>
                <feather-icon icon="MoreVerticalIcon" size="16" class="text-body" />
              </template>
              <b-dropdown-item @click="openEditLocation(location)">
                <feather-icon icon="EditIcon" size="14" class="mr-50" />
                {{ t('Edit') }}
              </b-dropdown-item>
              <b-dropdown-item @click="handleDeleteLocation(location.id)">
                <feather-icon icon="TrashIcon" size="14" class="mr-50" />
                {{ t('Delete') }}
              </b-dropdown-item>
            </b-dropdown>
          </div>

          <!-- Attachments -->
          <div v-if="location.media && location.media.length > 0" class="mt-50">
            <div
              v-for="attachment in location.media"
              :key="attachment.id"
              class="d-flex justify-content-between align-items-center py-25"
            >
              <div class="d-flex align-items-center text-truncate">
                <feather-icon icon="PaperclipIcon" size="14" class="mr-50 text-primary flex-shrink-0" />
                <a :href="attachment.url" target="_blank" class="text-truncate">{{ attachment.filename }}.{{ attachment.extension }}</a>
              </div>
              <b-button
                v-if="$can('company-edit', 'all')"
                variant="flat-danger"
                size="sm"
                class="btn-icon flex-shrink-0 ml-50"
                @click="handleDeleteAttachment(attachment.id)"
              >
                <feather-icon icon="XIcon" size="12" />
              </b-button>
            </div>
          </div>
        </b-card>
      </b-col>
    </b-row>

    <div v-if="locations.length === 0 && !busy" class="text-center py-3">
      <p class="text-muted">{{ t('No locations added yet.') }}</p>
    </div>

    <!-- Modals -->
    <AddLocation
      :show.sync="showAddLocation"
      @saved="onSaved"
    />
    <EditLocation
      :show.sync="showEditLocation"
      :location="selectedLocation"
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
  BDropdown,
  BDropdownItem,
} from "bootstrap-vue";
import { onMounted, ref } from "@vue/composition-api";
import { useUtils as useI18nUtils } from "@core/libs/i18n";
import useCompanyLocations from "@/composables/company-locations";
import AddLocation from "./AddLocation.vue";
import EditLocation from "./EditLocation.vue";

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BButton,
    BDropdown,
    BDropdownItem,
    AddLocation,
    EditLocation,
  },
  setup() {
    const { t } = useI18nUtils();
    const { busy, locations, fetchLocations, deleteLocation, deleteAttachment } = useCompanyLocations();

    const showAddLocation = ref(false);
    const showEditLocation = ref(false);
    const selectedLocation = ref(null);

    const openEditLocation = (location) => {
      selectedLocation.value = location;
      showEditLocation.value = true;
    };

    const handleDeleteLocation = async (id) => {
      const response = await deleteLocation(id);
      if (response) {
        fetchLocations();
      }
    };

    const handleDeleteAttachment = async (id) => {
      const response = await deleteAttachment(id);
      if (response) {
        fetchLocations();
      }
    };

    const onSaved = () => {
      fetchLocations();
    };

    onMounted(() => {
      fetchLocations();
    });

    return {
      t,
      busy,
      locations,
      showAddLocation,
      showEditLocation,
      selectedLocation,
      openEditLocation,
      handleDeleteLocation,
      handleDeleteAttachment,
      onSaved,
    };
  },
};
</script>
