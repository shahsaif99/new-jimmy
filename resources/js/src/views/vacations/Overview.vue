<template>
  <div>
    <edit-vacation
      :is-edit-vacation-active.sync="isEditVacationActive"
      v-if="isEditVacationActive"
      :vacation-id="vacationId"
      @refetch-data="fetchVacations"
    />
    <add-vacation
      :is-add-vacation-active.sync="isAddVacationActive"
      v-if="isAddVacationActive"
      @refetch-data="fetchVacations"
    />
    <PendingRequest @refetch-data="fetchVacations" />

    <b-card
      no-body
      class="mb-0 mt-2"
    >
      <h3 class="p-1">
        {{ $t("Holiday Overview") }}
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
              :placeholder="$t('Search...')"
              type="text"
              class="d-inline-block mr-1"
              @input="handleSearch"
            />
            <b-button
              variant="primary"
              @click="isAddVacationActive = true"
              v-if="$can('absences-add', 'all')"
            >
              <span class="text-nowrap">{{ $t('Add Vacation') }}</span>
            </b-button>
          </div>
        </div>
        <!-- mode="remote" -->
        <vue-good-table
          mode="remote"
          @on-page-change="onPageChange"
          @on-per-page-change="onPerPageChange"
          :columns="overviewTableColumns"
          @on-sort-change="onSortChange"
          @on-column-filter="onColumnFilter"
          :rows="vacations"
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
            <span
              v-if="props.column.field === 'name'"
              class="text-nowrap"
            >
              Name
              <b-avatar
                :src="props.row.avatar"
                class="mx-1"
              />

              <span class="text-nowrap">{{ props.row.user.name }}</span>
            </span>
            <span v-else-if="props.column.field === 'from_date'">
              <p
                class="font-weight-bold"
                v-if="props.index=== 0"
              >   {{ $t('From Date') }}
              </p>
              {{ props.row.from_date }}
            </span>
            <span v-else-if="props.column.field === 'to_date'">
              <p
                class="font-weight-bold"
                v-if="props.index=== 0"
              >   {{ $t('To Date') }}
              </p>
              {{ props.row.to_date }}
            </span>
            <span
              v-else-if="props.column.field === 'days'"
              class="text-nowrap"
            >
              <p
                class="font-weight-bold"
                v-if="props.index=== 0"
              >   {{ $t('Days') }}
              </p>
              <span class="text-nowrap">{{ props.row.days }} {{ $t('day(s)') }}</span>
            </span>
            <!-- Column: Status -->
            <span v-else-if="props.column.field === 'status'">
              <p
                class="font-weight-bold"
                v-if="props.index=== 0"
              >   {{ $t('Status') }}
              </p>
              <b-badge :variant="resolveStatus(props.row.status)">
                {{ props.row.status }}
              </b-badge>
            </span>

            <span v-else-if="props.column.field === 'comments'">
              <p
                class="font-weight-bold"
                v-if="props.index=== 0"
              >   {{ $t('Comments') }}
              </p>
              {{ props.row.comments }}
            </span>

            <span v-else-if="props.column.field === 'approved_date'">
              <p
                class="font-weight-bold"
                v-if="props.index=== 0"
              >   {{ $t('Approved Date') }}
              </p>
              {{ props.row.approved_date }}
            </span>

            <!-- Column: Action -->
            <span v-else-if="props.column.field === 'actions'">
              <p
                class="font-weight-bold"
                v-if="props.index=== 0"
              >   {{ $t('Actions') }}
              </p>
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
                    @click="editVacation(props.row.id)"
                  />
                  <feather-icon
                    @click="confirmDelete(props.row.id)"
                    :id="`delete-request-${props.row.id}-trash-btn`"
                    icon="Trash2Icon"
                    class="cursor-pointer "
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
  BCard,
  BLink,
  BMedia,
  BBadge,
  BButton,
  BAvatar,
  BOverlay,
  BTooltip,
  BFormInput,
} from 'bootstrap-vue'
import { ref, onMounted } from '@vue/composition-api'
import useVacations from '@/composables/vacations'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import i18n from '@/libs/i18n'
// eslint-disable-next-line import/no-cycle
import { avatarText } from '@core/utils/filter'
import { VueGoodTable } from 'vue-good-table'
import PendingRequest from './PendingRequest.vue'
import 'vue-good-table/dist/vue-good-table.css'
import EditVacation from './dialogs/EditVacation.vue'
import AddVacation from './dialogs/AddVacation.vue'

export default {
  components: {
    BCard,
    BMedia,
    BLink,
    BButton,
    BBadge,
    BAvatar,
    BTooltip,
    BOverlay,
    BFormInput,
    AddVacation,
    VueGoodTable,
    EditVacation,
    PendingRequest,
  },
  setup(_, { root }) {
    const {
      busy,
      filters,
      vacations,
      respResult,
      searchQuery,
      totalRecords,
      refListTable,
      deleteVacation,
      isSortDirDesc,
      resolveStatus,
      fetchVacations,
      overviewTableColumns,
      updateVacationStatus,
    } = useVacations()

    const searchTerm = ref('')
    const pageLength = ref(10)
    const vacationId = ref(0)
    const isEditVacationActive = ref(false)
    const isAddVacationActive = ref(false)
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
      await fetchVacations(serverParams.value)
    })

    const editVacation = id => {
      vacationId.value = id
      isEditVacationActive.value = true
    }

    const handleSearch = query => {
      searchQuery.value = query
      fetchVacations(serverParams.value)
    }


    const deleteConfirmed = async id => {
      await deleteVacation(id)
      if (respResult.value.status === 200) {
        fetchVacations(serverParams.value)
      }
    }

    const absenceStatusConfirmed = async data => {
      await updateVacationStatus(data)
      if (respResult.value.status === 200) {
        fetchVacations(serverParams.value)
      }
    }

    const updateParams = newProps => {
      serverParams.value = { ...serverParams.value, ...newProps }
    }

    const onPageChange = params => {
      updateParams({ page: params.currentPage })
      fetchVacations(serverParams.value)
    }

    const onPerPageChange = params => {
      updateParams({ perPage: params.currentPerPage })
      fetchVacations(serverParams.value)
    }

    const onSortChange = params => {
      updateParams({
        sort: [
          {
            type: params[0].type,
            field: params[0].field,
          },
        ],
      })
      fetchVacations(serverParams.value)
    }

    const onColumnFilter = params => {
      updateParams(params)
      fetchVacations(serverParams.value)
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
          i18n.t('Please confirm that you want to delete vacation.'),
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
      onSortChange,
      vacations,
      handleSearch,
      onColumnFilter,
      updateParams,
      pageLength,
      searchTerm,
      serverParams,
      avatarText,
      vacationId,
      onPerPageChange,
      onPageChange,
      editVacation,
      confirmStatus,
      totalRecords,
      refListTable,
      isSortDirDesc,
      confirmDelete,
      resolveStatus,
      fetchVacations,
      isAddVacationActive,
      overviewTableColumns,
      isEditVacationActive,
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
