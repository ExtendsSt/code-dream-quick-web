<script setup lang="ts" generic="T extends any, O extends any">
defineOptions({
  name: 'IndexPage',
})

const { t } = useI18n()
const { userLogout } = useUserStore()
const router = useRouter()

function go() {
  userLogout()
  router.push('/login')
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
    <div>
      <button
        class="m-3 text-sm btn"
        @click="go"
      >
        Go
      </button>
    </div>
  </div>
</template>

<route lang="json">
{
  "meta": {
    "title": "app.title.home"
  }
}
</route>
