<template>
  <layout-vertical>
    <router-view />
    <template #navbar="{ toggleVerticalMenuActive }">
      <app-navbar-vertical-layout :toggle-vertical-menu-active="toggleVerticalMenuActive" />
    </template>
  </layout-vertical>
</template>

<script>
import LayoutVertical from '@core/layouts/layout-vertical/LayoutVertical.vue'
import AppNavbarVerticalLayout from '@core/layouts/components/app-navbar/AppNavbarVerticalLayout.vue'

export default {
  components: {
    LayoutVertical,
    AppNavbarVerticalLayout,
  },
  data() {
    return {
    }
  },
}
</script>
