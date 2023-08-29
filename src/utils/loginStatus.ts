import { Message } from '@arco-design/web-vue'

export const handleLogout = () => {
  localStorage.removeItem('access_token')
  // remote expired_at username
  localStorage.removeItem('expired_at')
  localStorage.removeItem('username')
}

export const handle403 = (err: any) => {
  if (err && err.response.status === 403) {
    Message.error('请求受限，请重新登录')
    handleLogout()
  } else {
    Message.error('请求出错' + err)
  }
}
