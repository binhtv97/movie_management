import { Text } from "@/components/Text";
import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
// import Header from "./Header";
// import MovieInfo from "./MovieInfo";
// import UserScore from "./UserScore";
// import CrewInfo from "./CrewInfo";
// import Tagline from "./Tagline";
// import Overview from "./Overview";
// import CastList from "./CastList";
// import RecommendationsList from "./RecommendationsList";
// import NavigationBar from "./NavigationBar";

const MovieDetailsScreen = ({}) => {
  return (
    <View style={styles.container}>
      <Text>Detail</Text>
      {/* <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.movieDetails}>
          <Header navigation={navigation} />
          <MovieInfo
            title={movie.title}
            posterUrl={movie.posterUrl}
            rating={movie.rating}
            releaseDate={movie.releaseDate}
            runtime={movie.runtime}
            genres={movie.genres}
            status={movie.status}
            language={movie.language}
          />
          <View style={styles.scoreAndCrew}>
            <UserScore score={movie.userScore} />
            <CrewInfo director={movie.director} writer={movie.writer} />
          </View>
          <Tagline tagline={movie.tagline} />
          <Overview overview={movie.overview} />
        </View>
        <View style={styles.whiteSection}>
          <CastList cast={movie.cast} />
          <RecommendationsList recommendations={movie.recommendations} />
        </View>
      </ScrollView>
      <NavigationBar navigation={navigation} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 60, // Height of NavigationBar
  },
  movieDetails: {
    backgroundColor: "#00C4FF",
    padding: 10,
  },
  scoreAndCrew: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  whiteSection: {
    backgroundColor: "#fff",
    padding: 10,
  },
});

export default MovieDetailsScreen;
