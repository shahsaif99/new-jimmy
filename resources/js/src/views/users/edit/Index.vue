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
            {{ t('Date of Birth') }}
          </b-card-text>
          <b-card-text>
            {{ user.dob }}
          </b-card-text>
        </div>
        <div class="d-flex justify-content-between">
          <b-card-text>
            {{ t('Address') }}
          </b-card-text>
          <b-card-text>
            {{ user.address }}
          </b-card-text>
        </div>
        <div class="d-flex justify-content-between">
          <b-card-text>
            {{ t('Post Code') }}
          </b-card-text>
          <b-card-text>
            {{ user.postal_code }}
          </b-card-text>
        </div>
        <div class="d-flex justify-content-between">
          <b-card-text>
            {{ t('Phone') }}
          </b-card-text>
          <b-card-text>
            {{ user.phone }}
          </b-card-text>
        </div>
        <div class="d-flex justify-content-between">
          <b-card-text>
            {{ t('Email') }}
          </b-card-text>
          <b-card-text>
            {{ user.email }}
          </b-card-text>
        </div>
        <div class="d-flex justify-content-between">
          <b-card-text>
            {{ t('Status') }}
          </b-card-text>
          <b-card-text>
            {{ user.status ? 'Active' : 'Not Active' }}
          </b-card-text>
        </div>
        <div class="d-flex justify-content-between">
          <b-card-text>
            {{ t('Last Login') }}
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
            <span class="font-weight-bold">{{ t('General Info') }}</span>
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
            <span class="font-weight-bold">{{ t('Access') }}</span>
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
            <span class="font-weight-bold">{{ t('Salary & Holiday') }}</span>
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
            <span class="font-weight-bold">{{ t('Competence') }}</span>
          </template>

          <Competence :user-data="user" />
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>

<script>
import {
  BTabs, BTab, BRow, BCol, BCard, BCardText,
  BAvatar,
} from 'bootstrap-vue'
import {
  onMounted, ref,
} from '@vue/composition-api'
import useUsers from '@/composables/users'
import { avatarText } from '@core/utils/filter'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
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
    const { t } = useI18nUtils()


    onMounted(async () => {
      await getUser(root.$route.params.id)
      index.value = 1
    //   userData.value = user.value
    })

    return {
      t,
      user,
      index,
      avatarText,
    }
  },
}
</script>
