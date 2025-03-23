import BackIcon from "@/assets/back";
import LogoImage from "@/assets/logo";
import MovieItem from "@/components/movie/MovieItem";
import { useStore } from "@/store";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Button,
} from "react-native";

const WatchListScreen = () => {
  const { watchList } = useStore();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo}>
        <LogoImage />
      </View>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <BackIcon />
        </TouchableOpacity>
        <View style={styles.profileContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>J</Text>
          </View>
          <View style={styles.profileText}>
            <Text style={styles.name}>John Lee</Text>
            <Text style={styles.membership}>Member since August 2023</Text>
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <FlatList
          data={watchList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieItem data={item} />}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginTop: 45,
  },
  flatListContent: {
    paddingBottom: 60,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#1C2526",
    padding: 20,
    paddingTop: 40,
    marginTop: 20,
  },
  backButton: {
    position: "absolute",
    top: 5,
    left: 20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#8A2BE2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  avatarText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  profileText: {
    flex: 1,
  },
  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  membership: {
    color: "#ccc",
    fontSize: 14,
  },
  watchlistContainer: {
    padding: 20,
  },
  watchlistTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 15,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterLabel: {
    fontSize: 16,
    color: "#000",
    marginRight: 5,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#1E90FF",
    paddingBottom: 2,
  },
  dropdownText: {
    fontSize: 16,
    color: "#1E90FF",
    marginRight: 15,
    marginLeft: 5,
  },
  orderButton: {
    marginLeft: 5,
  },
  logo: {
    alignItems: "center",
    height: 60,
    justifyContent: "center",
  },
});

export default WatchListScreen;
