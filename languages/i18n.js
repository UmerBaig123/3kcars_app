import i18next, { changeLanguage } from "i18next";
import english from './english.json'
import arabic from './arabic.json'
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

i18next.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng:"en",
    resources:{
        en:english,
        ar:arabic
    },
    react: {
        useSuspense:false
    }
})
export default i18next
