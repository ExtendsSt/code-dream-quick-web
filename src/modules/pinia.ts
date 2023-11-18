import { createPinia } from 'pinia'
import type { VueApp } from '~/types'

// Setup Pinia 状态管理库
// https://pinia.vuejs.org/zh/
export const setupPinia: VueApp = (app) => {
  const pinia = createPinia()
  app.use(pinia)
}
