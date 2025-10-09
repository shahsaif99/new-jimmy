<template>
  <b-modal
    cancel-variant="outline-secondary"
    centered
    :hide-footer="true"
    :title="t('Edit Vacation')"
    size="lg"
    class="modal-add-vacation-active"
    id="add-vacation-active"
    @close="$emit('update:is-edit-vacation-active', false)"
    :visible="isEditVacationActive"
    @hide="$emit('update:is-edit-vacation-active', false)"
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
              sm="12"
              class="mb-2"
            >

              <span
                class="align-text-top text-capitalize"
                :class="`text-${resolveStatus(formData.status)}`"
              >
                <b-badge :variant="resolveStatus(formData.status)">
                  <span>{{ $t(formData.status) }}</span>
                </b-badge>
              </span>
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
                :name="t('Used Vacation Days')"
              >
                <b-form-group
                  :label="t('Used Vacation Days')"
                  label-for="days"
                >
                  <b-form-input
                    v-model="formData.used_vacations_days"
                    :placeholder="t('Used Vacation Days')"
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
                    :locale="locale"
                    v-model="formData.from_date"
                    @input="calculateDays"
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
                    :locale="locale"
                    v-model="formData.to_date"
                    @input="calculateDays"
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
                    :disabled="isConsumedAllHolidays"
                    type="submit"
                  >
                    <span class="text-nowrap">{{ t('Update') }}</span>
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
  BBadge,
  BButton,
  BFormRow,
  BFormInput,
  BFormGroup,
  BFormTextarea,
  BFormDatepicker,
  BFormInvalidFeedback,
} from 'bootstrap-vue'
import { ref, onMounted } from '@vue/composition-api'
import useVacations from '@/composables/vacations'
import { required } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import debounce from 'lodash/debounce'
import vSelect from 'vue-select'
import useUsers from '@/composables/users'
import useJwt from '@/auth/jwt/useJwt'
import moment from 'moment'
import { useUtils as useI18nUtils } from '@core/libs/i18n'

export default {
  components: {
    BCol,
    BRow,
    BForm,
    BBadge,
    BButton,
    vSelect,
    BFormRow,
    BFormInput,
    BFormGroup,
    BFormTextarea,
    BFormDatepicker,
    ValidationProvider,
    ValidationObserver,
    BFormInvalidFeedback,
  },
  model: {
    prop: 'isEditVacationActive',
    event: 'update:is-edit-vacation-active',
  },
  props: {
    isEditVacationActive: {
      type: Boolean,
      required: true,
    },
    vacationId: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const initialState = {
      from_date: '',
      to_date: '',
      days: '',
      comments: '',
      user: '',
      used_vacations_days: '',
    }
    const { t } = useI18nUtils()

    const userData = JSON.parse(useJwt.getUserData())
    const formData = ref({ ...initialState })
    const usedHolidays = ref(0)
    const leftHolidays = ref(0)
    const isConsumedAllHolidays = ref(false)

    const calculateDays = () => {
      if (formData.value.from_date && formData.value.to_date) {
        const day = moment(formData.value.from_date)
        const vacationDays = ref(0)
        const endDate = formData.value.to_date
        while (day.isSameOrBefore(endDate, 'day')) {
          if (day.day() !== 0 && day.day() !== 6) vacationDays.value += 1
          day.add(1, 'd')
        }
        formData.value.days = vacationDays.value
        if (formData.value.to_date && vacationDays.value <= leftHolidays.value) {
          isConsumedAllHolidays.value = false
        } else {
          isConsumedAllHolidays.value = true
        }
      }
    }

    const {
      busy,
      respResult,
      getVacation,
      vacationData,
      resolveStatus,
      updateVacation,
    } = useVacations()

    const {
      busy: usersBusy,
      user,
      users,
      getUser,
      fetchUsersList,
    } = useUsers()


    onMounted(async () => {
      if (props.isEditVacationActive) {
        await getVacation(props.vacationId)
        await getUser(userData.id)
        usedHolidays.value = user.value.vacations_sum_days
        formData.value = { ...vacationData.value }
        if (userData.role !== 'Admin') {
          formData.value.user = userData
        }
        if (usedHolidays.value) {
          if (usedHolidays.value >= user.value.holidays) {
            isConsumedAllHolidays.value = true
          }
          leftHolidays.value = user.value.holidays - usedHolidays.value
          formData.value.used_vacations_days = `${usedHolidays.value} used out of ${user.value.holidays}`
        }
      }
    })

    const locale = localStorage.getItem('locale')

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


    const onSubmit = async () => {
      await updateVacation({ ...formData.value, ...{ user_id: formData.value.user.id } })
      if (respResult.value.status === 200) {
        emit('refetch-data')
        emit('update:is-edit-vacation-active', false)
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
      usersBusy,
      onSearch,
      formData,
      required,
      onSubmit,
      userData,
      resetForm,
      resolveStatus,
      calculateDays,
      refFormObserver,
      getValidationState,
      isConsumedAllHolidays,
    }
  },
}
</script>
  <style lang="scss">
  @import "~@core/scss/vue/libs/vue-select.scss";
  </style>

