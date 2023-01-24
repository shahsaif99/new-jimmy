<template>
  <div>
    <edit-absence-type
      :is-edit-absence-type-active.sync="isEditAbsenceTypeActive"
      v-if="isEditAbsenceTypeActive"
      :absence-type="absenceType"
      @refetch-data="fetchAbsenceTypes"
    />
    <add-absence-type
      :is-add-absence-type-active.sync="isAddAbsenceTypeActive"
      v-if="isAddAbsenceTypeActive"
      @refetch-data="fetchAbsenceTypes"
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
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="perPageOptions"
              :clearable="false"
              class="per-page-selector d-inline-block mx-50"
            />
            <label>{{ t('entries') }}</label>
            <b-button
              variant="primary"
              @click="isAddAbsenceTypeActive = true"
              v-if="$can('manage-settings', 'all')"
              class="ml-3"
            >
              <span class="text-nowrap">{{ $t('Add Absence Type') }}</span>
            </b-button>
          </b-col>
          <b-col
            cols="12"
            md="4"
          >
            <div
              class="d-flex align-items-center justify-content-end"
            >
              <b-form-input
                v-model="searchQuery"
                class="d-inline-block mr-1"
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
          :items="absenceTypes"
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
              <b-dropdown-item
                @click="editAbsenceType(data.item)"
              >
                <feather-icon icon="EditIcon" />
                <span class="align-middle ml-50">{{ t('Edit') }}</span>
              </b-dropdown-item>
              <b-dropdown-item
                @click="confirmDelete(data.item.id)"
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
  BButton,
  BDropdown,
  BFormInput,
  BPagination,
  BDropdownItem,
} from 'bootstrap-vue'
import { ref, onMounted } from '@vue/composition-api'
import vSelect from 'vue-select'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import i18n from '@/libs/i18n'
import useSettingsAbsenceTypes from '@/composables/settingsAbsenceTypes'

import AddAbsenceType from './dialogs/AddAbsenceType.vue'
import EditAbsenceType from './dialogs/EditAbsenceType.vue'

export default {
  components: {
    BCol,
    BRow,
    BCard,
    BTable,
    vSelect,
    BButton,
    BOverlay,
    BDropdown,
    BFormInput,
    BPagination,
    BDropdownItem,
    AddAbsenceType,
    EditAbsenceType,
  },
  setup(_, { root }) {
    const {
      busy,
      sortBy,
      filters,
      perPage,
      dataMeta,
      respResult,
      refetchData,
      absenceTypes,
      searchQuery,
      tableColumns,
      currentPage,
      totalRecords,
      refListTable,
      deleteAbsenceType,
      isSortDirDesc,
      fetchAbsenceTypes,
      perPageOptions,
    } = useSettingsAbsenceTypes()

    const { t } = useI18nUtils()


    onMounted(() => {
      fetchAbsenceTypes()
    })
    const isExportActive = ref(false)
    const isAddAbsenceTypeActive = ref(false)
    const isEditAbsenceTypeActive = ref(false)
    const absenceType = ref({})
    const deleteConfirmed = async id => {
      await deleteAbsenceType(id)
      if (respResult.value.status === 200) {
        fetchAbsenceTypes()
      }
    }

    const editAbsenceType = item => {
      absenceType.value = item
      isEditAbsenceTypeActive.value = true
    }

    const confirmDelete = async id => {
      root.$bvModal
        .msgBoxConfirm(i18n.t('Please confirm that you want to delete absence type.'), {
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
      absenceType,
      perPage,
      absenceTypes,
      dataMeta,
      refetchData,
      editAbsenceType,
      searchQuery,
      currentPage,
      tableColumns,
      totalRecords,
      refListTable,
      isSortDirDesc,
      confirmDelete,
      perPageOptions,
      isExportActive,
      fetchAbsenceTypes,
      isAddAbsenceTypeActive,
      isEditAbsenceTypeActive,
    }
  },
}
</script>
  <style scoped>
  .per-page-selector {
    width: 90px;
  }
  </style>

  <style lang="scss">
  @import '~@core/scss/vue/libs/vue-select.scss';
  </style>
