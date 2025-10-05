<template>
    <div>
        <EditEquipment
            :is-edit-equipment-active.sync="isEditEquipmentActive"
            v-if="isEditEquipmentActive"
            :equipment="equipment"
            @refetch-data="fetchEquipments"
        />
        <CreateEquipment
            :is-add-equipment-active.sync="isAddEquipmentActive"
            v-if="isAddEquipmentActive"
            @refetch-data="fetchEquipments"
        />

        <ViewSideBar
            :equipment="equipment"
            @close="isEquipmentDetailsActive = false"
            :isOpen="isEquipmentDetailsActive"
        />

        <LendingHistory
            :is-show-lending-history-active.sync="isShowLendingHistoryActive"
            :equipment="equipment"
            v-if="isShowLendingHistoryActive"
        />
        <b-card no-body class="mb-0">
            <div class="p-2">
                <QuickOptions @addEquipment="isAddEquipmentActive = true" />
            </div>
            <b-overlay
                id="overlay-background"
                :show="busy"
                variant="transparent"
                rounded="sm"
            >
                <b-table
                    ref="refListTable"
                    class="position-relative equipment-table"
                    :items="equipments"
                    responsive
                    :fields="tableColumns"
                    primary-key="id"
                    :sort-by.sync="sortBy"
                    show-empty
                    :empty-text="t('No matching records found')"
                    :sort-desc.sync="isSortDirDesc"
                    @row-clicked="viewEquipment"
                    tbody-tr-class="item-row"
                >
                    <template #head()="data">
                        <span>{{ $t(data.label) }}</span>
                    </template>
                    <template #cell(lending)="data">
                        <b-button
                            variant="flat-primary"
                            size="sm"
                            @click="lendingEquipment(data.item)"
                        >
                            Show
                        </b-button>
                    </template>
                    <template #cell(category)="data">
                        {{ data.item.category ? data.item.category.name : "" }}
                    </template>
                    <template #cell(status)="data">
                        <span
                            class="status-pill"
                            :class="
                                data.item.status === 'storage'
                                    ? 'storage-pill'
                                    : 'lending-pill'
                            "
                            >{{ data.item.status }}</span
                        >
                    </template>
                    <template #cell(valid_until)="data">
                        <div class="status-cell">
                            <span
                                v-if="data.item.valid_until"
                                class="status-dot"
                                :class="getStatusClass(data.item.valid_until)"
                            >
                            </span>
                            <span>{{
                                data.item.valid_until
                                    ? formatDate(data.item.valid_until)
                                    : ""
                            }}</span>
                        </div>
                    </template>
                    <template #cell(actions)="data">
                        <b-dropdown variant="link" no-caret>
                            <template #button-content>
                                <feather-icon
                                    icon="MoreVerticalIcon"
                                    size="16"
                                    class="align-middle text-body"
                                />
                            </template>
                            <b-dropdown-item @click="viewEquipment(data.item)">
                                <feather-icon icon="EyeIcon" />
                                <span class="align-middle ml-50">View</span>
                            </b-dropdown-item>
                            <b-dropdown-item
                                @click="editEquipment(data.item)"
                                v-if="$can('equipments-edit', 'all')"
                            >
                                <feather-icon icon="EditIcon" />
                                <span class="align-middle ml-50">{{
                                    t("Edit")
                                }}</span>
                            </b-dropdown-item>
                            <b-dropdown-item
                                @click="confirmDelete(data.item.id)"
                                v-if="$can('equipments-delete', 'all')"
                            >
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
                    <b-col
                        cols="12"
                        sm="6"
                        class="d-flex align-items-center justify-content-center justify-content-sm-start"
                    >
                        <span class="text-muted"
                            >{{ t("Showing") }} {{ dataMeta.from }}
                            {{ t("to") }} {{ dataMeta.to }} {{ t("of") }}
                            {{ dataMeta.of }} {{ t("entries") }}</span
                        >
                    </b-col>
                    <!-- Pagination -->
                    <b-col
                        cols="12"
                        sm="6"
                        class="d-flex align-items-center justify-content-center justify-content-sm-end"
                    >
                        <b-pagination
                            v-model="currentPage"
                            :total-rows="totalRecords"
                            :per-page="perPage"
                            first-number
                            last-number
                            class="mb-0 mt-1 mt-sm-0"
                            prev-class="prev-item"
                            next-class="next-item"
                        >
                            <template #prev-text>
                                <feather-icon
                                    icon="ChevronLeftIcon"
                                    size="18"
                                />
                            </template>
                            <template #next-text>
                                <feather-icon
                                    icon="ChevronRightIcon"
                                    size="18"
                                />
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
    BFormInput,
    BPagination,
    BButton,
    BDropdown,
    BCardTitle,
    BDropdownItem,
} from "bootstrap-vue";
import { ref, onMounted, watch } from "@vue/composition-api";
import vSelect from "vue-select";
// eslint-disable-next-line import/no-cycle
import useEquipments from "@/composables/equipments";
import { useUtils as useI18nUtils } from "@core/libs/i18n";
import i18n from "@/libs/i18n";
import CreateEquipment from "./Create.vue";
import EditEquipment from "./Edit.vue";
import ViewEquipment from "./View.vue";
import LendingHistory from "./LendingHistory.vue";
import ViewSideBar from "./sidebar/Details.vue";
import QuickOptions from "./header/QuickOptions.vue";

