import { routes } from 'vue-router/auto/routes'
import { createRouter, createWebHistory, isNavigationFailure } from 'vue-router'
import { setupLayouts } from 'virtual:meta-layouts'
import { PageEnum } from '~/enums/pageEnum'
import type { Recordable, VueApp } from '~/types'

const router = createRouter({
  routes: setupLayouts(routes), // 注册文件路由表
  history: createWebHistory(import.meta.env.BASE_URL),
})

// 全局前置守卫
router.beforeEach(async (_to, _from, _next) => {
  // 启动加载动画
  const Loading = window.$loading || null
  Loading && Loading.start()
  // 重定向到登录页
  if (_from.path === PageEnum.BASE_LOGIN && _to.name === 'errorPage') {
    _next(PageEnum.BASE_HOME)
    return
  }
  const { token } = useUserStore()
  const { isDynamicRouteAdded, setDynamicRouteAdded } = useAsyncRouteStore()
  const skip_auth = _to.meta.skip_auth

  console.log('token', !!token)
  console.log('skip_auth', !!skip_auth)

  if (!token) {
    if (skip_auth) {
      _next()
      return
    }
    const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
      path: PageEnum.BASE_LOGIN,
      replace: true,
      query: { ..._from.query, redirect: _to.path },
    }
    _next(redirectData)
    return
  }
  if (isDynamicRouteAdded) {
    _next()
    return
  }
  const redirectPath = (_from.query.redirect || _to.path) as string
  const redirect = decodeURIComponent(redirectPath)
  const nextData = _to.path === redirect ? { ..._to, replace: true } : { path: redirect }
  console.log('nextData', nextData)
  setDynamicRouteAdded(true)
  _next(nextData)
  Loading && Loading.finish()
})

// 全局后置钩子
router.afterEach((to, _from, failure) => {
  // 所有导航失败
  if (isNavigationFailure(failure))
    console.log('failed navigation', failure)

  // 在这里设置需要缓存的组件名称
  const { keepAliveComponents, setKeepAliveComponents } = useAsyncRouteStore()
  const currentComName: any = to.matched.find(item => item.name === to.name)?.name
  if (currentComName && !keepAliveComponents.includes(currentComName) && to.meta?.keepAlive) {
    // 需要缓存的组件
    keepAliveComponents.push(currentComName)
  }
  else if (!to.meta?.keepAlive || to.name === 'Redirect') {
    // 不需要缓存的组件
    const index = keepAliveComponents.findIndex(name => name === currentComName)
    if (index !== -1)
      keepAliveComponents.splice(index, 1)
  }
  setKeepAliveComponents(keepAliveComponents)
  const Loading = window.$loading || null
  Loading && Loading.finish()
})

// 全局路由错误处理
router.onError((error) => {
  console.log(error, '路由错误')
})

// Setup vue-router
// https://router.vuejs.org
export const setupRouter: VueApp = async (app) => {
  app.use(router)
  await router.isReady()
}
