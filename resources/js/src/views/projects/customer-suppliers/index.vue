<template>
    <div>
        <b-card>
            <QuickOptions />

            <b-overlay id="overlay-background" variant="transparent" rounded="sm">
                <b-table :busy="apiHelpers.loading"  ref="refTable" id="taskTable"  :items="availableData.rows" responsive
                    :fields="availableData.columns" show-empty :key="availableData.rows.length"
                    style="min-height: 60vh">
                    <template #table-busy>
                      
                        <div class="text-center text-danger my-2">
                          <b-spinner class="align-middle" label="Spinning" small></b-spinner>
                          <strong>Loading...</strong>
                        </div>
                      </template>

                      <template #head()="scope">
                        <div
                            class="text-nowrap d-flex align-items-center justify-content-between"
                            v-if="scope.label === 'Latest Evaluation'"
                            style="cursor: pointer"
                            @click="filters.sortDesc = !filters.sortDesc"
                        >
                            {{ scope.label }}
                            <div class="d-flex flex-column">
                                <feather-icon
                                    icon="ChevronUpIcon"
                                    :class="
                                        !filters.sortDesc
                                            ? 'text-black'
                                            : 'text-muted'
                                    "
                                />
                                <feather-icon
                                    icon="ChevronDownIcon"
                                    :class="
                                        filters.sortDesc
                                            ? 'text-black'
                                            : 'text-muted'
                                    "
                                />
                            </div>
                        </div>
                        <div
                            v-else
                            class="text-nowrap d-flex align-items-center justify-content-between"
                            style="margin-top: 5px"
                        >
                            {{ scope.label }}
                        </div>
                    </template>
                    <template #cell(supplier_of)="data">
                        <p class="text-capitalize m-0">{{ data.value.replace(/_/g, ' ') }}</p>
                    </template>
                    <template #cell(total_evaluation)="data">
                        <p class="text-capitalize m-0">{{ data.value ? data.value.replace(/_/g, ' ') : '' }}</p>
                    </template>
                    <template #cell(latest_evaluation)="data">
                        <p class="text-capitalize m-0">{{ moment(data.value).format('L') }}</p>
                    </template>
                    <template #cell(action)="data">
                        <b-dropdown variant="link" no-caret>

                            <template #button-content>
                                <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
                            </template>
                            <b-dropdown-item @click="editCustomerSupplier(data.item.id)">
                                <feather-icon icon="EditIcon" />
                                <span class="align-middle ml-50">{{ t('Edit') }}</span>
                            </b-dropdown-item>

                            <b-dropdown-item @click="deleteCustomerSupplier(data.item.id)">
                                <feather-icon icon="TrashIcon" />
                                <span class="align-middle ml-50">{{ t('Delete') }}</span>
                            </b-dropdown-item>

                        </b-dropdown>
                    </template>
                </b-table>
            </b-overlay>
            <div class="mx-2 mb-2">
                <b-row>
                    <b-col cols="12" sm="6"
                        class="d-flex align-items-center justify-content-center justify-content-sm-start">
                        <span class="text-muted">{{ t("Showing") }} {{ dataMeta.from }}
                            {{ t("to") }} {{ dataMeta.to }} {{ t("of") }}
                            {{ dataMeta.of }} {{ t("entries") }}</span>
                    </b-col>

                    <b-col cols="12" sm="6"
                        class="d-flex align-items-center justify-content-center justify-content-sm-end">
                        <b-pagination v-model="pagination.current_page" :total-rows="pagination.total"
                            :per-page="pagination.per_page" first-number last-number class="mb-0 mt-1 mt-sm-0"
                            prev-class="prev-item" next-class="next-item" :key="pagination.current_page"
                            @change="onPagination">
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

        <AddCustomerSupplier v-if="dialog.show.customerSupplier.add" :showing="dialog.show.customerSupplier.add"
            @closeDialog="dialog.toggleDialog('customerSupplier', 'add')" />

        <AddSupplierEvaluation v-if="dialog.show.supplierEvaluation.add" :showing="dialog.show.supplierEvaluation.add"
            @closeDialog="dialog.toggleDialog('supplierEvaluation', 'add')" />

        <EditSupplierEvaluation v-if="dialog.show.supplierEvaluation.edit"
            :showing="dialog.show.supplierEvaluation.edit"
            @closeDialog="dialog.toggleDialog('supplierEvaluation', 'edit')" />

        <EditCustomerSupplier v-if="dialog.show.customerSupplier.edit" :showing="dialog.show.customerSupplier.edit"
            @closeDialog="dialog.toggleDialog('customerSupplier', 'edit')" />
    </div>
</template>

