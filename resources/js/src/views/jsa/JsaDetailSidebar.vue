<template>
  <b-sidebar
    id="sidebar-jsa-details"
    :visible="isVisible"
    bg-variant="white"
    sidebar-class="sidebar-lg jsa-detail-sidebar"
    shadow
    backdrop
    no-header
    right
    @change="(val) => $emit('update:is-visible', val)"
  >
    <template #default="{ hide }">
      <b-overlay :show="apiHelpers.loading" variant="transparent" rounded="sm">
        <div v-if="jsa" class="p-2">
          <!-- Header -->
          <div class="d-flex justify-content-between align-items-start mb-1">
            <span class="text-primary font-weight-bold">{{ jsa.jsa_no }}</span>
            <div class="d-flex align-items-center" style="gap: 6px">
              <b-button size="sm" variant="outline-secondary" @click="onDownload">
                <feather-icon icon="DownloadIcon" size="14" class="mr-50" />
                {{ t('Download') }}
              </b-button>
              <b-button v-if="canManage" size="sm" variant="outline-primary" @click="onEdit">
                <feather-icon icon="EditIcon" size="14" class="mr-50" />
                {{ t('Edit') }}
              </b-button>
              <b-dropdown v-if="canManage" variant="link" no-caret right>
                <template #button-content>
                  <feather-icon icon="MoreVerticalIcon" size="16" class="text-body" />
                </template>
                <b-dropdown-header>{{ t('Change status') }}</b-dropdown-header>
                <b-dropdown-item
                  v-for="option in statusOptions"
                  :key="option.value"
                  :active="jsa.status === option.value"
                  @click="onStatusChange(option.value)"
                >
                  {{ t(option.text) }}
                </b-dropdown-item>
              </b-dropdown>
              <b-button variant="flat-secondary" class="btn-icon" size="sm" @click="hide">
                <feather-icon icon="XIcon" size="16" />
              </b-button>
            </div>
          </div>

          <h4 class="font-weight-bolder mb-50">{{ jsa.title }}</h4>
          <b-badge :variant="statusVariant(jsa.status)" class="mb-2">
            {{ t(statusLabel(jsa.status)) }}
          </b-badge>

          <!-- General information -->
          <h6 class="text-muted text-uppercase mb-1">{{ t('General information') }}</h6>
          <b-row class="mb-2">
            <b-col cols="5" class="text-muted mb-50">{{ t('Project') }}</b-col>
            <b-col cols="7" class="mb-50">{{ jsa.project_name || '—' }}</b-col>
            <b-col cols="5" class="text-muted mb-50">{{ t('Date') }}</b-col>
            <b-col cols="7" class="mb-50">{{ formatDate(jsa.jsa_date) || '—' }}</b-col>
            <b-col cols="5" class="text-muted mb-50">{{ t('JSA Leader') }}</b-col>
            <b-col cols="7" class="mb-50">{{ jsa.jsa_leader_name || '—' }}</b-col>
            <b-col cols="5" class="text-muted">{{ t('Work Location') }}</b-col>
            <b-col cols="7">{{ jsa.work_location || '—' }}</b-col>
          </b-row>

          <!-- Description -->
          <h6 class="text-muted text-uppercase mb-1">{{ t('Description') }}</h6>
          <p class="mb-2" style="white-space: pre-line">{{ jsa.description || '—' }}</p>

          <!-- Work types, hazards and controls -->
          <h6 class="text-muted text-uppercase mb-1">
            {{ t('Work types, hazards and controls') }}
          </h6>
          <b-table-simple v-if="hazards.length" small bordered responsive class="mb-1">
            <b-thead>
              <b-tr>
                <b-th>{{ t('Work type') }}</b-th>
                <b-th>{{ t('Hazard') }}</b-th>
                <b-th>{{ t('Control measure') }}</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr v-for="(row, index) in visibleHazards" :key="index">
                <b-td>{{ row.work_type }}</b-td>
                <b-td>{{ row.hazard }}</b-td>
                <b-td>{{ row.control }}</b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
          <p v-else class="text-muted mb-1">{{ t('No entries yet.') }}</p>

          <b-link
            v-if="hazards.length > collapsedHazardCount"
            class="d-block mb-2"
            @click="showAllHazards = !showAllHazards"
          >
            {{ showAllHazards ? t('Show less') : t('View all details') }}
          </b-link>

          <!-- Participants -->
          <div class="d-flex justify-content-between align-items-center mb-1">
            <h6 class="text-muted text-uppercase mb-0">{{ t('Participants') }}</h6>
            <small class="text-muted">
              {{ jsa.participants_signed }} / {{ jsa.participants_total }} {{ t('signed') }}
            </small>
          </div>

          <div v-if="participants.length">
            <div
              v-for="participant in participants"
              :key="participant.id"
              class="d-flex justify-content-between align-items-center py-50"
            >
              <span>
                {{ participant.name }}
                <b-badge v-if="!participant.can_sign_in_app" variant="light-secondary" class="ml-50">
                  {{ t('No app access') }}
                </b-badge>
              </span>

              <span class="d-inline-flex align-items-center">
                <span
                  class="d-inline-flex align-items-center"
                  :class="participant.has_signed ? 'text-success' : 'text-muted'"
                >
                  <span class="jsa-dot mr-50" :class="participant.has_signed ? 'bg-success' : 'bg-secondary'" />
                  {{ t(signatureLabel(participant.signature_status)) }}
                </span>

                <!--
                  The leader records paper signatures. An in-app signature is
                  the participant's own act and is never overwritten from here.
                -->
                <b-dropdown
                  v-if="canManage && participant.signature_status !== 'signed_in_app'"
                  variant="link"
                  no-caret
                  right
                  size="sm"
                >
                  <template #button-content>
                    <feather-icon icon="MoreVerticalIcon" size="14" class="text-body" />
                  </template>
                  <b-dropdown-item
                    v-if="participant.signature_status !== 'signed_on_paper'"
                    @click="onRecordSignature(participant, 'signed_on_paper')"
                  >
                    {{ t('Mark as signed on paper') }}
                  </b-dropdown-item>
                  <b-dropdown-item
                    v-else
                    @click="onRecordSignature(participant, 'not_signed')"
                  >
                    {{ t('Clear signature') }}
                  </b-dropdown-item>
                </b-dropdown>
              </span>
            </div>
          </div>
          <p v-else class="text-muted">{{ t('No participants added yet.') }}</p>

          <div v-if="myParticipation" class="mt-2">
            <b-button
              v-if="!myParticipation.has_signed"
              variant="primary"
              block
              :disabled="apiHelpers.saving"
              @click="onSign"
            >
              <feather-icon icon="EditIcon" size="15" class="mr-50" />
              {{ t('Sign JSA') }}
            </b-button>
            <b-alert v-else variant="success" show class="mb-0">
              <div class="alert-body d-flex align-items-center">
                <feather-icon icon="CheckCircleIcon" size="15" class="mr-50" />
                <span v-if="myParticipation.signed_at">
                  {{ t('You signed this JSA on') }} {{ formatDateTime(myParticipation.signed_at) }}
                </span>
                <span v-else>{{ t('You have signed this JSA.') }}</span>
              </div>
            </b-alert>
          </div>
        </div>
      </b-overlay>
    </template>
  </b-sidebar>
