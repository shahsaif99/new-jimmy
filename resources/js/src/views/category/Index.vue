<template>
  <div>
    <AddCategory
      :is-add-category-active.sync="isAddCategoryActive"
      @refetch-data="fetchCategories"
    />
    <EditCategory
      v-if="isEditCategoryActive"
      :is-edit-category-active.sync="isEditCategoryActive"
      @refetch-data="fetchCategories"
      :category-data="categoryData"
    />
    <b-card
      no-body
      class="mb-0 mt-2"
    >
      <div class="m-2">
        <b-row>
          <b-col
            cols="12"
            md="8"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          >
            <label>{{ $t('Show') }}</label>
            <v-select
              v-model="perPage"
              :options="perPageOptions"
              :clearable="false"
              class="per-page-selector d-inline-block mx-50"
            />
            <label>{{ $t('entries') }}</label>

          </b-col>

          <!-- Search -->
          <b-col
            cols="12"
            md="4"
          >
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input
                v-model="searchQuery"
                class="d-inline-block mr-1"
                placeholder="Search..."
              />
              <b-button
                class="d-inline-block ml-1"
                variant="primary"
                @click="isAddCategoryActive=true"
              >
                <span class="text-nowrap">{{ $t('Add Category') }}</span>
              </b-button>
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
          :items="categories"
          responsive
          :fields="tableColumns"
          primary-key="id"
          :sort-by.sync="sortBy"
          show-empty
          :empty-text="$t('No matching records found')"
          :sort-desc.sync="isSortDirDesc"
        >

          <template #head()="data">
            <span>{{ $t(data.label) }}</span>
          </template>

          <!-- Column: Actions -->
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
              <b-dropdown-item @click="editCategoryRow(data.item)">
                <feather-icon icon="EditIcon" />
                <span class="align-middle ml-50">{{ $t('Edit') }}</span>
              </b-dropdown-item>

              <b-dropdown-item @click="confirmDelete(data.item.id)">
                <feather-icon icon="TrashIcon" />
                <span class="align-middle ml-50">{{ $t('Delete') }}</span>
              </b-dropdown-item>

            </b-dropdown>
          </template>

        </b-table></b-overlay>
      <div class="mx-2 mb-2">
        <b-row>

          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <span
              class="text-muted"
            >{{ $t('Showing') }} {{ dataMeta.from }} {{ $t('to') }} {{ dataMeta.to }} {{ $t('of') }}
              {{ dataMeta.of }} {{ $t('entries') }}</span>
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
  BButton, BCard, BCol, BDropdown,
  BDropdownItem, BFormInput, BOverlay, BPagination, BRow, BTable, VBTooltip,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import route from 'ziggy-js'
import { ref, onMounted } from '@vue/composition-api'
import useCategories from '@/composables/category'
import i18n from '@/libs/i18n'
import AddCategory from './add/AddCategory.vue'
import EditCategory from './edit/EditCategory.vue'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BTable,
    BButton,
    vSelect,
    BOverlay,
    BDropdown,
    BFormInput,
    BPagination,
    BDropdownItem,
    AddCategory,
    EditCategory,
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  setup(_, context) {
    const {
      busy,
      categories,
      sortBy,
      perPage,
      filters,
      dataMeta,
      fetchCategories,
      respResult,
      deleteCategory,
      searchQuery,
      totalRecords,
      currentPage,
      refListTable,
      tableColumns,
      isSortDirDesc,
      perPageOptions,
      resolveUserRoleIcon,
      resolveUserRoleVariant,
    } = useCategories()

    const roleFilter = ref(null)
    onMounted(() => {
      fetchCategories()
    })

    const isExportActive = ref(false)
    const isAddCategoryActive = ref(false)
    const isEditCategoryActive = ref(false)
    const categoryData = ref({})

    const editCategoryRow = item => {
      categoryData.value = item
      isEditCategoryActive.value = true
    }


    const deleteUserConfirmed = async id => {
      await deleteCategory(id)
      if (respResult.value.status === 200) {
        fetchCategories()
      }
    }


    const confirmDelete = async id => {
      context.root.$bvModal
        .msgBoxConfirm(i18n.t('Please confirm that you want to delete category.'), {
          title: i18n.t('Please Confirm'),
          size: 'sm',
        })
        .then(value => {
          if (value) {
            deleteUserConfirmed(id)
          }
        })
    }

    return {
      busy,
      categoryData,
      route,
      categories,
      sortBy,
      perPage,
      filters,
      dataMeta,
      roleFilter,
      fetchCategories,
      searchQuery,
      currentPage,
      tableColumns,
      totalRecords,
      refListTable,
      confirmDelete,
      isEditCategoryActive,
      isSortDirDesc,
      editCategoryRow,
      perPageOptions,
      isExportActive,
      resolveUserRoleIcon,
      resolveUserRoleVariant,
      isAddCategoryActive,
    }
  },
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}

.invoice-filter-select {
  min-width: 190px;

  ::v-deep .vs__selected-options {
    flex-wrap: nowrap;
  }

  ::v-deep .vs__selected {
    width: 100px;
  }
}
</style>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
</style>
