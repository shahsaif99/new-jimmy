<template>
    <div>
        <b-sidebar style="z-index: 2000" :visible="isOpen" no-header shadow right>
            <template #default="{ hide }">
                <div class="p-1">
                    <div class="d-flex align-item-center justify-content-between">
                        <h4 id="sidebar-no-header-title">Attach Procedure</h4>
                        <feather-icon class="cursor-pointer" icon="XIcon" size="16" @click="emit('close')" />
                    </div>
                    <div class="radios-container mt-1">
                        <b-form-group v-slot="{ ariaDescribedby }">
                            <div v-for="(procedure, index) in procedures" :key="index">
                                <div v-for="(item, index) in procedure.documents" :key="index">
                                    <b-card style="max-width: 350px" class="attach-card text-capitalize" v-for="(document, index) in
                                        item.documents" :key="index">
                                        <b-form-radio @change="() => change(document)" v-model="procedureModel"
                                            :aria-describedby="ariaDescribedby" name="procedure-radios"
                                            :value="document.id">
                                            {{ document.title }}
                                        </b-form-radio>
                                        <div style="margin-left: 26px"
                                            class="d-flex justify-content-between mt-1 align-items-center">
                                            <b-badge variant="secondary">{{ document.type }}</b-badge>
                                            <span>{{ document.docId }}</span>
                                        </div>
                                    </b-card>
                                </div>
                            </div>
                        </b-form-group>

                        <button :disabled="!procedureModel" @click="handleAttach" style="font-size: 18px"
                            class="btn btn-primary d-flex justify-content-center align-items-center w-100">
                            <i class="bi bi-paperclip"></i>
                            Attach
                        </button>
                    </div>
                </div>
            </template>
        </b-sidebar>
    </div>
</template>
<script>
import { BSidebar, BFormGroup, BFormRadio, BCard, BBadge } from "bootstrap-vue";
import { onMounted, ref, reactive } from "@vue/composition-api";
import useDocuments from "@/composables/documents";

export default {
    components: { BSidebar, BFormGroup, BFormRadio, BCard, BBadge },
    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },
    },
    setup(props, { emit }) {
        const { getDocuments, documentsData: procedures } = useDocuments();
        const procedureModel = ref(null)

        const selectedProcedure = reactive({
            data: null,
            id: null
        });

        const change = (document) => {
            selectedProcedure.data = document
            selectedProcedure.id = procedureModel.value
        }

        const handleAttach = () => {
            emit("attach", selectedProcedure);
        };

        onMounted(() => {
            getDocuments();
        });

        return {
            change,
            procedures,
            procedureModel,
            handleAttach,
            emit
        };
    },
};
</script>
