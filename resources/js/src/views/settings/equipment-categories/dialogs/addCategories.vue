<template>
    <b-modal cancel-variant="outline-secondary" centered :hide-footer="true" title="Add New Category" size="lg"
        @close="$emit('update:is-add-category-active', false)" :visible="isAddCategoryActive"
        @hide="$emit('update:is-add-category-active', false)">

        <b-overlay :show="apiHelpers.loading" spinner-variant="primary" spinner-type="grow" rounded="sm" opacity="0.20">
            <b-form @submit.prevent="addEquipmentCategories">
                <b-row>
                    <b-col cols="12" md="12">
                        <b-form-input v-model="equipmentCategories.model" class="mr-1 py-2"
                            :placeholder="$t('AddCategory')" trim />
                    </b-col>
                </b-row>

                <!-- Form Actions -->
                <div class="d-flex mt-2">
                    <b-button variant="primary" class="mr-2" type="submit">
                        Add Category
                    </b-button>
                    <b-button type="button" size="sm" variant="outline-secondary" @click="
                        $emit('update:is-add-category-active', false)
                        ">
                        Cancel
                    </b-button>
                </div>
            </b-form>
        </b-overlay>

    </b-modal>
</template>

<script>
import {
    BForm,
    BFormGroup,
    BFormInput,
    BOverlay,
    BModal,
    BButton,
    BRow,
    BCol,
} from "bootstrap-vue";

import useEquipmentCategories from "@/composables/equipment-categories";

export default {
    components: {
        BRow,
        BCol,
        BForm,
        BModal,
        BButton,
        BOverlay,
        BFormGroup,
        BFormInput,
    },
    model: {
        prop: "isAddCategoryActive",
        event: "update:is-add-category-active",
    },
    props: {
        isAddCategoryActive: {
            type: Boolean,
            required: true,
        },
    },
    setup(props, { emit }) {
        const {
            apiHelpers,
            equipmentCategories,
            addEquipmentCategories,
        } = useEquipmentCategories();

        return {
            apiHelpers,
            equipmentCategories,
            addEquipmentCategories,
        };
    },
};
</script>
