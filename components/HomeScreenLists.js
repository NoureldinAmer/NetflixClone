import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
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
import { getWatchList } from "../util/database";

export default function HomeScreenLists({ navigation }) {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const paddingTop = headerHeight;
  const { isFocused } = navigation;
  const { loading, data, error } = useContext(ApiContext);
  const [watchHistoy, setWatchHistory] = useState([]);

  useEffect(() => {
    const getLocalLists = async () => {
      try {
        const results = await getWatchList();
        console.log("db history", results);
        setWatchHistory(results);
      } catch (error) {
        console.log("err: ", error);
      }
    };
    getLocalLists();
  }, []);

  return (
    <>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={styles.screenContainer}>
        {!loading ? (
          <ScrollView
            style={{ paddingTop: headerHeight }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
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
            <MediaList data={watchHistoy} title={"Watch History"} />
          </ScrollView>
        ) : (
          //TODO => refactor
          <HomeScreenLoading />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    //backgroundColor: "#fff7",
    flex: 1,
  },
  listContainer: {
    paddingBottom: 200,
  },
});
