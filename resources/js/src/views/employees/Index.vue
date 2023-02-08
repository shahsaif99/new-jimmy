<template>
  <div>
    <EditEmployee
      :edit-employee-active.sync="editEmployeeActive"
      v-if="editEmployeeActive"
    />
    <AddEmployee
      :add-employee-active.sync="addEmployeeActive"
      v-if="addEmployeeActive"
    />
    <b-card>
      <div class="mb-2">
        <b-row>
          <b-col
            cols="12"
            md="6"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          >
            <label>{{ t('Show') }}</label>
            <v-select
              v-model="perPage"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="perPageOptions"
              :clearable="false"
              class="per-page-selector d-inline-block mx-50"
            />
            <label>{{ t('entries') }}</label>

            <b-button
              class="d-inline-block ml-1"
              v-if="$can('employee-add', 'all')"
              variant="primary"
              @click="$router.push({ name: 'users-add' })"
            >
              <span class="text-nowrap">{{ t('Add Employee') }}</span>
            </b-button>
          </b-col>
          <b-col
            cols="12"
            md="6"
          >
            <div
              class="d-flex align-items-center justify-content-end"
            >
              <b-form-input
                v-model="searchQuery"
                class="d-inline-block mr-1 md-2"
                :placeholder="t('Search...')"
              />
            </div>
          </b-col>
        </b-row>
      </div>
      <b-overlay
        id="overlay-background"
        :show="busy"
        variant="transparent"
        rounded="sm"
      >
        <b-table
          ref="refListTable"
          class="position-relative"
          :items="users"
          responsive
          :fields="employeeTableColumns"
          primary-key="id"
          :sort-by.sync="sortBy"
          show-empty
          :empty-text="t('No matching records found')"
          :sort-desc.sync="isSortDirDesc"
        >
          <template #head()="data">
            <span>{{ $t(data.label) }}</span>
          </template>
          <template #cell(status)="data">
            <div>
              <b-form-checkbox
                :checked="data.item.status"
                class="custom-control-success"
                name="check-button"
                @change="onChangeStatus(data.item.id, data.item.status)"
                switch
              />
            </div>
          </template>

          <!-- Column: Actions -->
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
              <b-dropdown-item
                @click="$router.push({ name: 'users-edit', params: { id: data.item.id } })"
                v-if="$can('employee-edit', 'all')"
              >
                <feather-icon icon="EditIcon" />
                <span class="align-middle ml-50">{{ t('Edit') }}</span>
              </b-dropdown-item>

              <!-- <b-dropdown-item
                @click="$router.push({ name: 'employee-details', params: { id: data.item.id } })"
                v-if="$can('employee-edit', 'all')"
              >
                <feather-icon icon="EditIcon" />
                <span class="align-middle ml-50">Details</span>
              </b-dropdown-item> -->

              <b-dropdown-item
                @click="confirmDelete(data.item.id)"
                v-if="$can('users-delete', 'all')"
              >
                <feather-icon
                  icon="TrashIcon"
                />
                <span class="align-middle ml-50">{{ t('Delete') }}</span>
              </b-dropdown-item>

            </b-dropdown>
          </template>

        </b-table>
      </b-overlay>
      <div class="mx-2 mb-2">
        <b-row>
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <span
              class="text-muted"
            >{{ t('Showing') }} {{ dataMeta.from }} {{ t('to') }} {{ dataMeta.to }} {{ t('of') }}
              {{ dataMeta.of }} {{ t('entries') }}</span>
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
  BButton, BCard, BCol, BDropdown,
  BDropdownItem, BFormCheckbox, BFormInput, BOverlay, BPagination, BRow, BTable,
} from 'bootstrap-vue'
import { ref, onMounted } from '@vue/composition-api'
import vSelect from 'vue-select'
import useUsers from '@/composables/users'
// eslint-disable-next-line import/no-cycle
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import i18n from '@/libs/i18n'
import AddEmployee from './add/Add.vue'
import EditEmployee from './edit/Edit.vue'


export default {
  components: {
    BRow,
    BCol,
    BCard,
    BTable,
    BButton,
    vSelect,
    BOverlay,
    BDropdown,
    BFormInput,
    BPagination,
    BDropdownItem,
    BFormCheckbox,
    AddEmployee,
    EditEmployee,
  },
  setup(_, { root }) {
    const {
      busy,
      users,
      sortBy,
      filters,
      perPage,
      dataMeta,
      respResult,
      refetchData,
      searchQuery,
      deleteUser,
      fetchUsers,
      currentPage,
      totalRecords,
      refListTable,
      isSortDirDesc,
      perPageOptions,
      updateUserStatus,
      employeeTableColumns,
    } = useUsers()

    const { t } = useI18nUtils()


    const isExportActive = ref(false)
    const filterKey = ref(0)
    const addEmployeeActive = ref(false)
    const editEmployeeActive = ref(false)

    onMounted(() => {
      filters.role = 'Employee'
      fetchUsers()
    })

    // onChangeStatus
    const onChangeStatus = (id, status) => {
      const newStatus = status ? 0 : 1
      const userStatus = users.value.find(_user => _user.id === id)
      // userStatus.status = newStatus
      root.$bvToast.toast(`Employee ${userStatus.name} status changed to ${newStatus ? 'Active' : 'Inactive'}`, {
        title: 'Success',
        variant: 'success',
        solid: true,
        autoHideDelay: 8000,
      })

      const payload = {
        id,
        status: newStatus,
      }
      updateUserStatus(payload)
      // {{ t(' Update User') }} status by axios
    }


    const deleteUserConfirmed = async id => {
      await deleteUser(id)
      if (respResult.value.status === 200) {
        fetchUsers()
      }
    }


    const confirmDelete = async id => {
      root.$bvModal
        .msgBoxConfirm(i18n.t('Please confirm that you want to delete employee.'), {
          title: i18n.t('Please Confirm'),
          size: 'sm',
          okTitle: i18n.t('Confirm'),
          cancelTitle: i18n.t('Cancel'),
        })
        .then(value => {
          if (value) {
            deleteUserConfirmed(id)
          }
        })
    }
    return {
      t,
      busy,
      sortBy,
      users,
      filters,
      perPage,
      dataMeta,
      filterKey,
      refetchData,
      searchQuery,
      currentPage,
      totalRecords,
      refListTable,
      isSortDirDesc,
      confirmDelete,
      onChangeStatus,
      perPageOptions,
      isExportActive,
      addEmployeeActive,
      editEmployeeActive,
      employeeTableColumns,
    }
  },
}
</script>
<style lang="scss" scoped>
    .per-page-selector {
        width: 90px;
    }
</style>

<style lang="scss">
    @import '~@core/scss/vue/libs/vue-select.scss';
</style>
