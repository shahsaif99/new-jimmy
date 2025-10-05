import * as yup from "yup";

const taskSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().nullable(),
    status: yup.string().nullable(),
    checklist_id: yup.number(),
    category_id: yup.string().required("Category ID is required"),
    priority: yup.string().required("Priority is required"),
    work_location: yup.string().nullable(),
    due_date: yup.date().nullable(),
    img: yup.string().nullable(),
    user_ids: yup.array().of(yup.number().integer()).nullable(),
});

export default taskSchema;