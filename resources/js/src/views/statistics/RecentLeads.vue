<template>
  <b-card
    no-body
    class="mb-0"
    style="min-height:350px"
  >
    <add-lead
      :is-add-lead-active.sync="isAddLeadActive"
      @refetch-data="fetchLeads"
      v-if="isAddLeadActive"
    />
    <div class="m-2">
      <h4>Recent Leads</h4>
    </div>
    <b-table
      ref="refListTable"
      class="position-relative"
      :items="leads"
      :fields="tableColumns"
      primary-key="id"
      show-empty
      empty-text="No matching records found"
      :sort-desc.sync="isSortDirDesc"
    />
  </b-card>
</template>

<script>
import useLeads from '@/composables/leads'
import { onMounted, ref } from '@vue/composition-api'
import {
  BCard, BTable, VBTooltip,
} from 'bootstrap-vue'
import AddLead from '../leads/AddLead.vue'


export default {
  components: {
    BCard,
    BTable,
    AddLead,
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
      { key: 'name', sortable: true },
      { key: 'email', sortable: true },
      { key: 'created_at', sortable: false, label: 'Date added' },
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
    }
  },
}
</script>

