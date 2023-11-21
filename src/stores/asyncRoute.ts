import { defineStore } from 'pinia'
import { createGetRoutes } from 'virtual:meta-layouts'

export const useAsyncRouteStore = defineStore('async-route', () => {
  const menus = computed(() => createGetRoutes(useRouter())())
  const isDynamicRouteAdded = ref(false)
  const keepAliveComponents = ref<string[]>([])

  function setDynamicRouteAdded(added: boolean) {
    isDynamicRouteAdded.value = added
  }
  function setKeepAliveComponents(compNames: string[]) {
    keepAliveComponents.value = compNames
  }
  return {
    menus,
    isDynamicRouteAdded,
    keepAliveComponents,
    setDynamicRouteAdded,
    setKeepAliveComponents,
  }
})
