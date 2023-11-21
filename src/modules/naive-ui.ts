import { createDiscreteApi } from 'naive-ui'
import type { VueApp } from '~/types'

/**
 * 不需要全局注册，已经设置了自动引入Naive-ui
 * 挂载 Naive-ui 脱离上下文的 API
 * 如果你想在 setup 外使用 useDialog、useMessage、useNotification、useLoadingBar，
 * 可以通过 createDiscreteApi 来构建对应的 API。
 * https://www.naiveui.com/zh-CN/dark/components/discrete
 */
export const setupNaiveDiscreteApi: VueApp = (_app) => {
  const { message, dialog, notification, loadingBar } = createDiscreteApi(['message', 'dialog', 'notification', 'loadingBar'])
  window.$message = message
  window.$dialog = dialog
  window.$notification = notification
  window.$loading = loadingBar
}
