import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en_US from './static/locales/en_US.json'
import nb_NO from './static/locales/nb_NO.json'
import nb_NN from './static/locales/nn_NO.json'

const resources = {
  en_US,
  nb_NO,
  nb_NN,
}

i18n
  .use(initReactI18next)
  .init({
    resources: resources,
    lng: "nb_NB",
    fallbackLng: "en_US",
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
