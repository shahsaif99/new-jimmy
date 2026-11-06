<template>
  <b-modal
    :visible="isVisible"
    :title="t('Add Participant')"
    centered
    :ok-title="t('Add')"
    :cancel-title="t('Cancel')"
    ok-variant="primary"
    cancel-variant="outline-secondary"
    @change="(val) => $emit('update:is-visible', val)"
    @ok.prevent="submit"
  >
    <b-form-radio-group v-model="mode" class="mb-1">
      <b-form-radio value="user">{{ t('A user of this system') }}</b-form-radio>
      <b-form-radio value="external">{{ t('Someone without a login') }}</b-form-radio>
    </b-form-radio-group>

    <b-form-group v-if="mode === 'user'">
      <template #label>
        {{ t('User') }} <span class="text-danger">*</span>
      </template>
      <b-form-select
        v-model="selectedUserId"
        :options="selectableUsers"
        :state="error ? false : null"
      />
    </b-form-group>

    <!--
      Subcontractors on site sign the printed copy, so a participant does not
      have to be an account. They are carried by name and can only ever be
      marked as having signed on paper.
    -->
    <b-form-group v-else>
      <template #label>
        {{ t('Name') }} <span class="text-danger">*</span>
      </template>
      <b-form-input
        v-model="externalName"
        :placeholder="t('Full name')"
        :state="error ? false : null"
      />
      <small class="text-muted">
        {{ t('This person cannot sign in the app and must be marked as signed on paper.') }}
      </small>
    </b-form-group>

    <b-form-invalid-feedback :state="error ? false : null" class="d-block">
      {{ error }}
    </b-form-invalid-feedback>
  </b-modal>
</template>

<script>
import {
  BFormGroup,
  BFormInput,
  BFormInvalidFeedback,
  BFormRadio,
  BFormRadioGroup,
  BFormSelect,
  BModal,
} from 'bootstrap-vue'
import { computed, ref, watch } from '@vue/composition-api'
import { useUtils as useI18nUtils } from '@core/libs/i18n'

export default {
  name: 'AddParticipantModal',
  components: {
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BFormRadio,
    BFormRadioGroup,
    BFormSelect,
    BModal,
  },
  props: {
    isVisible: { type: Boolean, default: false },
    userOptions: { type: Array, default: () => [] },
    // Already on the JSA — offering them again would just create a duplicate.
    existing: { type: Array, default: () => [] },
  },
  setup(props, { emit }) {
    const { t } = useI18nUtils()

    const mode = ref('user')
    const selectedUserId = ref(null)
    const externalName = ref('')
    const error = ref('')

    const CHOOSE_USER = t('Choose a user.')
    const ENTER_NAME = t('Enter a name.')
    const ALREADY_ADDED = t('That person is already a participant.')
    const PLACEHOLDER = t('Select a user')

    const selectableUsers = computed(() => {
      const taken = props.existing.map((p) => p.user_id).filter(Boolean)
      return [
        { value: null, text: PLACEHOLDER },
        ...props.userOptions.filter((o) => !taken.includes(o.value)),
      ]
    })

    watch(
      () => props.isVisible,
      (visible) => {
        if (!visible) return
        mode.value = 'user'
        selectedUserId.value = null
        externalName.value = ''
        error.value = ''
      }
    )

    const submit = () => {
      error.value = ''

      if (mode.value === 'user') {
        if (!selectedUserId.value) {
          error.value = CHOOSE_USER
          return
        }
        const option = props.userOptions.find((o) => o.value === selectedUserId.value)
        emit('saved', { user_id: option.value, name: option.text })
      } else {
        const name = externalName.value.trim()
        if (!name) {
          error.value = ENTER_NAME
          return
        }
        const clash = props.existing.some((p) => !p.user_id && p.name === name)
        if (clash) {
          error.value = ALREADY_ADDED
          return
        }
        emit('saved', { user_id: null, name })
      }

      emit('update:is-visible', false)
    }

    return { t, mode, selectedUserId, externalName, error, selectableUsers, submit }
  },
}
</script>
