<template>
  <div>
    <edit-competence
      :is-edit-competence-active.sync="isEditCompetenceActive"
      v-if="isEditCompetenceActive"
      :competence="competence"
      @refetch-data="fetchCompetences"
      :user-data="userData"
    />
    <show-competence
      :is-show-competence-active.sync="isShowCompetenceActive"
      v-if="isShowCompetenceActive"
      :competence="competence"
      @refetch-data="fetchCompetences"
      :user-data="userData"
    />
    <add-competence
      :is-add-competence-active.sync="isAddCompetenceActive"
      v-if="isAddCompetenceActive"
      @refetch-data="fetchCompetences"
      :user-data="userData"
    />
    <b-tabs>
                   <b-tab title="Competence Overview" active>
    <b-card
      no-body
      class="mb-0"
    >

      <div class="m-2">
        <!-- Filters and Search -->
        <div style="gap: 10px" class="mb-2 d-flex flex-wrap align-items-center">
          <b-dropdown
            id="filters"
            toggle-class="text-decoration-none"
            no-caret
            variant="outline-primary"
          >
            <template #button-content>
              <div class="flex gap-1">
                <feather-icon
                  icon="SlidersIcon"
                  size="16"
                />
                <span>{{ $t('Filters') }}</span>
              </div>
            </template>
            <div class="filter-menu">
              <div class="d-flex justify-content-between px-2 py-1 align-items-center">
                <h3 class="">
                  {{ $t('Filters') }}
                </h3>
                <span
                  @click="filters.toggleExpand"
                  class="cursor-pointer"
                >{{ filters.expandAll ? $t('Collapse All') : $t('Expand All') }}</span>
              </div>
              <div
                class="card-accordion"
                v-for="(item, index) in filters.accordion"
                :key="index"
              >
                <div
                  class="card-accordion-header"
                  @click="toggleExpand(item)"
                >
                  <span class="px-1 text-capitalize">{{ $t(item.label) }}</span>
                  <div class="icon">
                    <feather-icon
                      v-if="!item.isExpand"
                      icon="ChevronDownIcon"
                      size="16"
                    />
                    <feather-icon
                      v-else
                      icon="ChevronUpIcon"
                      size="16"
                    />
                  </div>
                </div>

                <div
                  class="card-accordion-body"
                  :ref="'content' + item.id"
                  :class="{ 'expanded': item.isExpand }"
                >
                  <div class="card-accordion-content px-1">
                    <!-- User Filter -->
                    <div v-if="item.label === 'user'">
                      <b-form-group v-slot="{ ariaDescribedby }">
                        <b-form-radio
                          v-model="item.model"
                          :value="null"
                          class="mt-1 text-capitalize"
                        >
                          <strong>{{ $t('All Users') }}</strong>
                        </b-form-radio>
                        <b-form-radio
                          v-model="item.model"
                          v-for="(option, index) in users"
                          :value="option.id"
                          class="mt-1 text-capitalize"
                          :key="index"
                        >
                          <div>
                            <b-media vertical-align="center">
                              <template #aside>
                                <b-avatar
                                  size="32"
                                  :src="option.avatar"
                                  :text="avatarText(option.name)"
                                  :variant="`light-${resolveUserRoleVariant(option.name)}`"
                                />
                              </template>
                              <b-link>
                                {{ option.name }}
                              </b-link>
                            </b-media>
                          </div>
                        </b-form-radio>
                      </b-form-group>
                    </div>

                    <!-- Competence Name Filter -->
                    <div v-if="item.label === 'competence name'">
                      <b-form-group v-slot="{ ariaDescribedby }">
                        <b-form-radio
                          v-model="item.model"
                          :value="null"
                          class="mt-1 text-capitalize"
                        >
                          <strong>{{ $t('All Competences') }}</strong>
                        </b-form-radio>
                        <b-form-radio
                          v-model="item.model"
                          v-for="(option, index) in competenceCourses"
                          :value="option.name"
                          class="mt-1 text-capitalize"
                          :key="index"
                        >
                          {{ option.name }}
                        </b-form-radio>
                      </b-form-group>
                    </div>

                    <!-- Status Filter -->
                    <div v-if="item.label === 'status'">
                      <b-form-group v-slot="{ ariaDescribedby }">
                        <b-form-radio
                          v-model="item.model"
                          :value="null"
                          class="mt-1 text-capitalize"
                        >
                          <strong>{{ $t('All Statuses') }}</strong>
                        </b-form-radio>
                        <b-form-radio
                          v-for="(option, index) in item.options"
                          :value="option"
                          class="mt-1 text-capitalize"
                          v-model="item.model"
                          :key="index"
                        >
                          {{ $t(option) }}
                        </b-form-radio>
                      </b-form-group>
                    </div>

                    <!-- Level Filter -->
                    <div v-if="item.label === 'level'">
                      <b-form-group v-slot="{ ariaDescribedby }">
                        <b-form-radio
                          v-model="item.model"
                          :value="null"
                          class="mt-1"
                        >
                          <strong>{{ $t('All Levels') }}</strong>
                        </b-form-radio>
                        <b-form-radio
                          v-for="(option, index) in item.options"
                          :value="option.value"
                          class="mt-1"
                          v-model="item.model"
                          :key="index"
                        >
                          {{ $t(option.label) }}
                        </b-form-radio>
                      </b-form-group>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-dropdown>

          <!-- Search bar -->
          <div>
            <b-form-input
              v-model="searchQuery"
              :placeholder="$t('Search...')"
              style="min-width: 200px"
            />
          </div>
        </div>

        <b-row class="mt-2">
          <b-col
            cols="12"
            md="8"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          >
            <v-select
              v-model="perPage"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="perPageOptions"
              :clearable="false"
              class="per-page-selector d-inline-block mx-50"
            />
            <label>{{ t('records per page') }}</label>


            <b-button
              variant="primary"
              @click="isAddCompetenceActive = true"
              v-if="$can('competence-add', 'all')"
              class="ml-3"
            >
              <span class="text-nowrap">{{ t('Add Competence') }}</span>
            </b-button>
          </b-col>
        </b-row>
      </div>
      <vue-good-table
        mode="remote"
        @on-page-change="onPageChange"
        @on-per-page-change="onPerPageChange"
        :columns="tableColumns"
        @on-sort-change="onSortChange"
        @on-column-filter="onColumnFilter"
        :rows="competences"
        :is-loading.sync="busy"
        :total-rows="totalRecords"
        :sort-options="{
          enabled: false,
        }"
        :search-options="{
          enabled: true,
          externalQuery: searchTerm }"
        :pagination-options="{
          enabled: true,
          perPage:pageLength
        }"
        :group-options="{
          enabled: true,
        }"
      >

        <template
          slot="table-row"
          slot-scope="props"
        >
          <span v-if="props.column.field === 'competence'">
            <p
              class="font-weight-bold"
              v-if="props.index=== 0"
            >   {{ $t('Competence Name') }}
            </p>
            {{ props.row.competence.name }}
          </span>

          <span v-if="props.column.field === 'status'">
            <p
              class="font-weight-bold"
              v-if="props.index=== 0"
            >   {{ $t('Status') }}
            </p>
            <div
              class="text-nowrap"
            >
              <span
                class="align-text-top text-capitalize"
                :class="`text-${resolveStatus(props.row.competence.status)}`"
              >
                <b-badge :variant="resolveStatus(props.row.competence.status)">
                  <span>{{ $t(props.row.competence.status) }}</span>
                </b-badge>
              </span>
            </div>
          </span>
          <span v-if="props.column.field === 'completed_date'">
            <p
              class="font-weight-bold"
              v-if="props.index=== 0"
            >   {{ $t('Completed') }}
            </p>
            {{ props.row.competence.completed_date }}
          </span>
          <span v-if="props.column.field === 'valid_until'">
            <p
              class="font-weight-bold"
              v-if="props.index=== 0"
            >   {{ $t('Valid Until') }}
            </p>
            {{ props.row.competence.valid_until }}
          </span>
          <span v-if="props.column.field === 'planned_date'">
            <p
              class="font-weight-bold"
              v-if="props.index=== 0"
            >   {{ $t('Planned Date') }}
            </p>
            {{ props.row.competence.planned_date }}
          </span>
          <span v-if="props.column.field === 'level'">
            <p
              class="font-weight-bold"
              v-if="props.index=== 0"
            >   {{ $t('Level') }}
            </p>
            <img
              v-if="props.row.competence.level !== null && props.row.competence.level !== undefined"
              :src="`/images/level-${props.row.competence.level}.svg`"
              :alt="`Level ${props.row.competence.level}`"
              :title="getLevelLabel(props.row.competence.level)"
              style="height: 30px; width: auto;"
            />
            <span v-else class="text-muted">-</span>
          </span>


          <span v-if="props.column.field === 'files'">
            <p
              class="font-weight-bold"
              v-if="props.index=== 0"
            >   {{ $t('Files') }}
            </p>
            <span v-if="props.row.competence.media && props.row.competence.media.length > 0">
              <feather-icon
                icon="PaperclipIcon"
                size="18"
                class="cursor-pointer text-primary"
                @click="downloadFiles(props.row.competence)"
              />
            </span>
          </span>

          <span v-else-if="props.column.field === 'actions'">
            <p
              class="font-weight-bold"
              v-if="props.index=== 0"
            >   {{ $t('Actions') }}
            </p>
            <div
              class="text-nowrap"
            >
              <feather-icon
                :id="`user-row-${props.row.id}-pencil-icon`"
                icon="EditIcon"
                size="16"
                class="mx-1 cursor-pointer"
                v-if="$can('competence-edit', 'all')"
                @click="editCompetence(props.row.competence, props.row.user_name)"
              />

              <feather-icon
                :id="`user-row-${props.row.id}-eye-icon`"
                icon="EyeIcon"
                size="16"
                class="mx-1 cursor-pointer"
                v-if="$can('competence-view', 'all')"
                @click="showCompetence(props.row.competence, props.row.user_name)"
              />
              <feather-icon
                :id="`delete-request-${props.row.id}-trash-btn`"
                icon="Trash2Icon"
                class="cursor-pointer"
                size="16"
                v-if="$can('competence-delete', 'all')"
                @click="confirmDelete(props.row.competence.id)"
              />
            </div>
          </span>

        </template>
      </vue-good-table>
    </b-card>
         </b-tab>
         <b-tab title="Competence Matrix">
           <b-card no-body class="mb-0">
             <div class="m-2">
               <div class="d-flex justify-content-end mb-2">
                 <b-button
                   variant="outline-primary"
                   @click="isCustomizeTableActive = true"
                 >
                   <feather-icon icon="SettingsIcon" size="16" class="mr-50" />
                   {{ $t('Customize Table') }}
                 </b-button>
               </div>
               <div class="table-responsive">
                 <table class="table table-bordered table-hover">
                   <thead>
                     <tr>
                       <th class="text-left" style="min-width: 150px;">{{ $t('Employee') }}</th>
                       <th
                         v-for="course in visibleCourses"
                         :key="course.id"
                         class="text-center"
                         style="min-width: 120px;"
                       >
                         {{ course.name }}
                       </th>
                     </tr>
                   </thead>
                   <tbody>
                     <tr
                       v-for="user in visibleUsers"
                       :key="user.id"
                     >
                       <td class="font-weight-bold">
                         <b-media vertical-align="center">
                           <template #aside>
                             <b-avatar
                               size="32"
                               :src="user.avatar"
                               :text="avatarText(user.name)"
                               :variant="`light-${resolveUserRoleVariant(user.name)}`"
                             />
                           </template>
                           {{ user.name }}
                         </b-media>
                       </td>
                       <td
                         v-for="course in visibleCourses"
                         :key="course.id"
                         class="text-center"
                       >
                         <div v-if="getCompetenceForUserAndCourse(user.id, course.name)">
                            {{ getCompetenceForUserAndCourse(user.id, course.name) }}
                               <b-badge :variant="resolveStatus( getCompetenceForUserAndCourse(user.id, course.name).status)">
                                <span>{{ $t( getCompetenceForUserAndCourse(user.id, course.name).valid_until) }}</span>
                            </b-badge>
                         </div>
                         <span v-else class="text-muted">-</span>
                       </td>
                     </tr>
                   </tbody>
                 </table>
               </div>
             </div>
           </b-card>
         </b-tab>
      </b-tabs>

      <!-- Customize Table Modal -->
      <b-modal
        v-model="isCustomizeTableActive"
        :title="$t('Customize Table')"
        size="lg"
        hide-footer
        @hide="isCustomizeTableActive = false"
      >
        <b-tabs pills>
          <b-tab :title="$t('Users')" active>
            <div class="mt-2">
              <p class="mb-2">
                {{ $t('Check employees to show/hide them from the matrix') }}
              </p>
              <div class="mb-2">
                <b-button
                  size="sm"
                  variant="outline-secondary"
                  @click="toggleAllUsers(true)"
                  class="mr-1"
                >
                  {{ $t('Select All') }}
                </b-button>
                <b-button
                  size="sm"
                  variant="outline-secondary"
                  @click="toggleAllUsers(false)"
                >
                  {{ $t('Deselect All') }}
                </b-button>
              </div>
              <div style="max-height: 400px; overflow-y: auto;">
                <div
                  v-for="user in users"
                  :key="user.id"
                  class="d-flex align-items-center justify-content-between mb-2 p-2 border rounded"
                >
                  <b-media vertical-align="center">
                    <template #aside>
                      <b-avatar
                        size="32"
                        :src="user.avatar"
                        :text="avatarText(user.name)"
                        :variant="`light-${resolveUserRoleVariant(user.name)}`"
                      />
                    </template>
                    {{ user.name }}
                  </b-media>
                  <b-form-checkbox
                    v-model="visibleUserIds"
                    :value="user.id"
                    switch
                  />
                </div>
              </div>
            </div>
          </b-tab>

          <b-tab :title="$t('Courses')">
            <div class="mt-2">
              <p class="mb-2">
                {{ $t('Check courses to show/hide them from the matrix') }}
              </p>
              <div class="mb-2">
                <b-button
                  size="sm"
                  variant="outline-secondary"
                  @click="toggleAllCourses(true)"
                  class="mr-1"
                >
                  {{ $t('Select All') }}
                </b-button>
                <b-button
                  size="sm"
                  variant="outline-secondary"
                  @click="toggleAllCourses(false)"
                >
                  {{ $t('Deselect All') }}
                </b-button>
              </div>
              <div style="max-height: 400px; overflow-y: auto;">
                <div
                  v-for="course in competenceCourses"
                  :key="course.id"
                  class="d-flex align-items-center justify-content-between mb-2 p-2 border rounded"
                >
                  <span>{{ course.name }}</span>
                  <b-form-checkbox
                    v-model="visibleCourseIds"
                    :value="course.id"
                    switch
                  />
                </div>
              </div>
            </div>
          </b-tab>
        </b-tabs>

        <div class="d-flex justify-content-end mt-3">
          <b-button
            variant="secondary"
            @click="isCustomizeTableActive = false"
            class="mr-1"
          >
            {{ $t('Close') }}
          </b-button>
        </div>
      </b-modal>
  </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BButton,
  BBadge,
  BFormInput,
  BDropdown,
  BFormRadio,
  BFormGroup,
  BAvatar,
  BLink,
  BMedia,
  BTab,
  BTabs,
  BModal,
  BFormCheckbox,
} from 'bootstrap-vue'
import { ref, onMounted, computed } from '@vue/composition-api'
import vSelect from 'vue-select'
import useCompetences from '@/composables/competences'
import useSettingsCompetence from '@/composables/settingsCompetence'
import useUsers from '@/composables/users'
import { avatarText } from '@core/utils/filter'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import i18n from '@/libs/i18n'
import { VueGoodTable } from 'vue-good-table'
import AddCompetence from './dialogs/Add.vue'
import EditCompetence from './dialogs/Edit.vue'
import ShowCompetence from './dialogs/Show.vue'
import 'vue-good-table/dist/vue-good-table.css'
import useJwt from "@/auth/jwt/useJwt";


