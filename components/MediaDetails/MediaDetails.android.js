import MediaDescription from "./MediaDescription";
import TabNavigation from "./TabNavigation";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  Linking,
} from "react-native";
import React, { useRef, useState, useContext, useEffect } from "react";
import { WebView } from "react-native-webview";
import { AntDesign } from "@expo/vector-icons";
import VideoPlayerIcon from "./VideoPlayerIcon";
import { MediaContext } from "../../contexts/MediaContext";

const MediaDetails = ({ route, navigation }) => {
  const webViewRef = useRef(null);
  const { selectedMediaID } = useContext(MediaContext);

  const handleNavigationStateChange = (navState) => {
    if (
      navState.url !==
      `https://www.2embed.to/embed/tmdb/movie?id=${selectedMediaID}`
    ) {
      webViewRef.current?.reload();
      console.log("[RELOADING]");
    }
    webViewRef.current.injectJavaScript(zoomInScript);
  };

  const closeModal = () => {
    navigation.goBack(null);
  };

  const zoomInScript = `
  document.body.style.zoom = '1.5';
  true;
`;

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
          startInLoadingState={true}
          source={{
            uri: `https://www.2embed.to/embed/tmdb/movie?id=${selectedMediaID}`,
          }}
          originWhitelist={[
            `https://www.2embed.to/embed/tmdb/movie?id=${selectedMediaID}`,
          ]}
          onNavigationStateChange={handleNavigationStateChange}
          allowsFullscreenVideo={true}
          injectedJavaScript={zoomInScript}
          scalesPageToFit={false}
          mixedContentMode={"always"}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.detailsContainer}>
          <MediaDescription clickMiddle={clickMiddle} />
          <TabNavigation />
        </View>
      </ScrollView>
    </View>
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
  WebViewContainer: {
    opacity: 0.99, //bug causes app to crash when exiting webview fullscreen, solution:https://github.com/react-native-webview/react-native-webview/issues/811
  },
  exitButton: {
    position: "absolute",
    top: 13,
    right: 13,
    zIndex: 1,
  },
  invisibleWebView: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  },
});
