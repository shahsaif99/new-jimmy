<template>
    <div class="mt-2" style="max-width: 1200px" v-if="task.data && task.data.checklist">
        <b-card>
            <b-overlay
                id="overlay-background"
                variant="transparent"
                rounded="sm"
            >
                <div>
                    <div style="gap: 20px; align-items: center" class="d-flex">
                        <div
                            style="
                                height: 50px;
                                width: 50px;
                                position: relative;
                             
                            "
                            class="mt-1"
                        >
                            <i
                                :class="task.data.checklist.icon"
                                :style="{
                                    background: task.data.checklist.color,
                                }"
                                class="bi svg-icon title-icon"
                                style="
                                    height: 100% !important;
                                    width: 100% !important;
                                "
                            ></i>
                        </div>
                        <h1>{{ task.data.title }}</h1>
                    </div>

                    <div class="d-flex justify-content-between py-2">
                        <span>
                            {{ completedTask }} of
                            {{ totalTask }}
                            items
                        </span>
                        <span>
                            {{ Math.round(completionPercentage) }}% completed
                        </span>
                    </div>

                    <b-progress :max="totalTask" height="1.5rem">
                        <b-progress-bar :value="completedTask">
                            <span
                                >Progress:
                                <strong
                                    >{{ completedTask }} /
                                    {{ totalTask }}</strong
                                ></span
                            >
                        </b-progress-bar>
                    </b-progress>
                </div>
            </b-overlay>
        </b-card>

        <div class="sections mt-4">
            <div
                v-for="(section, index) in task.data.checklist.sections"
                :key="index"
            >
                <b-card>
                    <b-overlay
                        id="overlay-background"
                        variant="transparent"
                        rounded="sm"
                    >
                        <div class="position-relative">
                            <div class="">
                                <h2 style="font-size: 28px; font-weight: 600">
                                    {{ section.name }}
                                </h2>
                            </div>

                            <div
                                v-if="Object.values(body.answers).length > 0"
                                class="mt-3"
                            >
                                <div
                                    v-for="(item, index) in section.tasks"
                                    :key="index"
                                >
                                    <div style="gap: 10px" class="d-flex">
                                        <span
                                            style="
                                                font-size: 20px;
                                                font-weight: 500;
                                            "
                                        >
                                            {{ index + 1 }} ) {{ item.name }}
                                        </span>

                                        <div v-if="item.type === 'Temperature'">
                                            <span
                                                v-if="item.param === 'F'"
                                                class="btn temp-button"
                                                style="color: #7367f0"
                                                :style="
                                                    item.param === 'F'
                                                        ? 'background-color: #eff2ff;'
                                                        : ''
                                                "
                                            >
                                                °F (Fehrenheit)
                                            </span>
                                            <span
                                                v-if="item.param === 'C'"
                                                class="btn temp-button text-danger"
                                                :style="
                                                    task.param === 'C'
                                                        ? 'background-color: #eff2ff;'
                                                        : ''
                                                "
                                            >
                                                °C
                                            </span>
                                            <span
                                                v-if="item.param === 'K'"
                                                class="btn temp-button text-primary"
                                                :style="
                                                    task.param === 'K'
                                                        ? 'background-color: #eff2ff;'
                                                        : ''
                                                "
                                            >
                                                K
                                            </span>
                                        </div>
                                        <div v-if="item.type === 'Cost'">
                                            <span
                                                v-if="item.param === '$'"
                                                :style="
                                                    task.param === '$'
                                                        ? 'background-color: #eff2ff;'
                                                        : ''
                                                "
                                                class="btn temp-button"
                                            >
                                                $ USD
                                            </span>
                                            <span
                                                v-if="item.param === '€'"
                                                :style="
                                                    task.param === '€'
                                                        ? 'background-color: #eff2ff;'
                                                        : ''
                                                "
                                                class="btn temp-button text-danger"
                                            >
                                                € EURO
                                            </span>
                                        </div>
                                    </div>

                                    <div class="mt-2" v-if="item.img">
                                        <img
                                            width="250"
                                            height="250"
                                            :src="item.img"
                                            alt=""
                                        />
                                    </div>

                                    <textarea
                                        v-if="
                                            item.type === 'Procedure' ||
                                            item.type === 'Text Answer'
                                        "
                                        class="w-100 sub-heading my-1 check-input"
                                        type="text"
                                        :placeholder="
                                            userData.role !== 'Admin'
                                                ? 'Please enter your answer'
                                                : 'Employee responses will be displayed here.'
                                        "
                                        style="min-height: 150px"
                                        v-model="body.answers[item.id].answer"
                                        :disabled="
                                            item.answer ||
                                            userData.role === 'Admin'
                                                ? true
                                                : false
                                        "
                                    />

                                    <input
                                        v-if="
                                            item.type === 'Temperature' ||
                                            item.type === 'Number Answer' ||
                                            item.type === 'Cost'
                                        "
                                        class="w-100 sub-heading my-1 check-input"
                                        type="number"
                                        :placeholder="userData.role !== 'Admin'? 'Please enter your answer' : 'Employee responses will be displayed here.'"
                                        v-model="body.answers[item.id].answer"
                                        :disabled="
                                            item.answer ||
                                            userData.role === 'Admin'
                                                ? true
                                                : false
                                        "
                                    />

                                    <b-form-group
                                        v-if="item.type === 'Pass/Fail'"
                                        v-slot="{ ariaDescribedby }"
                                        class="my-1"
                                    >
                                        <b-form-radio-group
                                            :options="passFailoptions"
                                            :aria-describedby="ariaDescribedby"
                                            name="radios-btn-default"
                                            buttons
                                            button-variant="outline-primary"
                                            v-model="
                                                body.answers[item.id].answer
                                            "
                                            :class="
                                                item.answer ||
                                                userData.role === 'Admin'
                                                    ? 'pointer-events-none'
                                                    : ''
                                            "
                                        ></b-form-radio-group>
                                    </b-form-group>

                                    <label
                                        v-if="
                                            (userData.role !== 'Admin' &&
                                                item.type === 'Take Photo' &&
                                                !item.answer) ||
                                            (userData.role !== 'Admin' &&
                                                item.is_img_required &&
                                                !item.answer)
                                        "
                                        :for="`take-photo${item.id}`"
                                        class="position-relative add-item d-flex align-items-center justify-content-center mt-1 mb-2"
                                        style="
                                            border: 3px dotted skyblue !important;
                                            padding-left: 5px;
                                            padding-right: 5px;
                                            padding-top: 10px;
                                            padding-bottom: 10px;
                                            background: #edeffe;
                                            max-width: 400px;
                                            cursor: pointer;
                                        "
                                    >
                                        <i
                                            class="bi bi-cloud-arrow-up"
                                            style="
                                                font-size: x-large;
                                                color: #5453ad;
                                            "
                                        ></i>
                                        <h3
                                            class="mb-0 mx-1"
                                            style="
                                                font-size: large;
                                                color: #5453ad;
                                            "
                                        >
                                            Click here to Upload Images
                                        </h3>
                                    </label>

                                    <input
                                        v-if="
                                            item.type === 'Take Photo' ||
                                            item.is_img_required
                                        "
                                        type="file"
                                        :id="`take-photo${item.id}`"
                                        accept="image/*"
                                        class="d-none"
                                        @change="handleFile($event, item.id)"
                                    />

                                    <div
                                        v-if="
                                            body.answers[item.id].img ||
                                            (item.answer && item.answer.img)
                                        "
                                        class="row mb-3"
                                    >
                                        <div
                                            class="col-sm-3 mt-1 position-relative img-div p-0 mx-1"
                                        >
                                            <img
                                                :src="
                                                    item.answer &&
                                                    item.answer.img
                                                        ? item.answer.img
                                                        : urlImageConverter.createObjectURL(
                                                              body.answers[
                                                                  item.id
                                                              ].img
                                                          )
                                                "
                                                class="w-100 h-100 assign-img"
                                            />
                                            <i
                                                :style="{
                                                    'pointer-events: none;':
                                                        item.answer,
                                                }"
                                                class="bi bi-x-lg position-absolute dlt-img"
                                                @click="
                                                    body.answers[item.id].img =
                                                        null
                                                "
                                                v-if="
                                                    (item.type ===
                                                        'Take Photo' &&
                                                        !item.answer) ||
                                                    (item.is_img_required &&
                                                        !item.answer)
                                                "
                                            ></i>
                                        </div>
                                    </div>

                                    <div v-if="userData.role !== 'Admin'">
                                        <button
                                            :disabled="
                                                item.answer ||
                                                task.data.status ===
                                                    'completed' ||
                                                apiHelpers.loading
                                            "
                                            @click="submitAnswer(item)"
                                            class="btn btn-primary mb-4 d-flex align-items-center"
                                            style="gap: 5px"
                                            v-if="
                                                isLastTaskRemaining &&
                                                !item.answer
                                            "
                                        >
                                            <div
                                                v-if="apiHelpers.loading"
                                                class="spinner-border-sm spinner-border text-light"
                                                role="status"
                                            >
                                                <span class="sr-only"
                                                    >Loading...</span
                                                >
                                            </div>
                                            <div
                                                class="d-flex align-items-center"
                                            >
                                                Finish
                                            </div>
                                        </button>
                                        <button
                                            v-else
                                            :disabled="
                                                item.answer ||
                                                task.data.status ===
                                                    'completed' ||
                                                apiHelpers.loading
                                            "
                                            @click="submitAnswer(item)"
                                            class="btn btn-primary mb-4 d-flex"
                                            style="gap: 5px"
                                        >
                                            <div
                                                v-if="apiHelpers.loading"
                                                class="spinner-border-sm spinner-border text-light"
                                                role="status"
                                            >
                                                <span class="sr-only"
                                                    >Loading...</span
                                                >
                                            </div>
                                            <div
                                                class="d-flex align-items-center"
                                            >
                                                Submit
                                            </div>
                                        </button>
                                    </div>
                                    <div
                                        class="mb-2 border d-inline-flex rounded-sm"
                                        style="padding: 10px; font-size: 18px"
                                        v-if="
                                            item.answer &&
                                            item.answer.updated_at
                                        "
                                    >
                                        Submitted on : {{ item.answer.updated_at }}
                                    </div>

                                    <hr />
                                </div>
                            </div>
                        </div>
                    </b-overlay>
                </b-card>
            </div>
        </div>
    </div>
