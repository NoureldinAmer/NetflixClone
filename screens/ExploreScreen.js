import NewContentView from "../components/NewContentView";
import { StyleSheet, View, ScrollView, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";
import { upComingMovies } from "../data/MOCK_DATA";

const ExploreScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screenContainer, { paddingTop: insets.top }]}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={upComingMovies.results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NewContentView
            overview={item.overview}
            releaseDate={item.release_date}
            title={item.title}
            url={item.backdrop_path}
          />
        )}
      />
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  screenContainer: {
    //backgroundColor: "#fff7",
    flex: 1,
    paddingVertical: 12,
    paddingRight: 12,
  },
});
