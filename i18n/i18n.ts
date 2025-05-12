import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend((language: string, namespace: string) =>
      fetch(`/locales/${language}/${namespace}.json`).then((res) => res.json())
    )
  )
  .init({
    lng: 'fa',
    fallbackLng: 'fa',
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
