<script setup lang="ts">
import type { Size } from 'naive-ui/es/form/src/interface'
import { toggleLocales } from '~/modules/i18n'

const isZh = computed(() => useI18n().locale.value === 'zh-CN')
const formRef = ref(null)
const formValue = ref({
  username: '',
  password: '',
})
const rules = ref({
  username: {},
  password: {},
})
const { userLogin, setToken } = useUserStore()
const router = useRouter()

function login() {
  const { isFinished } = userLogin()
  watch(isFinished, () => {
    if (isFinished) {
      setToken('123')
      router.push('/')
    }
  })
}
</script>

<template>
  <div class="h-full flex flex-col items-center justify-center text-left space-y-10">
    <!-- login card -->
    <n-card class="max-w-150 w-80% shadow-current shadow-sm">
      <template #header>
        <n-h1 prefix="bar" class="text-6">
          {{ `${t('login.login')} ${t('login.app_name')}` }}
        </n-h1>
      </template>
      <n-form
        ref="formRef"
        inline
        label-placement="left"
        :label-width="90"
        :model="formValue"
        :rules="rules"
        :size="'large' as Size"
      >
        <n-grid :cols="24">
          <n-form-item-gi span="24" :label="t('login.userinput.label')" path="username">
            <n-input v-model:value="formValue.username" autofocus :placeholder="t('login.userinput.placeholder')" />
          </n-form-item-gi>
          <n-form-item-gi span="24" :label="t('login.passwordinput.label')" path="password">
            <n-input v-model:value="formValue.password" :placeholder="t('login.passwordinput.placeholder')" />
          </n-form-item-gi>
          <n-gi span="24">
            <n-button class="w-full" type="primary" @click="login">
              {{ t('login.login') }}
            </n-button>
          </n-gi>
          <n-gi class="mt-4 flex justify-between text-6" span="24">
            <button icon-btn @click="toggleDark">
              <div i-carbon-sun dark:i-carbon-moon />
            </button>
            <button icon-btn :class="[isZh ? '' : 'rotate-180']" @click="toggleLocales()">
              <div i-carbon-ibm-watson-language-translator />
            </button>
          </n-gi>
        </n-grid>
      </n-form>
    </n-card>
  </div>
</template>

<route lang="yaml">
meta:
  skip_auth: true
  layout: login
  title: app.title.home
</route>
