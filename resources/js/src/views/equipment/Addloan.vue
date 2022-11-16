<template>
  <div>
    <b-card>
      <div>
        <div>
          <h2 class="mt-2">
            Register new equipment
          </h2>
        </div>
        <b-row>
          <b-col
            cols="6"
            md="6"
          >
            <div
              class="d-flex align-items-center justify-content-end"
            >
              <b-form-input
                v-model="FormData.LendingDate"
                class="d-inline-block mr-1 md-2 mt-3"
                placeholder="Lending Date"
                required
              />
            </div>
          </b-col>
          <b-col
            cols="6"
            md="6"
          >
            <div
              class="d-flex align-items-center justify-content-end"
            >
              <b-form-input
                v-model="FormData.ReturnedDate"
                class="d-inline-block mr-1 md-2 mt-3"
                placeholder="Returned Date"
              />
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col
            cols="6"
            md="6"
          >
            <div
              class="d-flex align-items-center justify-content-end"
            >
              <b-form-input
                v-model="FormData.LoanedTo"
                class="d-inline-block mr-1 md-2 mt-3"
                placeholder="Loaned To"
              />
            </div>
          </b-col>
          <b-col
            cols="6"
            md="6"
          >
            <div
              class="d-flex align-items-center justify-content-end"
            >
              <b-form-input
                v-model="FormData.Project"
                class="d-inline-block mr-1 md-2 mt-3"
                placeholder="Project"
              />
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col
            cols="6"
            md="6"
          >
            <div
              class="d-flex align-items-center justify-content-end"
            >
              <b-form-input
                v-model="FormData.RegisteredBy"
                class="d-inline-block mr-1 md-2 mt-3"
                placeholder="Registered By"
              />
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col
            cols="6"
          >
            <div class="d-flex align-items-center justify-content-end">
              <b-button
                variant="primary"
                class="mr-2 px-5 mt-2"
              >
                <span class="text-nowrap">Submit</span>
              </b-button>
            </div>
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
  BFormInput,
  BButton,
} from 'bootstrap-vue'
import { ref } from '@vue/composition-api'
import useProspects from '@/composables/prospects'

export default {
  components: {
    // Export,
    BCol,
    BRow,
    BCard,
    BFormInput,
    BButton,
  },
  setup() {
    const {
      busy,
      sortBy,
      filters,
      perPage,
      student,
      prospects,
      dataMeta,
      refetchData,
      searchQuery,
      currentPage,
      totalRecords,
      refListTable,
      isSortDirDesc,
      perPageOptions,
    } = useProspects()
    const FormData = ref(
      {
        LendingDate: '',
        ReturnedDate: '',
        LoanedTo: '',
        Project: '',
        RegisteredBy: '',
      },
    )
    return {
      busy,
      sortBy,
      filters,
      student,
      perPage,
      prospects,
      dataMeta,
      refetchData,
      searchQuery,
      currentPage,
      totalRecords,
      refListTable,
      isSortDirDesc,
      perPageOptions,
      FormData,
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

