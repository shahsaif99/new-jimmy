import * as yup from "yup";

const projectSchema = yup.object().shape({
    name: yup.string().required("Project name is required").max(255, "Project name is too long"),
    status: yup.string().required("Project status is required"),
    customer_id: yup.number().integer().required(),
    project_no: yup.number().nullable(),
    start_date: yup.date().required("Start date is required"),
    end_date: yup.date().nullable("End date is required")
        .min(yup.ref("start_date"), "End date cannot be before start date"),
    project_manager_id: yup.number().integer().required(),
    project_hse_manager_id: yup.number().integer().nullable(),
});

export default projectSchema;