</template>

<script>
import useTasks from "@/composables/tasks";
import useUsers from "@/composables/users";
import useJwt from "@/auth/jwt/useJwt";
import {
    computed,
    onMounted,
    reactive,
    watch,
    ref,
} from "@vue/composition-api";
import {
    BOverlay,
    BAvatar,
    BLink,
    BMedia,
    BCard,
    BProgress,
    BProgressBar,
    BFormGroup,
    BFormRadioGroup,
} from "bootstrap-vue";
import { avatarText } from "@core/utils/filter";
import toaster from "../../../composables/toaster";

export default {
    components: {
        BOverlay,
        BAvatar,
        BLink,
        BMedia,
        BCard,
        BProgress,
        BProgressBar,
        BFormGroup,
        BFormRadioGroup,
    },
    setup(props, { emit, root }) {
        const { task, getTaskById, updateTaskStatus, taskAnswer, apiHelpers } =
            useTasks();
        const { resolveUserRoleVariant } = useUsers();
        const userData = JSON.parse(useJwt.getUserData());

        const urlImageConverter = URL;

        const statusIcons = {
            open: "bi-circle text-primary",
            completed: "bi-circle text-warning",
            "in progress": "bi-circle text-dark",
            "on hold": "bi-circle text-success",
        };
        const priorityIcons = {
            critical: "bi-thermometer-high text-danger",
            high: "bi-reception-4 text-warning",
            medium: "bi-reception-3 text-secondary",
            low: "bi-reception-2 text-info",
            none: "bi-reception-0 text-primary",
        };

        const passFailoptions = [
            { text: "Pass", value: "pass" },
            { text: "Fail", value: "fail" },
            { text: "N/A", value: "n/a" },
        ];

        const body = ref({
            answers: {},
        });

        onMounted(async () => {
            await getTaskById(root.$route.params.id);
            const data = {};
            task.data.checklist.sections.forEach((item) => {
                item.tasks.forEach((task) => {
                    data[`${task.id}`] = {
                        checklist_task_id: task.id,
                        answer: task.answer ? task.answer.answer : null,
                        img:
                            task.answer && task.answer.img
                                ? task.answer.answer
                                : null,
                        attachment:
                            task.answer && task.answer.attachment
                                ? task.answer.attachment
                                : null,
                    };
                });
            });
            body.value.answers = data;
        });

        const totalTask = computed(() => {
            if (!task.data) return 0;
            return task.data.checklist.sections.reduce(
                (total, section) => total + section.tasks.length,
                0
            );
        });

        const completedTask = computed(() => {
            if (!task.data) return 0;
            return task.data.checklist.sections.reduce(
                (total, section) =>
                    total +
                    section.tasks.reduce(
                        (sectionTotal, task) =>
                            sectionTotal + (task.answer !== null ? 1 : 0),
                        0
                    ),
                0
            );
        });

        const completionPercentage = computed(() => {
            if (totalTask.value === 0) return 0;
            return (completedTask.value / totalTask.value) * 100;
        });

        const isLastTaskRemaining = computed(() => {
            return completedTask.value + 1 === totalTask.value ? true : false;
        });

        const submitAnswer = async (data) => {
            const answerItem = body.value.answers[data.id];

            if (data.is_img_required && !answerItem.img) {
                return toaster().error("Image required");
            }

            if (answerItem?.answer || answerItem?.img) {
                const formData = new FormData();
                formData.append("main_task_id", task.data.id);

                if (answerItem.img) {
                    formData.append("img", answerItem.img);
                }

                if (answerItem.attachment) {
                    formData.append("img", answerItem.attachment);
                }

                if (answerItem.checklist_task_id) {
                    formData.append(
                        "checklist_task_id",
                        answerItem.checklist_task_id
                    );
                }

                if (answerItem.answer) {
                    formData.append("answer", answerItem.answer);
                }

                try {
                    await taskAnswer(formData);
                    await getTaskById(root.$route.params.id);
                } catch (error) {
                    toaster().error(
                        "An error occurred while submitting the answer"
                    );
                }
            } else {
                toaster().error("Please fill the question");
            }
        };

        const handleFile = (event, id) => {
            body.value.answers[id].img = event.target.files[0];
            event.target.value = null;
        };

        return {
            task,
            avatarText,
            resolveUserRoleVariant,
            statusIcons,
            priorityIcons,
            updateTaskStatus,
            totalTask,
            passFailoptions,
            completedTask,
            completionPercentage,
            body,
            submitAnswer,
            handleFile,
            urlImageConverter,
            isLastTaskRemaining,
            apiHelpers,
            userData,
        };
    },
};
</script>
<style lang="scss" scoped>
span {
    padding: 0;
    margin: 0;
}

