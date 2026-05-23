<template>
    <div>
        <div
            v-if="can('checklist-create')"
            class="add-checklist"
            @click="$router.push({ name: 'add-checklist' })"
        >
            <div class="card create-checklist">
                <div class="row g-0">
                    <div class="col-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            class="svg-icon"
                        >
                            <path
                                d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
                            />
                        </svg>
                    </div>
                    <div class="col-10">
                        <div class="card-body">
                            <h5 class="card-title">Create New Template</h5>
                            <p class="card-text">
                                Customize your template with our advance
                                template builder
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr />

        <div
            v-if="!loading && (filteredChecklist.length || hasActiveFilter)"
            class="d-flex justify-content-between align-items-center py-2"
            style="gap: 12px"
        >
            <h1 class="mb-0">Templates</h1>
            <div class="d-flex align-items-center" style="gap: 12px; flex-wrap: nowrap">
                <b-form-select
                    v-model="categoryFilter"
                    :options="categoryOptions"
                    style="width: 160px"
                />
                <b-form-input
                    v-model="searchQuery"
                    placeholder="Search..."
                    style="width: 240px"
                />
                <div class="view-toggle btn-group" role="group">
                    <button
                        type="button"
                        class="btn"
                        :class="viewMode === 'list' ? 'btn-primary' : 'btn-outline-secondary'"
                        @click="viewMode = 'list'"
                        title="List view"
                    >
                        <i class="bi bi-list"></i>
                    </button>
                    <button
                        type="button"
                        class="btn"
                        :class="viewMode === 'grid' ? 'btn-primary' : 'btn-outline-secondary'"
                        @click="viewMode = 'grid'"
                        title="Grid view"
                    >
                        <i class="bi bi-grid-3x3-gap-fill"></i>
                    </button>
                </div>
            </div>
        </div>

        <div v-if="loading" class="text-center py-3">Loading...</div>

        <List
            v-else-if="viewMode === 'list'"
            :checklist="pagedChecklist"
            @refetch="getAllChecklist"
        />
        <card
            v-else
            :checklist="pagedChecklist"
            @refetch="getAllChecklist"
        />

        <div
            v-if="!loading && !filteredChecklist.length && hasActiveFilter"
            class="text-center text-muted py-4"
        >
            No templates match your filters.
        </div>

        <div
            v-if="!loading && filteredChecklist.length"
            class="d-flex justify-content-between align-items-center flex-wrap mt-2"
            style="gap: 12px"
        >
            <small class="text-muted">
                Showing {{ pageStart }}–{{ pageEnd }} of {{ filteredChecklist.length }} entries
            </small>
            <div class="d-flex align-items-center" style="gap: 10px">
                <small class="text-muted">Show</small>
                <b-form-select
                    v-model="perPage"
                    :options="perPageOptions"
                    size="sm"
                    style="width: 80px"
                />
                <small class="text-muted">entries</small>
                <b-pagination
                    v-model="page"
                    :total-rows="filteredChecklist.length"
                    :per-page="perPage"
                    first-number
                    last-number
                    class="mb-0"
                />
            </div>
        </div>
    </div>
</template>
<script>
import { onMounted, ref, computed, onUnmounted, watch } from "@vue/composition-api";
import { BFormSelect, BFormInput, BPagination } from "bootstrap-vue";
import axios from "@axios";
import card from "./card.vue";
import List from "./List.vue";
import route from "ziggy-js";
import useTasks from "@/composables/tasks";
import useAbilities from "@/composables/abilities";

export default {
    components: { card, List, BFormSelect, BFormInput, BPagination },
    setup() {
        const checklist = ref([]);
        const categories = ref([]);
        const searchQuery = ref("");
        const categoryFilter = ref(null);
        const viewMode = ref("list");
        const loading = ref(false);
        const { assign, dialog } = useTasks();
        const { can } = useAbilities();

        const categoryOptions = computed(() => [
            { value: null, text: "All categories" },
            ...categories.value.map((c) => ({ value: c.id, text: c.name })),
        ]);

        const filteredChecklist = computed(() => {
            const q = (searchQuery.value || "").toLowerCase().trim();
            return checklist.value.filter((c) => {
                if (categoryFilter.value && c.category_id !== categoryFilter.value) return false;
                if (q && !(c.name || "").toLowerCase().includes(q)) return false;
                return true;
            });
        });

        const hasActiveFilter = computed(
            () => !!searchQuery.value || categoryFilter.value !== null
        );

        const page = ref(1);
        const perPage = ref(10);
        const perPageOptions = [
            { value: 10, text: "10" },
            { value: 25, text: "25" },
            { value: 50, text: "50" },
            { value: 100, text: "100" },
        ];

        const pagedChecklist = computed(() => {
            const start = (page.value - 1) * perPage.value;
            return filteredChecklist.value.slice(start, start + perPage.value);
        });
        const pageStart = computed(() =>
            filteredChecklist.value.length ? (page.value - 1) * perPage.value + 1 : 0
        );
        const pageEnd = computed(() =>
            Math.min(page.value * perPage.value, filteredChecklist.value.length)
        );

        watch([searchQuery, categoryFilter, perPage], () => {
            page.value = 1;
        });

        async function getAllChecklist() {
            try {
                loading.value = true;
                const response = await axios.get(route("checklist.index"));
                if (response.status === 200) checklist.value = response.data;
            } finally {
                loading.value = false;
            }
        }

        async function getCategories() {
            try {
                const response = await axios.get(route("categories.index"));
                if (response.status === 200) {
                    const list = Array.isArray(response.data)
                        ? response.data
                        : response.data?.data || [];
                    categories.value = list.map((c) => ({
                        id: c.id,
                        name: c.name,
                    }));
                }
            } catch (e) {
                categories.value = [];
            }
        }

        onMounted(() => {
            assign.value.reset();
            assign.value.checklist.reset();
            getAllChecklist();
            getCategories();
        });

        onUnmounted(() => {
            assign.value.reset();
        });

        return {
            getAllChecklist,
            checklist,
            searchQuery,
            categoryFilter,
            categoryOptions,
            viewMode,
            filteredChecklist,
            pagedChecklist,
            page, perPage, perPageOptions, pageStart, pageEnd,
            hasActiveFilter,
            loading,
            can,
        };
    },
};
</script>
<style scoped>
@media (min-width: 1482px) {
    .add-checklist {
        width: 30%;
    }
}
h1 {
    font-size: 40px;
}

.create-checklist {
    box-shadow: none;
    background: transparent;
    border-radius: 10px;
    cursor: pointer;
}
.create-checklist:hover {
    background: #dcf2ff;
}
.svg-icon {
    margin-left: 30px;
    margin-top: 20px;
    background: #0096fd;
    padding: 10px;
    fill: white;
    border-radius: 5px;
    max-width: 50px;
    min-width: 40px;
}
.view-toggle .btn {
    padding: 6px 10px;
}
</style>
<style lang="scss" scoped>
@import "~@core/scss/base/bootstrap-extended/include";
@import "~@core/scss/base/components/variables-dark";
.dark-layout {
    .create-checklist:hover {
        color: black !important;
    }
    .create-checklist:hover .card-title {
        color: black !important;
    }
}
</style>
