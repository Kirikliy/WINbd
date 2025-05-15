import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { DEFAULT_OPTIONS } from './consts';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    ...DEFAULT_OPTIONS,
  });

export default i18n;
