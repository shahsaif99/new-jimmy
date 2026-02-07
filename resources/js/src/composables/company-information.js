import axios from "@axios";
import { ref, reactive } from "@vue/composition-api";
import route from "ziggy-js";
import toaster from "./toaster";

export default function useCompanyInformation() {
    const busy = ref(false);
    const companyInfo = ref(null);
    const errors = ref({});
    const toast = toaster();

    const getCompanyInfo = async () => {
        try {
            busy.value = true;
            const response = await axios.get(route("company-information.show"));
            companyInfo.value = response.data.data;
        } catch (error) {
            if (error.message === "Network Error") {
                toast.error(error.message);
            } else {
                toast.error(error.response?.data?.message || "Failed to load company information.");
            }
        } finally {
            busy.value = false;
        }
    };

    const updateCompanyInfo = async (data) => {
        errors.value = {};
        try {
            busy.value = true;
            const response = await axios.post(route("company-information.update"), data);
            companyInfo.value = response.data.data;
            toast.success(response.data.message);
            return response;
        } catch (error) {
            if (error.message === "Network Error") {
                toast.error(error.message);
            } else {
                if (error.response?.status === 422) {
                    errors.value = error.response.data.errors;
                }
                toast.error(error.response?.data?.message || "Failed to update company information.");
            }
        } finally {
            busy.value = false;
        }
    };

    const uploadLogo = async (data) => {
        try {
            busy.value = true;
            const response = await axios.post(route("company-information.upload-logo"), data);
            companyInfo.value = response.data.data;
            toast.success(response.data.message);
            return response;
        } catch (error) {
            if (error.message === "Network Error") {
                toast.error(error.message);
            } else {
                toast.error(error.response?.data?.message || "Failed to upload logo.");
            }
        } finally {
            busy.value = false;
        }
    };

    const uploadDocuments = async (data) => {
        try {
            busy.value = true;
            const response = await axios.post(route("company-information.upload-documents"), data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success(response.data.message);
            return response;
        } catch (error) {
            if (error.message === "Network Error") {
                toast.error(error.message);
            } else {
                toast.error(error.response?.data?.message || "Failed to upload documents.");
            }
        } finally {
            busy.value = false;
        }
    };

    const deleteDocument = async (id) => {
        try {
            busy.value = true;
            const response = await axios.delete(route("company-information.delete-document", id));
            toast.success(response.data.message);
            return response;
        } catch (error) {
            if (error.message === "Network Error") {
                toast.error(error.message);
            } else {
                toast.error(error.response?.data?.message || "Failed to delete document.");
            }
        } finally {
            busy.value = false;
        }
    };

    return {
        busy,
        errors,
        companyInfo,
        getCompanyInfo,
        updateCompanyInfo,
        uploadLogo,
        uploadDocuments,
        deleteDocument,
    };
}
