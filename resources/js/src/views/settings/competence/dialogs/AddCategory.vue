<template>
  <b-modal
    cancel-variant="outline-secondary"
    centered
    :hide-footer="true"
    :title="$t('Add Competence Category')"
    size="md"
    @close="$emit('update:is-add-category-active', false)"
    :visible="isAddCategoryActive"
    @hide="$emit('update:is-add-category-active', false)"
  >
    <div>
      <validation-observer
        ref="refFormObserver"
        #default="{ handleSubmit }"
      >
        <b-form
          @submit.prevent="handleSubmit(onSubmit)"
          @reset.prevent="resetForm"
        >
          <b-row>
            <b-col cols="12">
              <validation-provider
                #default="validationContext"
                :name="$t('Category Name')"
                rules="required"
              >
                <b-form-group
                  :label="$t('Category Name')"
                  label-for="category-name"
                >
                  <b-form-input
                    id="category-name"
                    v-model="formData.name"
                    :state="getValidationState(validationContext)"
                    trim
                  />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
          </b-row>
          <div class="d-flex mt-2">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              class="mr-2"
              type="submit"
              :disabled="busy"
            >
              {{ $t('Add') }}
            </b-button>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="button"
              variant="outline-secondary"
              @click="$emit('update:is-add-category-active', false)"
            >
              {{ $t('Cancel') }}
            </b-button>
          </div>
        </b-form>
      </validation-observer>
    </div>
  </b-modal>
</template>

<script>
import {
  BRow,
  BCol,
  BForm,
  BButton,
  BFormInput,
  BFormGroup,
  BFormInvalidFeedback,
} from 'bootstrap-vue'
import { ref } from '@vue/composition-api'
import { required } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import Ripple from 'vue-ripple-directive'
import axios from '@axios'
import route from 'ziggy-js'
import toaster from '@/composables/toaster'

export default {
  components: {
    BCol,
    BRow,
    BForm,
    BButton,
    BFormInput,
    BFormGroup,
    ValidationProvider,
    ValidationObserver,
    BFormInvalidFeedback,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: 'isAddCategoryActive',
    event: 'update:is-add-category-active',
  },
  props: {
    isAddCategoryActive: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const formData = ref({
      name: '',
    })
    const busy = ref(false)
    const toast = toaster()

    const resetForm = () => {
      formData.value = {
        name: '',
      }
    }

    const onSubmit = async () => {
      try {
        busy.value = true
        const response = await axios.post(route('competence-categories.store'), formData.value)
        toast.success(response.data.message)
        emit('refetch-data')
        emit('update:is-add-category-active', false)
        resetForm()
      } catch (error) {
        if (error.response && error.response.status === 422) {
          toast.error(error.response.data.message)
        } else {
          toast.error(error.message)
        }
      } finally {
        busy.value = false
      }
    }

    const {
      refFormObserver,
      getValidationState,
    } = formValidation()

    return {
      busy,
      formData,
      required,
      onSubmit,
      resetForm,
      refFormObserver,
      getValidationState,
    }
  },
}
</script>