.list {
    display: flex;
    list-style: none;
    gap: 40px;
    margin-bottom: 15px;
    .label {
        font-size: medium;
        font-weight: 600;
        text-transform: capitalize;
        min-width: 200px;
    }
    .value {
        font-size: medium;

        text-transform: capitalize;
    }
}
ul {
    padding: 0;
    margin: 0;
}
</style>

<style scoped>
h1 {
    padding: 0px;
    margin: 0px;
}
.sections {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.task-card {
    cursor: pointer;
}
.sub-heading {
    border: 1px solid rgb(218, 211, 211);
    background: transparent;
    height: 40px;
    font-size: 16px;
    margin-top: 5px;
    text-indent: 10px;
    border-radius: 5px;
}
.sub-heading:focus-visible {
    border: 1px solid #0096fd;
    outline: none;
}
.add-attachment {
    margin-left: 4px;
}
.attachment-label {
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
    margin-left: 20px;
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
    margin-left: 90px;
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
}
.dlt-img {
    right: 5px;
    top: 5px;
    color: red;
    cursor: pointer;
    font-weight: 900;
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
    font-size: 20px;
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
</style>
<style lang="scss" scoped>
@import "~@core/scss/base/bootstrap-extended/include";
@import "~@core/scss/base/components/variables-dark";
.dark-layout {
    .bi-grip-vertical {
        color: white;
    }
    .check-input {
        color: white;
    }
}
</style>
