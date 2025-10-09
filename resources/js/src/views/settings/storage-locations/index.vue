<template>
    <div>
        <AddStorageLocations :is-add-location-active.sync="isAddLocationActive" v-if="isAddLocationActive" />
        <EditStorageLocations :is-edit-location-active.sync="isEditLocationActive" v-if="isEditLocationActive" />
        <b-card no-body class="mb-0">
            <div class="m-2">
                <b-row>
                    <b-col cols="12" md="8" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
                        <v-select v-model="storageLocations.perPage" :options="storageLocations.perPageOption"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" :clearable="false"
                            class="per-page-selector d-inline-block mx-50" />
                        <label>{{ t("records per page") }}</label>
                        <b-button variant="primary" @click="isAddLocationActive = true" class="ml-3">
                            <span class="text-nowrap">{{
                                $t("Add Storage Location")
                                }}</span>
                        </b-button>
                    </b-col>
                    <b-col cols="12" md="4">
                        <div class="d-flex align-items-center justify-content-end">
                            <b-form-input v-model="storageLocations.searchLocationModel" class="d-inline-block mr-1"
                                :placeholder="t('Search...')" />
                        </div>
                    </b-col>
                </b-row>
            </div>
            <b-overlay id="overlay-background" :show="apiHelpers.loading" variant="transparent" rounded="sm">
                <b-table :items="storageLocations.data" :fields="storageLocations.tableColumns" primary-key="id"
                    show-empty :empty-text="t('No matching records found')">
                    <template #cell(actions)="data">
                        <b-dropdown variant="link" no-caret>
                            <template #button-content>
                                <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
                            </template>
                            <b-dropdown-item @click="openEditModal(data.item.id)">
                                <feather-icon icon="EditIcon" />
                                <span class="align-middle ml-50">{{
                                    t("Edit")
                                    }}</span>
                            </b-dropdown-item>
                            <b-dropdown-item @click="deleteStorageLocations(data.item.id)">
                                <feather-icon icon="TrashIcon" />
                                <span class="align-middle ml-50">{{
                                    t("Delete")
                                    }}</span>
                            </b-dropdown-item>
                        </b-dropdown>
                    </template>
                </b-table>
            </b-overlay>
            <div class="mx-2 mb-2">
                <b-row>
                    <b-col cols="12" sm="6"
                        class="d-flex align-items-center justify-content-center justify-content-sm-start">
                        <span class="text-muted">
                            {{ t("Showing") }} {{ storageLocations.dataMeta.from }}
                            {{ t("to") }} {{ storageLocations.dataMeta.to }}
                            {{ t("of") }} {{ storageLocations.dataMeta.of }} {{ t("entries") }}
                        </span>
                    </b-col>
                    <b-col cols="12" sm="6"
                        class="d-flex align-items-center justify-content-center justify-content-sm-end">
                        <b-pagination v-model="storageLocations.currentPage" :total-rows="storageLocations.totalRecords"
                            :per-page="storageLocations.perPage" first-number last-number class="mb-0 mt-1 mt-sm-0"
                            prev-class="prev-item" next-class="next-item">
                            <template #prev-text>
                                <feather-icon icon="ChevronLeftIcon" size="18" />
                            </template>
                            <template #next-text>
                                <feather-icon icon="ChevronRightIcon" size="18" />
                            </template>
                        </b-pagination>
                    </b-col>
                </b-row>
            </div>
        </b-card>
    </div>
</template>

<script>
import {
    BCard,
    BRow,
    BCol,
    BTable,
    BOverlay,
    BButton,
    BDropdown,
    BFormInput,
    BPagination,
    BDropdownItem,
} from "bootstrap-vue";
import { ref, watch, onMounted, onUnmounted } from "@vue/composition-api";
import vSelect from "vue-select";
import { useUtils as useI18nUtils } from "@core/libs/i18n";
import useStorageLocations from "@/composables/storage-location.js";
import AddStorageLocations from "./dialogs/addStorageLocations.vue";
import EditStorageLocations from "./dialogs/editStorageLocations.vue";
import { debounce } from "lodash";


export default {
    components: {
        BCol,
        BRow,
        BCard,
        BTable,
        vSelect,
        BButton,
        BOverlay,
        BDropdown,
        BFormInput,
        BPagination,
        BDropdownItem,
        AddStorageLocations,
        EditStorageLocations,
    },
    setup(_, { root }) {

        const {
            apiHelpers,
            storageLocations,
            getStorageLocations,
            addStorageLocations,
            deleteStorageLocations,
            editStorageLocations,
        } = useStorageLocations();

        const { t } = useI18nUtils();
        const isAddLocationActive = ref(false)
        const isEditLocationActive = ref(false)

        const openEditModal = (id) => {
            storageLocations.edit.id = id
            isEditLocationActive.value = true
        }

        const debouncedGetStorageLocations = debounce(() => {
            getStorageLocations();
        }, 300);

        onMounted(() => {
            storageLocations.reset()
            getStorageLocations();
        });

        onUnmounted(() => {
            storageLocations.reset()
        })

        watch(() => storageLocations.currentPage, () => {
            getStorageLocations()
        }, { deep: true })

        watch(
            () => storageLocations.searchLocationModel,
            debouncedGetStorageLocations,
            { deep: true }
        );

        return {
            t,
            apiHelpers,
            storageLocations,
            isEditLocationActive,
            isAddLocationActive,
            getStorageLocations,
            addStorageLocations,
            editStorageLocations,
            deleteStorageLocations,
            openEditModal,
        };
    },
};
</script>

<style scoped>
.per-page-selector {
    width: 90px;
}
</style>

<style lang="scss">
@import "~@core/scss/vue/libs/vue-select.scss";

.b-table {
    td {
      padding: 0.72rem 2rem !important;
    }
  }
</style>
