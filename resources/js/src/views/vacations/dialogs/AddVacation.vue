<template>
  <b-modal
    cancel-variant="outline-secondary"
    centered
    :hide-footer="true"
    title="Add Vacation"
    size="lg"
    class="modal-add-vacation-active"
    id="add-vacation-active"
    @close="$emit('update:is-add-vacation-active', false)"
    :visible="isAddVacationActive"
    @hide="$emit('update:is-add-vacation-active', false)"
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
          <b-alert
            v-model="isConsumedAllHolidays"
            variant="danger"
            dismissible
          >
            <p>Selected days are more than remaining</p>
          </b-alert>
          <b-form-row>

            <b-col sm="6">
              <ValidationProvider
                #default="validationContext"
                name="Employees"
                rules="required"
              >
                <b-form-group
                  label="Select Employee"
                  label-for="employee"
                  :state="getValidationState(validationContext)"
                >
                  <v-select
                    v-model="formData.user"
                    class="w-full"
                    placeholder="Type here to search employees"
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
                      type to search employees..
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
                name="Used Vacation Days"
              >
                <b-form-group
                  label="Used Vacation Days"
                  label-for="days"
                >
                  <b-form-input
                    v-model="formData.used_vacations_days"
                    placeholder="Used Vacation Days"
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
                name="From Date"
                rules="required"
              >
                <b-form-group
                  label="From Date"
                  label-for="startdate"
                >
                  <b-form-datepicker
                    v-model="formData.from_date"
                    @input="calculateDays"
                    :min="new Date()"
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
                name="To Date"
                rules="required"
              >
                <b-form-group
                  label="To Date"
                  label-for="to_date"
                >
                  <b-form-datepicker
                    v-model="formData.to_date"
                    @input="calculateDays"
                    :min="new Date()"
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
                name="Days"
                rules="required"
              >
                <b-form-group
                  label="Days"
                  label-for="days"
                >
                  <b-form-input
                    v-model="formData.days"
                    placeholder="Days"
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
                name="Comments"
              >
                <b-form-group
                  label="Comments"
                  label-for="comments"
                >
                  <b-form-textarea
                    v-model="formData.comments"
                    placeholder="Comments"
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
                    :disabled="isConsumedAllHolidays"
                  >
                    <span class="text-nowrap">Submit</span>
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
  BAlert,
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

export default {
  components: {
    BCol,
    BRow,
    BForm,
    BAlert,
    BFormRow,
    BButton,
    vSelect,
    BFormInput,
    BFormGroup,
    BFormTextarea,
    BFormDatepicker,
    ValidationProvider,
    ValidationObserver,
    BFormInvalidFeedback,
  },
  model: {
    prop: 'isAddVacationActive',
    event: 'update:is-add-vacation-active',
  },
  props: {
    isAddVacationActive: {
      type: Boolean,
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

    const userData = JSON.parse(useJwt.getUserData())
    const formData = ref({ ...initialState })
    const usedHolidays = ref(0)
    const leftHolidays = ref(0)
    const isConsumedAllHolidays = ref(false)

    const {
      busy,
      respResult,
      storeVacation,
    } = useVacations()

    const {
      busy: usersBusy,
      user,
      users,
      filters,
      getUser,
      fetchUsersList,
    } = useUsers()


    onMounted(async () => {
      if (props.isAddVacationActive) {
        await getUser(userData.id)
        usedHolidays.value = user.value.vacations_sum_days
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


    const resetForm = () => {

    }

    const fetchAsynEmployees = debounce(async (loading, name) => {
      if (!name.length) {
        return
      }
      filters.role = 'Employee'
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
      await storeVacation({ ...formData.value, ...{ user_id: formData.value.user.id } })
      if (respResult.value.status === 200) {
        emit('refetch-data')
        emit('update:is-add-vacation-active', false)
      }
    }
    const {
      refFormObserver, getValidationState,
    } = formValidation()

    return {
      busy,
      users,
      usersBusy,
      onSearch,
      formData,
      required,
      onSubmit,
      resetForm,
      userData,
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
