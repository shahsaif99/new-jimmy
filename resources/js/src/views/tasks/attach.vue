<template>
    <div class="attach-checklist">
        <div class="radios-container">
            <b-form-group
                v-for="(checklist, index) in checklists"
                :key="index"
                v-slot="{ ariaDescribedby }"
            >
                <b-card
                    style="max-width: 350px"
                    class="attach-card p-1 text-capitalize"
                >
                    <b-form-radio
                        v-model="assign.checklist.temp"
                        :aria-describedby="ariaDescribedby"
                        name="checklist-radios"
                        :value="checklist.name"
                        >{{ checklist.name }}</b-form-radio
                    >
                    <div
                        style="margin-left: 26px"
                        class="d-flex justify-content-between mt-1 align-items-center"
                    >
                        <p>
                            <strong>{{ checklist.sections.length }}</strong>
                            Items
                        </p>
                        <p><strong>0</strong> Attachments</p>
                    </div>
                </b-card>
            </b-form-group>

            <button
                :disabled="!assign.checklist.temp"
                @click="attach"
                style="font-size: 18px"
                class="btn btn-primary d-flex justify-content-center align-items-center mt-4 w-100"
            >
                <i class="bi bi-paperclip"></i>
                Attach
            </button>
        </div>

        <div class="w-100 py-2" v-if="selectedChecklist">
            <b-card class="row align-items-start add-header">
                <div class="d-flex flex-column enter-name text-capitalize">
                    <h3>{{ selectedChecklist.name }}</h3>

                    <div>
                        <p>Created by : {{ selectedChecklist.user_name }}</p>
                    </div>
                </div>
                <div
                    v-if="selectedChecklist.title_img"
                    class="position-relative mt-1"
                    style="max-width: 300px"
                >
                    <img
                        :src="selectedChecklist.title_img"
                        class="uploaded-image"
                    />
                    <i
                        class="bi bi-x-lg position-absolute dlt-img"
                        @click="selectedChecklist.title_img = ''"
                    ></i>
                </div>
            </b-card>

            <b-card
                v-for="(section, index) in selectedChecklist.sections"
                :key="index"
            >
                <h2 style="font-size: 28px; font-weight: 600">
                    {{ section.name }}
                </h2>
                <div
                    v-for="(task, taskIndex) in section.tasks"
                    :key="taskIndex"
                    class="w-100 card steps mt-1 d-flex steps-div"
                >
                    <div class="d-flex align-items-center pb-2">
                        <input
                            class="discription-input ml-1"
                            placeholder="Enter discription  "
                            v-model="task.name"
                            required
                        />

                        <select v-model="task.type" class="step-select ml-1">
                            <option :value="task.type">
                                {{ task.type }}
                            </option>
                        </select>
                    </div>
                    <div v-if="task.type === 'Temperature'" class="d-flex">
                        <label
                            class="btn temp-button"
                            style="color: #7367f0"
                            :style="
                                task.param === 'F'
                                    ? 'background-color: #eff2ff;'
                                    : ''
                            "
                            >°F (Fehrenheit)
                        </label>

                        <label
                            class="btn temp-button text-danger"
                            :style="
                                task.param === 'C'
                                    ? 'background-color: #eff2ff;'
                                    : ''
                            "
                            >°C
                        </label>

                        <label
                            class="btn temp-button text-primary"
                            :style="
                                task.param === 'K'
                                    ? 'background-color: #eff2ff;'
                                    : ''
                            "
                            >K
                        </label>
                    </div>
                    <div v-if="task.type === 'Cost'" class="d-flex">
                        <label
                            class="btn temp-button"
                            :style="
                                task.param === '$'
                                    ? 'background-color: #eff2ff;'
                                    : ''
                            "
                            style="color: #7367f0"
                            >$ USD
                        </label>

                        <label
                            class="btn temp-button text-danger"
                            :style="
                                task.param === '€'
                                    ? 'background-color: #eff2ff!important;'
                                    : ''
                            "
                            >€ EURO
                        </label>
                    </div>
                    <div class="d-flex align-items-center">
                        <div class="custom-control custom-switch">
                            <label
                                class="custom-control-label attachment-label"
                                :for="'task_' + index + '_' + taskIndex"
                                >Required image</label
                            >
                        </div>
                        <label v-if="!task.img" class="attachment-label ml-1"
                            ><svg
                                class="attachment"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                            >
                                <path
                                    d="M364.2 83.8c-24.4-24.4-64-24.4-88.4 0l-184 184c-42.1 42.1-42.1 110.3 0 152.4s110.3 42.1 152.4 0l152-152c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-152 152c-64 64-167.6 64-231.6 0s-64-167.6 0-231.6l184-184c46.3-46.3 121.3-46.3 167.6 0s46.3 121.3 0 167.6l-176 176c-28.6 28.6-75 28.6-103.6 0s-28.6-75 0-103.6l144-144c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-144 144c-6.7 6.7-6.7 17.7 0 24.4s17.7 6.7 24.4 0l176-176c24.4-24.4 24.4-64 0-88.4z"
                                />
                            </svg>
                            <span class="add-attachment">Add Attachement </span>
                        </label>
                    </div>
                    <div
                        v-if="task.img"
                        class="position-relative my-1"
                        style="margin-left: 20px; max-width: 300px"
                    >
                        <img :src="task.img" class="uploaded-image" />
                        <i
                            class="bi bi-x-lg position-absolute dlt-img"
                            @click="task.img = ''"
                        ></i>
                    </div>
                </div>
            </b-card>
        </div>
    </div>
