<script setup lang="ts">
</script>

<template>
  <div h-screen w-screen flex justify-between>
    <div class="hidden h-full basis-1/2 flex-col items-center justify-center bg-yellow md:flex space-y-10 dark:bg-opacity-0">
      <div class="i-my-icon-logo h-100 w-100 dark:fill-#ffffff" />
      <h1 select-none text-7xl>
        {{ t('login.app_name') }}
      </h1>
      <span class="select-none hover:cursor-pointer active:color-pcp hover:color-pch visited:color-pcs">©长沙芙蓉区码梦网络工作室</span>
    </div>
    <div class="h-full w-200px grow-1 basis-1/2">
      <RouterView />
    </div>
  </div>
</template>
