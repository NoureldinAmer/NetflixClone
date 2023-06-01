import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "react-native-vector-icons";
import { Feather } from "react-native-vector-icons";
import { FontAwesome } from "react-native-vector-icons";

function MediaDescription({ clickMiddle, movie }) {
  return (
    <>
      <Text style={[styles.title, styles.text]}>
        {movie?.movieDetails?.title}
      </Text>
      <View style={styles.subtitleContainer}>
        <Text style={[styles.text, styles.subtitleText, styles.ratings]}>
          {Math.ceil(movie?.movieDetails?.vote_average * 10)}% match
        </Text>
        <Text style={[styles.text, styles.subtitleText]}>
          {movie?.movieDetails?.year}
        </Text>
        <View style={styles.certification}>
          <Text style={[styles.text, styles.certificationText]}>
            {movie?.certification}
          </Text>
        </View>
        <Text style={[styles.text, styles.subtitleText]}>
          {movie?.movieDetails?.runtime}
        </Text>
      </View>
      <View style={styles.highLight}>
        <View style={styles.highLightIcon}>
          <Entypo name="thumbs-up" size={20} color="white" />
        </View>
        <Text style={styles.highLightText}>Most Liked</Text>
      </View>
      <Pressable onPress={() => clickMiddle()}>
        <View style={styles.playButton}>
          <FontAwesome name="play" size={18} color="black" />
          <Text style={styles.playButtonText}> Play</Text>
        </View>
      </Pressable>
      <Text style={[styles.text, styles.overview]}>
        {movie?.movieDetails?.overview}
      </Text>
      <Text style={[styles.text, styles.cast]}>
        Cast: Dwayne Johnson, Ryan Reynolds, Gal Gadot... more {"\n"}
        Director: Rawson Marshall Thumber
      </Text>
      <View>
        <View style={styles.watchList}>
          <View style={styles.watchListIconBlock}>
            <Ionicons name="add" size={45} color="white" />
          </View>
          <View style={styles.watchListIconBlock}>
            <FontAwesome name="thumbs-o-up" size={30} color="white" />
          </View>
          <View style={styles.watchListIconBlock}>
            <Feather name="send" size={30} color="white" />
          </View>
        </View>
        <View style={styles.watchList}>
          <View style={styles.watchListIconBlock}>
            <Text style={[styles.text, styles.watchListIconText]}>My List</Text>
          </View>
          <View style={styles.watchListIconBlock}>
            <Text style={[styles.text, styles.watchListIconText]}>Watched</Text>
          </View>
          <View style={[styles.watchListIconBlock]}>
            <Text style={[styles.text, styles.watchListIconText]}>Share</Text>
          </View>
        </View>
      </View>
    </>
  );
}

export default MediaDescription;

const styles = StyleSheet.create({
  text: {
    color: "#fff",
  },
  title: {
    fontFamily: "netflix-medium",
    fontSize: 18,
  },
  subtitleContainer: {
    color: "white",
    flexDirection: "row",
    gap: 4,
    alignItems: "baseline",
  },
  subtitleText: {
    fontFamily: "netflix-regular",
    fontSize: 15,
  },
  ratings: {
    color: "#43C864",
  },
  certification: {
    backgroundColor: "#4D4D4D",
    padding: 3,
    borderRadius: 3,
  },
  certificationText: {
    fontSize: 12,
  },
  highLight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  highLightIcon: {
    backgroundColor: "red",
    padding: 3,
    borderRadius: 3,
  },
  highLightText: {
    fontFamily: "netflix-medium",
    color: "#fff",
    fontSize: 16,
  },
  playButton: {
    marginVertical: 12,
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    gap: 7,
    borderRadius: 3,
  },
  playButtonText: {
    fontFamily: "netflix-medium",
    fontSize: 16,
  },
  overview: {
    fontFamily: "netflix-regular",
    fontSize: 14.5,
  },
  cast: {
    fontFamily: "netflix-light",
    fontSize: 13,
    color: "#BFBFBF",
    lineHeight: 18,
  },
  watchList: {
    flexDirection: "row",
    paddingLeft: 15,
    paddingTop: 5,
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    maxwidth: 320,
  },
  watchListIconContainer: {
    alignItems: "center",
  },
  watchListIconBlock: {
    flex: 1,
    alignItems: "center",
  },
  watchListIconText: {
    fontFamily: "netflix-light",
    fontSize: 13,
    color: "#BFBFBF",
  },
});
