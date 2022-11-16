<template>
  <div>
    <b-card>
      <h2>
        The company's document center
      </h2>
      <b-row class="align-items-end match-height">
        <b-col
          cols="3"
          md="3"
        >
          <b-form-input
            class="d-inline-block mr-1"
            placeholder="Search in tags"
          />
        </b-col>
        <b-col>
          <div
            class="d-flex align-items-center justify-content-end mt-2"
          >
            <b-form-input
              class="d-inline-block mr-1"
              placeholder="Search Field"
            />
          </div>
        </b-col>
        <b-col
          cols="auto"
        >
          <div class="d-flex align-items-center justify-content-end">
            <b-button
              variant="primary"
              class="mr-2 px-5"
            >
              <span class="text-nowrap">Add</span>
            </b-button>
            <b-button
              variant="primary"
              class="px-5"
            >
              <span class="text-nowrap">Edit</span>
            </b-button>
          </div>
        </b-col>
      </b-row>
      <b-row class="match-height">
        <b-col lg="3">
          <b-card-body>
            <div
              v-for="browser in StaticData"
              :key="browser.name"
              class="mt-2"
            >
              {{ browser.name }}
              <div
                v-for="(h,index) in browser.metaData"
                :key="h"
                class="mt-1"
              >
                <ol>
                  {{ index }}  {{ h }}
                </ol>
              </div>
            </div>
          </b-card-body>
        </b-col>
        <b-col lg="8">
          <b-row>
            <b-col lg="7">
              <b-table
                striped
                ref="refListTable"
                class="position-relative mt-2"
                :fields="tableColumns"
                primary-key="id"
                show-empty
                empty-text="No matching records found"
                :sort-desc.sync="isSortDirDesc"
              />
            </b-col>
            <b-col lg="5">
              <b-table
                striped
                ref="refListTable"
                class="position-relative mt-2"
                :fields="tableColumns"
                primary-key="id"
                show-empty
                empty-text="No matching records found"
                :sort-desc.sync="isSortDirDesc"
              />
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import useLeads from '@/composables/leads'
import { onMounted, ref } from '@vue/composition-api'
import {
  BCard, VBTooltip, BFormInput, BRow, BCol, BButton, BTable,
} from 'bootstrap-vue'


export default {
  components: {
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,

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

    const StaticData = [
      {
        name: 'Bedrift',
        metaData: {
          1.1: 'Hello',
          1.2: 'John',
          1.3: 'Wow',
          1.4: 'Hello',
        },
      },
      {
        name: 'Bedrift',
        metaData: {
          1.1: 'Hello',
          1.2: 'Ben',
          1.3: 'Wow',
          1.4: 'Hello',
        },
      },
      {
        name: 'Bedrift',
        metaData: {
          1.1: 'Hello',
          1.2: 'Dan',
          1.3: 'Wow',
          1.4: 'Hello',
        },
      },
      {
        name: 'Bedrift',
        metaData: {
          1.1: 'Hello',
          1.2: 'Willy',
          1.3: 'Wow',
          1.4: 'Hello',
        },
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
      refListTable,
      isSortDirDesc,
      perPageOptions,
      isAddLeadActive,
      StaticData,
    }
  },
}
</script>
