import {
  FlatList,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import LogoImage from "@/assets/logo";
import { Button } from "@/components/Button";
import Dropdown from "@/components/DropDown";
import { ScreenContainer } from "@/components/Container";
import { FontSize, FontWeight, TextColor } from "@/components/Text";
import { Input } from "@/components/Input";
import MovieItem from "@/components/movie/MovieItem";
import { CATEGORY_DATA, SORT_BY_DATA } from "@/store/home_store";
import { useStore } from "@/store";
import { useEffect, useState } from "react";
import { useGetMovie } from "@/services/api_client/query/movie";
import { MovieType } from "@/services/api_client/enums/movie";
import { COLOR } from "@/assets/common_css";

export default function HomeScreen() {
  const { category, setCategory } = useStore();
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>(SORT_BY_DATA[0]);
  const [filmType, setFilmType] = useState(() => {
    if (category === CATEGORY_DATA[0]) return MovieType.NOW_PLAYING;
    if (category === CATEGORY_DATA[1]) return MovieType.UPCOMING;
    if (category === CATEGORY_DATA[2]) return MovieType.POPULAR;
    return MovieType.NOW_PLAYING;
  });

  const { data, isLoading } = useGetMovie(filmType, page);
  const [dataRender, setDataRender] = useState<Movie[]>([]);

  const onCategoryPress = (value: string) => {
    setCategory(value);
    if (value === CATEGORY_DATA[0]) setFilmType(MovieType.NOW_PLAYING);
    if (value === CATEGORY_DATA[1]) setFilmType(MovieType.UPCOMING);
    if (value === CATEGORY_DATA[2]) setFilmType(MovieType.POPULAR);
    setPage(1);
    setDataRender([]);
  };

  const onSortPress = (value: string) => {
    setSortBy(value);
  };

  const onLoadMore = () => {
    if (page < totalPage) setPage((prevPage) => prevPage + 1);
  };

  const sortData = (movies: Movie[]) => {
    switch (sortBy) {
      case SORT_BY_DATA[0]:
        return [...movies].sort((a, b) => a.title.localeCompare(b.title));
      case SORT_BY_DATA[1]:
        return [...movies].sort((a, b) => b.vote_average - a.vote_average);
      case SORT_BY_DATA[2]:
        return [...movies].sort(
          (a, b) =>
            new Date(b.release_date).getTime() -
            new Date(a.release_date).getTime()
        );
      default:
        return movies;
    }
  };

  useEffect(() => {
    if (data?.results) {
      const tmpData = [...dataRender, ...data.results];
      setDataRender(tmpData);
    }
    if (data?.total_pages) {
      setTotalPage(data.total_pages);
    }
  }, [data]);

  const sortedData = sortData(dataRender);

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        style={styles.body}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.header}>
          <LogoImage />
        </View>

        <View style={styles.form}>
          <Dropdown
            data={CATEGORY_DATA}
            initData={category}
            onItemSelect={onCategoryPress}
          />
          <Dropdown
            data={SORT_BY_DATA}
            initData={sortBy}
            onItemSelect={onSortPress}
          />
          <Input placeholder="Search..." />
          <Button
            label="Search"
            textColor={TextColor.DISABLE}
            containerStyle={styles.button}
          />
        </View>

        <View style={styles.content}>
          <FlatList
            data={sortedData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MovieItem data={item} />}
            ListFooterComponent={
              data?.results && (
                <Button
                  label="Load More"
                  textColor={TextColor.WHITE}
                  containerStyle={styles.loadmore}
                  variantsText={FontSize.UPPER_CASE}
                  fontWeight={FontWeight.BOLD}
                  onPress={onLoadMore}
                  loading={isLoading}
                />
              )
            }
            contentContainerStyle={styles.flatListContent}
          />
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: 30,
  },
  header: {
    alignItems: "center",
    height: 60,
    justifyContent: "center",
  },
  form: {
    width: "100%",
    marginTop: 20,
  },
  button: {
    marginTop: 20,
  },
  loadmore: {
    backgroundColor: COLOR.select_option,
    marginTop: 20,
  },
  content: {
    flex: 1,
    marginTop: 45,
  },
  flatListContent: {
    paddingBottom: 60,
  },
});
