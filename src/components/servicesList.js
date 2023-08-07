import React, { useRef, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { FlatGrid } from "react-native-super-grid";
import * as myConstants from "../Utils/Constants";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

function ServicesList({ isMobile }) {
  const {t,i18n} = useTranslation()
  const navigation = useNavigation();
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

  function checkIsMobile(listOfData) {
    if (isMobile) {
      if (listOfData.mobileBranch) {
        return listOfData;
      }
    } else {
      return listOfData;
    }
  }
  return (
    <>
      <FlatGrid
        itemDimension={130}
        data={serviceItems.filter(checkIsMobile)}
        style={styles.gridView}
        spacing={10}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                navigation.navigate("SelectDateAndTime", {
                  indexOfList: index,
                });
              }}
            >
              <View
                style={[styles.itemContainer, { backgroundColor: "white" }]}
              >
                {item.mobileBranch ? (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Image
                      style={{
                        width: myConstants.width * 0.04,
                        height: myConstants.height * 0.02,
                      }}
                      source={require("../../assets/label.png")}
                    />
                  </View>
                ) : (
                  <View></View>
                )}

                <Image style={styles.image} source={item.iconUrl} />

                <Text style={styles.itemName}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    marginBottom: 80,

    flex: 1,
  },
  minimalText: {
    fontWeight: "300",
    fontSize: 10,
  },
  image: {
    flex: 1,
    width: myConstants.width * 0.25,
    height: myConstants.height * 0.15,
    resizeMode: "contain",
    alignSelf: "center",
  },
  headingText: {
    padding: 12,
    textAlign: "center",
    fontWeight: "600",
    fontSize: 20,
  },
  bodyText: {
    padding: 8,
    textAlign: "center",
    fontWeight: "400",
    fontSize: 18,
  },
  itemContainer: {
    borderRadius: 5,
    margin: 10,
    elevation: 8,
  },
  itemName: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    paddingBottom: 5,
  },
});

export default ServicesList;
