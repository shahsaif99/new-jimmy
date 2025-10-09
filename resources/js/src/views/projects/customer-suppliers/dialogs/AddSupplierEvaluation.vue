<template>
    <b-modal v-model="dialog.show.supplierEvaluation.add" title="Supplier Evaluation" size="lg">
        <!-- Evaluation criteria explanation -->
        <b-alert variant="danger" show class="mb-2">
            <strong>0-59 points: Does not meet our requirements</strong>
            <p class="mb-0">
                Suppliers who receive less than 59 points are not considered to
                meet the company's requirements.
            </p>
            <p class="mb-0">
                In such cases, there must be a justification as to why they
                should still remain as suppliers.
            </p>
        </b-alert>

        <b-alert variant="success" show>
            <strong>60-100 points: Meets our requirements</strong>
            <p class="mb-0">
                Suppliers who receive 60 points or more are considered to meet
                the company's requirements and can be considered approved
                suppliers.
            </p>
        </b-alert>

        <!-- Date and Performer -->
        <b-row>
            <b-col md="6">
                <b-form-group label="Date:" label-size="md">
                    <b-form-input v-model="form.date" type="date" size="md"></b-form-input>
                </b-form-group>
            </b-col>
            <b-col md="6">
                <b-form-group label="Performed by:" label-size="md">
                    <InfiniteScrollSelect v-model="form.performedBy" @onSearch="searchUsers" :options="formattedUsers"
                        :has-next-page="isNextPageAvailable" :loading="busy" @onFetchOptions="searchUsers"
                        @onPaginate="currentPage++" />
                </b-form-group>
            </b-col>
        </b-row>

        <!-- Evaluation Table -->
        <b-table-simple @submit="submitForm" bordered>
            <thead>
                <tr>
                    <th style="width: 60%">Supplier criteria</th>
                    <th style="width: 20%">%</th>
                    <th style="width: 20%">Score</th>
                </tr>
            </thead>
            <tbody>
                <!-- The company -->
                <tr class="bg-light">
                    <td colspan="3"><strong>The company</strong></td>
                </tr>
                <tr v-for="(criteria, key) in categories.company" :key="key">
                    <td>
                        <div>{{ criteria.name }}</div>
                        <small>{{ criteria.description }}</small>
                    </td>
                    <td>{{ criteria.weight }}%</td>
                    <td>
                        <input v-model="form.scores[key]" type="number" size="sm" min="0" max="100"
                            @input="calculateTotal(key)" />
                    </td>
                </tr>

                <!-- Service -->
                <tr class="bg-light">
                    <td colspan="3"><strong>Service</strong></td>
                </tr>
                <tr v-for="(criteria, key) in categories.service" :key="key">
                    <td>
                        <div>{{ criteria.name }}</div>
                        <small>{{ criteria.description }}</small>
                    </td>
                    <td>{{ criteria.weight }}%</td>
                    <td>
                        <input v-model="form.scores[key]" type="number" size="sm" min="0" max="100"
                            @input="calculateTotal(key)" />
                    </td>
                </tr>

                <!-- Products -->
                <tr class="bg-light">
                    <td colspan="3"><strong>Products</strong></td>
                </tr>
                <tr v-for="(criteria, key) in categories.products" :key="key">
                    <td>
                        <div>{{ criteria.name }}</div>
                        <small>{{ criteria.description }}</small>
                    </td>
                    <td>{{ criteria.weight }}%</td>
                    <td>
                        <input v-model="form.scores[key]" type="number" size="sm" min="0" max="100"
                            @input="calculateTotal(key)" />
                    </td>
                </tr>

                <!-- Total score row -->
                <tr class="font-weight-bold">
                    <td colspan="2">Total score</td>
                    <td>{{ totalScore }}</td>
                </tr>
            </tbody>
        </b-table-simple>

        <template #modal-footer>
            <div class="d-flex align-items-center">
                <b-button variant="primary" size="sm" class="mr-1 cursor-pointer" @click="submitForm">
                    <feather-icon icon="SaveIcon" size="16" />
                    Save
                </b-button>
                <b-button class="cursor-pointer" variant="outline-primary" size="sm"
                    @click="dialog.toggleDialog('supplierEvaluation', 'add')">
                    <feather-icon icon="XIcon" size="16" />
                    Close
                </b-button>
            </div>
        </template>
    </b-modal>
</template>

<script>
import { ref, computed, watch, onMounted } from "@vue/composition-api";
import {
    BCard,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BTableSimple,
    BAlert,
    BButton,
    BModal,
} from "bootstrap-vue";
import useCustomerSupplier from "@/composables/customer-suppliers";
import InfiniteScrollSelect from "@/views/components/InfiniteScrollSelect.vue";
import useUsers from "@/composables/users";
import toaster from "@/composables/toaster";

