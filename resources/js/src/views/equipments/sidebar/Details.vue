<template>
    <div>
        <b-sidebar @hidden="close" width="550px" :visible="isOpen" backdrop no-header right>
            <template #default="{ hide }">
                <div v-if="equipment" class="p-1">
                    <h4 id="sidebar-no-header-title">
                        Equipment {{ tabsOptions[currentTab] }}
                    </h4>
                    <b-tabs v-model="currentTab" content-class="mt-1" justified>
                        <b-tab title="Details" active>
                            <b-row>
                                <b-col cols="6" md="6">
                                    <div class="w-100 mb-2">
                                        <div style="height: 210px"
                                            class="border-dashed text-center cursor-pointer w-100" :class="{
                                                'preview-container':
                                                    equipment.image_url,
                                            }">
                                            <img ref="previewEl" :src="equipment.image ? equipment.image_url : noImage"
                                                rounded class="p-1" style="
                                                    height: 100%;
                                                    object-fit: contain;
                                                " :alt="t('Image Preview')" />
                                        </div>
                                    </div>
                                </b-col>

                                <b-col cols="6" md="6">
                                    <b-button v-if="equipment.qr_code" @click.prevent="isQrcodeActive = true"
                                        variant="outline-primary" class="d-flex align-items-center w-100"
                                        style="font-size: 1rem">
                                        <i class="bi bi-qr-code" style="
                                                font-size: 1.5rem;
                                                margin: 0 8px;
                                            "></i>

                                        View Qrcode
                                    </b-button>

                                    <b-form-group description="Automatically generated ID" class="mt-2" :label="t('ID')"
                                        label-for="id">
                                        <b-form-input disabled v-model="equipment.tool_id" :placeholder="t('ID')" />
                                    </b-form-group>
                                </b-col>
                            </b-row>

                            <b-row>
                                <b-col xl="12" sm="12">
                                    <h2 class="section-title">
                                        {{ t("General") }}
                                    </h2>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col cols=" 6" md="6">
                                    <b-form-group style="font-weight: 600;" :label="t('Name')" label-for="oname">
                                        <span style="font-weight:400">{{ equipment.name }}</span>
                                    </b-form-group>
                                </b-col>
                                <b-col cols=" 6" md="6">
                                    <b-form-group style="font-weight: 600;" :label="t('Supplier')" label-for="supplier">
                                        <span style="font-weight:400">{{ equipment.supplier }}</span>
                                    </b-form-group>
                                </b-col>
                            </b-row>

                            <b-row>
                                <b-col cols=" 6" md="6">
                                    <b-form-group style="font-weight: 600;" :label="t('Category')" label-for="Category">
                                        <span style="font-weight:400" v-if="equipment.category">{{
                                            equipment.category.name
                                            }}</span>

                                    </b-form-group>
                                </b-col>
                                <b-col cols=" 6" md="6">
                                    <b-form-group style="font-weight: 600;" :label="t('Serial Number')"
                                        label-for="Serial Number">
                                        <span style="font-weight:400">{{
                                            equipment.serial_number
                                            }}</span>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col cols=" 6" md="6">
                                    <b-form-group style="font-weight: 600;" :label="t('Certificate No')"
                                        label-for="Certificate No">
                                        <span style="font-weight:400">{{
                                            equipment.certificate_number
                                            }}</span>
                                    </b-form-group>
                                </b-col>
                                <b-col cols=" 6" md="6">
                                    <b-form-group style="font-weight: 600;" :label="t('Valid Until')"
                                        label-for="Valid Until">
                                        <span v-if="equipment.valid_until" style="font-weight:400">{{
                                            formatDate(equipment.valid_until)
                                        }}</span>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col cols=" 6" md="6">
                                    <b-form-group style="font-weight: 600;" :label="t('Select Storage Location')"
                                        label-for="Select Storage Location">
                                        <span style="font-weight:400" v-if="equipment.storage_location">{{
                                            equipment.storage_location.name
                                        }}</span>

                                    </b-form-group>
                                </b-col>
                                <b-col cols=" 6" md="6">
                                    <b-form-group style="font-weight: 600;" :label="t('Status')" label-for="Status">
                                        <p class="d-flex align-items-center"> <span v-if="equipment.valid_until"
                                                class="status-dot" :class="getStatusClass(equipment.valid_until)">
                                            </span>
                                            <span v-if="equipment.valid_until"
                                                style="font-weight:400; text-transform: capitalize;">{{
                                                    getStatusClass(equipment.valid_until) }}</span>
                                        </p>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col cols=" 6" md="6">
                                    <b-form-group style="font-weight: 600;" :label="t('Procedure')"
                                        label-for="Procedure">
                                        <span class="cursor-pointer "
                                            @click="$router.push({ name: 'procedures', query: { id: equipment.procedure_id } })"
                                            style="font-weight:400; text-decoration: underline;" v-if="equipment.procedure">{{
                                                equipment.procedure.title
                                            }}</span>
                                    </b-form-group>
                                </b-col>
                                <b-col cols=" 6" md="6">
                                    <b-form-group style="font-weight: 600;" :label="t('Level Of Training')"
                                        label-for="levelOfTraining">
                                        <span style="font-weight:400">{{
                                            equipment.level_of_training
                                            }}</span>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-row v-if="equipment.checklist" class="p-1">
                                <b-col class="d-flex justify-content-between align-items-center border rounded"
                                    cols="12" md="12">
                                    <span class="p-1">Start Checklist</span>
                                    <b-button variant="outline-primary" class="d-flex align-items-center">
                                        Start
                                    </b-button>
                                </b-col>
                            </b-row>

                            <b-row>
                                <b-col xl="12" sm="12">
                                    <h2 class="section-title">
                                        {{ t("Files") }}
                                    </h2>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col class="d-flex flex-column" style="gap: 5px" xl="12" sm="12">
                                    <div class="d-flex align-items-center justify-content-between" style="gap: 5px"
                                        v-for="(
                                            file, index
                                        ) in equipment.media" :key="index">
                                        <span class="text-truncate">{{
                                            file.filename
                                            }}</span>

                                        <div style="gap: 10px"
                                            class="d-flex align-items-center justify-content-between">
                                            <a :href="file.url" target="_blank" download>
                                                <i style="font-size: 1.2rem"
                                                    class="bi bi-download text-primary cursor-pointer"></i>
                                            </a>

                                            <!-- View icon -->
                                            <a :href="file.url" target="_blank">
                                                <i style="font-size: 1.2rem"
                                                    class="bi bi-eye text-primary cursor-pointer"></i>
                                            </a>
                                        </div>
                                    </div>
                                </b-col>
                            </b-row>
                        </b-tab>
                        <b-tab :disabled="equipment.checklist ? false : true" title="Checklist">
                            <b-row v-if="equipment.checklist" class="p-1">
                                <b-col class="d-flex justify-content-between align-items-center border rounded"
                                    cols="12" md="12">
                                    <span class="p-1">Start Checklist</span>
                                    <b-button variant="outline-primary" class="d-flex align-items-center">
                                        Start
                                    </b-button>
                                </b-col>
                            </b-row>

                            <h2 class="section-title">{{ t("Previous Checklists") }}</h2>
                        </b-tab>
                        <b-tab title="Lending">
                            <div class="lending-info">
                                <h2 class="section-title">{{ t("Lending Information") }}</h2>

                                <b-row class="mb-1">
                                    <b-col md="12">
                                        <p>
                                            <strong>Status:</strong>
                                            <span class="status-pill"
                                                :class="equipment.status === 'storage' ? 'storage-pill' : 'lending-pill'">
                                                {{ equipment.status }}
                                            </span>
                                        </p>
                                        <p>
                                            <strong>Loaned to:</strong> {{ equipment.loaned_to || 'N/A' }}
                                        </p>
                                        <p>
                                            <strong>Storage Location:</strong>
                                            {{ equipment.storage_location && equipment.storage_location.name ?
                                                equipment.storage_location.name : 'N/A' }}
                                        </p>
                                    </b-col>
                                </b-row>

                                <b-row class="mb-1">
                                    <b-col md="12" class="d-flex justify-content-start" style="gap: 5px;">
                                        <b-button class="me-2" @click="selfLoan" variant="outline-primary">
                                            Take Over
                                        </b-button>
                                        <b-button class="me-2" @click="externalLoan" variant="outline-secondary">
                                            External Loan
                                        </b-button>
                                        <b-button @click="returnLending(equipment.id)" variant="outline-danger">
                                            Return
                                        </b-button>
                                    </b-col>
                                </b-row>

                                <hr class="section-divider" />

                                <h2 class="section-title">{{ t("Lending History") }}</h2>

                                <b-row>
                                    <b-col md="12">
                                        <div class="table-responsive border" style="min-height: 40vh;">
                                            <table class="table  lending-history">
                                                <thead class="thead-light">
                                                    <tr>
                                                        <th scope="col" class="text-nowrap small">Date</th>
                                                        <th scope="col" class="text-nowrap small">Returned Date</th>
                                                        <th scope="col" class="text-nowrap small">Loaned To</th>
                                                        <th scope="col" class="text-nowrap small">Registered By</th>
                                                        <th scope="col" class="text-nowrap small">Return By</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(item, index) in lendings" :key="item.id">
                                                        <td class="small text-nowrap">{{ item.created_at }}</td>
                                                        <td class="small text-nowrap">
                                                            {{ item.returned_at || 'Still Lending' }}
                                                        </td>
                                                        <td class="small text-nowrap">{{ item.loaned_to || 'N/A' }}</td>
                                                        <td class="small text-nowrap">{{ item.registered_by &&
                                                            item.registered_by.name ? item.registered_by.name : 'N/A' }}
                                                        </td>
                                                        <td class="small text-nowrap">{{ item.return_by &&
                                                            item.return_by.name ? item.return_by.name : 'N/A' }}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </b-col>
                                </b-row>
                            </div>
                        </b-tab>
                    </b-tabs>
                </div>
            </template>
        </b-sidebar>
        <Qrcode :is-qrcode-active.sync="isQrcodeActive" :qrText="equipment.tool_id" v-if="isQrcodeActive" />
        <AddLoan @refetch-data="fetchLendings" :is-add-lending-active.sync="isAddLendingActive"
            v-if="isAddLendingActive" :selected="selectedTab" :equipment="equipment" />
    </div>
