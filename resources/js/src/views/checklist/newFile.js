import { onMounted, reactive, ref } from "@vue/composition-api";

export default (await import('vue')).default.extend({
setup() {
const checklist = reactive({
name: "",
titleImg: null,
subName: "",
tasks: [],
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
task: "",
img: "",
});
const taskType = ref([
{ name: "Procedure", val: 1 },
{ name: "Procedure", val: 2 },
{ name: "Procedure", val: 3 },
{ name: "Procedure", val: 4 },
{ name: "Procedure", val: 5 },
{ name: "Procedure", val: 6 },
{ name: "Procedure", val: 7 },
]);

onMounted(() => { });
const handleImage = (event, data) => {
checklist.titleImg = event.target.files;
};
const addTasks = (type) => {
console.log(type, "type");
taskList.type = type;
console.log(taskList, "task list");
checklist.tasks.push(taskList);
console.log(checklist);
};

return { checklist, handleImage, tasks, addTasks };
},
});
