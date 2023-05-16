import React, { useContext, useEffect } from "react";
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
import { ApiContext } from "../contexts/ApiContext";
import ActivityIndicator from "./ActivityIndicator";
import HomeScreenLoading from "./Skeleton/HomeScreenLoading";

export default function HomeScreenLists({ navigation }) {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const paddingTop = headerHeight;
  const { isFocused } = navigation;
  const { loading, data, error } = useContext(ApiContext);

  return (
    <View style={styles.screenContainer}>
      {!loading ? (
        <ScrollView
          style={{ paddingTop: headerHeight }}
          showsVerticalScrollIndicator={false}
        >
          {data?.homeScreen?.results.map((item, index) => {
            return (
              <MediaList
                data={item.results}
                title={item.list_name}
                key={index}
              />
            );
          })}
        </ScrollView>
      ) : (
        //TODO => refactor
        <HomeScreenLoading />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    //backgroundColor: "#fff7",
    flex: 1,
  },
});
