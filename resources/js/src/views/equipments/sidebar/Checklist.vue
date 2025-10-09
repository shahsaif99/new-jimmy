<template>
    <div>

        <b-sidebar style="z-index: 2000;" :visible="isOpen" no-header shadow right>
            <template #default="{ hide }">
                <div class="p-1">
                    <div class="d-flex align-item-center justify-content-between">
                        <h4 id="sidebar-no-header-title">Attach Checklist</h4>
                        <feather-icon class="cursor-pointer" icon="XIcon" size="16" @click="emit('close')" />
                    </div>
                    <div class="radios-container mt-1">
                        <b-form-group v-for="(checklist, index) in checklists" :key="index"
                            v-slot="{ ariaDescribedby }">
                            <b-card style="max-width: 350px" class="attach-card text-capitalize">
                                <b-form-radio v-model="checklistModel" :aria-describedby="ariaDescribedby"
                                    name="checklist-radios" :value="checklist.name">{{ checklist.name }}</b-form-radio>
                                <div style="margin-left: 26px"
                                    class="d-flex justify-content-between mt-1 align-items-center">
                                    <p>
                                        <strong>{{ checklist.sections.length }}</strong>
                                        Items
                                    </p>
                                    <p><strong>0</strong> Attachments</p>
                                </div>
                            </b-card>
                        </b-form-group>

                        <button :disabled="!checklistModel" @click="attach" style="font-size: 18px"
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
import { BSidebar, BFormGroup, BFormRadio, BCard } from "bootstrap-vue";
import { onMounted, computed, ref } from "@vue/composition-api";
import axios from "@axios";

export default {
    components: {
        BSidebar,
        BFormGroup, BFormRadio, BCard
    },
    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },
    },
    setup(props, { emit }) {
        const checklists = ref([]);
        const checklistModel = ref(null)

        const getAllChecklist = () => {
            axios.get(route("checklist.index")).then((response) => {
                if (response.status === 200) {
                    checklists.value = response.data;
                }
            });
        };
        onMounted(() => {
            getAllChecklist();

        });

        const selectedChecklist = computed(() => {
            return checklists.value.find(
                (checklist) => checklist.name === checklistModel.value
            );
        });

        const attach = () => {
            emit('attach', selectedChecklist.value)
        };

        return {
            checklists,
            checklistModel,
            selectedChecklist,
            emit,
            attach,
        };
    }
};
</script>
