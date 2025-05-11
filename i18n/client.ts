'use client';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import { getOptions } from './settings';

const runsOnServerSide = typeof window === 'undefined';

if (!runsOnServerSide && !i18next.isInitialized) {
  i18next
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      ...getOptions(),
      detection: {
        order: ['path', 'cookie', 'htmlTag'],
      },
      backend: {
        loadPath: '@/locales/{{lng}}/{{ns}}.json',
      },
    });
}

export default i18next;
