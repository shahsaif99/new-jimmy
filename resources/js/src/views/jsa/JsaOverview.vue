<template>
  <div>
    <!-- The layout already prints the page title and breadcrumb above this. -->
    <div class="d-flex flex-wrap justify-content-between align-items-center mb-1">
      <p class="text-muted mb-0">
        {{ t('Create, manage and follow up job safety analyses.') }}
      </p>
      <b-button variant="primary" @click="openNew">
        <feather-icon icon="PlusIcon" size="15" class="mr-50" />
        {{ t('New JSA') }}
      </b-button>
    </div>

    <b-card>
      <!-- Tabs + search + filters -->
      <div class="d-flex flex-wrap align-items-center mb-1" style="gap: 12px">
        <b-button-group>
          <b-button
            :variant="filters.scope === 'my' ? 'primary' : 'outline-primary'"
            @click="setScope('my')"
          >
            {{ t('My JSAs') }}
            <!-- On the active tab the button is filled primary, so the badge
                 is inverted: white chip, primary digit. The theme's own light
                 variants carry white text and vanish against it. -->
            <b-badge
              v-if="awaitingMySignature"
              :variant="filters.scope === 'my' ? 'light' : 'primary'"
              :class="['ml-50', filters.scope === 'my' ? 'jsa-count-badge' : '']"
            >
              {{ awaitingMySignature }}
            </b-badge>
          </b-button>
          <!-- Company-wide view; the spec makes this tab administrators only. -->
          <b-button
            v-if="isAdmin"
            :variant="filters.scope === 'all' ? 'primary' : 'outline-primary'"
            @click="setScope('all')"
          >
            {{ t('All JSAs') }}
          </b-button>
        </b-button-group>

        <b-input-group class="flex-fill" style="min-width: 160px; max-width: 520px">
          <b-input-group-prepend is-text>
            <feather-icon icon="SearchIcon" size="15" />
          </b-input-group-prepend>
          <b-form-input v-model="filters.search" :placeholder="t('Search JSA')" debounce="400" />
        </b-input-group>

        <b-button
          :variant="filtersOpen ? 'primary' : 'outline-secondary'"
          @click="filtersOpen = !filtersOpen"
        >
          <feather-icon icon="FilterIcon" size="15" />
          <b-badge v-if="activeFilterCount" variant="light-primary" class="ml-50">
            {{ activeFilterCount }}
          </b-badge>
        </b-button>
      </div>

      <b-collapse v-model="filtersOpen">
        <b-row class="mb-1">
          <b-col md="3" sm="6">
            <b-form-group :label="t('Status')">
              <b-form-select v-model="filters.status" :options="translatedStatusFilters" />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="6">
            <b-form-group :label="t('Project')">
              <b-form-select v-model="filters.project_id" :options="projectFilterOptions" />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="6">
            <b-form-group :label="t('JSA Leader')">
              <b-form-select v-model="filters.jsa_leader_id" :options="leaderFilterOptions" />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="6">
            <b-form-group :label="t('Date')">
              <div class="d-flex" style="gap: 6px">
                <b-form-input v-model="filters.date_from" type="date" :title="t('From')" />
                <b-form-input v-model="filters.date_to" type="date" :title="t('To')" />
              </div>
            </b-form-group>
          </b-col>
          <b-col cols="12" class="text-right">
            <b-button variant="flat-secondary" size="sm" @click="clearFilters">
              {{ t('Clear filters') }}
            </b-button>
          </b-col>
        </b-row>
      </b-collapse>

      <b-overlay :show="apiHelpers.loading" variant="transparent" rounded="sm">
        <b-table
          :items="jsas"
          :fields="tableFields"
          responsive
          hover
          show-empty
          :empty-text="t('No job safety analyses found')"
          class="mb-0 jsa-table"
          tbody-tr-class="cursor-pointer"
          no-local-sorting
          :sort-by.sync="filters.sortBy"
          :sort-desc.sync="filters.sortDesc"
          @row-clicked="openDetail"
        >
          <template #cell(jsa_no)="data">
            <span class="text-primary font-weight-bold">{{ data.item.jsa_no }}</span>
          </template>

          <template #cell(title)="data">
            <span class="font-weight-bold text-body">{{ data.item.title }}</span>
          </template>

          <template #cell(project_name)="data">
            <span v-if="data.item.project_name">{{ data.item.project_name }}</span>
            <span v-else class="text-muted">—</span>
          </template>

          <template #cell(jsa_date)="data">
            <span v-if="data.item.jsa_date" class="text-primary">
              {{ formatDate(data.item.jsa_date) }}
            </span>
            <span v-else class="text-muted">—</span>
          </template>

          <template #cell(jsa_leader_name)="data">
            <span v-if="data.item.jsa_leader_name">{{ data.item.jsa_leader_name }}</span>
            <span v-else class="text-muted">—</span>
          </template>

          <!--
            One column, two meanings: a company-wide count on the All tab, and
            the viewer's own signature state on My JSAs. Both numbers come from
            the API so the two tabs can never tell different stories.
          -->
          <template #cell(participants)="data">
            <template v-if="filters.scope === 'all'">
              <span v-if="data.item.participants_total === 0" class="text-muted">—</span>
              <span v-else class="d-inline-flex align-items-center">
                {{ data.item.participants_signed }} / {{ data.item.participants_total }}
                {{ t('signed') }}
                <feather-icon
                  v-if="data.item.all_signed"
                  icon="CheckCircleIcon"
                  size="16"
                  class="ml-50 text-success"
                />
              </span>
            </template>

            <template v-else>
              <span v-if="!data.item.my_signature_status" class="text-muted">—</span>
              <span
                v-else-if="data.item.my_signature_status === 'not_signed'"
                class="d-inline-flex align-items-center text-warning"
              >
                <feather-icon icon="AlertCircleIcon" size="16" class="mr-50" />
                {{ t('Signature required') }}
              </span>
              <span v-else class="d-inline-flex align-items-center text-success">
                <feather-icon icon="CheckCircleIcon" size="16" class="mr-50" />
                {{ t('Signed') }}
              </span>
            </template>
          </template>

          <template #cell(status)="data">
            <b-badge :variant="statusVariant(data.item.status)">
              {{ t(statusLabel(data.item.status)) }}
            </b-badge>
          </template>

          <template #cell(actions)="data">
            <b-dropdown variant="link" no-caret right @click.native.stop>
              <template #button-content>
                <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
              </template>
              <b-dropdown-item @click="openDetail(data.item)">
                <feather-icon icon="EyeIcon" size="14" class="mr-50" />
                {{ t('View details') }}
              </b-dropdown-item>
              <b-dropdown-item @click="openEdit(data.item)">
                <feather-icon icon="EditIcon" size="14" class="mr-50" />
                {{ t('Edit') }}
              </b-dropdown-item>
              <b-dropdown-item @click="downloadPdf(data.item)">
                <feather-icon icon="DownloadIcon" size="14" class="mr-50" />
                {{ t('Download') }}
              </b-dropdown-item>
              <b-dropdown-divider />
              <b-dropdown-item @click="confirmDelete(data.item)">
                <feather-icon icon="TrashIcon" size="14" class="mr-50" />
                {{ t('Delete') }}
              </b-dropdown-item>
            </b-dropdown>
          </template>
        </b-table>
      </b-overlay>

      <div class="d-flex flex-wrap justify-content-between align-items-center mt-1">
        <small class="text-muted">
          {{ t('Showing') }} {{ dataMeta.from }} {{ t('to') }} {{ dataMeta.to }}
          {{ t('of') }} {{ dataMeta.of }} {{ t('entries') }}
        </small>

        <div class="d-flex align-items-center">
          <span class="text-muted mr-50">{{ t('Show') }}</span>
          <b-form-select
            v-model="pagination.per_page"
            :options="perPageOptions"
            size="sm"
            style="width: 5rem"
            @change="onPerPageChange"
          />
          <span class="text-muted ml-50 mr-1">{{ t('entries') }}</span>
          <b-pagination
            :value="pagination.current_page"
            :total-rows="pagination.total"
            :per-page="pagination.per_page"
            first-number
            last-number
            class="mb-0"
            prev-class="prev-item"
            next-class="next-item"
            @change="onPagination"
          >
            <template #prev-text>
              <feather-icon icon="ChevronLeftIcon" size="18" />
            </template>
            <template #next-text>
              <feather-icon icon="ChevronRightIcon" size="18" />
            </template>
          </b-pagination>
        </div>
      </div>
    </b-card>

    <JsaDetailSidebar
      :is-visible.sync="dialog.show.detail"
      @edit="openEdit"
      @changed="fetchJsas"
    />
  </div>
