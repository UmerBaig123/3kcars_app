import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SelectList from 'react-native-dropdown-select-list'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
  TouchableHighlight,
  Alert,
} from "react-native";
import yourSendEmailFunction from "../controller/sendMail";
import * as myConstants from "../Utils/Constants";

function FormPage({ route, navigation }) {
  const {t,i18n}=useTranslation()
  const listData =[
    {key:0,value:t("Manama 3K")},
    {key:1,value:t("3K Mammer")},
    {key:2,value:t("Riffa 3K")},
    {key:3,value:t("Tubli 3k")},
  ]
  const workshopData=[
    ['manama3k_email','manama3k_number'],
    ['mameer3k_email','mameer3k_number'],
    ['riffa3k_email','riffa3k_number'],
    ['tubli3k_email',' tubli3k_number']]
    const serviceItems = [
      {
        name:"Oil Change",
        mobileBranch: true,
      },
      {
        name: "Tire Change",
        mobileBranch: true,
      },
      {
        name: "Engine Flushing",
        mobileBranch: false,
      },
      {
        name: "Engine Degreasing",
        mobileBranch: false,
      },
      {
        name: "Wheel Balancing",
        mobileBranch: true,
      },
      {
        name: "Wheel Rotation",
        mobileBranch: false,
      },
      {
        name: "Wheel Alignment",
        mobileBranch: false,
      },
      {
        name: "Caster & Camber",
        mobileBranch: false,
      },
      {
        name: "Break Pads",
        mobileBranch: false,
      },
      {
        name: "Induction Cleaning",
        mobileBranch: false,
      },
      {
        name: "Evaporator cleaning",
        mobileBranch: false,
      },
      {
        name: "Battery change",
        mobileBranch: true,
      },
      {
        name: "A/C filter",
        mobileBranch: false,
      },
      {
        name: "Air filter",
        mobileBranch: false,
      },
    ];
  const [value, setValue] = useState({
    allFieldsError: "",
    firstName: "",
    firstNameError: "",
    lastName: "",
    lastNameError: "",
    phoneNumber: "",
    phoneNumberError: "",
    carNumber: "",
    carNumberError: "",
    toEmail:"",
    toNumber:"",
  });

  const { indexOfList } = route.params;
  const { selectedDate } = route.params;
  const { selectedTime } = route.params;

  // const { selectedDateTime } = route.params;
  // const { isMobile } = route.params;

  const firstNameValidator = () => {
    if (value.firstName == "") {
      setValue({ ...value, firstNameError: t("EmptyFN") });
    } else {
      setValue({ ...value, firstNameError: "" });
    }
  };
  const lastNameValidator = () => {
    if (value.lastName == "") {
      setValue({ ...value, lastNameError: t("EmptyLN") });
    } else {
      setValue({ ...value, lastNameError: "" });
    }
  };
  const phoneNumberValidator = () => {
    if (value.phoneNumber == "") {
      setValue({ ...value, phoneNumberError: t("EmptyPN") });
    } else {
      setValue({ ...value, phoneNumberError: "" });
    }
  };
  const carNumberValidator = () => {
    if (value.carNumber == "") {
      setValue({ ...value, carNumberError: t("EmptyCY") });
    } else {
      setValue({ ...value, carNumberError: "" });
    }
  };
  const checkAllValidator = () => {
    if (value.carNumber == "") {
      setValue({ ...value, allFieldsError: t("EmptyAll") });
    } else {
      if (value.toEmail=="") {
        setValue({ ...value, allFieldsError: t("selectworkshoperror") });
      }else{
        setValue({ ...value, allFieldsError: "" });
      }
    }
  };

  const showAlert = () =>
    Alert.alert(
      "Congratulations!",
      "You have successfully submited you service request.",
      [
        {
          text: "Back to Home",
          onPress: () => {
            navigation.navigate("Home");
          },
          style: "Home",
        },
      ]
    );

  const onPress = () => {
    setValue({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      carNumber: "",
    });
    if (
      value.firstName != "" &&
      value.lastName != "" &&
      value.phoneNumber != "" &&
      value.carNumber != ""&&
      value.toEmail !=""
    ) {
        yourSendEmailFunction(
          value.firstName,
          value.lastName,
          value.phoneNumber,
          value.carNumber,
          selectedDate,
          selectedTime,
          serviceItems[indexOfList],
          value.toEmail,
          value.toNumber
        );
      
      // showAlert();
      navigation.navigate("ThankyouScreen");
    } else {
      checkAllValidator();
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
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
              {t(serviceItems[indexOfList].name)}
            </Text>
          </View>
          <View style={styles.serviceContainer}>
            <View>
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
            marginLeft:15,
            marginTop:20,
            textAlign:"left",}}>{t("changelang")}</Text></TouchableOpacity>
              <Text style={styles.textTitle}>{t("EnterDetails")}</Text>
              <View style={styles.underLine}></View>
            </View>
            {value.allFieldsError != "" ? (
              <Text style={styles.error}>{value.allFieldsError}</Text>
            ) : (
              <View></View>
            )}
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder={t("Firstname")}
                placeholderTextColor="lightgrey"
                onChangeText={(text) => setValue({ ...value, firstName: text })}
                value={value.firstName}
                onBlur={() => firstNameValidator()}
                autoCompleteType="off"
              />
              {value.firstNameError != "" ? (
                <Text style={styles.error}>{value.firstNameError}</Text>
              ) : (
                <View></View>
              )}
              <TextInput
                style={styles.input}
                placeholder={t("Last Name")}
                placeholderTextColor="lightgrey"
                onChangeText={(text) => setValue({ ...value, lastName: text })}
                value={value.lastName}
                onBlur={() => lastNameValidator()}
                autoCompleteType="off"
              />
              {value.lastNameError != "" ? (
                <Text style={styles.error}>{value.lastNameError}</Text>
              ) : (
                <View></View>
              )}
              
              <TextInput
                style={styles.input}
                placeholder={t("Phone Number")}
                placeholderTextColor="lightgrey"
                onChangeText={(text) =>
                  setValue({ ...value, phoneNumber: text })
                }
                onBlur={() => phoneNumberValidator()}
                value={value.phoneNumber}
                autoCompleteType="off"
              />
              {value.phoneNumberError != "" ? (
                <Text style={styles.error}>{value.phoneNumberError}</Text>
              ) : (
                <View></View>
              )}
              <TextInput
                style={styles.input}
                placeholder={t("Car Number")}
                placeholderTextColor="lightgrey"
                onChangeText={(text) => setValue({ ...value, carNumber: text })}
                onBlur={() => carNumberValidator()}
                value={value.carNumber}
                autoCompleteType="off"
              />
              {value.carNumberError != "" ? (
                <Text style={styles.error}>{value.carNumberError}</Text>
              ) : (
                <View></View>
              )}
              

              <SelectList placeholder={t("dropdown")} data={listData} setSelected={(arg)=>{
                setValue({ ...value, toEmail: workshopData[arg][0],toNumber: workshopData[arg][1] })}}/>
              <TouchableHighlight
                style={styles.submit}
                title="Submit"
                onPress={onPress}
                // onPress={showAlert}
                underlayColor="#fff"
              >
                <Text style={styles.submitText}>{t("CompleteBooking")}</Text>
              </TouchableHighlight>
            </View>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

    paddingTop: myConstants.height * 0.106,

    textAlign: "center",
  },
  image: {
    flex: 1,
  },
  underLine: {
    backgroundColor: "red",
    width: myConstants.width * 0.18,
    height: myConstants.height * 0.003,
    marginLeft: myConstants.width * 0.42,
    marginBottom: 30,
  },
  serviceContainer: {
    backgroundColor: "#fcfcfc",
    width: myConstants.width * 1,
    height: myConstants.height * 1.1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: myConstants.height * 0.06,
  },
  textTitle: {
    color: "#14a651",
    fontFamily: "Helvetica-Bold",
    fontSize: 22,
    textAlign: "center",
    paddingTop: 30,
    paddingBottom: 3,
  },
  titleLogin: {
    fontSize: 18,
    textAlign: "center",
    color: "black",
    fontWeight: "500",
    padding: 10,
    margin: 10,
  },
  submit: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 20,
    marginBottom: 40,
    paddingTop: 20,
    paddingBottom: 20,
    width: myConstants.width * 0.9,
    borderRadius: 10,
    backgroundColor: "#14a651",
    borderColor: "#fff",
  },
  submitText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "500",
    fontSize: 20,
  },
  form: {
    width: "100%",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    // padding: 2,
    // marginTop: 5,
  },
  input: {
    width: myConstants.width * 0.9,
    height: myConstants.height * 0.06,
    backgroundColor: "white",
    padding: 5,
    margin: 5,
    borderWidth: 1,
    borderColor: "#ededed",
    borderStyle: "solid",
    borderRadius: 8,
  },
  inputAddress: {
    width: myConstants.width * 0.9,
    height: myConstants.height * 0.09,
    backgroundColor: "white",
    padding: 5,
    margin: 5,
    borderWidth: 1,
    borderColor: "#ededed",
    borderStyle: "solid",
    borderRadius: 8,
  },

  error: {
    color: "red",
    textAlign: "center",
  },
});

export default FormPage;
