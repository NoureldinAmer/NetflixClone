import MediaDescription from "../MediaDescription";
import TabNavigation from "../TabNavigation";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useRef, useContext, useEffect } from "react";
import { BlurView } from "expo-blur";
import { WebView } from "react-native-webview";
import { AntDesign } from "@expo/vector-icons";
import VideoPlayerIcon from "../VideoPlayerIcon";
import { MediaContext } from "../../../contexts/MediaContext";
import { useNavigation } from "@react-navigation/native";

const ShowDetails = ({ data, error, loading }) => {
  const webViewRef = useRef(null);
  const { selectedMedia, episodeDetails } = useContext(MediaContext);
  const navigation = useNavigation();

  const handleNavigationStateChange = (navState) => {
    if (
      navState.url !==
      `https://www.2embed.to/embed/tmdb/tv?id=${selectedMedia.contentID}&s=${episodeDetails.seasonNumber}&e=${episodeDetails.episodeNumber}`
    ) {
      webViewRef.current?.reload();
      console.log("[RELOADING]");
    }
  };

  const closeModal = () => {
    navigation.goBack(null);
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
    console.log(
      `https://www.2embed.to/embed/tmdb/tv?id=${selectedMedia.contentID}&s=${episodeDetails.seasonNumber}&e=${episodeDetails.episodeNumber}`
    );
  };

  function SettingsScreen() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Settings!</Text>
      </View>
    );
  }

  return (
    <BlurView style={styles.container} intensity={100} tint="dark">
      {!loading ? (
        <>
          <View style={{ height: 300, width: "100%" }}>
            <View style={styles.exitButton}>
              <Pressable onPress={closeModal}>
                <VideoPlayerIcon iconSize={24}>
                  <AntDesign name="closecircle" size={24} color="#272526" />
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
                uri: `https://www.2embed.to/embed/tmdb/tv?id=${selectedMedia.contentID}&s=${episodeDetails.seasonNumber}&e=${episodeDetails.episodeNumber}`,
              }}
              onNavigationStateChange={handleNavigationStateChange}
            />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.detailsContainer}>
              <MediaDescription clickMiddle={clickMiddle} media={data} />
              <TabNavigation
                recommendations={data.recommendations}
                episodes={data.seasons[0]}
              />
            </View>
          </ScrollView>
        </>
      ) : (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size={"large"} />
        </View>
      )}
    </BlurView>
  );
};

export default ShowDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  detailsContainer: {
    padding: 10,
    gap: 8,
  },
  activityIndicatorContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  WebViewContainer: {},
  exitButton: {
    position: "absolute",
    top: 13,
    right: 13,
    zIndex: 1,
  },
});
