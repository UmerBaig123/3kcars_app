import { Dimensions } from "react-native";
import { useTranslation } from "react-i18next";
import i18next from "../../languages/i18n.js";
import { t } from "i18next";

export const slotList = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];


export const width = Dimensions.get("window").width;
export const height = Dimensions.get("window").height;