</template>
<script>
import useTasks from "@/composables/tasks";
import { onMounted, computed, ref } from "@vue/composition-api";
import { BFormGroup, BFormRadio, BCard } from "bootstrap-vue";
import router from "@/router";
import axios from "@axios";

export default {
    components: {
        BFormGroup,
        BFormRadio,
        BCard,
    },
    setup() {
        const checklists = ref([]);

        const { assign, dialog } = useTasks();

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
            if (!!checklists.length) return undefined;

            return checklists.value.find(
                (checklist) => checklist.name === assign.value.checklist.temp
            );
        });

        const attach = () => {
            assign.value.checklist.data = selectedChecklist.value;
            assign.value.checklist.id = selectedChecklist.value.id;
            dialog.show = true;
            router.push({ name: "tasks" });
        };

        return {
            checklists,
            selectedChecklist,
            assign,
            attach,
        };
    },
};
</script>
<style lang="scss">
.attach-checklist {
    display: flex;
    gap: 20px;
}
.attach-checklist .attach-card {
    margin: 0px;
    border-radius: 0px;
}

.attach-checklist .radios-container {
    min-width: 350px;
}

.attach-checklist .form-group {
    margin: 0 !important;
}
.attach-checklist .custom-checkbox .custom-control-label,
.custom-radio .custom-control-label {
    font-size: 16px !important;
    font-weight: 600;
}

.attach-checklist {
    .task-card {
        cursor: pointer;
    }
    .sub-heading {
        border: none;
        border-bottom: 1px solid gray;
        background: transparent;
        height: 40px;
        font-size: x-large;
        margin-top: 5px;
    }
    .sub-heading:focus-visible {
        border: none;
        border-bottom: 1px solid #0096fd;
        outline: none;
    }
    .add-attachment {
        margin-left: 4px;
    }
    .attachment-label {
        cursor: not-allowed !important;
        font-size: medium;
        margin-top: 5px;
    }
    .attachment {
        height: 15px;
        fill: gray;
    }
    .name-label {
        font-weight: bolder;
        font-size: x-large;
    }
    .name-input {
        height: 60px;
        font-size: xx-large;
        font-weight: bolder;
        background: transparent;
        border: 1px solid gainsboro;
    }
    .enter-name {
        width: 80%;
    }
    .add-header {
        margin-left: 0px;
    }
    .svg-icon {
        background: #0096fd;
        padding: 10px;
        fill: white;
        border-radius: 5px;
        max-width: 60px;
        min-width: 50px;
    }
    .task-icon {
        padding: 20px;
        color: white;
        border-radius: 5px;
        max-width: 60px;
        min-width: 50px;
        font-size: x-large;
    }
    .steps-div {
        min-height: 120px;
        padding-top: 20px;
    }
    .discription-input {
        width: 75%;
        border-radius: 5px;
        height: 40px;
    }
    .step-select {
        width: 15%;
        height: 40px;
        border-radius: 5px;
    }
    .custom-switch {
        margin-left: 18px;
        margin-top: 12px;
        cursor: not-allowed !important;
    }
    .task-icon {
        font-size: x-large;
    }
    .temp {
        border: 1px solid;
        padding: 3px;
        margin-left: 10px;
        cursor: pointer;
    }
    .temp-button {
        background-color: transparent;
        color: black;
        cursor: not-allowed !important;
    }
    input[type="radio"].btn-check:checked + label.btn.temp-button {
        background-color: #eff2ff;
    }
    .section-btn {
        background-color: transparent !important;
        color: #0096fd !important;
        border: 1px solid #0096fd !important;
    }
    .drag-handle {
        cursor: grabbing;
    }
    .uploaded-image {
        height: 300px;
        width: 300px;
        border-radius: 5px;
        border: 1px solid #f4f4f4;
    }
    .dlt-img {
        right: 5px;
        top: 5px;
        color: white;
        cursor: pointer;
        font-weight: 900;
        color: red;
    }
    .dlt-img:hover {
        font-size: larger;
        color: red;
    }
    .name-input::placeholder {
        font-weight: 400;
        opacity: 0.5;
    }
    /* Style the menu */
    .menu {
        position: absolute;
        top: 260px;
        left: 130px;
        background-color: white;
        border: 1px solid #ccc;
        padding: 10px;
        z-index: 999;
        max-width: 600px;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        border-radius: 5px;
    }
    .menu ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }
    .menu li {
        padding: 5px 0;
        cursor: pointer;
    }
    .menu li:hover {
        background-color: #f0f0f0;
    }
    .bi-pencil {
        right: -5px;
        bottom: 0;
        background: white;
        height: 30px;
        width: 30px;
        border: 1px solid gray;
        padding: px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
    }
    .title-icon {
        height: 100% !important;
        width: 100% !important;
        max-width: 100%;
        position: absolute;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 40px;
        color: white;
    }
    .alphabet-grid {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .alphabet-grid .item {
        width: calc(16.666% - 20px);
        margin-bottom: 20px;
        text-align: center;
        padding: 2px;
        border-radius: 5px;
    }
    .alphabet-grid .item:hover {
        color: brown;
    }
    .circle {
        height: 30px;
        width: 30px;
        border-radius: 20px;
    }
    @media (max-width: 617px) {
        .add-header {
            flex-direction: column;
            justify-content: start;
            align-items: start !important;
        }
        .enter-name {
            margin-left: 0px !important;
        }
        .menu {
            max-width: 300px;
            top: 220px;
        }
    }
}
</style>
