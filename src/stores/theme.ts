import { defineStore } from 'pinia'

export interface IHeaderSetting {
  headerColor: string
  headerFixed: boolean
  showReload: boolean
}
export interface IMenuSetting {
  minMenuWidth: number
  menuWidth: number
  menuFixed: boolean
  menuMode: 'horizontal' | 'vertical' | 'horizontal-mix'
  mobileWidth: number
}
export interface IMultiTabsSetting {
  tabsColor: string
  tabsFixed: boolean
  tabsShow: boolean
}
export interface ICrumbsSetting {
  crumbsShow: boolean
  crumbsShowIcon: boolean
}
export const useThemeStore = defineStore('theme', () => {
  // 顶部设置
  const headerSetting = reactive<IHeaderSetting>({
    // 背景颜色
    headerColor: '#fff',
    // 是否固定顶部
    headerFixed: true,
    // 是否显示刷新按钮
    showReload: true,
  })
  // 菜单设置
  const menuSetting = reactive<IMenuSetting>({
    // 最小菜单宽度
    minMenuWidth: 64,
    // 菜单宽度
    menuWidth: 200,
    // 是否固定菜单
    menuFixed: true,
    // 导航模式 vertical horizontal
    menuMode: 'vertical',
    // 移动端菜单宽度
    mobileWidth: 800,
  })
  // 多标签设置
  const multiTabsSetting = reactive<IMultiTabsSetting>({
    // 背景颜色
    tabsColor: '#fff',
    // 是否固定多标签
    tabsFixed: true,
    // 是否显示多标签
    tabsShow: true,
  })
  // 面包屑设置
  const crumbsSetting = reactive<ICrumbsSetting>({
    // 是否显示面包屑
    crumbsShow: true,
    // 是否显示面包屑图标
    crumbsShowIcon: true,
  })
  // 导航风格(主题颜色)
  const themeColor = ref<string>('#18A058')
  // 是否处于移动端模式
  const isMobile = ref(false)
  // 是否显示页脚
  const showFooter = ref(false)
  // 路由动画类型
  const pageAnimateType = ref('')
  // 是否开启路由动画
  const isPageAnimate = ref(true)
  // 权限模式
  const permissionMode = ref('')
  function setIsMobile(value: boolean) {
    isMobile.value = value
  }
  return {
    ...toRefs(headerSetting),
    ...toRefs(menuSetting),
    ...toRefs(multiTabsSetting),
    ...toRefs(crumbsSetting),
    themeColor,
    isMobile,
    showFooter,
    pageAnimateType,
    isPageAnimate,
    permissionMode,
    setIsMobile,
  }
})
