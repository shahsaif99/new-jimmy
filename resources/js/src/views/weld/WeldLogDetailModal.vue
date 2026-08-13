<template>
  <b-modal
    :visible="visible"
    title="Weld Log Detail"
    size="xl"
    centered
    hide-footer
    @hidden="onClose"
  >
    <div v-if="weldLog">
      <!-- Summary cards + actions -->
      <b-row class="mb-2 align-items-stretch">
        <b-col md="3" class="mb-1">
          <div class="weld-summary-card">
            <b-avatar rounded variant="light-primary" class="mr-1">
              <feather-icon icon="FileTextIcon" size="18" />
            </b-avatar>
            <div>
              <small class="text-muted d-block">Drawing No.</small>
              <strong>{{ weldLog.drawing_no }}</strong>
            </div>
          </div>
        </b-col>

        <b-col md="3" class="mb-1">
          <div class="weld-summary-card">
            <b-avatar rounded variant="light-info" class="mr-1">
              <feather-icon icon="FolderIcon" size="18" />
            </b-avatar>
            <div>
              <small class="text-muted d-block">Project No.</small>
              <strong>{{ weldLog.project_no }} - {{ weldLog.project_name }}</strong>
            </div>
          </div>
        </b-col>

        <b-col md="3" class="mb-1">
          <div class="weld-summary-card">
            <b-avatar rounded variant="light-success" class="mr-1">
              <feather-icon icon="ActivityIcon" size="18" />
            </b-avatar>
            <div>
              <small class="text-muted d-block">NDT Requirements</small>
              <strong v-if="weldLog.ndt_required" class="text-nowrap">
                RT: {{ weldLog.ndt_rt }} | MT: {{ weldLog.ndt_mt }} | PT: {{ weldLog.ndt_pt }} | VT: {{ weldLog.ndt_vt }}
              </strong>
              <strong v-else class="text-muted">Not required</strong>
            </div>
          </div>
        </b-col>

        <b-col md="3" class="mb-1">
          <div class="weld-summary-card">
            <b-avatar rounded variant="light-warning" class="mr-1">
              <feather-icon icon="PaperclipIcon" size="18" />
            </b-avatar>
            <div class="overflow-hidden">
              <small class="text-muted d-block">Attachment</small>
              <div v-if="weldLog.media && weldLog.media.length">
                <a
                  v-for="file in weldLog.media"
                  :key="file.id"
                  :href="file.url"
                  target="_blank"
                  class="d-block text-truncate"
                >{{ file.filename }}</a>
              </div>
              <strong v-else class="text-muted">None</strong>
            </div>
          </div>
        </b-col>
      </b-row>

      <div class="d-flex flex-wrap justify-content-between align-items-center mb-1">
        <div class="d-flex align-items-center mb-1 mb-md-0">
          <b-input-group class="input-group-merge weld-search">
            <b-input-group-prepend is-text>
              <feather-icon icon="SearchIcon" size="14" />
            </b-input-group-prepend>
            <b-form-input v-model="searchQuery" placeholder="Search..." />
          </b-input-group>

          <b-dropdown
            variant="outline-secondary"
            size="sm"
            class="ml-1"
            right
            no-caret
          >
            <template #button-content>
              <feather-icon icon="FilterIcon" size="14" class="mr-50" />
              Filter
              <b-badge v-if="activeFilterCount" variant="primary" class="ml-50">
                {{ activeFilterCount }}
              </b-badge>
            </template>
            <div class="px-1 py-50 weld-filter-panel">
              <b-form-group label="Type" class="mb-1">
                <b-form-select v-model="typeFilter" :options="typeFilterOptions" size="sm" />
              </b-form-group>
              <b-form-group label="Visual" class="mb-1">
                <b-form-select v-model="visualFilter" :options="visualFilterOptions" size="sm" />
              </b-form-group>
              <b-form-group label="NDT Result" class="mb-1">
                <b-form-select v-model="ndtFilter" :options="ndtFilterOptions" size="sm" />
              </b-form-group>
              <b-button variant="flat-secondary" size="sm" block @click="resetFilters">
                Reset
              </b-button>
            </div>
          </b-dropdown>

          <b-dropdown
            variant="outline-secondary"
            size="sm"
            class="ml-1"
            right
            no-caret
          >
            <template #button-content>
              <feather-icon icon="SettingsIcon" size="14" />
            </template>
            <b-dropdown-form>
              <b-form-checkbox
                v-for="column in toggleableColumns"
                :key="column.key"
                v-model="visibleColumns"
                :value="column.key"
                class="mb-50"
              >
                {{ column.label }}
              </b-form-checkbox>
            </b-dropdown-form>
          </b-dropdown>
        </div>

        <div class="d-flex align-items-center">
          <b-button
            variant="outline-primary"
            size="sm"
            class="mr-1"
            @click="handleExportPdf"
          >
            <feather-icon icon="DownloadIcon" size="14" class="mr-50" />
            Export PDF
          </b-button>

          <b-dropdown
            v-if="$can('weld-log-create', 'all')"
            variant="primary"
            size="sm"
            right
            split
            text="Add Weld"
            @click="openRegisterWeldModal"
          >
            <b-dropdown-item @click="openRegisterWeldModal">
              Add Weld
            </b-dropdown-item>
            <b-dropdown-item :disabled="!hasWelds" @click="openRepairWeldModal()">
              Add Repair Weld
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>

      <b-table
        v-if="paginatedWelds.length"
        :items="paginatedWelds"
        :fields="weldFields"
        responsive
        hover
        small
        class="mb-0"
        :tbody-tr-class="rowClass"
        :sort-compare="sortCompare"
      >
        <template #cell(weld_label)="data">
          <span :class="isRepair(data.item) ? 'text-primary font-weight-bold' : ''">
            {{ data.item.weld_label || data.item.weld_no }}
          </span>
        </template>

        <template #cell(type)="data">
          <b-badge :variant="isRepair(data.item) ? 'light-primary' : 'light-success'">
            {{ isRepair(data.item) ? 'Repair' : 'Weld' }}
          </b-badge>
        </template>

        <template #cell(weld_date)="data">
          {{ formatDate(data.item.weld_date) }}
        </template>

        <template #cell(visual_inspection)="data">
          <b-badge :variant="data.item.visual_inspection === 'ok' ? 'light-success' : 'light-danger'">
            {{ data.item.visual_inspection === 'ok' ? 'OK' : 'Not OK' }}
          </b-badge>
        </template>

        <template #cell(ndt_rt)="data">
          <ndt-cell :checked="data.item.ndt_rt" :result="data.item.ndt_rt_result" />
        </template>

        <template #cell(ndt_mt)="data">
          <ndt-cell :checked="data.item.ndt_mt" :result="data.item.ndt_mt_result" />
        </template>

        <template #cell(ndt_pt)="data">
          <ndt-cell :checked="data.item.ndt_pt" :result="data.item.ndt_pt_result" />
        </template>

        <template #cell(ndt_vt)="data">
          <ndt-cell :checked="data.item.ndt_vt" :result="data.item.ndt_vt_result" />
        </template>

        <template #cell(repair_reason_label)="data">
          <span v-if="data.item.repair_reason_label">{{ data.item.repair_reason_label }}</span>
          <span v-else class="text-muted">-</span>
        </template>

        <template #cell(ndt_accepted)="data">
          <b-badge
            v-if="data.item.ndt_accepted"
            :variant="data.item.ndt_accepted === 'accepted' ? 'light-success' : 'light-danger'"
          >
            {{ data.item.ndt_accepted }}
          </b-badge>
          <span v-else class="text-muted">-</span>
        </template>

        <template #cell(actions)="data">
          <b-dropdown
            variant="link"
            no-caret
            right
          >
            <template #button-content>
              <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
            </template>
            <b-dropdown-item v-if="$can('weld-log-edit', 'all')" @click="openEditWeldModal(data.item)">
              <feather-icon icon="EditIcon" size="14" class="mr-50" />
              Edit
            </b-dropdown-item>
            <b-dropdown-item v-if="$can('weld-log-create', 'all')" @click="openRepairWeldModal(data.item)">
              <feather-icon icon="ToolIcon" size="14" class="mr-50" />
              Add Repair Weld
            </b-dropdown-item>
            <b-dropdown-item v-if="$can('weld-log-delete', 'all')" @click="handleDeleteWeld(data.item)">
              <feather-icon icon="TrashIcon" size="14" class="mr-50" />
              Delete
            </b-dropdown-item>
          </b-dropdown>
        </template>
      </b-table>

      <div
        v-else
        class="text-center text-muted py-4"
      >
        {{ hasWelds ? 'No welds match the current filters' : 'No welds registered yet' }}
      </div>

      <div
        v-if="filteredWelds.length"
        class="d-flex flex-wrap justify-content-between align-items-center mt-1"
      >
        <small class="text-muted">
          Showing {{ rangeStart }} to {{ rangeEnd }} of {{ filteredWelds.length }} entries
        </small>
        <b-pagination
          v-if="filteredWelds.length > perPage"
          v-model="currentPage"
          :total-rows="filteredWelds.length"
          :per-page="perPage"
          first-number
          last-number
          class="mb-0"
        />
      </div>

      <!-- Register Weld Modal -->
      <register-weld-modal
        :visible="showRegisterWeld"
        :weld-log="weldLog"
        :edit-weld="editingWeld"
        @close="closeRegisterWeld"
        @saved="onWeldSaved"
      />

      <!-- Register Repair Weld Modal -->
      <register-repair-weld-modal
        :visible="showRepairWeld"
        :weld-log="weldLog"
        :edit-weld="editingRepair"
        :original-weld="repairSource"
        @close="closeRepairWeld"
        @saved="onWeldSaved"
      />
    </div>
  </b-modal>
