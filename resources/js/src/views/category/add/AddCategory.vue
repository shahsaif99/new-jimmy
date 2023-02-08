<template>
  <b-modal
    cancel-variant="outline-secondary"
    centered
    :hide-footer="true"
    title="Add New Category"
    size="lg"
    @close="$emit('update:is-add-category-active', false)"
    :visible="isAddCategoryActive"
    @hide="$emit('update:is-add-category-active', false)"
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
                name="Category Name"
                rules="required"
              >
                <b-form-group label="Category Name">
                  <b-form-input
                    placeholder="Category Name"
                    id="name"
                    v-model="form.name"
                    :state="
                      getValidationState(
                        validationContext
                      )
                    "
                    trim
                  />

                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
          </b-row>

          <!-- Form Actions -->
          <div class="d-flex mt-2">
            <b-button
              variant="primary"
              class="mr-2"
              type="submit"
            >
              Save
            </b-button>
            <b-button
              type="button"
              size="sm"
              variant="outline-secondary"
              @click="
                $emit('update:is-add-category-active', false)
              "
            >
              Cancel
            </b-button>
          </div>
        </b-form>
      </b-overlay>
    </validation-observer>
  </b-modal>
</template>

<script>
import {
  BForm,
  BFormGroup,
  BFormInput,
  BFormInvalidFeedback,
  BOverlay,
  BModal,
  BButton,
  BRow,
  BCol,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref } from '@vue/composition-api'
import { required } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import useCategories from '@/composables/category'

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
    ValidationProvider,
    ValidationObserver,
    BFormInvalidFeedback,
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
  setup(_, { emit }) {
    const initialState = {
      name: '',
    }

    const form = ref({ ...initialState })

    const { busy, storeCategory, respResult } = useCategories()

    const resetplanData = () => {
      form.value = JSON.parse(JSON.stringify(initialState))
    }

    const onSubmit = async () => {
      await storeCategory(form.value)
      if (respResult.value.status === 200) {
        emit('refetch-data')
        emit('update:is-add-category-active', false)
        resetplanData()
      }
    }

    const { refFormObserver, getValidationState, resetForm } = formValidation(resetplanData)

    return {
      busy,
      form,
      required,
      onSubmit,
      resetForm,
      refFormObserver,
      getValidationState,
    }
  },
}
</script>
