import axios from 'axios'
const http = axios.create({
  baseURL: 'https://admin.webworker.tech'
})

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
http.interceptors.response.use((res) => {
  if (res.status === 200) {
    // 进一步 res.data.error
    if (res.data.error) {
      return Promise.reject(res.data.error)
    } else {
      return res.data
    }
  }
  return res
})

export default http
