<template>
  <div>
    <add-plan
      :is-add-active.sync="isAddActive"
      @refetch-data="fetchPlans"
      v-if="isAddActive"
    />
    <edit-plan
      :is-edit-active.sync="isEditActive"
      @refetch-data="fetchPlans"
      :plan-data="planData"
      v-if="isEditActive"
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
            <label>Show</label>
            <v-select
              v-model="perPage"
              :options="perPageOptions"
              :clearable="false"
              class="per-page-selector d-inline-block mx-50"
            />
            <label>poster</label>
          </b-col>

          <b-col
            cols="12"
            md="4"
          >
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input
                v-model="searchQuery"
                class="d-inline-block mr-1"
                placeholder="Sök..."
              />
              <b-button
                variant="primary"
                @click="isAddActive = true"
              >
                <span class="text-nowrap">Add New</span>
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
          :items="plans"
          responsive
          :fields="tableColumns"
          primary-key="id"
          :sort-by.sync="sortBy"
          show-empty
          empty-text="Inga matchande uppgifter hittades"
          :sort-desc.sync="isSortDirDesc"
        >
          <template #cell(status)="data">
            <div>
              <b-form-checkbox
                :checked="data.item.status"
                class="custom-control-success"
                name="check-button"
                @change="onChangeStatus(data.item.id, data.item.status)"
                switch
              />
            </div>
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
              <b-dropdown-item @click="editPlan(data.item)">
                <feather-icon icon="EditIcon" />
                <span class="align-middle ml-50">
                  Redigera</span>
              </b-dropdown-item>

              <b-dropdown-item @click="confirmDelete(data.item.id)">
                <feather-icon
                  icon="TrashIcon"
                />
                <span class="align-middle ml-50">Radera</span>
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
            <span class="text-muted">
              Som visar {{ dataMeta.from }} till {{ dataMeta.to }} av {{ dataMeta.of }} poster</span>
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
  BFormInput,
  BButton,
  BTable,
  BDropdown,
  BDropdownItem,
  BPagination,
  BOverlay,
  BFormCheckbox,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { onMounted, ref } from '@vue/composition-api'
import usePlans from '@/composables/plans'
import AddPlan from './add/AddPlan.vue'
import EditPlan from './edit/EditPlan.vue'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BTable,
    BButton,
    AddPlan,
    BOverlay,
    vSelect,
    EditPlan,
    BDropdown,
    BFormInput,
    BPagination,
    BDropdownItem,
    BFormCheckbox,
  },
  setup(_, context) {
    const {
      busy,
      plans,
      sortBy,
      perPage,
      dataMeta,
      deletePlan,
      respResult,
      fetchPlans,
      searchQuery,
      currentPage,
      refListTable,
      totalRecords,
      tableColumns,
      isSortDirDesc,
      perPageOptions,
      updatePlanStatus,
    } = usePlans()


    onMounted(() => {
      fetchPlans()
    })

    const isAddActive = ref(false)
    const isEditActive = ref(false)
    const isExportActive = ref(false)
    const planData = ref({})
    const filters = ref({})

    const editPlan = data => {
      isEditActive.value = true
      planData.value = data
    }


    const deleteConfirmed = async id => {
      await deletePlan(id)
      if (respResult.value.status === 200) {
        fetchPlans()
      }
    }

    const onChangeStatus = (id, status) => {
      const newStatus = status ? 0 : 1
      const planStatus = plans.value.find(_user => _user.id === id)
      // planStatus.status = newStatus
      context.root.$bvToast.toast(`Plan ${planStatus.title} status changed to ${newStatus ? 'Active' : 'Inactive'}`, {
        title: 'Success',
        variant: 'success',
        solid: true,
        autoHideDelay: 8000,
      })

      const payload = {
        id,
        status: newStatus,
      }
      updatePlanStatus(payload)
      // update user status by axios
    }


    const confirmDelete = async id => {
      context.root.$bvModal
        .msgBoxConfirm('Please confirm that you want to delete plan.', {
          title: 'Please Confirm',
          size: 'sm',
        })
        .then(value => {
          if (value) {
            deleteConfirmed(id)
          }
        })
    }

    return {
      busy,
      plans,
      perPage,
      sortBy,
      filters,
      dataMeta,
      editPlan,
      planData,
      fetchPlans,
      currentPage,
      searchQuery,
      onChangeStatus,
      tableColumns,
      totalRecords,
      refListTable,
      confirmDelete,
      isSortDirDesc,
      perPageOptions,
      isExportActive,
      isEditActive,
      isAddActive,
    }
  },
}
</script>


<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
</style>
