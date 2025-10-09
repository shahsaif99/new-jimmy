<template>
  <b-card>
    <!-- BODY -->
    <p>Standard number of holiday days</p>
    <b-row>
      <b-col sm="4">
        <b-overlay
          id="overlay-background"
          :show="busy"
          variant="transparent"
          rounded="sm"
        >
          <validation-observer
            #default="{ handleSubmit }"
            ref="refFormObserver"
          >
            <b-form
              class="mt-2"
              @submit.prevent="handleSubmit(onSubmit)"
              @reset.prevent="resetForm"
            >
              <validation-provider
                #default="validationContext"
                name="Holiday per calendar year"
                rules="required"
              >
                <b-form-group
                  label="Holiday per calendar year"
                  label-for="holidays"
                >
                  <b-form-input
                    id="holidays"
                    v-model="settingsData.holidays"
                    autofocus
                    type="number"
                    :state="getValidationState(validationContext)"
                    trim
                  />

                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>

              <validation-provider
                #default="validationContext"
                name="Saturday Off"
              >
                <b-form-group
                  :label="$t('Saturday is considered a holiday')"
                  label-for="is_saturday_off"
                >
                  <b-form-checkbox
                    :checked="settingsData.is_saturday_off"
                    class="custom-control-success"
                    name="check-button"
                    switch
                    v-model="settingsData.is_saturday_off"
                  />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>

              <validation-provider
                #default="validationContext"
                name="Sunday Off"
              >
                <b-form-group
                  :label="$t('Sunday is considered a holiday')"
                  label-for="is_sunday_off"
                >
                  <b-form-checkbox
                    :checked="settingsData.is_sunday_off"
                    class="custom-control-success"
                    v-model="settingsData.is_sunday_off"
                    name="check-button"
                    :value-field="true"
                    switch
                  />

                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>

              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                class="mt-2 mr-1"
                type="submit"
              >
                {{ $t('Save Changes') }}
              </b-button>
            </b-form>
          </validation-observer>
        </b-overlay>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import {
  BOverlay, BFormInvalidFeedback, BButton, BForm, BFormGroup, BFormInput, BRow, BCol, BCard, BFormCheckbox,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { ref, onMounted } from '@vue/composition-api'
import useSettings from '@/composables/settings'
import { required } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BForm,
    BButton,
    BOverlay,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    ValidationProvider,
    ValidationObserver,
    BFormInvalidFeedback,
  },
  directives: {
    Ripple,
  },
  setup() {
    const initialState = {
      is_saturday_off: false,
      holidays: '',
      is_sunday_off: false,
    }
    const settingsData = ref({ ...initialState })

    const {
      busy,
      settings,
      fetchSettings,
      updateSettings,
    } = useSettings()

    onMounted(async () => {
      await fetchSettings()
      settingsData.value = settings.value
    })

    const {
      refFormObserver, getValidationState, resetForm,
    } = formValidation()

    const onSubmit = async () => {
      console.log(settingsData.value)
      await updateSettings(settingsData.value)
    }

    return {
      busy,
      required,
      onSubmit,
      resetForm,
      settingsData,
      refFormObserver,
      getValidationState,

    }
  },
}
</script>
