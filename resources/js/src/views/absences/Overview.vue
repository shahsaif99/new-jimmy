<template>
  <div>
    <b-row>
      <b-col
        cols="12"
        md="3"
        v-for="(stats, index) in absencesStats"
        :key="index"
      >
        <statistic-card-horizontal
          icon="CalendarIcon"
          :statistic="$t(stats.type)"
          :statistic-title="`${stats.total_days} ${$t('request(s)')}`"
        />
      </b-col>
    </b-row>
    <edit-absence
      :is-edit-absence-active.sync="isEditAbsenceActive"
      v-if="isEditAbsenceActive"
      :absence-id="absenceId"
      @refetch-data="fetchAbsences"
    />
    <add-absence
      :is-add-absence-active.sync="isAddAbsenceActive"
      v-if="isAddAbsenceActive"
      @refetch-data="fetchAbsences"
    />
    <PendingRequest />

    <b-card
      no-body
      class="mb-0 mt-2"
    >
      <h3 class="p-1">
        {{ t("Absence Overview") }}
      </h3>
      <b-overlay
        id="overlay-background"
        :show="busy"
        variant="transparent"
        rounded="sm"
      >
        <div class="d-flex justify-content-end  mb-2">
          <div class="d-flex align-items-center col-md-4 mb-1 mb-md-0">
            <b-form-input
              v-model="searchTerm"
              placeholder="Search"
              type="text"
              class="d-inline-block mr-1"
              @input="handleSearch"
            />
            <b-button
              variant="primary"
              @click="isAddAbsenceActive = true"
              v-if="$can('absences-add', 'all')"
            >
              <span class="text-nowrap">{{ t('Add Absence') }}</span>
            </b-button>
          </div>
        </div>
        <vue-good-table
          mode="remote"
          @on-page-change="onPageChange"
          @on-per-page-change="onPerPageChange"
          :columns="overviewTableColumns"
          @on-sort-change="onSortChange"
          @on-column-filter="onColumnFilter"
          :rows="absences"
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
            slot="table-header-row"
            slot-scope="props"
          >
            <b-media vertical-align="center">
              <template #aside>
                <b-avatar
                  size="32"
                  :src="props.row.children[0].user.avatar_url"
                  :text="avatarText(props.row.label)"
                  :to="{ name: 'users-edit', params: { id: props.row.children[0].user.id } }"
                />
              </template>
              <b-link
                :to="{ name: 'users-edit', params: { id: props.row.children[0].user.id } }"
              >
                {{ props.row.label }}
              </b-link>
            </b-media>
          </template>
          <template
            slot="table-row"
            slot-scope="props"
          >
            <!-- Column: Name -->
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
            <!-- Column: Status -->
            <span v-else-if="props.column.field === 'status'">
              <b-badge :variant="resolveStatus(props.row.status)">
                {{ $t(props.row.status) }}
              </b-badge>
            </span>

            <!-- Column: Action -->
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
          </template>
        </vue-good-table>
      </b-overlay>
    </b-card>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BCard,
  BLink,
  BMedia,
  BBadge,
  BAvatar,
  BButton,
  BOverlay,
  BFormInput,
} from 'bootstrap-vue'
import { ref, onMounted } from '@vue/composition-api'
import useAbsences from '@/composables/absences'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import i18n from '@/libs/i18n'
// eslint-disable-next-line import/no-cycle
import { avatarText } from '@core/utils/filter'
import { VueGoodTable } from 'vue-good-table'
import StatisticCardHorizontal from '@core/components/statistics-cards/StatisticCardHorizontal.vue'
import PendingRequest from './PendingRequest.vue'
import 'vue-good-table/dist/vue-good-table.css'
import AddAbsence from './dialogs/AddAbsence.vue'
import EditAbsence from './dialogs/EditAbsence.vue'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BMedia,
    BLink,
    BBadge,
    BButton,
    BAvatar,
    BOverlay,
    BFormInput,
    VueGoodTable,
    AddAbsence,
    EditAbsence,
    PendingRequest,
    StatisticCardHorizontal,
  },
  setup(_, { root }) {
    const {
      busy,
      filters,
      absences,
      respResult,
      searchQuery,
      absencesStats,
      totalRecords,
      refListTable,
      deleteAbsence,
      isSortDirDesc,
      resolveStatus,
      fetchAbsences,
      fetchAbsencesStats,
      overviewTableColumns,
      updateAbsenceStatus,
    } = useAbsences()

    const searchTerm = ref('')
    const pageLength = ref(10)
    const absenceId = ref(0)
    const isEditAbsenceActive = ref(false)
    const isAddAbsenceActive = ref(false)
    const { t } = useI18nUtils()

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

    onMounted(async () => {
      filters.group = true
      await fetchAbsencesStats()
      await fetchAbsences(serverParams.value)
    })

    const editAbsence = id => {
      absenceId.value = id
      isEditAbsenceActive.value = true
    }

    const deleteConfirmed = async id => {
      await deleteAbsence(id)
      if (respResult.value.status === 200) {
        fetchAbsences(serverParams.value)
      }
    }

    const absenceStatusConfirmed = async data => {
      await updateAbsenceStatus(data)
      if (respResult.value.status === 200) {
        fetchAbsences(serverParams.value)
      }
    }

    const handleSearch = query => {
      searchQuery.value = query
      fetchAbsences(serverParams.value)
    }

    const updateParams = newProps => {
      serverParams.value = { ...serverParams.value, ...newProps }
    }

    const onPageChange = params => {
      updateParams({ page: params.currentPage })
      fetchAbsences(serverParams.value)
    }

    const onPerPageChange = params => {
      updateParams({ perPage: params.currentPerPage })
      fetchAbsences(serverParams.value)
    }

    const onSortChange = params => {
      console.log(params.columnIndex)
      updateParams({
        sort: [
          {
            type: params.sortType,
            field: overviewTableColumns.value[params.columnIndex].field,
          },
        ],
      })
      fetchAbsences(serverParams.value)
    }

    const onColumnFilter = params => {
      updateParams(params)
      fetchAbsences(serverParams.value)
    }


    const confirmStatus = async (id, status) => {
      root.$bvModal
        .msgBoxConfirm(
          i18n.t(`Please confirm that you want to ${status} absence request.`),
          {
            title: i18n.t('Please Confirm'),
            size: 'sm',
            okTitle: i18n.t('Confirm'),
            cancelTitle: i18n.t('Cancel'),
          },
        )
        .then(value => {
          if (value) {
            absenceStatusConfirmed({ id, status })
          }
        })
    }

    const confirmDelete = async id => {
      root.$bvModal
        .msgBoxConfirm(
          i18n.t('Please confirm that you want to delete absence.'),
          {
            title: i18n.t('Please Confirm'),
            size: 'sm',
            okTitle: i18n.t('Confirm'),
            cancelTitle: i18n.t('Cancel'),
          },
        )
        .then(value => {
          if (value) {
            deleteConfirmed(id)
          }
        })
    }
    return {
      t,
      busy,
      filters,
      handleSearch,
      onSortChange,
      absences,
      isAddAbsenceActive,
      onColumnFilter,
      updateParams,
      pageLength,
      searchTerm,
      serverParams,
      avatarText,
      absenceId,
      absencesStats,
      onPerPageChange,
      onPageChange,
      editAbsence,
      confirmStatus,
      totalRecords,
      refListTable,
      isSortDirDesc,
      confirmDelete,
      resolveStatus,
      fetchAbsences,
      overviewTableColumns,
      isEditAbsenceActive,
    }
  },
}
</script>

<style >
.vgt-table thead{
    display: none;
}
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
