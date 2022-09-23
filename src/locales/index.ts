import { createI18n } from 'vue-i18n'
import { default as en } from './en.json'
import { default as es } from './es.json'
import { default as fr } from './fr.json'

export type MessageSchema = typeof en
export type MessageLangs = 'en' | 'es' | 'fr'

export const messages = { en, es, fr }

export const i18n = createI18n<[MessageSchema], MessageLangs>({
  locale: 'en',
  messages,
  legacy: false,
})
