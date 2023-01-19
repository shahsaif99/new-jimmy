import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import { ModalPlugin, ToastPlugin } from 'bootstrap-vue'
import i18n from '@/libs/i18n'
import router from './router'
import store from './store'
import App from './App.vue'
// Global Components
import './global-components'


// 3rd party plugins
import '@/libs/toastification'
import '@/libs/acl'

Vue.use(ModalPlugin)
Vue.use(ToastPlugin)

Vue.use(VueCompositionAPI)

Vue.config.productionTip = false


new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
