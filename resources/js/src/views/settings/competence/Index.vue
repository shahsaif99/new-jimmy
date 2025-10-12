<template>
  <div>
    <edit-competence
      :is-edit-competence-active.sync="isEditCompetenceActive"
      v-if="isEditCompetenceActive"
      :competence="competence"
      @refetch-data="fetchCompetences"
    />
    <add-competence
      :is-add-competence-active.sync="isAddCompetenceActive"
      v-if="isAddCompetenceActive"
      @refetch-data="fetchCompetences"
    />
    <add-category
      :is-add-category-active.sync="isAddCategoryActive"
      v-if="isAddCategoryActive"
      @refetch-data="fetchCategories"
    />
    <b-card
      no-body
      class="mb-0"
    >
      <div class="m-2">
        <b-row>
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
              v-if="$can('manage-settings', 'all')"
              class="ml-3"
            >
              <span class="text-nowrap">{{ $t('Add Competence Course') }}</span>
            </b-button>
            <b-button
              variant="primary"
              @click="isAddCategoryActive = true"
              v-if="$can('manage-settings', 'all')"
              class="ml-1"
            >
              <span class="text-nowrap">{{ $t('Add Category') }}</span>
            </b-button>
          </b-col>
          <b-col
            cols="12"
            md="4"
          >
            <div
              class="d-flex align-items-center justify-content-end"
            >
              <b-form-input
                v-model="searchQuery"
                class="d-inline-block mr-1"
                :placeholder="t('Search...')"
              />
            </div>
          </b-col>
        </b-row>
      </div>
      <b-overlay
        id="overlay-background"
        :show="busy"
        variant="transparent"
        rounded="sm"
      >
        <b-table
          ref="refListTable"
          class="position-relative"
          :items="competences"
          responsive
          :fields="tableColumns"
          primary-key="id"
          :sort-by.sync="sortBy"
          show-empty
          :empty-text="t('No matching records found')"
          :sort-desc.sync="isSortDirDesc"
        >
          <template #cell(category)="data">
            <span v-if="data.item.category">
              {{ data.item.category.name }}
            </span>
            <span v-else class="text-muted">
              -
            </span>
          </template>

          <template #cell(actions)="data">
            <b-dropdown
              variant="link"
              no-caret
            >
              <template #button-content>
                <feather-icon
                  icon="MoreVerticalIcon"
                  size="16"
                  class="align-middle text-body"
                />
              </template>
              <b-dropdown-item
                @click="editCompetence(data.item)"
              >
                <feather-icon icon="EditIcon" />
                <span class="align-middle ml-50">{{ t('Edit') }}</span>
              </b-dropdown-item>
              <b-dropdown-item
                @click="confirmDelete(data.item.id)"
              >
                <feather-icon
                  icon="TrashIcon"
                />
                <span class="align-middle ml-50">{{ t('Delete') }}</span>
              </b-dropdown-item>
            </b-dropdown>
          </template>
        </b-table>
      </b-overlay>
      <div class="mx-2 mb-2">
        <b-row>
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <span
              class="text-muted"
            >{{ t('Showing') }} {{ dataMeta.from }} {{ t('to') }} {{ dataMeta.to }} {{ t('of') }}
              {{ dataMeta.of }} {{ t('entries') }}</span>
          </b-col>
          <!-- Pagination -->
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-end"
          >
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRecords"
              :per-page="perPage"
              first-number
              last-number
              class="mb-0 mt-1 mt-sm-0"
              prev-class="prev-item"
              next-class="next-item"
            >
              <template #prev-text>
                <feather-icon
                  icon="ChevronLeftIcon"
                  size="18"
                />
              </template>
              <template #next-text>
                <feather-icon
                  icon="ChevronRightIcon"
                  size="18"
                />
              </template>
            </b-pagination>
          </b-col>
        </b-row>
      </div>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BTable,
  BOverlay,
  BButton,
  BDropdown,
  BFormInput,
  BPagination,
  BDropdownItem,
} from 'bootstrap-vue'
import { ref, onMounted } from '@vue/composition-api'
import vSelect from 'vue-select'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import i18n from '@/libs/i18n'
import useSettingsCompetence from '@/composables/settingsCompetence'
import AddCompetence from './dialogs/AddCompetence.vue'
import EditCompetence from './dialogs/EditCompetence.vue'
import AddCategory from './dialogs/AddCategory.vue'
import axios from '@axios'
import route from 'ziggy-js'
import toaster from '@/composables/toaster'

export default {
  components: {
    BCol,
    BRow,
    BCard,
    BTable,
    vSelect,
    BButton,
    BOverlay,
    BDropdown,
    BFormInput,
    BPagination,
    BDropdownItem,
    AddCompetence,
    EditCompetence,
    AddCategory,
  },
  setup(_, { root }) {
    const {
      busy,
      sortBy,
      filters,
      perPage,
      dataMeta,
      respResult,
      refetchData,
      competences,
      searchQuery,
      tableColumns,
      currentPage,
      totalRecords,
      refListTable,
      deleteCompetence,
      isSortDirDesc,
      fetchCompetences,
      perPageOptions,
    } = useSettingsCompetence()

    const { t } = useI18nUtils()

    onMounted(() => {
      fetchCompetences()
      fetchCategories()
    })
    const isExportActive = ref(false)
    const isAddCompetenceActive = ref(false)
    const isEditCompetenceActive = ref(false)
    const isAddCategoryActive = ref(false)
    const competence = ref({})
    const categories = ref([])
    const toast = toaster()

    const fetchCategories = async () => {
      try {
        const response = await axios.get(route('competence-categories.index'))
        categories.value = response.data.data
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch categories')
      }
    }
    const deleteConfirmed = async id => {
      await deleteCompetence(id)
      if (respResult.value.status === 200) {
        fetchCompetences()
      }
    }

    const editCompetence = item => {
      competence.value = item
      isEditCompetenceActive.value = true
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
    return {
      t,
      busy,
      sortBy,
      filters,
      competence,
      perPage,
      competences,
      dataMeta,
      refetchData,
      editCompetence,
      searchQuery,
      currentPage,
      tableColumns,
      totalRecords,
      refListTable,
      isSortDirDesc,
      confirmDelete,
      perPageOptions,
      isExportActive,
      fetchCompetences,
      fetchCategories,
      isAddCompetenceActive,
      isEditCompetenceActive,
      isAddCategoryActive,
      categories,
    }
  },
}
</script>
  <style scoped>
  .per-page-selector {
    width: 90px;
  }
  </style>

  <style lang="scss">
  @import '~@core/scss/vue/libs/vue-select.scss';
  </style>
