import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import sr from './sr.json'
import en from './en.json'

i18n
    .use(LanguageDetector) // Automatski detektuje jezik browser-a
    .use(initReactI18next) // Povezuje i18next sa React-om
    .init({
        resources: {
            sr: { translation: sr },
            en: { translation: en },
        },
        fallbackLng: 'sr', // Ako jezik nije prepoznat, koristi srpski
        supportedLngs: ['sr', 'en'],
        interpolation: {
            escapeValue: false, // React već štiti od XSS
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'], // Pamti izbor korisnika
        },
    })

export default i18n