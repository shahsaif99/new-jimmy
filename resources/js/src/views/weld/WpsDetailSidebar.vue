<template>
  <b-sidebar
    id="sidebar-wps-details"
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
      <div v-if="wpsDetails">
        <!-- Header -->
        <div class="header-section p-2">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <h4 class="font-weight-bolder mb-0">{{ wpsDetails.name }}</h4>
            </div>
            <div class="d-flex align-items-center">
              <b-button
                variant="primary"
                size="md"
                class="mr-1 d-flex align-items-center"
                @click="viewReport"
              >
                <feather-icon icon="FileTextIcon" size="14" class="mr-50" />
                View Report
              </b-button>
              <b-button
                variant="outline-secondary"
                size="md"
                class="mr-1 px-75"
                @click="$emit('download', wpsDetails)"
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
                <b-dropdown-item v-if="$can('wps-edit', 'all')" @click="$emit('edit', wpsDetails)">
                  <feather-icon icon="EditIcon" size="14" class="mr-50" />
                  Edit
                </b-dropdown-item>
                <b-dropdown-item @click="hide">
                  <feather-icon icon="XIcon" size="14" class="mr-50" />
                  Close
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="content-section p-2">
          <table class="detail-table w-100">
            <tr>
              <td class="detail-label">Welding Process:</td>
              <td class="detail-value">{{ wpsDetails.welding_process || '-' }}</td>
            </tr>
            <tr>
              <td class="detail-label">Document Number:</td>
              <td class="detail-value">{{ wpsDetails.name || '-' }}</td>
            </tr>
            <tr>
              <td class="detail-label">WPQR Number:</td>
              <td class="detail-value">{{ wpsDetails.wpqr || '-' }}</td>
            </tr>
            <tr>
              <td class="detail-label">Thickness:</td>
              <td class="detail-value">{{ wpsDetails.thickness || '-' }}</td>
            </tr>
            <tr>
              <td class="detail-label">Diameter:</td>
              <td class="detail-value">{{ wpsDetails.diameter || '-' }}</td>
            </tr>
            <tr>
              <td class="detail-label">Joint Type:</td>
              <td class="detail-value">{{ formatArray(wpsDetails.joint_type) }}</td>
            </tr>
            <tr>
              <td class="detail-label">Group:</td>
              <td class="detail-value">{{ wpsDetails.material_group || '-' }}</td>
            </tr>
            <tr>
              <td class="detail-label">Welding Position:</td>
              <td class="detail-value">{{ formatArray(wpsDetails.welding_position) }}</td>
            </tr>
            <tr>
              <td class="detail-label">Layer:</td>
              <td class="detail-value">{{ wpsDetails.layer || '-' }}</td>
            </tr>
            <tr>
              <td class="detail-label">Side:</td>
              <td class="detail-value">{{ formatSides(wpsDetails.sides) }}</td>
            </tr>
            <tr>
              <td class="detail-label">Standard:</td>
              <td class="detail-value">{{ formatArray(wpsDetails.standard) }}</td>
            </tr>
            <tr>
              <td class="detail-label">Ref. Standard:</td>
              <td class="detail-value">{{ formatArray(wpsDetails.ref_spec) }}</td>
            </tr>
            <tr>
              <td class="detail-label">Prepared Date:</td>
              <td class="detail-value">{{ formatDate(wpsDetails.prepared_date) }}</td>
            </tr>
            <tr>
              <td class="detail-label">Prepared By:</td>
              <td class="detail-value">{{ wpsDetails.prepared_by_name || '-' }}</td>
            </tr>
          </table>

          <!-- Attached Files -->
          <div v-if="wpsDetails.media && wpsDetails.media.length" class="mt-3">
            <h5 class="font-weight-bolder">Attached Files</h5>
            <div
              v-for="file in wpsDetails.media"
              :key="file.id"
              class="d-flex justify-content-between align-items-center p-1 border rounded mb-1"
            >
              <div class="d-flex align-items-center">
                <feather-icon icon="FileIcon" size="16" class="text-danger mr-1" />
                <span>{{ file.filename }}</span>
              </div>
              <div class="d-flex align-items-center">
                <small class="text-muted mr-1">{{ formatFileSize(file.size) }}</small>
                <a :href="file.url" target="_blank" class="text-body">
                  <feather-icon icon="DownloadIcon" size="16" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading state -->
      <div v-else class="d-flex justify-content-center align-items-center p-5">
        <b-spinner v-if="loading" />
        <span v-else>No data available</span>
      </div>
    </template>
  </b-sidebar>
</template>

<script>
import {
  BButton,
  BSidebar,
  BSpinner,
  BDropdown,
  BDropdownItem,
} from 'bootstrap-vue'

export default {
  components: {
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
    wpsDetails: {
      type: Object,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const viewReport = () => {
      if (props.wpsDetails?.media?.length) {
        window.open(props.wpsDetails.media[0].url, '_blank')
      }
    }

    const formatArray = (arr) => {
      if (!arr || !arr.length) return '-'
      return arr.join(', ')
    }

    const formatSides = (sides) => {
      if (sides === 'bs') return 'Both Sides'
      if (sides === 'ss') return 'Single Side'
      return sides || '-'
    }

    const formatDate = (date) => {
      if (!date) return '-'
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

    return {
      viewReport,
      formatArray,
      formatSides,
      formatDate,
      formatFileSize,
    }
  },
}
</script>

<style lang="scss" scoped>
::v-deep .sidebar-lg {
  width: 500px !important;
}

.header-section {
  border-bottom: 1px solid #ebe9f1;
}

.detail-table {
  border-collapse: collapse;

  tr {
    border-bottom: 1px solid #ebe9f1;
  }

  td {
    padding: 0.75rem 0.5rem;
  }

  .detail-label {
    font-weight: 600;
    white-space: nowrap;
    width: 40%;
  }

  .detail-value {
    text-align: right;
    color: #6e6b7b;
  }
}
</style>
