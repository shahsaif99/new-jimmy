<template>
  <div>
    <div class="mb-2">
      <h2>{{ t('Reports') }}</h2>
    </div>

    <b-tabs v-model="activeTab" @input="onTabChange">
      <b-tab :title="t('Deviations')">
        <deviations-tab />
      </b-tab>

      <b-tab :title="t('Suppliers')">
        <suppliers-tab />
      </b-tab>

      <b-tab :title="t('Improvements')">
        <improvements-tab />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import { BTabs, BTab } from 'bootstrap-vue'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import { useRouter } from '@core/utils/utils'
import DeviationsTab from './tabs/DeviationsTab.vue'
import SuppliersTab from './tabs/SuppliersTab.vue'
import ImprovementsTab from './tabs/ImprovementsTab.vue'

export default {
  name: 'ReportsIndex',
  components: {
    BTabs,
    BTab,
    DeviationsTab,
    SuppliersTab,
    ImprovementsTab,
  },
  setup() {
    const { t } = useI18nUtils()
    const { route, router } = useRouter()

    const tabMapping = {
      deviations: 0,
      suppliers: 1,
      improvements: 2,
    }

    const tabNames = ['deviations', 'suppliers', 'improvements']

    // Read query parameter immediately (not in onMounted)
    const tabParam = route.value.query.tab
    const initialTab = tabParam && tabMapping[tabParam] !== undefined ? tabMapping[tabParam] : 0
    const activeTab = ref(initialTab)

    // Flag to prevent initial @input from overwriting URL
    const isInitialized = ref(false)

    // Set initialized after a tick
    setTimeout(() => {
      isInitialized.value = true
    }, 100)

    // Update URL when tab changes
    const onTabChange = tabIndex => {
      if (!isInitialized.value) return

      const tabName = tabNames[tabIndex]
      if (tabName) {
        router.replace({
          query: { ...route.value.query, tab: tabName },
        }).catch(() => {})
      }
    }

    return {
      t,
      activeTab,
      onTabChange,
    }
  },
}
</script>

<style scoped lang="scss">
</style>
