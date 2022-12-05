import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en_US from './static/locales/en_US.json'
import nb_NO from './static/locales/nb_NO.json'
import nn_NO from './static/locales/nn_NO.json'

const resources = {
  en_US,
  nb_NO,
  nn_NO,
}

i18n
  .use(initReactI18next)
  .init({
    resources: resources,
    lng: "nb_NO",
    fallbackLng: "en_US",
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
