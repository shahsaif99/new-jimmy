<template>
    <b-modal cancel-variant="outline-secondary" centered :hide-footer="true" title="Add New Location" size="lg"
        @close="$emit('update:is-add-location-active', false)" :visible="isAddLocationActive"
        @hide="$emit('update:is-add-location-active', false)">

        <b-overlay :show="apiHelpers.loading" spinner-variant="primary" spinner-type="grow" rounded="sm" opacity="0.20">
            <b-form @submit.prevent="addStorageLocations">
                <b-row>
                    <b-col cols="12" md="12">
                        <b-form-input v-model="storageLocations.model" class="mr-1 py-2"
                            :placeholder="$t('AddLocation')" trim />
                    </b-col>
                </b-row>

                <!-- Form Actions -->
                <div class="d-flex mt-2">
                    <b-button variant="primary" class="mr-2" type="submit">
                        Add Location
                    </b-button>
                    <b-button type="button" size="sm" variant="outline-secondary" @click="
                        $emit('update:is-add-location-active', false)
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
        prop: "isAddLocationActive",
        event: "update:is-add-location-active",
    },
    props: {
        isAddLocationActive: {
            type: Boolean,
            required: true,
        },
    },
    setup(props, { emit }) {
        const {
            apiHelpers,
            storageLocations,
            addStorageLocations,
        } = useStorageLocations();

        return {
            apiHelpers,
            storageLocations,
            addStorageLocations,
        };
    },
};
</script>
