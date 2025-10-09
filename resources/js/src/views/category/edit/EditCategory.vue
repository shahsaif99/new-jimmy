<template>
  <b-modal
    cancel-variant="outline-secondary"
    centered
    :hide-footer="true"
    :title="$t('Edit Category')"
    size="lg"
    @close="$emit('update:is-edit-category-active', false)"
    :visible="isEditCategoryActive"
    @hide="$emit('update:is-edit-category-active', false)"
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
              cols="6"
              md="12"
              v-if="form.category_id"
            >
              <validation-provider
                #default="validationContext"
                :name="$t('Category')"
                rules="required"
              >
                <b-form-group
                  :label="$t('Category')"
                  label-for="category_id"
                >
                  <b-form-select
                    id="category"
                    v-model="form.category_id"
                    :state="getValidationState(validationContext)"
                    trim
                    value-field="id"
                    text-field="name"
                    :options="categories"
                    :placeholder="$t('Category')"
                  />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col
              cols="12"
              md="6"
            >
              <validation-provider
                #default="validationContext"
                :name="$t('Category No.')"
                rules="required"
              >
                <b-form-group :label="$t('Category No.')">
                  <b-form-input
                    :placeholder="$t('Category No.')"
                    id="number"
                    v-model="form.number"
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
            <b-col
              cols="12"
              md="6"
            >
              <validation-provider
                #default="validationContext"
                :name="$t('Subcategory Name')"
                rules="required"
              >
                <b-form-group :label="$t('Subcategory Name')">
                  <b-form-input
                    :placeholder="$t('Subcategory Name')"
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
  BFormSelect,
  BRow,
  BCol,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref, onMounted } from '@vue/composition-api'
import { required } from '@validations'
// import vSelect from 'vue-select'
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
    BFormSelect,
    ValidationProvider,
    ValidationObserver,
    BFormInvalidFeedback,
  },
  model: {
    prop: 'isEditCategoryActive',
    event: 'update:is-edit-category-active',
  },
  props: {
    isEditCategoryActive: {
      type: Boolean,
      required: true,
    },
    categoryData: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const initialState = {
      name: '',
    }

    const form = ref({ ...initialState })

    const {
      busy, updateCategory, respResult, fetchCategories, categories,
    } = useCategories()

    onMounted(async () => {
      if (props.isEditCategoryActive) {
        await fetchCategories()
        form.value = props.categoryData
      }
    })

    const resetplanData = () => {
      form.value = JSON.parse(JSON.stringify(initialState))
    }

    const onSubmit = async () => {
      await updateCategory(form.value)
      if (respResult.value.status === 200) {
        emit('refetch-data')
        emit('update:is-edit-category-active', false)
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
      categories,
      refFormObserver,
      getValidationState,
    }
  },
}
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
