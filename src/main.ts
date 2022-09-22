import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import 'virtual:windi.css'

import { useUiStore, darkModeKey } from './store/ui'
import App from './App.vue'

import messages from './localizations'

const app = createApp(App)
const pinia = createPinia()
const i18n = createI18n({
  locale: 'en',
  messages,
  legacy: false,
})

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
