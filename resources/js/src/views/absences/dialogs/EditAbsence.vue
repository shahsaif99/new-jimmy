<template>
  <b-modal
    cancel-variant="outline-secondary"
    centered
    :hide-footer="true"
    title="Add Absence"
    size="lg"
    class="modal-add-absence-active"
    id="add-absence-active"
    @close="$emit('update:is-edit-absence-active', false)"
    :visible="isEditAbsenceActive"
    @hide="$emit('update:is-edit-absence-active', false)"
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
          <b-form-row>
            <b-col
              cols="12"
              md="6"
            >
              <validation-provider
                #default="validationContext"
                :name="t('Absence Type')"
                rules="required"
              >
                <b-form-group
                  :label="t('Absence Type')"
                  label-for="type"
                >
                  <b-form-select
                    id="type"
                    v-model="formData.type"
                    :state="getValidationState(validationContext)"
                    trim
                    value-field="name"
                    text-field="name"
                    :options="absenceTypes"
                    :placeholder="t('Absence Type')"
                  />

                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>

            </b-col>
            <b-col sm="6">
              <ValidationProvider
                #default="validationContext"
                :name="t('Employees')"
                rules="required"
              >
                <b-form-group
                  :label="t('Select Employee')"
                  label-for="employee"
                  :state="getValidationState(validationContext)"
                >
                  <v-select
                    v-model="formData.user"
                    class="w-full"
                    :placeholder="t('Type here to search employees')"
                    :options="users"
                    :close-on-select="true"
                    :select-on-tab="true"
                    :clearable="false"
                    input-id="employee"
                    :filterable="false"
                    :disabled="userData.role !== 'Admin'"
                    label="name"
                    @search="onSearch"
                    :state="getValidationState(validationContext)"
                  >
                    <template slot="no-options">
                      {{ t('type to search employees..') }}
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
            <b-col
              cols="6"
              md="6"
            >
              <validation-provider
                #default="validationContext"
                :name="t('From Date')"
                rules="required"
              >
                <b-form-group
                  :label="t('From Date')"
                  label-for="startdate"
                >
                  <b-form-datepicker
                    v-model="formData.from_date"
                    @input="calculateDays"
                    :locale="locale"
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
            </b-col>
            <b-col
              cols="6"
              md="6"
            >
              <validation-provider
                #default="validationContext"
                :name="t('To Date')"
                rules="required"
              >
                <b-form-group
                  :label="t('To Date')"
                  label-for="to_date"
                >
                  <b-form-datepicker
                    v-model="formData.to_date"
                    @input="calculateDays"
                    :locale="locale"
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
            </b-col>
            <b-col
              cols="6"
              md="6"
            >
              <validation-provider
                #default="validationContext"
                :name="t('Days')"
                rules="required"
              >
                <b-form-group
                  :label="t('Days')"
                  label-for="days"
                >
                  <b-form-input
                    v-model="formData.days"
                    :placeholder="t('Days')"
                    readonly
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
            </b-col>

            <b-col
              cols="6"
              md="12"
            >
              <validation-provider
                #default="validationContext"
                :name="t('Comments')"
              >
                <b-form-group
                  :label="t('Comments')"
                  label-for="comments"
                >
                  <b-form-textarea
                    v-model="formData.comments"
                    :placeholder="t('Comments')"
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
            </b-col>
          </b-form-row>
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
  BButton,
  BFormRow,
  BFormInput,
  BFormGroup,
  BFormSelect,
  BFormTextarea,
  BFormDatepicker,
  BFormInvalidFeedback,
} from 'bootstrap-vue'
import { ref, onMounted } from '@vue/composition-api'
import useAbsences from '@/composables/absences'
import { required } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import debounce from 'lodash/debounce'
import vSelect from 'vue-select'
import useUsers from '@/composables/users'
import useJwt from '@/auth/jwt/useJwt'
import moment from 'moment'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import useSettingsAbsenceTypes from '@/composables/settingsAbsenceTypes'


export default {
  components: {
    BCol,
    BRow,
    BForm,
    BButton,
    vSelect,
    BFormRow,
    BFormInput,
    BFormGroup,
    BFormSelect,
    BFormTextarea,
    BFormDatepicker,
    ValidationProvider,
    ValidationObserver,
    BFormInvalidFeedback,
  },
  model: {
    prop: 'isEditAbsenceActive',
    event: 'update:is-edit-absence-active',
  },
  props: {
    isEditAbsenceActive: {
      type: Boolean,
      required: true,
    },
    absenceId: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const formData = ref({})
    // const formData = toRef(props, 'absence')

    const userData = JSON.parse(useJwt.getUserData())
    const { t } = useI18nUtils()

    const calculateDays = () => {
      if (formData.value.from_date) {
        const day = moment(formData.value.from_date)
        const businessDays = ref(0)
        const endDate = formData.value.to_date
        while (day.isSameOrBefore(endDate, 'day')) {
          if (day.day() !== 0 && day.day() !== 6) businessDays.value += 1
          day.add(1, 'd')
        }
        formData.value.days = businessDays.value
      }
    }

    const {
      absenceTypes,
      fetchAbsenceTypes,
    } = useSettingsAbsenceTypes()

    onMounted(() => {
      fetchAbsenceTypes()
    })

    const {
      busy,
      respResult,
      getAbsence,
      absenceData,
      updateAbsence,
      resolveStatus,
    } = useAbsences()

    const {
      busy: usersBusy,
      users,
      //   filters,
      fetchUsersList,
    } = useUsers()


    onMounted(async () => {
      if (props.isEditAbsenceActive) {
        await getAbsence(props.absenceId)
        formData.value = { ...absenceData.value }
        if (userData.role !== 'Admin') {
          formData.value.user = userData
        }
      }
    })


    const resetForm = () => {

    }

    const fetchAsynEmployees = debounce(async (loading, name) => {
      if (!name.length) {
        return
      }
      //   filters.role = 'Employee'
      fetchUsersList(name)
      loading(false)
    }, 350)

    const onSearch = (name, loading) => {
      if (!name.length) {
        return
      }
      loading(true)
      fetchAsynEmployees(loading, name, this)
    }

    const locale = localStorage.getItem('locale')

    const onSubmit = async () => {
      await updateAbsence({ ...formData.value, ...{ user_id: formData.value.user.id } })
      if (respResult.value.status === 200) {
        emit('refetch-data')
        emit('update:is-edit-absence-active', false)
      }
    }
    const {
      refFormObserver, getValidationState,
    } = formValidation()

    return {
      t,
      busy,
      users,
      locale,
      onSearch,
      formData,
      userData,
      required,
      onSubmit,
      usersBusy,
      resetForm,
      absenceTypes,
      resolveStatus,
      calculateDays,
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

  <style lang="scss">
  @import "~@core/scss/vue/libs/vue-select.scss";
  </style>

