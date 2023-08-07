import { t } from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { Icon } from "react-native-elements";
import * as myConstants from "../Utils/Constants";

function ThankyouScreen({ route, navigation }) {
  const {t,i18n}= useTranslation()
  return (
    <View style={styles.container}>
      <Icon
        name="check"
        size={150}
        paddingTop={2.7}
        color={"#14a651"}
        type="entypo"
      />
      <Text style={styles.headingText}>{t("Congratulations")}</Text>
      <Text style={[styles.simpleText,{fontSize:i18n.language==="ar"?23:25}]}>
        {t("submitedsuccess")}
      </Text>
      <TouchableHighlight
        style={styles.submit}
        onPress={() => {
          navigation.navigate("Home");
        }}
        underlayColor="#fff"
      >
        <Text style={styles.submitText}>{t("Back to Home")}</Text>
      </TouchableHighlight>
    </View>
  );
}

export default ThankyouScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  headingText: {
    color: "#14a651",
    fontFamily: "Helvetica-Bold",
    fontSize: 35,
    fontWeight: "700",
  },

  simpleText: {
    color: "black",
    fontFamily: "Helvetica-light",
    textAlign: "center",
  },
  submit: {
    marginTop: myConstants.width * 0.3,

    borderRadius: 10,
    padding: myConstants.height * 0.02,
    backgroundColor: "#14a651",
    borderColor: "#fff",
  },
  submitText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "500",
    fontSize: 20,
    width: "70%",
  },
});
