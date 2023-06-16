import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { getMyList } from "../util/database";
import ImageContainer from "../components/ImageContainer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MediaContext } from "../contexts/MediaContext";

const MyList = ({ route, navigation }) => {
  const [results, setResults] = useState("");
  const insets = useSafeAreaInsets();
  const { setSelectedMediaID, stopTimer } = useContext(MediaContext);
  const { index } = route.params;
  const [mediaState, setMediaState] = useState({
    loading: true,
    error: null,
    data: {},
  });

  useEffect(() => {
    if (index === 3) {
      const getLocalList = async () => {
        const results = await getMyList();
        console.log("my list: ", results);
        setResults(results);
        setMediaState({
          loading: false,
          error: null,
          data: {},
        });
      };

      getLocalList();
    }
  }, [index]);

  async function handlePress(itemID, contentType, posterPath, placeHolderText) {
    setSelectedMediaID({
      contentID: itemID,
      contentType: contentType,
      poster_path: posterPath,
      title: placeHolderText,
    });
    // console.log({
    //   itemID,
    //   contentType,
    //   posterPath,
    //   placeHolderText,
    // });
    navigation.navigate("modal");
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {mediaState.loading ? (
        <></>
      ) : (
        <ScrollView
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        >
          {results.map((item, index) => (
            <ImageContainer
              posterPath={item.poster_path}
              tileSize={Platform.OS === "ios" ? "recommended" : "medium"}
              contentType={item.media_type}
              movieID={item.id ? item.id : item.media_id}
              progress={item.progress}
              placeHolderText={
                item.media_type === "movie" ? item.title : item.name
                //item.title ? item.title : item.name
              }
              handlePress={handlePress}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default MyList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: Platform.OS === "ios" ? 10 : 5,
    gap: Platform.OS === "ios" ? 5 : 0,
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
});
