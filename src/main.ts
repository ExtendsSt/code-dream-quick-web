import { createApp } from 'vue'
import App from './App.vue'
import { installAll } from '~/modules'
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'

// https://www.naiveui.com/zh-CN/os-theme/docs/style-conflict
const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

// 最后导入uno.css
import('uno.css')

const app = createApp(App)
// 挂载所有模块
installAll(app)

app.mount('#app')
