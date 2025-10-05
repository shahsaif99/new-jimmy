<template>
    <div
        id="task-headers"
        style="gap: 10px"
        class="d-flex flex-wrap justify-content-between"
    >
        <div style="gap: 10px" class="d-flex flex-wrap align-items-center">
            <b-dropdown
                id="filters"
                toggle-class="text-decoration-none"
                no-caret
                variant="outline-primary"
            >
                <template #button-content>
                    <div class="flex gap-1">
                        <feather-icon icon="SlidersIcon" size="16" />
                        <span>Filters</span>
                    </div>
                </template>
                <div class="filter-menu">
                    <div
                        class="d-flex justify-content-between px-2 py-1 align-items-center"
                    >
                        <h3 class="">Filters</h3>
                        <!-- <span @click="filters.toggleExpand" class="cursor-pointer">
                            {{ filters.expandAll ? "Collapse All" : "Expand All" }}
                        </span> -->
                    </div>

                    <div class="pb-1" v-for="(item, index) in filters.selects">
                        <div class="px-1" v-if="item.key === 'storage'">
                            <span class="text-capitalize">{{
                                item.label
                            }}</span>
                            <InfiniteScrollSelect
                                :clearable="true"
                                v-model="item.model"
                                @onSearch="storageLocations.search"
                                :options="storageLocations.formatedData"
                                :has-next-page="storageLocations.hasNextPage"
                                :loading="storageApiHelpers.loading"
                                @onFetchOptions="getStorageLocations"
                                @onPaginate="storageLocations.currentPage++"
                            />
                        </div>
                        <div class="px-1" v-else-if="item.key === 'category'">
                            <span class="text-capitalize">{{
                                item.label
                            }}</span>
                            <InfiniteScrollSelect
                                :clearable="true"
                                v-model="item.model"
                                @onSearch="equipmentCategories.search"
                                :options="equipmentCategories.formatedData"
                                :has-next-page="equipmentCategories.hasNextPage"
                                :loading="apiHelpers.loading"
                                @onFetchOptions="getEquipmentCategories"
                                @onPaginate="equipmentCategories.currentPage++"
                            />
                        </div>
                    </div>
                    <div
                        v-for="(item, index) in filters.accordion"
                        :key="index"
                        class="card-accordion"
                    >
                        <div
                            class="card-accordion-header"
                            @click="toggleExpand(item)"
                        >
                            <span class="px-1 text-capitalize">{{
                                item.label
                            }}</span>
                            <div class="icon">
                                <feather-icon
                                    v-if="!item.isExpand"
                                    icon="ChevronDownIcon"
                                    size="16"
                                />
                                <feather-icon
                                    v-else
                                    icon="ChevronUpIcon"
                                    size="16"
                                />
                            </div>
                        </div>

                        <div
                            class="card-accordion-body"
                            :ref="'content' + item.id"
                            :style="[
                                item.isExpand
                                    ? { height: item.computedHeight }
                                    : {},
                            ]"
                        >
                            <div class="card-accordion-content px-1">
                                <!-- Status Filter -->
                                <div v-if="item.key === 'status'">
                                    <b-form-group>
                                        <b-form-checkbox
                                            v-for="(
                                                option, index
                                            ) in item.options"
                                            :value="option"
                                            v-model="item.model"
                                            :key="index"
                                            class="mt-1 text-capitalize"
                                        >
                                            {{ option }}
                                        </b-form-checkbox>
                                    </b-form-group>
                                </div>

                                <!-- Lending Status Filter -->
                                <div v-if="item.key === 'lending_status'">
                                    <b-form-group>
                                        <b-form-checkbox
                                            v-for="(
                                                option, index
                                            ) in item.options"
                                            :value="option"
                                            v-model="item.model"
                                            :key="index"
                                            class="mt-1 text-capitalize"
                                        >
                                            {{ option }}
                                        </b-form-checkbox>
                                    </b-form-group>
                                </div>

                                <!-- Level of Training Filter -->
                                <div v-if="item.key === 'level_of_training'">
                                    <b-form-group>
                                        <b-form-checkbox
                                            v-for="(
                                                option, index
                                            ) in item.options"
                                            :value="option"
                                            v-model="item.model"
                                            :key="index"
                                            class="mt-1 text-capitalize"
                                        >
                                            {{ option }}
                                        </b-form-checkbox>
                                    </b-form-group>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </b-dropdown>
            <div class="d-flex align-items-center justify-content-end">
                <b-form-input
                    debounce="500"
                    v-model="searchQuery"
                    class="d-inline-block mr-1 md-2"
                    placeholder="Search..."
                />
            </div>
        </div>
        <div class="d-flex flex-wrap align-items-center">
            <b-dropdown
                id="showColumn"
                toggle-class="text-decoration-none"
                no-caret
                variant="outline-white"
                size="sm"
            >
                <template #button-content>
                    <feather-icon
                        class="text-primary"
                        icon="DownloadIcon"
                        size="20"
                    />
                </template>
                <b-dropdown-item @click="exportToExcel"
                    >Export To Excel</b-dropdown-item
                >
                <b-dropdown-item @click="exportToPDF"
                    >Export To PDF</b-dropdown-item
                >
            </b-dropdown>

            <div style="gap: 10px" class="d-flex mx-2">
                <b-button
                    @click="$emit('addEquipment')"
                    variant="primary"
                    size="sm"
                >
                    <feather-icon icon="PlusIcon" size="16" /> Add Equipment
                </b-button>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, getCurrentInstance, watch } from "@vue/composition-api";
