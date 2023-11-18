import { routes } from 'vue-router/auto/routes'
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:meta-layouts'
import type { VueApp } from '~/types'

const router = createRouter({
  routes: setupLayouts(routes), // 注册文件路由表
  history: createWebHistory(import.meta.env.BASE_URL),
})
// Setup vue-router
// https://router.vuejs.org
export const setupRouter: VueApp = async (app) => {
  app.use(router)
  router.beforeEach((_to, _from, _next) => {
    const { isLoggedIn } = useUserStore()
    if (!isLoggedIn && !_to.meta.no_login)
      _next({ path: 'login' })
    else
      _next()
  })
  await router.isReady()
}
