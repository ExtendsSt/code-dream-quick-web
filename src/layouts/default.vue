<script setup lang="ts">
import { storeToRefs } from 'pinia'

const themeStore = useThemeStore()
const { mobileWidth, menuWidth, minMenuWidth, setIsMobile } = useThemeStore()
const { menuMode, isMobile, tabsFixed, tabsShow, headerFixed, menuFixed } = storeToRefs(themeStore)
const menuCollapsed = ref<boolean>(false)
const leftMenuWidth = computed(() => menuCollapsed.value ? minMenuWidth : menuWidth)
const showSideDrawer = computed({
  get: () => isMobile.value && menuCollapsed.value,
  set: val => (menuCollapsed.value = val),
})
// 判断是否触发移动端模式
function watchWidth() {
  setIsMobile(document.body.clientWidth <= mobileWidth)
  menuCollapsed.value = false
}

onMounted(() => {
  window.addEventListener('resize', watchWidth)
  watchWidth()
})
</script>

<template>
  <n-layout position="absolute" has-sider class="bg-#000000">
    <n-layout-sider
      v-if="!isMobile && (menuMode === 'vertical' || menuMode === 'horizontal-mix')"
      show-trigger="bar"
      :collapsed="menuCollapsed"
      collapse-mode="width"
      :collapsed-width="64"
      :width="leftMenuWidth"
      :native-scrollbar="false"
      :inverted="isDark"
      class="relative z-13 h-screen shadow transition-all duration-200 ease-in-out"
      @collapse="menuCollapsed = true"
      @expand="menuCollapsed = false"
    >
      <Logo :collapsed="menuCollapsed" />
      <AsideMenu v-model:collapsed="menuCollapsed" location="left" />
    </n-layout-sider>
    <n-drawer v-model:show="showSideDrawer" :width="menuWidth" placement="left" class="bg-#001428">
      <n-layout-sider :position="menuFixed ? 'absolute' : 'static'" :collapsed="false" :width="menuWidth" :native-scrollbar="false" :inverted="isDark" class="layout-sider">
        <Logo :collapsed="false" />
        <AsideMenu />
      </n-layout-sider>
    </n-drawer>
    <n-layout class="bg-gray-800" :inverted="isDark">
      <n-layout-header class="z-11" :inverted="isDark" :position="headerFixed ? 'absolute' : 'static'">
        <PageHeader v-model:collapsed="menuCollapsed" :inverted="isDark" />
      </n-layout-header>
      <div class="relative">
        <n-layout-content position="absolute" class="min-h-100vh flex-auto" :native-scrollbar="false">
          <div class="mx-10px mb-10px mt-0" :class="{ 'pt-16': tabsFixed, 'pt-0': !headerFixed }">
            <TabsView v-if="tabsShow" v-model:collapsed="menuCollapsed" />
            <div :class="{ 'mt-44px': tabsFixed, 'noMultiTabs': !tabsShow, 'mt-3': !tabsShow }">
              <MainView />
            </div>
          </div>
        </n-layout-content>
      </div>
      <n-back-top :visibility-height="30" class=":right-50% z-100 bg-gray-100" :right="100" />
      <div>test</div>
    </n-layout>
  </n-layout>
</template>
