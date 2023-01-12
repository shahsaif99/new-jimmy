<template>
  <b-row>
    <b-col sm="3">
      <b-card>
        <div class="mb-2  justify-centent-center text-center">
          <b-avatar
            ref="previewEl"
            :src="user.avatar_url"
            :text="avatarText(user.name)"
            size="90px"
            rounded
          />
          <h4 class="mt-2">
            {{ user.name }}
          </h4>
        </div>

        <div class="d-flex justify-content-between">
          <b-card-text>
            Date of Birth
          </b-card-text>
          <b-card-text>
            {{ user.dob }}
          </b-card-text>
        </div>
        <div class="d-flex justify-content-between">
          <b-card-text>
            Address
          </b-card-text>
          <b-card-text>
            {{ user.address }}
          </b-card-text>
        </div>
        <div class="d-flex justify-content-between">
          <b-card-text>
            Postal Code
          </b-card-text>
          <b-card-text>
            {{ user.postal_code }}
          </b-card-text>
        </div>
        <div class="d-flex justify-content-between">
          <b-card-text>
            Phone
          </b-card-text>
          <b-card-text>
            {{ user.phone }}
          </b-card-text>
        </div>
        <div class="d-flex justify-content-between">
          <b-card-text>
            Email
          </b-card-text>
          <b-card-text>
            {{ user.email }}
          </b-card-text>
        </div>
        <div class="d-flex justify-content-between">
          <b-card-text>
            Status
          </b-card-text>
          <b-card-text>
            {{ user.status ? 'Active' : 'Not Active' }}
          </b-card-text>
        </div>
        <div class="d-flex justify-content-between">
          <b-card-text>
            Last Login
          </b-card-text>
          <b-card-text>
            {{ user.last_login_at }}
          </b-card-text>
        </div>
      </b-card>
    </b-col>
    <b-col
      sm="9"
    >
      <b-tabs
        lazy
      >
        <b-tab>
          <!-- title -->
          <template #title>
            <span class="font-weight-bold">General Info</span>
          </template>

          <General :user-data="user" />
        </b-tab>
        <b-tab>
          <!-- title -->
          <template #title>
            <feather-icon
              icon="LockIcon"
              size="18"
              class="mr-50"
            />
            <span class="font-weight-bold">Access</span>
          </template>

          <Access :user-data="user" />
        </b-tab>
        <b-tab>
          <!-- title -->
          <template #title>
            <feather-icon
              icon="LockIcon"
              size="18"
              class="mr-50"
            />
            <span class="font-weight-bold">Salary & Holiday</span>
          </template>

          <SalaryAndHoliday :user-data="user" />
        </b-tab>

        <b-tab>
          <!-- title -->
          <template #title>
            <feather-icon
              icon="Icon"
              size="18"
              class="mr-50"
            />
            <span class="font-weight-bold">Competence</span>
          </template>

          <Competence :user-data="user" />
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>

<script>
import {
  BTabs, BTab, BRow, BCol, BCard, BCardText, BMedia,
  BAvatar,
} from 'bootstrap-vue'
import {
  onMounted, ref,
} from '@vue/composition-api'
import useUsers from '@/composables/users'
import { avatarText } from '@core/utils/filter'
import General from './General.vue'
import Access from './Access.vue'
import SalaryAndHoliday from './SalaryAndHoliday.vue'
import Competence from '../../competence/Index.vue'

export default {
  components: {
    BTabs,
    BTab,
    BRow,
    BCol,
    BCard,
    Access,
    BAvatar,
    BMedia,
    General,
    BCardText,
    Competence,
    SalaryAndHoliday,
  },
  data() {
    return {
      options: {},
    }
  },

  setup(_, { root }) {
    const {
      user,
      getUser,
    } = useUsers()

    const index = ref(0)

    onMounted(async () => {
      await getUser(root.$route.params.id)
      index.value = 1
    //   userData.value = user.value
    })

    return {
      user,
      index,
      avatarText,
    }
  },
}
</script>