export default {
  components: {
    BCol,
    BRow,
    BCard,
    vSelect,
    BButton,
    BBadge,
    AddCompetence,
    BFormInput,
    BDropdown,
    BFormRadio,
    BFormGroup,
    BAvatar,
    BLink,
    BMedia,
    VueGoodTable,
    EditCompetence,
    ShowCompetence,
    BTab,
    BTabs,
    BModal,
    BFormCheckbox,
  },

  setup(props, { root }) {
    const {
      busy,
      sortBy,
      filters,
      perPage,
      competences,
      dataMeta,
      respResult,
      refetchData,
      searchQuery,
      tableColumns,
      currentPage,
      totalRecords,
      refListTable,
      deleteCompetence,
      isSortDirDesc,
      fetchCompetences,
      resolveStatus,
      getLevelLabel,
      perPageOptions,
      downloadCompetenceFiles,
    } = useCompetences()

    const { competences: competenceCourses, fetchCompetenceList } = useSettingsCompetence()
    const { fetchUsers, users, resolveUserRoleVariant } = useUsers()
    const { t } = useI18nUtils()
    const searchTerm = ref('')
    const userData = ref(null)
    const pageLength = ref(10)
    const serverParams = ref({
      columnFilters: {
      },
      sort: [
        {
          field: '',
          type: '',
        },
      ],
      page: 1,
      perPage: 10,
    })
    const toggleExpand = item => {
      item.isExpand = !item.isExpand
    }

    onMounted(async () => {
      // Initialize filters from URL query parameters
      const urlParams = new URLSearchParams(window.location.search)
      const query = Object.fromEntries(urlParams.entries())
    userData.value = JSON.parse(useJwt.getUserData());
      filters.group = true
      if (userData.value && userData.value.role !== 'Admin') {
        filters.userId = userData.value.id
      }

      await fetchUsers()
      await fetchCompetenceList()

      // Load filters from URL after data is fetched
      if (Object.keys(query).length > 0) {
        filters.initFromQuery(query)
      }

      fetchCompetences(serverParams.value)
    })
    const isExportActive = ref(false)
    const isAddCompetenceActive = ref(false)
    const isAddDocumentActive = ref(false)
    const isEditCompetenceActive = ref(false)
    const isShowCompetenceActive = ref(false)
    const isCustomizeTableActive = ref(false)
    const competence = ref({})

    // Visible users and courses IDs
    const visibleUserIds = ref([])
    const visibleCourseIds = ref([])

    const deleteConfirmed = async id => {
      await deleteCompetence(id)
      if (respResult.value.status === 200) {
        fetchCompetences()
      }
    }

    const editCompetence = item => {
      console.log(item)
      competence.value = item
      isEditCompetenceActive.value = true
    }

    const showCompetence = (item, name) => {
      competence.value = item
      competence.value.user_name = name
      isShowCompetenceActive.value = true
    }

    const handleSearch = query => {
      searchQuery.value = query
      fetchCompetences(serverParams.value)
    }

    const updateParams = newProps => {
      serverParams.value = { ...serverParams.value, ...newProps }
    }

    const onPageChange = params => {
      updateParams({ page: params.currentPage })
      fetchCompetences(serverParams.value)
    }

    const onPerPageChange = params => {
      updateParams({ perPage: params.currentPerPage })
      fetchCompetences(serverParams.value)
    }

    const onSortChange = params => {
      console.log(params.columnIndex)
      updateParams({
        sort: [
          {
            type: params.sortType,
            field: tableColumns.value[params.columnIndex].field,
          },
        ],
      })
      fetchCompetences(serverParams.value)
    }

    const onColumnFilter = params => {
      updateParams(params)
      fetchCompetences(serverParams.value)
    }


    const confirmDelete = async id => {
      root.$bvModal
        .msgBoxConfirm(i18n.t('Please confirm that you want to delete competence.'), {
          title: i18n.t('Please Confirm'),
          size: 'sm',
          okTitle: i18n.t('Confirm'),
          cancelTitle: i18n.t('Cancel'),
        })
        .then(value => {
          if (value) {
            deleteConfirmed(id)
          }
        })
    }

    const downloadFiles = async competenceData => {
      await downloadCompetenceFiles(competenceData.id)
    }

    const getCompetenceForUserAndCourse = (userId, courseName) => {
    console.log('Getting competence for userId:', userId, 'and courseName:', courseName,'competence data:', competences.value);
      // Find competence group for this user
      const userCompetences = competences.value.find(group => {
        console.log('Checking usercompetences group:', group.children, 'for userId:', userId);
        return group.children && group.children.some(child => child.user_id == userId)
      })

      if (!userCompetences || !userCompetences.children) {
        console.log('No user competences found for userId:', userId);
        return null
      }

      // Find specific competence for this course
      const competence = userCompetences.children.find(child => {
        console.log('Checking child competence:', child, 'for courseName:', courseName);
        return child.user_id === userId && child.competence && child.competence.name === courseName
      })
      console.log('Found competence:', competence);
      return competence ? competence.competence : null
    }

    // Computed properties for visible users and courses
    const visibleUsers = computed(() => {
      if (visibleUserIds.value.length === 0) {
        return users.value
      }
      return users.value.filter(user => visibleUserIds.value.includes(user.id))
    })

    const visibleCourses = computed(() => {
      if (visibleCourseIds.value.length === 0) {
        return competenceCourses.value
      }
      return competenceCourses.value.filter(course => visibleCourseIds.value.includes(course.id))
    })

    // Toggle functions
    const toggleAllUsers = (selectAll) => {
      if (selectAll) {
        visibleUserIds.value = users.value.map(user => user.id)
      } else {
        visibleUserIds.value = []
      }
    }

    const toggleAllCourses = (selectAll) => {
      if (selectAll) {
        visibleCourseIds.value = competenceCourses.value.map(course => course.id)
      } else {
        visibleCourseIds.value = []
      }
    }

    return {
      t,
      busy,
      sortBy,
      filters,
      perPage,
      dataMeta,
      searchTerm,
      pageLength,
      handleSearch,
      onSortChange,
      onColumnFilter,
      updateParams,
      onPerPageChange,
      onPageChange,
      competence,
      competences,
      refetchData,
      searchQuery,
      currentPage,
      tableColumns,
      totalRecords,
      refListTable,
      isSortDirDesc,
      confirmDelete,
      downloadFiles,
      showCompetence,
      editCompetence,
      perPageOptions,
      isExportActive,
      resolveStatus,
      getLevelLabel,
      fetchCompetences,
      isAddCompetenceActive,
      isAddDocumentActive,
      isEditCompetenceActive,
      isShowCompetenceActive,
      users,
      competenceCourses,
      toggleExpand,
      avatarText,
      resolveUserRoleVariant,
      userData,
      getCompetenceForUserAndCourse,
      isCustomizeTableActive,
      visibleUserIds,
      visibleCourseIds,
      visibleUsers,
      visibleCourses,
      toggleAllUsers,
      toggleAllCourses,
    }
  },
}
</script>
  <style scoped>
  .per-page-selector {
    width: 90px;
  }

  .card-accordion {
    height: auto;
    display: block;
    position: relative;
    margin: 0px;
    padding: 0 10px;
    border-top: 1px solid #d8d8d8;
  }

  .card-accordion-header {
    padding: 15px 0;
    cursor: pointer;
  }

  .card-accordion-header span {
    font-weight: 600;
  }

  .card-accordion-body {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
  }

  .card-accordion-body.expanded {
    max-height: 500px;
    overflow-y: auto;
  }

  .card-accordion-content {
    padding: 10px 0;
  }

  .icon {
    float: right;
  }

  .filter-menu {
    max-height: 600px;
    overflow: auto;
    min-width: 250px;
  }
  </style>

  <style lang="scss">
  @import '~@core/scss/vue/libs/vue-select.scss';
  </style>
<style >
.vgt-table thead{
    display: none;
}
table.vgt-table{
    font-size: 1rem;
}
table.vgt-table th {
    font-size: 0.857rem;
    text-transform: uppercase
}
table.vgt-table td {
    border: none !important;
}
</style>
