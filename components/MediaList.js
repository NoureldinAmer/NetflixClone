import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ImageContainer from "./ImageContainer";

export default function MediaList({
  data,
  title = "List Title",
  tileSize = "small",
}) {
  const navigation = useNavigation();

  function handlePress(itemID) {
    navigation.navigate("modal", {
      contentID: itemID,
      contentType: "movie",
    });
  }

  return (
    <View style={styles.listContainer}>
      <Text style={styles.listTitle}>{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        contentContainerStyle={styles.flatList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ImageContainer
            tileSize={tileSize}
            handlePress={handlePress}
            movieID={item.id}
            posterPath={item.poster_path}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 22,
  },
  flatList: {
    paddingHorizontal: 12,
  },
  listTitle: {
    fontFamily: "netflix-medium",
    fontSize: 20.92,
    marginBottom: 14,
    marginLeft: 16,
    color: "#fff",
  },
});
