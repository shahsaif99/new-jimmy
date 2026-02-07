import axios from "@axios";
import { ref } from "@vue/composition-api";
import route from "ziggy-js";
import toaster from "./toaster";

export default function useCompanyLocations() {
    const busy = ref(false);
    const locations = ref([]);
    const errors = ref({});
    const toast = toaster();

    const fetchLocations = async () => {
        try {
            busy.value = true;
            const response = await axios.get(route("company-locations.index"));
            locations.value = response.data.data;
        } catch (error) {
            if (error.message === "Network Error") {
                toast.error(error.message);
            } else {
                toast.error(error.response?.data?.message || "Failed to load locations.");
            }
        } finally {
            busy.value = false;
        }
    };

    const storeLocation = async (data) => {
        errors.value = {};
        try {
            busy.value = true;
            const response = await axios.post(route("company-locations.store"), data, {
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
                if (error.response?.status === 422) {
                    errors.value = error.response.data.errors;
                }
                toast.error(error.response?.data?.message || "Failed to create location.");
            }
        } finally {
            busy.value = false;
        }
    };

    const updateLocation = async (data, id) => {
        errors.value = {};
        try {
            busy.value = true;
            // Use POST with _method PUT for file uploads
            data.append("_method", "PUT");
            const response = await axios.post(route("company-locations.update", id), data, {
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
                if (error.response?.status === 422) {
                    errors.value = error.response.data.errors;
                }
                toast.error(error.response?.data?.message || "Failed to update location.");
            }
        } finally {
            busy.value = false;
        }
    };

    const deleteLocation = async (id) => {
        try {
            busy.value = true;
            const response = await axios.delete(route("company-locations.destroy", id));
            toast.success(response.data.message);
            return response;
        } catch (error) {
            if (error.message === "Network Error") {
                toast.error(error.message);
            } else {
                toast.error(error.response?.data?.message || "Failed to delete location.");
            }
        } finally {
            busy.value = false;
        }
    };

    const deleteAttachment = async (id) => {
        try {
            busy.value = true;
            const response = await axios.delete(route("company-location-attachments.destroy", id));
            toast.success(response.data.message);
            return response;
        } catch (error) {
            if (error.message === "Network Error") {
                toast.error(error.message);
            } else {
                toast.error(error.response?.data?.message || "Failed to delete attachment.");
            }
        } finally {
            busy.value = false;
        }
    };

    return {
        busy,
        errors,
        locations,
        fetchLocations,
        storeLocation,
        updateLocation,
        deleteLocation,
        deleteAttachment,
    };
}
