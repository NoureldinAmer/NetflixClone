import React, { useContext, useEffect, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { continueWatching } from "../../data/MOCK_DATA";
import ImageContainer from "../ImageContainer";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { MediaContext } from "../../contexts/MediaContext";

export default function MediaRecommendations() {
  const navigation = useNavigation();
  const route = useRoute();
  const [childrenHeight, setChildrenHeight] = useState(0);
  const { stopTimer } = useContext(MediaContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      console.log("Tab 1 is focused");

      route.params.setHeight(childrenHeight); //give navigator space to display entire media collection
      console.log(childrenHeight);
    }
  }, [isFocused]);

  function handlePress(itemID) {
    stopTimer();
    navigation.push("detailsSecondaryScreen", {
      contentID: itemID,
      contentType: "movie",
    });
  }

  return (
    <View
      style={styles.mediaList}
      onLayout={(event) => {
        const { height } = event.nativeEvent.layout;
        if (isFocused) {
          route.params.setHeight(height); //give navigator space to display entire media collection
        }

        setChildrenHeight(height);
      }}
    >
      {route.params?.recommendations?.map((item) => {
        return (
          <ImageContainer
            key={item.id}
            handlePress={handlePress}
            tileSize={Platform.OS === "ios" ? "recommended" : "medium"}
            movieID={item.id}
            posterPath={item.poster_path}
            style={{
              marginRight: 0,
              marginBottom: 5,
            }}
            placeHolderText={
              item.media_type === "movie" ? item.title : item.name
            }
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  mediaList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
