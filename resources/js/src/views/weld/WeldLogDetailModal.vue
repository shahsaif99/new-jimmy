<template>
  <b-modal
    :visible="visible"
    title="Weld Log Detail"
    size="xl"
    hide-footer
    @hidden="onClose"
  >
    <div v-if="weldLog">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <div>
          <h5 class="mb-0">Drawing No: {{ weldLog.drawing_no }}</h5>
        </div>
        <div>
          <b-button
            variant="outline-primary"
            size="sm"
            class="mr-1"
            @click="handleExportPdf"
          >
            <feather-icon icon="DownloadIcon" size="14" class="mr-50" />
            PDF
          </b-button>
          <b-button
            variant="primary"
            size="sm"
            @click="openRegisterWeldModal"
          >
            Add Weld
          </b-button>
        </div>
      </div>

      <b-row class="mb-2">
        <b-col md="3">
          <h5 class="mb-0">Project No: {{ weldLog.project_no }} - {{ weldLog.project_name }}</h5>
        </b-col>
      </b-row>
      <b-row v-if="weldLog.ndt_required" class="mb-2">
        <b-col md="12">
          <strong>NDT Requirements:</strong>
          <span class="ml-1">
            RT: {{ weldLog.ndt_rt }} | MT: {{ weldLog.ndt_mt }} | PT: {{ weldLog.ndt_pt }} | VT: {{ weldLog.ndt_vt }}
          </span>
        </b-col>
      </b-row>

      <b-row v-if="weldLog.media && weldLog.media.length" class="mb-2">
        <b-col md="12">
          <strong>Attached Files:</strong>
          <div class="mt-50">
            <div
              v-for="file in weldLog.media"
              :key="file.id"
              class="d-inline-flex align-items-center border rounded p-50 mr-1 mb-50"
            >
              <feather-icon icon="FileIcon" size="14" class="text-primary mr-50" />
              <a :href="file.url" target="_blank">{{ file.filename }}</a>
            </div>
          </div>
        </b-col>
      </b-row>

      <b-table
        v-if="weldLog.welds && weldLog.welds.length"
        :items="weldLog.welds"
        :fields="weldFields"
        responsive
        hover
        striped
        class="mb-0"
      >
        <template #cell(weld_date)="data">
          {{ formatDate(data.item.weld_date) }}
        </template>

        <template #cell(visual_inspection)="data">
          <b-badge :variant="data.item.visual_inspection === 'ok' ? 'success' : 'danger'">
            {{ data.item.visual_inspection === 'ok' ? 'OK' : 'Not OK' }}
          </b-badge>
        </template>

        <template #cell(ndt_rt)="data">
          <feather-icon v-if="data.item.ndt_rt" icon="CheckIcon" class="text-success" size="16" />
          <feather-icon v-else icon="XIcon" class="text-danger" size="16" />
        </template>

        <template #cell(ndt_mt)="data">
          <feather-icon v-if="data.item.ndt_mt" icon="CheckIcon" class="text-success" size="16" />
          <feather-icon v-else icon="XIcon" class="text-danger" size="16" />
        </template>

        <template #cell(ndt_pt)="data">
          <feather-icon v-if="data.item.ndt_pt" icon="CheckIcon" class="text-success" size="16" />
          <feather-icon v-else icon="XIcon" class="text-danger" size="16" />
        </template>

        <template #cell(ndt_vt)="data">
          <feather-icon v-if="data.item.ndt_vt" icon="CheckIcon" class="text-success" size="16" />
          <feather-icon v-else icon="XIcon" class="text-danger" size="16" />
        </template>

        <template #cell(ndt_accepted)="data">
          <b-badge
            v-if="data.item.ndt_accepted"
            :variant="data.item.ndt_accepted === 'accepted' ? 'success' : 'danger'"
          >
            {{ data.item.ndt_accepted }}
          </b-badge>
          <span v-else class="text-muted">-</span>
        </template>

        <template #cell(actions)="data">
          <b-button
            variant="flat-primary"
            size="sm"
            @click="openEditWeldModal(data.item)"
          >
            <feather-icon icon="EditIcon" size="14" />
          </b-button>
          <b-button
            variant="flat-danger"
            size="sm"
            @click="handleDeleteWeld(data.item.id)"
          >
            <feather-icon icon="TrashIcon" size="14" />
          </b-button>
        </template>
      </b-table>

      <div
        v-else
        class="text-center text-muted py-4"
      >
        No welds registered yet
      </div>
    </div>

    <!-- Register Weld Modal -->
    <register-weld-modal
      :visible="showRegisterWeld"
      :weld-log="weldLog"
      :edit-weld="editingWeld"
      @close="closeRegisterWeld"
      @saved="onWeldSaved"
    />
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
} from 'bootstrap-vue'
import { ref, onMounted } from '@vue/composition-api'
import useWeldLogs from '@/composables/weldLogs'
import useCompanyInformation from '@/composables/company-information'
import html2pdf from 'html2pdf.js'
import { $themeConfig } from '@themeConfig'
import RegisterWeldModal from './RegisterWeldModal.vue'

