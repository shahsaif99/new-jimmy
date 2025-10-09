<template>
  <div>
    <b-card no-body class="mb-0">
      <div class="m-2">
        <b-card-title>
          {{ t('Equipments') }}
        </b-card-title>
      </div>
      <b-overlay id="overlay-background" :show="busy" variant="transparent" rounded="sm">
        <b-table ref="refListTable" class="position-relative" :items="equipments" responsive :fields="tableColumns"
          primary-key="id" :sort-by.sync="sortBy" show-empty :empty-text="t('No matching records found')"
          :sort-desc.sync="isSortDirDesc" tbody-tr-class="item-row">
          <template #cell(actions)="data">
            <b-dropdown variant="link" no-caret>
              <template #button-content>
                <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
              </template>
              <b-dropdown-item @click="editEquipment(data.item)" v-if="$can('equipments-delete', 'all')">
                <feather-icon icon="EditIcon" />
                <span class="align-middle ml-50">{{ t('Edit') }}</span>
              </b-dropdown-item>
              <b-dropdown-item @click="confirmDelete(data.item.id)" v-if="$can('equipments-delete', 'all')">
                <feather-icon icon="TrashIcon" />
                <span class="align-middle ml-50">{{ t('Delete') }}</span>
              </b-dropdown-item>
            </b-dropdown>
          </template>
          <template #cell(category)="data">
            {{ data.item.category.name }}
          </template>
        </b-table>
      </b-overlay>
      <div class="mx-2 mb-2">
        <b-row>
          <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-start">
            <span class="text-muted">{{ t('Showing') }} {{ dataMeta.from }} to {{ dataMeta.to }} of
              {{ dataMeta.of }} {{ t('entries') }}</span>
          </b-col>
          <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-end">
            <b-pagination v-model="currentPage" :total-rows="totalRecords" :per-page="perPage" first-number last-number
              class="mb-0 mt-1 mt-sm-0" prev-class="prev-item" next-class="next-item">
              <template #prev-text>
                <feather-icon icon="ChevronLeftIcon" size="18" />
              </template>
              <template #next-text>
                <feather-icon icon="ChevronRightIcon" size="18" />
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
  BPagination,
  BDropdown,
  BCardTitle,
  BDropdownItem,
} from 'bootstrap-vue'
import { onMounted } from '@vue/composition-api'
// eslint-disable-next-line import/no-cycle
import useEquipments from '@/composables/equipments'
import { useUtils as useI18nUtils } from '@core/libs/i18n'


export default {
  components: {
    // Export,
    BCol,
    BRow,
    BCard,
    BTable,
    BOverlay,
    BPagination,
    BDropdown,
    BCardTitle,
    BDropdownItem,
  },
  setup() {
    const {
      busy,
      sortBy,
      filters,
      perPage,
      student,
      dataMeta,
      equipments,
      refetchData,
      searchQuery,
      currentPage,
      totalRecords,
      refListTable,
      isSortDirDesc,
      perPageOptions,
      fetchEquipments,
    } = useEquipments()

    const { t } = useI18nUtils()

    const tableColumns = [
      { key: 'id', sortable: false },
      { key: 'name', sortable: true },
      { key: 'category', sortable: false },
      { key: 'valid_until', sortable: false },
      //   { key: 'actions' },
    ]


    onMounted(() => {
      filters.isExpiring = true
      fetchEquipments()
    })


    return {
      t,
      busy,
      sortBy,
      student,
      perPage,
      dataMeta,
      refetchData,
      searchQuery,
      equipments,
      currentPage,
      tableColumns,
      totalRecords,
      refListTable,
      isSortDirDesc,
      perPageOptions,
    }
  },
}
</script>
