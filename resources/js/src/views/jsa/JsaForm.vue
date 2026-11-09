<template>
  <div>
    <!-- Header -->
    <div class="d-flex flex-wrap justify-content-between align-items-start mb-2">
      <div>
        <div class="mb-25">
          <b-link class="text-primary" @click="goBack">{{ t('JSA') }}</b-link>
          <span class="text-muted mx-50">&rsaquo;</span>
          <span class="text-muted">{{ isEdit ? form.title || t('Edit JSA') : t('New JSA') }}</span>
        </div>
        <h2 class="mb-0 d-flex align-items-center">
          {{ isEdit ? t('Job Safety Analysis') : t('New Job Safety Analysis') }}
          <b-badge :variant="statusVariant(form.status)" class="ml-1">
            {{ t(statusLabel(form.status)) }}
          </b-badge>
          <small v-if="jsaNo" class="text-muted ml-1">{{ jsaNo }}</small>
        </h2>
      </div>

      <div class="d-flex flex-wrap align-items-center" style="gap: 8px">
        <b-button variant="outline-secondary" @click="goBack">{{ t('Cancel') }}</b-button>
        <b-button
          v-if="form.status === 'draft'"
          variant="outline-primary"
          :disabled="apiHelpers.saving"
          @click="save('draft')"
        >
          {{ t('Save draft') }}
        </b-button>
        <b-button
          v-if="isEdit"
          variant="outline-secondary"
          @click="onDownload"
        >
          <feather-icon icon="DownloadIcon" size="15" class="mr-50" />
          {{ t('Download') }}
        </b-button>
        <b-button variant="primary" :disabled="apiHelpers.saving" @click="save()">
          <b-spinner v-if="apiHelpers.saving" small class="mr-50" />
          {{ t('Save JSA') }}
        </b-button>
      </div>
    </div>

    <b-row>
      <!-- 1. General information -->
      <b-col lg="8">
        <b-card>
          <h4 class="text-primary mb-2">1. {{ t('General Information') }}</h4>

          <b-row>
            <b-col md="6">
              <b-form-group>
                <template #label>
                  {{ t('Title') }} <span class="text-danger">*</span>
                </template>
                <b-form-input
                  v-model="form.title"
                  :placeholder="t('Enter a title')"
                  :state="fieldState('title')"
                />
                <b-form-invalid-feedback :state="fieldState('title')">
                  {{ firstError('title') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group>
                <template #label>
                  {{ t('Project') }} <span class="text-danger">*</span>
                </template>
                <b-form-select
                  v-model="form.project_id"
                  :options="projectSelectOptions"
                  :state="fieldState('project_id')"
                />
                <b-form-invalid-feedback :state="fieldState('project_id')">
                  {{ firstError('project_id') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group :label="t('Date')">
                <b-form-input v-model="form.jsa_date" type="date" />
              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group>
                <template #label>
                  {{ t('Work Location') }} <span class="text-danger">*</span>
                </template>
                <b-form-input
                  v-model="form.work_location"
                  :placeholder="t('e.g. Tank Farm - Area B')"
                  :state="fieldState('work_location')"
                />
                <b-form-invalid-feedback :state="fieldState('work_location')">
                  {{ firstError('work_location') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group>
                <template #label>
                  {{ t('JSA Leader') }} <span class="text-danger">*</span>
                </template>
                <b-form-select
                  v-model="form.jsa_leader_id"
                  :options="leaderSelectOptions"
                  :state="fieldState('jsa_leader_id')"
                />
                <b-form-invalid-feedback :state="fieldState('jsa_leader_id')">
                  {{ firstError('jsa_leader_id') }}
                </b-form-invalid-feedback>
                <small class="text-muted">
                  {{ t('The leader is always added as a participant.') }}
                </small>
              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group :label="t('Status')">
                <b-form-select v-model="form.status" :options="translatedStatusOptions" />
                <!--
                  Status is deliberately the author's choice and not derived
                  from the signatures: a JSA signed on paper has to be able to
                  reach Completed with no digital signatures at all.
                -->
                <small class="text-muted">
                  {{ t('Status is managed separately from signatures.') }}
                </small>
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group>
                <template #label>
                  {{ t('Description of the Work') }} <span class="text-danger">*</span>
                </template>
                <b-form-textarea
                  v-model="form.description"
                  rows="4"
                  :placeholder="t('Describe the work to be performed')"
                  :state="fieldState('description')"
                />
                <b-form-invalid-feedback :state="fieldState('description')">
                  {{ firstError('description') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>
        </b-card>
      </b-col>

      <!-- Participants -->
      <b-col lg="4">
        <b-card>
          <div class="d-flex justify-content-between align-items-center mb-1">
            <h4 class="text-primary mb-0">{{ t('Participants') }}</h4>
            <b-button variant="flat-primary" size="sm" @click="dialog.show.participant.add = true">
              <feather-icon icon="PlusIcon" size="14" class="mr-25" />
              {{ t('Add') }}
            </b-button>
          </div>

          <div v-if="form.participants.length">
            <div
              v-for="(participant, index) in form.participants"
              :key="`${participant.user_id || 'ext'}-${index}`"
              class="d-flex justify-content-between align-items-center py-50"
            >
              <span>
                {{ participant.name }}
                <b-badge v-if="!participant.user_id" variant="light-secondary" class="ml-50">
                  {{ t('No app access') }}
                </b-badge>
              </span>
              <span class="d-inline-flex align-items-center">
                <small :class="participant.has_signed ? 'text-success' : 'text-muted'">
                  {{ t(signatureLabel(participant.signature_status || 'not_signed')) }}
                </small>
                <!-- Removing someone who has signed would discard their signature. -->
                <b-button
                  v-if="!participant.has_signed"
                  variant="flat-danger"
                  size="sm"
                  class="btn-icon ml-50"
                  @click="removeParticipant(index)"
                >
                  <feather-icon icon="XIcon" size="14" />
                </b-button>
              </span>
            </div>

            <hr>
            <p class="text-muted mb-0">
              {{ signedCount }} {{ t('of') }} {{ form.participants.length }} {{ t('have signed') }}
            </p>
          </div>
          <p v-else class="text-muted mb-0">{{ t('No participants added yet.') }}</p>
        </b-card>
      </b-col>
    </b-row>

    <!-- 2. Work type, hazards and controls -->
    <b-card>
      <div class="d-flex flex-wrap justify-content-between align-items-center mb-1">
        <h4 class="text-primary mb-0">2. {{ t('Work Type, Hazards and Controls') }}</h4>
        <b-button variant="primary" size="sm" @click="openAddHazard">
          <feather-icon icon="PlusIcon" size="14" class="mr-25" />
          {{ t('Add') }}
        </b-button>
      </div>

      <b-table-simple v-if="form.hazards.length" bordered responsive class="mb-0 jsa-hazard-table">
        <b-thead>
          <b-tr>
            <b-th style="width: 38px" />
            <b-th style="width: 24%">{{ t('Work Type') }}</b-th>
            <b-th style="width: 33%">{{ t('Hazards') }}</b-th>
            <b-th>{{ t('Controls') }}</b-th>
            <b-th style="width: 150px" />
          </b-tr>
        </b-thead>
        <!--
          The row order is saved and numbers the rows on the printed report.
          Keyed on a stable uid rather than the index: with index keys Vue
          re-uses each <tr> in place, so a drag reorders the array while the
          table carries on showing the old order.
        -->
        <draggable
          v-model="form.hazards"
          tag="tbody"
          handle=".jsa-drag-handle"
          ghost-class="jsa-row-ghost"
          :animation="150"
          :force-fallback="true"
        >
          <tr v-for="(row, index) in form.hazards" :key="row._uid">
            <td class="text-center jsa-drag-handle" style="cursor: grab">
              <feather-icon icon="MenuIcon" size="15" class="text-muted" />
            </td>
            <td>{{ row.work_type }}</td>
            <td style="white-space: pre-line">{{ row.hazard }}</td>
            <td style="white-space: pre-line">{{ row.control }}</td>
            <!--
              Plain buttons rather than a dropdown: a BootstrapVue dropdown
              nested in vuedraggable's slot never opens. The up/down pair also
              gives a reorder that works by keyboard and on touch, where
              dragging a table row is awkward at best.
            -->
            <td class="text-nowrap text-center jsa-row-actions">
              <b-button
                variant="flat-secondary"
                size="sm"
                class="btn-icon"
                :title="t('Move up')"
                :disabled="index === 0"
                @click="moveHazard(index, -1)"
              >
                <feather-icon icon="ArrowUpIcon" size="14" />
              </b-button>
              <b-button
                variant="flat-secondary"
                size="sm"
                class="btn-icon"
                :title="t('Move down')"
                :disabled="index === form.hazards.length - 1"
                @click="moveHazard(index, 1)"
              >
                <feather-icon icon="ArrowDownIcon" size="14" />
              </b-button>
              <b-button
                variant="flat-primary"
                size="sm"
                class="btn-icon"
                :title="t('Edit')"
                @click="openEditHazard(row, index)"
              >
                <feather-icon icon="EditIcon" size="14" />
              </b-button>
              <b-button
                variant="flat-danger"
                size="sm"
                class="btn-icon"
                :title="t('Remove')"
                @click="removeHazard(index)"
              >
                <feather-icon icon="TrashIcon" size="14" />
              </b-button>
            </td>
          </tr>
        </draggable>
      </b-table-simple>

      <b-alert
        v-else
        :variant="fieldState('hazards') === false ? 'danger' : 'secondary'"
        show
        class="mb-0"
      >
        <div class="alert-body">
          <span v-if="fieldState('hazards') === false">
            {{ t('A JSA needs at least one work type before it can leave draft.') }}
          </span>
          <span v-else>
            {{ t('No work types added yet. Use Add to describe an activity, its hazards and the controls.') }}
          </span>
        </div>
      </b-alert>
    </b-card>

    <AddHazardModal
      :is-visible.sync="dialog.show.hazard.add"
      :hazard="dialog.temp.hazard.data"
      @saved="onHazardSaved"
    />

    <AddParticipantModal
      :is-visible.sync="dialog.show.participant.add"
      :user-options="userOptions"
      :existing="form.participants"
      @saved="onParticipantSaved"
    />
  </div>
</template>

<script>
import {
  BAlert,
  BBadge,
  BButton,
  BCard,
  BCol,
  BDropdown,
  BDropdownDivider,
  BDropdownItem,
  BFormGroup,
  BFormInput,
  BFormInvalidFeedback,
  BFormSelect,
  BFormTextarea,
  BLink,
  BRow,
  BSpinner,
  BTableSimple,
  BTd,
  BTh,
  BThead,
  BTr,
} from 'bootstrap-vue'
import { computed, onMounted, ref } from '@vue/composition-api'
import draggable from 'vuedraggable'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import router from '@/router'
import useJobSafetyAnalysis from '@/composables/job-safety-analysis'
import AddHazardModal from './AddHazardModal.vue'
import AddParticipantModal from './AddParticipantModal.vue'

export default {
  name: 'JsaForm',
  components: {
    BAlert,
    BBadge,
    BButton,
    BCard,
    BCol,
    BDropdown,
    BDropdownDivider,
    BDropdownItem,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BFormSelect,
    BFormTextarea,
    BLink,
    BRow,
    BSpinner,
    BTableSimple,
    BTd,
    BTh,
    BThead,
    BTr,
    draggable,
    AddHazardModal,
    AddParticipantModal,
  },
  setup(props, { root }) {
    const { t } = useI18nUtils()
    const {
      form,
      apiHelpers,
      dialog,
      projectOptions,
      userOptions,
      reset,
      fetchJsa,
      addJsa,
      updateJsa,
      downloadPdf,
      fetchProjectOptions,
      fetchUserOptions,
      statusOptions,
      statusVariant,
      statusLabel,
      signatureLabel,
    } = useJobSafetyAnalysis()

    const jsaId = computed(() => root.$route.params.id || null)
    const isEdit = computed(() => !!jsaId.value)
    const jsaNo = ref('')

    // Rows only get a database id once the JSA is saved, so the table needs a
    // key of its own to track them across a reorder.
    let hazardUid = 0
    const nextHazardUid = () => {
      hazardUid += 1
      return `h${hazardUid}`
    }

    const SELECT_PROJECT = t('Select a project')
    const SELECT_LEADER = t('Select a leader')
    const CONFIRM_REMOVE_HAZARD = t('Remove this work type from the JSA?')

    const projectSelectOptions = computed(() => [
      { value: null, text: SELECT_PROJECT },
      ...projectOptions.value,
    ])

    const leaderSelectOptions = computed(() => [
      { value: null, text: SELECT_LEADER },
      ...userOptions.value,
    ])

    const translatedStatusOptions = computed(() =>
      statusOptions.map((o) => ({ value: o.value, text: t(o.text) }))
    )

    const signedCount = computed(() =>
      form.participants.filter((p) => p.has_signed).length
    )

    const fieldState = (field) => (apiHelpers.errors[field] ? false : null)
    const firstError = (field) =>
      (apiHelpers.errors[field] && apiHelpers.errors[field][0]) || ''

    const goBack = () => router.push({ name: 'jsa-overview' })

    const openAddHazard = () => {
      dialog.temp.hazard.data = null
      dialog.temp.hazard.index = null
      dialog.show.hazard.add = true
    }

    const openEditHazard = (row, index) => {
      dialog.temp.hazard.data = { ...row }
      dialog.temp.hazard.index = index
      dialog.show.hazard.add = true
    }

    const onHazardSaved = (payload) => {
      if (dialog.temp.hazard.index === null) {
        form.hazards.push({ ...payload, _uid: nextHazardUid() })
      } else {
        const existing = form.hazards[dialog.temp.hazard.index]
        form.hazards.splice(dialog.temp.hazard.index, 1, {
          ...payload,
          _uid: existing ? existing._uid : nextHazardUid(),
        })
      }
      dialog.temp.hazard.data = null
      dialog.temp.hazard.index = null
    }

    const moveHazard = (index, offset) => {
      const target = index + offset
      if (target < 0 || target >= form.hazards.length) return
      const rows = form.hazards.slice()
      const [moved] = rows.splice(index, 1)
      rows.splice(target, 0, moved)
      // Replaced wholesale so the keyed rows re-render in the new order.
      form.hazards = rows
    }

    const removeHazard = (index) => {
      // eslint-disable-next-line no-alert
      if (!confirm(CONFIRM_REMOVE_HAZARD)) return
      form.hazards.splice(index, 1)
    }

    const onParticipantSaved = (payload) => {
      form.participants.push({ ...payload, signature_status: 'not_signed', has_signed: false })
    }

    const removeParticipant = (index) => {
      form.participants.splice(index, 1)
    }

    const onDownload = () => downloadPdf({ id: jsaId.value, jsa_no: jsaNo.value })

    const save = async (forcedStatus = null) => {
      if (forcedStatus) form.status = forcedStatus

      try {
        const saved = isEdit.value
          ? await updateJsa(jsaId.value)
          : await addJsa()

        if (saved) router.push({ name: 'jsa-overview' })
      } catch (error) {
        // The composable has already surfaced the message; staying on the form
        // keeps the user's work in front of them.
      }
    }

    onMounted(async () => {
      reset()
      fetchProjectOptions()
      fetchUserOptions()

      if (isEdit.value) {
        const jsa = await fetchJsa(jsaId.value)
        if (jsa) {
          form.set(jsa)
          jsaNo.value = jsa.jsa_no
        }
      }
    })

    return {
      t,
      form,
      apiHelpers,
      dialog,
      userOptions,
      isEdit,
      jsaNo,
      projectSelectOptions,
      leaderSelectOptions,
      translatedStatusOptions,
      signedCount,
      fieldState,
      firstError,
      goBack,
      openAddHazard,
      openEditHazard,
      onHazardSaved,
      moveHazard,
      removeHazard,
      onParticipantSaved,
      removeParticipant,
      onDownload,
      save,
      statusVariant,
      statusLabel,
      signatureLabel,
    }
  },
}
</script>

<style scoped lang="scss">
.jsa-hazard-table ::v-deep td {
  vertical-align: middle;
}

// forceFallback drags a clone rather than using the browser's native
// drag-and-drop, which keeps the row rendering consistently inside a table.
.jsa-hazard-table ::v-deep .jsa-row-ghost {
  opacity: 0.4;
  background-color: rgba(115, 103, 240, 0.08);
}
</style>
