<script setup lang="ts">
defineProps<{
  collapsed: boolean
}>()
const name = ref(1)
const panels = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
</script>

<template>
  <div class="flex flex-row">
    <n-tabs
      v-model:value="name"
      type="card"
      closable
      tab-style="min-width: 80px;"
    >
      <n-tab
        v-for="panel in panels"
        :key="panel"
        :name="panel"
      >
        {{ panel }}
      </n-tab>
    </n-tabs>
  </div>
</template>
