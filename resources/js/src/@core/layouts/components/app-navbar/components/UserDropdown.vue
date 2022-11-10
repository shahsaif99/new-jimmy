<template>
  <b-nav-item-dropdown
    right
    toggle-class="d-flex align-items-center dropdown-user-link"
    class="dropdown-user"
  >
    <template #button-content>
      <div class="d-sm-flex d-none user-nav">
        <p class="user-name font-weight-bolder mb-0">
          {{ userData.name }}
        </p>
        <span class="user-status">{{ userData.role }}</span>
      </div>
      <b-avatar
        size="40"
        :src="userData.avatar_url"
        variant="light-primary"
        badge
        class="badge-minimal"
        badge-variant="success"
      >
        <feather-icon
          v-if="!userData.name"
          icon="UserIcon"
          size="22"
        />
      </b-avatar>
    </template>

    <b-dropdown-item
      :to="{ name: 'account'}"
      link-class="d-flex align-items-center"
    >
      <feather-icon
        size="16"
        icon="UserIcon"
        class="mr-50"
      />
      <span>Profile</span>
    </b-dropdown-item>
    <!-- <b-dropdown-item
      :to="{ name: 'settings'}"
      link-class="d-flex align-items-center"
    >
      <feather-icon
        size="16"
        icon="SettingsIcon"
        class="mr-50"
      />
      <span>Settings</span>
    </b-dropdown-item> -->
    <b-dropdown-item
      link-class="d-flex align-items-center"
      @click="logout"
    >
      <feather-icon
        size="16"
        icon="LogOutIcon"
        class="mr-50"
      />
      <span>Logout</span>
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
import {
  BNavItemDropdown, BDropdownItem, BAvatar,
} from 'bootstrap-vue'
import useJwt from '@/auth/jwt/useJwt'
import axios from '@axios'
import { reactive } from '@vue/composition-api'
import route from 'ziggy-js'
import toaster from '@/composables//toaster'

export default {
  components: {
    BNavItemDropdown,
    BDropdownItem,
    BAvatar,
  },

  setup(props, { root }) {
    const userData = reactive(
      JSON.parse(localStorage.getItem('userData')),
    )
    console.log(userData.avatar_url)
    const toast = toaster()
    const logout = async () => {
      await axios.get(route('logout')).then(() => {
        useJwt.removeToken()
        useJwt.removeUserData()
      })
      root.$router.push({ name: 'login' }).then(() => {
        toast.success('You have successfully logged out.')
      })
    }
    return {
      userData,
      logout,
    }
  },
}
</script>

<style lang="scss">
.user-name{
  text-transform: capitalize;
}

</style>
