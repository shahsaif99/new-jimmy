<template>
  <b-modal
    cancel-variant="outline-secondary"
    centered
    :hide-footer="true"
    title="Add Competence"
    size="lg"
    class="modal-add-competence-active"
    id="add-competence-active"
    @close="$emit('update:is-add-competence-active', false)"
    :visible="isAddCompetenceActive"
    @hide="$emit('update:is-add-competence-active', false)"
  >
    <div>
      <validation-observer
        ref="refFormObserver"
        #default="{ handleSubmit }"
      >
        <b-overlay
          :show="storeBusy"
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
                md="6"
              >
                <validation-provider
                  #default="validationContext"
                  :name="$t('Course Name')"
                  rules="required"
                >
                  <b-form-group
                    :label="$t('Course Name')"
                    label-for="competencename"
                  >
                    <b-form-select
                      id="name"
                      v-model="formData.name"
                      :state="getValidationState(validationContext)"
                      trim
                      value-field="name"
                      text-field="name"
                      :options="competencesCourses"
                      :placeholder="t('Course Name')"
                    />
                    <b-form-invalid-feedback>
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </b-col>
              <b-col
                cols="6"
                md="6"
              >
                <b-form-group
                  label-for="plannedcompetence"
                >
                  <b-form-checkbox
                    id="plannedcompetence"
                    v-model="isPlannedCompetence"
                    class="mt-2"
                  >
                    {{ $t('Planned Competence') }}
                  </b-form-checkbox>
                </b-form-group>
              </b-col>
              <b-col
                v-if="!isPlannedCompetence"
                cols="6"
                md="6"
              >

                <b-form-group
                  :label="t('Completed Date')"
                  label-for="startdate"
                >
                  <b-form-input
                    type="date"
                    v-model="formData.completed_date"
                    :placeholder="t('Completed Date')"
                  />
                </b-form-group>
              </b-col>
              <b-col
                v-if="!isPlannedCompetence"
                cols="6"
                md="6"
              >

                <b-form-group
                  :label="$t('Valid Until')"
                  label-for="enddate"
                >
                  <b-form-input
                    type="date"
                    v-model="formData.valid_until"
                  />
                </b-form-group>
              </b-col>
              <b-col
                v-if="isPlannedCompetence"
                cols="6"
                md="6"
              >

                <b-form-group
                  :label="$t('Planned Date')"
                  label-for="planneddate"
                >
                  <b-form-input
                    type="date"
                    v-model="formData.planned_date"
                  />
                </b-form-group>
              </b-col>
              <b-col
                cols="12"
                md="12"
              >

                <b-form-group
                  :label="$t('Add Documents/Images')"
                  label-for="files"
                  class="mt-2"
                >
                  <validation-provider
                    #default="validationContext"
                    name="Files"
                  >
                    <b-form-file
                      multiple
                      :state="getValidationState(validationContext)"
                      v-model="files"
                    >
                      <template
                        slot="file-name"
                        slot-scope="{ names }"
                      >
                        <b-badge variant="primary">
                          {{ names[0] }}
                        </b-badge>
                        <b-badge
                          v-if="names.length > 1"
                          variant="primary"
                        >
                          + {{ names.length - 1 }} More files
                        </b-badge>
                      </template>
                    </b-form-file>
                    <b-form-invalid-feedback :state="getValidationState(validationContext)">
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col sm="12">
                <validation-provider
                  #default="validationContext"
                  :name="$t('Level')"
                  rules="required"
                >
                  <b-form-group
                    :label="$t('Level')"
                    label-for="level"
                    class="mt-2 mb-2"
                  >
                    <v-select
                      label="label"
                      :placeholder="$t('Level')"
                      v-model="formData.level"
                      :options="levelOptions"
                      :reduce="level => level.value"
                      :clearable="false"
                      input-id="level"
                    />
                    <b-form-invalid-feedback :state="getValidationState(validationContext)">
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </b-col>
              <b-col sm="12">
                <ValidationProvider
                  #default="validationContext"
                  name="Employees"
                  rules="required"
                >
                  <b-form-group
                    :label="$t('Select Employee')"
                    label-for="employee"
                    :state="getValidationState(validationContext)"
                  >
                    <v-select
                      v-model="formData.employees"
                      class="w-full"
                      :placeholder="$t('Type here to search employees')"
                      :options="users"
                      multiple
                      :close-on-select="false"
                      :select-on-tab="true"
                      :clearable="false"
                      input-id="employee"
                      :filterable="false"
                      label="name"
                      @search="onSearch"
                      :state="getValidationState(validationContext)"
                    >
                      <template slot="no-options">
                        {{ $t('type to search employees..') }}
                      </template>
                      <template
                        slot="option"
                        slot-scope="option"
                      >
                        {{ option.name }}
                      </template>
                      <template
                        slot="selected-option"
                        slot-scope="option"
                      >
                        {{ option.name }}
                      </template>
                    </v-select>
                    <b-form-invalid-feedback :state="getValidationState(validationContext)">
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </ValidationProvider>
              </b-col>
            </b-row>
            <div class="mb-2">
              <b-row>
                <b-col>
                  <div class="d-flex align-items-center justify-content-end">
                    <b-button
                      variant="primary"
                      class="mt-1"
                      type="submit"
                    >
                      <span class="text-nowrap">{{ $t('Submit') }}</span>
                    </b-button>
                  </div>
                </b-col>
              </b-row>
            </div>
          </b-form>
        </b-overlay>
      </validation-observer>
    </div>
  </b-modal>
