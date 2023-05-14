import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  Keyboard,
} from "react-native";
import React, { useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { popularMovies } from "../../data/MOCK_DATA";
import DefaultResultsList from "./DefaultResults";
import SearchTextInput from "./SearchTextInput";
import { MediaContext } from "../../contexts/MediaContext";

const SearchResults = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { setSelectedMediaID } = useContext(MediaContext);

  function handlePress(itemID) {
    setSelectedMediaID(itemID);
    navigation.navigate("modal", {
      contentID: itemID,
      contentType: "movie",
    });
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <SearchTextInput />
      <DefaultResultsList
        data={popularMovies.results}
        handlePress={handlePress}
      />
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
