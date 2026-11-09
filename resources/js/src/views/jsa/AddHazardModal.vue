<template>
  <b-modal
    :visible="isVisible"
    :title="isEdit ? t('Edit Hazard and Control') : t('Add Hazard and Control')"
    size="lg"
    centered
    :ok-title="isEdit ? t('Save') : t('Add')"
    :cancel-title="t('Cancel')"
    ok-variant="primary"
    cancel-variant="outline-secondary"
    @change="(val) => $emit('update:is-visible', val)"
    @ok.prevent="submit"
  >
    <p class="text-muted">
      {{ t('Describe the work, identified hazards and required controls.') }}
    </p>

    <b-form-group :label="t('Type of Work')" label-class="font-weight-bold">
      <template #label>
        {{ t('Type of Work') }} <span class="text-danger">*</span>
      </template>
      <b-form-input
        v-model="local.work_type"
        :placeholder="t('e.g. Hot Work')"
        :state="errors.work_type ? false : null"
      />
      <b-form-invalid-feedback :state="errors.work_type ? false : null">
        {{ errors.work_type }}
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group>
      <template #label>
        {{ t('Hazard') }} <span class="text-danger">*</span>
      </template>
      <b-form-textarea
        v-model="local.hazard"
        rows="3"
        :placeholder="t('The hazards associated with that activity')"
        :state="errors.hazard ? false : null"
      />
      <b-form-invalid-feedback :state="errors.hazard ? false : null">
        {{ errors.hazard }}
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group>
      <template #label>
        {{ t('Control') }} <span class="text-danger">*</span>
      </template>
      <b-form-textarea
        v-model="local.control"
        rows="3"
        :placeholder="t('The measures required to reduce the risk')"
        :state="errors.control ? false : null"
      />
      <b-form-invalid-feedback :state="errors.control ? false : null">
        {{ errors.control }}
      </b-form-invalid-feedback>
    </b-form-group>
  </b-modal>
</template>

<script>
import {
  BFormGroup,
  BFormInput,
  BFormInvalidFeedback,
  BFormTextarea,
  BModal,
} from 'bootstrap-vue'
import { reactive, ref, watch } from '@vue/composition-api'
import { useUtils as useI18nUtils } from '@core/libs/i18n'

export default {
  name: 'AddHazardModal',
  components: {
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BFormTextarea,
    BModal,
  },
  props: {
    isVisible: { type: Boolean, default: false },
    // The row being edited, or null when adding a new one.
    hazard: { type: Object, default: null },
  },
  setup(props, { emit }) {
    const { t } = useI18nUtils()

    const local = reactive({ work_type: '', hazard: '', control: '' })
    const errors = reactive({ work_type: '', hazard: '', control: '' })
    const isEdit = ref(false)

    // All three fields are required by the spec, so the messages are built at
    // setup time: t() resolves through getCurrentInstance(), which is already
    // null by the time a click handler runs.
    const REQUIRED_WORK_TYPE = t('Type of work is required.')
    const REQUIRED_HAZARD = t('Hazard is required.')
    const REQUIRED_CONTROL = t('Control is required.')

    const clearErrors = () => {
      errors.work_type = ''
      errors.hazard = ''
      errors.control = ''
    }

    watch(
      () => props.isVisible,
      (visible) => {
        if (!visible) return
        clearErrors()
        isEdit.value = !!props.hazard
        local.work_type = props.hazard ? props.hazard.work_type : ''
        local.hazard = props.hazard ? props.hazard.hazard : ''
        local.control = props.hazard ? props.hazard.control : ''
      }
    )

    const submit = () => {
      clearErrors()

      if (!local.work_type.trim()) errors.work_type = REQUIRED_WORK_TYPE
      if (!local.hazard.trim()) errors.hazard = REQUIRED_HAZARD
      if (!local.control.trim()) errors.control = REQUIRED_CONTROL

      if (errors.work_type || errors.hazard || errors.control) return

      emit('saved', {
        work_type: local.work_type.trim(),
        hazard: local.hazard.trim(),
        control: local.control.trim(),
      })
      emit('update:is-visible', false)
    }

    return { t, local, errors, isEdit, submit }
  },
}
</script>
