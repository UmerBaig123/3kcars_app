import React, { useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  TouchableHighlight,
} from "react-native";
import { LocaleConfig } from "react-native-calendars";
import { Calendar } from "react-native-calendars";
import * as myConstants from "../Utils/Constants";
import RBSheet from "react-native-raw-bottom-sheet";
import { useTranslation } from "react-i18next";
import { reloadAsync } from "expo-updates";

function SelectDateAndTime({ route, navigation }) {
  const {t,i18n} = useTranslation()
  const { indexOfList } = route.params;
  const refRBSheet = useRef();
  const [selectedSlot, setSelectedSlot] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
 
  const [markDate, setMarkDate] = useState({});
  const monthname=[
  t("january"),
  t("february"),
  t("march"),
  t("april"),
  t("may"),
  t("june"),
  t("july"),
  t("august"),
  t("september"),
  t("october"),
  t("november"),
  t("december"),]
  LocaleConfig.locales['arm'] = {
    monthNames: monthname,
    monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    dayNames: [t("sunday"), t("monday"), t("tuesday"), t("wednesday"), t("thursday"), t("friday"), t("saturday")],
    dayNamesShort: [t("sunday"), t("monday"), t("tuesday"), t("wednesday"), t("thursday"), t("friday"), t("saturday")],
    today: "اليوم"
  };
  LocaleConfig.defaultLocale="arm"
  const [monthno, setnumber] = useState(new Date().getMonth());
  //same serviceitem const as in servicelist.js due to multilanguage rendering
  const serviceItems = [
    {
      name: t("Oil Change"),
      mobileBranch: true,
      iconUrl: require("../../assets/icons/OilChangewithFilter.png"),
    },
    {
      name: t("Tire Change"),
      mobileBranch: true,
      iconUrl: require("../../assets/icons/TireChange.png"),
    },
    {
      name: t("Engine Flushing"),
      mobileBranch: false,
      iconUrl: require("../../assets/icons/EngineFlushing.png"),
    },
    {
      name: t("Engine Degreasing"),
      mobileBranch: false,
      iconUrl: require("../../assets/icons/EngineDegreasing.png"),
    },
    {
      name: t("Wheel Balancing"),
      mobileBranch: true,
      iconUrl: require("../../assets/icons/WheelBalancing.png"),
    },
    {
      name: t("Wheel Rotation"),
      mobileBranch: false,
      iconUrl: require("../../assets/icons/WheelRotation.png"),
    },
    {
      name: t("Wheel Alignment"),
      mobileBranch: false,
      iconUrl: require("../../assets/icons/WheelAlignment.png"),
    },
    {
      name: t("Caster & Camber"),
      mobileBranch: false,
      iconUrl: require("../../assets/icons/CasterCamber.png"),
    },
    {
      name: t("Break Pads"),
      mobileBranch: false,
      iconUrl: require("../../assets/icons/Breakpad.png"),
    },
    {
      name: t("Induction Cleaning"),
      mobileBranch: false,
      iconUrl: require("../../assets/icons/Injectorcleaningservice.png"),
    },
    {
      name: t("Evaporator cleaning"),
      mobileBranch: false,
      iconUrl: require("../../assets/icons/Evaporatorcleaning.png"),
    },
    {
      name: t("Battery change"),
      mobileBranch: true,
      iconUrl: require("../../assets/icons/Batterychange.png"),
    },
    {
      name: t("A/C filter"),
      mobileBranch: false,
      iconUrl: require("../../assets/icons/A_Cfilter.png"),
    },
    {
      name: t("Air filter"),
      mobileBranch: false,
      iconUrl: require("../../assets/icons/Airfilter.png"),
    },
  ];

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/homescreenBg.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.headingContainer}>
          <TouchableHighlight
            underlayColor={"none"}
            activeOpacity={1}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image
              source={require("../../assets/backarrow.png")}
              style={{
                width: myConstants.width * 0.12,
                height: myConstants.height * 0.06,
                marginTop: myConstants.width * 0.205,
                marginRight: myConstants.width * 0.03,
              }}
            />
          </TouchableHighlight>
          <Text style={styles.headingText}>
            {serviceItems[indexOfList].name}
          </Text>
        </View>
        <View style={styles.serviceContainer}>
          <Text></Text>
          <Calendar
          //placing the language switch inside calendar header so that it re-renders when language is changed
            customHeaderTitle={
              <View style={{
                marginTop:-10
              }}> 
              <TouchableOpacity  onPress={()=>{
                if (i18n.language=="en") {
                i18n.changeLanguage("ar")
                AsyncStorage.setItem("Language","ar")
                } else {
                i18n.changeLanguage("en")
                AsyncStorage.setItem("Language","en")}
                }}><Text style={{fontSize: 25,
                  fontWeight: "600",
                  color: "green",
                  marginLeft:-100,
                  textAlign:"left",}}>{t("changelang")}</Text></TouchableOpacity>
                  <Text style={styles.textTitle}>{t("pickDT")}</Text>
                  <View style={styles.underLine}></View>
            <Text style={{
              marginBottom:30,
              fontSize:25,
              textAlign:"center"
            }}>{monthname[monthno]}</Text></View>
          }
          headerStyle={{
            paddingLeft:-10,
            paddingRight:10,
            width:myConstants.width,
          }}
            markedDates={markDate}
            onDayPress={(day) => {
              console.log("selected day", day);

              setSelectedDate(day.dateString);

              setMarkDate({ 
                [day.dateString]: {
                  selected: true,
                  selectedColor: "#14A650",
                  selectedTextColor: "white",
                },
              }),
                console.log(markDate);
              refRBSheet.current.open();
            }}
            hideExtraDays={true}
            onMonthChange={(month) => {
              setnumber(month['month']-1)
              console.log("month changed", month);
            }}
            theme={{
              backgroundColor: "white",
              calendarBackground: "white",
              textSectionTitleColor: "grey",
              todayTextColor: "green",
              arrowColor: "black",
              selectedDayTextColor: "green",
              arrowStyle:{
                paddingTop:100,
              },

              disabledArrowColor: "black",
              textDayFontWeight: "300",
              textMonthFontWeight: "bold",
              textDayHeaderFontWeight: "200",
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16,
            }}
          />
          {/* BottomSheet */}
          <RBSheet
            ref={refRBSheet}
            animationType={"fade"}
            height={250}
            openDuration={250}
            customStyles={{
              container: {
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
              },
            }}
          >
            <View>
              <Text style={styles.textTitle}>{t("AvailableSlots")}</Text>
              <View style={[styles.underLine,{marginLeft:myConstants.width * 0.4,}]}></View>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {myConstants.slotList.map((key, i) => {
                return (
                  <View key={key} style={{ width: "20%" }}>
                    <View
                      style={{
                        backgroundColor: i == selectedSlot ? "green" : "white",
                        borderRadius: 10,
                        padding: 10,
                        margin: 5,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("FormPage", {
                            indexOfList: indexOfList,
                            selectedDate: selectedDate,
                            selectedTime: myConstants.slotList[i],
                          });

                          refRBSheet.current.close();
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 18,
                            color: "black",
                            color: i == selectedSlot ? "white" : "black",
                            fontWeight: "500",
                          }}
                        >
                          {myConstants.slotList[i]}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          </RBSheet>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  submit: {
    // padding: 20,
    marginTop: myConstants.width * 0.5,
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    borderRadius: 10,
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#14a651",
    borderColor: "#fff",
  },
  submitText: {
    color: "#fff",
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",

    fontWeight: "500",
    fontSize: 20,
  },
  headingContainer: {
    flexWrap: "wrap",
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  headingText: {
    fontSize: 25,
    color: "white",
    fontFamily: "Helvetica-Bold",
    paddingTop: myConstants.height * 0.105,
    textAlign: "center",
  },
  image: {
    flex: 1,
  },

  underLine: {
    backgroundColor: "red",
    width: myConstants.width * 0.18,
    marginLeft:myConstants.width * 0.155,
    height: myConstants.height * 0.003,
    marginBottom: myConstants.height * 0.03,
  },
  serviceContainer: {
    backgroundColor: "white",
    width: myConstants.width * 1,
    height: myConstants.height * 0.9,
    borderRadius: 20,
    marginTop: myConstants.height * 0.2,
  },
  textTitle: {
    color: "#14a651",
    fontFamily: "Helvetica-Bold",
    fontSize: 22,
    textAlign: "center",
    paddingTop: myConstants.height * 0.03,
    paddingBottom: 3,
  },
});
export default SelectDateAndTime;
