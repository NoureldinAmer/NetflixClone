import {
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";

export default function EpisodeDetails({ index, episode }) {
  return (
    <View style={styles.episodeContainer}>
      <View style={styles.details}>
        <Image
          style={styles.image}
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${episode.still_path}`,
          }}
        />
        <View style={styles.name}>
          <Text style={styles.episodeName}>{`${index + 1}. ${
            episode.name
          }`}</Text>
          <Text style={styles.runtime}>{episode.runtime}m</Text>
        </View>
      </View>

      <View style={styles.overViewContaier}>
        <Text style={styles.overview}>{episode.overview}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  seasonButton: {
    color: "#fff",
    fontFamily: "netflix-light",
  },
  season: {
    color: "#fff",
    fontFamily: "netflix-regular",
    fontSize: 20,
  },

  modalView: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 0,
    gap: 25,
  },
  exit: {
    flex: 0,
  },

  episodeRippleContainer: {
    paddingVertical: 10,
  },
  episodeContainer: {
    gap: 10.5,
  },
  image: {
    width: 145,
    height: 85,
    resizeMode: "cover",
    borderRadius: 4,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
  },
  episodesContainer: {
    gap: 34,
  },
  name: {
    paddingHorizontal: 15,
  },
  episodeName: {
    color: "#e6e5e5",
    fontFamily: "netflix-regular",
  },
  runtime: {
    color: "#807e7c",
    fontFamily: "netflix-light",
  },
  overview: {
    color: "#b2b2b2",
    fontFamily: "netflix-light",
    fontSize: 15.2,
  },
});
