<script setup lang="ts">
const collapsed = ref<boolean>(false)
const fixedMulti = ref<boolean>(false)
const isMultiTabs = ref<boolean>(false)
const leftMenuWidth = computed(() => {
  return collapsed.value ? 64 : 200
})
</script>

<template>
  <n-layout position="absolute" has-sider>
    <n-layout-sider
      show-trigger="bar"
      position="absolute"
      :collapsed="collapsed"
      collapse-mode="width"
      :collapsed-width="64"
      :width="leftMenuWidth"
      :native-scrollbar="false"
      :inverted="isDark"
      class="layout-sider"
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <Logo :collapsed="collapsed" />
      <AsideMenu v-model:collapsed="collapsed" location="left" />
    </n-layout-sider>
    <n-layout :inverted="isDark">
      <!-- <n-layout-header :inverted="getHeaderInverted" :position="fixedHeader">
        <PageHeader v-model:collapsed="collapsed" :inverted="inverted" />
      </n-layout-header> -->
      <n-layout-content class="layout-content" :class="{ 'layout-default-background': isDark === false }">
        <div class="layout-content-main" :class="{ 'layout-content-main-fix': fixedMulti }">
          <!-- <TabsView v-model:collapsed="collapsed" /> -->
          <div :class="{ 'main-view-fix': fixedMulti, 'noMultiTabs': !isMultiTabs, 'mt-3': !isMultiTabs }" class="main-view">
            <MainView />
          </div>
        </div>
      </n-layout-content>
      <n-back-top :right="100" />
    </n-layout>
  </n-layout>
</template>

<style>
.layout-side-drawer {
  background-color: rgb(0, 20, 40);
}
.layout-sider {
  min-height: 100vh;
  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
  position: relative;
  z-index: 13;
  transition: all 0.2s ease-in-out;
}
</style>

<style scoped>
.layout {
  display: flex;
  flex-direction: row;
  flex: auto;
}
.layout-default-background {
  background: #f5f7f9;
}
.layout-sider {
  min-height: 100vh;
  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
  position: relative;
  z-index: 13;
  transition: all 0.2s ease-in-out;
}

.layout-sider-fix {
  position: fixed;
  top: 0;
  left: 0;
}

.ant-layout {
  overflow: hidden;
}
.layout-right-fix {
  overflow-x: hidden;
  padding-left: 200px;
  min-height: 100vh;
  transition: all 0.2s ease-in-out;
}
.layout-content {
  flex: auto;
  min-height: 100vh;
}
.n-layout-header.n-layout-header--absolute-positioned {
  z-index: 11;
}
.n-layout-footer {
  background: none;
}

.layout-content-main {
  margin: 0 10px 10px;
  position: relative;
  padding-top: 64px;
}

.layout-content-main-fix {
  padding-top: 64px;
}

.fluid-header {
  padding-top: 0;
}

.main-view-fix {
  padding-top: 44px;
}

.noMultiTabs {
  padding-top: 0;
}
</style>