export default {
    name: "SupplierEvaluation",
    components: {
        BCard,
        BRow,
        BCol,
        BFormGroup,
        BFormInput,
        BTableSimple,
        BAlert,
        BButton,
        BModal,
        InfiniteScrollSelect,
    },
    setup() {
        const { dialog, form: customerSupplierForm } = useCustomerSupplier();

        const {
            fetchUsers,
            users,
            searchQuery,
            currentPage,
            isNextPageAvailable,
            busy,
        } = useUsers();

        const form = ref({
            date: "",
            performedBy: "",
            scores: {
                financialStrength: 100,
                sustainability: 100,
                strategicPartner: 50,
                certification: 100,
                compliance: 100,
                deliveryTime: 100,
                customerService: 100,
                complaintHandling: 100,
                productRange: 50,
                environmental: 0,
                priceOverTime: 50,
                priceCompetitiveness: 10,
                complaintFrequency: 20,
            },
        });

        const categories = {
            company: {
                financialStrength: {
                    name: "Financial strength",
                    weight: 10,
                    description:
                        "Evaluation of the supplier's financial capacity and stability, incl. capacity and resources to carry out the mission.",
                },
                sustainability: {
                    name: "Sustainability and ethics",
                    weight: 5,
                    description:
                        "Evaluation of the supplier's sustainability and ethical work, incl. environment, social responsibility.",
                },
                strategicPartner: {
                    name: "Strategic partner",
                    weight: 5,
                    description:
                        "Evaluation of the supplier as a strategic partner and the possibility of replacing them if necessary.",
                },
                certification: {
                    name: "Certification and external review",
                    weight: 10,
                    description:
                        "Evaluation of any external certifications, eg ISO.",
                },
                compliance: {
                    name: "Compliance with delivery conditions",
                    weight: 10,
                    description:
                        "Evaluation of the supplier's ability to fulfill the agreed delivery conditions",
                },
            },
            service: {
                deliveryTime: {
                    name: "Delivery time",
                    weight: 10,
                    description:
                        "Evaluation of the supplier's ability to deliver products or services according to the set time.",
                },
                customerService: {
                    name: "Customer service",
                    weight: 5,
                    description:
                        "Evaluation of the supplier's customer service and communication skills.",
                },
                complaintHandling: {
                    name: "Complaint handling",
                    weight: 5,
                    description:
                        "Evaluation of the supplier's ability to handle complaints.",
                },
            },
            products: {
                productRange: {
                    name: "Product range",
                    weight: 5,
                    description:
                        "Evaluation of the supplier's breadth and depth in their offering of products and services.",
                },
                environmental: {
                    name: "Environmental & sustainability commitment",
                    weight: 10,
                    description:
                        "Evaluation of the supplier's environmental work and commitment to sustainability issues, e.g. use of environmental labels",
                },
                priceOverTime: {
                    name: "Price change over time",
                    weight: 10,
                    description:
                        "Evaluation of the supplier's price development over time. ",
                },
                priceCompetitiveness: {
                    name: "Price competitiveness",
                    weight: 10,
                    description:
                        "Evaluation of the supplier's prices in relation to competitors' prices in the market",
                },
                complaintFrequency: {
                    name: "Complaint frequency",
                    weight: 5,
                    description:
                        "Evaluation of the number of advertised products in relation to the total number of delivered products from the supplier",
                },
            },
        };

        const totalScore = computed(() => {
            let total = 0;
            Object.entries(form.value.scores).forEach(([key, value]) => {
                total +=
                    (value * categories.company[key]?.weight) / 100 ||
                    (value * categories.service[key]?.weight) / 100 ||
                    (value * categories.products[key]?.weight) / 100 ||
                    0;
            });
            return total.toFixed(1);
        });

        const calculateTotal = (x) => {
            if (form.value.scores[x] > 100) {
                form.value.scores[x] = 100;
            } else if (
                form.value.scores[x] < 0 ||
                isNaN(form.value.scores[x])
            ) {
                form.value.scores[x] = 0;
            }
            Object.keys(form.value.scores).forEach((key) => {
                form.value.scores[key] = Math.min(
                    100,
                    Math.max(0, form.value.scores[key])
                );
            });
        };

        const tempUsers = ref([]);

        const submitForm = () => {
            if (form.value.performedBy === "" || form.value.date === "") {
                toaster().error("Please fill in all fields");
                return;
            }

            const data = {
                performed_by: form.value.performedBy,
                performed_by_name: tempUsers.value.find(
                    (user) => user.id === form.value.performedBy
                )?.name,
                total_score: totalScore.value,
                evaluation_date: form.value.date,
                status: totalScore.value >= 60 ? "meets_requirements" : "not_meet_requirements",
                evaluation_criteria: form.value.scores,
            }

            customerSupplierForm.supplier_evaluation.push(data);
            dialog.toggleDialog("supplierEvaluation", "add");

        };

        const searchUsers = (query) => {
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
            tempUsers.value = [...tempUsers.value, ...newVal];
        });

        return {
            isNextPageAvailable,
            formattedUsers,
            currentPage,
            categories,
            totalScore,
            dialog,
            busy,
            form,
            calculateTotal,
            searchUsers,
            submitForm,
        };
    },
};
</script>

<style lang="scss" scoped>
input {
    min-width: 100%;
    border: 1px solid #ced4da;
    border-radius: 4px;
    padding: 5px;
    color: #444;

    &:focus {
        border-color: #7367f0;
        outline: none;
    }
}
</style>
