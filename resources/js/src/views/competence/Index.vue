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
              @click="isAddCompetenceActive = true"
              v-if="$can('competence-add', 'all')"
              class="ml-3"
            >
              <span class="text-nowrap">{{ t('Add Competence') }}</span>
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
                :placeholder="t('Search...')"
              />
            </div>
          </b-col>
        </b-row>
      </div>
      <vue-good-table
        mode="remote"
        @on-page-change="onPageChange"
        @on-per-page-change="onPerPageChange"
        :columns="tableColumns"
        @on-sort-change="onSortChange"
        @on-column-filter="onColumnFilter"
        :rows="competences"
        :is-loading.sync="busy"
        :total-rows="totalRecords"
        :sort-options="{
          enabled: false,
        }"
        :search-options="{
          enabled: true,
          externalQuery: searchTerm }"
        :pagination-options="{
          enabled: true,
          perPage:pageLength
        }"
        :group-options="{
          enabled: true,
        }"
      >

        <template
          slot="table-column"
          slot-scope="props"
        >
          <span
            class="text-nowrap"
          >
            {{ $t(props.column.label) }}
          </span>
        </template>
        <!-- <template
          slot="table-row"
          slot-scope="props"
        >
          <span
            v-if="props.column.field === 'name'"
            class="text-nowrap"
          >
            <b-avatar
              :src="props.row.avatar"
              class="mx-1"
            />

            <span class="text-nowrap">{{ props.row.user.name }}</span>
          </span>
          <span
            v-else-if="props.column.field === 'days'"
            class="text-nowrap"
          >
            <span class="text-nowrap">{{ props.row.days }} {{ t('day(s)') }}</span>
          </span>
          <span v-else-if="props.column.field === 'status'">
            <b-badge :variant="resolveStatus(props.row.status)">
              {{ $t(props.row.status) }}
            </b-badge>
          </span>

          <span v-else-if="props.column.field === 'actions'">
            <div
              class="text-nowrap"
            >
              <div v-if="props.row.status == 'pending'">
                <span class="text-success">
                  <feather-icon
                    @click="confirmStatus(props.row.id, 'approved')"
                    :id="`accept-request-${props.row.id}-check-btn`"
                    icon="CheckIcon"
                    class="cursor-pointer ml-1"
                    size="16"
                  />
                </span>
                <span class="text-danger">
                  <feather-icon
                    @click="confirmStatus(props.row.id, 'declined')"
                    :id="`decline-request-${props.row.id}-cross-btn`"
                    icon="SlashIcon"
                    class="cursor-pointer ml-1"
                    size="16"
                  />
                </span>
              </div>

              <div v-if="props.row.status == 'approved'">
                <feather-icon
                  :id="`user-row-${props.row.id}-pencil-icon`"
                  icon="EditIcon"
                  size="16"
                  class="mx-1 cursor-pointer"
                  @click="editAbsence(props.row.id)"
                />
                <feather-icon
                  @click="confirmDelete(props.row.id)"
                  :id="`delete-request-${props.row.id}-trash-btn`"
                  icon="Trash2Icon"
                  class="cursor-pointer"
                  size="16"
                />
              </div>
            </div>
          </span>
        </template> -->
      </vue-good-table>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BButton,
  BFormInput,
} from 'bootstrap-vue'
import { ref, onMounted } from '@vue/composition-api'
import vSelect from 'vue-select'
import useCompetences from '@/composables/competences'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import i18n from '@/libs/i18n'
import { VueGoodTable } from 'vue-good-table'
import AddCompetence from './dialogs/Add.vue'
import EditCompetence from './dialogs/Edit.vue'
import 'vue-good-table/dist/vue-good-table.css'


export default {
  components: {
    BCol,
    BRow,
    BCard,
    vSelect,
    BButton,
    AddCompetence,
    BFormInput,
    VueGoodTable,
    EditCompetence,
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

    const { t } = useI18nUtils()
    const searchTerm = ref('')
    const pageLength = ref(10)
    const serverParams = ref({
      columnFilters: {
      },
      sort: [
        {
          field: '',
          type: '',
        },
      ],
      page: 1,
      perPage: 10,
    })
    onMounted(() => {
      filters.group = true
      if (props.userData) {
        filters.userId = props.userData.id
      }
      fetchCompetences(serverParams.value)
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

    const handleSearch = query => {
      searchQuery.value = query
      fetchCompetences(serverParams.value)
    }

    const updateParams = newProps => {
      serverParams.value = { ...serverParams.value, ...newProps }
    }

    const onPageChange = params => {
      updateParams({ page: params.currentPage })
      fetchCompetences(serverParams.value)
    }

    const onPerPageChange = params => {
      updateParams({ perPage: params.currentPerPage })
      fetchCompetences(serverParams.value)
    }

    const onSortChange = params => {
      console.log(params.columnIndex)
      updateParams({
        sort: [
          {
            type: params.sortType,
            field: tableColumns.value[params.columnIndex].field,
          },
        ],
      })
      fetchCompetences(serverParams.value)
    }

    const onColumnFilter = params => {
      updateParams(params)
      fetchCompetences(serverParams.value)
    }


    const confirmDelete = async id => {
      root.$bvModal
        .msgBoxConfirm(i18n.t('Please confirm that you want to delete competence.'), {
          title: i18n.t('Please Confirm'),
          size: 'sm',
          okTitle: i18n.t('Confirm'),
          cancelTitle: i18n.t('Cancel'),
        })
        .then(value => {
          if (value) {
            deleteConfirmed(id)
          }
        })
    }


    return {
      t,
      busy,
      sortBy,
      filters,
      perPage,
      dataMeta,
      searchTerm,
      pageLength,
      handleSearch,
      onSortChange,
      onColumnFilter,
      updateParams,
      onPerPageChange,
      onPageChange,
      competence,
      competences,
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
<style >
table.vgt-table{
    font-size: 1rem;
}
table.vgt-table th {
    font-size: 0.857rem;
    text-transform: uppercase
}
table.vgt-table td {
    border: none !important;
}
</style>