import useJwt from "@/auth/jwt/useJwt";
import useEquipments from "@/composables/equipments";
import InfiniteScrollSelect from "@/views/components/InfiniteScrollSelect.vue";
import useEquipmentCategories from "@/composables/equipment-categories";
import useStorageLocations from "@/composables/storage-location";
import {
    BButton,
    BDropdown,
    BDropdownItem,
    BOverlay,
    BFormDatepicker,
    BListGroup,
    BListGroupItem,
    BCard,
    BCardHeader,
    BCollapse,
    BFormCheckboxGroup,
    BFormCheckbox,
    BFormGroup,
    BAvatar,
    BLink,
    BMedia,
    BFormInput,
} from "bootstrap-vue";

export default {
    components: {
        BButton,
        BDropdown,
        BDropdownItem,
        BOverlay,
        BFormDatepicker,
        BListGroup,
        BListGroupItem,
        BCard,
        BCardHeader,
        BCollapse,
        BFormCheckboxGroup,
        BFormCheckbox,
        BFormGroup,
        BAvatar,
        BLink,
        BMedia,
        BFormInput,
        InfiniteScrollSelect,
    },

    setup(props, { emit }) {
        const { filters, exportToExcel, exportToPDF, searchQuery } =
            useEquipments();
        const {
            apiHelpers: storageApiHelpers,
            storageLocations,
            getStorageLocations,
        } = useStorageLocations();
        const { apiHelpers, equipmentCategories, getEquipmentCategories } =
            useEquipmentCategories();

        const userData = JSON.parse(useJwt.getUserData());

        const getComputedHeight = () => {
            filters.accordion.forEach((item) => {
                const content =
                    getCurrentInstance().refs["content" + item.id][0];

                content.style.height = "auto";
                content.style.position = "absolute";
                content.style.visibility = "hidden";
                content.style.display = "block";

                const height = getComputedStyle(content).height;
                item.computedHeight = height;

                content.style.height = 0;
                content.style.position = null;
                content.style.visibility = null;
                content.style.display = null;
            });
        };
        const toggleExpand = (item) => {
            item.isExpand = !item.isExpand;
        };

        onMounted(async () => {
            getComputedHeight();
            getEquipmentCategories();
            getStorageLocations();
        });

        return {
            filters,
            userData,
            storageApiHelpers,
            storageLocations,
            apiHelpers,
            equipmentCategories,
            getStorageLocations,
            toggleExpand,
            getEquipmentCategories,
            searchQuery,
            exportToExcel,
            exportToPDF,
        };
    },
};
</script>

<style>
.card-accordion {
    height: auto;
    display: block;
    position: relative;
    margin: 0px;
    padding: 0 10px;
    border-top: 1px solid #d8d8d8;
}

.card-accordion-header {
    padding: 15px 0;
}

.card-accordion-header {
    cursor: pointer;
}

.card-accordion-header span {
    font-weight: 600;
}

.card-accordion-body {
    height: 0;
    overflow: hidden;
    transition: 0.3s;
}

.icon {
    float: right;
}

#task-headers .dropdown-menu {
    min-width: 250px;
}

.filter-menu {
    max-height: 600px;
    overflow: auto;
}
</style>
