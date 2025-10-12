<template>
  <b-modal
    cancel-variant="outline-secondary"
    centered
    :hide-footer="true"
    :title="$t('Add Competence Course')"
    size="lg"
    class="modal-add-competence-active"
    @close="$emit('update:is-add-competence-active', false)"
    :visible="isAddCompetenceActive"
    @hide="$emit('update:is-add-competence-active', false)"
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

          <validation-provider
            #default="validationContext"
            :name="t('Name')"
            rules="required"
          >
            <b-form-group
              :label="t('Name')"
              label-for="projectname"
            >
              <b-form-input
                v-model="formData.name"
                :placeholder="t('Name')"
                :state="
                  getValidationState(
                    validationContext
                  )
                "
              />
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <validation-provider
            #default="validationContext"
            :name="t('Category')"
            rules="required"
          >
            <b-form-group
              :label="t('Category')"
              label-for="category"
            >
              <v-select
                v-model="formData.category_id"
                :options="categories"
                :reduce="category => category.id"
                label="name"
                :placeholder="t('Select Category')"
                :clearable="false"
              />
              <b-form-invalid-feedback :state="getValidationState(validationContext)">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
          <div class="mb-2">
            <b-row>
              <b-col>
                <div class="d-flex align-items-center justify-content-end">
                  <b-button
                    variant="primary"
                    class="mt-1"
                    type="submit"
                  >
                    <span class="text-nowrap">{{ t('Submit') }}</span>
                  </b-button>
                </div>
              </b-col>
            </b-row>
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
  BFormInput,
  BButton,
  BFormGroup,
  BFormInvalidFeedback,
} from 'bootstrap-vue'
import { ref, onMounted } from '@vue/composition-api'
import useSettingsCompetence from '@/composables/settingsCompetence'
import { required } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import vSelect from 'vue-select'
import axios from '@axios'
import route from 'ziggy-js'

export default {
  components: {
    BCol,
    BRow,
    BForm,
    BFormInput,
    BButton,
    BFormGroup,
    ValidationProvider,
    ValidationObserver,
    BFormInvalidFeedback,
    vSelect,
  },
  model: {
    prop: 'isAddCompetenceActive',
    event: 'update:is-add-competence-active',
  },
  props: {
    isAddCompetenceActive: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const initialState = {
      name: '',
      category_id: null,
    }
    const { t } = useI18nUtils()

    const formData = ref({ ...initialState })
    const categories = ref([])

    const {
      busy,
      respResult,
      storeCompetence,
    } = useSettingsCompetence()

    const {
      refFormObserver, getValidationState, resetForm,
    } = formValidation()

    const fetchCategories = async () => {
      try {
        const response = await axios.get(route('competence-categories.index'))
        categories.value = response.data.data
      } catch (error) {
        console.error('Failed to fetch categories', error)
      }
    }

    onMounted(() => {
      fetchCategories()
    })

    const onSubmit = async () => {
      await storeCompetence(formData.value)
      if (respResult.value.status === 200) {
        emit('refetch-data')
        emit('update:is-add-competence-active', false)
        resetForm()
      }
    }


    return {
      t,
      busy,
      formData,
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
<style lang="scss" scoped>
.per-page-selector {
    width: 90px;
}
</style>
