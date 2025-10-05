<template>
    <b-modal cancel-variant="outline-secondary" centered :hide-footer="true" title="Edit Location" size="lg"
        @close="$emit('update:is-edit-location-active', false)" :visible="isEditLocationActive"
        @hide="$emit('update:is-edit-location-active', false)">
        <b-overlay :show="apiHelpers.loading" spinner-variant="primary" spinner-type="grow" rounded="sm" opacity="0.20">
            <b-form @submit.prevent="editStorageLocations">
                <b-row>
                    <b-col cols="12" md="12">
                        <b-form-input v-model="storageLocations.edit.model" class="mr-1 py-2"
                            :placeholder="$t('EditLocation')" trim />
                    </b-col>
                </b-row>

                <!-- Form Actions -->
                <div class="d-flex mt-2">
                    <b-button variant="primary" class="mr-2" type="submit">
                        Save Changes
                    </b-button>
                    <b-button type="button" size="sm" variant="outline-secondary" @click="
                        $emit('update:is-edit-location-active', false)
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

import useStorageLocations from "@/composables/storage-location.js";

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
        prop: "isEditLocationActive",
        event: "update:is-edit-location-active",
    },
    props: {
        isEditLocationActive: {
            type: Boolean,
            required: true,
        },
    },
    setup(props, { emit }) {
        const {
            apiHelpers,
            storageLocations,
            editStorageLocations,
        } = useStorageLocations();

        return {
            apiHelpers,
            storageLocations,
            editStorageLocations,
        };
    },
};
</script>
