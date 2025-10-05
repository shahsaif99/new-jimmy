<template>
    <div
        id="task-headers"
        style="gap: 10px"
        class="mb-2 d-flex flex-wrap justify-content-between"
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
                        <span
                            @click="filters.toggleExpand"
                            class="cursor-pointer"
                            >{{
                                filters.expandAll
                                    ? "Collapse All"
                                    : "Expand All"
                            }}</span
                        >
                    </div>
                    <div
                        class="card-accordion"
                        v-for="(item, index) in filters.accordion"
                        :key="index"
                    >
                        <div
                            class="card-accordion-header"
                            @click="toggleExpand(item)"
                            v-if="item.label !== 'due date'"
                        >
                            <span class="px-1 text-capitalize"
                                >{{ item.label }}
                            </span>
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
                        <div class="card-accordion-header pb-0" v-else>
                            <b-form-checkbox v-model="item.model" switch>
                                <span>Due Date</span>
                            </b-form-checkbox>
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
                                <div
                                    v-if="
                                        item.label === 'status' ||
                                        item.label === 'priority'
                                    "
                                >
                                    <b-form-group v-slot="{ ariaDescribedby }">
                                        <b-form-checkbox
                                            v-for="(
                                                option, index
                                            ) in item.options"
                                            :value="option"
                                            class="mt-1 text-capitalize"
                                            v-model="item.model"
                                            :key="index"
                                        >
                                            <i
                                                :class="`bi ${item.icons[index]}`"
                                            />

                                            {{ option }}
                                        </b-form-checkbox>
                                    </b-form-group>
                                </div>
                                <div v-if="item.label === 'category'">
                                    <b-form-group v-slot="{ ariaDescribedby }">
                                        <b-form-checkbox
                                            v-model="item.model"
                                            v-for="(
                                                option, index
                                            ) in categories.data"
                                            :value="option.id"
                                            class="mt-1 text-capitalize"
                                            :key="index"
                                        >
                                            {{ option.name }}
                                        </b-form-checkbox>
                                    </b-form-group>
                                </div>
                                <div v-if="item.label === 'assigned to'">
                                    <b-form-group v-slot="{ ariaDescribedby }">
                                        <b-form-checkbox
                                            v-model="item.model"
                                            v-for="(option, index) in users"
                                            :value="option.id"
                                            class="mt-1 text-capitalize"
                                            :key="index"
                                        >
                                            <div
                                                @click="item.model = option.id"
                                            >
                                                <b-media ertical-align="center">
                                                    <template #aside>
                                                        <b-avatar
                                                            size="32"
                                                            :src="option.avatar"
                                                            :text="
                                                                avatarText(
                                                                    option.name
                                                                )
                                                            "
                                                            :variant="`light-${resolveUserRoleVariant(
                                                                option.name
                                                            )}`"
                                                        />
                                                    </template>
                                                    <b-link>
                                                        {{ option.name }}
                                                    </b-link>
                                                </b-media>
                                            </div>
                                        </b-form-checkbox>
                                    </b-form-group>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </b-dropdown>
            <div>
                <date-picker
                    v-model="filters.date"
                    :shortcuts="filters.dateShortcuts"
                    type="date"
                    range
                    placeholder="Select date range"
                    style="width: 180px !important"
                ></date-picker>
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
                        icon="ListIcon"
                        size="20"
                    />
                </template>
                <div id="list-dropdown">
                    <b-list-group>
                        <b-list-group-item
                            class="cursor-pointer"
                            @click="col.visible = !col.visible"
                            v-for="(col, key, index) in columns"
                            :key="key"
                        >
                            <div class="d-flex justify-content-between">
                                <span> {{ col.label }} </span>

                                <feather-icon
                                    v-if="col.visible"
                                    icon="CheckIcon"
                                    size="16"
                                />
                            </div>
                        </b-list-group-item>
                    </b-list-group>
                </div>
            </b-dropdown>

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

            <b-button
                @click="filters.showOpen = !filters.showOpen"
                variant="outline-white"
                size="sm"
            >
                <feather-icon
                    class="text-primary"
                    :icon="filters.showOpen ? 'EyeIcon' : 'EyeOffIcon'"
                    size="20"
                />
            </b-button>

            <div
                v-if="userData.role === 'Admin'"
                style="gap: 10px"
                class="d-flex mx-2"
            >
                <b-button
                    @click="manageCateDialog.toggleDialog"
                    variant="primary"
                    size="sm"
                >
                    <feather-icon icon="ZapIcon" size="16" /> Manage Category
                </b-button>
                <b-button @click="openDialog" variant="primary" size="sm">
                    <feather-icon icon="PlusIcon" size="16" /> Add
                </b-button>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, getCurrentInstance } from "@vue/composition-api";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/scss/index.scss";
import useTasks from "@/composables/tasks";
import useCategories from "@/composables/categories";
import useUsers from "@/composables/users";
import { avatarText } from "@core/utils/filter";
import useJwt from "@/auth/jwt/useJwt";

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
    },

    setup() {
        const {
            filters,
            columns,
            dialog,
            tasks,
            assign,
            exportToExcel,
            exportToPDF,
            editTask,
        } = useTasks();
        const { manageCateDialog, categories } = useCategories();
        const { fetchUsers, users, resolveUserRoleVariant } = useUsers();
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

        const openDialog = () => {
            editTask.id = null;
            assign.value.reset();
            dialog.toggleDialog();
        };

        onMounted(async () => {
            getComputedHeight();
            await fetchUsers();
        });

        return {
            filters,
            columns,
            dialog,
            manageCateDialog,
            tasks,
            users,
            avatarText,
            resolveUserRoleVariant,
            categories,
            userData,
            toggleExpand,
            openDialog,
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
