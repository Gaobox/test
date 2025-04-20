
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/styles/global.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const emitter = mitt()

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.config.globalProperties.$emitter = emitter
app.use(router)
app.use(ElementPlus)

app.mount('#app')