export default {
  components: {
    BModal,
    BTable,
    BButton,
    BBadge,
    BRow,
    BCol,
    RegisterWeldModal,
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
    const editingWeld = ref(null)

    const weldFields = [
      { key: 'weld_no', label: 'Weld No.', sortable: true, thClass: 'text-center', tdClass: 'text-center' },
      { key: 'wps_name', label: 'WPS', sortable: false },
      { key: 'welder_id', label: 'ID', sortable: false, thClass: 'text-center', tdClass: 'text-center' },
      { key: 'weld_date', label: 'Date', sortable: true, thClass: 'text-center', tdClass: 'text-center' },
      { key: 'visual_inspection', label: 'Visual', sortable: false, thClass: 'text-center', tdClass: 'text-center' },
      { key: 'ndt_rt', label: 'RT', sortable: false, thClass: 'text-center', tdClass: 'text-center' },
      { key: 'ndt_mt', label: 'MT', sortable: false, thClass: 'text-center', tdClass: 'text-center' },
      { key: 'ndt_pt', label: 'PT', sortable: false, thClass: 'text-center', tdClass: 'text-center' },
      { key: 'ndt_vt', label: 'VT', sortable: false, thClass: 'text-center', tdClass: 'text-center' },
      { key: 'ndt_accepted', label: 'NDT Result', sortable: false, thClass: 'text-center', tdClass: 'text-center' },
      { key: 'actions', label: '', sortable: false, thStyle: { width: '80px' }, tdClass: 'text-center' },
    ]

    const formatDate = (date) => {
      if (!date) return 'N/A'
      const d = new Date(date)
      const dd = String(d.getDate()).padStart(2, '0')
      const mm = String(d.getMonth() + 1).padStart(2, '0')
      const yyyy = d.getFullYear()
      return `${dd}.${mm}.${yyyy}`
    }

    const formatFileSize = (bytes) => {
      if (!bytes) return ''
      const mb = bytes / (1024 * 1024)
      return mb >= 1 ? mb.toFixed(2) + ' MB' : (bytes / 1024).toFixed(0) + ' KB'
    }

    const openRegisterWeldModal = () => {
      editingWeld.value = null
      showRegisterWeld.value = true
    }

    const openEditWeldModal = (weld) => {
      editingWeld.value = weld
      showRegisterWeld.value = true
    }

    const closeRegisterWeld = () => {
      showRegisterWeld.value = false
      editingWeld.value = null
    }

    const handleDeleteWeld = async (id) => {
      if (!confirm('Are you sure you want to delete this weld?')) return
      const success = await deleteWeld(id)
      if (success && props.weldLog) {
        await getWeldLog(props.weldLog.id)
        emit('updated')
      }
    }

    const onWeldSaved = async () => {
      closeRegisterWeld()
      if (props.weldLog) {
        await getWeldLog(props.weldLog.id)
        emit('updated')
      }
    }

    const generatePdfHtml = () => {
      const wl = props.weldLog
      if (!wl) return ''

      const welds = wl.welds || []

      const logoHtml = companyInfo.value && companyInfo.value.logo_url
        ? `<img src="${companyInfo.value.logo_url}" style="max-height: 60px; max-width: 200px;" crossorigin="anonymous" />`
        : `<span style="font-size: 14px; font-weight: bold;">${appName}</span>`

      const cellBorder = 'border: 1px solid #000;'
      const cellPad = 'padding: 4px 6px;'
      const centerText = 'text-align: center;'

      // Build weld data rows
      const dataRows = welds.map((w) => {
        const date = w.weld_date ? formatDate(w.weld_date) : ''
        const visual = w.visual_inspection === 'ok' ? 'OK' : 'Not OK'
        const rt = w.ndt_rt ? '&#10003;' : '&#10007;'
        const pt = w.ndt_pt ? '&#10003;' : '&#10007;'
        const mt = w.ndt_mt ? '&#10003;' : '&#10007;'
        const vt = w.ndt_vt ? '&#10003;' : '&#10007;'
        const accepted = w.ndt_accepted === 'accepted' ? 'Acc.' : (w.ndt_accepted === 'rejected' ? 'Rej.' : '')
        return `<tr>
          <td style="${cellBorder} ${cellPad} ${centerText}">${w.weld_no || ''}</td>
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
      }).join('')

      // Fill remaining empty rows to fit one page (~18 total rows for landscape A4)
      const totalRows = Math.max(18, welds.length)
      const emptyCount = totalRows - welds.length
      let emptyRows = ''
      for (let i = 0; i < emptyCount; i++) {
        emptyRows += `<tr>
          <td style="${cellBorder} ${cellPad}">&nbsp;</td>
          <td style="${cellBorder} ${cellPad}">&nbsp;</td>
          <td style="${cellBorder} ${cellPad}">&nbsp;</td>
          <td style="${cellBorder} ${cellPad}">&nbsp;</td>
          <td style="${cellBorder} ${cellPad}">&nbsp;</td>
          <td style="${cellBorder} ${cellPad}">&nbsp;</td>
          <td style="${cellBorder} ${cellPad}">&nbsp;</td>
          <td style="${cellBorder} ${cellPad}">&nbsp;</td>
          <td style="${cellBorder} ${cellPad}">&nbsp;</td>
          <td style="${cellBorder} ${cellPad}">&nbsp;</td>
        </tr>`
      }

      const customerName = wl.customer_name || ''
      const projectNo = wl.project_no && wl.project_name ? wl.project_no + ' - ' + wl.project_name : (wl.project_no || wl.project_name || '')
      const drawingNo = wl.drawing_no || ''

      return `
        <div style="font-family: Arial, sans-serif; font-size: 11px; padding: 10px;">
          <!-- Header table: Logo + Customer/Project/Drawing info -->
          <table style="width: 100%; border-collapse: collapse; border: 2px solid #000;">
            <tr>
              <td rowspan="3" style="width: 40%; border: 1px solid #000; text-align: center; vertical-align: middle; padding: 8px;">
                ${logoHtml}
              </td>
              <td style="border: 1px solid #000; padding: 4px 8px; font-weight: bold; width: 15%;">Customer:</td>
              <td style="border: 1px solid #000; padding: 4px 8px;">${customerName}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 4px 8px; font-weight: bold;">Project No.:</td>
              <td style="border: 1px solid #000; padding: 4px 8px;">${projectNo}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 4px 8px; font-weight: bold;">Drawing No.:</td>
              <td style="border: 1px solid #000; padding: 4px 8px;">${drawingNo}</td>
            </tr>
          </table>

          <!-- Data table -->
          <table style="width: 100%; border-collapse: collapse; border: 2px solid #000; margin-top: -2px;">
            <!-- Sub-header: Welder control | 3. parts control -->
            <colgroup>
              <col style="width: 8%;">
              <col style="width: 9%;">
              <col style="width: 9%;">
              <col style="width: 12%;">
              <col style="width: 9%;">
              <col style="width: 8%;">
              <col style="width: 8%;">
              <col style="width: 8%;">
              <col style="width: 8%;">
              <col style="width: 14%;">
            </colgroup>
            <tr>
              <td colspan="3" style="border: 1px solid #000; padding: 4px;">&nbsp;</td>
              <td colspan="2" style="border: 1px solid #000; text-align: center; font-weight: bold; padding: 4px;">Welder control</td>
              <td colspan="5" style="border: 1px solid #000; text-align: center; font-weight: bold; padding: 4px;">3. parts control</td>
            </tr>
            <!-- Column headers -->
            <tr style="font-weight: bold; text-align: center;">
              <td style="${cellBorder} padding: 6px;">Weld No.</td>
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
            <!-- Data rows -->
            ${dataRows}
            <!-- Empty rows -->
            ${emptyRows}
          </table>
        </div>
      `
    }

    const handleExportPdf = () => {
      const htmlContent = generatePdfHtml()
      const opt = {
        margin: 0.3,
        filename: `weld-log-${props.weldLog?.drawing_no || 'export'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' },
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
      showRegisterWeld,
      editingWeld,
      formatDate,
      formatFileSize,
      openRegisterWeldModal,
      openEditWeldModal,
      closeRegisterWeld,
      handleDeleteWeld,
      onWeldSaved,
      handleExportPdf,
      handleExportXlsx,
      onClose,
    }
  },
}
</script>
