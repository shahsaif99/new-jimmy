import Vue from 'vue'
import axios from 'axios'
// axios
const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: `${window.origin}/api`,
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

Vue.prototype.$http = axiosIns

export default axiosIns
