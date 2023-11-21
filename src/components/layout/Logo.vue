<script setup lang="ts">
defineProps<{
  collapsed: boolean
}>()
</script>

<template>
  <div text-4 class="h-64px flex-center overflow-hidden whitespace-nowrap p-10px leading-64px">
    <div :class="{ 'mr-2': !collapsed }" class="i-my-icon-logo h-32px w-32px dark:fill-#ffffff" />
    <h2 v-show="!collapsed" class="m-0">
      {{ t('app.title.index') }}
    </h2>
  </div>
</template>