<script>
import { VueGoodTable } from "vue-good-table";
import { onMounted, ref, watch, computed } from "@vue/composition-api";
import QuickOptions from "./header/quick-action.vue";
import AddCustomerSupplier from "./dialogs/AddCustomerSupplier.vue";
import EditCustomerSupplier from "./dialogs/EditCustomerSupplier.vue";
import AddSupplierEvaluation from "./dialogs/AddSupplierEvaluation.vue";
import EditSupplierEvaluation from "./dialogs/EditSupplierEvaluation.vue";
import {
    BButton,
    BCard,
    BOverlay,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BPagination,
    BCol,
    BRow,
    BDropdownItem,
    BDropdown,
    BSpinner
} from "bootstrap-vue";
import "vue-good-table/dist/vue-good-table.css";
import vSelect from "vue-select";
import { avatarText } from "@core/utils/filter";
import { useUtils as useI18nUtils } from "@core/libs/i18n";
import router from "@/router";
import useCustomerSupplier from "@/composables/customer-suppliers";
import moment from "moment";

export default {
    components: {
        BCard,
        BOverlay,
        BTable,
        QuickOptions,
        VueGoodTable,
        vSelect,
        BMedia,
        BAvatar,
        BLink,
        BCol,
        BPagination,
        BRow,
        BButton,
        BDropdownItem,
        BDropdown,
        AddCustomerSupplier,
        AddSupplierEvaluation,
        EditSupplierEvaluation,
        EditCustomerSupplier,
        BSpinner
    },
    setup() {
        const refTable = ref(null);


        const { fetchCustomerSuppliers, pagination, customerSuppliers, deleteCustomerSupplier, availableData, setFilterFromQuery, apiHelpers,filters, dialog, reset } = useCustomerSupplier()

        const { t } = useI18nUtils();


        onMounted(async () => {
            reset()
            fetchCustomerSuppliers()
            setFilterFromQuery(router.currentRoute.query);
            watch(
                availableData,
                () => {
                    if (
                        !availableData.value.rows ||
                        availableData.value.rows.length === 0
                    )
                        return;
                },
                { deep: true }
            );
            watch(
                () => ({
                    date: filters.date,
                    search: filters.search,
                    sortBy: filters.sortBy,
                    sortDesc: filters.sortDesc,
                    accordion: filters.accordion.map(({ key, model }) => ({ key, model }))
                }),
                () => {
                    fetchCustomerSuppliers()
                },
                { deep: true }
            );
        });

        const dataMeta = computed(() => {
            const from =
                (pagination.current_page - 1) * pagination.per_page + 1;
            const to = Math.min(
                pagination.total,
                pagination.current_page * pagination.per_page
            );
            return {
                from,
                to,
                of: pagination.total,
            };
        });

        const onPagination = (page) => {
            pagination.current_page = page;
            // router.replace(
            //     {
            //         query: Object.assign({ ...customerSuppliers.params.filter }),
            //     },
            //     () => { }
            // );
            fetchCustomerSuppliers();
        };



        const editCustomerSupplier = (id) => {
            dialog.temp.customerSupplier.data = customerSuppliers.data.find(item => item.id === id);
            dialog.temp.customerSupplier.id = id
            dialog.toggleDialog('customerSupplier', 'edit')
        }


        return {
            refTable,
            availableData,
            customerSuppliers,
            avatarText,
            pagination,
            dataMeta,
            t,
            onPagination,
            moment,
            dialog,
            deleteCustomerSupplier,
            editCustomerSupplier,
            apiHelpers,
            filters
        };
    },
};
</script>

<style lang="scss">
@import "~@core/scss/vue/libs/vue-select.scss";

#task-headers .dropdown-menu #list-dropdown {
    min-width: 250px;
    padding: 0px;
}

#taskTable th,
#taskTable td {
    padding: 0.72rem 1rem !important;
}



#taskTable {

    /* Hide the first <th> in each table */
    th:first-child {
        display: none !important;
    }

    /* Hide the first <td> in each table */
    td:first-child {
        display: none !important;
    }
}

#taskTable .cate-badge {
    padding: 8px;
    border-radius: 5px;
}

#taskTable .tb-status {
    min-width: 150px;
}

#taskTable .tb-date {
    min-width: 150px;
}

#taskTable .tb-title {
    min-width: 120px;
}

#taskTable .tb-desc {
    min-width: 250px;
}

#taskTable .tb-cate {
    min-width: 150px;
}

#taskTable .tb-location {
    min-width: 150px;
}

#taskTable .tb-assign {
    min-width: 120px;



}

.mx-datepicker {
    input {
        background: transparent !important;
        border: 1px solid #7367f0;
        color: #7367f0;
        padding: 18px 10px;
        border-radius: 5px;
    }

    .mx-icon-calendar {
        color: #7367f0;
    }
}

.tb-status {
    .btn-group {
        border: 0px !important;
    }
}
</style>
