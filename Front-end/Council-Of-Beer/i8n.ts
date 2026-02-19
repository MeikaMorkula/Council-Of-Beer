import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en-EN/translations.json"
import fi from "./locales/fi-FI/translations.json"

const resources = {
    en: {translation: en},
    fi: {translation: fi}
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;