</template>

<script>
import {
  BModal,
  BTable,
  BButton,
  BBadge,
  BRow,
  BCol,
  BAvatar,
  BDropdown,
  BDropdownItem,
  BDropdownForm,
  BFormGroup,
  BFormSelect,
  BFormCheckbox,
  BFormInput,
  BInputGroup,
  BInputGroupPrepend,
  BPagination,
} from 'bootstrap-vue'
import { ref, computed, onMounted, watch } from '@vue/composition-api'
import useWeldLogs from '@/composables/weldLogs'
import useCompanyInformation from '@/composables/company-information'
import html2pdf from 'html2pdf.js'
import { $themeConfig } from '@themeConfig'
import RegisterWeldModal from './RegisterWeldModal.vue'
import RegisterRepairWeldModal from './RegisterRepairWeldModal.vue'

const NdtCell = {
  name: 'NdtCell',
  props: {
    checked: { type: Boolean, default: false },
    result: { type: String, default: null },
  },
  render(h) {
    if (!this.checked) return h('span', { class: 'text-muted' }, '')

    const variant = this.result === 'rejected'
      ? 'text-danger'
      : (this.result === 'accepted' ? 'text-success' : 'text-secondary')

    return h('feather-icon', {
      props: { icon: this.result === 'rejected' ? 'XIcon' : 'CheckIcon', size: 16 },
      class: variant,
    })
  },
}

