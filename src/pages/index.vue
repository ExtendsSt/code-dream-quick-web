<script setup lang="ts" generic="T extends any, O extends any">
defineOptions({
  name: 'IndexPage',
})

const name = ref('')
const { t } = useI18n()
const router = useRouter()
function go() {
  if (name.value)
    router.push(`/hi/${encodeURIComponent(name.value)}`)
}
</script>

<template>
  <div>
    <div i-carbon-campsite inline-block text-4xl />
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse-lite" target="_blank">
        {{ t('app.title.index') }}
      </a>
    </p>
    <p>
      <em text-sm op75>{{ t('intro.desc') }} </em>
    </p>

    <div py-4 />

    <TheInput
      v-model="name"
      placeholder="What's your name?"
      autocomplete="false"
      @keydown.enter="go"
    />

    <div>
      <button
        class="m-3 text-sm btn"
        :disabled="!name"
        @click="go"
      >
        Go
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  title: 帅哥
  description: Vite Starter Template
  requiresAuth: false
</route>
