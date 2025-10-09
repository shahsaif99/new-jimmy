<template>
  <!-- <img
    :src="appLogoImage"
    :class="logoClasses"
  > -->
  <!-- <h2 class="brand-text pt-2">
    {{ appName }}
  </h2> -->
  <div />
</template>
<script>
import { $themeConfig } from '@themeConfig'

export default {

  props: {
    logoClasses: {
      type: String,
      default: '',
    },
  },
  setup() {
    const { appName, appLogoImage } = $themeConfig.app
    return {
      appName,
      appLogoImage,
    }
  },
}
</script>
