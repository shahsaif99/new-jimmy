<template>
    <b-modal v-model="dialog.show.customerSupplier.add" title="Customer/supplier details" size="lg">
        <b-form>
            <!-- Type and Status -->
            <b-row>
                <b-col cols="6">
                    <b-form-group label="Type" label-size="md">
                        <b-form-select v-model="form.type" :options="type" size="md"></b-form-select>
                    </b-form-group>
                </b-col>
                <b-col cols="6">
                    <b-form-group label="Status" label-size="md">
                        <b-form-select v-model="form.status" :options="statusOptions" size="md"></b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>

            <!-- Name and Customer Manager -->
            <b-row>
                <b-col cols="6">
                    <b-form-group label="Name" label-size="md">
                        <b-form-input v-model="form.name" placeholder="Company name" size="md"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="6">
                    <b-form-group label="Customer manager" label-size="md">
                        <InfiniteScrollSelect v-model="form.customer_manager_id" @onSearch="searchUsers"
                            :options="formattedUsers" :has-next-page="isNextPageAvailable" :loading="busy"
                            @onPaginate="currentPage++" />
                    </b-form-group>
                </b-col>
            </b-row>

            <!-- Address -->
            <b-row>
                <b-col cols="6">
                    <b-form-group label="Address" label-size="md">
                        <b-form-input v-model="form.address" placeholder="Enter your address" size="md"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="6">
                    <b-form-group label="Organization number" label-size="md">
                        <b-form-input v-model="form.organization_number" placeholder="Tel phone"
                            size="md"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>

            <!-- Postal Code and Place -->
            <b-row>
                <b-col cols="3">
                    <b-form-group label="Postal code" label-size="md">
                        <b-form-input v-model="form.postal_code" placeholder="Enter postal code"
                            size="md"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="9">
                    <b-form-group label="Place" label-size="md">
                        <b-form-input v-model="form.place" placeholder="Enter place" size="md"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>

            <!-- Contact Person and Email -->
            <b-row>
                <b-col cols="6">
                    <b-form-group label="Contact person" label-size="md">
                        <b-form-input v-model="form.contact_person" placeholder="Enter contact person"
                            size="md"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="6">
                    <b-form-group label="Email" label-size="md">
                        <b-form-input v-model="form.email" type="email" placeholder="Enter email"
                            size="md"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>

            <!-- Telephone and Website -->
            <b-row>
                <b-col cols="6">
                    <b-form-group label="Telephone number" label-size="md">
                        <b-form-input v-model="form.telephone_number" type="tel" placeholder="Tel phone" size="md"
                            pattern="^\+?[0-9\s]*$" maxlength="15"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="6">
                    <b-form-group label="Website" label-size="md">
                        <b-form-input v-model="form.website" placeholder="Enter website" size="md"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>

            <!-- Management Systems and Supplier Of -->
            <b-row>
                <b-col cols="6">
                    <b-form-group label="Management systems" label-size="md">
                        <b-form-checkbox-group v-model="form.management_systems" :options="managementSystems"
                            stacked></b-form-checkbox-group>
                    </b-form-group>
                </b-col>
                <b-col cols="6">
                    <b-form-group label="Supplier of" label-size="md">
                        <b-form-radio-group v-model="form.supplier_of" :options="supplierOptions"
                            stacked></b-form-radio-group>
                    </b-form-group>
                </b-col>
            </b-row>

            <!-- Total Evaluation -->
            <b-form-group label="Total evaluation" label-size="md">
                <b-form-radio-group v-model="form.total_evaluation" :options="evaluationOptions"
                    stacked></b-form-radio-group>
            </b-form-group>
        </b-form>

        <div class="d-flex justify-content-end tw-mt-4">
            <b-button variant="primary" size="sm" @click="dialog.toggleDialog('supplierEvaluation', 'add')">
                <feather-icon icon="PlusIcon" size="16" /> Add Supplier
                Evaluation
            </b-button>
        </div>
        <div class="customer-supplier" v-if="evaluations.length > 0">

            <h3>Supplier Evaluations</h3>
            <b-table class="position-relative mt-2" :items="evaluations" responsive :fields="columnsSupplierEval"
                :key="evaluations.length">
                <template #cell(status)="data">
                    <span class="status text-capitalize"
                        :class="data.value === 'meets_requirements' ? 'completed' : 'incompleted'">{{ data.value ?
                            data.value.replace(/_/g, ' ') : '' }}</span>
                </template>
                <template #cell(action)="data">
                    <b-dropdown variant="link" no-caret>
                        <template #button-content>
                            <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
                        </template>
                        <b-dropdown-item @click="editEval(data.index)">
                            <feather-icon icon="EditIcon" />
                            <span class="align-middle ml-50">{{ t('Edit') }}</span>
                        </b-dropdown-item>

                        <b-dropdown-item @click="deleteEval(data.index)">
                            <feather-icon icon="TrashIcon" />
                            <span class="align-middle ml-50">{{ t('Delete') }}</span>
                        </b-dropdown-item>

                    </b-dropdown>
                </template>
            </b-table>
        </div>

        <template #modal-footer>
            <div class="d-flex align-items-center">
                <b-button variant="primary" size="sm" class="mr-1 cursor-pointer" :disabled="apiHelpers.loading"
                    @click="addCustomerSupplier">
                    <b-spinner v-if="apiHelpers.loading" label="Spinning" small ></b-spinner>
                    <feather-icon v-else icon="PlusIcon" size="16" />
                    Create Customer/Supplier
                </b-button>
                <b-button class="cursor-pointer" variant="outline-primary" size="sm" :disabled="apiHelpers.loading"
                    @click="dialog.toggleDialog('customerSupplier', 'add')">
                    <feather-icon icon="XIcon" size="16" />
                    Close
                </b-button>
            </div>
        </template>
    </b-modal>
