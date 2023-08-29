import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { Message } from '@arco-design/web-vue'

const router = createRouter({
  history: createWebHistory(),
  // history: createWebHistory(import.meta.env.BASE_URL)
  extendRoutes: (routes) => setupLayouts(routes)
})

// router before
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access_token')
  const expire = localStorage.getItem('expired_at')
  // debugger

  // 未登录退出
  if (!token && to.path !== '/login') {
    next('/login')
  }
  // 登录过期重新登录
  if (expire && new Date().getTime() > Number(expire) * 1000) {
    Message.error('登录过期，请重新登录')
    next('/login')
  }

  // 已登录的，不允许进入 /login 页面自动到 /
  if (token && to.path === '/login') {
    next('/')
  }

  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  next()
})

export default router
