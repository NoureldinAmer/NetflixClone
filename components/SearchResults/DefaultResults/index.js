import SearchScreenLoading from "./../../Skeleton/SearchScreenLoading";
import React from "react";
import { Ionicons } from "react-native-vector-icons";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  Keyboard,
} from "react-native";
import { TouchableRipple } from "react-native-paper";
import { Platform } from "react-native";
import ImageSkeleton from "../../Skeleton/ImageSkeleton";
import TitleSkeleton from "../../Skeleton/TitleSkeleton";

export default function DefaultResultsList({ data, handlePress }) {
  return (
    <ScrollView
      onScroll={() => Keyboard.dismiss()}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.searchTitle}>Top Searches</Text>
      <FlatList
        scrollEnabled={false}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableRipple
            rippleColor={
              Platform.OS === "android" ? "rgba(255, 255, 255, .20)" : null
            }
            onPress={() => handlePress(item.id)}
          >
            <View style={styles.defaultResultContainer}>
              <View style={styles.imageTitleContainer}>
                <Image
                  style={styles.image}
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`,
                  }}
                />
                <Text style={styles.contentName}>
                  {item.media_type === "movie" ? item.title : item.name}
                </Text>
              </View>

              <View style={styles.playIconContaier}>
                <Ionicons
                  name="ios-play-circle-outline"
                  size={34}
                  color="white"
                />
              </View>
            </View>
          </TouchableRipple>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  searchTitle: {
    color: "#fff",
    fontSize: 22,
    fontFamily: "netflix-medium",
    marginBottom: 12,
  },
  image: {
    width: 145,
    height: 85,
    resizeMode: "cover",
    borderRadius: 4,
  },

  defaultResultContainer: {
    flex: 1,
    flexDirection: "row",
    //justifyContent: "space-between",
    //marginBottom: 8,
    marginVertical: 4,
    alignItems: "center",
  },
  imageTitleContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  playIconContaier: {
    padding: 5,
    fontWeight: "900",
  },
  contentName: {
    color: "#fff",
    paddingLeft: 16,
    paddingRight: 40,
    flexShrink: 1,
    fontSize: 15,
    fontFamily: "netflix-medium",
  },
});
