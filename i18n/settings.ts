export const languages = ['fa', 'ar', 'en'];
export const defaultNS = 'common';

export const i18nOptions = {
  supportedLngs: languages,
  fallbackLng: 'fa',
  ns: [defaultNS],
  defaultNS,
  interpolation: {
    escapeValue: false,
  },
  backend: {
    loadPath: '@/locales/{{lng}}/{{ns}}.json',
  },
};
