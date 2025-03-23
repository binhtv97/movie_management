import LogoImage from "@/assets/logo";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Header = ({}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton}>
        <LogoImage />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    paddingHorizontal: 10,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    left: 10,
    top: 30,
  },
  branding: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  brandingBlue: {
    color: "#00f",
  },
});

export default Header;
