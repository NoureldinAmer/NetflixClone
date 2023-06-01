import React, { useContext } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ImageContainer from "./ImageContainer";
import { MediaContext } from "../contexts/MediaContext";

export default function MediaList({
  data,
  title = "List Title",
  tileSize = "small",
  listStyle,
  titleStyle,
  contentContainerStyle,
}) {
  const navigation = useNavigation();
  const { setSelectedMediaID } = useContext(MediaContext);

  function handlePress(itemID, contentType) {
    setSelectedMediaID({
      contentID: itemID,
      contentType: contentType,
    });
    navigation.navigate("modal");
  }

  return (
    <View style={[styles.listContainer, listStyle]}>
      <Text style={[styles.listTitle, titleStyle]}>{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        contentContainerStyle={[styles.flatList, contentContainerStyle]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ImageContainer
            tileSize={tileSize}
            handlePress={handlePress}
            movieID={item.id}
            contentType={item.media_type}
            posterPath={item.poster_path}
            placeHolderText={
              item.media_type === "movie" ? item.title : item.name
            }
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
    width: "60%",
  },
});
