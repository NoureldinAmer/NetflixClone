import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  Keyboard,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { popularMovies } from "../../data/MOCK_DATA";
import DefaultResultsList from "./DefaultResults";
import SearchTextInput from "./SearchTextInput";
import { MediaContext } from "../../contexts/MediaContext";
import ActivityIndicator from "../ActivityIndicator";
import { ApiContext } from "../../contexts/ApiContext";
import SearchScreenLoading from "../Skeleton/SearchScreenLoading";

const SearchResults = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { setSelectedMediaID } = useContext(MediaContext);
  const { loading, data, error } = useContext(ApiContext);

  function handlePress(itemID) {
    setSelectedMediaID({
      contentID: itemID,
      contentType: "movie",
    });
    navigation.navigate("modal", {
      contentID: itemID,
      contentType: "movie",
    });
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <SearchTextInput />
      {!loading ? (
        // <DefaultResultsList
        //   data={data?.topSearches?.results}
        //   handlePress={handlePress}
        // />
        <SearchScreenLoading />
      ) : (
        <SearchScreenLoading />
      )}
    </View>
  );
};

export default SearchResults;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    paddingHorizontal: 8,
  },
});
