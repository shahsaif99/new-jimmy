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
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input
                v-model="FormData.Name"
                class="d-inline-block mr-1 md-2 mt-3"
                placeholder="Name"
              />
            </div>
          </b-col>
          <b-col
            cols="6"
            md="6"
          >
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input
                v-model="FormData.SerialNumber"
                class="d-inline-block mr-1 md-2 mt-3"
                placeholder="Serial Number"
              />
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col
            cols="6"
            md="6"
          >
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input
                v-model="FormData.Supplier"
                class="d-inline-block mr-1 md-2 mt-3"
                placeholder="Supplier"
              />
            </div>
          </b-col>
          <b-col
            cols="6"
            md="6"
          >
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input
                v-model="FormData.Category"
                class="d-inline-block mr-1 md-2 mt-3"
                placeholder="Category"
              />
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col
            cols="6"
            md="6"
          >
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input
                v-model="FormData.Supplier"
                class="d-inline-block mr-1 md-2 mt-3"
                placeholder="Certificate Number"
              />
            </div>
          </b-col>
          <b-col
            cols="6"
            md="6"
          >
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input
                v-model="FormData.Category"
                class="d-inline-block mr-1 md-2 mt-3"
                placeholder="Valid Until"
              />
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col
            xl="12"
            sm="12"
          >
            <h2 class="mt-3 mr-1 md-2">
              Files
            </h2>
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
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-button
              variant="primary"
              class="mt-2 w-100"
            >
              <span class="text-nowrap">Upload</span>
            </b-button>
          </b-col>
          <b-col>
            <b-button
              variant="primary"
              class="mt-2 w-100"
            >
              <span class="text-nowrap">Delete</span>
            </b-button>
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
  BTable,
  BButton,
  BOverlay,
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
    BTable,
    BButton,
    BOverlay,
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
        Name: '',
        SerialNumber: '',
        Supplier: '',
        Category: '',
        CertificateNo: '',
        ValidUntil: '',
      },
    )
    const tableColumns = [
      { key: 'Title' },
      { key: 'Created' },
      { key: 'View' },
      { key: 'File' },
    ]
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
      tableColumns,
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
