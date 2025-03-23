import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const CastItem = ({ data }: { data: CastMember }) => {
  let baseUrl = "";
  if (data.profile_path) {
    baseUrl = process.env.EXPO_PUBLIC_BASE_IMAGE_URL + data.profile_path;
  }

  return (
    <View style={styles.card}>
      <Image source={{ uri: baseUrl }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.role}>{data.character}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: 150, // Adjust width as needed
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // For Android shadow
    margin: 10,
  },
  image: {
    width: "100%",
    height: 150, // Adjust height as needed
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textContainer: {
    padding: 10,
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  role: {
    fontSize: 14,
    color: "#666",
  },
});

export default CastItem;
