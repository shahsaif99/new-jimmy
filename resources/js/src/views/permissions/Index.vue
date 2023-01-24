<template>
  <div>
    <add-permission
      :is-add-new-permission-sidebar-active.sync="isAddNewPermissionSidebarActive"
      @refetch-data="fetchPermissions"
      v-if="isAddNewPermissionSidebarActive"
    />

    <edit-permission
      :is-edit-permission-sidebar-active.sync="isEditPermissionSidebarActive"
      @refetch-data="fetchPermissions"
      :permission="permission"
      v-if="isEditPermissionSidebarActive"
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
                :placeholder="t('Search...')"
              />
              <b-button
                variant="primary"
                @click="isAddNewPermissionSidebarActive = true"
              >
                <span class="text-nowrap">{{ t('Add Permission') }}</span>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </div>

      <b-table
        ref="refListTable"
        class="position-relative"
        :items="permissions"
        responsive
        :fields="tableColumns"
        primary-key="id"
        :sort-by.sync="sortBy"
        show-empty
        :empty-text="t('No matching records found')"
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
            <b-dropdown-item @click="editPermission(data.item)">
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">{{ t('Edit') }}</span>
            </b-dropdown-item>
            <b-dropdown-item @click="confirmDelete(data.item.id)">
              <feather-icon
                icon="TrashIcon"
              />
              <span class="align-middle ml-50">{{ t('Delete') }}</span>
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
import usePermissions from '@/composables/permissions'
import vSelect from 'vue-select'
import { ref, onMounted } from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import i18n from '@/libs/i18n'
import AddPermission from './AddPermission.vue'
import EditPermission from './EditPermission.vue'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BTable,
    vSelect,
    BButton,
    BDropdown,
    BFormInput,
    BPagination,
    BDropdownItem,
    AddPermission,
    EditPermission,
  },
  directives: {
    Ripple,
    'b-toggle': VBToggle,
  },
  setup(props, { root }) {
    const {
      permissions,
      sortBy,
      perPage,
      dataMeta,
      fetchPermissions,
      respResult,
      deletePermission,
      currentPage,
      searchQuery,
      totalRecords,
      tableColumns,
      isSortDirDesc,
      perPageOptions,
    } = usePermissions()

    const { t } = useI18nUtils()


    onMounted(() => {
      fetchPermissions()
    })
    const isAddNewPermissionSidebarActive = ref(false)
    const isEditPermissionSidebarActive = ref(false)
    const permission = ref({})
    const editPermission = dataPermission => {
      permission.value = dataPermission
      isEditPermissionSidebarActive.value = true
    }
    const deletePermissionConfirmed = async id => {
      await deletePermission(id)
      if (respResult.value.status === 200) {
        fetchPermissions()
      }
    }

    const confirmDelete = async id => {
      root.$bvModal
        .msgBoxConfirm(i18n.t('Please confirm that you want to delete permission.'), {
          title: i18n.t('Please Confirm'),
          okVariant: 'primary',
          okTitle: i18n.t('Yes, Delete It'),
          cancelTitle: i18n.t('No'),
          cancelVariant: 'outline-secondary',
          centered: true,
          
        })
        .then(value => {
          if (value) {
            deletePermissionConfirmed(id)
          }
        })
    }

    return {
      t,
      permission,
      permissions,
      editPermission,
      sortBy,
      perPage,
      dataMeta,
      currentPage,
      isSortDirDesc,
      searchQuery,
      fetchPermissions,
      totalRecords,
      confirmDelete,
      tableColumns,
      perPageOptions,
      isEditPermissionSidebarActive,
      isAddNewPermissionSidebarActive,
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
