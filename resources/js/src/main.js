import Vue from 'vue'
import Echo from 'laravel-echo'
import VueCompositionAPI from '@vue/composition-api'
import { ModalPlugin, ToastPlugin } from 'bootstrap-vue'
import i18n from '@/libs/i18n'
import router from './router'
import store from './store'
import App from './App.vue'
// Global Components
import './global-components'
import 'bootstrap-icons/font/bootstrap-icons.css'

// 3rd party plugins
import '@/libs/toastification'
import '@/libs/acl'

Vue.use(ModalPlugin)
Vue.use(ToastPlugin)

Vue.use(VueCompositionAPI)

Vue.config.productionTip = false
window.Pusher = require('pusher-js')

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: process.env.MIX_PUSHER_APP_KEY,
  cluster: process.env.MIX_PUSHER_APP_CLUSTER,
  forceTLS: true,
})


new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
