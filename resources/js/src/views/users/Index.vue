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
            <label>{{ t('Show') }}</label>
            <v-select
              v-model="perPage"
              :options="perPageOptions"
              :clearable="false"
              class="per-page-selector d-inline-block mx-50"
            />
            <label>{{ t('entries') }}</label>
            <b-button
              class="d-inline-block ml-1"
              v-if="$can('manage-users', 'all')"
              variant="primary"
              @click="$router.push({ name: 'users-add' })"
            >
              <span class="text-nowrap">{{ t('Add User') }}</span>
            </b-button>

          </b-col>

          <!-- Search -->
          <!-- <b-col
            cols="12"
            md="4"
          >
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input
                v-model="searchQuery"
                class="d-inline-block mr-1"
                :placeholder="t('Search...')"
              />
              <b-button
                class="d-inline-block ml-1"
                variant="primary"
                @click="isExportActive = true"
              >
                <span class="text-nowrap">{{ t('Export') }}</span>
              </b-button>
            </div>
          </b-col> -->
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
          :empty-text="t('No matching records found')"
          :sort-desc.sync="isSortDirDesc"
        >
          <template #head()="data">
            <span>{{ $t(data.label) }}</span>
          </template>

          <template #cell(name)="data">
            <b-media vertical-align="center">
              <template #aside>
                <b-avatar
                  size="32"
                  :src="data.item.avatar"
                  :text="avatarText(data.item.name)"
                  :variant="`light-${resolveUserRoleVariant(data.item.roles[0].name)}`"
                  :to="{ name: 'users-edit', params: { id: data.item.id } }"
                />
              </template>
              <b-link
                :to="{ name: 'users-edit', params: { id: data.item.id } }"
              >
                {{ data.item.name }}
              </b-link>
            </b-media>
          </template>

          <template #cell(status)="data">
            <b-badge
              pill
              :variant="`light-${resolveUserStatusVariant(data.item.status)}`"
              class="text-capitalize"
            >
              {{ data.item.status ? $t('Active') : $t('Inactive') }}
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

          <template #cell(employement_date)="data">
            <span v-if="data.item.employement_date">{{ moment(data.item.employement_date).format('YYYY.MM.DD') }}</span>
          </template>

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
              <span class="align-text-top text-capitalize">{{ $t(data.item.roles[0].name) }}</span>
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
            <!-- <b-tooltip
              :title="t('Edit User')"
              :target="`user-row-${data.item.id}-pencil-icon`"
            /> -->
            <feather-icon
              :id="`user-row-${data.item.id}-trash-icon`"
              icon="TrashIcon"
              class="cursor-pointer"
              size="16"
              @click="confirmDelete(data.item.id)"
              v-if="$can('manage-users', 'all')"
            />
            <!-- <b-tooltip
              :title="t('Delete User')"
              :target="`user-row-${data.item.id}-trash-icon`"
            /> -->

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
import { ref, onMounted } from '@vue/composition-api'
import {
  BAvatar, BButton, BCard, BCol, BLink, BBadge, BMedia,
  BOverlay, BPagination, BRow, BTable,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import route from 'ziggy-js'
import moment from 'moment'
import useUsers from '@/composables/users'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import { avatarText } from '@core/utils/filter'
import Export from '../Export.vue'

export default {
  components: {
    Export,
    BMedia,
    BOverlay,
    BCard,
    BRow,
    BLink,
    BCol,
    BButton,
    BTable,
    BBadge,
    BAvatar,
    vSelect,
    BPagination,
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

    const { t } = useI18nUtils()

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
      // {{ t(' Update User') }} status by axios
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
        .msgBoxConfirm(t('Please confirm that you want to delete user.'), {
          title: t('Please Confirm'),
          size: 'sm',
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
      user,
      route,
      users,
      sortBy,
      moment,
      perPage,
      filters,
      dataMeta,
      viewUser,
      fetchUsers,
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
