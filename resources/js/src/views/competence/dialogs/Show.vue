<template>
  <b-sidebar
    id="sidebar-show-competence"
    :visible="isShowCompetenceActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @change="(val) => $emit('update:is-show-competence-active', val)"
  >
    <template #default="{ hide }">
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          {{ competence.user_name }}
        </h5>
        <feather-icon
          class="ml-1 cursor-pointer"
          icon="XIcon"
          size="16"
          @click="hide"
        />
      </div>
      <div class="p-2">
        <validation-observer
          ref="refFormObserver"
          #default="{ handleSubmit }"
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
              <b-form-group
                :label="$t('Competence Name')"
                label-for="competencename"
              >
                <div class="font-weight-bold">
                  {{ formData.name }}
                </div>
              </b-form-group>
            </b-col>

            <b-col sm="12">
              <b-form-group
                :label="$t('Status')"
                label-for="status"
                class="mb-2"
              >
                <b-badge
                  :variant="resolveStatus(formData.status)"
                  class="text-capitalize"
                >
                  {{ $t(formData.status) }}
                </b-badge>
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
                <div>{{ formData.planned_date || '-' }}</div>
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
                <div>{{ formData.completed_date || '-' }}</div>
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
                <div>{{ formData.valid_until || '-' }}</div>
              </b-form-group>
            </b-col>

            <b-col sm="6">
              <b-form-group
                :label="$t('Level')"
                label-for="level"
                class="mb-2"
              >
                <img
                  v-if="formData.level !== null && formData.level !== undefined"
                  :src="`/images/level-${formData.level}.svg`"
                  :alt="`Level ${formData.level}`"
                  :title="getLevelLabel(formData.level)"
                  style="height: 30px; width: auto;"
                />
                <span v-else class="text-muted">-</span>
              </b-form-group>
            </b-col>

            <b-col
              cols="12"
              md="12"
            >
              <b-form-group
                :label="$t('Documents/Images')"
                label-for="files"
                class="mt-2"
              >
                <!-- files list in table -->
                <div v-if="formData.media && formData.media.length > 0">
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">
                          {{ $t('File Name') }}
                        </th>
                        <th scope="col">
                          {{ $t('File Type') }}
                        </th>
                        <th scope="col">
                          {{ $t('File Size') }}
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
                  {{ $t('No documents/images uploaded') }}
                </div>
              </b-form-group>
            </b-col>
          </b-row>
        </b-form>
      </validation-observer>
    </div>
    </template>
  </b-sidebar>
</template>

<script>
import {
  BRow,
  BCol,
  BForm,
  BBadge,
  BButton,
  BSidebar,
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
    BSidebar,
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
      resolveStatus,
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
      resolveStatus,
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

  .content-sidebar-header {
    border-bottom: 1px solid #ebe9f1;
    padding: 1.5rem 1.5rem !important;
  }

  ::v-deep .sidebar-lg {
    width: 500px !important;
  }
  </style>

  <style lang="scss">
  @import "~@core/scss/vue/libs/vue-select.scss";
  </style>
