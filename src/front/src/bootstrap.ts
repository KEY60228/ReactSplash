import { getCookieValue } from './util'

declare global {
  interface Window {
    axios: any
  }
}

window.axios = require('axios')

// Ajaxリクエストであることを示すヘッダーを付与する
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

// Cookieの送信を許可する
window.axios.defaults.withCredentials = true

window.axios.interceptors.request.use((config: any) => {
  // クッキーからトークンを取り出してヘッダーに添付する
  config.headers['X-XSRF-TOKEN'] = getCookieValue('XSRF-TOKEN')
  return config
})

window.axios.interceptors.response.use(
  (response: any) => response,
  (error: any) => error.response || error
)