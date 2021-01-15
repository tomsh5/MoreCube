import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import common_en from "./translations/en/common.json";
import common_he from "./translations/he/common.json";

i18n
  .use(initReactI18next) 
  .init({
    interpolation: { escapeValue: false },
    lng: "en",
    resources: {
        en: {
            common: common_en               
        },
        he: {
            common: common_he
        }
        },
  });

  export default i18n;