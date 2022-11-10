<template>
  <b-tabs
    vertical
    content-class="col-12 col-md-9 mt-1 mt-md-0"
    pills
    nav-wrapper-class="col-md-3 col-12"
    nav-class="nav-left"
    v-model="tabIndex"
  >

    <!-- general tab -->
    <b-tab>

      <!-- title -->
      <template #title>
        <feather-icon
          icon="UserIcon"
          size="18"
          class="mr-50"
        />
        <span class="font-weight-bold">General</span>
      </template>

      <account-setting-general :account-data="accountData" />
    </b-tab>


    <!-- change password tab -->
    <b-tab>
      <template #title>
        <feather-icon
          icon="LockIcon"
          size="18"
          class="mr-50"
        />
        <span class="font-weight-bold">Change Password</span>
      </template>

      <account-setting-password :account-data="accountData" />
    </b-tab>

  </b-tabs>
</template>

<script>
import { BTabs, BTab } from 'bootstrap-vue'
import { onMounted, ref, watch } from '@vue/composition-api'
import useAccount from '@/composables/account'
import AccountSettingGeneral from './AccountSettingGeneral.vue'
import AccountSettingPassword from './AccountSettingPassword.vue'


export default {
  components: {
    BTabs,
    BTab,
    AccountSettingGeneral,
    AccountSettingPassword,
  },

  setup(_, { root }) {
    const {
      fetchAccount,
      accountData,
    } = useAccount()

    const tabIndex = ref(0)

    const activeTab = () => {
      if (root.$route.name === 'account-password') {
        tabIndex.value = 1
      } else {
        tabIndex.value = 0
      }
    }

    watch(() => root.$route.meta.tab, async status => {
      activeTab()
    }, {
      immediate: true,
    })

    onMounted(
      fetchAccount,
    )
    return {
      tabIndex,
      accountData,
      fetchAccount,
    }
  },

}
</script>
