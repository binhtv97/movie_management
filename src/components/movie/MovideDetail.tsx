import BackIcon from "@/assets/back";
import { COLOR, COMMON_STYLE } from "@/assets/common_css";
import { ROUTE_KEY } from "@/navigation/route_key";
import { useParams } from "@/navigation/use_params";
import { useRouter } from "@/navigation/use_router";

import React, { useMemo } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as Progress from "react-native-progress";
import { FontSize, FontWeight, Text, TextColor } from "../Text";
import { useGetMovieDetail } from "@/services/api_client/query/movie";
import { useGetCredits } from "@/services/api_client/query/credits";
import WatchListIcon from "@/assets/watchlist";

const MovieDetails = ({}) => {
  const { back } = useRouter();
  const { id } = useParams<ROUTE_KEY.Detail>();
  const { data } = useGetMovieDetail(id);
  const { data: creditData } = useGetCredits(id);

  const renderData = useMemo(() => {
    if (!data) return {};
    const baseUrl = process.env.EXPO_PUBLIC_BASE_IMAGE_URL + data?.poster_path;

    function convertGenresToString(
      genres: { id: number; name: string }[]
    ): string {
      return genres.map((genre) => genre.name).join(", ");
    }

    function convertEnglishToString(
      languages: { english_name: string; name: string }[]
    ): string {
      return languages.map((language) => language.name).join(", ");
    }

    function extractDirectorOrWriter(
      crew: { job: string; name: string }[],
      type: "Director" | "Writer"
    ) {
      return crew
        .filter((person) => person.job === type)
        .map((item) => item.name)
        .join(", ");
    }
    let director = "";
    let writer = "";
    if (creditData?.crew) {
      director = extractDirectorOrWriter(creditData?.crew, "Director");
      writer = extractDirectorOrWriter(creditData?.crew, "Writer");
    }
    return {
      baseUrl,
      title: data.title,
      releaseDate: data.release_date,
      runtime: data.runtime,
      genre: convertGenresToString(data.genres),
      status: data.status,
      language: convertEnglishToString(data.spoken_languages),
      vote_average: data.vote_average,
      tagline: data.tagline,
      overview: data.overview,
      director,
      writer,
    };
  }, [data]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <BackIcon onPress={() => back()} style={styles.backIcon} />
        <Text variants={FontSize.UPPER_CASE} color={TextColor.WHITE}>
          {data?.title}
        </Text>
      </View>

      <View style={styles.header}>
        <View style={COMMON_STYLE.flex1}>
          <Image source={{ uri: renderData.baseUrl }} style={styles.image} />
        </View>
        <View style={COMMON_STYLE.flex2}>
          <Text style={styles.rating}>PG13</Text>
          <Text style={styles.releaseInfo}>
            {renderData?.releaseDate} (SG) • {renderData?.runtime}m
          </Text>
          <Text numberOfLines={2} style={styles.genres}>
            {renderData.genre}
          </Text>
          <Text
            numberOfLines={2}
            style={styles.genres}
            fontWeight={FontWeight.MEDIUM}
          >
            Status: {renderData.status}
          </Text>
          <Text style={styles.genres} fontWeight={FontWeight.MEDIUM}>
            Original Language: {renderData.language}
          </Text>
        </View>
      </View>

      <View style={styles.scoreAndCredits}>
        <View style={[styles.scoreContainer, COMMON_STYLE.flex1]}>
          <View style={styles.circleContainer}>
            <Progress.Circle
              progress={renderData?.vote_average || 0 / 10}
              size={60}
              thickness={5}
              color="#00C4B4"
              unfilledColor="#333"
              borderWidth={0}
              showsText={true}
              formatText={() =>
                `${Math.round(renderData?.vote_average || 0 * 10)}%`
              }
              textStyle={styles.scoreText}
            />
          </View>
          <Text
            style={styles.scoreLabel}
            color={TextColor.WHITE}
            fontWeight={FontWeight.BOLD}
          >
            USER SCORE
          </Text>
        </View>

        <View style={[styles.creditsContainer, COMMON_STYLE.flex2]}>
          {renderData?.director && renderData?.director?.length > 0 && (
            <Text style={styles.credit}>
              <Text style={styles.creditLabel} color={TextColor.WHITE}>
                {renderData.director}
              </Text>
              {"\n"}Director
            </Text>
          )}

          {renderData?.writer && renderData?.writer?.length > 0 && (
            <Text style={styles.credit}>
              <Text style={styles.creditLabel} color={TextColor.WHITE}>
                {renderData.writer}
              </Text>
              {"\n"}Writer
            </Text>
          )}
        </View>
      </View>

      <Text style={styles.tagline}>{renderData?.tagline}</Text>

      <Text style={styles.sectionTitle}>OVERVIEW</Text>
      <Text style={styles.overview}>{renderData.overview}</Text>

      <TouchableOpacity style={styles.button}>
        <WatchListIcon />
        <Text
          numberOfLines={5}
          style={styles.buttonText}
          fontWeight={FontWeight.BOLD}
        >
          Add To Watchlist
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.select_option,
    padding: 20,
    marginTop: 10,
  },
  headerContainer: {
    alignItems: "center",
    height: 50,
  },
  backIcon: {
    position: "absolute",
    left: 0,
    top: -5,
  },
  header: {
    marginBottom: 10,
    flexDirection: "row",
    marginTop: 10,
  },
  rating: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: "#FFF",
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: "flex-start",
  },
  releaseInfo: {
    color: "#FFF",
    fontSize: 14,
    marginVertical: 5,
  },
  genres: {
    color: "#FFF",
    fontSize: 14,
  },
  scoreAndCredits: {
    flexDirection: "row",
    marginVertical: 20,
  },
  scoreContainer: {
    alignItems: "center",
    marginRight: 20,
  },
  circleContainer: {
    position: "relative",
    backgroundColor: COLOR.dark_blue,
    padding: 5,
    borderRadius: 9999,
  },
  scoreText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  scoreLabel: {
    color: "#FFF",
    marginTop: 5,
  },
  creditsContainer: {},
  credit: {
    color: "#FFF",
    fontSize: 14,
    marginBottom: 10,
  },
  creditLabel: {
    fontWeight: "bold",
  },
  tagline: {
    color: "#FFF",
    fontSize: 16,
    fontStyle: "italic",
    marginVertical: 10,
  },
  sectionTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  overview: {
    color: "#FFF",
    fontSize: 14,
    lineHeight: 20,
  },
  button: {
    backgroundColor: COLOR.select_option,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    maxWidth: "50%",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: COLOR.background,
    justifyContent: "space-around",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
  },
  image: {
    width: 95,
    height: 141,
    borderRadius: 8,
  },
});

export default MovieDetails;
