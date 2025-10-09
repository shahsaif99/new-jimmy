import * as yup from "yup";

const customerSupplierSchema = yup.object().shape({
    type: yup.string().required("Type is required"),
    name: yup.string().required("Name is required"),
    address: yup.string().required("Address is required"),
    postal_code: yup.string().nullable(),
    place: yup.string().nullable(),
    contact_person: yup.string().nullable(),
    email: yup.string().email("Invalid email format").nullable(),
    telephone_number: yup.string().nullable(),
    website: yup.string().url("Invalid URL").nullable(),
    customer_manager_id: yup.number().required("Customer manager is required"),
    organization_number: yup.string().nullable(),
    status: yup.string().nullable(),
    management_systems: yup.array().nullable(),
    supplier_of: yup.array().nullable(),
    total_evaluation: yup.string().nullable(),
    supplier_evaluation: yup.array().of(yup.object({})).nullable(),
});

export default customerSupplierSchema;
