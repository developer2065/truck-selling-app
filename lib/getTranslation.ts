import i18next from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next';
import { languages } from '@/i18n/settings';

const initI18next = async (lng: string, ns: string = 'common') => {

  if (!languages.includes(lng)) lng = 'fa';


  await i18next
    .use(initReactI18next)
    .use(
      resourcesToBackend((language, namespace) => 
        import(`/locales/${language}/${namespace}.json`)
      )
    )
    .init({
      lng :
      'fa',
      fallbackLng: 'fa',
      ns: [ns],
      defaultNS: ns,
      supportedLngs: languages,
      interpolation: {
        escapeValue: false,
      },
    });

  return i18next;
};

export const getTranslation = async (lng: string, ns: string = 'common') => {
  const i18n = await initI18next(lng, ns);
  return {
    t: i18n.getFixedT(lng, ns),
  };
};
