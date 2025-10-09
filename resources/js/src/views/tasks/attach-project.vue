<template>
    <div class="project-container">

        <b-form-group v-for="(project, index) in projects" :key="index" v-slot="{ ariaDescribedby }">
            <b-card class="attach-card" :class="{ 'selected-card': assign.project.temp === project.name }"
                @click="assign.project.temp = project.name">
                <b-form-radio v-model="assign.project.temp" :aria-describedby="ariaDescribedby" name="project-radios"
                    :value="project.name" class="custom-radio">
                    <strong>{{ project.name }}</strong>
                    <p class="customer-name">Customer: {{ project.customer_name }}</p>
                </b-form-radio>
            </b-card>
        </b-form-group>

        <!-- Pagination Controls -->
        <div class="pagination-controls ">
            <button @click="currentPage--" :disabled="currentPage === 1" class="btn btn-outline-primary">
                <i class="bi bi-arrow-left"></i> Previous
            </button>

            <span class="pagination-text">Page {{ currentPage }} of {{ totalPages }}</span>

            <button @click="currentPage++" :disabled="currentPage >= totalPages" class="btn btn-outline-primary">
                Next <i class="bi bi-arrow-right"></i>
            </button>
        </div>

        <button :disabled="!assign.project.temp" @click="attach" class="btn btn-primary attach-btn">
            <i class="bi bi-paperclip"></i> Attach
        </button>
    </div>
</template>
<script>
import useProjects from "@/composables/projects";
import { onMounted, computed } from "@vue/composition-api";
import { BFormGroup, BFormRadio, BCard } from "bootstrap-vue";
import useTasks from "@/composables/tasks";
import router from "@/router";
export default {
    components: { BFormGroup, BFormRadio, BCard },
    setup() {
        const { assign, dialog } = useTasks();
        const { projects, fetchProjects, currentPage, pagination } = useProjects();

        onMounted(() => {
            fetchProjects();
        });
        const totalPages = computed(() => Math.ceil(pagination.total / pagination.per_page));

        const selectedProject = computed(() => {
            if (!!projects.length) return undefined;

            return projects.value.find(
                (project) => project.name === assign.value.project.temp
            );
        });

        const attach = () => {
            assign.value.project.data = selectedProject.value;
            assign.value.project.id = selectedProject.value.id;
            dialog.show = true;
            router.push({ name: "tasks" });
        };

        return { projects, assign, dialog, pagination, totalPages, currentPage, attach }
    },
};
</script>
<style lang="scss" scoped>


.title {
  text-align: center;
  font-weight: 600;
  margin-bottom: 15px;
}

.attach-card {

  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 10px;
  transition: 0.3s;
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  background: #f8f9fa;

}

.selected-card {
  border: 2px solid #007bff;
  background: #dbeafe;
}

.custom-radio {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.customer-name {
  font-size: 14px;
  color: #666;
  margin-top: 4px;
}

.pagination-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  font-weight: 500;
}

.pagination-text {
  font-size: 14px;
}

.attach-btn {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  padding: 10px;
  font-size: 16px;
  font-weight: 600;

  i {
    margin-right: 5px;
  }
}
</style>