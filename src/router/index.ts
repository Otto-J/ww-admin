import { createRouter, createWebHistory } from 'vue-router/auto'

const router = createRouter({
  history: createWebHistory()
  // history: createWebHistory(import.meta.env.BASE_URL)
})

export default router
