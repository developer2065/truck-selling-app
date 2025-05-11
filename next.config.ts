const path = require('path');

module.exports = {
  i18n: {
    locales: ['fa', 'ar', 'en'],
    defaultLocale: 'fa', 
    localeDetection: false, 
  },

  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname); 
    return config;
  },
};
