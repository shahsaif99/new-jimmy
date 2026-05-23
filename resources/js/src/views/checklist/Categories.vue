<template>
    <div class="container-fluid">
        <b-modal
            v-model="dialog.show"
            :title="dialog.id ? 'Edit category' : 'New category'"
            hide-footer
        >
            <form @submit.prevent="save">
                <b-form-group label="Name">
                    <b-form-input
                        v-model="dialog.name"
                        placeholder="Category name"
                        required
                    />
                </b-form-group>
                <b-form-group label="Number">
                    <b-form-input
                        v-model="dialog.number"
                        placeholder="e.g. 100"
                        required
                    />
                </b-form-group>
                <div class="d-flex justify-content-end" style="gap: 8px">
                    <b-button variant="outline-secondary" @click="closeDialog">
                        Cancel
                    </b-button>
                    <b-button type="submit" variant="primary" :disabled="saving">
                        {{ saving ? "Saving..." : "Save" }}
                    </b-button>
                </div>
            </form>
        </b-modal>

        <div class="card mt-1">
            <div class="d-flex justify-content-between align-items-center m-2">
                <h5 class="mb-0">Checklist categories</h5>
                <b-button v-if="canManage" variant="primary" @click="openCreate">
                    <i class="bi bi-plus mr-1"></i>
                    New category
                </b-button>
            </div>
            <div v-if="!canManage" class="mx-2 mb-2 text-muted small">
                <i class="bi bi-info-circle mr-1"></i>
                Only administrators can create, edit, or delete checklist categories.
            </div>
            <b-table
                :items="categories"
                :fields="visibleFields"
                responsive
                show-empty
                empty-text="No categories yet"
                tbody-tr-class="align-middle"
            >
                <template #cell(actions)="data">
                    <div class="d-flex justify-content-end" style="gap: 8px">
                        <button
                            class="btn btn-outline-primary btn-sm"
                            @click="openEdit(data.item)"
                        >
                            Edit
                        </button>
                        <button
                            class="btn btn-outline-danger btn-sm"
                            @click="confirmDelete(data.item)"
                        >
                            Delete
                        </button>
                    </div>
                </template>
            </b-table>
        </div>
    </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from "@vue/composition-api";
import {
    BModal,
    BButton,
    BFormGroup,
    BFormInput,
    BTable,
} from "bootstrap-vue";
import axios from "@axios";
import route from "ziggy-js";
import toaster from "@/composables/toaster";
import useAbilities from "@/composables/abilities";

export default {
    components: { BModal, BButton, BFormGroup, BFormInput, BTable },
    setup(_, { root }) {
        const toast = toaster();
        const { can } = useAbilities();
        const canManage = computed(() => can("checklist-edit"));
        const categories = ref([]);
        const saving = ref(false);

        const dialog = reactive({
            show: false,
            id: null,
            name: "",
            number: "",
        });

        const fields = [
            { key: "number", label: "Number" },
            { key: "name", label: "Name" },
            { key: "actions", label: "", thStyle: { width: "180px" } },
        ];

        const visibleFields = computed(() =>
            canManage.value ? fields : fields.filter((f) => f.key !== "actions")
        );

        async function load() {
            try {
                const res = await axios.get(route("categories.index"));
                const list = Array.isArray(res.data) ? res.data : res.data?.data || [];
                categories.value = list.map((c) => ({
                    id: c.id,
                    name: c.name,
                    number: c.number,
                }));
            } catch (e) {
                toast.error("Failed to load categories");
            }
        }

        function openCreate() {
            dialog.id = null;
            dialog.name = "";
            dialog.number = "";
            dialog.show = true;
        }

        function openEdit(item) {
            dialog.id = item.id;
            dialog.name = item.name;
            dialog.number = item.number;
            dialog.show = true;
        }

        function closeDialog() {
            dialog.show = false;
        }

        async function save() {
            if (!canManage.value) {
                toast.warning("Only administrators can manage categories");
                return;
            }
            try {
                saving.value = true;
                const body = {
                    name: dialog.name,
                    number: dialog.number,
                    category_id: null,
                };
                if (dialog.id) {
                    await axios.put(route("categories.update", dialog.id), body);
                    toast.success("Category updated");
                } else {
                    await axios.post(route("categories.store"), body);
                    toast.success("Category created");
                }
                closeDialog();
                await load();
            } catch (e) {
                toast.error(e?.response?.data?.message || "Failed to save");
            } finally {
                saving.value = false;
            }
        }

        function confirmDelete(item) {
            if (!canManage.value) {
                toast.warning("Only administrators can manage categories");
                return;
            }
            root.$bvModal
                .msgBoxConfirm(
                    `Delete category "${item.name}"? Checklists using this category will fall back to no category.`,
                    {
                        title: "Confirm delete",
                        okVariant: "danger",
                        okTitle: "Delete",
                        cancelTitle: "Cancel",
                        centered: true,
                    }
                )
                .then(async (ok) => {
                    if (!ok) return;
                    try {
                        await axios.delete(route("categories.destroy", item.id));
                        toast.success("Category deleted");
                        await load();
                    } catch (e) {
                        toast.error(e?.response?.data?.message || "Failed to delete");
                    }
                });
        }

        onMounted(load);

        return {
            categories,
            fields,
            visibleFields,
            canManage,
            dialog,
            saving,
            openCreate,
            openEdit,
            closeDialog,
            save,
            confirmDelete,
        };
    },
};
</script>
