<template>
  <b-modal v-model="dialog.show.project.edit" title="Edit Project" size="lg">
    <b-form>
      <b-row>
        <b-col cols="6">
          <b-form-group label="Project Name" label-size="md">
            <b-form-input v-model="form.project_name" placeholder="Enter a name for the project"
              size="md"></b-form-input>
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
            <InfiniteScrollSelect v-model="form.customer"
              :selectValue="dialog.temp.project.data.customer_name ? dialog.temp.project.data.customer_name : ''"
              @onSearch="searchCustomers" :options="formattedCustomers" :has-next-page="isNextPageAvailableCustomer"
              :loading="busy" @onPaginate="onPagination" />
          </b-form-group>
        </b-col>
        <b-col cols="6">
          <b-form-group label="Project Number" label-size="md">
            <b-form-input v-model="form.project_no" type="number" readonly
              placeholder="Enter custom number or leave empty for auto-generation." size="md"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="6">
          <b-form-group label="Project Manager" label-size="md">
            <InfiniteScrollSelect v-model="form.project_manager"
              :selectValue="dialog.temp.project.data.project_manager_name ? dialog.temp.project.data.project_manager_name : ''"
              @onSearch="searchUsers" :options="formattedUsers" :has-next-page="isNextPageAvailable" :loading="busy"
              @onPaginate="currentPage++" />
          </b-form-group>
        </b-col>
        <b-col cols="6">
          <b-form-group label="Project HSE Manager" label-size="md">
            <InfiniteScrollSelect v-model="form.project_hse_manager"
              :selectValue="dialog.temp.project.data.project_hse_manager_name ? dialog.temp.project.data.project_hse_manager_name : ''"
              @onSearch="searchUsers" :options="formattedUsers" :has-next-page="isNextPageAvailable" :loading="busy"
              @onPaginate="currentPage++" />
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
    </b-form>


    <template #modal-footer>
      <div class="d-flex align-items-center">
        <b-button variant="primary" size="sm" class="mr-1 cursor-pointer" :disabled="apiHelpers.loading"
          @click="updateProject">
          <feather-icon icon="EditIcon" size="16" />
          Edit
        </b-button>
        <b-button class="cursor-pointer" variant="outline-primary" size="sm" :disabled="apiHelpers.loading"
          @click="dialog.toggleDialog('project', 'edit')">
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
import moment from "moment";

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
  BFormTextarea
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
    BFormTextarea
  },
  setup() {
    const { updateProject, form, dialog, statusOptions } = useProjects();
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

    const onPagination = (page) => {
      pagination.current_page++
      fetchCustomerSuppliers();
    };

    onMounted(() => {
      pagination.current_page = 1
      currentPage.value = 1
      reset()
      fetchCustomerSuppliers()
      fetchUsers();

      form.set(dialog.temp.project.data);
      form.project_name = dialog.temp.project.data.name;
      form.customer = dialog.temp.project.data.customer_id;
      form.project_hse_manager = dialog.temp.project.data.project_hse_manager_id;
      form.project_manager = dialog.temp.project.data.project_manager_id;
      form.start_date = moment(dialog.temp.project.data.start_date).format("YYYY-MM-DD");
      form.end_date = moment(dialog.temp.project.data.end_date).format("YYYY-MM-DD");
      form.hours = dialog.temp.project.data.hour
    });

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
      updateProject,
      pagination,
      isNextPageAvailableCustomer,
      onPagination
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