</template>

<script>
import { onMounted, computed, watch, ref } from "@vue/composition-api";
import { useUtils as useI18nUtils } from "@core/libs/i18n";
import Qrcode from "../Qrcode.vue";
import AddLoan from "../../lending/Create.vue"
import useLendings from '@/composables/lendings'
import noImage from "@/assets/images/no-image.png"
import {
    BSidebar,
    BTabs,
    BTab,
    BFormGroup,
    BFormInput,
    BButton,
    BFormRadio,
    BCard,
    BRow,
    BCol,
    BTable,
    BButtonGroup,
    BDropdown,
    BDropdownItem
} from "bootstrap-vue";

export default {
    components: {
        BSidebar,
        BFormGroup,
        BFormRadio,
        BCard,
        BTabs,
        BTab,
        BRow,
        BCol,
        BFormInput,
        BButton,
        Qrcode,
        BTable,
        BButtonGroup,
        AddLoan,
        BDropdown,
        BDropdownItem
    },
    props: {
        equipment: {
            type: Object,
            required: false,
            default: () => { },
        },
        isOpen: {
            type: Boolean,
            required: true,
        },
    },
    setup(props, { emit }) {
        const { t } = useI18nUtils();
        const currentTab = ref(0);
        const isQrcodeActive = ref(false);
        const tabsOptions = ["Details", "Checklist", "Ledning"];
        const isAddLendingActive = ref(false)
        const selectedTab = ref(0)

        const {
            busy,
            sortBy,
            filters,
            perPage,
            lendings,
            dataMeta,
            respResult,
            refetchData,
            searchQuery,
            currentPage,
            totalRecords,
            refListTable,
            deleteLending,
            isSortDirDesc,
            fetchLendings,
            perPageOptions,
            tableColumns,
            returnLending
        } = useLendings()

        const loanHistory = [
            {
                date: "06.05.2024",
                return: "06.05.2024",
                lendedTo: "Ola Normann",
                returnedBy: "Ola Normann",
            },
            {
                date: "24.04.2024",
                return: "06.05.2024",
                lendedTo: "Kari Trea",
                returnedBy: "Ola Normann",
            },
        ];

        const loanHistoryFields = [
            { key: "date", label: "Date" },
            { key: "return", label: "Return" },
            { key: "lendedTo", label: "Lended to" },
            { key: "returnedBy", label: "Returned by" },
        ];

        const formatDate = (isoDateString) => {
            const date = new Date(isoDateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");

            return `${year}-${month}-${day}`;
        };

        const selfLoan = () => {
            selectedTab.value = 0
            isAddLendingActive.value = true
        }
        const externalLoan = () => {
            selectedTab.value = 1
            isAddLendingActive.value = true
        }

        const getStatusClass = (validUntil) => {
            const today = new Date();
            const validDate = new Date(validUntil);

            // Calculate the difference in time and convert it to days
            const diffInTime = validDate - today;
            const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));

            if (diffInDays >= 90) {
                return "valid"; // More than or equal to 3 months
            } else if (diffInDays > 0) {
                return "expires"; // Less than 3 months but still valid
            } else {
                return "expired"; // Already expired
            }
        };

        onMounted(() => {
            if (props.equipment) {
                filters.equipmentId = props.equipment.id
            }
            fetchLendings()
        })

        watch(() => props.equipment, () => {
            if (props.equipment) {
                filters.equipmentId = props.equipment.id
            }
            fetchLendings()
        })

        const close = () => {
            emit("close");
        };
        return {
            t,
            tabsOptions,
            currentTab,
            isQrcodeActive,
            formatDate,
            close,
            loanHistory,
            loanHistoryFields,
            isAddLendingActive,
            selfLoan,
            externalLoan,
            selectedTab,
            busy,
            sortBy,
            filters,
            perPage,
            lendings,
            dataMeta,
            respResult,
            refetchData,
            searchQuery,
            currentPage,
            totalRecords,
            refListTable,
            deleteLending,
            isSortDirDesc,
            fetchLendings,
            perPageOptions,
            tableColumns,
            returnLending,
            getStatusClass,
            noImage
        };
    },
};
</script>

<style>
.status-pill {
    display: inline-block;
    font-size: 1.2rem;
    font-weight: 500;
    margin-right: 0.5rem;
    padding: 0px 20px;
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

.lending-info {
    padding: 1rem;
}

.section-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #343a40;
}

.status-pill {
    display: inline-block;
    padding: 0.3rem 0.6rem;
    border-radius: 1rem;
    font-size: 0.9rem;
    text-transform: capitalize;
}

.storage-pill {
    background-color: #d4edda;
    color: #155724;
}

.lending-pill {
    background-color: #f8d7da;
    color: #721c24;
}

.section-divider {
    margin: 2rem 0;
    border-top: 1px solid #dee2e6;
}

.lending-history th,
.lending-history td {
    vertical-align: middle;
    text-align: center;
}

.lending-history th {
    background-color: #f8f9fa;
}

.status-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 5px;
    display: block;
}

.status-dot.valid {
    background-color: rgba(0, 128, 0, 0.452);
}

.status-dot.expires {
    background-color: rgba(255, 255, 0, 0.548);
}

.status-dot.expired {
    background-color: rgba(255, 0, 0, 0.486);
}
</style>
