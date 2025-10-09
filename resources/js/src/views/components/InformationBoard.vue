<template>
  <b-card no-body>
    <AddDashboardInformation
      :is-dashboard-active.sync="isDashboardActive"
      v-if="isDashboardActive"
      @refetch-data="fetchBoardInformation()"
    />

    <div class="m-2">
      <b-card-title>
        {{ t('Information Board') }}
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
            v-if="$can('boardinformation-add', 'all')"
            @click="isDashboardActive = true"
            class="ml-2"
          >
            <span class="text-nowrap">{{ t('Add New') }}</span>
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
        :items="items"
        responsive
        :fields="tableColumns"
        primary-key="id"
        :sort-by.sync="sortBy"
        show-empty
        :empty-text="t('No matching records found')"
        :sort-desc.sync="isSortDirDesc"
      />
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
          >Showing {{ dataMeta.from }} to {{ dataMeta.to }} of
            {{ dataMeta.of }} entries</span>
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
</template>


<script>
import { ref, onMounted } from '@vue/composition-api'
import {
  BCard, BTable, VBTooltip, BButton, BRow, BCol, BCardTitle, BPagination, BOverlay, BFormInput,
} from 'bootstrap-vue'
import useInformationBoard from '@/composables/informationBoard'
import vSelect from 'vue-select'
// eslint-disable-next-line import/no-cycle
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import AddDashboardInformation from './AddNewInformation.vue'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BTable,
    vSelect,
    BButton,
    BFormInput,
    BOverlay,
    BCardTitle,
    BPagination,
    AddDashboardInformation,
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  setup() {
    const {
      busy,
      sortBy,
      perPage,
      columns,
      items,
      dataMeta,
      staticData,
      respResult,
      searchQuery,
      currentPage,
      tableColumns,
      refListTable,
      documentData,
      totalRecords,
      isSortDirDesc,
      perPageOptions,
      documentFields,
      fetchBoardInformation,

    } = useInformationBoard()

    const { t } = useI18nUtils()


    onMounted(() => {
      fetchBoardInformation()
    })

    const isAddLeadActive = ref(false)
    const isDashboardActive = ref(false)

    return {
      t,
      busy,
      items,
      sortBy,
      perPage,
      dataMeta,
      columns,
      searchQuery,
      currentPage,
      totalRecords,
      staticData,
      respResult,
      documentData,
      refListTable,
      perPageOptions,
      isSortDirDesc,
      isAddLeadActive,
      documentFields,
      isDashboardActive,
      tableColumns,
      fetchBoardInformation,
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
