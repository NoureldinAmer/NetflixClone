import React, { useContext, useEffect } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { continueWatching } from "../../data/MOCK_DATA";
import ImageContainer from "../ImageContainer";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MediaContext } from "../../contexts/MediaContext";

export default function MediaRecommendations() {
  const navigation = useNavigation();
  const route = useRoute();
  const { stopTimer } = useContext(MediaContext);

  function handlePress(itemID) {
    stopTimer();
    navigation.push("detailsSecondaryScreen", {
      contentID: itemID,
      contentType: "movie",
    });
  }
  //console.log("route", route);

  return (
    <View style={styles.mediaList}>
      {route.params.recommendations?.map((item) => {
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
