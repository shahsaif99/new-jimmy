<template>
  <div>
    <!-- Supplier Selection Dialog -->
    <supplier-selection-dialog
      :show="showSupplierDialog"
      :selected-id="formData.supplier ? formData.supplier.id : null"
      @select="onSupplierSelect"
      @close="showSupplierDialog = false"
    />

    <!-- Equipment Selection Dialog -->
    <equipment-selection-dialog
      :show="showEquipmentDialog"
      :selected-id="formData.equipment ? formData.equipment.id : null"
      @select="onEquipmentSelect"
      @close="showEquipmentDialog = false"
    />

    <validation-observer
      ref="refFormObserver"
      #default="{ handleSubmit }"
    >
      <b-form
        @submit.prevent="handleSubmit(onSubmit)"
        @reset.prevent="resetForm"
      >
        <b-row>
          <!-- Details Card - 8 cols -->
          <b-col cols="12" lg="8">
            <b-card>
              <b-card-title>
                {{ t('Details') }}
              </b-card-title>

              <b-row>
                <!-- Type -->
                <b-col cols="6" md="6">
                  <validation-provider
                    #default="validationContext"
                    :name="t('Type')"
                    rules="required"
                    vid="avvik_type"
                  >
                    <b-form-group
                      :label="t('Type')"
                      label-for="type"
                      :state="getValidationState(validationContext)"
                    >
                      <v-select
                        v-model="formData.type"
                        class="w-full"
                        :placeholder="t('Select Type')"
                        :options="typeOptions"
                        :close-on-select="true"
                        :clearable="true"
                        input-id="type"
                        @input="onTypeChange"
                      />
                      <b-form-invalid-feedback :state="getValidationState(validationContext)">
                        {{ validationContext.errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Title -->
                <b-col cols="6" md="6">
                  <validation-provider
                    #default="validationContext"
                    :name="t('Title')"
                    rules="required"
                  >
                    <b-form-group
                      :label="t('Title')"
                      label-for="title"
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

                <!-- Time of incident -->
                <b-col cols="6" md="6">
                  <validation-provider
                    #default="validationContext"
                    :name="t('Time of incident')"
                    rules="required"
                  >
                    <b-form-group
                      :label="t('Time of incident')"
                      label-for="time_of_incident"
                    >
                      <b-form-input
                        type="date"
                        v-model="formData.time_of_incident"
                        :placeholder="t('Time of incident')"
                        :state="getValidationState(validationContext)"
                      />
                      <b-form-invalid-feedback>
                        {{ validationContext.errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Register date -->
                <b-col cols="6" md="6">
                  <validation-provider
                    #default="validationContext"
                    :name="t('Register date')"
                    rules="required"
                  >
                    <b-form-group
                      :label="t('Register date')"
                      label-for="date"
                    >
                      <b-form-input
                        type="date"
                        v-model="formData.date"
                        :placeholder="t('Register date')"
                        :state="getValidationState(validationContext)"
                      />
                      <b-form-invalid-feedback>
                        {{ validationContext.errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Project -->
                <b-col cols="6" md="6">
                  <ValidationProvider
                    #default="validationContext"
                    :name="t('Project')"
                    rules="required"
                  >
                    <b-form-group
                      :label="t('Project')"
                      label-for="project"
                      :state="getValidationState(validationContext)"
                    >
                      <v-select
                        v-model="formData.project"
                        class="w-full"
                        :placeholder="t('Type here to search projects')"
                        :options="projectsWithCurrent"
                        :close-on-select="true"
                        :select-on-tab="true"
                        :clearable="false"
                        input-id="project"
                        :filterable="false"
                        label="name"
                        @search="onProjectSearch"
                      >
                        <template slot="no-options">
                          {{ t('Type to search projects..') }}
                        </template>
                        <template slot="option" slot-scope="option">
                          {{ option.name }}
                        </template>
                        <template slot="selected-option" slot-scope="option">
                          {{ option.name }}
                        </template>
                      </v-select>
                      <b-form-invalid-feedback :state="getValidationState(validationContext)">
                        {{ validationContext.errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>
                </b-col>

                <!-- Location -->
                <b-col cols="6" md="6">
                  <validation-provider
                    #default="validationContext"
                    :name="t('Location')"
                  >
                    <b-form-group
                      :label="t('Location')"
                      label-for="location"
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

                <!-- Responsible person (user selector) -->
                <b-col cols="6" md="6">
                  <ValidationProvider
                    #default="validationContext"
                    :name="t('Responsible person')"
                    rules="required"
                  >
                    <b-form-group
                      :label="t('Responsible person')"
                      label-for="user"
                      :state="getValidationState(validationContext)"
                    >
                      <v-select
                        v-model="formData.user"
                        class="w-full"
                        :placeholder="t('Type to search users..')"
                        :options="usersWithCurrent"
                        :close-on-select="true"
                        :select-on-tab="true"
                        :clearable="false"
                        :filterable="false"
                        label="name"
                        @search="onUserSearch"
                      >
                        <template slot="no-options">
                          {{ t('Type to search users..') }}
                        </template>
                        <template slot="option" slot-scope="option">
                          {{ option.name }}
                        </template>
                        <template slot="selected-option" slot-scope="option">
                          {{ option.name }}
                        </template>
                      </v-select>
                      <b-form-invalid-feedback :state="getValidationState(validationContext)">
                        {{ validationContext.errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>
                </b-col>

                <!-- Registered by -->
                <b-col cols="6" md="6">
                  <validation-provider
                    #default="validationContext"
                    :name="t('Registered by')"
                    rules="required"
                  >
                    <b-form-group
                      :label="t('Registered by')"
                      label-for="registered_by"
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

                <!-- Severity -->
                <b-col cols="12">
                  <validation-provider
                    #default="validationContext"
                    :name="t('Severity')"
                  >
                    <b-form-group
                      :label="t('Severity')"
                      label-for="severity"
                      :state="getValidationState(validationContext)"
                    >
                      <b-form-radio-group
                        v-model="formData.severity"
                        :options="severityOptions"
                        name="severity"
                      />
                      <b-form-invalid-feedback :state="getValidationState(validationContext)">
                        {{ validationContext.errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Category event -->
                <b-col cols="6" md="6">
                  <validation-provider
                    #default="validationContext"
                    :name="t('Category event')"
                    rules="required"
                  >
                    <b-form-group
                      :label="t('Category event')"
                      label-for="event_type"
                      :state="getValidationState(validationContext)"
                    >
                      <v-select
                        v-model="formData.event_type"
                        class="w-full"
                        :placeholder="t('Select Category')"
                        :options="categoryEventOptions"
                        :close-on-select="true"
                        :clearable="true"
                        input-id="event_type"
                        :disabled="!formData.type"
                      />
                      <b-form-invalid-feedback :state="getValidationState(validationContext)">
                        {{ validationContext.errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Description and consequence -->
                <b-col cols="12">
                  <validation-provider
                    #default="validationContext"
                    :name="t('Description and consequence')"
                    rules="required"
                  >
                    <b-form-group
                      :label="t('Description and consequence')"
                      label-for="description"
                    >
                      <b-form-textarea
                        v-model="formData.description"
                        :placeholder="t('Description and consequence')"
                        :state="getValidationState(validationContext)"
                      />
                      <b-form-invalid-feedback>
                        {{ validationContext.errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                  <!-- Attach file -->
                  <div class="d-flex justify-content-end mb-2">
                    <label for="file-upload-edit" class="mb-0" style="cursor: pointer;">
                      <feather-icon icon="PaperclipIcon" size="16" class="mr-1" />
                      <span class="text-primary">{{ t('Attach file') }}</span>
                    </label>
                    <input
                      id="file-upload-edit"
                      type="file"
                      multiple
                      class="d-none"
                      @change="onFileSelect"
                    />
                  </div>
                  <!-- Display existing files from server -->
                  <div v-if="existingFiles.length > 0" class="mb-2">
                    <small class="text-muted d-block mb-1">{{ t('Existing attachments') }}:</small>
                    <div
                      v-for="(file, index) in existingFiles"
                      :key="'existing-' + index"
                      class="d-flex align-items-center justify-content-between border rounded p-1 mb-1"
                    >
                      <a :href="file.url" target="_blank" class="text-truncate">
                        <feather-icon icon="FileIcon" size="14" class="mr-1" />
                        {{ file.filename }}.{{ file.extension }}
                      </a>
                      <b-button
                        variant="flat-danger"
                        size="sm"
                        class="p-0"
                        @click="removeExistingFile(index, file)"
                      >
                        <feather-icon icon="XIcon" size="16" />
                      </b-button>
                    </div>
                  </div>
                  <!-- Display newly attached files -->
                  <div v-if="attachedFiles.length > 0" class="mb-2">
                    <small class="text-muted d-block mb-1">{{ t('New attachments') }}:</small>
                    <div
                      v-for="(file, index) in attachedFiles"
                      :key="'new-' + index"
                      class="d-flex align-items-center justify-content-between border rounded p-1 mb-1"
                    >
                      <span class="text-truncate">{{ file.name }}</span>
                      <b-button
                        variant="flat-danger"
                        size="sm"
                        class="p-0"
                        @click="removeFile(index)"
                      >
                        <feather-icon icon="XIcon" size="16" />
                      </b-button>
                    </div>
                  </div>
                </b-col>

                <!-- Immediate action -->
                <b-col cols="12">
                  <validation-provider
                    #default="validationContext"
                    :name="t('Immediate action')"
                  >
                    <b-form-group
                      :label="t('Immediate action')"
                      label-for="immediate_action"
                    >
                      <b-form-textarea
                        v-model="formData.immediate_action"
                        :placeholder="t('Immediate action')"
                        :state="getValidationState(validationContext)"
                      />
                      <b-form-invalid-feedback>
                        {{ validationContext.errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Casual analysis -->
                <b-col cols="12">
                  <validation-provider
                    #default="validationContext"
                    :name="t('Casual analysis')"
                  >
                    <b-form-group
                      :label="t('Casual analysis')"
                      label-for="casual_analysis"
                    >
                      <b-form-textarea
                        v-model="formData.casual_analysis"
                        :placeholder="t('Casual analysis')"
                        :state="getValidationState(validationContext)"
                      />
                      <b-form-invalid-feedback>
                        {{ validationContext.errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Corrective actions -->
                <b-col cols="12">
                  <validation-provider
                    #default="validationContext"
                    :name="t('Corrective actions')"
                  >
                    <b-form-group
                      :label="t('Corrective actions')"
                      label-for="corrective_actions"
                    >
                      <b-form-textarea
                        v-model="formData.corrective_actions"
                        :placeholder="t('Corrective actions')"
                        :state="getValidationState(validationContext)"
                      />
                      <b-form-invalid-feedback>
                        {{ validationContext.errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Planned closing date -->
                <b-col cols="6" md="6">
                  <validation-provider
                    #default="validationContext"
                    :name="t('Planned closing date')"
                    rules="required"
                  >
                    <b-form-group
                      :label="t('Planned closing date')"
                      label-for="closing_deadline"
                    >
                      <b-form-input
                        type="date"
                        v-model="formData.closing_deadline"
                        :placeholder="t('Planned closing date')"
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
                <b-col>
                  <div class="d-flex align-items-center justify-content-end mt-3">
                    <b-button variant="primary" type="submit">
                      <span class="text-nowrap">{{ t('Update') }}</span>
                    </b-button>
                  </div>
                </b-col>
              </b-row>
            </b-card>
          </b-col>

          <!-- Information Card - 4 cols -->
          <b-col cols="12" lg="4">
            <b-card>
              <b-card-title>
                {{ t('Information') }}
              </b-card-title>

              <!-- Undesired Event or HSE Deviation -->
              <div v-if="formData.type === 'Undesired Event' || formData.type === 'HSE Deviation'">
                <!-- Did the incident result in absence? -->
                <b-form-group :label="t('Did the incident result in absence?')">
                  <b-form-radio-group
                    v-model="formData.resulted_in_absence"
                    :options="[{ text: t('Yes'), value: true }, { text: t('No'), value: false }]"
                  />
                </b-form-group>

                <!-- Days (if absence is yes) -->
                <b-form-group v-if="formData.resulted_in_absence" :label="t('Days')">
                  <b-form-input
                    v-model="formData.days_of_absence"
                    type="number"
                    :placeholder="t('Enter number of days')"
                  />
                </b-form-group>

                <!-- Was there a need for adopted work or treatment by medical personnel? -->
                <b-form-group :label="t('Was there a need for adopted work or treatment by medical personnel?')">
                  <b-form-radio-group
                    v-model="formData.medical_treatment_needed"
                    :options="[{ text: t('Yes'), value: true }, { text: t('No'), value: false }]"
                  />
                </b-form-group>
              </div>

              <!-- Quality Deviation or Environmental Deviation -->
              <div v-else-if="formData.type === 'Quality Deviation' || formData.type === 'Environmental Deviation'">
                <!-- Supplier -->
                <b-form-group :label="t('Supplier')">
                  <b-button variant="outline-primary" block @click="showSupplierDialog = true">
                    {{ t('Choose Supplier') }}
                  </b-button>
                  <div v-if="formData.supplier" class="mt-1">
                    <small class="text-muted">{{ formData.supplier.name }}</small>
                  </div>
                </b-form-group>

                <!-- Equipment -->
                <b-form-group :label="t('Equipment')">
                  <b-button variant="outline-primary" block @click="showEquipmentDialog = true">
                    {{ t('Choose Equipment') }}
                  </b-button>
                  <div v-if="formData.equipment" class="mt-1">
                    <small class="text-muted">{{ formData.equipment.name }}</small>
                  </div>
                </b-form-group>

                <!-- Economic consequences -->
                <b-form-group :label="t('Economic consequences?')">
                  <b-form-radio-group
                    v-model="formData.economic_consequences"
                    :options="[{ text: t('Yes'), value: true }, { text: t('No'), value: false }]"
                  />
                </b-form-group>

                <!-- Amount (if economic consequences is yes) -->
                <b-form-group v-if="formData.economic_consequences" :label="t('Amount')">
                  <b-form-input
                    v-model="formData.cost"
                    type="number"
                    :placeholder="t('Enter amount')"
                  />
                </b-form-group>
              </div>

              <!-- Supplier Deviation -->
              <div v-else-if="formData.type === 'Supplier Deviation'">
                <!-- Supplier -->
                <b-form-group :label="t('Supplier')">
                  <b-button variant="outline-primary" block @click="showSupplierDialog = true">
                    {{ t('Choose Supplier') }}
                  </b-button>
                  <div v-if="formData.supplier" class="mt-1">
                    <small class="text-muted">{{ formData.supplier.name }}</small>
                  </div>
                </b-form-group>

                <!-- Equipment -->
                <b-form-group :label="t('Equipment')">
                  <b-button variant="outline-primary" block @click="showEquipmentDialog = true">
                    {{ t('Choose Equipment') }}
                  </b-button>
                  <div v-if="formData.equipment" class="mt-1">
                    <small class="text-muted">{{ formData.equipment.name }}</small>
                  </div>
                </b-form-group>

                <!-- Economic consequences -->
                <b-form-group :label="t('Economic consequences?')">
                  <b-form-radio-group
                    v-model="formData.economic_consequences"
                    :options="[{ text: t('Yes'), value: true }, { text: t('No'), value: false }]"
                  />
                </b-form-group>

                <!-- Amount (if economic consequences is yes) -->
                <b-form-group v-if="formData.economic_consequences" :label="t('Amount')">
                  <b-form-input
                    v-model="formData.cost"
                    type="number"
                    :placeholder="t('Enter amount')"
                  />
                </b-form-group>
              </div>

              <!-- Improvement Suggestion -->
              <div v-else-if="formData.type === 'Improvement Suggestion'">
                <!-- Equipment -->
                <b-form-group :label="t('Equipment')">
                  <b-button variant="outline-primary" block @click="showEquipmentDialog = true">
                    {{ t('Choose Equipment') }}
                  </b-button>
                  <div v-if="formData.equipment" class="mt-1">
                    <small class="text-muted">{{ formData.equipment.name }}</small>
                  </div>
                </b-form-group>
              </div>

              <!-- No type selected -->
              <div v-else class="text-muted text-center py-3">
                {{ t('Select a type to see additional options') }}
              </div>
            </b-card>

            <!-- Close Deviation Card - Admin only -->
            <b-card v-if="userData.role === 'Admin'" class="mt-2">
              <b-card-title>
                {{ t('Close Deviation') }}
              </b-card-title>

              <!-- Status -->
              <b-form-group :label="t('Status')">
                <b-form-radio-group
                  v-model="formData.status"
                  :options="[{ text: t('Open'), value: 'open' }, { text: t('Closed'), value: 'closed' }]"
                />
              </b-form-group>

              <!-- Fields shown only when status is closed -->
              <div v-if="formData.status === 'closed'">
                <!-- Closed Date -->
                <b-form-group :label="t('Closed Date')">
                  <b-form-input
                    type="date"
                    v-model="formData.close_date"
                    :placeholder="t('Closed Date')"
                  />
                </b-form-group>

                <!-- Closed By -->
                <b-form-group :label="t('Closed By')">
                  <v-select
                    v-model="formData.closed_by"
                    class="w-full"
                    :placeholder="t('Type to search users..')"
                    :options="closedByUsersWithCurrent"
                    :close-on-select="true"
                    :select-on-tab="true"
                    :clearable="true"
                    :filterable="false"
                    label="name"
                    @search="onUserSearch"
                  >
                    <template slot="no-options">
                      {{ t('Type to search users..') }}
                    </template>
                    <template slot="option" slot-scope="option">
                      {{ option.name }}
                    </template>
                    <template slot="selected-option" slot-scope="option">
                      {{ option.name }}
                    </template>
                  </v-select>
                </b-form-group>

                <!-- Comment -->
                <b-form-group :label="t('Comment')">
                  <b-form-textarea
                    v-model="formData.close_comment"
                    :placeholder="t('Comment')"
                    rows="3"
                  />
                </b-form-group>
              </div>
            </b-card>
          </b-col>
        </b-row>
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
  BFormGroup,
  BFormInvalidFeedback,
  BFormRadioGroup,
} from 'bootstrap-vue'
import { ref, computed, onMounted } from '@vue/composition-api'
import { required } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import useAvvikRuh from '@/composables/avvikRuh'
import useProjects from '@/composables/projects'
import debounce from 'lodash/debounce'
import vSelect from 'vue-select'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import useUsers from '@/composables/users'
import useJwt from '@/auth/jwt/useJwt'
import SupplierSelectionDialog from './dialogs/SupplierSelectionDialog.vue'
import EquipmentSelectionDialog from './dialogs/EquipmentSelectionDialog.vue'

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
    SupplierSelectionDialog,
    EquipmentSelectionDialog,
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
      busy: usersBusy,
      users,
      fetchUsersList,
    } = useUsers()

    const { t } = useI18nUtils()

    const typeOptions = [
      'Undesired Event',
      'HSE Deviation',
      'Quality Deviation',
      'Environmental Deviation',
      'Supplier Deviation',
      'Improvement Suggestion',
    ]

    const severityOptions = [
      'Not defined',
      'Low',
      'Medium',
      'High',
      'Critical',
    ]

    const categoryEventMap = {
      'Undesired Event': [
        'Accident with personal injury',
        'Accident without personal injury',
        'Near-miss',
        'Dangerous conditions',
        'Material damage (to equipment, vehicles, buildings, etc.)',
        'Work-related illness',
      ],
      'HSE Deviation': [
        'Violation of requirements',
        'Violation of regulations',
        'Violation of procedures',
        'Missing personal protective equipment (PPE)',
        'Missing risk assessment / Safe Job Analysis (SJA)',
        'Incorrect use of equipment or machinery',
        'Poor housekeeping / lack of order on site',
      ],
      'Quality Deviation': [
        'Execution error',
        'Material / component defect',
        'Documentation error',
        'Schedule deviation',
        'Non-compliance with contract / specifications',
        'Missing control / inspection',
      ],
      'Environmental Deviation': [
        'Spill / pollution',
        'Waste management issue',
        'Noise / dust / air pollution',
        'Disturbance to nature / landscape',
        'Energy or resource overuse',
        'Chemical handling issue',
      ],
      'Supplier Deviation': [
        'Delayed delivery',
        'Incorrect / incomplete delivery',
        'Poor quality',
        'Contract / agreement breach',
        'HSE violation by supplier',
        'Missing documentation (e.g., FDV, certificates, declarations of conformity)',
      ],
      'Improvement Suggestion': [
        'None',
      ],
    }

    const initialState = {
      type: '',
      title: '',
      time_of_incident: '',
      date: '',
      project: null,
      location: '',
      user: null,
      registered_by: '',
      severity: '',
      event_type: '',
      description: '',
      immediate_action: '',
      casual_analysis: '',
      corrective_actions: '',
      closing_deadline: '',
      // Information card fields
      supplier: null,
      equipment: null,
      economic_consequences: false,
      cost: '',
      resulted_in_absence: false,
      days_of_absence: '',
      medical_treatment_needed: false,
      // Close Deviation fields
      status: 'open',
      close_date: null,
      closed_by: null,
      close_comment: '',
    }

    const formData = ref({ ...initialState })
    const { fetchProjectsList, projects } = useProjects()

    // Get current user data for admin check
    const userData = JSON.parse(useJwt.getUserData())

    // Dialog states
    const showSupplierDialog = ref(false)
    const showEquipmentDialog = ref(false)

    const onSupplierSelect = (supplier) => {
      formData.value.supplier = supplier
      showSupplierDialog.value = false
    }

    const onEquipmentSelect = (equipment) => {
      formData.value.equipment = equipment
      showEquipmentDialog.value = false
    }

    // File attachment handling
    const attachedFiles = ref([])
    const existingFiles = ref([])
    const filesToDelete = ref([])

    const onFileSelect = (event) => {
      const files = event.target.files
      if (files) {
        for (let i = 0; i < files.length; i++) {
          attachedFiles.value.push(files[i])
        }
      }
      // Reset input so same file can be selected again
      event.target.value = ''
    }

    const removeFile = (index) => {
      attachedFiles.value.splice(index, 1)
    }

    const removeExistingFile = (index, file) => {
      existingFiles.value.splice(index, 1)
      filesToDelete.value.push(file.filename)
    }

    const categoryEventOptions = computed(() => {
      if (!formData.value.type) return []
      return categoryEventMap[formData.value.type] || []
    })

    // Include current user in dropdown options for edit mode
    const usersWithCurrent = computed(() => {
      const currentUser = formData.value.user
      if (currentUser && !users.value.find(u => u.id === currentUser.id)) {
        return [currentUser, ...users.value]
      }
      return users.value
    })

    // Include current project in dropdown options for edit mode
    const projectsWithCurrent = computed(() => {
      const currentProject = formData.value.project
      if (currentProject && !projects.value.find(p => p.id === currentProject.id)) {
        return [currentProject, ...projects.value]
      }
      return projects.value
    })

    // Include current closed_by user in dropdown options for edit mode
    const closedByUsersWithCurrent = computed(() => {
      const currentClosedBy = formData.value.closed_by
      if (currentClosedBy && !users.value.find(u => u.id === currentClosedBy.id)) {
        return [currentClosedBy, ...users.value]
      }
      return users.value
    })

    const onTypeChange = () => {
      formData.value.event_type = ''
      // Reset information card fields when type changes
      formData.value.supplier = null
      formData.value.equipment = null
      formData.value.economic_consequences = false
      formData.value.cost = ''
      formData.value.resulted_in_absence = false
      formData.value.days_of_absence = ''
      formData.value.medical_treatment_needed = false
    }

    onMounted(async () => {
      await getAvvikListing(root.$route.params.id)
      formData.value = { ...avvikData.value }
      // Ensure boolean fields are properly converted
      formData.value.economic_consequences = !!avvikData.value.economic_consequences
      formData.value.resulted_in_absence = !!avvikData.value.resulted_in_absence
      formData.value.medical_treatment_needed = !!avvikData.value.medical_treatment_needed
      // Map closed_by relationship (comes as closed_by from backend)
      if (avvikData.value.closed_by) {
        formData.value.closed_by = avvikData.value.closed_by
      }
      // Load existing media files
      if (avvikData.value.media && avvikData.value.media.length > 0) {
        existingFiles.value = avvikData.value.media
      }
      // Check if coming from "Process" action - set status to closed
      if (root.$route.query.process === 'true') {
        formData.value.status = 'closed'
      }
    })

    const fetchAsynProjects = debounce(async (loading, name) => {
      if (!name.length) {
        projects.value = []
        return
      }
      fetchProjectsList(name, { status: 'In progress' })
      loading(false)
    }, 350)

    const onProjectSearch = (name, loading) => {
      if (!name.length) {
        projects.value = []
        return
      }
      loading(true)
      fetchAsynProjects(loading, name)
    }

    const fetchAsynUsers = debounce(async (loading, name) => {
      if (!name.length) {
        return
      }
      fetchUsersList(name)
      loading(false)
    }, 350)

    const onUserSearch = (name, loading) => {
      if (!name.length) {
        return
      }
      loading(true)
      fetchAsynUsers(loading, name)
    }

    const {
      refFormObserver, getValidationState, resetForm,
    } = formValidation()

    const onSubmit = async () => {
      // Prepare data for submission
      const submitData = { ...formData.value }

      // If economic_consequences is false, set cost to null
      if (!submitData.economic_consequences) {
        submitData.cost = null
      }

      // If resulted_in_absence is false, set days_of_absence to null
      if (!submitData.resulted_in_absence) {
        submitData.days_of_absence = null
      }

      // If status is open, set close deviation fields to null
      if (submitData.status === 'open') {
        submitData.close_date = null
        submitData.closed_by = null
        submitData.close_comment = null
      }

      await updateAvvikListing(submitData, root.$route.params.id, attachedFiles.value, filesToDelete.value)
      if (respResult.value.status === 200) {
        emit('refetch-data')
        emit('update:is-edit-avvik-listing-active', false)
        attachedFiles.value = []
        filesToDelete.value = []
      }
    }

    return {
      t,
      busy,
      users,
      usersBusy,
      formData,
      projects,
      typeOptions,
      severityOptions,
      categoryEventOptions,
      usersWithCurrent,
      projectsWithCurrent,
      closedByUsersWithCurrent,
      userData,
      onTypeChange,
      onSubmit,
      required,
      resetForm,
      onUserSearch,
      onProjectSearch,
      refFormObserver,
      getValidationState,
      showSupplierDialog,
      showEquipmentDialog,
      onSupplierSelect,
      onEquipmentSelect,
      attachedFiles,
      existingFiles,
      onFileSelect,
      removeFile,
      removeExistingFile,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
