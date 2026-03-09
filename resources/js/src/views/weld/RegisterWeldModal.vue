<template>
  <b-modal
    :visible="visible"
    :title="editWeld ? 'Edit Weld' : 'Register Weld'"
    size="lg"
    hide-footer
    @hidden="onClose"
  >
    <b-form @submit.prevent="handleSubmit">
      <b-row>
        <b-col md="6">
          <b-form-group label="Project No." label-for="w-project">
            <b-form-input
              id="w-project"
              :value="weldLog ? `${weldLog.project_no} - ${weldLog.project_name}` : ''"
              disabled
            />
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="Drawing No." label-for="w-drawing">
            <b-form-input
              id="w-drawing"
              :value="weldLog ? weldLog.drawing_no : ''"
              disabled
            />
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="Weld No." label-for="w-weld-no">
            <b-form-input
              id="w-weld-no"
              v-model.number="weldForm.weld_no"
              type="number"
              min="1"
              placeholder="Enter weld number"
              required
            />
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="WPS No." label-for="w-wps">
            <b-form-select
              id="w-wps"
              v-model="weldForm.wps_id"
              :options="wpsOptions"
            />
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="Weld Date" label-for="w-date">
            <b-form-input
              id="w-date"
              v-model="weldForm.weld_date"
              type="date"
              required
            />
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="Welder ID" label-for="w-welder-id">
            <b-form-input
              id="w-welder-id"
              v-model="weldForm.welder_id"
              maxlength="4"
              placeholder="Max 4 characters"
              required
            />
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="Visual Inspection" label-for="w-visual">
            <b-form-select
              id="w-visual"
              v-model="weldForm.visual_inspection"
              :options="visualOptions"
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

      <b-row v-if="weldForm.ndt_rt || weldForm.ndt_mt || weldForm.ndt_pt || weldForm.ndt_vt" class="mt-2">
        <b-col md="6">
          <b-form-group label="NDT Result" label-for="w-ndt-result">
            <b-form-select
              id="w-ndt-result"
              v-model="weldForm.ndt_accepted"
              :options="ndtResultOptions"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <div class="d-flex justify-content-end mt-2">
        <b-button variant="secondary" class="mr-1" @click="onClose">
          Cancel
        </b-button>
        <b-button type="submit" variant="primary" :disabled="apiHelpers.loading">
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
import { ref, onMounted, watch } from '@vue/composition-api'
import useWeldLogs from '@/composables/weldLogs'
import useWps from '@/composables/wps'

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

    const loadWps = async () => {
      const projectId = props.weldLog?.project_id
      await fetchWps(projectId)
      wpsOptions.value = [
        { value: null, text: 'Select WPS' },
        ...wpsList.value.map((w) => ({
          value: w.id,
          text: w.name,
        })),
      ]
    }

    const handleSubmit = async () => {
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
      (val) => {
        if (val) {
          loadWps()
          if (props.editWeld) {
            weldForm.set({
              weld_log_id: props.editWeld.weld_log_id,
              weld_no: props.editWeld.weld_no,
              wps_id: props.editWeld.wps_id,
              welder_id: props.editWeld.welder_id,
              weld_date: props.editWeld.weld_date,
              visual_inspection: props.editWeld.visual_inspection,
              ndt_rt: props.editWeld.ndt_rt,
              ndt_mt: props.editWeld.ndt_mt,
              ndt_pt: props.editWeld.ndt_pt,
              ndt_vt: props.editWeld.ndt_vt,
              ndt_accepted: props.editWeld.ndt_accepted,
            })
          } else if (props.weldLog) {
            weldForm.reset()
            weldForm.weld_log_id = props.weldLog.id
          }
        }
      }
    )

    return {
      weldForm,
      apiHelpers,
      wpsOptions,
      visualOptions,
      ndtResultOptions,
      handleSubmit,
      onClose,
    }
  },
}
</script>
