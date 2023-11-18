import { createI18n } from 'vue-i18n'
import type { Locale } from 'vue-i18n'
import type { VueApp } from '~/types'

const localesMap = Object.fromEntries(Object.entries(import.meta.glob('../../locales/*.yml')).map(([path, loadLocale]) => [path.match(/([\w-]*)\.yml$/)?.[1], loadLocale])) as Record<Locale, () => Promise<{ default: Record<string, string> }>>
const loadedLanguages: string[] = []
const availableLocales = Object.keys(localesMap)
export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: '',
  messages: {},
})
export async function loadLanguageAsync(lang: string): Promise<Locale> {
  if (i18n.global.locale.value === lang)
    return setI18nLanguage(lang)
  if (loadedLanguages.includes(lang))
    return setI18nLanguage(lang)
  const messages = await localesMap[lang]()
  i18n.global.setLocaleMessage(lang, messages.default)
  loadedLanguages.push(lang)
  return setI18nLanguage(lang)
}
export async function toggleLocales() {
  const locale = i18n.global.locale
  const locales = availableLocales
  const newLocale = locales[(locales.indexOf(locale.value) + 1) % locales.length]
  await loadLanguageAsync(newLocale)
  locale.value = newLocale
}
// Setup Vue-i18n 国际化插件
// https://vue-i18n.intlify.dev
export const setupI18n: VueApp = (app) => {
  app.use(i18n)
  loadLanguageAsync('zh-CN')
}

function setI18nLanguage(lang: Locale) {
  i18n.global.locale.value = lang as any
  if (typeof document !== 'undefined')
    document.querySelector('html')?.setAttribute('lang', lang)
  return lang
}
