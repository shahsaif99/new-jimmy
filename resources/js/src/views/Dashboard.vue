<!-- eslint-disable vue/no-parsing-error -->
<template>
  <b-card>
    <h2>
      Information board
    </h2>
    <b-row>
      <b-col
        cols="12"
        md="12"
      >
        <div class="d-flex align-items-center justify-content-end">
          <b-button
            variant="primary"
            class="mb-1"
          >
            <span class="text-nowrap">Add new</span>
          </b-button>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col
        xl="12"
        sm="12"
      >

        <b-table
          striped
          ref="refListTable"
          class="position-relative"
          :items="StaticData"
          :fields="tableColumns"
          primary-key="id"
          show-empty
          empty-text="No matching records found"
          :sort-desc.sync="isSortDirDesc"
        />
      </b-col>
      <b-col
        cols="12"
        sm="6"
        class="d-flex align-items-center justify-content-center justify-content-sm-end"
      />
    </b-row>
  </b-card>
</template>


<script>
import useLeads from '@/composables/leads'
import { onMounted, ref } from '@vue/composition-api'
import {
  BCard, BTable, VBTooltip, BButton, BRow, BCol,
} from 'bootstrap-vue'


export default {
  components: {
    BCard,
    BTable,
    BButton,
    BRow,
    BCol,

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
