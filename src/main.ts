import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import 'virtual:windi.css'
import { useUiStore, darkModeKey } from './store/ui'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')

const uiStore = useUiStore(pinia)

if (
  (!localStorage[darkModeKey] &&
    window.matchMedia('(prefers-color-scheme: dark)').matches) ||
  localStorage[darkModeKey] === '1'
) {
  uiStore.setDarkMode(true)
}
