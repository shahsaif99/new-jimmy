import axios from "@axios";
import { ref, reactive } from "@vue/composition-api";
import route from "ziggy-js";
import toaster from "./toaster";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default function useDocuments() {
    const toast = toaster();
    const documentsData = ref({});
    const busy = ref(false);
    const errors = ref({});
    const filters = reactive({});
    const respResult = ref(null);
    const searchQuery = ref("");
    const companyLogoDataUrl = ref(null);

    const loadCompanyLogo = async () => {
        try {
            const response = await axios.get(route("company-information.show"));
            const info = response.data.data;
            if (info && info.logo_url) {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.crossOrigin = "anonymous";
                    img.onload = () => {
                        const canvas = document.createElement("canvas");
                        canvas.width = img.width;
                        canvas.height = img.height;
                        const ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0);
                        companyLogoDataUrl.value = canvas.toDataURL("image/png");
                        resolve(companyLogoDataUrl.value);
                    };
                    img.onerror = () => resolve(null);
                    img.src = info.logo_url;
                });
            }
        } catch (e) {
            // Silently fail - PDF will be generated without logo
        }
        return null;
    };

    const searchDocumentOptions = ref([]);

    const getDocuments = async () => {
        try {
            const response = await axios.get(route("documents.index"), {
                params: {
                    q: searchQuery.value,
                    ...filters,
                },
            });
            documentsData.value = response.data;
        } catch (error) {
            if (error.message === "Network Error") {
                toast.error(error.message);
            } else {
                if (error.response.status === 422) {
                    errors.value = error.response.data.errors;
                }
                respResult.value = error;
                toast.error(error.response.data.message);
            }
        }
    };

    const storeDocument = async (data) => {
        errors.value = "";
        try {
            busy.value = true;
            const response = await axios.post(route("documents.store"), data);
            respResult.value = response;
            toast.success(response.data.message);
        } catch (error) {
            console.log(error);
            if (error.message === "Network Error") {
                toast.error(error.message);
            } else {
                if (error.response.status === 422) {
                    errors.value = error.response.data.errors;
                }
                respResult.value = error;
                toast.error(error.response.data.message);
            }
        } finally {
            busy.value = false;
        }
    };

    const updateDocument = async (data) => {
        errors.value = "";
        try {
            console.log(data.id);
            busy.value = true;
            const response = await axios.put(
                route("documents.update", data.id),
                data
            );
            respResult.value = response;
            toast.success(response.data.message);
        } catch (error) {
            console.log(error);
            if (error.message === "Network Error") {
                toast.error(error.message);
            } else {
                if (error.response.status === 422) {
                    errors.value = error.response.data.errors;
                }
                respResult.value = error;
                toast.error(error.response.data.message);
            }
        } finally {
            busy.value = false;
        }
    };

    const deleteDocument = async (id) => {
        try {
            busy.value = true;
            const response = await axios.delete(route("documents.destroy", id));
            toast.success(response.data.message);
            respResult.value = response;
        } catch (error) {
            if (error.message === "Network Error") {
                toast.error(error.message);
            } else {
                respResult.value = error;
                toast.error(error.response.data.message);
            }
        } finally {
            busy.value = false;
        }
    };

    const searchDocuments = async () => {
        try {
            const response = await axios.get(route("documents.search"), {
                params: {
                    q: searchQuery.value,
                    ...filters,
                },
            });
            searchDocumentOptions.value = response.data;
        } catch (error) {
            if (error.message === "Network Error") {
                toast.error(error.message);
            } else {
                if (error.response.status === 422) {
                    errors.value = error.response.data.errors;
                }
                respResult.value = error;
                toast.error(error.response.data.message);
            }
        }
    };

    const filterDocuments = async () => {
        try {
            const response = await axios.get(route("documents.search"), {
                params: {
                    ...filters,
                },
            });
            documentsData.value = response.data;
        } catch (error) {
            if (error.message === "Network Error") {
                toast.error(error.message);
            } else {
                if (error.response.status === 422) {
                    errors.value = error.response.data.errors;
                }
                respResult.value = error;
                toast.error(error.response.data.message);
            }
        }
    };

    const generatePDF = async (documentData) => {
        if (!!deleteDocument.value) return;

        // Load company logo if not already loaded
        if (!companyLogoDataUrl.value) {
            await loadCompanyLogo();
        }

        const doc = new jsPDF();

        const headerColor = [115, 113, 240];
        const textColor = [255, 255, 255];
        const headerHeight = 8;
        const tableWidth = doc.internal.pageSize.width - 2 * 14;

        // Add company logo at top-right if available
        let logoStartY = 10;
        if (companyLogoDataUrl.value) {
            try {
                const logoMaxH = 15;
                const logoMaxW = 50;
                doc.addImage(companyLogoDataUrl.value, "PNG", doc.internal.pageSize.width - 14 - logoMaxW, 10, logoMaxW, logoMaxH);
                logoStartY = 10 + logoMaxH + 3;
            } catch (e) {
                // If logo fails, continue without it
                logoStartY = 10;
            }
        }

        const pdfTop = `${documentData.category.number} ${documentData.category.name} ${documentData.subcategory.number} ${documentData.subcategory.name}`;

        doc.setFontSize(12);
        doc.setTextColor(...textColor);
        doc.setFillColor(...headerColor);
        doc.rect(14, logoStartY, tableWidth, headerHeight, "F");
        doc.text(pdfTop, 15, logoStartY + 5);

        let startY = logoStartY + headerHeight;

        documentsData.value.forEach((category) => {
            category.documents.forEach((subcategory) => {
                const data = subcategory.documents.map((doc) => [
                    doc.docId,
                    doc.type,
                    doc.title,
                    doc.revision_number,
                    doc.revised_date.replaceAll("-", "."),
                ]);

                doc.autoTable({
                    startY: startY,
                    head: [
                        [
                            "Doc. No.",
                            "Document type",
                            "Document title",
                            "Rev. No.",
                            "Rev. date",
                        ],
                    ],
                    body: data,
                    theme: "grid",
                    columnStyles: {
                        0: { cellWidth: 20 },
                        2: { cellWidth: 70 },
                        3: { cellWidth: 20 },
                        4: { cellWidth: 30 },
                    },
                    didParseCell: function (data) {
                        if (
                            data.row.index % 2 !== 0 &&
                            data.section === "body"
                        ) {
                            data.cell.styles.fillColor = [240, 240, 240];
                        }
                        if (data.section === "head") {
                            data.cell.styles.fillColor = headerColor;
                        }
                    },
                    didDrawPage: function (data) {
                        startY = data.cursor.y;
                    },
                });
            });
        });

        doc.save("document_overview.pdf");
    };

    return {
        busy,
        errors,
        filters,
        respResult,
        updateDocument,
        getDocuments,
        documentsData,
        storeDocument,
        deleteDocument,
        searchDocumentOptions,
        searchDocuments,
        generatePDF,
        filterDocuments,
    };
}
