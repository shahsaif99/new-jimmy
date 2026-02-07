<template>
  <b-sidebar
    id="sidebar-avvik-details"
    :visible="isVisible"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @change="(val) => $emit('update:is-visible', val)"
  >
    <template #default="{ hide }">
      <div v-if="avvikDetails">
        <!-- Header Section - Light Green Background -->
        <div class="header-section p-2">
          <div class="d-flex justify-content-between align-items-start">
            <div>
                <h2 class="brand-text pt-2">
              {{ appName }}
            </h2>
              <!-- Title -->
              <h4 class="font-weight-bolder mb-0">{{ avvikDetails.title || 'Deviation title' }}</h4>
              <!-- Type -->
              <div class="mt-1 font-weight-bold mb-0">{{ avvikDetails.type || '-' }}</div>
              <!-- Date -->
              <div class="mt-1 text-grey mb-1 text-lg">{{ avvikDetails.date || '-' }}</div>
              <!-- Status and User row -->
              <div class="d-flex align-items-center">
                <span class="status-dot mr-1" :class="getStatusDotClass(avvikDetails.close_status)"></span>
                <span class="mr-2" style="font-size: 0.85rem;">{{ avvikDetails.close_status || 'Status' }}</span>
                <span style="font-size: 0.85rem;">{{ avvikDetails.user ? avvikDetails.user.name : '-' }}</span>
              </div>
            </div>
            <!-- Right side: Buttons and ID -->
            <div class="d-flex flex-column align-items-end">
              <!-- Buttons row -->
              <div class="d-flex align-items-center mb-1">
                <b-button
                  variant="primary"
                  size="md"
                  class="mr-1 d-flex align-items-center"
                  @click="viewReport"
                >
                  <feather-icon icon="FileTextIcon" size="14" class="mr-50" />
                  {{ t('View Report') }}
                </b-button>
                <b-button
                  variant="outline-secondary"
                  size="md"
                  class="mr-1 px-75"
                  @click="downloadReport"
                >
                  <feather-icon icon="DownloadIcon" size="14" />
                </b-button>
                <b-dropdown
                  variant="link"
                  no-caret
                  right
                  toggle-class="p-0"
                >
                  <template #button-content>
                    <feather-icon icon="MoreVerticalIcon" size="18" class="text-body" />
                  </template>
                  <b-dropdown-item @click="$router.push({ name: 'avvik-listings-edit', params: { id: avvikDetails.id } })">
                    <feather-icon icon="EditIcon" size="14" class="mr-50" />
                    {{ t('Edit') }}
                  </b-dropdown-item>
                  <b-dropdown-item @click="hide">
                    <feather-icon icon="XIcon" size="14" class="mr-50" />
                    {{ t('Close') }}
                  </b-dropdown-item>
                </b-dropdown>
              </div>
              <!-- ID -->
              <div><span class="font-weight-bolder">ID</span>: S-{{ avvikDetails.id }}</div>
            </div>
          </div>
        </div>

        <!-- Content Section - White Background -->
        <div class="content-section p-2">
          <!-- Severity -->
          <div class="detail-item mb-3">
            <div class="detail-label">{{ t('Severity') }}:</div>
            <div class="detail-value">{{ avvikDetails.severity || '-' }}</div>
          </div>

          <!-- Category event -->
          <div class="detail-item mb-3">
            <div class="detail-label">{{ t('Category event') }}:</div>
            <div class="detail-value">{{ avvikDetails.event_type || '-' }}</div>
          </div>

          <!-- Description and consequence -->
          <div class="detail-item mb-3">
            <div class="detail-label">{{ t('Description and consequence') }}:</div>
            <div class="detail-value">{{ avvikDetails.description || '-' }}</div>
          </div>

          <!-- Equipment -->
          <div class="detail-item mb-3">
            <div class="detail-label">{{ t('Equipment') }}:</div>
            <div class="detail-value">
              <a v-if="avvikDetails.equipment" href="#" class="text-primary">
                {{ avvikDetails.equipment.name }}{{ avvikDetails.equipment.supplier ? ' - ' + avvikDetails.equipment.supplier : '' }}{{ avvikDetails.equipment.serial_number ? ' - ' + avvikDetails.equipment.serial_number : '' }}
              </a>
              <span v-else>-</span>
            </div>
          </div>

          <!-- Supplier -->
          <div class="detail-item mb-3">
            <div class="detail-label">{{ t('Supplier') }}:</div>
            <div class="detail-value">{{ avvikDetails.supplier ? avvikDetails.supplier.name : '-' }}</div>
          </div>

          <!-- Responsible person -->
          <div class="detail-item mb-3">
            <div class="detail-label">{{ t('Responsible person') }}:</div>
            <div class="detail-value">{{ avvikDetails.user ? avvikDetails.user.name : '-' }}</div>
          </div>

          <!-- Closed date -->
          <div class="detail-item mb-3">
            <div class="detail-label">{{ t('Closed date') }}:</div>
            <div class="detail-value">{{ avvikDetails.close_date || '-' }}</div>
          </div>

          <!-- Closed by -->
          <div class="detail-item mb-3">
            <div class="detail-label">{{ t('Closed by') }}:</div>
            <div class="detail-value">{{ avvikDetails.closed_by ? avvikDetails.closed_by.name : '-' }}</div>
          </div>
        </div>
      </div>

      <!-- Loading state -->
      <div v-else class="d-flex justify-content-center align-items-center p-5">
        <b-spinner v-if="loading" />
        <span v-else>{{ t('No data available') }}</span>
      </div>
    </template>
  </b-sidebar>
