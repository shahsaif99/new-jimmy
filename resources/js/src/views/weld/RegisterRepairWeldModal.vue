<template>
  <b-modal
    :visible="visible"
    :title="editWeld ? 'Edit Repair Weld' : 'Register Repair Weld'"
    size="lg"
    hide-footer
    @hidden="onClose"
  >
    <b-form @submit.prevent="handleSubmit">
      <b-row>
        <b-col md="6">
          <b-form-group label="Project No." label-for="rw-project">
            <b-form-input
              id="rw-project"
              :value="weldLog ? `${weldLog.project_no} - ${weldLog.project_name}` : ''"
              disabled
            />
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="Drawing No." label-for="rw-drawing">
            <b-form-input
              id="rw-drawing"
              :value="weldLog ? weldLog.drawing_no : ''"
              disabled
            />
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group
            label="Original Weld No. (to be repaired)"
            label-for="rw-original"
            :state="hasOriginals ? null : false"
            :invalid-feedback="hasOriginals ? '' : 'Register a weld before adding a repair'"
          >
            <b-form-select
              id="rw-original"
              v-model="weldForm.original_weld_id"
              :options="originalWeldOptions"
              :disabled="!!editWeld || !hasOriginals"
              required
            />
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="Repair No." label-for="rw-repair-no">
            <b-form-input
              id="rw-repair-no"
              :value="repairNoPreview"
              disabled
            />
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group label="Weld Date" label-for="rw-date">
            <b-form-input
              id="rw-date"
              v-model="weldForm.weld_date"
              type="date"
              required
            />
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="WPS No." label-for="rw-wps">
            <b-form-select
              id="rw-wps"
              v-model="weldForm.wps_id"
              :options="wpsOptions"
            />
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group label="Welder ID" label-for="rw-welder-id">
            <b-form-input
              id="rw-welder-id"
              v-model="weldForm.welder_id"
              maxlength="4"
              placeholder="Max 4 characters"
              required
            />
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="Visual Inspection" label-for="rw-visual">
            <b-form-select
              id="rw-visual"
              v-model="weldForm.visual_inspection"
              :options="visualOptions"
              required
            />
          </b-form-group>
        </b-col>

        <b-col md="12">
          <b-form-group label="Repair Reason" label-for="rw-reason">
            <b-form-select
              id="rw-reason"
              v-model="weldForm.repair_reason"
              :options="repairReasonOptions"
              required
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row class="mt-1">
        <b-col md="12">
          <label class="mb-1"><strong>NDT</strong></label>
        </b-col>
        <b-col md="3">
          <b-form-checkbox v-model="weldForm.ndt_rt">RT</b-form-checkbox>
        </b-col>
        <b-col md="3">
          <b-form-checkbox v-model="weldForm.ndt_mt">MT</b-form-checkbox>
        </b-col>
        <b-col md="3">
          <b-form-checkbox v-model="weldForm.ndt_pt">PT</b-form-checkbox>
        </b-col>
        <b-col md="3">
          <b-form-checkbox v-model="weldForm.ndt_vt">VT</b-form-checkbox>
        </b-col>
      </b-row>

      <b-row v-if="selectedMethods.length" class="mt-2">
        <b-col
          v-for="method in selectedMethods"
          :key="method.key"
          md="3"
        >
          <b-form-group :label="`${method.label} Result`" :label-for="`rw-ndt-${method.key}-result`">
            <b-form-select
              :id="`rw-ndt-${method.key}-result`"
              v-model="weldForm[`ndt_${method.key}_result`]"
              :options="ndtResultOptions"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <div class="d-flex justify-content-end mt-2">
        <b-button variant="secondary" class="mr-1" @click="onClose">
          Cancel
        </b-button>
        <b-button
          type="submit"
          variant="primary"
          :disabled="apiHelpers.loading || !hasOriginals"
        >
          {{ editWeld ? 'Update' : 'Register' }}
        </b-button>
      </div>
    </b-form>
  </b-modal>
</template>

<script>
import {
  BModal,
  BForm,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BFormCheckbox,
  BButton,
  BRow,
  BCol,
} from 'bootstrap-vue'
import { ref, computed, watch } from '@vue/composition-api'
import useWeldLogs, { REPAIR_REASONS } from '@/composables/weldLogs'
import useWps from '@/composables/wps'

const NDT_METHODS = [
  { key: 'rt', label: 'RT' },
  { key: 'mt', label: 'MT' },
  { key: 'pt', label: 'PT' },
  { key: 'vt', label: 'VT' },
]