export default {
  components: {
    BModal,
    BTable,
    BButton,
    BBadge,
    BRow,
    BCol,
    BAvatar,
    BDropdown,
    BDropdownItem,
    BDropdownForm,
    BFormGroup,
    BFormSelect,
    BFormCheckbox,
    BFormInput,
    BInputGroup,
    BInputGroupPrepend,
    BPagination,
    RegisterWeldModal,
    RegisterRepairWeldModal,
    NdtCell,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    weldLog: {
      type: Object,
      default: null,
    },
  },
  setup(props, { emit }) {
    const {
      getWeldLog,
      deleteWeld,
      exportXlsx,
    } = useWeldLogs()

    const { companyInfo, getCompanyInfo } = useCompanyInformation()
    const { appName } = $themeConfig.app

    const showRegisterWeld = ref(false)
    const showRepairWeld = ref(false)
    const editingWeld = ref(null)
    const editingRepair = ref(null)
    const repairSource = ref(null)

    const searchQuery = ref('')
    const typeFilter = ref(null)
    const visualFilter = ref(null)
    const ndtFilter = ref(null)
    const currentPage = ref(1)
    const perPage = ref(12)

    const isRepair = weld => weld.type === 'repair'

    const typeFilterOptions = [
      { value: null, text: 'All' },
      { value: 'weld', text: 'Weld' },
      { value: 'repair', text: 'Repair' },
    ]

    const visualFilterOptions = [
      { value: null, text: 'All' },
      { value: 'ok', text: 'OK' },
      { value: 'not_ok', text: 'Not OK' },
    ]

    const ndtFilterOptions = [
      { value: null, text: 'All' },
      { value: 'accepted', text: 'Accepted' },
      { value: 'rejected', text: 'Rejected' },
      { value: 'pending', text: 'No result' },
    ]

    const allColumns = [
      { key: 'weld_label', label: 'Weld No.', sortable: true, thClass: 'text-center', tdClass: 'text-center', locked: true },
      { key: 'type', label: 'Type', sortable: true, thClass: 'text-center', tdClass: 'text-center' },
      { key: 'wps_name', label: 'WPS', sortable: false },
      { key: 'welder_id', label: 'ID', sortable: false, thClass: 'text-center', tdClass: 'text-center' },
      { key: 'weld_date', label: 'Date', sortable: true, thClass: 'text-center', tdClass: 'text-center' },
      { key: 'visual_inspection', label: 'Visual', sortable: false, thClass: 'text-center', tdClass: 'text-center' },
      { key: 'ndt_rt', label: 'RT', sortable: false, thClass: 'text-center', tdClass: 'text-center' },
      { key: 'ndt_mt', label: 'MT', sortable: false, thClass: 'text-center', tdClass: 'text-center' },
      { key: 'ndt_pt', label: 'PT', sortable: false, thClass: 'text-center', tdClass: 'text-center' },
      { key: 'ndt_vt', label: 'VT', sortable: false, thClass: 'text-center', tdClass: 'text-center' },
      { key: 'repair_reason_label', label: 'Repair Reason', sortable: false, default: false },
      { key: 'ndt_accepted', label: 'NDT Result', sortable: false, thClass: 'text-center', tdClass: 'text-center' },
    ]

    const toggleableColumns = allColumns.filter(c => !c.locked)

    const visibleColumns = ref(
      allColumns.filter(c => c.default !== false).map(c => c.key),
    )

    const weldFields = computed(() => [
      ...allColumns.filter(c => c.locked || visibleColumns.value.includes(c.key)),
      { key: 'actions', label: '', sortable: false, thStyle: { width: '80px' }, tdClass: 'text-center' },
    ])

    const hasWelds = computed(() => (props.weldLog?.welds || []).length > 0)

    // Repairs sit directly beneath the weld they repair rather than at the end
    // of the log, so "4" is followed by "4 R1".
    const sortedWelds = computed(() => {
      const welds = props.weldLog?.welds || []
      return [...welds].sort((a, b) => {
        const byNo = (parseInt(a.weld_no, 10) || 0) - (parseInt(b.weld_no, 10) || 0)
        if (byNo !== 0) return byNo
        return (a.repair_no || 0) - (b.repair_no || 0)
      })
    })

    const filteredWelds = computed(() => {
      const term = searchQuery.value.trim().toLowerCase()

      return sortedWelds.value.filter(weld => {
        if (typeFilter.value && (weld.type || 'weld') !== typeFilter.value) return false
        if (visualFilter.value && weld.visual_inspection !== visualFilter.value) return false

        if (ndtFilter.value === 'pending') {
          if (weld.ndt_accepted) return false
        } else if (ndtFilter.value && weld.ndt_accepted !== ndtFilter.value) {
          return false
        }

        if (!term) return true

        return [
          weld.weld_label || weld.weld_no,
          weld.wps_name,
          weld.welder_id,
          weld.repair_reason_label,
        ].some(value => String(value ?? '').toLowerCase().includes(term))
      })
    })

    const paginatedWelds = computed(() => {
      const start = (currentPage.value - 1) * perPage.value
      return filteredWelds.value.slice(start, start + perPage.value)
    })

    const rangeStart = computed(() => (filteredWelds.value.length === 0 ? 0 : (currentPage.value - 1) * perPage.value + 1))
    const rangeEnd = computed(() => Math.min(currentPage.value * perPage.value, filteredWelds.value.length))

    const activeFilterCount = computed(() => [typeFilter.value, visualFilter.value, ndtFilter.value].filter(Boolean).length)

    const resetFilters = () => {
      typeFilter.value = null
      visualFilter.value = null
      ndtFilter.value = null
    }

    const rowClass = item => (item && isRepair(item) ? 'weld-repair-row' : '')

    // "10" must sort after "9", and "4 R1" directly after "4", so the weld number
    // column compares on its numeric parts rather than on the rendered label.
    const sortCompare = (a, b, key) => {
      if (key !== 'weld_label') return null

      const byNo = (parseInt(a.weld_no, 10) || 0) - (parseInt(b.weld_no, 10) || 0)
      return byNo !== 0 ? byNo : (a.repair_no || 0) - (b.repair_no || 0)
    }

    // Filtering can shrink the list under the current page.
    watch(filteredWelds, list => {
      const lastPage = Math.max(1, Math.ceil(list.length / perPage.value))
      if (currentPage.value > lastPage) currentPage.value = lastPage
    })

    // Opening the log fresh should not inherit the last log's search and filters.
    watch(() => props.visible, val => {
      if (!val) return
      searchQuery.value = ''
      currentPage.value = 1
      resetFilters()
    })

    const formatDate = date => {
      if (!date) return 'N/A'
      const d = new Date(date)
      const dd = String(d.getDate()).padStart(2, '0')
      const mm = String(d.getMonth() + 1).padStart(2, '0')
      const yyyy = d.getFullYear()
      return `${dd}.${mm}.${yyyy}`
    }

    const formatFileSize = bytes => {
      if (!bytes) return ''
      const mb = bytes / (1024 * 1024)
      return mb >= 1 ? `${mb.toFixed(2)} MB` : `${(bytes / 1024).toFixed(0)} KB`
    }

    const openRegisterWeldModal = () => {
      editingWeld.value = null
      showRegisterWeld.value = true
    }

    const openRepairWeldModal = (original = null) => {
      editingRepair.value = null
      repairSource.value = original
      showRepairWeld.value = true
    }

    // Repairs carry fields a plain weld does not, so they edit in their own form.
    const openEditWeldModal = weld => {
      if (isRepair(weld)) {
        repairSource.value = null
        editingRepair.value = weld
        showRepairWeld.value = true
        return
      }
      editingWeld.value = weld
      showRegisterWeld.value = true
    }

    const closeRegisterWeld = () => {
      showRegisterWeld.value = false
      editingWeld.value = null
    }

    const closeRepairWeld = () => {
      showRepairWeld.value = false
      editingRepair.value = null
      repairSource.value = null
    }

    const handleDeleteWeld = async weld => {
      // Counted by weld number, not by parent: a repair of a repair still belongs
      // to the original weld's series and goes with it.
      const repairCount = isRepair(weld)
        ? 0
        : (props.weldLog?.welds || [])
          .filter(w => w.id !== weld.id && Number(w.weld_no) === Number(weld.weld_no)).length

      const message = repairCount
        ? `This weld has ${repairCount} repair weld(s) which will also be deleted. Continue?`
        : 'Are you sure you want to delete this weld?'

      // eslint-disable-next-line no-alert
      if (!confirm(message)) return

      const success = await deleteWeld(weld.id)
      if (success && props.weldLog) {
        await getWeldLog(props.weldLog.id)
        emit('updated')
      }
    }

    const onWeldSaved = async () => {
      closeRegisterWeld()
      closeRepairWeld()
      if (props.weldLog) {
        await getWeldLog(props.weldLog.id)
        emit('updated')
      }
    }

    const ROWS_PER_PAGE = 22

    const buildWeldRow = (w, cellBorder, cellPad, centerText) => {
      const date = w.weld_date ? formatDate(w.weld_date) : ''
      const visual = w.visual_inspection === 'ok' ? 'OK' : 'Not OK'
      const rt = w.ndt_rt ? '&#10003;' : ''
      const pt = w.ndt_pt ? '&#10003;' : ''
      const mt = w.ndt_mt ? '&#10003;' : ''
      const vt = w.ndt_vt ? '&#10003;' : ''
      const accepted = w.ndt_accepted === 'accepted' ? 'Acc.' : (w.ndt_accepted === 'rejected' ? 'Rej.' : '')
      const type = w.type === 'repair' ? 'Repair' : 'Weld'
      const weldNo = w.weld_label || w.weld_no || ''
      return `<tr>
        <td style="${cellBorder} ${cellPad} ${centerText}">${weldNo}</td>
        <td style="${cellBorder} ${cellPad} ${centerText}">${type}</td>
        <td style="${cellBorder} ${cellPad} ${centerText}">${w.welder_id || ''}</td>
        <td style="${cellBorder} ${cellPad} ${centerText}">${w.wps_name || ''}</td>
        <td style="${cellBorder} ${cellPad} ${centerText}">${date}</td>
        <td style="${cellBorder} ${cellPad} ${centerText}">${visual}</td>
        <td style="${cellBorder} ${cellPad} ${centerText}">${rt}</td>
        <td style="${cellBorder} ${cellPad} ${centerText}">${pt}</td>
        <td style="${cellBorder} ${cellPad} ${centerText}">${mt}</td>
        <td style="${cellBorder} ${cellPad} ${centerText}">${vt}</td>
        <td style="${cellBorder} ${cellPad} ${centerText}">${accepted}</td>
      </tr>`
    }

    const buildEmptyRow = (cellBorder, cellPad) => {
      const cells = Array(11).fill(`<td style="${cellBorder} ${cellPad}">&nbsp;</td>`).join('')
      return `<tr>${cells}</tr>`
    }

    const buildPageHtml = ({ logoHtml, customerName, projectNo, drawingNo, cellBorder, pageNum, totalPages, dataRows, emptyCount, cellPad }) => {
      const emptyRows = Array(emptyCount).fill(buildEmptyRow(cellBorder, cellPad)).join('')

      return `
        <div style="font-family: Arial, sans-serif; font-size: 11px; padding: 10px; page-break-after: always;">
          <!-- Header table: Logo + Customer/Project/Drawing info + Page number -->
          <table style="width: 100%; border-collapse: collapse; border: 2px solid #000;">
            <tr>
              <td rowspan="3" style="width: 40%; border: 1px solid #000; text-align: center; vertical-align: middle; padding: 8px;">
                ${logoHtml}
              </td>
              <td style="border: 1px solid #000; padding: 4px 8px; font-weight: bold; width: 15%;">Customer:</td>
              <td style="border: 1px solid #000; padding: 4px 8px;">${customerName}</td>
              <td style="width: 12%; border: 1px solid #000; text-align: center; vertical-align: middle; padding: 4px; font-weight: bold;">
                Page ${pageNum} of ${totalPages}
              </td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 4px 8px; font-weight: bold;">Project No.:</td>
              <td colspan="2" style="border: 1px solid #000; padding: 4px 8px;">${projectNo}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 4px 8px; font-weight: bold;">Drawing No.:</td>
              <td colspan="2" style="border: 1px solid #000; padding: 4px 8px;">${drawingNo}</td>
            </tr>
          </table>

          <!-- Data table -->
          <table style="width: 100%; border-collapse: collapse; border: 2px solid #000; margin-top: -2px;">
            <colgroup>
              <col style="width: 8%;">
              <col style="width: 7%;">
              <col style="width: 8%;">
              <col style="width: 9%;">
              <col style="width: 11%;">
              <col style="width: 9%;">
              <col style="width: 7%;">
              <col style="width: 7%;">
              <col style="width: 7%;">
              <col style="width: 7%;">
              <col style="width: 13%;">
            </colgroup>
            <tr>
              <td colspan="4" style="border: 1px solid #000; padding: 4px;">&nbsp;</td>
              <td colspan="2" style="border: 1px solid #000; text-align: center; font-weight: bold; padding: 4px;">Welder control</td>
              <td colspan="5" style="border: 1px solid #000; text-align: center; font-weight: bold; padding: 4px;">3. parts control</td>
            </tr>
            <tr style="font-weight: bold; text-align: center;">
              <td style="${cellBorder} padding: 6px;">Weld No.</td>
              <td style="${cellBorder} padding: 6px;">Type</td>
              <td style="${cellBorder} padding: 6px;">Welder ID</td>
              <td style="${cellBorder} padding: 6px;">WPS No.</td>
              <td style="${cellBorder} padding: 6px;">End weld</td>
              <td style="${cellBorder} padding: 6px;">Visual</td>
              <td style="${cellBorder} padding: 6px;">RT</td>
              <td style="${cellBorder} padding: 6px;">PT</td>
              <td style="${cellBorder} padding: 6px;">MT</td>
              <td style="${cellBorder} padding: 6px;">VT</td>
              <td style="${cellBorder} padding: 6px;">Accepted / rejected</td>
            </tr>
            ${dataRows}
            ${emptyRows}
          </table>
        </div>`
    }

    const generatePdfHtml = () => {
      const wl = props.weldLog
      if (!wl) return ''

      const welds = sortedWelds.value

      const logoHtml = companyInfo.value && companyInfo.value.logo_url
        ? `<img src="${companyInfo.value.logo_url}" style="max-height: 60px; max-width: 200px;" crossorigin="anonymous" />`
        : `<span style="font-size: 14px; font-weight: bold;">${appName}</span>`

      const cellBorder = 'border: 1px solid #000;'
      const cellPad = 'padding: 4px 6px;'
      const centerText = 'text-align: center;'

      const customerName = wl.customer_name || ''
      const projectNo = wl.project_no && wl.project_name ? `${wl.project_no} - ${wl.project_name}` : (wl.project_no || wl.project_name || '')
      const drawingNo = wl.drawing_no || ''

      // Split welds into pages
      const pages = []
      for (let i = 0; i < welds.length; i += ROWS_PER_PAGE) {
        pages.push(welds.slice(i, i + ROWS_PER_PAGE))
      }
      if (pages.length === 0) pages.push([])

      const totalPages = pages.length

      const pagesHtml = pages.map((pageWelds, idx) => {
        const dataRows = pageWelds.map(w => buildWeldRow(w, cellBorder, cellPad, centerText)).join('')
        const emptyCount = ROWS_PER_PAGE - pageWelds.length

        return buildPageHtml({
          logoHtml,
          customerName,
          projectNo,
          drawingNo,
          cellBorder,
          cellPad,
          pageNum: idx + 1,
          totalPages,
          dataRows,
          emptyCount,
        })
      }).join('')

      return `<div>${pagesHtml}</div>`
    }

    const handleExportPdf = () => {
      const htmlContent = generatePdfHtml()
      const opt = {
        margin: 0.3,
        filename: `weld-log-${props.weldLog?.drawing_no || 'export'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' },
        pagebreak: { mode: ['css'] },
      }
      html2pdf().set(opt).from(htmlContent).save()
    }

    const handleExportXlsx = () => {
      if (props.weldLog) exportXlsx(props.weldLog.id)
    }

    const onClose = () => {
      emit('close')
    }

    onMounted(() => {
      getCompanyInfo()
    })

    return {
      weldFields,
      toggleableColumns,
      visibleColumns,
      sortedWelds,
      filteredWelds,
      paginatedWelds,
      hasWelds,
      isRepair,
      rowClass,
      sortCompare,
      searchQuery,
      typeFilter,
      visualFilter,
      ndtFilter,
      typeFilterOptions,
      visualFilterOptions,
      ndtFilterOptions,
      activeFilterCount,
      resetFilters,
      currentPage,
      perPage,
      rangeStart,
      rangeEnd,
      showRegisterWeld,
      showRepairWeld,
      editingWeld,
      editingRepair,
      repairSource,
      formatDate,
      formatFileSize,
      openRegisterWeldModal,
      openRepairWeldModal,
      openEditWeldModal,
      closeRegisterWeld,
      closeRepairWeld,
      handleDeleteWeld,
      onWeldSaved,
      handleExportPdf,
      handleExportXlsx,
      onClose,
    }
  },
}
</script>

<style scoped lang="scss">
.weld-summary-card {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(34, 41, 47, 0.08);
  border-radius: 0.428rem;
}

.weld-search {
  width: 240px;
}

.weld-filter-panel {
  min-width: 220px;
}

::v-deep .weld-repair-row {
  background-color: rgba(115, 103, 240, 0.04);
}
</style>
