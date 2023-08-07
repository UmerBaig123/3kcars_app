import React, { useState } from "react";
import { ImageBackground, StyleSheet,Image, Text, View,TouchableOpacity } from "react-native";
import ServicesList from "../components/servicesList";
import ToggleSwitch from "toggle-switch-react-native";
import * as myConstants from "../Utils/Constants";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";


const HomeScreen = () => {
  const [show, setShow] = useState(false);
  const {t,i18n} = useTranslation()
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/homescreenBg.png")}
        resizeMode="cover"
        style={styles.image}
        >
        <Text style={styles.headingText}>{t("3kservice")}</Text>

        <View style={styles.serviceContainer}>
        <View style={{flexDirection: "row", marginTop: myConstants.height * 0.02}}>
          <TouchableOpacity  onPress={()=>{
          if (i18n.language=="en") {
          i18n.changeLanguage("ar")
          AsyncStorage.setItem("Language","ar")
          } else {
          i18n.changeLanguage("en")
          AsyncStorage.setItem("Language","en")}
          }}><Text style={styles.langText}>{t("changelang")}</Text></TouchableOpacity>
          <View style={{flexDirection:"column",
        }}>
          <Image
          style={{width:70,height:50,
            marginLeft: i18n.language==="ar"? myConstants.width * 0.43:myConstants.width * 0.47,
            marginTop:-20,
          }}
        source={require('../../assets/van-icon.png')}
      />
      <ToggleSwitch
            isOn={show}
            label={t("homeservice")}
            onColor="#14A650"
            style={{
              marginTop:-15,
              flexDirection: "row",
              justifyContent: "flex-end",
              marginLeft: i18n.language==="ar"? myConstants.width * 0.362:myConstants.width * 0.36,
              transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
            }}
            offColor="#EAEAEA"
            labelStyle={{
              color: "black",
              fontSize: 20,
              margin: 5,
              fontFamily: "Helvetica",
            }}
            size="large"
            onToggle={(isOn) => setShow(isOn)}
          />
         
          </View>
          
          </View>
          <ServicesList isMobile={show} />
        </View>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headingText: {
    fontSize: 25,
    fontWeight: "600",
    color: "white",
    paddingTop: 90,
    textAlign: "center",
  },
  image: {
    flex: 1,
  },
  simpletext: {
    fontSize: 20,
    margin: 20,
    textAlign: "right",
  },
  serviceContainer: {
    backgroundColor: "white",
    width: myConstants.width * 1,
    height: myConstants.height * 0.9,
    borderRadius: 40,
    justifyContent: "center",
    alignContent: "center",
    marginTop: myConstants.height * 0.05,
  },
  langText:{
    fontSize: 20,
    fontWeight: "600",
    color: "green",
    marginLeft:20,
    marginTop:20,
    justifyContent: "flex-start",
  },
});
