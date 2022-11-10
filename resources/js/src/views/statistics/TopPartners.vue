<template>
  <b-card
    no-body
    class="mb-0"
    style="min-height:350px"
  >
    <div class="m-2">
      <h4>Top 5 Partners</h4>
    </div>
    <b-table
      ref="refListTable"
      class="position-relative"
      :items="users"
      :fields="tableColumns"
      primary-key="id"
      show-empty
      empty-text="No matching records found"
      :sort-desc.sync="isSortDirDesc"
    >
      <template #cell(avatar)="data">
        <b-media vertical-align="center">
          <template #aside>
            <b-avatar
              size="32"
              :src="data.item.avatar"
              :text="avatarText(data.item.name)"
              variant="light-success"
            />
          </template>
          <b-link
            class="font-weight-bold d-block text-nowrap"
          >
            {{ data.item.name }}
          </b-link>
          <!-- <small class="text-muted">@{{ data.item.email }}</small> -->
        </b-media>
      </template>
    </b-table>
  </b-card>
</template>

<script>
import useUsers from '@/composables/users'
import { avatarText } from '@core/utils/filter'

import { onMounted, ref } from '@vue/composition-api'
import {
  BCard, BTable, VBTooltip, BLink, BAvatar, BMedia,
} from 'bootstrap-vue'


export default {
  components: {
    BCard,
    BTable,
    BLink,
    BAvatar,
    BMedia,
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  setup() {
    const {
      sortBy,
      filters,
      perPage,
      users,
      dataMeta,
      refetchData,
      searchQuery,
      currentPage,
      totalRecords,
      refListTable,
      isSortDirDesc,
      perPageOptions,
    } = useUsers()
    const isAddLeadActive = ref(false)

    onMounted(async () => {
    //   await fetchStatistics()
    })

    const tableColumns = [
      { key: 'avatar', sortable: false, label: 'Name' },
      // { key: 'name', sortable: true },
      { key: 'email', sortable: true },
      { key: 'phone', sortable: true },
    ]


    return {
      users,
      sortBy,
      filters,
      perPage,
      dataMeta,
      avatarText,
      searchQuery,
      currentPage,
      refetchData,
      totalRecords,
      tableColumns,
      refListTable,
      isSortDirDesc,
      perPageOptions,
      isAddLeadActive,
    }
  },
}
</script>

