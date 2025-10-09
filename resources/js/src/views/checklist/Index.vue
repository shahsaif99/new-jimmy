<template>
    <div >
        <div
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
        <h1 v-if="checklist.length" class="py-2">Templates</h1>
        <card :checklist="checklist" @refetch="getAllChecklist" />
    </div>
</template>
<script>
import { onMounted, ref, onUnmounted } from "@vue/composition-api";
import axios from "@axios";
import card from "./card.vue";
import route from "ziggy-js";
import useTasks from "@/composables/tasks";

export default {
    // omponents: {
    //   BRow,
    //   BCol,
    //   InformationBoard,
    //   Equipments,
    // },c
    // directives: {
    //   'b-tooltip': VBTooltip,
    // },
    components: {
        card,
    },
    setup() {
        const checklist = ref([]);
        const { assign, dialog } = useTasks();

        onMounted(() => {
            // dialog.closeDialog()
            assign.value.reset();
            assign.value.checklist.reset();
            getAllChecklist();
        });

        function getAllChecklist() {
            axios.get(route("checklist.index")).then((response) => {
                if (response.status === 200) {
                    checklist.value = response.data;
                }
            });
        }

        onUnmounted(() => {
            assign.value.reset()
        });

        return {
            getAllChecklist,
            checklist,
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
