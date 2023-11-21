<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { RouteLocationMatched } from 'vue-router/auto'

defineProps<{
  collapsed: boolean
}>()
defineEmits(['update:collapsed'])
const themeStore = useThemeStore()
const { isMobile, menuMode, showReload, crumbsShow } = storeToRefs(themeStore)
const { username } = useUserStore()
const router = useRouter()
const route = useRoute()

const avatarOptions = ref()
const generator: any = (routerMap: RouteLocationMatched[]) => {
  return routerMap.map((item) => {
    const currentMenu: any = {
      label: item.meta.title,
      key: item.name,
      disabled: item.path === '/',
    }
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentMenu.children = generator(item.children, currentMenu)
    }
    return currentMenu
  })
}
const breadcrumbList = computed(() => generator(route.matched.filter(item => item.name !== undefined)))
function dropdownSelect(key: any) {
  router.push({ name: key })
}
function reloadPage() {
}
function toggleFullScreen() {
}
function openSetting() {
}
function avatarSelect() {
}
</script>

<template>
  <div class="z-11 h-16 w-full flex items-center justify-between p-0 shadow transition-all duration-200 ease-in-out">
    <!-- 顶部菜单 -->
    <div v-if="menuMode === 'horizontal' || menuMode === 'horizontal-mix'" class="flex items-center color-#515a6e">
      <div v-if="menuMode === 'horizontal'" class="lending-16 h-16 flex-center overflow-hidden whitespace-nowrap pl-2">
        <div class="i-my-icon-logo mr-10px h-16 w-16 dark:fill-#ffffff" />
        <h2 v-show="!collapsed" class="mb-0">
          {{ t('app.title.short') }}
        </h2>
      </div>
      <AsideMenu :collapsed="collapsed" location="header" :inverted="isDark" mode="horizontal" />
    </div>
    <!-- 左侧菜单 -->
    <div v-else class="flex items-center color-#515a6e">
      <!-- 菜单收起 -->
      <div class="ml-1 inline-block h-16 w-14 w-auto cursor-pointer px-3 py-0 text-center transition-all duration-200 ease-in-out" @click="$emit('update:collapsed', !collapsed)">
        <div class="h-16 text-4 font-bold" :class="[collapsed ? 'i-ant-design:menu-fold-outlined' : 'i-ant-design:menu-unfold-outlined']" />
      </div>
      <!-- 刷新 -->
      <div v-if="showReload" class="ml-1 inline-block h-16 w-14 w-auto cursor-pointer px-3 py-0 text-center transition-all duration-200 ease-in-out" @click="reloadPage">
        <div class="i-ant-design:reload-outlined h-16 text-4 font-bold" />
      </div>
      <!-- 面包屑 -->
      <n-breadcrumb v-if="crumbsShow" class="inline-block">
        <template v-for="routeItem in breadcrumbList" :key="routeItem.path === 'redirect' ? void 0 : routeItem.path">
          <n-breadcrumb-item v-if="routeItem.label" class="h-16 leading-16">
            <n-dropdown v-if="routeItem.children && routeItem.children.length" :options="routeItem.children" @select="dropdownSelect">
              <span class="link-text">
                <div v-if="crumbsShow && routeItem.icon" :class="[routeItem.meta.icon]" />
                {{ routeItem.title }}
              </span>
            </n-dropdown>
            <span v-else class="link-text">
              <div v-if="crumbsShow && routeItem.icon" :class="[routeItem.icon]" />
              {{ t(routeItem.label) }}
            </span>
          </n-breadcrumb-item>
        </template>
      </n-breadcrumb>
    </div>
    <div :class="{ 'mr-20px': !isMobile }" class="flex-center">
      <!-- 切换全屏 -->
      <div v-show="!isMobile" class="inline-block h-16 w-auto cursor-pointer px-12px py-0 text-center leading-16 transition-all duration-200 ease-in-out">
        <n-tooltip placement="bottom">
          <template #trigger>
            <div class="i-ant-design:fullscreen-outlined h-16" @click="toggleFullScreen" />
          </template>
          <span>全屏</span>
        </n-tooltip>
      </div>
      <!-- 个人中心 -->
      <div class="inline-block h-16 w-auto cursor-pointer px-12px py-0 text-center transition-all duration-200 ease-in-out">
        <n-dropdown trigger="hover" :options="avatarOptions" @select="avatarSelect">
          <div class="h-16 flex items-center">
            <n-avatar class="h-6 w-6" round>
              {{ username }}
              <div class="i-ant-design:user-outlined" />
            </n-avatar>
          </div>
        </n-dropdown>
      </div>
      <!-- 设置 -->
      <div class="inline-block h-16 w-auto cursor-pointer px-12px py-0 text-center transition-all duration-200 ease-in-out" @click="openSetting">
        <n-tooltip placement="bottom-end">
          <template #trigger>
            <div class="i-ant-design:setting-outlined h-16 text-size-4 font-bold" />
          </template>
          <span>项目配置</span>
        </n-tooltip>
      </div>
    </div>
  </div>
</template>
