import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { i18n } from './locales'

import 'virtual:windi.css'

import { useUiStore, darkModeKey } from './store/ui'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(i18n)
app.mount('#app')

const uiStore = useUiStore(pinia)

if (
  (!localStorage[darkModeKey] &&
    window.matchMedia('(prefers-color-scheme: dark)').matches) ||
  localStorage[darkModeKey] === '1'
) {
  uiStore.setDarkMode(true)
}
