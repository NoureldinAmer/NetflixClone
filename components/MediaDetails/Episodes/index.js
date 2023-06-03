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
import React, { useState, useContext } from "react";
import { MediaContext } from "../../../contexts/MediaContext";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { TouchableRipple } from "react-native-paper";
import { useRoute } from "@react-navigation/native";

const data = {
  _id: "52595fb3760ee346619586ed",
  air_date: "2011-12-04",
  episodes: [
    {
      air_date: "2011-12-04",
      episode_number: 1,
      id: 877838,
      name: "The National Anthem",
      overview:
        "Prime Minister Michael Callow faces a shocking dilemma when Princess Susannah, a much-loved member of the Royal Family, is kidnapped.",
      production_code: "",
      runtime: 45,
      season_number: 1,
      show_id: 42009,
      still_path: "/9w27Lgeq8KVxhz4ysygT6ranxf1.jpg",
      vote_average: 7.447,
      vote_count: 311,
    },
    {
      air_date: "2011-12-11",
      episode_number: 2,
      id: 877836,
      name: "Fifteen Million Merits",
      overview:
        "After failing to impress the judges on a singing competition show, a woman must either perform degrading acts or return to a slave-like existence.",
      production_code: "",
      runtime: 62,
      season_number: 1,
      show_id: 42009,
      still_path: "/c62HKSbeTRkatK223O3m58CmmPd.jpg",
      vote_average: 7.653,
      vote_count: 281,
    },
    {
      air_date: "2011-12-18",
      episode_number: 3,
      id: 877837,
      name: "The Entire History of You",
      overview:
        "In the near future, everyone has access to a memory implant that records everything humans do, see and hear.",
      production_code: "",
      runtime: 50,
      season_number: 1,
      show_id: 42009,
      still_path: "/lhZmmQ6HSIYCo4Rxe6pmHMvkJE6.jpg",
      vote_average: 8.022,
      vote_count: 271,
    },
  ],
  name: "Season 1",
  overview:
    "Season one of this sci-fi anthology series imagines realities in which people are forced to power their own existence, receive memory implants and more.",
  id: 51964,
  poster_path: "/eE7fAb7qoheUageST2PBdpoZ3D1.jpg",
  season_number: 1,
};

const Episodes = ({ setShowUrl }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSeason, setCurrentSeason] = useState(1);
  const { setEpisode } = useContext(MediaContext);
  const route = useRoute();

  function handlePress(seasonNumber, episodeNumber) {
    console.log(seasonNumber, episodeNumber);
    setEpisode(seasonNumber, episodeNumber);
  }

  // const [showURL, setShowURL] = useState({
  //   season: 1,
  //   episode: 1,
  // });

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <BlurView
          style={styles.modalContainer}
          tint="dark"
          intensity={Platform.OS === "ios" ? 65 : 119}
        >
          <View style={styles.modalView}>
            <View style={styles.textContainer}>
              <Text style={styles.season}>Season 1</Text>
              <Text style={styles.season}>Season 1</Text>
              <Text style={styles.season}>Season 1</Text>
              <Text style={styles.season}>Season 1</Text>
              <Text style={styles.season}>Season 1</Text>
              <Text style={styles.season}>Season 1</Text>
              <Text style={styles.season}>Season 1</Text>
            </View>

            <Pressable
              style={styles.exit}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="md-close-circle" size={65} color="white" />
            </Pressable>
          </View>
        </BlurView>
      </Modal>
      <Pressable onPress={() => setModalVisible(true)}>
        <Text style={styles.seasonButton}>Season {currentSeason}</Text>
      </Pressable>
      <View style={styles.episodesContainer}>
        {route.params.episodes.episodes?.map((item, index) => {
          return (
            <TouchableRipple
              style={styles.episodeRippleContainer}
              onPress={() =>
                handlePress(item.season_number, item.episode_number)
              }
              rippleColor={
                Platform.OS === "android"
                  ? "rgba(255, 255, 255, .20)"
                  : "rgba(0, 0, 0, .12)"
              }
            >
              <View style={styles.episodeContainer}>
                <View style={styles.details}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500/${item.still_path}`,
                    }}
                  />
                  <View style={styles.name}>
                    <Text style={styles.episodeName}>{`${index + 1}. ${
                      item.name
                    }`}</Text>
                    <Text style={styles.runtime}>{item.runtime}m</Text>
                  </View>
                </View>

                <View style={styles.overViewContaier}>
                  <Text style={styles.overview}>{item.overview}</Text>
                </View>
              </View>
            </TouchableRipple>
          );
        })}
      </View>
    </View>
  );
};

export default Episodes;

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

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    opacity: 1,
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
