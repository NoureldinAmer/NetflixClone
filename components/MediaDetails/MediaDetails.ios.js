import MediaDescription from "./MediaDescription";
import TabNavigation from "./TabNavigation";
import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native";
import React, { useRef, useContext, useEffect } from "react";
import { BlurView } from "expo-blur";
import { WebView } from "react-native-webview";
import { AntDesign } from "@expo/vector-icons";
import VideoPlayerIcon from "./VideoPlayerIcon";
import { MediaContext } from "../../contexts/MediaContext";

const MediaDetails = ({ route, navigation }) => {
  const webViewRef = useRef(null);
  const { selectedMediaID } = useContext(MediaContext);

  useEffect(() => {
    console.log("id from context api is", selectedMediaID);
  });

  const handleNavigationStateChange = (navState) => {
    if (
      navState.url !==
      `https://www.2embed.to/embed/tmdb/movie?id=${selectedMediaID}`
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
            // uri: `https://www.2embed.to/embed/tmdb/movie?id=${route.params.contentID}`,
            uri: `https://www.2embed.to/embed/tmdb/movie?id=${selectedMediaID}`,
          }}
          onNavigationStateChange={handleNavigationStateChange}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.detailsContainer}>
          <MediaDescription clickMiddle={clickMiddle} />
          <TabNavigation />
        </View>
      </ScrollView>
    </BlurView>
  );
};

export default MediaDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailsContainer: {
    padding: 10,
    gap: 8,
  },
  WebViewContainer: {},
  exitButton: {
    position: "absolute",
    top: 13,
    right: 13,
    zIndex: 1,
  },
});
