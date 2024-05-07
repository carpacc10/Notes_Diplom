import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Fonts } from "../misc/fonts";

const NotFound = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <AntDesign name="frowno" size={90} color="grey" />
      <Text style={styles.textNotFound}>Заметка не найдена</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.5,
    zIndex: -1,
  },

  textNotFound: {
    marginTop: 20,
    fontSize: 20,
    textTransform: "uppercase",
    color: "grey",
    fontFamily: Fonts.RobotoFlex,
  },
});

export default NotFound;
