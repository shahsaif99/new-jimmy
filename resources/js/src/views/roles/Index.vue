<template>
  <div>
    <!-- <b-card no-body>
      <b-card-header class="pb-50">
        <h5>
          Filters
        </h5>
      </b-card-header>
      <b-card-body>
        <b-row>
          <b-col
            cols="12"
            md="3"
            class="mb-md-0 mb-2"
          >
            <CompanyFilter
              :companies="roleUsers"
              :key="filterKey"
              @company-change="selectCompany"
            />
          </b-col>
          <b-col
            cols="12"
            md="3"
            class="mb-md-0 mb-2"
          >
            <CounselorFilter
              :counselors="roleUsersById"
              :key="counselorFilter"
              @filter-update="filterUpdate"
            />
          </b-col>
          <b-col
            cols="12"
            md="3"
            class="mb-md-0 mb-2"
          >
            <b-button
              variant="warning"
              class="mt-2"
              @click="resetFilter"
            >
              Reset
            </b-button>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card> -->
    <add-role
      :is-add-new-role-sidebar-active.sync="isAddNewRoleSidebarActive"
      @refetch-data="fetchRoles"
      v-if="isAddNewRoleSidebarActive"
    />

    <edit-role
      :is-edit-role-sidebar-active.sync="isEditRoleSidebarActive"
      @refetch-data="fetchRoles"
      v-if="isEditRoleSidebarActive"
      :role-id="roleId"
    />
    <b-card
      no-body
      class="mb-0"
    >
      <div class="m-2">
        <b-row>
          <b-col
            cols="12"
            md="8"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          >
            <label>Show</label>
            <v-select
              v-model="perPage"
              :options="perPageOptions"
              :clearable="false"
              class="per-page-selector d-inline-block mx-50"
            />
            <label>entries</label>

          </b-col>

          <!-- Search -->
          <b-col
            cols="12"
            md="4"
          >
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input
                v-model="searchQuery"
                class="d-inline-block mr-1"
                placeholder="Search..."
              />
              <b-button
                variant="primary"
                @click="isAddNewRoleSidebarActive = true"
              >
                <span class="text-nowrap">Add Role</span>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </div>

      <b-table
        ref="refListTable"
        class="position-relative"
        :items="roles"
        responsive
        :fields="tableColumns"
        primary-key="id"
        :sort-by.sync="sortBy"
        show-empty
        empty-text="No matching records found"
        :sort-desc.sync="isSortDirDesc"
      >
        <template #cell(actions)="data">
          <b-dropdown
            variant="link"
            no-caret
          >
            <template #button-content>
              <feather-icon
                icon="MoreVerticalIcon"
                size="16"
                class="align-middle text-body"
              />
            </template>
            <b-dropdown-item @click="editRole(data.item)">
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>
            <b-dropdown-item @click="confirmDelete(data.item.id)">
              <feather-icon
                icon="TrashIcon"
              />
              <span class="align-middle ml-50">Delete</span>
            </b-dropdown-item>
          </b-dropdown>
        </template>
      </b-table>

      <div class="mx-2 mb-2">
        <b-row>
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <span class="text-muted">Showing {{ dataMeta.from }} to {{ dataMeta.to }} of {{ dataMeta.of }} entries</span>
          </b-col>
          <!-- Pagination -->
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-end"
          >

            <b-pagination
              v-model="currentPage"
              :total-rows="totalRecords"
              :per-page="perPage"
              first-number
              last-number
              class="mb-0 mt-1 mt-sm-0"
              prev-class="prev-item"
              next-class="next-item"
            >
              <template #prev-text>
                <feather-icon
                  icon="ChevronLeftIcon"
                  size="18"
                />
              </template>
              <template #next-text>
                <feather-icon
                  icon="ChevronRightIcon"
                  size="18"
                />
              </template>
            </b-pagination>

          </b-col>

        </b-row>
      </div>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  VBToggle,
  BRow,
  BCol,
  BFormInput,
  BButton,
  BTable,
  BDropdown,
  BDropdownItem,
  BPagination,

} from 'bootstrap-vue'
import useRoles from '@/composables/roles'
import vSelect from 'vue-select'
import { ref } from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'
import AddRole from './AddRole.vue'
import EditRole from './EditRole.vue'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BTable,
    BButton,
    vSelect,
    AddRole,
    EditRole,
    BDropdown,
    BFormInput,
    BPagination,
    BDropdownItem,
  },
  directives: {
    Ripple,
    'b-toggle': VBToggle,
  },
  setup(props, { root }) {
    const {
      roles,
      sortBy,
      perPage,
      dataMeta,
      fetchRoles,
      respResult,
      deleteRole,
      currentPage,
      searchQuery,
      totalRecords,
      tableColumns,
      isSortDirDesc,
      perPageOptions,
    } = useRoles()

    fetchRoles()
    const isAddNewRoleSidebarActive = ref(false)
    const isEditRoleSidebarActive = ref(false)
    const roleId = ref('')
    const editRole = role => {
      roleId.value = role.id
      isEditRoleSidebarActive.value = true
    }


    const deleteRoleConfirmed = async id => {
      await deleteRole(id)
      if (respResult.value.status === 200) {
        fetchRoles()
      }
    }


    const confirmDelete = async id => {
      root.$bvModal
        .msgBoxConfirm('Please confirm that you want to delete role.', {
          title: 'Please Confirm',
          okVariant: 'primary',
          okTitle: 'Yes, Delete It',
          cancelTitle: 'No',
          cancelVariant: 'outline-secondary',
          centered: true,
        })
        .then(value => {
          if (value) {
            deleteRoleConfirmed(id)
          }
        })
    }

    return {
      roles,
      sortBy,
      roleId,
      perPage,
      editRole,
      dataMeta,
      currentPage,
      searchQuery,
      fetchRoles,
      totalRecords,
      isSortDirDesc,
      tableColumns,
      confirmDelete,
      perPageOptions,
      isEditRoleSidebarActive,
      isAddNewRoleSidebarActive,
    }
  },
}
</script>

<style lang="scss" >
.per-page-selector {
  width: 90px;
}
.block{
  display: block;
}
</style>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
</style>
