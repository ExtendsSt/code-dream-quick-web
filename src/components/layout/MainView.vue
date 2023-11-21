<script setup lang="ts">
defineProps({
  notNeedKey: {
    type: Boolean,
    default: false,
  },
  animate: {
    type: Boolean,
    default: true,
  },
})
const mode = import.meta.env.MODE
const { keepAliveComponents } = useAsyncRouteStore()
</script>

<template>
  <RouterView>
    <template #default="{ Component, route }">
      <!-- 如果是生产环境就启动动画过渡 -->
      <template v-if="mode === 'production'">
        <transition name="zoom-fade" mode="out-in" appear>
          <!-- 如果有需要缓存的组件就使用keep-alive -->
          <keep-alive v-if="keepAliveComponents.length" :include="keepAliveComponents">
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
          <component :is="Component" v-else :key="route.fullPath" />
        </transition>
      </template>
      <template v-else>
        <!-- 如果有需要缓存的组件就使用keep-alive -->
        <keep-alive v-if="keepAliveComponents.length" :include="keepAliveComponents">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
        <component :is="Component" v-else :key="route.fullPath" />
      </template>
    </template>
  </RouterView>
</template>
