import { StyleSheet, Text, View } from "react-native";
import React from "react";
import EpisodeImageContainer from "../../ImageContainer/EpisodeImageContainer";

export default function EpisodeDetails({ index, episode, watchedEpisodes }) {
  const matchedEpisode = watchedEpisodes.find(
    (watchedEpisode) =>
      watchedEpisode.contentID === episode.contentID &&
      watchedEpisode.seasonNumber === episode.season_number &&
      watchedEpisode.episodeNumber === episode.episode_number
  );

  return (
    <View style={styles.episodeContainer}>
      <View style={styles.details}>
        <EpisodeImageContainer
          episode={episode}
          progress={matchedEpisode?.progress}
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
