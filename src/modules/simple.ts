import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue'
import type { VueApp } from '~/types'

// Setup Pinia 状态管理库
// https://pinia.vuejs.org/zh/
// Setup unhead head标签管理库
// https://unhead.unjs.io
export const install: VueApp = (app) => {
  const pinia = createPinia()
  const head = createHead()
  app.use(head)
  app.use(pinia)
  // 开发环境
  if (import.meta.env.DEV)
    // 使用mock数据
    import('~/mocks')
}
