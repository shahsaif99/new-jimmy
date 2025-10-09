import useJwt from '@core/auth/jwt/useJwt'
import axios from '@axios'

axios.defaults.headers.common.Accept = 'application/json'

const { jwt } = useJwt(axios, {})
export default jwt

