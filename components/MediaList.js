import React, { useContext } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ImageContainer from "./ImageContainer";
import { MediaContext } from "../contexts/MediaContext";
import { init, addMovie, deleteDB, verifyDbExists } from "../util/database";

export default function MediaList({
  data,
  title = "List Title",
  tileSize = "small",
  listStyle,
  titleStyle,
  contentContainerStyle,
}) {
  const navigation = useNavigation();
  const { setSelectedMediaID, stopTimer } = useContext(MediaContext);

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
            movieID={item.id ? item.id : item.media_id} //item.id => api , item.media_id => DB
            contentType={item.media_type}
            posterPath={item.poster_path}
            progress={item.progress}
            placeHolderText={
              item.media_type === "movie" ? item.title : item.name
              //item.title ? item.title : item.name
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
