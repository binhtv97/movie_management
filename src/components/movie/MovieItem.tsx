import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { FontSize, FontWeight, Text, TextColor } from "../Text";

interface MovieItemProps {
  data: Movie;
}
const MovieItem = ({ data }: MovieItemProps) => {
  const baseUrl = process.env.EXPO_PUBLIC_BASE_IMAGE_URL + data.poster_path;
  return (
    <View style={styles.container}>
      <Image source={{ uri: baseUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text
          style={styles.title}
          variants={FontSize.NORMAL}
          color={TextColor.HEADER}
          fontWeight={FontWeight.MEDIUM}
          numberOfLines={1}
        >
          {data.original_title}
        </Text>
        <Text
          variants={FontSize.SMALL}
          color={TextColor.DESCRIPTION}
          style={styles.date}
        >
          {data.release_date}
        </Text>
        <Text numberOfLines={2} style={styles.description}>
          {data.overview}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    height: 141,
  },
  image: {
    width: 95,
    height: 141,
    borderRadius: 8,
  },
  content: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
    paddingRight: 15,
  },
  title: {
    fontWeight: "bold",
    color: "#000",
  },
  date: {
    marginVertical: 2,
    marginBottom: 17,
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
});

export default MovieItem;
