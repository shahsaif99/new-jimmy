<template>

  <b-modal
    cancel-variant="outline-secondary"
    centered
    :hide-footer="true"
    title="Add Plan"
    size="lg"
    @close="$emit('update:is-add-active', false)"
    :visible="isAddActive"
    @hide="$emit('update:is-add-active', false)"
  >
    <validation-observer
      #default="{ handleSubmit }"
      ref="refFormObserver"
    >
      <b-overlay
        :show="busy"
        spinner-variant="primary"
        spinner-type="grow"
        rounded="sm"
        opacity="0.20"
      >
        <b-form
          class="p-2"
          @submit.prevent="handleSubmit(onSubmit)"
          @reset.prevent="resetForm"
        >
          <b-row>

            <b-col
              cols="12"
              md="12"
            >
              <validation-provider
                #default="validationContext"
                name="Titel"
                rules="required"
              >
                <b-form-group
                  label="Titel"
                >
                  <b-form-input
                    placeholder="Titel"
                    id="Titel"
                    v-model="form.title"
                    autofocus
                    :state="getValidationState(validationContext)"
                    trim
                  />

                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <b-col
              cols="12"
              md="12"
            >
              <validation-provider
                #default="validationContext"
                name="Paket"
                rules="required"
              >
                <b-form-group
                  label="Välj Paket"
                  label-for="package_id"
                >
                  <b-form-select
                    id="package_id"
                    v-model="form.package_id"
                    :options="packages"
                    value-field="id"
                    text-field="title"
                    :state="getValidationState(validationContext)"
                  />

                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <!-- Field: Email -->
            <b-col
              cols="12"
              md="12"
            >
              <validation-provider
                #default="validationContext"
                 name="Pris"
                rules="required"
              >
                <b-form-group
                  label="Pris"
                >
                  <b-form-input
                    id="price"
                    type="number"
                    v-model="form.price"
                    :state="getValidationState(validationContext)"
                    trim
                    placeholder="Price"
                  />

                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col
              cols="12"
              md="12"
            >
              <b-form-group
               label="Beskrivning"
              >
                <b-form-textarea
                  id="description"
                  v-model="form.description"
                  trim
                  placeholder="Beskrivning"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <!-- Form Actions -->
          <div class="d-flex mt-2">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              class="mr-2"
              type="submit"
            >
              Spara
            </b-button>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="button"
              variant="outline-secondary"
              @click="$emit('update:is-add-active', false)"
            >
              Avbryt
            </b-button>
          </div>
        </b-form>
      </b-overlay>
    </validation-observer>
  </b-modal>
</template>

<script>
import {
  BForm, BFormGroup, BFormInput, BFormInvalidFeedback, BOverlay, BModal, BButton, BRow, BCol, BFormTextarea, BFormSelect,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref, onMounted } from '@vue/composition-api'
import {
  required, decimal, max, min,
} from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import Ripple from 'vue-ripple-directive'
import usePlans from '@/composables/plans'
import usePackages from '@/composables/packages'

export default {
  components: {
    BRow,
    BCol,
    BForm,
    BModal,
    BButton,
    BOverlay,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BFormTextarea,
    ValidationProvider,
    ValidationObserver,
    BFormInvalidFeedback,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: 'isAddActive',
    event: 'update:is-add-active',
  },
  props: {
    isAddActive: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      required,
      max,
      min,
      decimal,
    }
  },
  setup(_, { emit }) {
    const initialState = {
      title: '',
      price: '',
      package_id: '',
      description: '',
    }

    const form = ref({ ...initialState })

    const {
      busy,
      storePlan,
      respResult,
    } = usePlans()

    const {
      fetchPackagesList,
      packages,
    } = usePackages()

    onMounted(() => {
      fetchPackagesList()
    })


    const resetplanData = () => {
      form.value = JSON.parse(JSON.stringify(initialState))
    }

    const onSubmit = async () => {
      await storePlan(form.value)
      if (respResult.value.status === 200) {
        emit('refetch-data')
        emit('update:is-add-active', false)
        resetplanData()
      }
    }


    const {
      refFormObserver, getValidationState, resetForm,
    } = formValidation(resetplanData)

    return {
      busy,
      form,
      onSubmit,
      packages,
      resetForm,
      refFormObserver,
      getValidationState,
    }
  },
}
</script>
