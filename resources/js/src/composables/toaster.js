import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { createToastInterface } from 'vue-toastification'
import '@core/scss/vue/libs/toastification.scss'

export default function toaster() {
  // const toast = useToast()
  const pluginOptions = {
    timeout: 4000,
    icon: '',
  }

  // Create the interface
  const toast = createToastInterface(pluginOptions)

  const success = msg => {
    toast({
      component: ToastificationContent,
      timeout: 5000,
      props: {
        text: msg,
        title: 'Success',
        icon: 'AlertTriangleIcon',
        variant: 'success',
      },
    })
  }
  const error = msg => {
    toast({
      component: ToastificationContent,
      timeout: 5000,
      props: {
        text: msg,
        title: 'Error',
        icon: 'AlertTriangleIcon',
        variant: 'danger',
      },
    })
  }
  const info = msg => {
    toast({
      component: ToastificationContent,
      timeout: 5000,
      props: {
        text: msg,
        title: 'Info',
        icon: 'InfoIcon',
        variant: 'info',
      },
    })
  }
  const warning = msg => {
    toast({
      component: ToastificationContent,
      timeout: 5000,
      props: {
        text: msg,
        title: 'Warning',
        icon: 'AlertTriangleIcon',
        variant: 'warning',
      },
    })
  }
  return {
    success,
    error,
    info,
    warning,
    warn: warning,
  }
}
