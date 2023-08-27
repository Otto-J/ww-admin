import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'

const router = createRouter({
  history: createWebHistory(),
  // history: createWebHistory(import.meta.env.BASE_URL)
  extendRoutes: (routes) => setupLayouts(routes)
})

// router before
router.beforeEach((to, from, next) => {
  console.log('router before')
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  next()
})

export default router
