<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router/auto'
import { PageEnum } from '~/enums/pageEnum'

export interface Props {
  mode?: 'horizontal' | 'vertical'
  collapsed?: boolean
  location?: string
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'vertical',
  collapsed: false,
  location: 'left',
})
const emit = defineEmits(['update:collapsed', 'clickMenuItem'])
// 当前路由
const currentRoute = useRoute()
const router = useRouter()
const asyncRouteStore = useAsyncRouteStore()
const menus = ref<any[]>([])
const selectedKeys = ref<string>(currentRoute.name as string)
const headerMenuSelectKey = ref<string>('')

// 获取当前打开的子菜单
const matched = currentRoute.matched
const getOpenKeys: string[] = matched && matched.length ? matched.map(item => item.name as string) : []
const state = reactive({
  openKeys: getOpenKeys,
})

const getSelectedKeys = computed(() => {
  const location = props.location
  return location === 'left' ? selectedKeys.value : headerMenuSelectKey.value
})

function renderIcon(_icon: any) {
  return () => h('div', { class: _icon ?? `i-carbon-user-profile` })
}
function updateSelectedKeys() {
  const matched = currentRoute.matched
  state.openKeys = matched.map(item => item.name as string)
  const activeMenu: string = (currentRoute.meta?.activeMenu as string) || ''
  selectedKeys.value = activeMenu ? (activeMenu as string) : (currentRoute.name as string)
}
function updateMenu() {
  menus.value = generatorMenu(asyncRouteStore.menus)
  updateSelectedKeys()
}
// 点击菜单
function clickMenuItem(key: string) {
  if (/http(s)?:/.test(key as string))
    window.open(key as string)
  else
    router.push(key)
  emit('clickMenuItem', key)
}
// 展开菜单
function menuExpanded(openKeys: string[]) {
  if (!openKeys)
    return
  const latestOpenKey = openKeys.find(key => !state.openKeys.includes(key))
  const isExistChildren = findChildrenLen(latestOpenKey as string)
  state.openKeys = isExistChildren ? (latestOpenKey ? [latestOpenKey] : []) : openKeys
}
// 查找是否存在子路由
function findChildrenLen(key: string) {
  if (!key)
    return false
  const subRouteChildren: string[] = []
  for (const { children, key } of menus.value) {
    if (children && children.length)
      subRouteChildren.push(key as string)
  }
  return subRouteChildren.includes(key)
}
function isRootRouter(item: RouteRecordRaw) {
  return (
    !item.meta?.alwaysShow && item?.children?.filter((item: any) => !item?.meta?.hidden)?.length === 0
  )
}
function generatorMenu(routerMap: RouteRecordRaw[]) {
  return filterRouter(routerMap).map((item) => {
    const isRoot = isRootRouter(item)
    const info = !isRoot && item.children ? item?.children[0] : item
    const title = t(info.meta?.title as string)
    const currentMenu: any = {
      label: title,
      key: info.path,
      icon: renderIcon(info.meta?.icon),
    }
    // 是否有子菜单，并递归处理
    if (info.children && info.children.length > 0) {
      // Recursion
      currentMenu.children = generatorMenu(info.children)
    }
    return currentMenu
  })
}
function filterRouter(routerMap: RouteRecordRaw[]) {
  return routerMap.filter((item) => {
    return (
      !(item.meta?.hidden) && !['/:all(.*)', '/:path(.*)*', '/', PageEnum.REDIRECT, PageEnum.BASE_LOGIN].includes(item.path)
    )
  })
}
onMounted(() => {
  updateMenu()
})
</script>

<template>
  <n-menu
    :options="menus"
    :inverted="isDark"
    :mode="props.mode"
    :collapsed="props.collapsed"
    :collapsed-width="64"
    :collapsed-icon-size="20"
    :indent="24"
    :expanded-keys="state.openKeys"
    :value="getSelectedKeys"
    @update:value="clickMenuItem"
    @update:expanded-keys="menuExpanded"
  />
</template>
