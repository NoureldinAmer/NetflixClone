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

export default function MediaList({
  data,
  title = "List Title",
  tileSize = "small",
}) {
  const navigation = useNavigation();

  function handlePress(itemID) {
    navigation.navigate("details", {
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
          <Pressable
            style={
              tileSize === "small" ? styles.imgBoxSmall : styles.imgBoxLarge
            }
            onPress={() => handlePress(item.id)}
          >
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w200/${item.poster_path}`,
              }}
              style={
                tileSize === "small" ? styles.imageSmall : styles.imageLarge
              }
            />
          </Pressable>
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
  imageSmall: {
    resizeMode: "cover",
    height: 154.5,
    width: 103,
    borderRadius: 4,
  },
  imgBoxSmall: {
    marginRight: 7,
    height: 161,
    width: 103,
    overflow: "hidden",
  },
  imageLarge: {
    resizeMode: "cover",
    height: 231.06,
    width: 154.04,
    borderRadius: 4,
  },
  imgBoxLarge: {
    marginRight: 7,
    height: 251,
    width: 154.04,
    overflow: "hidden",
  },
});
