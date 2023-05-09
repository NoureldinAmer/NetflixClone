import MediaRecommendations from "./MediaRecommendations";
import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native";
import React, { useEffect, useRef } from "react";
import { WebView } from "react-native-webview";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "react-native-vector-icons";
import { Feather } from "react-native-vector-icons";
import { FontAwesome } from "react-native-vector-icons";
import VideoPlayerIcon from "./VideoPlayerIcon";
import TabNavigation from "./TabNavigation";

const MediaDetailsSecondary = ({ route, navigation }) => {
  const webViewRef = useRef(null);

  const handleNavigationStateChange = (navState) => {
    console.log("Redirected URL:", navState.url);

    if (
      navState.url !==
      `https://www.2embed.to/embed/tmdb/movie?id=${route.params.contentID}`
    ) {
      webViewRef.current?.reload();
      console.log("[RELOADING]");
    }
  };

  const handleCloseButton = () => {
    navigation.popToTop();
    navigation.goBack(null);
  };

  const HandleBackButton = () => {
    navigation.goBack();
  };

  const clickMiddle = () => {
    const script = `
      (function() {
        const element = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
        if (element) {
          element.click();
        }
      })();`;

    webViewRef.current?.injectJavaScript(script);
  };

  return (
    <View style={styles.container}>
      <View style={{ height: 300, backgroundColor: "green", width: "100%" }}>
        <View style={styles.exitButton}>
          <Pressable onPress={handleCloseButton}>
            <VideoPlayerIcon iconSize={24}>
              <AntDesign name="closecircle" size={24} color="#272526" />
            </VideoPlayerIcon>
          </Pressable>
        </View>
        <View style={styles.backButton}>
          <Pressable onPress={HandleBackButton}>
            <VideoPlayerIcon iconSize={24}>
              <AntDesign name="leftcircle" size={24} color="black" />
            </VideoPlayerIcon>
          </Pressable>
        </View>
        <WebView
          scrollEnabled={false}
          ref={webViewRef}
          style={styles.WebViewContainer}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          source={{
            uri: `https://www.2embed.to/embed/tmdb/movie?id=${route.params.contentID}`,
          }}
          onNavigationStateChange={handleNavigationStateChange}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.detailsContainer}>
          <Text style={[styles.title, styles.text]}>
            All Quiet on the Western Front {route.params.contentID}
          </Text>
          <View style={styles.subtitleContainer}>
            <Text style={[styles.text, styles.subtitleText, styles.ratings]}>
              85% match
            </Text>
            <Text style={[styles.text, styles.subtitleText]}>2022</Text>
            <View style={styles.certification}>
              <Text style={[styles.text, styles.certificationText]}>PG-13</Text>
            </View>
            <Text style={[styles.text, styles.subtitleText]}>2h 28m</Text>
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
            Framed Polish pianist Wladyslaw Szpilman struggles to survive the
            onslaught of Nazi tyranny during World War II in this drama based on
            his memoirs.
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
                <Text style={[styles.text, styles.watchListIconText]}>
                  My List
                </Text>
              </View>
              <View style={styles.watchListIconBlock}>
                <Text style={[styles.text, styles.watchListIconText]}>
                  Watched
                </Text>
              </View>
              <View style={[styles.watchListIconBlock]}>
                <Text style={[styles.text, styles.watchListIconText]}>
                  Share
                </Text>
              </View>
            </View>
          </View>
          <Text>More Like This</Text>
          <TabNavigation />
        </View>
      </ScrollView>
    </View>
  );
};

export default MediaDetailsSecondary;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: "#fff",
  },
  detailsContainer: {
    padding: 10,
    gap: 8,
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
  WebViewContainer: {},
  exitButton: {
    position: "absolute",
    top: 13,
    right: 13,
    zIndex: 1,
  },
  backButton: {
    position: "absolute",
    top: 13,
    left: 13,
    zIndex: 1,
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
