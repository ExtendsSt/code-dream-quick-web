<script setup lang="ts">
import { darkTheme } from 'naive-ui'

const router = useRouter()
watchEffect(() => {
  const title = router.currentRoute.value.meta.title as string ?? ''
  useHead({
    title: `${title === '' ? '' : t(title)} | ${t('app.title.index')}`,
  })
})
</script>

<template>
  <n-config-provider :theme="isDark ? darkTheme : null">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </n-config-provider>
</template>
