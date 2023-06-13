import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  Keyboard,
} from "react-native";
import React, { useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { API_URL } from "@env";
import { debounce } from "lodash";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { popularMovies } from "../../data/MOCK_DATA";
import DefaultResultsList from "./DefaultResults";
import SearchTextInput from "./SearchTextInput";
import { MediaContext } from "../../contexts/MediaContext";
import ActivityIndicator from "../ActivityIndicator";
import { ApiContext } from "../../contexts/ApiContext";
import CustomResults from "./CustomResults";
import SearchScreenLoading from "../Skeleton/SearchScreenLoading";

const SearchResults = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { setSelectedMediaID } = useContext(MediaContext);
  const { loading, data, error } = useContext(ApiContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [togglSearch, setToggleSearch] = useState(false);
  const [mediaState, setMediaState] = useState({
    loading: true,
    error: null,
    data: {},
  });

  const handleReset = () => {
    setSearchQuery("");
  };

  function handlePress(itemID) {
    setSelectedMediaID({
      contentID: itemID,
      contentType: "movie",
    });
    navigation.navigate("modal");
    //console.log(navigation);
  }

  function resetData() {
    setMediaState({
      loading: true,
      error: null,
      data: {},
    });
  }

  //debounce search query for 500 ms
  const fetchData = useCallback(
    debounce(async (query) => {
      if (!query) {
        setToggleSearch(false);
        return;
      } else {
        setToggleSearch(true);
      }
      try {
        //("search query is", query);
        const response = await axios.get(
          `${API_URL}/search?q=${encodeURIComponent(query)}`
        );

        setMediaState({
          loading: false,
          error: false,
          data: response.data,
        });
      } catch (error) {
        console.log(error);
        setMediaState({
          loading: false,
          error: true,
        });
      }
    }, 500),
    []
  );

  useEffect(() => {
    fetchData(searchQuery);
  }, [searchQuery]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <SearchTextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        handelReset={handleReset}
      />
      {/* {!loading ? (
        <DefaultResultsList
          data={data?.topSearches?.results}
          handlePress={handlePress}
        />
      ) : (
        // <SearchScreenLoading />
        <SearchScreenLoading />
      )} */}
      {togglSearch ? (
        <CustomResults data={mediaState.data} resetData={resetData} />
      ) : (
        <DefaultResultsList
          data={data?.topSearches?.results}
          handlePress={handlePress}
        />
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
