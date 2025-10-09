<template>
    <div>
        <div
            v-if="loading"
            class="d-flex justify-content-center align-items-center"
            style="height: 100vh; font-size: larger; font-weight: bolder"
        >
            creating...
        </div>
        <form @submit.prevent="saveData" v-else>
            <div class="row align-items-center add-header">
                <div style="height: 90px; width: 90px; position: relative">
                    <i
                        :class="checklist.icon"
                        class="svg-icon title-icon"
                        :style="`background-color:${checklist.color}`"
                        style="
                            height: 100% !important;
                            width: 100% !important;
                            max-width: 100%;
                        "
                    ></i>
                    <i
                        class="bi bi-pencil position-absolute"
                        @click="toggleMenu"
                    ></i>
                </div>
                <div v-if="isMenuOpen" class="menu">
                    <p style="font-size: large; font-weight: 600">
                        Checklist icon
                    </p>
                    <p>Select icon</p>
                    <div class="alphabet-grid">
                        <i
                            v-for="(icon, index) in icons"
                            :key="index"
                            :class="icon"
                            @click="checklist.icon = icon"
                            class="item"
                            :style="
                                checklist.icon === icon
                                    ? 'border:1px solid brown; color:brown'
                                    : ''
                            "
                        ></i>
                    </div>
                    <p>Select color</p>
                    <div
                        class="d-flex justify-content-between ml-2 mr-2 flex-wrap"
                    >
                        <div
                            v-for="(col, index) in color"
                            :key="index"
                            @click="checklist.color = col"
                            style="padding: 10px; border-radius: 5px"
                            :style="
                                checklist.color === col
                                    ? `border:2px solid ${col}`
                                    : ''
                            "
                        >
                            <div
                                class="circle"
                                :style="`background-color:${col}`"
                            ></div>
                        </div>
                    </div>
                </div>
                <div class="d-flex flex-column ml-2 enter-name">
                    <label class="name-label">Checklist Name</label>
                    <input
                        class="name-input check-input"
                        v-model="checklist.name"
                        type="text"
                        placeholder="Enter your checklist name"
                        required
                    />

                    <label
                        v-if="!checklist.title_img"
                        class="attachment-label"
                        for="header-img"
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
                        <input
                            id="header-img"
                            class="d-none"
                            type="file"
                            accept="image/*"
                            @change="handleImage($event, 'header')"
                        />
                    </label>
                </div>
                <div
                    v-if="checklist.title_img"
                    class="position-relative mt-1"
                    style="margin-left: 70px; max-width: 300px"
                >
                    <img :src="checklist.title_img" class="uploaded-image" />
                    <i
                        class="bi bi-x-lg position-absolute dlt-img"
                        @click="checklist.title_img = ''"
                    ></i>
                </div>
            </div>
            <div v-for="(section, index) in checklist.sections" :key="index">
                <div class="position-relative">
                    <input
                        class="w-100 sub-heading my-1 check-input"
                        type="text"
                        v-model="section.name"
                        placeholder="Enter section title"
                        required
                    />
                    <i
                        @click="checklist.sections.splice(index, 1)"
                        class="bi bi-trash ml-1 task-icon text-danger position-absolute"
                        style="right: 10px"
                    ></i>
                </div>
                <template v-if="!checklist.sections[0].tasks.length">
                    <div class="mt-3">
                        <h2>Select step to begin</h2>
                        <div
                            class="container add-checklist row justify-content-between"
                        >
                            <div
                                v-for="(task, index) in tasks"
                                :key="index"
                                class="card create-checklist col-md-5 task-card"
                                @click="selectTask(task.type)"
                            >
                                <div class="row g-0">
                                    <div
                                        class="col-1 d-flex justify-content-center align-items-center ml-1"
                                    >
                                        <i
                                            :class="task.icon"
                                            :style="{ background: task.color }"
                                            class="task-icon d-flex align-items-center justify-content-center"
                                        ></i>
                                    </div>
                                    <div class="col-10">
                                        <div class="card-body">
                                            <h5 class="card-title">
                                                {{ task.type }}
                                            </h5>
                                            <p class="card-text">
                                                {{ task.disc }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <draggable
                        v-model="section.tasks"
                        :options="{ handle: '.drag-handle' }"
                        group="people"
                        @start="drag = true"
                        @end="drag = false"
                    >
                        <div
                            v-for="(task, taskIndex) in section.tasks"
                            :key="taskIndex"
                            class="w-100 card steps mt-1 d-flex steps-div"
                        >
                            <div class="d-flex align-items-center">
                                <i
                                    class="bi bi-grip-vertical ml-1 task-icon text-dark drag-handle"
                                ></i
                                ><input
                                    class="discription-input ml-1"
                                    placeholder="Enter discription  "
                                    v-model="task.name"
                                    required
                                />
                                <select
                                    v-model="task.type"
                                    class="step-select ml-1"
                                    @change="selectedTask(index, taskIndex)"
                                >
                                    <option
                                        v-for="(task, index) in taskType"
                                        :key="index"
                                    >
                                        {{ task.name }}
                                    </option>
                                </select>
                                <i
                                    @click="section.tasks.splice(taskIndex, 1)"
                                    class="bi bi-trash ml-1 task-icon text-danger"
                                ></i>
                            </div>
                            <div
                                v-if="task.type === 'Temperature'"
                                class="d-flex"
                                style="margin-left: 80px"
                            >
                                <label
                                    class="btn temp-button"
                                    style="color: #7367f0"
                                    :style="
                                        task.param === 'F'
                                            ? 'background-color: #eff2ff;'
                                            : ''
                                    "
                                    >°F (Fehrenheit)
                                    <input
                                        value="F"
                                        type="radio"
                                        class="btn-check d-none"
                                        v-model="task.param"
                                        autocomplete="off"
                                        checked
                                    />
                                </label>

                                <label
                                    class="btn temp-button text-danger"
                                    :style="
                                        task.param === 'C'
                                            ? 'background-color: #eff2ff;'
                                            : ''
                                    "
                                    >°C
                                    <input
                                        type="radio"
                                        value="C"
                                        class="btn-check d-none"
                                        v-model="task.param"
                                        autocomplete="off"
                                    />
                                </label>

                                <label
                                    class="btn temp-button text-primary"
                                    :style="
                                        task.param === 'K'
                                            ? 'background-color: #eff2ff;'
                                            : ''
                                    "
                                    >K
                                    <input
                                        type="radio"
                                        value="K"
                                        class="btn-check d-none"
                                        v-model="task.param"
                                        autocomplete="off"
                                    />
                                </label>
                            </div>
                            <div
                                v-if="task.type === 'Cost'"
                                class="d-flex"
                                style="margin-left: 80px"
                            >
                                <label
                                    class="btn temp-button"
                                    :style="
                                        task.param === '$'
                                            ? 'background-color: #eff2ff;'
                                            : ''
                                    "
                                    style="color: #7367f0"
                                    >$ USD
                                    <input
                                        value="$"
                                        type="radio"
                                        class="btn-check d-none"
                                        v-model="task.param"
                                        autocomplete="off"
                                        checked
                                /></label>

                                <label
                                    class="btn temp-button text-danger"
                                    :style="
                                        task.param === '€'
                                            ? 'background-color: #eff2ff!important;'
                                            : ''
                                    "
                                    >€ EURO
                                    <input
                                        type="radio"
                                        value="€"
                                        class="btn-check d-none"
                                        v-model="task.param"
                                        autocomplete="off"
                                /></label>
                            </div>
                            <div class="d-flex align-items-center">
                                <div class="custom-control custom-switch">
                                    <input
                                        type="checkbox"
                                        class="custom-control-input"
                                        :id="'task_' + index + '_' + taskIndex"
                                        v-model="task.is_img_required"
                                        :disabled="task.type === 'Take Photo'"
                                    />
                                    <label
                                        class="custom-control-label attachment-label"
                                        :for="'task_' + index + '_' + taskIndex"
                                        >Required image</label
                                    >
                                </div>
                                <label
                                    v-if="!task.img"
                                    class="attachment-label ml-1"
                                    ><svg
                                        class="attachment"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                    >
                                        <path
                                            d="M364.2 83.8c-24.4-24.4-64-24.4-88.4 0l-184 184c-42.1 42.1-42.1 110.3 0 152.4s110.3 42.1 152.4 0l152-152c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-152 152c-64 64-167.6 64-231.6 0s-64-167.6 0-231.6l184-184c46.3-46.3 121.3-46.3 167.6 0s46.3 121.3 0 167.6l-176 176c-28.6 28.6-75 28.6-103.6 0s-28.6-75 0-103.6l144-144c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-144 144c-6.7 6.7-6.7 17.7 0 24.4s17.7 6.7 24.4 0l176-176c24.4-24.4 24.4-64 0-88.4z"
                                        />
                                    </svg>
                                    <span class="add-attachment"
                                        >Add Attachement
                                    </span>
                                    <input
                                        class="d-none"
                                        type="file"
                                        accept="image/*"
                                        @change="
                                            handleImage(
                                                $event,
                                                'task',
                                                index,
                                                taskIndex
                                            )
                                        "
                                    />
                                </label>
                            </div>
                            <div
                                v-if="task.img"
                                class="position-relative my-1"
                                style="margin-left: 75px; max-width: 300px"
                            >
                                <img :src="task.img" class="uploaded-image" />
                                <i
                                    class="bi bi-x-lg position-absolute dlt-img"
                                    @click="task.img = ''"
                                ></i>
                            </div>
                        </div>
                    </draggable>

                    <div class="d-flex ml-1">
                        <button
                            class="btn btn-primary d-flex align-items-center"
                            @click="addTask(index)"
                        >
                            <i
                                class="bi bi-plus mr-1"
                                style="font-size: x-large"
                            ></i>
                            Add Task
                        </button>
                    </div>
                </template>
            </div>
            <div class="d-flex mt-3" v-if="checklist.sections[0].tasks.length">
                <button
                    class="btn btn-primary d-flex align-items-center ml-1 section-btn"
                    @click="addSection"
                    :disabled="apiHelpers.loading"
                >
                    <div
                        v-if="apiHelpers.loading"
                        class="spinner-border text-light"
                        role="status"
                    >
                        <span class="sr-only">Loading...</span>
                    </div>
                    <i
                        class="bi bi-file-text mr-1"
                        style="font-size: x-large"
                    ></i>
                    Add section
                </button>
                <button
                    class="btn btn-primary d-flex align-items-center ml-2"
                    type="submit"
                    :disabled="apiHelpers.loading"
                >
                    <div
                        v-if="apiHelpers.loading"
                        class="spinner-border text-light"
                        role="status"
                    >
                        <span class="sr-only">Loading...</span>
                    </div>
                    <i
                        class="bi bi-check2-circle mr-1"
                        style="font-size: x-large"
                    ></i>
                    Save
                </button>
            </div>
        </form>
    </div>
</template>
<script>
import {
    onMounted,
    reactive,
    ref,
    watch,
    onBeforeMount,
} from "@vue/composition-api";
import axios from "@axios";
import draggable from "vuedraggable";
import router from "@/router";
import route from "ziggy-js";
import toaster from "@/composables/toaster";
import useTasks from "@/composables/tasks";

export default {
    components: {
        draggable,
    },
    setup() {
        // State to keep track of menu visibility
        const isMenuOpen = ref(false);
        // Text that appears in the menu
        const text = ref("Click me");
        const loading = ref(false);
        const toast = toaster();
        const { apiHelpers } = useTasks();

        // Function to toggle menu visibility
        const toggleMenu = () => {
            isMenuOpen.value = !isMenuOpen.value;
        };
        const color = [
            "#A391D8",
            "#D68963",
            "#D3AC66",
            "#D57469",
            "#6D99D3",
            "#65A09C",
        ];
        const icons = [
            "bi bi-house",
            "bi bi-person",
            "bi bi-person-workspace",
            "bi bi-search",
            "bi bi-pc",
            "bi bi-android2",
            "bi bi-activity",
            "bi bi-airplane",
            "bi bi-arrow-left-right",
            "bi bi-balloon-heart-fill",
            "bi bi-currency-exchange",
            "bi bi-bookmark-check-fill",
            "bi bi-cart-fill",
            "bi bi-arrow-counterclockwise",
            "bi bi-currency-dollar",
            "bi bi-lock",
            "bi bi-unlock",
            "bi bi-arrow-clockwise",
            "bi bi-arrow-up",
            "bi bi-arrow-down",
            "bi bi-arrow-left",
            "bi bi-arrow-right",
            "bi bi-check",
            "bi bi-x",
            "bi bi-plus",
            "bi bi-dash",
            "bi bi-list",
            "bi bi-three-dots-vertical",
        ];

        const checklist = ref({
            name: "",
            title_img: null,
            icon: "bi bi-list-check",
            color: "#0096fd",
            sections: [{ name: "", tasks: [] }],
        });
        const tasks = ref([
            {
                type: "Procedure",
                disc: "Short step-by-step punch list items, great for to-do lists",
                icon: "bi bi-check2-circle",
                color: "#3E9647",
            },
            {
                type: "Pass/Fail",
                disc: "Pass or fail items to faclitate inspections & audits",
                icon: "bi bi-check2-square",
                color: "#0094F9",
            },
            {
                type: "Take Photo",
                disc: "Capture an image for a step",
                icon: "bi bi-camera",
                color: "#F67229",
            },
            {
                type: "Text Answer",
                disc: "Prompt team members to respond to a step with text",
                icon: "bi bi-chat-left-dots",
                color: "#587080",
            },
            {
                type: "Number Answer",
                disc: "Prompt team members to respond to a step with a number value and units",
                icon: "bi bi-hash",
                color: "#727BF3",
            },
            {
                type: "Temperature",
                disc: "Prompt team members to respond to a step with a temperature (°F, °C , or °K)",
                icon: "bi bi-thermometer",
                color: "#F16282",
            },
            {
                type: "Cost",
                disc: "Prompt team members to respond to a step with a dollar amount ($ USD € Euro)",
                icon: "bi bi-currency-dollar",
                color: "#DD9D1D",
            },
        ]);
        const taskList = reactive({
            type: "",
            name: "",
            img: "",
            param: "",
            is_img_required: false,
        });
        const taskType = ref([
            { name: "Procedure" },
            { name: "Pass/Fail" },
            { name: "Take Photo" },
            { name: "Text Answer" },
            { name: "Number Answer" },
            { name: "Temperature" },
            { name: "Cost" },
        ]);

        onBeforeMount(async () => {
            try {
                loading.value = true;
                if (router.currentRoute.params.param) {
                    const response = await axios.get(
                        route(
                            "checklist.show",
                            router.currentRoute.params.param
                        )
                    );
                    if (response.status === 200) {
                        checklist.value = response.data;
                    }
                }
            } catch (error) {
                console.error(
                    "An error occurred while fetching checklist data:",
                    error
                );
            } finally {
                loading.value = false;
            }
        });
        const isValid = () => {
            if (checklist.name.length < 0) {
                return false;
            }
        };
        const handleImage = (event, data, index, taskIndex) => {
            if (data === "header") {
                checklist.value.title_img = event.target.files[0];
                const reader = new FileReader();
                reader.onload = () => {
                    checklist.value.title_img = reader.result;
                };
                reader.readAsDataURL(checklist.value.title_img);
            } else {
                checklist.value.sections[index].tasks[taskIndex].img =
                    event.target.files[0];
                const reader = new FileReader();
                reader.onload = () => {
                    checklist.value.sections[index].tasks[taskIndex].img =
                        reader.result;
                };
                reader.readAsDataURL(
                    checklist.value.sections[index].tasks[taskIndex].img
                );
            }
        };
        const selectTask = (type) => {
            taskList.type = type;
            if (type === "Temperature") taskList.param = "F";
            if (type === "Take Photo") taskList.is_img_required = true;
            if (type === "Cost") taskList.param = "$";
            checklist.value.sections[0].tasks.push(taskList);
        };
        const selectedTask = (index, taskIndex) => {
            if (
                checklist.value.sections[index].tasks[taskIndex].type ===
                "Temperature"
            ) {
                checklist.value.sections[index].tasks[taskIndex].param = "F";
                checklist.value.sections[index].tasks[
                    taskIndex
                ].is_img_required = false;
            } else if (
                checklist.value.sections[index].tasks[taskIndex].type ===
                "Take Photo"
            ) {
                checklist.value.sections[index].tasks[
                    taskIndex
                ].is_img_required = true;
                checklist.value.sections[index].tasks[taskIndex].param = "";
            } else if (
                checklist.value.sections[index].tasks[taskIndex].type === "Cost"
            ) {
                checklist.value.sections[index].tasks[taskIndex].param = "$";
                checklist.value.sections[index].tasks[
                    taskIndex
                ].is_img_required = false;
            } else {
                checklist.value.sections[index].tasks[taskIndex].param = "";
                checklist.value.sections[index].tasks[
                    taskIndex
                ].is_img_required = false;
            }
        };
        const addTask = (index) => {
            const taskList = {
                type: "Procedure",
                name: "",
                img: "",
                param: "",
                is_img_required: false,
            };
            checklist.value.sections[index].tasks.push(taskList);
        };
        const addSection = () => {
            const section = {
                name: "",
                tasks: [],
            };
            checklist.value.sections.push(section);
        };

        const saveData = async () => {
            try {
                loading.value = true;
                if (router.currentRoute.params.param) {
                    let newData = {
                        name: checklist.value.name,
                        color: checklist.value.color,
                        icon: checklist.value.icon,
                        title_img: checklist.value.title_img,
                        sections: checklist.value.sections,
                    };
                    const res = await axios.put(
                        route(
                            "checklist.update",
                            router.currentRoute.params.param
                        ),
                        newData
                    );
                    if (res.status === 200) {
                        router.back();
                    }
                    toast.success(res.data.message);
                }
                if (!router.currentRoute.params.param) {
                    const res = await axios.post(
                        route("checklist.store"),
                        checklist.value
                    );
                    if (res.status === 201) {
                        toast.success(res.data.message);
                        router.back();
                    }
                }
            } catch (error) {
                toast.error(error);
            } finally {
                loading.value = false;
            }
        };
        watch(checklist, async (newValue) => {
            if (newValue) {
                await convertImagesToBase64(newValue);
            }
        });

        async function convertImagesToBase64(param) {
            if (param.title_img) {
                try {
                    const response = await axios.get(param.title_img, {
                        responseType: "arraybuffer",
                    });
                    const base64TitleImage = Buffer.from(
                        response.data,
                        "binary"
                    ).toString("base64");
                    param.title_img = `data:image/png;base64,${base64TitleImage}`;
                } catch (error) {
                    console.error(
                        "Error converting title image to base64:",
                        error
                    );
                }
            }
            for (const section of param.sections) {
                for (const task of section.tasks) {
                    if (task.img) {
                        try {
                            const response = await axios.get(task.img, {
                                responseType: "arraybuffer",
                            });
                            const base64Image = Buffer.from(
                                response.data,
                                "binary"
                            ).toString("base64");
                            task.img = `data:image/png;base64,${base64Image}`;
                        } catch (error) {
                            console.error(
                                "Error converting image to base64:",
                                error
                            );
                        }
                    }
                }
            }
        }

        return {
            checklist,
            handleImage,
            tasks,
            addTask,
            taskType,
            selectedTask,
            selectTask,
            addSection,
            text,
            isMenuOpen,
            toggleMenu,
            icons,
            color,
            saveData,
            loading,
            isValid,
            apiHelpers,
        };
    },
};
</script>
<style scoped>
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
