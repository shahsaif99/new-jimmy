<template>
  <b-modal v-model="dialog.show.project.add" title="Add New Project" size="lg">

    <b-row>
      <b-col cols="6">
        <b-form-group label="Project Name" label-size="md">
          <b-form-input v-model="form.project_name" placeholder="Enter a name for the project" size="md"></b-form-input>
        </b-form-group>
      </b-col>
      <b-col cols="6">
        <b-form-group label="Status" label-size="md">
          <b-form-select v-model="form.status" :options="statusOptions" size="md"></b-form-select>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="6">
        <b-form-group label="Customer" label-size="md">
          <InfiniteScrollSelect v-model="form.customer" @onSearch="searchCustomers" :options="formattedCustomers"
            :has-next-page="isNextPageAvailableCustomer" :loading="busy" @onPaginate="onPagination" />
        </b-form-group>
      </b-col>
      <b-col cols="6">
        <b-form-group label="Project Number" label-size="md">
          <b-form-input v-model="form.project_no" type="number"
            placeholder="Enter custom number or leave empty for auto-generation." size="md"></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="6">
        <b-form-group label="Project Manager" label-size="md">
          <InfiniteScrollSelect v-model="form.project_manager" @onSearch="searchUsers" :options="formattedUsers"
            :has-next-page="isNextPageAvailable" :loading="busy" @onPaginate="currentPage++" />
        </b-form-group>
      </b-col>
      <b-col cols="6">
        <b-form-group label="Project HSE Manager" label-size="md">
          <InfiniteScrollSelect v-model="form.project_hse_manager" @onSearch="searchUsers" :options="formattedUsers"
            :has-next-page="isNextPageAvailable" :loading="busy" @onPaginate="currentPage++" />
        </b-form-group>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="6">
        <b-form-group label="Start Date" label-size="md">
          <b-form-input v-model="form.start_date" type="date" placeholder="Enter start date" size="md"></b-form-input>
        </b-form-group>
      </b-col>
      <b-col cols="6">
        <b-form-group label="End Date" label-size="md">
          <b-form-input v-model="form.end_date" type="date" placeholder="Enter end date" size="md"></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>

    <b-form-group label="Description" label-size="md">
      <b-form-textarea v-model="form.description" placeholder="Enter a description for the project"
        size="md"></b-form-textarea>
    </b-form-group>


    <b-row>
      <b-col cols="6">
        <b-form-group label="Cost" label-size="md">
          <b-form-input v-model="form.cost" placeholder="Enter project cost" type="number" size="md"></b-form-input>
        </b-form-group>
      </b-col>
      <b-col cols="6">
        <b-form-group label="Hours" label-size="md">
          <b-form-input v-model="form.hours" type="number" placeholder="Enter project hours" size="md"></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>


    <template #modal-footer>
      <div class="d-flex align-items-center">
        <b-button variant="primary" size="sm" class="mr-1 cursor-pointer" :disabled="apiHelpersProject.loading"
          @click="storeProject">
          <b-spinner v-if="apiHelpersProject.loading" label="Spinning" small></b-spinner>
          <feather-icon v-else icon="PlusIcon" size="16" />
          Save
        </b-button>
        <b-button class="cursor-pointer" variant="outline-primary" size="sm" :disabled="apiHelpersProject.loading"
          @click="dialog.toggleDialog('project', 'add')">
          <feather-icon icon="XIcon" size="16" />
          Close
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
import useProjects from "@/composables/projects";
import InfiniteScrollSelect from "@/views/components/InfiniteScrollSelect.vue";

import {
  BModal,
  BForm,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BFormCheckboxGroup,
  BFormRadioGroup,
  BButton,
  BRow,
  BCol,
  BTable,
  BDropdown,
  BDropdownItem,
  BFormTextarea,
  BSpinner
} from "bootstrap-vue";
import useUsers from "@/composables/users";
import { onMounted, computed, watch, ref } from "@vue/composition-api";
import { useUtils as useI18nUtils } from "@core/libs/i18n";
import useCustomerSupplier from "@/composables/customer-suppliers";

export default {
  components: {
    BModal,
    BForm,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BFormCheckboxGroup,
    BFormRadioGroup,
    BButton,
    BRow,
    BCol,
    InfiniteScrollSelect,
    BTable,
    BDropdown,
    BDropdownItem,
    BFormTextarea,
    BSpinner
  },
  setup() {
    const { storeProject, form, dialog, statusOptions, apiHelpers: apiHelpersProject, currentPage: currentPageProject } = useProjects();
    const { fetchCustomerSuppliers, customerSuppliers, filters, apiHelpers, pagination, reset, isNextPageAvailable: isNextPageAvailableCustomer } = useCustomerSupplier()
    const { t } = useI18nUtils();

    const {
      fetchUsers,
      users,
      searchQuery,
      currentPage,
      isNextPageAvailable,
      busy,
    } = useUsers();

    const tempUsers = ref([]);

    const searchUsers = (query) => {
      currentPage.value = 1
      searchQuery.value = query;
      tempUsers.value = [];
      fetchUsers();
    };

    const searchCustomers = (query) => {
      filters.search = query;
      tempCustomers.value = [];
      pagination.current_page = 1
      fetchCustomerSuppliers();
    };

    onMounted(() => {
      form.reset()
      currentPage.value = 1
      pagination.current_page = 1
      fetchCustomerSuppliers()
      fetchUsers();
    });

    const onPagination = (page) => {
      pagination.current_page++
      fetchCustomerSuppliers();
    };


    const formattedUsers = computed(() => {
      const userMap = new Map();
      tempUsers.value.forEach((user) => {
        if (!userMap.has(user.id)) {
          userMap.set(user.id, { value: user.id, label: user.name });
        }
      });
      return Array.from(userMap.values());
    });

    const tempCustomers = ref([]);

    const formattedCustomers = computed(() => {
      const customerMap = new Map();
      tempCustomers.value.forEach((customer) => {
        if (!customerMap.has(customer.id)) {
          customerMap.set(customer.id, { value: customer.id, label: customer.name });
        }
      });
      return Array.from(customerMap.values());
    });

    watch(() => customerSuppliers.data, (newVal) => {
      tempCustomers.value = [...tempCustomers.value, ...newVal];
    }, { deep: true });


    watch(users, (newVal) => {
      tempUsers.value = [...tempUsers.value, ...newVal];
    });

    return {
      t,
      currentPage,
      isNextPageAvailable,
      busy,
      searchUsers,
      formattedUsers,
      form,
      dialog,
      statusOptions,
      formattedCustomers,
      searchCustomers,
      apiHelpers,
      storeProject,
      isNextPageAvailableCustomer,
      pagination,
      tempCustomers,
      onPagination,
      apiHelpersProject
    };
  },
};
</script>

<style scoped>
.modal-title {
  font-size: 0.875rem;
  font-weight: bold;
}

.form-group {
  margin-bottom: 0.5rem;
}

.input-group-text {
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
}

.status {
  padding: 4px 8px;
  border-radius: 4px;
}
</style>

<style>
.custom-control {
  margin-bottom: 8px;
}

.customer-supplier .table th {
  padding: 5px 14px !important;
}

.customer-supplier .table td {
  padding: 2px 14px !important;
}
</style>
