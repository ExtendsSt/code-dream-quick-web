import { createRouter, createWebHistory } from 'vue-router/auto'
import type { VueApp } from '~/types'

// Setup vue-router
// https://router.vuejs.org
export const install: VueApp = (app) => {
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
  })
  router.beforeEach((to, from, next) => {
    const title = to.meta.title
    console.log('title', title)
    useHead({
      title: `测试`,
    })
    next()
  })
  app.use(router)
}
