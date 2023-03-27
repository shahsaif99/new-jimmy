<template>
  <div>
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
              v-if="$can('equipment-add', 'all')"
              @click="isAddEquipmentActive = true"
              class="ml-2"
            >
              <span class="text-nowrap">Add New Equipment</span>
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
          @row-clicked="viewEquipment"
          tbody-tr-class="item-row"
        >
          <template #head()="data">
            <span>{{ $t(data.label) }}</span>
          </template>
          <template #cell(lending)="data">
            <b-button
              variant="flat-primary"
              size="sm"
              @click="lendingEquipment(data.item)"
            >
              Show
            </b-button>
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
                @click="viewEquipment(data.item)"
              >
                <feather-icon icon="EyeIcon" />
                <span class="align-middle ml-50">View</span>
              </b-dropdown-item>
              <b-dropdown-item
                @click="editEquipment(data.item)"
                v-if="$can('handbooks-edit', 'all')"
              >
                <feather-icon icon="EditIcon" />
                <span class="align-middle ml-50">{{ t('Edit') }}</span>
              </b-dropdown-item>
              <b-dropdown-item
                @click="confirmDelete(data.item.id)"
                v-if="$can('handbooks-delete', 'all')"
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
    BDropdownItem,
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
    const isAddEquipmentActive = ref(false)
    const isEditEquipmentActive = ref(false)
    const isEquipmentDetailsActive = ref(false)
    const isShowLendingHistoryActive = ref(false)
    const equipment = ref({})

    const deleteConfirmed = async id => {
      await deleteEquipment(id)
      if (respResult.value.status === 200) {
        fetchHandbooks()
      }
    }


    const editEquipment = item => {
      equipment.value = item
      isEditEquipmentActive.value = true
    }

    const viewEquipment = data => {
      isEquipmentDetailsActive.value = true
      equipment.value = data
    }


    const lendingEquipment = data => {
      isShowLendingHistoryActive.value = true
      equipment.value = data
    }

    const confirmDelete = async id => {
      root.$bvModal
        .msgBoxConfirm(i18n.t('Please confirm that you want to delete equipment.'), {
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
      equipment,
      refetchData,
      searchQuery,
      handbooks,
      currentPage,
      tableColumns,
      totalRecords,
      refListTable,
      isSortDirDesc,
      viewEquipment,
      editEquipment,
      confirmDelete,
      perPageOptions,
      isExportActive,
      fetchHandbooks,
      deleteEquipment,
      lendingEquipment,
      isAddEquipmentActive,
      isEditEquipmentActive,
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
