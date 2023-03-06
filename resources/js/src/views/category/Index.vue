<template>
  <div>
    <AddCategory
      :is-add-category-active.sync="isAddCategoryActive"
      @refetch-data="fetchCategories"
      :is-subcategory="isSubCategory"
      v-if="isAddCategoryActive"
    />
    <AddSubCategory
      :is-add-category-active.sync="isAddSubCategoryActive"
      @refetch-data="fetchCategories"
      v-if="isAddSubCategoryActive"
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
            <v-select
              v-model="perPage"
              :options="perPageOptions"
              :clearable="false"
              class="per-page-selector d-inline-block mx-50"
            />
            <label>{{ $t('records per page') }}</label>

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
              <b-button
                class="d-inline-block ml-1"
                variant="primary"
                @click="isAddSubCategoryActive=true"
              >
                <span class="text-nowrap">{{ $t('Add SubCategory') }}</span>
              </b-button>
            </div>
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
        :rows="categories"
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
          slot="table-column"
          slot-scope="props"
        >
          <span
            class="text-nowrap"
          >
            {{ $t(props.column.label) }}
          </span>
        </template>
        <template
          slot="table-row"
          slot-scope="props"
        >
          <div class="d-flex justify-content-between pl-3">
            {{ props.row.parent.number }}{{ props.row.number }} {{ props.row.name }}
            <span>
              <div
                class="text-nowrap"
              >
                <feather-icon
                  :id="`user-row-${props.row.id}-pencil-icon`"
                  icon="EditIcon"
                  size="16"
                  class="mx-1 cursor-pointer"
                  @click="editCategory(props.row)"
                />
                <feather-icon
                  @click="confirmDelete(props.row.id)"
                  :id="`delete-request-${props.row.id}-trash-btn`"
                  icon="Trash2Icon"
                  class="cursor-pointer"
                  size="16"
                />
              </div>
            </span>
          </div>

        </template>
        <template
          slot="table-header-row"
          slot-scope="props"
        >
          <div class="d-flex justify-content-between ">
            {{ props.row.label }}
            <span>
              <div
                class="text-nowrap"
              >
                <feather-icon
                  :id="`user-row-${props.row.id}-pencil-icon`"
                  icon="EditIcon"
                  size="16"
                  class="mx-1 cursor-pointer"
                  @click="editCategory(props.row)"
                />
                <feather-icon
                  @click="confirmDelete(props.row.id)"
                  :id="`delete-request-${props.row.id}-trash-btn`"
                  icon="Trash2Icon"
                  class="cursor-pointer"
                  size="16"
                />
              </div>
            </span>
          </div>
        </template>
      </vue-good-table>
    </b-card>
  </div>
</template>

<script>
import {
  BButton, BCard, BCol, BFormInput, BRow, VBTooltip,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import route from 'ziggy-js'
import { ref, onMounted } from '@vue/composition-api'
import useCategories from '@/composables/category'
import i18n from '@/libs/i18n'
import { VueGoodTable } from 'vue-good-table'
import AddCategory from './add/AddCategory.vue'
import AddSubCategory from './add/AddSubCategory.vue'
import EditCategory from './edit/EditCategory.vue'
import 'vue-good-table/dist/vue-good-table.css'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    VueGoodTable,
    BButton,
    vSelect,
    BFormInput,
    AddCategory,
    AddSubCategory,
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
      filters.group = true
      fetchCategories()
    })

    const searchTerm = ref('')
    const pageLength = ref(10)
    const isExportActive = ref(false)
    const isAddCategoryActive = ref(false)
    const isSubCategory = ref(false)
    const isEditCategoryActive = ref(false)
    const isAddSubCategoryActive = ref(false)
    const categoryData = ref({})
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

    const editCategory = item => {
      categoryData.value = item
      isEditCategoryActive.value = true
    }


    const deleteUserConfirmed = async id => {
      await deleteCategory(id)
      if (respResult.value.status === 200) {
        fetchCategories()
      }
    }


    const updateParams = newProps => {
      serverParams.value = { ...serverParams.value, ...newProps }
    }

    const onPageChange = params => {
      updateParams({ page: params.currentPage })
      fetchCategories(serverParams.value)
    }

    const onPerPageChange = params => {
      updateParams({ perPage: params.currentPerPage })
      fetchCategories(serverParams.value)
    }

    const onSortChange = params => {
      updateParams({
        sort: [
          {
            type: params.sortType,
            field: tableColumns.value[params.columnIndex].field,
          },
        ],
      })
      fetchCategories(serverParams.value)
    }

    const onColumnFilter = params => {
      updateParams(params)
      fetchCategories(serverParams.value)
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
      onPageChange,
      onSortChange,
      categories,
      isSubCategory,
      onColumnFilter,
      sortBy,
      searchTerm,
      pageLength,
      onPerPageChange,
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
      editCategory,
      perPageOptions,
      isExportActive,
      isAddSubCategoryActive,
      resolveUserRoleIcon,
      resolveUserRoleVariant,
      isAddCategoryActive,
    }
  },
}
</script>
<style>
table.vgt-table td{
    padding: 0.75em 1.5em 0.75em 0.75em !important;
    font-size: 14px !important;
}
table.vgt-table th{
    font-size: 14px !important;
    font-weight: 400;
    text-transform: none;
}
</style>
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
<style scoped>
.per-page-selector {
  width: 90px;
}
</style>

<style >
table.vgt-table{
  font-size: 1rem;
}
table.vgt-table td {
  border: none !important;
}
</style>
