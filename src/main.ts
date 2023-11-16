import { createApp } from 'vue'
import type { VueApp } from './types'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const app = createApp(App)

// install all modules under `modules/`
Object.values(import.meta.glob<{ install: VueApp }>('./modules/*.ts', { eager: true }))
  .forEach(i => i.install?.(app))

app.mount('#app')
