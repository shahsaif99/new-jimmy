<template>
  <div>
    <Export
      :is-export-active.sync="isExportActive"
      :filters="filters"
      export-url="/export/users"
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
            <b-button
              class="d-inline-block ml-1"
              v-if="$can('manage-users', 'all')"
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
              <b-button
                class="d-inline-block ml-1"
                variant="primary"
                @click="isExportActive = true"
              >
                <span class="text-nowrap">Export</span>
              </b-button>
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
            <b-avatar :src="data.item.avatar" />
          </template>

          <template #cell(name)="data">
            <b-link
              :to="{ name: 'users-edit', params: { id: data.item.id } }"
            >
              {{ data.item.name }}
            </b-link>
          </template>

          <template #cell(status)="data">
            <b-badge
              pill
              :variant="`light-${resolveUserStatusVariant(data.item.status)}`"
              class="text-capitalize"
            >
              {{ data.item.status ? 'Active' : 'Inactive' }}
            </b-badge>
          </template>

          <!-- Column: Status -->
          <!-- <template #cell(status)="data">
            <div>
              <b-form-checkbox
                :checked="data.item.status"
                class="custom-control-success"
                name="check-button"
                @change="onChangeStatus(data.item.id, data.item.status)"
                switch
              />
            </div>
          </template> -->

          <template #cell(roles.0.name)="data">
            <div
              class="text-nowrap"
              v-if="data.item.roles && data.item.roles.length > 0"
            >
              <feather-icon
                :icon="resolveUserRoleIcon(data.item.roles[0].name)"
                size="18"
                class="mr-50"
                :class="`text-${resolveUserRoleVariant(data.item.roles[0].name)}`"
              />
              <span class="align-text-top text-capitalize">{{ data.item.roles[0].name }}</span>
            </div>
          </template>

          <!-- Column: Actions -->
          <template #cell(actions)="data">

            <feather-icon
              :id="`user-row-${data.item.id}-pencil-icon`"
              icon="EditIcon"
              size="16"
              class="mx-1 cursor-pointer"
              @click="$router.push({ name: 'users-edit', params: { id: data.item.id } })"
              v-if="$can('manage-users', 'all')"
            />
            <b-tooltip
              title="Edit User"
              :target="`user-row-${data.item.id}-pencil-icon`"
            />
            <feather-icon
              :id="`user-row-${data.item.id}-trash-icon`"
              icon="TrashIcon"
              class="cursor-pointer"
              size="16"
              @click="confirmDelete(data.item.id)"
              v-if="$can('manage-users', 'all')"
            />
            <b-tooltip
              title="Delete User"
              :target="`user-row-${data.item.id}-trash-icon`"
            />


            <!-- <b-dropdown
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
                v-if="$can('manage-users', 'all')"
              >
                <feather-icon icon="EditIcon" />
                <span class="align-middle ml-50">View</span>
              </b-dropdown-item>

              <b-dropdown-item
                @click="confirmDelete(data.item.id)"
                v-if="$can('manage-users', 'all')"
              >
                <feather-icon
                  icon="TrashIcon"
                />
                <span class="align-middle ml-50">Delete</span>
              </b-dropdown-item>

            </b-dropdown> -->
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
import { ref, onMounted } from '@vue/composition-api'
import {
  BAvatar, BButton, BCard, BCol, BTooltip, BLink, BBadge,
  BFormInput, BOverlay, BPagination, BRow, BTable,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import route from 'ziggy-js'
import useUsers from '@/composables/users'
import Export from '../Export.vue'

export default {
  components: {
    Export,
    BOverlay,
    BCard,
    BRow,
    BLink,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BTooltip,
    BPagination,
    BBadge,
    BAvatar,
    vSelect,
  },
  setup(_, context) {
    const {
      busy,
      user,
      users,
      sortBy,
      perPage,
      dataMeta,
      fetchUsers,
      respResult,
      currentPage,
      searchQuery,
      deleteUser,
      totalRecords,
      refListTable,
      tableColumns,
      isSortDirDesc,
      perPageOptions,
      updateUserStatus,
      resolveUserRoleIcon,
      resolveUserRoleVariant,
      resolveUserStatusVariant,
    } = useUsers()


    onMounted(() => {
      fetchUsers()
    })

    const isExportActive = ref(false)
    const filters = ref({})

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


    const deleteUserConfirmed = async id => {
      await deleteUser(id)
      if (respResult.value.status === 200) {
        fetchUsers()
      }
    }

    const viewUser = item => {
      context.root.$router.push({ name: 'users-edit', params: { id: item.id } })
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
      sortBy,
      perPage,
      filters,
      dataMeta,
      viewUser,
      fetchUsers,
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
      resolveUserStatusVariant,
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
