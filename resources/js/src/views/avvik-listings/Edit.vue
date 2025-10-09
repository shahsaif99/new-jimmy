<template>

  <div>
    <validation-observer
      ref="refFormObserver"
      #default="{ handleSubmit }"
    >
      <b-form
        @submit.prevent="handleSubmit(onSubmit)"
        @reset.prevent="resetForm"
      >
        <b-card>
          <b-card-title>
            {{ t('Edit') }}
          </b-card-title>
          <b-row>
            <b-col
              cols="6"
              md="6"
            >
              <b-form-group
                :label="t('Type')"
              >
                <validation-provider
                  #default="validationContext"
                  :name="t('Type')"
                  rules="required"
                  vid="avvik_type"
                >
                  <b-form-radio-group
                    v-model="formData.type"
                    :options="['Avvik','Uønsket hendelse']"
                    :state="getValidationState(validationContext)"
                  />

                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col
              cols="6"
              md="6"
            >
              <validation-provider
                #default="validationContext"
                :name="t('Title')"
                rules="required"
              >
                <b-form-group
                  :label="t('Title')"
                >
                  <b-form-input
                    v-model="formData.title"
                    :placeholder="t('Title')"
                    :state="getValidationState(validationContext)"
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
                :name="t('Date')"
                rules="required"
              >
                <b-form-group
                  :label="t('Date')"
                  label-for="validUntil"
                >
                  <b-form-input
                    type="date"
                    v-model="formData.date"
                    placeholder="Date"
                    :state="getValidationState(validationContext)"
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
                :name="t('Department')"
              >
                <b-form-group
                  :label="t('Department')"
                  label-for="department"
                >
                  <b-form-input
                    v-model="formData.department"
                    :placeholder="t('Department')"
                    :state="getValidationState(validationContext)"
                  />
                  <b-form-invalid-feedback :state="getValidationState(validationContext)">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

          </b-row>
          <b-row>
            <b-col
              cols="6"
              md="6"
            >
              <validation-provider
                #default="validationContext"
                :name="t('Registered by')"
                rules="required"
              >
                <b-form-group
                  :label="t('Registered by')"
                  label-for="registered by"
                >
                  <b-form-input
                    v-model="formData.registered_by"
                    :placeholder="t('Registered by')"
                    :state="getValidationState(validationContext)"
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
                :name="t('Responsible Person')"
                rules="required"
              >
                <b-form-group
                  :label="t('Responsible Person')"
                  label-for="serialno"
                >

                  <b-form-input
                    v-model="formData.responsible_person"
                    :placeholder="t('Responsible Person')"
                    :state="getValidationState(validationContext)"
                  />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>


          </b-row>
          <b-row>
            <b-col sm="6">
              <ValidationProvider
                #default="validationContext"
                :name="t('Select Project')"
                rules="required"
              >
                <b-form-group
                  :label="t('Select Project')"
                  label-for="project"
                  :state="getValidationState(validationContext)"
                >
                  <v-select
                    v-model="formData.project"
                    class="w-full"
                    :placeholder="t('Type here to search projects')"
                    :options="projects"
                    :close-on-select="true"
                    :select-on-tab="true"
                    :clearable="false"
                    input-id="project"
                    :filterable="false"
                    label="name"
                    @search="onProjectSearch"
                    :state="getValidationState(validationContext)"
                  >
                    <template slot="no-options">
                      {{ t('type to search projects..') }}
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
                :name="t('Location')"
                rules="required"
              >
                <b-form-group
                  :label="t('Location')"
                >
                  <b-form-input
                    v-model="formData.location"
                    :placeholder="t('Location')"
                    :state="getValidationState(validationContext)"
                  />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>


            <b-col
              cols="12"
            >

              <validation-provider
                #default="validationContext"
                :name="t('Degree of severity')"
              >

                <b-form-group
                  label="Degree of severity"
                  v-slot="{ ariaDescribedby }"
                >
                  <b-form-radio-group
                    v-model="formData.severity"
                    :options="['Ikke definert','Lav','Middels','Høy','Kritisk']"
                    :aria-describedby="ariaDescribedby"
                    name="serverity"
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
                :name="t('Description')"
                rules="required"
              >
                <b-form-group
                  :label="t('Description')"
                  label-for="description"
                >
                  <b-form-textarea
                    v-model="formData.description"
                    :placeholder="t('Description')"
                    :state="getValidationState(validationContext)"
                  />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <b-col
              cols="12"
            >
              <b-form-group
                label="Event Type*"
              >
                <validation-provider
                  #default="validationContext"
                  :name="t('Event Type')"
                  rules="required"
                >
                  <b-form-radio-group
                    v-model="formData.event_type"
                    :options="ruhTypes"
                    value-field="name"
                    text-field="name"
                    :state="getValidationState(validationContext)"
                  />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </validation-provider>
              </b-form-group>
            </b-col>


            <b-col
              cols="6"
              md="12"
            >
              <validation-provider
                #default="validationContext"
                :name="t('Immediate Action')"
              >
                <b-form-group
                  :label="t('Immediate Action')"
                  label-for="immediate_action"
                >
                  <b-form-textarea
                    v-model="formData.immediate_action"
                    :placeholder="t('Immediate Action')"
                    :state="getValidationState(validationContext)"
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
                :name="t('Casual Analysis')"
              >
                <b-form-group
                  :label="t('Casual Analysis')"
                  label-for="casual_analysis"
                >
                  <b-form-textarea
                    v-model="formData.casual_analysis"
                    :placeholder="t('Casual Analysis')"
                    :state="getValidationState(validationContext)"
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
                :name="t('Days of absence')"
              >
                <b-form-group
                  :label="t('Days of absence')"
                  label-for="certificateNumber"
                >
                  <b-form-input
                    v-model="formData.days_of_absence"
                    :placeholder="t('Days of absence')"
                    :state="getValidationState(validationContext)"
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
                :name="t('Cost')"
              >
                <b-form-group
                  :label="t('Cost')"
                >
                  <b-form-input
                    v-model="formData.cost"
                    :placeholder="t('Cost')"
                    :state="getValidationState(validationContext)"
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
                :name="t('Corrective Actions')"
              >
                <b-form-group
                  :label="t('Corrective Actions')"
                  label-for="casual_analysis"
                >
                  <b-form-textarea
                    v-model="formData.corrective_actions"
                    :placeholder="t('Corrective Actions')"
                    :state="getValidationState(validationContext)"
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
                :name="t('Deadline of closing')"
              >
                <b-form-group
                  :label="t('Deadline of closing')"
                >
                  <b-form-input
                    type="date"
                    v-model="formData.closing_deadline"
                    placeholder="Deadline of closing"
                    :state="getValidationState(validationContext)"
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
                :name="t('Date closed')"
              >
                <b-form-group
                  :label="t('Date closed')"
                >
                  <b-form-input
                    type="date"
                    v-model="formData.close_date"
                    placeholder="Date closed"
                    :state="getValidationState(validationContext)"
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
                :name="t('Select User')"
                rules="required"
              >
                <b-form-group
                  :label="t('Select User')"
                  label-for="employee"
                  :state="getValidationState(validationContext)"
                >
                  <v-select
                    v-model="formData.user"
                    class="w-full"
                    :placeholder="t('type to search users..')"
                    :options="users"
                    :close-on-select="true"
                    :select-on-tab="true"
                    :clearable="false"
                    :filterable="false"
                    label="name"
                    @search="onUserSearch"
                    :state="getValidationState(validationContext)"
                  >
                    <template slot="no-options">
                      {{ t('type to search users..') }}
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
          <b-row>
            <b-col>
              <div
                class="d-flex align-items-center justify-content-end mt-3"
              >
                <b-button
                  variant="primary"
                  type="submit"
                >
                  <span class="text-nowrap">{{ t('Update') }}</span>
                </b-button>
              </div>
            </b-col>
          </b-row>
        </b-card>
      </b-form>
    </validation-observer>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BForm,
  BButton,
  BFormInput,
  BCard,
  BCardTitle,
  BFormTextarea,
  BFormRadioGroup,
  BFormGroup,
  BFormInvalidFeedback,
} from 'bootstrap-vue'
import { ref, onMounted } from '@vue/composition-api'
import { required } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import useAvvikRuh from '@/composables/avvikRuh'
import useProjects from '@/composables/projects'
import debounce from 'lodash/debounce'
import vSelect from 'vue-select'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import settingsRuhTypes from '@/composables/settingsRuhTypes'
import useUsers from '@/composables/users'

