<template>
  <div>
    <EditAvvikListing
      :is-edit-avvik-listing-active.sync="isEditAvvikListingActive"
      v-if="isEditAvvikListingActive"
      :avvik-listing-id="avvikData.id"
      @refetch-data="fetchAvvikListings"
    />
    <CreateAvvikListing
      :is-add-avvik-listing-active.sync="isAddAvvikListingActive"
      v-if="isAddAvvikListingActive"
      @refetch-data="fetchAvvikListings"
    />
    <!-- <b-row>
      <b-col
        cols="12"
        md="3"
      >
        <statistic-card-horizontal
          icon="CalendarIcon"
          statistic="test"
          statistic-title="test"
        />
      </b-col>
    </b-row> -->
    <b-card
      no-body
      class="mb-0"
    >

      <div class="m-2">
        <b-card-title>
          Avvik / RUH
        </b-card-title>
        <b-row>

          <b-col
            cols="12"
            md="4"
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
              @click="isAddAvvikListingActive = true"
              class="ml-2"
            >
              <span class="text-nowrap">Add Avvik / RUH</span>
            </b-button>
          </b-col>
          <b-col
            cols="12"
            md="2"
            class="mb-md-0 mb-2"
          >
            <flat-pickr
              :config="pickerConfig"
              id="month"
              class="form-control"
              :placeholder="t('Select Date Range')"
              v-model="filters.range"
            />
          </b-col>
          <b-col
            cols="12"
            md="2"
            class="mb-md-0 mb-2"
          >
            <b-button
              variant="primary"
              @click="filterRecords"
            >
              {{ t('Filter') }}
            </b-button>
            <b-button
              variant="warning"
              @click="resetFilter"
            >
              {{ t('Reset') }}
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
          :items="avvikruhListings"
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
          <template #cell(status)="data">
            <span>{{ data.item.close_date ? t('Closed') : t('Open') }}</span>
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
              <!-- <b-dropdown-item
                @click="viewEquipment(data.item)"
              >
                <feather-icon icon="EyeIcon" />
                <span class="align-middle ml-50">View</span>
              </b-dropdown-item> -->
              <b-dropdown-item
                @click="editAvvikListing(data.item)"
                v-if="$can('avvik-edit', 'all')"
              >
                <feather-icon icon="EditIcon" />
                <span class="align-middle ml-50">{{ t('Edit') }}</span>
              </b-dropdown-item>
              <b-dropdown-item
                @click="confirmDelete(data.item.id)"
                v-if="$can('avvik-delete', 'all')"
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
import useAvvikRuh from '@/composables/avvikRuh'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import i18n from '@/libs/i18n'
import flatPickr from 'vue-flatpickr-component'
import StatisticCardHorizontal from '@core/components/statistics-cards/StatisticCardHorizontal.vue'
import CreateAvvikListing from './Create.vue'
import EditAvvikListing from './Edit.vue'

export default {
  components: {
    BCol,
    BRow,
    BCard,
    BTable,
    BButton,
    vSelect,
    BOverlay,
    flatPickr,
    BFormInput,
    BPagination,
    BDropdown,
    BCardTitle,
    BDropdownItem,
    EditAvvikListing,
    CreateAvvikListing,
    StatisticCardHorizontal,
  },
  setup(_, { root }) {
    const {
      busy,
      sortBy,
      filters,
      perPage,
      student,
      dataMeta,
      avvikruhListings,
      respResult,
      refetchData,
      searchQuery,
      currentPage,
      tableColumns,
      totalRecords,
      refListTable,
      isSortDirDesc,
      perPageOptions,
      deleteAvvikListing,
      fetchAvvikListings,
    } = useAvvikRuh()
    const { t } = useI18nUtils()

    onMounted(() => {
      fetchAvvikListings()
    })

    const isExportActive = ref(false)
    const isAddAvvikListingActive = ref(false)
    const isEditAvvikListingActive = ref(false)
    const avvikData = ref({})

    const deleteConfirmed = async id => {
      await deleteAvvikListing(id)
      if (respResult.value.status === 200) {
        fetchAvvikListings()
      }
    }

    const editAvvikListing = item => {
      avvikData.value = item
      isEditAvvikListingActive.value = true
    }

    const confirmDelete = async id => {
      root.$bvModal
        .msgBoxConfirm(i18n.t('Please confirm that you want to delete avvik.'), {
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


    const filterRecords = () => {
      fetchAvvikListings()
    }

    const resetFilter = () => {
      Object.keys(filters).forEach(index => { filters[index] = null })
      fetchAvvikListings()
    }


    const pickerConfig = {
      mode: 'range',
      dateFormat: 'Y-m-d',
    }


    return {
      t,
      busy,
      sortBy,
      filters,
      student,
      perPage,
      dataMeta,
      avvikData,
      filterRecords,
      refetchData,
      resetFilter,
      searchQuery,
      avvikruhListings,
      currentPage,
      tableColumns,
      pickerConfig,
      totalRecords,
      refListTable,
      isSortDirDesc,
      editAvvikListing,
      confirmDelete,
      perPageOptions,
      isExportActive,
      fetchAvvikListings,
      deleteAvvikListing,
      isAddAvvikListingActive,
      isEditAvvikListingActive,
    }
  },
}
</script>
<style lang="scss" >
    .per-page-selector {
        width: 90px;
    }
</style>

<style lang="scss">
@import '~flatpickr/dist/flatpickr.css';
@import '~@core/scss/vue/libs/vue-select.scss';
</style>