</template>

<script>
import {
  BAlert,
  BBadge,
  BButton,
  BCol,
  BDropdown,
  BDropdownHeader,
  BDropdownItem,
  BLink,
  BOverlay,
  BRow,
  BSidebar,
  BTableSimple,
  BTbody,
  BTd,
  BTh,
  BThead,
  BTr,
} from 'bootstrap-vue'
import { computed, ref } from '@vue/composition-api'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import useJwt from '@/auth/jwt/useJwt'
import useJobSafetyAnalysis from '@/composables/job-safety-analysis'

export default {
  name: 'JsaDetailSidebar',
  components: {
    BAlert,
    BBadge,
    BButton,
    BCol,
    BDropdown,
    BDropdownHeader,
    BDropdownItem,
    BLink,
    BOverlay,
    BRow,
    BSidebar,
    BTableSimple,
    BTbody,
    BTd,
    BTh,
    BThead,
    BTr,
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const { t } = useI18nUtils()
    const {
      current,
      apiHelpers,
      signJsa,
      recordSignature,
      changeStatus,
      downloadPdf,
      statusOptions,
      statusVariant,
      statusLabel,
      signatureLabel,
      formatDate,
      formatDateTime,
    } = useJobSafetyAnalysis()

    const userData = JSON.parse(useJwt.getUserData())
    const isAdmin = userData.role === 'Admin' || userData.role === 'Super Admin'

    const collapsedHazardCount = 2
    const showAllHazards = ref(false)

    const jsa = computed(() => current.value)
    const hazards = computed(() => (jsa.value && jsa.value.hazards) || [])
    const participants = computed(() => (jsa.value && jsa.value.participants) || [])

    const visibleHazards = computed(() =>
      showAllHazards.value ? hazards.value : hazards.value.slice(0, collapsedHazardCount)
    )

    const myParticipation = computed(() =>
      participants.value.find((p) => p.is_me) || null
    )

    // Editing, status changes and paper signatures belong to the leader, the
    // author and admins — the same rule the API enforces.
    const canManage = computed(() => {
      if (!jsa.value) return false
      return (
        isAdmin ||
        jsa.value.jsa_leader_id === userData.id ||
        jsa.value.created_by === userData.id
      )
    })

    const onSign = async () => {
      await signJsa(jsa.value.id)
      emit('changed')
    }

    const onRecordSignature = async (participant, status) => {
      await recordSignature(jsa.value.id, participant.id, status)
      emit('changed')
    }

    const onStatusChange = async (status) => {
      if (jsa.value.status === status) return
      await changeStatus(jsa.value.id, status)
      emit('changed')
    }

    const onDownload = () => downloadPdf(jsa.value)

    const onEdit = () => {
      emit('update:is-visible', false)
      emit('edit', jsa.value)
    }

    return {
      t,
      jsa,
      hazards,
      visibleHazards,
      participants,
      myParticipation,
      canManage,
      apiHelpers,
      collapsedHazardCount,
      showAllHazards,
      statusOptions,
      statusVariant,
      statusLabel,
      signatureLabel,
      formatDate,
      formatDateTime,
      onSign,
      onRecordSignature,
      onStatusChange,
      onDownload,
      onEdit,
    }
  },
}
</script>

<!-- Not scoped: the width has to reach the .b-sidebar element itself, and the
     hazard table needs noticeably more room than the stock sidebar-lg gives. -->
<style>
.jsa-detail-sidebar {
  width: 620px !important;
  max-width: 95vw;
}
</style>

<style scoped>
.jsa-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
</style>