</template>

<script>
import useCustomerSupplier from "@/composables/customer-suppliers";
import InfiniteScrollSelect from "@/views/components/InfiniteScrollSelect.vue";
import moment from "moment";

import {
    BModal,
    BForm,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BFormCheckboxGroup,
    BFormRadioGroup,
    BButton,
    BRow,
    BCol,
    BTable,
    BDropdown,
    BDropdownItem,
    BSpinner
} from "bootstrap-vue";
import useUsers from "@/composables/users";
import { onMounted, computed, watch, ref } from "@vue/composition-api";
import { useUtils as useI18nUtils } from "@core/libs/i18n";

export default {
    components: {
        BModal,
        BForm,
        BFormGroup,
        BFormInput,
        BFormSelect,
        BFormCheckboxGroup,
        BFormRadioGroup,
        BButton,
        BRow,
        BCol,
        InfiniteScrollSelect,
        BTable,
        BDropdown,
        BDropdownItem,
        BSpinner
    },
    setup() {
        const {
            dialog,
            form,
            apiHelpers,
            supplierOptions,
            evaluationOptions,
            managementSystems,
            customerManagers,
            statusOptions,
            columnsSupplierEval,
            addCustomerSupplier,
            type
        } = useCustomerSupplier();

        const { t } = useI18nUtils();

        const { fetchUsers, users, searchQuery, currentPage, isNextPageAvailable, busy } = useUsers();

        const tempUsers = ref([])

        const searchUsers = (query) => {
            currentPage.value = 1
            searchQuery.value = query;
            tempUsers.value = [];
            fetchUsers();
        };

        onMounted(() => {
            fetchUsers();
        });

        const formattedUsers = computed(() => {
            const userMap = new Map();
            tempUsers.value.forEach((user) => {
                if (!userMap.has(user.id)) {
                    userMap.set(user.id, { value: user.id, label: user.name });
                }
            });
            return Array.from(userMap.values());
        });

        watch(users, (newVal) => {
            tempUsers.value = [...tempUsers.value, ...newVal]
        });

        const deleteEval = (index) => {
            form.supplier_evaluation.splice(index, 1);
        }

        const editEval = (index) => {
            dialog.temp.supplierEvaluation.data = form.supplier_evaluation[index]
            dialog.temp.supplierEvaluation.id = index
            dialog.toggleDialog('supplierEvaluation', 'edit')
        }

        const evaluations = computed(() => {
            return form.supplier_evaluation.map((item) => ({
                date: moment(item.evaluation_date).format("L"),
                performed_by: item.performed_by_name,
                total_score: item.total_score,
                status: item.status,
                action: '',
            }))
        }, { deep: true });

        return {
            isNextPageAvailable,
            columnsSupplierEval,
            evaluationOptions,
            managementSystems,
            customerManagers,
            supplierOptions,
            formattedUsers,
            statusOptions,
            currentPage,
            evaluations,
            apiHelpers,
            moment,
            dialog,
            form,
            users,
            busy,
            t,
            type,
            addCustomerSupplier,
            searchUsers,
            deleteEval,
            editEval,
        };
    },
};
</script>

<style scoped>
.modal-title {
    font-size: 0.875rem;
    font-weight: bold;
}

.form-group {
    margin-bottom: 0.5rem;
}

.input-group-text {
    font-size: 0.875rem;
    padding: 0.25rem 0.5rem;
}

.status {
    padding: 4px 8px;
    border-radius: 4px;
}
</style>


<style>
.custom-control {
    margin-bottom: 8px;
}

.customer-supplier .table th {
    padding: 5px 14px !important;
}

.customer-supplier .table td {
    padding: 2px 14px !important;
}
</style>