export default {
  components: {
    BCol,
    BRow,
    BForm,
    BButton,
    vSelect,
    BCard,
    BCardTitle,
    BFormInput,
    BFormGroup,
    BFormTextarea,
    BFormRadioGroup,
    ValidationProvider,
    ValidationObserver,
    BFormInvalidFeedback,
  },

  setup(props, { emit, root }) {
    const {
      busy,
      respResult,
      avvikData,
      getAvvikListing,
      updateAvvikListing,
    } = useAvvikRuh()

    const {
      ruhTypes,
      fetchRuhTypesList,
    } = settingsRuhTypes()

    const {
      busy: usersBusy,
      users,
      //   filters,
      fetchUsersList,
    } = useUsers()


    const { t } = useI18nUtils()


    const initialState = {
      type: '',
      title: '',
      date: '',
      department: '',
      registered_by: '',
      responsible_person: '',
      project: '',
      user: '',
      location: '',
      severity: '',
      description: '',
      event_type: '',
      immediate_action: '',
      casual_analysis: '',
      days_of_absence: '',
      corrective_actions: '',
      cost: '',
      closing_deadline: '',
      close_date: '',
    }
    const formData = ref({ ...initialState })
    const files = ref([])
    const { fetchProjectsList, projects } = useProjects()

    onMounted(async () => {
      await getAvvikListing(root.$route.params.id)
      await fetchRuhTypesList()
      formData.value = { ...avvikData.value }
    })

    const fetchAsynProjects = debounce(async (loading, name) => {
      if (!name.length) {
        projects.value = []
        return
      }
      fetchProjectsList(name)
      loading(false)
    }, 350)

    const onProjectSearch = (name, loading) => {
      if (!name.length) {
        projects.value = []
        return
      }
      loading(true)
      fetchAsynProjects(loading, name, this)
    }

    const fetchAsynEmployees = debounce(async (loading, name) => {
      if (!name.length) {
        return
      }
      //   filters.role = 'Employee'
      fetchUsersList(name)
      loading(false)
    }, 350)

    const onUserSearch = (name, loading) => {
      if (!name.length) {
        return
      }
      loading(true)
      fetchAsynEmployees(loading, name, this)
    }


    const {
      refFormObserver, getValidationState, resetForm,
    } = formValidation()


    const onSubmit = async () => {
      await updateAvvikListing(formData.value, root.$route.params.id)
      if (respResult.value.status === 200) {
        emit('refetch-data')
        emit('update:is-edit-avvik-listing-active', false)
      }
    }
    return {
      t,
      busy,
      users,
      usersBusy,
      ruhTypes,
      files,
      formData,
      projects,
      onSubmit,
      required,
      resetForm,
      onUserSearch,
      onProjectSearch,
      refFormObserver,
      getValidationState,
    }
  },
}
</script>

  <style lang="scss">
    @import '@core/scss/vue/libs/vue-select.scss';
    </style>
