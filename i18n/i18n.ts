import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { i18nOptions } from '@/i18n/settings'

if (!i18next.isInitialized) {
  i18next
    .use(initReactI18next)
    .use(
      resourcesToBackend((lng: string, ns: string) =>
  import(`@/locales/${lng}/${ns}.json`)
)
    )
    .init(i18nOptions)
}

export default i18next