export default {
    components: {
        // Export,
        BCol,
        BRow,
        BCard,
        BTable,
        BButton,
        vSelect,
        BOverlay,
        BFormInput,
        BPagination,
        ViewSideBar,
        BDropdown,
        BCardTitle,
        BDropdownItem,
        EditEquipment,
        LendingHistory,
        ViewEquipment,
        CreateEquipment,
        QuickOptions,
    },
    setup(_, { root }) {
        const {
            busy,
            sortBy,
            filters,
            perPage,
            student,
            dataMeta,
            equipments,
            respResult,
            refetchData,
            searchQuery,
            currentPage,
            tableColumns,
            totalRecords,
            refListTable,
            isSortDirDesc,
            perPageOptions,
            deleteEquipment,
            fetchEquipments,
        } = useEquipments();
        const { t } = useI18nUtils();

        onMounted(() => {
            fetchEquipments();
        });

        const isExportActive = ref(false);
        const isAddEquipmentActive = ref(false);
        const isEditEquipmentActive = ref(false);
        const isEquipmentDetailsActive = ref(false);
        const isShowLendingHistoryActive = ref(false);
        const equipment = ref({});

        const deleteConfirmed = async (id) => {
            await deleteEquipment(id);
            if (respResult.value.status === 200) {
                fetchEquipments();
            }
        };

        const editEquipment = (item) => {
            equipment.value = item;
            isEditEquipmentActive.value = true;
        };

        const viewEquipment = (data) => {
            isEquipmentDetailsActive.value = true;
            equipment.value = data;
        };

        const lendingEquipment = (data) => {
            isShowLendingHistoryActive.value = true;
            equipment.value = data;
        };

        const confirmDelete = async (id) => {
            root.$bvModal
                .msgBoxConfirm(
                    i18n.t("Please confirm that you want to delete equipment."),
                    {
                        title: i18n.t("Please Confirm"),
                        size: "sm",
                        okTitle: i18n.t("Confirm"),
                        cancelTitle: i18n.t("Cancel"),
                    }
                )
                .then((value) => {
                    if (value) {
                        deleteConfirmed(id);
                    }
                });
        };

        const getStatusClass = (validUntil) => {
            const today = new Date();
            const validDate = new Date(validUntil);

            // Calculate the difference in time and convert it to days
            const diffInTime = validDate - today;
            const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));

            if (diffInDays >= 90) {
                return "green"; // More than or equal to 3 months
            } else if (diffInDays > 0) {
                return "yellow"; // Less than 3 months but still valid
            } else {
                return "red"; // Already expired
            }
        };

        const formatDate = (isoDateString) => {
            const date = new Date(isoDateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");

            return `${year}-${month}-${day}`;
        };

        return {
            t,
            busy,
            sortBy,
            filters,
            student,
            perPage,
            dataMeta,
            equipment,
            formatDate,
            refetchData,
            searchQuery,
            equipments,
            currentPage,
            tableColumns,
            totalRecords,
            refListTable,
            isSortDirDesc,
            viewEquipment,
            editEquipment,
            confirmDelete,
            perPageOptions,
            isExportActive,
            getStatusClass,
            fetchEquipments,
            deleteEquipment,
            lendingEquipment,
            isAddEquipmentActive,
            isEditEquipmentActive,
            isEquipmentDetailsActive,
            isShowLendingHistoryActive,
        };
    },
};
</script>
<style lang="scss">
.per-page-selector {
    width: 90px;
}

.item-row {
    cursor: pointer;
}

.b-table {
    td {
        padding: 0.72rem 2rem !important;
    }
}

.equipment-table {
    min-height: 50vh;
}
</style>

<style lang="scss">
@import "~@core/scss/vue/libs/vue-select.scss";

.status-pill {
    display: inline-block;
    font-size: 1rem;
    font-weight: 500;
    margin-right: 0.5rem;
    padding: 0px 16px;
    border-radius: 9999px;
    text-transform: capitalize;
}

.lending-pill {
    background-color: #fef9c3;
    color: #854d0e;
}

.storage-pill {
    background-color: #dcfce7;
    color: #166534;
}

.status-cell {
    display: flex;
    align-items: center;
}

.status-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 5px;
}

.status-dot.green {
    background-color: rgba(0, 128, 0, 0.452);
}

.status-dot.yellow {
    background-color: rgba(255, 255, 0, 0.548);
}

.status-dot.red {
    background-color: rgba(255, 0, 0, 0.486);
}
</style>