</template>

<script>
import {
  BBadge,
  BButton,
  BButtonGroup,
  BCard,
  BCol,
  BCollapse,
  BDropdown,
  BDropdownDivider,
  BDropdownItem,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BInputGroup,
  BInputGroupPrepend,
  BOverlay,
  BPagination,
  BRow,
  BTable,
} from 'bootstrap-vue'
import { computed, onMounted, ref, watch } from '@vue/composition-api'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import useJwt from '@/auth/jwt/useJwt'
import router from '@/router'
import useJobSafetyAnalysis from '@/composables/job-safety-analysis'
import JsaDetailSidebar from './JsaDetailSidebar.vue'

export default {
  name: 'JsaOverview',
  components: {
    BBadge,
    BButton,
    BButtonGroup,
    BCard,
    BCol,
    BCollapse,
    BDropdown,
    BDropdownDivider,
    BDropdownItem,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BInputGroup,
    BInputGroupPrepend,
    BOverlay,
    BPagination,
    BRow,
    BTable,
    JsaDetailSidebar,
  },
  setup() {
    const { t } = useI18nUtils()
    const {
      jsas,
      filters,
      pagination,
      apiHelpers,
      dialog,
      projectOptions,
      userOptions,
      awaitingMySignature,
      reset,
      fetchJsas,
      fetchJsa,
      deleteJsa,
      downloadPdf,
      fetchProjectOptions,
      fetchUserOptions,
      statusFilterOptions,
      statusVariant,
      statusLabel,
      formatDate,
    } = useJobSafetyAnalysis()

    const userData = JSON.parse(useJwt.getUserData())
    const isAdmin = userData.role === 'Admin' || userData.role === 'Super Admin'

    const filtersOpen = ref(false)

    const tableFields = computed(() => [
      { key: 'jsa_no', label: t('ID'), sortable: true },
      { key: 'title', label: t('Title'), sortable: true },
      { key: 'project_name', label: t('Project'), sortable: false },
      { key: 'jsa_date', label: t('Date'), sortable: true },
      { key: 'jsa_leader_name', label: t('JSA Leader'), sortable: false },
      { key: 'participants', label: t('Participants'), sortable: false },
      { key: 'status', label: t('Status'), sortable: true },
      { key: 'actions', label: '', sortable: false, thStyle: { width: '60px' }, tdClass: 'text-center' },
    ])

    const translatedStatusFilters = computed(() =>
      statusFilterOptions.map((o) => ({ value: o.value, text: t(o.text) }))
    )

    const projectFilterOptions = computed(() => [
      { value: '', text: t('All Projects') },
      ...projectOptions.value,
    ])

    const leaderFilterOptions = computed(() => [
      { value: '', text: t('All Leaders') },
      ...userOptions.value,
    ])

    const activeFilterCount = computed(() => filters.activeCount())

    const perPageOptions = [10, 25, 50, 100]

    // t() resolves through getCurrentInstance(), which is null once setup has
    // returned, so anything said from an event handler is translated up front.
    const CONFIRM_DELETE_JSA = t('Delete this JSA, along with its hazards and signatures?')

    const dataMeta = computed(() => {
      const from = pagination.total === 0 ? 0 : (pagination.current_page - 1) * pagination.per_page + 1
      const to = Math.min(pagination.total, pagination.current_page * pagination.per_page)
      return { from, to, of: pagination.total }
    })

    const setScope = (scope) => {
      if (filters.scope === scope) return
      filters.scope = scope
      pagination.current_page = 1
      fetchJsas()
    }

    const onPagination = (page) => {
      pagination.current_page = page
      fetchJsas()
    }

    const onPerPageChange = (size) => {
      pagination.per_page = size
      pagination.current_page = 1
      fetchJsas()
    }

    const openNew = () => {
      router.push({ name: 'jsa-create' })
    }

    const openEdit = (item) => {
      router.push({ name: 'jsa-edit', params: { id: item.id } })
    }

    const openDetail = async (item) => {
      dialog.show.detail = true
      await fetchJsa(item.id)
    }

    const clearFilters = () => {
      filters.reset()
    }

    const confirmDelete = async (item) => {
      // eslint-disable-next-line no-alert
      if (!confirm(CONFIRM_DELETE_JSA)) return
      const ok = await deleteJsa(item.id)
      if (ok) fetchJsas()
    }

    onMounted(() => {
      reset()
      fetchJsas()
      fetchProjectOptions()
      fetchUserOptions()
    })

    // Any filter or sort change restarts at page one; staying on page 5 of a
    // narrower result set would show an empty table.
    watch(
      () => ({
        search: filters.search,
        status: filters.status,
        project_id: filters.project_id,
        jsa_leader_id: filters.jsa_leader_id,
        date_from: filters.date_from,
        date_to: filters.date_to,
        sortBy: filters.sortBy,
        sortDesc: filters.sortDesc,
      }),
      () => {
        pagination.current_page = 1
        fetchJsas()
      },
      { deep: true }
    )

    return {
      t,
      jsas,
      filters,
      filtersOpen,
      pagination,
      apiHelpers,
      dialog,
      isAdmin,
      awaitingMySignature,
      tableFields,
      translatedStatusFilters,
      projectFilterOptions,
      leaderFilterOptions,
      activeFilterCount,
      perPageOptions,
      dataMeta,
      setScope,
      onPagination,
      onPerPageChange,
      openNew,
      openEdit,
      openDetail,
      clearFilters,
      confirmDelete,
      fetchJsas,
      downloadPdf,
      statusVariant,
      statusLabel,
      formatDate,
    }
  },
}
</script>

<style scoped lang="scss">
.jsa-table ::v-deep td {
  vertical-align: middle;
}

.jsa-count-badge {
  background-color: #fff !important;
  color: var(--primary, #7367f0) !important;
}
</style>
