<template>
  <div>
    <edit-competence
      :is-edit-competence-active.sync="isEditCompetenceActive"
      v-if="isEditCompetenceActive"
      :competence="competence"
      @refetch-data="fetchCompetences"
      :user-data="userData"
    />
    <add-competence
      :is-add-competence-active.sync="isAddCompetenceActive"
      v-if="isAddCompetenceActive"
      @refetch-data="fetchCompetences"
      :user-data="userData"
    />
    <b-card
      no-body
      class="mb-0"
    >
      <div class="m-2">
        <b-row>
          <b-col
            cols="12"
            md="8"
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
            <b-button
              variant="primary"
              @click="isAddCompetenceActive = true"
              v-if="$can('competence-add', 'all')"
              class="ml-3"
            >
              <span class="text-nowrap">Add Competence</span>
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
                class="d-inline-block mr-1"
                placeholder="Search..."
              />
            </div>
          </b-col>
        </b-row>
      </div>
      <b-table
        ref="refListTable"
        class="position-relative competence-table"
        responsive
        :items="competences"
        primary-key="id"
        :fields="tableColumns"
        :sort-by.sync="sortBy"
        :busy="busy"
        show-empty
        empty-text="No matching records found"
        :sort-desc.sync="isSortDirDesc"
      >
        <template #row-details="row">

          <table class="w-100">
            <tr
              v-for="(item, key) in row.item.competences"
              :key="key"
            >
              <th
                class="pb-50 "
                v-if="item.competence"
              >
                <span class="font-weight-bold">{{ item.competence.name }}</span>

              </th>
              <th
                class="pb-50 text-center"
                v-if="item.competence"
              >
                <span class="font-weight-bold">{{ item.competence.completed_date }}</span>
              </th>
              <th
                class="pb-50 text-center"
                v-if="item.competence"
              >
                <span class="font-weight-bold">{{ item.competence.valid_until }}</span>
              </th>
              <!-- <th class="pb-50 text-center">

                <span
                  class="font-weight-bold"
                  v-for="(media, index) in item.competence.media"
                  :key="index"
                >
                  <b-link
                    :to="`/storage/${media.directory}/${media.filename}.${media.extension}`"
                    class="font-weight-bold"
                    target="_blank"
                    download
                  >
                    {{ media.filename }}
                  </b-link>
                </span>
              </th> -->
              <th class="pb-50 text-center">
                <!-- <b-dropdown
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
                 - <b-dropdown-item
                    @click="editCompetenceActive=true"
                  >
                    <feather-icon icon="EditIcon" />
                    <span class="align-middle ml-50">Edit</span>
                  </b-dropdown-item>
                  <b-dropdown-item
                    @click="confirmDelete(item.competence.id)"
                  >
                    <feather-icon
                      icon="TrashIcon"
                    />
                    <span class="align-middle ml-50">Delete</span>
                  </b-dropdown-item>
                </b-dropdown> -->
              </th>
            </tr>
          </table>
        </template>
      </b-table>
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
  </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BTable,
  BButton,
  BDropdown,
  BFormInput,
  BPagination,
  BDropdownItem,
} from 'bootstrap-vue'
import { ref, onMounted } from '@vue/composition-api'
import vSelect from 'vue-select'
import useCompetences from '@/composables/competences'
import AddCompetence from './dialogs/Add.vue'
import EditCompetence from './dialogs/Edit.vue'

export default {
  components: {
    BCol,
    BRow,
    BCard,
    BTable,
    vSelect,
    BButton,
    BDropdown,
    AddCompetence,
    BFormInput,
    BPagination,
    EditCompetence,
    BDropdownItem,
  },
  props: {
    userData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { root }) {
    const {
      busy,
      sortBy,
      filters,
      perPage,
      competences,
      dataMeta,
      respResult,
      refetchData,
      searchQuery,
      tableColumns,
      currentPage,
      totalRecords,
      refListTable,
      deleteCompetence,
      isSortDirDesc,
      fetchCompetences,
      perPageOptions,
    } = useCompetences()

    onMounted(() => {
      if (props.userData) {
        filters.userId = props.userData.id
      }
      fetchCompetences()
    })
    const isExportActive = ref(false)
    const isAddCompetenceActive = ref(false)
    const isAddDocumentActive = ref(false)
    const isEditCompetenceActive = ref(false)
    const competence = ref({})
    const deleteConfirmed = async id => {
      await deleteCompetence(id)
      if (respResult.value.status === 200) {
        fetchCompetences()
      }
    }

    const editCompetence = item => {
      competence.value = item
      isEditCompetenceActive.value = true
    }


    const confirmDelete = async id => {
      root.$bvModal
        .msgBoxConfirm('Please confirm that you want to delete competence.', {
          title: 'Please Confirm',
          size: 'sm',
        })
        .then(value => {
          if (value) {
            deleteConfirmed(id)
          }
        })
    }

    return {
      busy,
      sortBy,
      filters,
      competence,
      perPage,
      competences,
      dataMeta,
      refetchData,
      searchQuery,
      currentPage,
      tableColumns,
      totalRecords,
      refListTable,
      isSortDirDesc,
      confirmDelete,
      editCompetence,
      perPageOptions,
      isExportActive,
      fetchCompetences,
      isAddCompetenceActive,
      isAddDocumentActive,
      isEditCompetenceActive,
    }
  },
}
</script>
  <style scoped>
  .per-page-selector {
    width: 90px;
  }
  </style>

  <style lang="scss">
  @import '~@core/scss/vue/libs/vue-select.scss';
  </style>
<style>
.per-page-selector {
    width: 90px;
}
.b-table-has-details{
  background-color: #ababab !important;
  color: #fff;
}
.competence-table table.inner {
display: inline-table;
width: auto;
border: 1px solid blue;
}
.competence-table td {
border: 1px dotted gray;
}
/* .competence-table td.r {
text-align: right;
}
td.l {
text-align: left;
} */
</style>
