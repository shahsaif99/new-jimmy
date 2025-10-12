<template>
  <b-modal
    cancel-variant="outline-secondary"
    centered
    :hide-footer="true"
    :title="competence.user_name"
    size="lg"
    class="modal-edit-competence-active"
    @close="$emit('update:is-show-competence-active', false)"
    :visible="isShowCompetenceActive"
    @hide="$emit('update:is-show-competence-active', false)"
  >
    <div>
      <validation-observer
        ref="refFormObserver"
        #default="{ handleSubmit }"
      >
        <b-form
          @submit.prevent="handleSubmi$t(onSubmit)"
          @reset.prevent="resetForm"
        >
          <b-row>
            <b-col
              cols="6"
              md="6"
            >

              <b-form-group
                :label="$t('Competence Name')"
                label-for="competencename"
              >
                {{ formData.name }}
              </b-form-group>
            </b-col>
            <b-col
              cols="6"
              md="6"
            >

              <b-form-group
                :label="$t('Completed Date')"
                label-for="startdate"
              >
                {{ formData.completed_date }}
              </b-form-group>
            </b-col>
            <b-col
              cols="6"
              md="6"
            >
              <b-form-group
                :label="$t('Valid Until')"
                label-for="enddate"
              >
                {{ formData.valid_until }}
              </b-form-group>
            </b-col>
            <b-col
              cols="6"
              md="6"
            >
              <b-form-group
                :label="$t('Planned Date')"
                label-for="planneddate"
              >
                {{ formData.planned_date }}
              </b-form-group>
            </b-col>
            <b-col
              cols="12"
              md="12"
            >

              <b-form-group
                label="Documents/Images"
                label-for="files"
                class="mt-2"
              >
                <!-- files list in table -->
                <div v-if="formData.media && formData.media.length > 0">
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">
                          File Name
                        </th>
                        <th scope="col">
                          File Type
                        </th>
                        <th scope="col">
                          File Size
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(file, index) in formData.media"
                        :key="index"
                      >
                        <td>
                          <a
                            :href="`/storage/competence/${formData.id}/${file.filename}.${file.extension}`"
                            target="_blank"
                          >
                            {{ file.filename }}.{{ file.extension }}
                          </a>
                        </td>
                        <td>{{ file.extension }}</td>
                        <td>{{ (file.size / 1024).toFixed(2) }} KB</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div v-else class="text-muted">
                  No documents/images uploaded
                </div>
              </b-form-group>
            </b-col>
            <b-col sm="12">
              <validation-provider
                #default="validationContext"
                :name="$t('Status')"
                rules="required"
              >
                <b-form-group
                  :label="$t('Status')"
                  label-for="description"
                  class="mt-2 mb-2"
                >
                  <v-select
                    label="label"
                    :placeholder="$t('Status')"
                    v-model="formData.status"
                    :options="statusOptions"
                    :reduce="status => status.value"
                    :clearable="false"
                    input-id="title"
                    @input="updateStatus"
                  />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col sm="12">
              <b-form-group
                :label="$t('Level')"
                label-for="level"
                class="mt-2 mb-2"
              >
                {{ getLevelLabel(formData.level) }}
              </b-form-group>
            </b-col>
          </b-row>
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
  BFormSelect,
  BFormFile,
  BFormInput,
  BFormGroup,
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
import useSettingsCompetence from '@/composables/settingsCompetence'

export default {
  components: {
    BCol,
    BRow,
    BForm,
    vSelect,
    BFormGroup,
    ValidationProvider,
    ValidationObserver,
    BFormInvalidFeedback,
  },
  model: {
    prop: 'isShowCompetenceActive',
    event: 'update:is-show-competence-active',
  },
  props: {
    isShowCompetenceActive: {
      type: Boolean,
      required: true,
    },
    competence: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const formData = ref({ })
    const files = ref([])
    const {
      busy: storeBusy,
      respResult,
      competences,
      updateCompetence,
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

    const fetchAsynEmployees = debounce(async (loading, name) => {
      if (!name.length) {
        competences.value = []
        return
      }
      filters.role = 'Employee'
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
    onMounted(() => {
      if (props.competence) {
        formData.value = { ...props.competence }
        fetchCompetenceList()
        filters.role = 'Employee'
        fetchUsersList()
      }
    })

    const statusOptions = [
      { label: 'Active', value: 'active' },
      { label: 'Expire', value: 'expire' },
    ]

    const levelOptions = [
      { label: 'Level 0: Not relevant', value: 0 },
      { label: 'Level 1: Has some competence and can complete the work with support', value: 1 },
      { label: 'Level 2: Has good skills and can work independently', value: 2 },
      { label: 'Level 3: Very good competence', value: 3 },
      { label: 'Level 4: Expert, can teach', value: 4 },
    ]

    const getLevelLabel = level => {
      const levelOption = levelOptions.find(opt => opt.value === level)
      return levelOption ? levelOption.label : ''
    }

    const updateStatus = value => {
      formData.value.status = value
    }


    const onSubmit = async () => {
    //
      await updateCompetence(formData)
      if (respResult.value.status === 200) {
        emit('refetch-data')
        emit('update:is-show-competence-active', false)
      }
    }
    const {
      refFormObserver, getValidationState,
    } = formValidation()

    return {
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
      updateStatus,
      statusOptions,
      levelOptions,
      getLevelLabel,
      refFormObserver,
      competencesCourses,
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