export default {
  components: {
    BModal,
    BForm,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BFormCheckbox,
    BButton,
    BRow,
    BCol,
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
    editWeld: {
      type: Object,
      default: null,
    },
    // Pre-selected original when the repair is started from a weld's row menu.
    originalWeld: {
      type: Object,
      default: null,
    },
  },
  setup(props, { emit }) {
    const {
      weldForm,
      dialog,
      apiHelpers,
      storeWeld,
      updateWeld,
    } = useWeldLogs()

    const { wpsList, fetchWps } = useWps()

    const wpsOptions = ref([{ value: null, text: 'Select WPS' }])

    const visualOptions = [
      { value: 'ok', text: 'OK' },
      { value: 'not_ok', text: 'Not OK' },
    ]

    const ndtResultOptions = [
      { value: null, text: 'Select Result' },
      { value: 'accepted', text: 'Accepted' },
      { value: 'rejected', text: 'Rejected' },
    ]

    const repairReasonOptions = [
      { value: null, text: 'Select reason', disabled: true },
      ...REPAIR_REASONS,
    ]

    const allWelds = computed(() => props.weldLog?.welds || [])

    // Any weld can be repaired, including one that is itself a repair —
    // a second attempt at weld 4 becomes 4 R2.
    const originalWeldOptions = computed(() => {
      const options = allWelds.value
        .slice()
        .sort((a, b) => (Number(a.weld_no) || 0) - (Number(b.weld_no) || 0) || (a.repair_no || 0) - (b.repair_no || 0))
        .map(w => ({ value: w.id, text: w.weld_label || String(w.weld_no) }))

      return [{ value: null, text: 'Select weld', disabled: true }, ...options]
    })

    const hasOriginals = computed(() => allWelds.value.length > 0)

    const selectedMethods = computed(() => NDT_METHODS.filter(m => weldForm[`ndt_${m.key}`]))

    // Mirrors the server's numbering: repairs of weld 4 run R1, R2, R3 regardless
    // of whether the repair was raised against the weld or against an earlier repair.
    const repairNoPreview = computed(() => {
      if (props.editWeld) return props.editWeld.repair_no

      const selected = allWelds.value.find(w => w.id === weldForm.original_weld_id)
      if (!selected) return ''

      const highest = allWelds.value
        .filter(w => Number(w.weld_no) === Number(selected.weld_no))
        .reduce((max, w) => Math.max(max, w.repair_no || 0), 0)

      return highest + 1
    })

    const loadWps = async () => {
      const projectId = props.weldLog?.project_id
      await fetchWps(projectId)
      const sorted = [...wpsList.value].sort((a, b) => (a.name || '').localeCompare(b.name || ''))
      wpsOptions.value = [
        { value: null, text: 'Select WPS' },
        ...sorted.map(w => ({ value: w.id, text: w.name })),
      ]
    }

    const handleSubmit = async () => {
      if (!weldForm.original_weld_id || !weldForm.repair_reason) return

      let success
      if (props.editWeld) {
        dialog.temp.weld.id = props.editWeld.id
        success = await updateWeld()
      } else {
        success = await storeWeld()
      }

      if (success) {
        emit('saved')
      }
    }

    const onClose = () => {
      weldForm.reset()
      emit('close')
    }

    watch(
      () => props.visible,
      val => {
        if (!val) return

        loadWps()

        if (props.editWeld) {
          weldForm.set({
            weld_log_id: props.editWeld.weld_log_id,
            weld_no: props.editWeld.weld_no,
            type: 'repair',
            original_weld_id: props.editWeld.original_weld_id,
            repair_reason: props.editWeld.repair_reason,
            wps_id: props.editWeld.wps_id,
            welder_id: props.editWeld.welder_id,
            weld_date: props.editWeld.weld_date,
            visual_inspection: props.editWeld.visual_inspection,
            ndt_rt: props.editWeld.ndt_rt,
            ndt_mt: props.editWeld.ndt_mt,
            ndt_pt: props.editWeld.ndt_pt,
            ndt_vt: props.editWeld.ndt_vt,
            ndt_accepted: props.editWeld.ndt_accepted,
            ndt_rt_result: props.editWeld.ndt_rt_result,
            ndt_mt_result: props.editWeld.ndt_mt_result,
            ndt_pt_result: props.editWeld.ndt_pt_result,
            ndt_vt_result: props.editWeld.ndt_vt_result,
          })
          return
        }

        weldForm.reset()
        weldForm.type = 'repair'
        weldForm.weld_log_id = props.weldLog?.id ?? null
        weldForm.original_weld_id = props.originalWeld?.id ?? null
        weldForm.weld_date = new Date().toISOString().slice(0, 10)
      },
    )

    return {
      weldForm,
      apiHelpers,
      wpsOptions,
      visualOptions,
      ndtResultOptions,
      repairReasonOptions,
      originalWeldOptions,
      hasOriginals,
      selectedMethods,
      repairNoPreview,
      handleSubmit,
      onClose,
    }
  },
}
</script>
