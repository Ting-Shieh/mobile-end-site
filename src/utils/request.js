import axios from 'axios'
const service = axios.create({
  baseURL: 'https://book.youbaobao.xyz:18082', // process.env.VUE_APP_BASE_API,
  timeout: 5000 // 5s
})

// 請求攔截器
service.interceptors.request.use(
  (config) => {
    // 必須返回 config
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 響應攔截器
service.interceptors.response.use(
  (response) => {
    if (response.status === 200 && response.data) {
      return response.data
    } else {
      return Promise.reject(new Error('請求失敗'))
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service
