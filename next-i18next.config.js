/** @type {import('next-i18next').UserConfig} */
const nextI18NextConfig = {
  i18n: {
    defaultLocale: 'fa',
    locales: ['fa', 'ar', 'en'],
    localeDetection: true,
  },
  localePath: './public/locales',
  reloadOnPrerender: true,
};

module.exports = nextI18NextConfig;