</template>

<script>
import {
  BBadge,
  BButton,
  BSidebar,
  BSpinner,
  BDropdown,
  BDropdownItem,
} from 'bootstrap-vue'
import { onMounted } from '@vue/composition-api'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import html2pdf from 'html2pdf.js'
import { $themeConfig } from '@themeConfig'
import useCompanyInformation from '@/composables/company-information'

export default {
  components: {
    BBadge,
    BButton,
    BSidebar,
    BSpinner,
    BDropdown,
    BDropdownItem,
  },
  model: {
    prop: 'isVisible',
    event: 'update:is-visible',
  },
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    avvikDetails: {
      type: Object,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { t } = useI18nUtils()
    const { companyInfo, getCompanyInfo } = useCompanyInformation()

    onMounted(() => {
      getCompanyInfo()
    })

    const getStatusDotClass = status => {
      if (status === 'Closed') {
        return 'bg-success'
      }
      if (status === 'Open') {
        return 'bg-warning'
      }
      return 'bg-primary'
    }
    const { appName, appLogoImage } = $themeConfig.app
    const generatePdfHtml = () => {
      const data = props.avvikDetails
      if (!data) return ''

      const logoHtml = companyInfo.value && companyInfo.value.logo_url
        ? `<img src="${companyInfo.value.logo_url}" style="max-height: 150px; max-width: 180px;" crossorigin="anonymous" />`
        : `<h2 style="margin: 0;">${appName}</h2>`

      return `
        <div style="font-family: Arial, sans-serif; padding: 20px; font-size: 12px;">
          <!-- Header -->
          <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 50px;">
            <h1 style="margin: 0; font-size: 18px; ">${data.type || 'HSE DEVIATION'}</h1>
            <div style="text-align: right;">
                ${logoHtml}
                </div>
          </div>

          <!-- Border after header -->
          <div style="border-bottom: 2px solid ; margin-bottom: 50px;"></div>

          <!-- Title Section -->
          <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 50px;">
            <h2 style="margin: 0; font-size: 20px; font-weight: bold;">${data.title || 'Title of the deviation'}</h2>
            <div style="font-size: 12px;"><strong>REGISTERED DATE</strong> ${data.date || '-'}</div>
          </div>

          <!-- Border after title -->
          <div style="border-bottom: 2px solid ; margin-bottom: 20px;"></div>

          <!-- Two Column Layout -->
          <div style="display: flex; gap: 40px;">
            <!-- Left Column - Details -->
            <div style="min-width:500px">
              <table style="width: 100%; border-collapse: collapse; border: 2px solid #333;">
                <tr>
                  <td style="padding: 12px 8px; font-weight: bold; white-space: nowrap; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-left: 2px solid #333;">ID:</td>
                  <td style="padding: 12px 8px; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-right: 2px solid #333;">S-${data.id || '-'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 8px; font-weight: bold; white-space: nowrap; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-left: 2px solid #333;">STATUS:</td>
                  <td style="padding: 12px 8px; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-right: 2px solid #333;">${data.close_status || data.status || '-'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 8px; font-weight: bold; white-space: nowrap; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-left: 2px solid #333;">TIME OF INCIDENT:</td>
                  <td style="padding: 12px 8px; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-right: 2px solid #333;">${data.time_of_incident || '-'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 8px; font-weight: bold; white-space: nowrap; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-left: 2px solid #333;">REGISTERED DATE:</td>
                  <td style="padding: 12px 8px; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-right: 2px solid #333;">${data.date || '-'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 8px; font-weight: bold; white-space: nowrap; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-left: 2px solid #333;">REGISTERED BY:</td>
                  <td style="padding: 12px 8px; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-right: 2px solid #333;">${data.registered_by || '-'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 8px; font-weight: bold; white-space: nowrap; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-left: 2px solid #333;">PROCESSED BY:</td>
                  <td style="padding: 12px 8px; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-right: 2px solid #333;">${data.user ? data.user.name : '-'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 8px; font-weight: bold; white-space: nowrap; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-left: 2px solid #333;">TYPE:</td>
                  <td style="padding: 12px 8px; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-right: 2px solid #333;">${data.type || '-'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 8px; font-weight: bold; white-space: nowrap; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-left: 2px solid #333;">PROJECT:</td>
                  <td style="padding: 12px 8px; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-right: 2px solid #333;">${data.project ? data.project.name : '-'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 8px; font-weight: bold; white-space: nowrap; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-left: 2px solid #333;">CATEGORY:</td>
                  <td style="padding: 12px 8px; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-right: 2px solid #333;">${data.event_type || '-'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 8px; font-weight: bold; white-space: nowrap; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-left: 2px solid #333;">LOCATION:</td>
                  <td style="padding: 12px 8px; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-right: 2px solid #333;">${data.location || '-'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 8px; font-weight: bold; white-space: nowrap; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-left: 2px solid #333;">SEVERITY:</td>
                  <td style="padding: 12px 8px; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-right: 2px solid #333;">${data.severity || '-'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 8px; font-weight: bold; white-space: nowrap; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-left: 2px solid #333;">RESULT IN ABSENCE:</td>
                  <td style="padding: 12px 8px; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-right: 2px solid #333;">${data.resulted_in_absence ? 'Yes' : 'No'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 8px; font-weight: bold; white-space: nowrap; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-left: 2px solid #333;">MEDICAL TREATMENT:</td>
                  <td style="padding: 12px 8px; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-right: 2px solid #333;">${data.medical_treatment_needed ? 'Yes' : 'No'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 8px; font-weight: bold; white-space: nowrap; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-left: 2px solid #333;">DAYS:</td>
                  <td style="padding: 12px 8px; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-right: 2px solid #333;">${data.days_of_absence ? data.days_of_absence + ' days' : '-'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 8px; font-weight: bold; white-space: nowrap; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-left: 2px solid #333;">CLOSED:</td>
                  <td style="padding: 12px 8px; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-right: 2px solid #333;">${data.close_date || '-'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 8px; font-weight: bold; white-space: nowrap; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-left: 2px solid #333;">CLOSED BY:</td>
                  <td style="padding: 12px 8px; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-right: 2px solid #333;">${data.closed_by ? data.closed_by.name : '-'}</td>
                </tr>
              </table>
            </div>

            <!-- Right Column - Descriptions -->
            <div style="flex: 1.2;">
              <div style="margin-bottom: 25px;">
                <h3 style="font-size: 13px; font-weight: bold; margin-bottom: 8px; ">DESCRIPTION OF DEVIATION:</h3>
                <p style="margin: 0; line-height: 1.5; ">${data.description || '-'}</p>
              </div>

              <div style="margin-bottom: 25px;">
                <h3 style="font-size: 13px; font-weight: bold; margin-bottom: 8px; ">DESCRIPTION OF THE OUTCOME OF THE INCIDENT</h3>
                <p style="margin: 0; line-height: 1.5; ">${data.casual_analysis || '-'}</p>
              </div>

              <div style="margin-bottom: 25px;">
                <h3 style="font-size: 13px; font-weight: bold; margin-bottom: 8px; ">DESCRIPTION OF IMMEDIATE ACTIONS:</h3>
                <p style="margin: 0; line-height: 1.5; ">${data.immediate_action || '-'}</p>
              </div>

              <div style="margin-bottom: 25px;">
                <h3 style="font-size: 13px; font-weight: bold; margin-bottom: 8px; ">COMMENT ON CLOSING INCIDENT:</h3>
                <p style="margin: 0; line-height: 1.5; ">${data.close_comment || '-'}</p>
              </div>
            </div>
          </div>
        </div>
      `
    }

    const viewReport = () => {
      const htmlContent = generatePdfHtml()
      const newWindow = window.open('', '_blank')
      newWindow.document.write(`
        <html>
          <head>
            <title>Avvik Report - S-${props.avvikDetails?.id || ''}</title>
            <style>
              body { margin: 0; padding: 20px; }
              @media print {
                body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
              }
            </style>
          </head>
          <body>
            ${htmlContent}
          </body>
        </html>
      `)
      newWindow.document.close()
    }

    const downloadReport = () => {
      const htmlContent = generatePdfHtml()
      const opt = {
        margin: 0.5,
        filename: `Avvik-Report-S-${props.avvikDetails?.id || 'unknown'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      }
      html2pdf().set(opt).from(htmlContent).save()
    }

    return {
      t,
      getStatusDotClass,
      viewReport,
      downloadReport,
        appName,
    }
  },
}
</script>

<style lang="scss" scoped>
::v-deep .sidebar-lg {
  width: 800px !important;
}

.header-section {
  background-color: #d4edda;
  border-bottom: 1px solid #c3e6cb;
}

.content-section {
  background-color: #ffffff;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.detail-item {
  .detail-label {
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  .detail-value {
    color: #6e6b7b;
  }
}

.cursor-pointer {
  cursor: pointer;
}
</style>
