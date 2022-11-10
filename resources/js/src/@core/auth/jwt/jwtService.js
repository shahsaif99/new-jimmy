import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import Vue from 'vue'
import router from '@/router'
import jwtDefaultConfig from './jwtDefaultConfig'

export default class JwtService {
  // Will be used by this service for making API calls
  axiosIns = null

  // jwtConfig <= Will be used by this service
  jwtConfig = { ...jwtDefaultConfig }

  // For Refreshing Token
  isAlreadyFetchingAccessToken = false

  // For Refreshing Token
  subscribers = []

  constructor(axiosIns, jwtOverrideConfig) {
    this.axiosIns = axiosIns
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }

    // Request Interceptor
    this.axiosIns.interceptors.request.use(
      config => {
        let accessToken = ''
        if (config.url.match('/api')) {
          accessToken = this.getToken()
        }
        // Get token from localStorage
        // const accessToken = this.getLoginToken()

        // If token is present add it to request's Authorization Header
        if (accessToken) {
          // eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
        }
        return config
      },
      error => Promise.reject(error),
    )
    const UnauthorizedLogOut = msg => {
      this.removeToken()
      this.removeUserData()
      router.replace({
        name: 'login',
      }).then(() => {
        Vue.$toast.clear()
        Vue.$toast({
          component: ToastificationContent,
          props: {
            title: msg,
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      }).catch(() => {
      })
    }
    // Add request/response interceptor
    this.axiosIns.interceptors.response.use(
      response => response,
      error => {
        // const { config, response: { status } } = error
        // const originalRequest = config
        const { response } = error
        console.log(error)

        if (response && response.status === 401) {
          const msg = response.data.message ? response.data.message : 'Unauthorized'
          UnauthorizedLogOut(msg)
          // if (!this.isAlreadyFetchingAccessToken) {
          //   this.isAlreadyFetchingAccessToken = true
          //   this.refreshToken().then(r => {
          //     this.isAlreadyFetchingAccessToken = false

          //     // Update accessToken in localStorage
          //     this.setToken(r.data.accessToken)
          //     this.setRefreshToken(r.data.refreshToken)

          //     this.onAccessTokenFetched(r.data.accessToken)
          //   })
          // }
          // const retryOriginalRequest = new Promise(resolve => {
          //   this.addSubscriber(accessToken => {
          //     // Make sure to assign accessToken according to your response.
          //     // Check: https://pixinvent.ticksy.com/ticket/2413870
          //     // Change Authorization header
          //     originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
          //     resolve(this.axiosIns(originalRequest))
          //   })
          // })
          // return retryOriginalRequest
        }
        if (response && response.status === 500) {
          // console.log(response.data.message);
        }
        return Promise.reject(error)
      },
    )
  }

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter(callback => callback(accessToken))
  }

  addSubscriber(callback) {
    this.subscribers.push(callback)
  }

  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName)
  }

  removeToken() {
    return localStorage.removeItem(this.jwtConfig.storageTokenKeyName)
  }

  removeUserData() {
    return localStorage.removeItem(this.jwtConfig.storageUserDataKeyName)
  }

  getUserData() {
    return localStorage.getItem(this.jwtConfig.storageUserDataKeyName)
  }

  removeUserAbility() {
    return localStorage.removeItem(this.jwtConfig.storageUserAbilityKeyName)
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value)
  }

  setUserData(value) {
    localStorage.setItem(this.jwtConfig.storageUserDataKeyName, value)
  }

  register(...args) {
    return this.axiosIns.post(this.jwtConfig.registerEndpoint, ...args)
  }


  // customer

  getCustomerToken() {
    return localStorage.getItem(this.jwtConfig.storageCustomerTokenKeyName)
  }

  getCustomerData() {
    return localStorage.getItem(this.jwtConfig.storageCustomerDataKeyName)
  }

  setCustomerToken(value) {
    localStorage.setItem(this.jwtConfig.storageCustomerTokenKeyName, value)
  }

  setCustomerData(value) {
    localStorage.setItem(this.jwtConfig.storageCustomerDataKeyName, value)
  }

  removeCustomerToken() {
    return localStorage.removeItem(this.jwtConfig.storageCustomerTokenKeyName)
  }

  removeCustomerData() {
    return localStorage.removeItem(this.jwtConfig.storageCustomerDataKeyName)
  }
}
