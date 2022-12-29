import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector';

import en_US from './static/locales/en_US.json'
import nb_NO from './static/locales/nb_NO.json'
import nn_NO from './static/locales/nn_NO.json'

const resources = {
  nb_NO,
  nn_NO,
  en_US,
}

export const availableLanguages = Object.keys(resources)

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: resources,
    fallbackLng: availableLanguages[0] ?? 'nb_NO',
    supportedLngs: availableLanguages,
    nonExplicitSupportedLngs: true,
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
