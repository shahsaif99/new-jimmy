<template>
  <b-card
    no-body
    class="mb-0"
  >
    <div class="m-2">
      <h4>Representatives</h4>
    </div>
    <b-table
      ref="refListTable"
      class="position-relative"
      :items="users"
      :fields="tableColumns"
      primary-key="id"
      :sort-by.sync="sortBy"
      show-empty
      :empty-text="t('No matching records found')"
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

      <template #cell(id)="data">
        <b-link
          :to="{ name: 'admin-student-profile', params: { id: data.item.id }}"
          class="font-weight-bold"
        >
          {{ data.item.id }}
        </b-link>
      </template>


      <template #cell(actions)="data">
        <b-link
          :href="`tel:${data.item.phone}`"
          class="ml-1 text-success"
          v-b-tooltip.hover.top="'Phone Call'"
        >
          <feather-icon icon="PhoneCallIcon" />
        </b-link>

        <b-link
          :href="`tel:${data.item.phone}`"
          class="ml-1 text-success"
          v-b-tooltip.hover.top="'Send Message'"
        >
          <feather-icon icon="MailIcon" />
        </b-link>
        <b-link
          :href="`mailto:${data.item.email}`"
          class="ml-1 text-success"
          v-b-tooltip.hover.top="'Send Email'"
        >
          <feather-icon icon="AtSignIcon" />
        </b-link>
      </template>
    </b-table>
  </b-card>
</template>

<script>
import useUsers from '@/composables/users'
import { onMounted } from '@vue/composition-api'
import { avatarText } from '@core/utils/filter'

import {
  BCard, BLink, BAvatar, BMedia, VBTooltip, BTable,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BLink,
    BTable,
    BMedia,
    BAvatar,
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
      fetchUsers,
      searchQuery,
      currentPage,
      totalRecords,
      tableColumns,
      refListTable,
      isSortDirDesc,
      perPageOptions,
    } = useUsers()

    onMounted(async () => {
    //   await fetchStatistics()
    })

    return {
      users,
      sortBy,
      filters,
      perPage,
      dataMeta,
      fetchUsers,
      searchQuery,
      currentPage,
      refetchData,
      avatarText,
      totalRecords,
      tableColumns,
      refListTable,
      isSortDirDesc,
      perPageOptions,
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
