import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Button
} from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import * as myConstants from "../Utils/Constants";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import i18next from "i18next";

function WalkThroughPage(props) {
  useEffect(()=>{
    AsyncStorage.getItem("Language").then((val)=>val===null?"en":i18n.changeLanguage(val))
  },[])
  const navigation = useNavigation();
  const {t,i18n} = useTranslation()
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/walkthrough.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={[styles.textContaine,{paddingLeft:i18n.language=='ar'?0:myConstants.width *0.1,
          paddingRight:i18n.language=='ar'?myConstants.width * 0.1:0,}]}>
        <TouchableOpacity  onPress={()=>{
          if (i18n.language=="en") {
          i18n.changeLanguage("ar")
          AsyncStorage.setItem("Language","ar")
          } else {
          i18n.changeLanguage("en")
          AsyncStorage.setItem("Language","en")}
          }}><Text style={{fontSize: 25,
            paddingLeft:i18n.language=='ar'?myConstants.width * 0.05:0,
            paddingBottom:25,
            fontWeight: "600",
            color: "green",
            textAlign:"left",}}>{t("changelang")}</Text></TouchableOpacity>

          <Text style={[styles.simpleText,{textAlign:i18n.language==="ar"?"right":"left"}]}>{t("Exclusive")}</Text>

          <Text style={{
            color: "#14a651",
            fontFamily: "Helvetica-Bold",
            fontSize:i18n.language==="en"?45:35,
            lineHeight: 45,
            textAlign:i18n.language==="ar"?"right":"left"
          }}>{t("TyreLube")} </Text>

          <Text style={styles.simpleText}>{t("Services")}</Text>

        </View>

        <TouchableHighlight
          style={styles.submit}
          onPress={() => {
            navigation.navigate("Home");
          }}
          underlayColor="#fff"
        >

          <View style={styles.buttonContainer}>

            <Text style={styles.submitText}>{t("ExploreServices")}</Text>

            <Icon
              name="arrow-right"
              size={30}
              paddingTop={3}
              color="white"
              type="entypo"
            />

          </View>

        </TouchableHighlight>

      </ImageBackground>

    </View>
  );
}

export default WalkThroughPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContaine: {
    paddingTop: myConstants.height * 0.57,
    paddingLeft: myConstants.width * 0.1,
    paddingBottom: myConstants.width * 0.03,
    // lineHeight: 20,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  simpleText: {
    color: "black",
    fontFamily: "Helvetica-light",
    lineHeight: 45,
    fontSize: 42,
  },

  buttonContainer: {
    flexWrap: "wrap",
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  submit: {
    marginRight: myConstants.width * 0.08,
    marginLeft: myConstants.width * 0.08,
    marginTop: myConstants.width * 0.05,

    borderRadius: 10,
    paddingTop: myConstants.height * 0.025,
    paddingBottom: myConstants.height * 0.065,
    backgroundColor: "#14a651",
    borderColor: "#fff",
  },
  submitText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "500",
    fontSize: 23,
    width: "70%",
  },
});
