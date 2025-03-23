import LogoImage from "@/assets/logo";
import { ScreenContainer } from "@/components/Container";
import { Text } from "@/components/Text";
import CastItem from "@/components/movie/CastItem";
import MovieDetails from "@/components/movie/MovideDetail";
import MovieRecommend from "@/components/movie/MovieRecommend";
import { ROUTE_KEY } from "@/navigation/route_key";
import { useParams } from "@/navigation/use_params";
import { useGetCredits } from "@/services/api_client/query/credits";
import { useGetMovieRecommend } from "@/services/api_client/query/movie";
import { useStore } from "@/store";
import { parseJSONToObjectSafely } from "@/utils/utils";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, FlatList } from "react-native";

const MovieDetailsScreen = ({}) => {
  const { id, item } = useParams<ROUTE_KEY.Detail>();
  const movie: Movie = parseJSONToObjectSafely(item);
  const { data } = useGetCredits(id);
  const { data: recommend } = useGetMovieRecommend(id);
  const { addToWatchList } = useStore();

  const [renderData, setRenderData] = useState<CastMember[]>([]);
  useEffect(() => {
    if (data?.cast) {
      const result = data?.cast.filter((item) => item.character.length > 0);
      setRenderData(result);
    }
  }, [data]);
  const addWatchList = () => {
    addToWatchList(movie as Movie);
  };
  return (
    <ScreenContainer style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <LogoImage />
        </View>
        <MovieDetails id={id} crew={data?.crew} addWatchList={addWatchList} />
        <View style={styles.carouselContainer}>
          <Text style={styles.sectionTitle}>Cast Members</Text>
          <FlatList
            data={renderData}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <CastItem data={item} />}
            contentContainerStyle={styles.carouselContent}
          />
        </View>
        {recommend?.results && recommend?.results.length > 0 && (
          <View style={styles.carouselContainer}>
            <Text style={styles.sectionTitle}>Recommendations</Text>
            <FlatList
              data={recommend?.results}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <MovieRecommend data={item} />}
              contentContainerStyle={styles.carouselContent}
            />
          </View>
        )}
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
  carouselContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  carouselContent: {
    paddingVertical: 10,
  },
  castItem: {
    alignItems: "center",
    marginRight: 20,
  },
  castImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginBottom: 5,
  },
  castName: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  castRole: {
    color: "#ccc",
    fontSize: 12,
    textAlign: "center",
  },
});

export default MovieDetailsScreen;
