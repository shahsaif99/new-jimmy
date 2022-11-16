<!-- eslint-disable vue/no-parsing-error -->
<template>
  <b-card>
    <h2 class="mb-2">
      Information board
    </h2>
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
            class="d-inline-block mr-1 md-2 md-2"
            placeholder="Search..."
          />
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col
        cols="12"
        md="12"
      >
        <div class="d-flex align-items-center justify-content-end">
          <b-button
            variant="primary"
            class="mb-1 mt-2"
            @click="$router.push('addinformation')"
          >
            <span class="text-nowrap">Add new</span>
          </b-button>
        </div>
      </b-col>
    </b-row>
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
        :items="StaticData"
        responsive
        :fields="Columns"
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
import useLeads from '@/composables/leads'
import { onMounted, ref } from '@vue/composition-api'
import {
  BCard, BTable, VBTooltip, BButton, BRow, BCol, BFormInput, BPagination,
} from 'bootstrap-vue'
import vSelect from 'vue-select'


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

  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  setup() {
    const {
      sortBy,
      filters,
      perPage,
      leads,
      dataMeta,
      refetchData,
      fetchLeads,
      searchQuery,
      currentPage,
      totalRecords,
      refListTable,
      isSortDirDesc,
      perPageOptions,
    } = useLeads()
    const isAddLeadActive = ref(false)

    onMounted(async () => {
      fetchLeads()
    })

    const tableColumns = [
      { key: 'Information' },
      { key: 'Author' },
      { key: 'Given' },
    ]

    const StaticData = [
      {
        Information: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s ', Author: 'Ola Normann', Given: '00.00.000',
      },
      {
        Information: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ', Author: 'Ola Normann', Given: '00.00.000',
      },
      {
        Information: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form,', Author: 'Ola Normann', Given: '00.00.000',
      },
      {
        Information: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. ', Author: 'Ola Normann', Given: '00.00.000',
      },
      {
        Information: ' Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc. ', Author: 'Ola Normann', Given: '00.00.000',
      },
      {
        Information: 'All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. ', Author: 'Ola Normann', Given: '00.00.000',
      },
      {
        Information: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. ', Author: 'Ola Normann', Given: '00.00.000',
      },
      {
        Information: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. ', Author: 'Ola Normann', Given: '00.00.000',
      },
      {
        Information: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. ', Author: 'Ola Normann', Given: '00.00.000',
      },
      {
        Information: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. ', Author: 'Ola Normann', Given: '00.00.000',
      },
      {
        Information: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. ', Author: 'Ola Normann', Given: '00.00.000',
      },
      {
        Information: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. ', Author: 'Ola Normann', Given: '00.00.000',
      },
      {
        Information: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. ', Author: 'Ola Normann', Given: '00.00.000',
      },
      {
        Information: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. ', Author: 'Ola Normann', Given: '00.00.000',
      },
      {
        Information: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. ', Author: 'Ola Normann', Given: '00.00.000',
      },
    ]

    return {
      leads,
      sortBy,
      filters,
      perPage,
      dataMeta,
      fetchLeads,
      searchQuery,
      currentPage,
      refetchData,
      totalRecords,
      tableColumns,
      refListTable,
      isSortDirDesc,
      perPageOptions,
      isAddLeadActive,
      StaticData,
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

