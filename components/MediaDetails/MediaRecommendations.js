import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { continueWatching } from "../../data/MOCK_DATA";
import ImageContainer from "../ImageContainer";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function MediaRecommendations() {
  const navigation = useNavigation();
  const route = useRoute();

  function handlePress(itemID) {
    navigation.push("detailsSecondaryScreen", {
      contentID: itemID,
      contentType: "movie",
    });
  }
  console.log("route", route);

  return (
    <View style={styles.mediaList}>
      {route.params.recommendations.map((item) => {
        return (
          <ImageContainer
            key={item.id}
            handlePress={handlePress}
            tileSize={"medium"}
            movieID={item.id}
            posterPath={item.poster_path}
            style={{
              marginRight: 0,
              marginBottom: 5,
            }}
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
