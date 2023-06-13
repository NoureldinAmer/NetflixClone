import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const EpisodeImageContainer = ({ episode, progress = 0 }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Image
        style={styles.image}
        source={{
          uri: `https://image.tmdb.org/t/p/w500/${episode.still_path}`,
        }}
      />
      {progress > 0 && (
        <View style={styles.progressContainer}>
          <View style={[styles.progress, { width: `${progress}%` }]} />
        </View>
      )}
    </View>
  );
};

export default EpisodeImageContainer;

const styles = StyleSheet.create({
  image: {
    width: 145,
    height: 85,
    resizeMode: "cover",
    borderRadius: 4,
  },
  progressContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: "4%",
    backgroundColor: "#9A9A9A",
    width: "100%",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: "hidden",
  },
  progress: {
    height: "100%",
    backgroundColor: "#C2001A",
  },
});