</template>

<script>
import {
  BRow,
  BCol,
  BForm,
  BBadge,
  BButton,
  BOverlay,
  BFormFile,
  BFormInput,
  BFormSelect,
  BFormGroup,
  BFormCheckbox,
  BFormInvalidFeedback,
} from 'bootstrap-vue'
import { ref, onMounted } from '@vue/composition-api'
import useCompetences from '@/composables/competences'
import useUsers from '@/composables/users'
import { required } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import debounce from 'lodash/debounce'
import vSelect from 'vue-select'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import useSettingsCompetence from '@/composables/settingsCompetence'

export default {
  components: {
    BCol,
    BRow,
    BForm,
    BBadge,
    BButton,
    vSelect,
    BOverlay,
    BFormFile,
    BFormInput,
    BFormGroup,
    BFormSelect,
    BFormCheckbox,
    ValidationProvider,
    ValidationObserver,
    BFormInvalidFeedback,
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
    userData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { emit }) {
    const initialState = {
      name: '',
      completed_date: '',
      valid_until: '',
      planned_date: '',
      status: '',
      level: '',
      employees: [],
    }
    const { t } = useI18nUtils()

    const formData = ref({ ...initialState })
    const files = ref([])
    const isPlannedCompetence = ref(false)
    const {
      busy: storeBusy,
      respResult,
      competences,
      storeCompetence,

    } = useCompetences()

    const {
      competences: competencesCourses,
      fetchCompetenceList,
    } = useSettingsCompetence()

    const {
      busy: usersBusy,
      users,
      filters,
      fetchUsersList,
    } = useUsers()

    onMounted(() => {
      fetchCompetenceList()
    })

    const fetchAsynEmployees = debounce(async (loading, name) => {
      if (!name.length) {
        competences.value = []
        return
      }
    //   filters.role = 'Employee'
      fetchUsersList(name)
      loading(false)
    }, 350)

    const onSearch = (name, loading) => {
      if (!name.length) {
        competences.value = []
        return
      }
      loading(true)
      fetchAsynEmployees(loading, name, this)
    }

    const resetForm = () => {

    }
    const statusOptions = [
      { label: t('Active'), value: 'active' },
      { label: t('Expire'), value: 'expire' },
    ]

    const levelOptions = [
      { label: t('Level 0: Not relevant'), value: 0 },
      { label: t('Level 1: Has some competence and can complete the work with support'), value: 1 },
      { label: t('Level 2: Has good skills and can work independently'), value: 2 },
      { label: t('Level 3: Very good competence'), value: 3 },
      { label: t('Level 4: Expert, can teach'), value: 4 },
    ]


    const onSubmit = async () => {
      const formDataObj = new FormData()
      formDataObj.append('name', formData.value.name)
      formDataObj.append('completed_date', formData.value.completed_date)
      formDataObj.append('valid_until', formData.value.valid_until)
      if (formData.value.planned_date) {
        formDataObj.append('planned_date', formData.value.planned_date)
      }
      formDataObj.append('status', formData.value.status)
      if (formData.value.level !== null && formData.value.level !== undefined && formData.value.level !== '') {
        formDataObj.append('level', formData.value.level)
      }
      formDataObj.append('employees', JSON.stringify(formData.value.employees.map(item => item.id)))
      for (let index = 0; index < files.value.length; index++) {
        formDataObj.append('files[]', files.value[index])
      }
      await storeCompetence(formDataObj)
      if (respResult.value.status === 200) {
        emit('refetch-data')
        emit('update:is-add-competence-active', false)
      }
    }
    const {
      refFormObserver, getValidationState,
    } = formValidation()

    return {
      t,
      files,
      users,
      onSearch,
      usersBusy,
      storeBusy,
      debounce,
      formData,
      required,
      onSubmit,
      resetForm,
      statusOptions,
      levelOptions,
      refFormObserver,
      competencesCourses,
      getValidationState,
      isPlannedCompetence,
    }
  },
}
</script>
<style lang="scss" scoped>
.per-page-selector {
    width: 90px;
}
</style>

<style lang="scss">
@import "~@core/scss/vue/libs/vue-select.scss";
</style>
