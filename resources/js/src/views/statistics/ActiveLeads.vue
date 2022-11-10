<template>
  <b-card
    no-body
    class="mb-0"
  >
    <AssignBroker
      v-if="isAssignBrokerActive"
      @refetch-data="fetchLeads"
      :lead-id="leadId"
      :is-assign-broker-active.sync="isAssignBrokerActive"
    />
    <add-lead
      :is-add-lead-active.sync="isAddLeadActive"
      @refetch-data="fetchLeads"
      v-if="isAddLeadActive"
    />
    <edit-lead
      :is-edit-lead-active.sync="isEditLeadActive"
      @refetch-data="fetchLeads"
      v-if="isEditLeadActive"
      :lead-data="leadData"
    />
    <div class="m-2">
      <b-row>
        <b-col
          cols="12"
          md="6"
          class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        >
          <h4>Active Leads</h4>
        </b-col>
        <b-col
          cols="12"
          md="6"
        >
          <div
            class="d-flex align-items-center justify-content-end"
          >
            <b-button
              class="d-inline-block ml-1"
              variant="primary"
              @click="isAddLeadActive = true"
            >
              <span class="text-nowrap">Add New</span>
            </b-button>

          </div>
        </b-col>
      </b-row>
    </div>
    <b-table
      ref="refListTable"
      class="position-relative"
      :items="leads"
      :fields="tableColumns"
      primary-key="id"
      show-empty
      responsive
      empty-text="No matching records found"
      :sort-desc.sync="isSortDirDesc"
    >

      <template #cell(id)="data">
        <b-link
          :to="{ name: 'admin-student-profile', params: { id: data.item.id }}"
          class="font-weight-bold"
        >
          {{ data.item.id }}
        </b-link>
      </template>


      <template #cell(actions)="data">
        <div class="d-flex align-items-center justify-content-center justify-content-sm-start">


          <b-button
            variant="flat-success"
            class="btn-icon rounded-circle"
            v-b-tooltip.hover.top="'Assign Broker'"
            @click="assignBroker(data.item)"
          >
            <feather-icon icon="LinkIcon" />
          </b-button>
          <b-button
            variant="flat-primary"
            class="btn-icon rounded-circle"
            v-b-tooltip.hover.top="'Edit Lead'"
            @click="editLead(data.item)"
          >
            <feather-icon icon="EditIcon" />
          </b-button>
          <b-button
            variant="flat-danger"
            class="btn-icon rounded-circle"
            v-b-tooltip.hover.top="'Edit Lead'"
            @click="confirmDelete(data.item.id)"
          >
            <feather-icon icon="TrashIcon" />
          </b-button>
        </div>
      </template>

    </b-table>
  </b-card>
</template>

<script>
import useLeads from '@/composables/leads'
import { onMounted, ref } from '@vue/composition-api'
import {
  BCard, BRow, BCol, BTable, BButton, BLink, VBTooltip,
} from 'bootstrap-vue'
import AddLead from '../leads/AddLead.vue'
import EditLead from '../leads/EditLead.vue'
import AssignBroker from '../leads/AssignBroker.vue'


export default {
  components: {
    BRow,
    BCol,
    BCard,
    BTable,
    BLink,
    BButton,
    AddLead,
    EditLead,
    AssignBroker,
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  setup(_, context) {
    const {
      sortBy,
      filters,
      perPage,
      leads,
      dataMeta,
      deleteLead,
      respResult,
      refetchData,
      fetchLeads,
      searchQuery,
      currentPage,
      totalRecords,
      tableColumns,
      refListTable,
      isSortDirDesc,
      perPageOptions,
    } = useLeads()
    const isAddLeadActive = ref(false)
    const isEditLeadActive = ref(false)
    const isAssignBrokerActive = ref(false)
    const leadId = ref('')
    const leadData = ref({})

    const assignBroker = lead => {
      isAssignBrokerActive.value = true
      leadId.value = Number(lead.id)
    }

    const editLead = data => {
      isEditLeadActive.value = true
      leadData.value = data
    }


    const deleteConfirmed = async id => {
      await deleteLead(id)
      if (respResult.value.status === 200) {
        fetchLeads()
      }
    }

    const confirmDelete = async id => {
      context.root.$bvModal
        .msgBoxConfirm('Please confirm that you want to delete the lead.', {
          title: 'Please Confirm',
          size: 'sm',
        })
        .then(value => {
          if (value) {
            deleteConfirmed(id)
          }
        })
    }

    onMounted(async () => {
      perPage.value = 5
      await fetchLeads()
    })

    return {
      leads,
      leadId,
      sortBy,
      filters,
      leadData,
      editLead,
      perPage,
      dataMeta,
      fetchLeads,
      searchQuery,
      currentPage,
      assignBroker,
      refetchData,
      totalRecords,
      tableColumns,
      refListTable,
      isSortDirDesc,
      perPageOptions,
      isAddLeadActive,
      confirmDelete,
      isEditLeadActive,
      isAssignBrokerActive,
    }
  },
}
</script>

