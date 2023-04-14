<template>
  <div>
    <add-handbook
      :is-add-handbook-active.sync="isAddHandbookActive"
      @refetch-data="fetchHandbooks"
      v-if="isAddHandbookActive"
    />
    <edit-handbook
      :is-edit-handbook-active.sync="isEditHandbookActive"
      @refetch-data="fetchHandbooks"
      v-if="isEditHandbookActive"
      :handbook="handbook"
    />
    <b-card
      no-body
      class="mb-0"
    >
      <div class="m-2">
        <b-card-title>
          Handbooks
        </b-card-title>
        <b-row>
          <b-col
            cols="12"
            md="6"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          >
            <v-select
              v-model="perPage"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="perPageOptions"
              :clearable="false"
              class="per-page-selector d-inline-block mx-50"
            />
            <label>{{ t('records per page') }}</label>
            <b-button
              variant="primary"
              @click="isAddHandbookActive = true"
              class="ml-2"
            >
              <span class="text-nowrap">Add New Handbook</span>
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
          :items="handbooks"
          responsive
          :fields="tableColumns"
          primary-key="id"
          :sort-by.sync="sortBy"
          show-empty
          :empty-text="t('No matching records found')"
          :sort-desc.sync="isSortDirDesc"
          tbody-tr-class="item-row"
        >
          <template #head()="data">
            <span>{{ $t(data.label) }}</span>
          </template>
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
                :to="{
                  name: 'handbooks-view',
                  params: {
                    id: data.item.id
                  }
                }"
              >
                <feather-icon icon="EyeIcon" />
                <span class="align-middle ml-50">View</span>
              </b-dropdown-item>
              <b-dropdown-item @click="editHandbook(data.item)">
                <feather-icon icon="EditIcon" />
                <span class="align-middle ml-50">{{ t('Edit') }}</span>
              </b-dropdown-item>
              <!-- <b-dropdown-item
                @click="confirmDelete(data.item.id)"
                v-if="$can('handbooks-delete', 'all')"
              >
                <feather-icon
                  icon="TrashIcon"
                />
                <span class="align-middle ml-50">{{ t('Delete') }}</span>
              </b-dropdown-item> -->
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
  BCard,
  BRow,
  BCol,
  BTable,
  BOverlay,
  BFormInput,
  BPagination,
  BButton,
  BDropdown,
  BCardTitle,
  BDropdownItem,
} from 'bootstrap-vue'
import { ref, onMounted } from '@vue/composition-api'
import vSelect from 'vue-select'
// eslint-disable-next-line import/no-cycle
import useHandbooks from '@/composables/handbooks'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import i18n from '@/libs/i18n'
import AddHandbook from './AddHandbook.vue'
import EditHandbook from './EditHandbook.vue'

export default {
  components: {
    // Export,
    BCol,
    BRow,
    BCard,
    BTable,
    BButton,
    vSelect,
    BOverlay,
    BFormInput,
    BPagination,
    BDropdown,
    BCardTitle,
    EditHandbook,
    BDropdownItem,
    AddHandbook,
  },
  setup(_, { root }) {
    const {
      busy,
      sortBy,
      filters,
      perPage,
      student,
      dataMeta,
      handbooks,
      respResult,
      refetchData,
      searchQuery,
      currentPage,
      tableColumns,
      totalRecords,
      refListTable,
      isSortDirDesc,
      perPageOptions,
      deleteEquipment,
      fetchHandbooks,
    } = useHandbooks()
    const { t } = useI18nUtils()

    onMounted(() => {
      fetchHandbooks()
    })

    const isExportActive = ref(false)
    const isAddHandbookActive = ref(false)
    const isEditHandbookActive = ref(false)
    const isEquipmentDetailsActive = ref(false)
    const isShowLendingHistoryActive = ref(false)
    const handbook = ref({})

    const editHandbook = handbookObj => {
      handbook.value = handbookObj
      isEditHandbookActive.value = true
    }

    const deleteConfirmed = async id => {
      await deleteEquipment(id)
      if (respResult.value.status === 200) {
        fetchHandbooks()
      }
    }

    const confirmDelete = async id => {
      root.$bvModal
        .msgBoxConfirm(i18n.t('Please confirm that you want to delete handbook.'), {
          title: i18n.t('Please Confirm'),
          size: 'sm',
          okTitle: i18n.t('Confirm'),
          cancelTitle: i18n.t('Cancel'),
        })
        .then(value => {
          if (value) {
            deleteConfirmed(id)
          }
        })
    }


    return {
      t,
      busy,
      sortBy,
      filters,
      student,
      perPage,
      dataMeta,
      handbook,
      refetchData,
      searchQuery,
      handbooks,
      editHandbook,
      currentPage,
      tableColumns,
      totalRecords,
      refListTable,
      isSortDirDesc,
      confirmDelete,
      perPageOptions,
      isExportActive,
      fetchHandbooks,
      deleteEquipment,
      isAddHandbookActive,
      isEditHandbookActive,
      isEquipmentDetailsActive,
      isShowLendingHistoryActive,
    }
  },
}
</script>
  <style lang="scss" >
      .per-page-selector {
          width: 90px;
      }
      .item-row{
      cursor:pointer;
  }
  </style>

  <style lang="scss">
      @import '~@core/scss/vue/libs/vue-select.scss';
  </style>
