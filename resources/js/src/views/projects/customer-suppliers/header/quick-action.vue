<template>
    <div id="task-headers" style="gap: 10px" class="mb-2 d-flex flex-wrap justify-content-between">
        <div style="gap: 10px" class="d-flex  align-items-center">
            <b-dropdown id="filters" toggle-class="text-decoration-none" no-caret variant="outline-primary">
                <template #button-content>
                    <div class="flex gap-1">
                        <feather-icon icon="SlidersIcon" size="16" />
                        <span>Filters</span>
                    </div>
                </template>
                <div class="filter-menu">
                    <div class="d-flex justify-content-between px-2 py-1 align-items-center">
                        <h3 class="">Filters</h3>
                        <span @click="filters.toggleExpand" class="cursor-pointer">{{
                            filters.expandAll
                                ? "Collapse All"
                                : "Expand All"
                        }}</span>
                    </div>
                    <div class="card-accordion" v-for="(item, index) in filters.accordion" :key="index">
                        <div class="card-accordion-header" @click="toggleExpand(item)">
                            <span class="px-1 text-capitalize">{{ item.label }}
                            </span>
                            <div class="icon">
                                <feather-icon v-if="!item.isExpand" icon="ChevronDownIcon" size="16" />
                                <feather-icon v-else icon="ChevronUpIcon" size="16" />
                            </div>
                        </div>


                        <div class="card-accordion-body" :ref="'content' + item.id" :style="[
                            item.isExpand
                                ? { height: item.computedHeight }
                                : {},
                        ]">
                            <div class="card-accordion-content px-1">
                                <div>
                                    <b-form-group v-slot="{ ariaDescribedby }">
                                        <b-form-checkbox v-for="(
                                                option, index
                                            ) in item.options" :value="option" class="mt-1 text-capitalize"
                                            v-model="item.model" :key="index">
                                            {{ option.replaceAll('_', " ") }}
                                        </b-form-checkbox>
                                    </b-form-group>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </b-dropdown>
            <div>
                <date-picker v-model="filters.date" :shortcuts="filters.dateShortcuts" type="date" range
                    placeholder="Select date range" style="width: 180px !important"></date-picker>
            </div>
            <b-form-input variant="outline-primary" debounce="500" v-model="filters.search" 
            placeholder="Search..." />

         
        </div>
        <div class="d-flex flex-wrap align-items-center">
            <b-dropdown id="showColumn" toggle-class="text-decoration-none" no-caret variant="outline-white" size="sm">
                <template #button-content>
                    <feather-icon class="text-primary" icon="ListIcon" size="20" />
                </template>
                <div id="list-dropdown">
                    <div class="cursor-pointer hide-column__item" v-for="(col, key, index) in columns.slice(1, columns.length)" :key="key">
                        <div class="d-flex align-items-center justify-content-between ">
                            <span class="px-1" style="margin-top: 2px;"> {{ col.label }} </span>

                            <b-form-checkbox style="margin-bottom: 4px;" v-model="col.visible" name="check-button"
                                size="lg" switch>

                            </b-form-checkbox>
                        </div>
                    </div>
                </div>
            </b-dropdown>


            <div style="gap: 10px" class="d-flex mx-2">
                <b-button @click="dialog.toggleDialog('customerSupplier', 'add')" variant="primary" size="sm">
                    <feather-icon icon="PlusIcon" size="16" /> Add Customer/Supplier
                </b-button>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, getCurrentInstance } from "@vue/composition-api";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/scss/index.scss";
import useCustomerSupplier from "@/composables/customer-suppliers";


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
    BFormInput
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
        DatePicker,
        BFormCheckboxGroup,
        BFormCheckbox,
        BFormGroup,
        BAvatar,
        BLink,
        BMedia,
        BFormInput
    },

    setup() {
        const {
            filters,
            columns,
            dialog
        } = useCustomerSupplier();

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
        });

        return {
            dialog,
            filters,
            columns,
            toggleExpand,
        };
    },
};
</script>

<style lang="scss">
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

.hide-column__item {
    .custom-switch .custom-control-label {
        padding-left: 0px !important;
    }
}
</style>
