import LogoImage from "@/assets/logo";
import { ScreenContainer } from "@/components/Container";
import MovieDetails from "@/components/movie/MovideDetail";
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

const MovieDetailsScreen = ({}) => {
  return (
    <ScreenContainer style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <LogoImage />
        </View>
        <View>
          <View>
            <MovieDetails />
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    height: 60,
    justifyContent: "center",
  },
});

export default MovieDetailsScreen;
