import React from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import MediaList from "./MediaList";
import {
  popularMovies,
  topratedMovies,
  myList,
  popularDocumentaries,
  continueWatching,
} from "../data/MOCK_DATA";

export default function HomeScreenLists({ navigation }) {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const paddingTop = headerHeight;
  const { isFocused } = navigation;

  return (
    <View style={styles.screenContainer}>
      <ScrollView
        style={{ paddingTop: headerHeight }}
        showsVerticalScrollIndicator={false}
        //contentInsetAdjustmentBehavior="automatic"
      >
        <MediaList data={popularMovies.results} title="Popular Movies" />
        <MediaList data={topratedMovies.results} title="Top Rated Movies" />
        <MediaList
          data={continueWatching.results}
          title="Continue Watching"
          tileSize="large"
        />
        <MediaList data={myList.results} title="My List" />
        <MediaList
          data={popularDocumentaries.results}
          title="Popular Documentaries"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    //backgroundColor: "#fff7",
    flex: 1,
  },
});
