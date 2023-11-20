import { setupI18n } from './i18n'
import { setupRouter } from './router'
import { setupPinia } from './pinia'
import { setupNaiveDiscreteApi } from './naive-ui'
import { setupOther } from './other'
import type { VueApp } from '~/types'

export const installAll: VueApp = (app) => {
  // 安装全局状态管理
  setupPinia(app)
  // 安装国际化插件
  setupI18n(app)
  // 安装路由
  setupRouter(app)
  // 挂载 naive-ui 脱离上下文的 Api
  setupNaiveDiscreteApi(app)
  // 最后安装其他模块
  setupOther(app)
}
