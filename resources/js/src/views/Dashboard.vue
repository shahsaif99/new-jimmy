<!-- eslint-disable vue/no-parsing-error -->
<template>
  <b-card>
    <h2 class="mb-2">
      Information board
    </h2>
    <div class="mb-2">
      <b-row>
        <b-col>
          <div
            class="d-flex align-items-center justify-content-end"
          >
            <b-button
              variant="primary"
              @click="isDashboardActive=true"
            >
              <span class="text-nowrap">Add new</span>
            </b-button>
            <AddDashboardInformation
              :is-dashboard-active.sync="isDashboardActive"
              v-if="isDashboardActive"
            />
          </div>
        </b-col>
      </b-row>
    </div>
    <div class="mb-2">
      <b-row>
        <b-col
          cols="12"
          md="6"
          class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        >
          <label>Show</label>
          <v-select
            v-model="perPage"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="perPageOptions"
            :clearable="false"
            class="per-page-selector d-inline-block mx-50"
          />
          <label>entries</label>
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
              placeholder="Search..."
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
        striped
        ref="refListTable"
        class="position-relative"
        :items="staticData"
        responsive
        :fields="columns"
        primary-key="id"
        :sort-by.sync="sortBy"
        show-empty
        empty-text="No matching records found"
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
import { ref } from '@vue/composition-api'
import {
  BCard, BTable, VBTooltip, BButton, BRow, BCol, BFormInput, BPagination,
} from 'bootstrap-vue'
import useDashboard from '@/composables/dashboard'
import vSelect from 'vue-select'
import AddDashboardInformation from './AddDashboardInformation.vue'


export default {
  components: {
    BCard,
    BTable,
    BButton,
    BRow,
    BCol,
    BFormInput,
    vSelect,
    BPagination,
    AddDashboardInformation,
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  setup() {
    const {
      searchQuery,
      sortBy,
      isSortDirDesc,
      refListTable,
      respResult,
      perPageOptions,
      perPage,
      dataMeta,
      totalRecords,
      currentPage,
      columns,
      staticData,
    } = useDashboard()
    const isAddLeadActive = ref(false)


    const isDashboardActive = ref(false)


    return {
      sortBy,
      perPage,
      dataMeta,
      searchQuery,
      currentPage,
      totalRecords,
      columns,
      refListTable,
      isSortDirDesc,
      perPageOptions,
      isAddLeadActive,
      staticData,
      isDashboardActive,
      respResult,
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

