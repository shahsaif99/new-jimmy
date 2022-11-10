<template>
  <div>
    <!-- <Export
      :is-export-active.sync="isExportActive"
      :filters="filters"
      export-url="/export/users"
    /> -->
    <b-row>
      <b-col
        cols="12"
        md="3"
        v-for="(userStat, index) in usersStats"
        :key="index"
      >
        <b-card
          no-body
          class="mb-0"
        >
          <b-card-body>
            <div class="d-flex justify-content-between">
              <span>Total {{ userStat.records }} users</span>
              <b-avatar-group
                class="mt-2 pt-50"
              >
                <b-avatar
                  v-for="user in userStat.users"
                  :key="user.avatar"
                  v-b-tooltip.hover.bottom="user.name"
                  :src="user.avatar_url"
                  class="pull-up"
                />
              </b-avatar-group>

            </div>
            <div class="d-flex justify-content-between align-items-end mt-1 pt-25">
              <div class="role-heading">
                <h4 class="fw-bolder">
                  {{ userStat.role }}
                </h4>
              </div>
            </div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-card
      no-body
      class="mb-0 mt-2"
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
            <b-button
              class="d-inline-block ml-1"
              v-if="$can('users-add', 'all')"
              variant="primary"
              @click="$router.push({ name: 'users-add' })"
            >
              <span class="text-nowrap">Add User</span>
            </b-button>

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
              <v-select
                placeholder="Select Role"
                v-model="roleFilter"
                :options="roles"
                label="name"
                :reduce="role => role.value"
                input-id="role"
                class="invoice-filter-select"
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
          :fields="tableColumns"
          primary-key="id"
          :sort-by.sync="sortBy"
          show-empty
          empty-text="No matching records found"
          :sort-desc.sync="isSortDirDesc"
        >
          <template #cell(avatar)="data">
            <b-media vertical-align="center">
              <template #aside>
                <b-avatar
                  size="32"
                  :src="data.item.avatar_url"
                  :text="avatarText(data.item.name)"
                  variant="light-success"
                />
              </template>
              <b-link
                class="font-weight-bold d-block text-nowrap"
              >
                {{ data.item.name }}
              </b-link>
              <!-- <small class="text-muted">@{{ data.item.email }}</small> -->
            </b-media>
          </template>
          <!-- Column: Status -->
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

          <template #cell(role_name)="data">
            <div
              class="text-nowrap"
            >
              <feather-icon
                :icon="resolveUserRoleIcon(data.item.role_name)"
                size="18"
                class="mr-50"
                :class="`text-${resolveUserRoleVariant(data.item.role_name)}`"
              />
              <span class="align-text-top text-capitalize">{{ data.item.role_name }}</span>
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
                v-if="$can('users-edit', 'all')"
              >
                <feather-icon icon="EditIcon" />
                <span class="align-middle ml-50">Edit</span>
              </b-dropdown-item>

              <b-dropdown-item
                @click="confirmDelete(data.item.id)"
                v-if="$can('users-delete', 'all')"
              >
                <feather-icon
                  icon="TrashIcon"
                />
                <span class="align-middle ml-50">Delete</span>
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
  BAvatar, BButton, BCard, BCol, BDropdown, BCardBody, BAvatarGroup,
  BDropdownItem, BFormCheckbox, BFormInput, BOverlay, BPagination, BRow, BTable, BMedia, BLink, VBTooltip,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import route from 'ziggy-js'
import { avatarText } from '@core/utils/filter'
import useUsers from '@/composables/users'
import { ref, watch, onMounted } from '@vue/composition-api'


export default {
  components: {
    BRow,
    BCol,
    BLink,
    BCard,
    BTable,
    BMedia,
    BAvatar,
    BButton,
    vSelect,
    BCardBody,
    BOverlay,
    BDropdown,
    BFormInput,
    BPagination,
    BAvatarGroup,
    BDropdownItem,
    BFormCheckbox,
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  setup(_, context) {
    const {
      busy,
      user,
      users,
      sortBy,
      perPage,
      filters,
      dataMeta,
      fetchUsers,
      respResult,
      deleteUser,
      usersStats,
      searchQuery,
      totalRecords,
      currentPage,
      refListTable,
      tableColumns,
      isSortDirDesc,
      perPageOptions,
      fetchUsersStats,
      updateUserStatus,
      resolveUserRoleIcon,
      resolveUserRoleVariant,
    } = useUsers()

    const roleFilter = ref(null)
    onMounted(() => {
      fetchUsersStats()
    })

    const roles = ref([
      {
        name: 'Partner',
        value: 'partner',
      },
      {
        name: 'Broker',
        value: 'broker',
      },
      {
        name: 'BDM',
        value: 'bdm',
      },
    ])

    const isExportActive = ref(false)
    watch(() => context.root.$route.meta.status, async status => {
      filters.status = status
      fetchUsers()
    }, {
      immediate: true,
    })


    // onChangeStatus
    const onChangeStatus = (id, status) => {
      const newStatus = status ? 0 : 1
      const userStatus = users.value.find(_user => _user.id === id)
      // userStatus.status = newStatus
      context.root.$bvToast.toast(`User ${userStatus.name} status changed to ${newStatus ? 'Active' : 'Inactive'}`, {
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
      // update user status by axios
    }

    watch(roleFilter, async role => {
      filters.role = role
      fetchUsers()
    })


    const deleteUserConfirmed = async id => {
      await deleteUser(id)
      if (respResult.value.status === 200) {
        fetchUsers()
      }
    }


    const confirmDelete = async id => {
      context.root.$bvModal
        .msgBoxConfirm('Please confirm that you want to delete user.', {
          title: 'Please Confirm',
          size: 'sm',
        })
        .then(value => {
          if (value) {
            deleteUserConfirmed(id)
          }
        })
    }

    return {
      busy,
      user,
      route,
      users,
      roles,
      sortBy,
      perPage,
      filters,
      dataMeta,
      roleFilter,
      fetchUsers,
      usersStats,
      avatarText,
      searchQuery,
      currentPage,
      tableColumns,
      totalRecords,
      refListTable,
      confirmDelete,
      isSortDirDesc,
      onChangeStatus,
      perPageOptions,
      isExportActive,
      resolveUserRoleIcon,
      resolveUserRoleVariant,
    }
  },
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
.invoice-filter-select {
  min-width: 190px;

  ::v-deep .vs__selected-options {
    flex-wrap: nowrap;
  }

  ::v-deep .vs__selected {
    width: 100px;
  }
}
</style>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
</style>
